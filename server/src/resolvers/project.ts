import { validate } from "graphql";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Fypgroup } from "../entities/Fypgroup";
import { Professor } from "../entities/Professor";
import { Project } from "../entities/Project";
import { User } from "../entities/User";
import { MyContext } from "../types";


@InputType() 
class ProjectField {
    @Field()
    groupname: string;

    @Field()
    title: string;

    @Field()
    supervisor: string;
    
    @Field()
    secondExaminer: string;

}

@ObjectType()
class ProjectFieldError {
    @Field()
    field: string 
    @Field()
    message: string;
}


@ObjectType()
class ProjectResponse {
    @Field(() => [ProjectFieldError], {nullable: true})
    errors?: ProjectFieldError[];

    @Field(() => Project, {nullable: true})
    project?: Project;

    @Field(() => String, {nullable:true})
    message?:String;
}

@Resolver()
export class ProjectResolver {

    @Mutation(() => ProjectResponse)
    async createProjects(
        @Arg("options") options: ProjectField,
        @Ctx() {em} : MyContext
    ): Promise<ProjectResponse> {
        const validGroup = await em.findOne(Fypgroup, {name: options.groupname});
        if(validGroup === undefined) {
            return {
                errors: [
                    {
                        field: "groupname",
                        message: "Invalid group name. Name not found."
                    }
                ]
            }
        }

        const validSupervisor = await em.findOne(Professor, {name: options.supervisor});
        if(validSupervisor === undefined) {
            return {
                errors: [
                    {
                        field: "supervisor",
                        message: "Supervisor not found."
                    }
                ]
            }
        }

        const validSecondExaminer = await em.findOne(Professor, {name: options.secondExaminer});
        if(validSecondExaminer === undefined) {
            return {
                errors: [
                    {
                        field: "secondExaminer",
                        message: "Second examiner not found."
                    }
                ]
            }
        }

        const project = new Project();
        project.fypgroup = validGroup;
        project.title = options.title;
        project.superviser = validSupervisor;
        project.secondExaminer = validSecondExaminer;
        try {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Project)
            .values(project)
            .returning('*')
            .execute()
        } catch(err) {
            if(err.code === "23505") {
                return {
                    errors: [
                        {
                            field: 'groupname',
                            message: 'Group already has project assigned'
                        }
                    ]
                }
            }
        }
        

        
        validSupervisor.supervise?.push(project);
        await em.save(validSupervisor);

        validSecondExaminer.examine?.push(project);
        await em.save(validSecondExaminer);
        


        return {project};
    }

    @Query(() => ProjectResponse)
    async myProject(
        @Arg("groupname") groupname: string,
        @Ctx() {em} : MyContext
    ) : Promise<ProjectResponse> {
        const projectRepository = em.getRepository(Project);
        const fypGroup = await em.findOne(Fypgroup, {name: groupname})
        const myProject = await projectRepository.findOne({where: {fypgroup:fypGroup }, relations: ["fypgroup", "superviser", "secondExaminer" ]});
        
        if(myProject === undefined) {
            return {
                errors: [
                    {
                        field: "group",
                        message: "no information"
                    }
                    
                ]
            }
        }
        
        
       
        
        
        return {project: myProject}
    }

    @Query(() => [Project])
    async allProjects(
        @Ctx() {em} : MyContext 
    ) : Promise<Project[]> {
        
        const projectRepository = em.getRepository(Project);
        const allProjects = await projectRepository.find({relations: ["fypgroup", "superviser", "secondExaminer"]});        

        return allProjects;
    }

    @Query(() => [Project])
    async professorProjects (
        @Ctx() {em} : MyContext,
        @Arg("professor") professor: string,
    ) : Promise<Project[]> {

        const professorId = await em.findOne(Professor, {name:professor});
        let allProjects : Project[] = [];


        if(professorId !== undefined) {
            const projectRepository = em.getRepository(Project);
            const superviseProject = await projectRepository.find({where: {superviser: professorId.id},relations: ["fypgroup", "superviser", "secondExaminer"]});    
            const secondExaminerProject = await projectRepository.find({where: {secondExaminer: professorId.id},relations: ["fypgroup", "superviser", "secondExaminer"]});
            
            allProjects = superviseProject.concat(secondExaminerProject);
        }
        
       
        
        return allProjects;
    }

    @Mutation(() => ProjectResponse)
    async updateSchedule(
        @Arg("schedule", type=>[String]) schedule:string[],
        @Ctx() {em} : MyContext
    ) : Promise <ProjectResponse> {
        const projectResolver = em.getRepository(Project);
        const allProjects = await projectResolver.find({relations: ["fypgroup", "superviser", "secondExaminer"]});
        let index : number = 0;
        allProjects.forEach((project) => {
            project.schedule = schedule[index];
            em.save(project);
            index++;
        });

        return {message: "Successfully update schedule"};
    }

}