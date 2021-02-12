import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Professor } from "../entities/Professor";
import { User } from "../entities/User";
import { MyContext } from "../types";

@ObjectType()
class ProfessorResponse {
    @Field(() => String, {nullable: true})
    errors?: string;

    @Field(() => Professor, {nullable: true})
    professor?: Professor;
}

@Resolver()
export class ProfessorResolver {
    @Mutation(() => ProfessorResponse)
    async createProfessor (
        @Arg("professorName") professorName: string,
        @Ctx() {}:MyContext
    ): Promise<ProfessorResponse> {
        if (professorName.length < 2) {
            return {
                errors: "Invalid professor name"
            }
        }
        let professor;
        try {
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Professor)
            .values({
                name: professorName,
                unavailability: []
            })
            .returning('*')
            .execute()
            professor = result.raw[0]
        } catch(err) {
            if(err.code === "23505") {
                return {
                    errors: "Professor exists already."
                }
            }
        }
        return {professor};
    }


    @Query(() => [Professor],{nullable: true})
    async allProfessors(
        @Ctx() {em} : MyContext,
    ){        
        const professors = em.query("Select * from Professor");
        return professors;
    }


    @Mutation(() => ProfessorResponse)
    async updateProfessorUnavailability (
        @Arg("unavailability", type =>[String]) unavailability: [string],
        @Ctx() {req, em} : MyContext        
    ): Promise<ProfessorResponse> {
        if(!req.session.userId) {
            return {
                errors: "user has not logged in"
            } ;
        }

        const user = await em.findOne(User, {id:req.session.userId});
        if (user === undefined) {
            return {
                errors: "user not found"
            } ;
        }
        const professor = await em.findOne(Professor, {name: user.username});
        if (professor === undefined) {
            return {
                errors: "professor not found"
            } ;
        }

        

        professor.unavailability = unavailability;

        const result = await em.save(professor);
        
        return {professor: result};
        
    }


}