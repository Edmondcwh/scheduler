import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Fypgroup } from "../entities/Fypgroup";
import { User } from "../entities/User";
import { MyContext } from "../types";


@ObjectType()
class FypResponse {
    @Field(() => String, {nullable: true})
    errors?: string;

    @Field(() => Fypgroup, {nullable: true})
    groupname?: Fypgroup;
}

@Resolver()
export class FypgroupResolver {

    @Mutation(() => FypResponse)
    async createFypGroup (
        @Arg("fypgroupname") fypgroupname: string,
    ): Promise<FypResponse> {
        if(fypgroupname.length < 5) {
            return {
                errors: "Invalid group name."
            }
        }

        let fypGroup;
        try {
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Fypgroup)
            .values({
                name: fypgroupname,
                unavailability: []
            })
            .returning('*')
            .execute()
            fypGroup = result.raw[0]
        } catch(err) {
            if(err.code === "23505") {
                return {
                    errors: "FYPGroup exists already."
                }
            }
        }

        return {groupname: fypGroup};
    }

    @Query(() => [Fypgroup],{nullable: true})
    async allGroups (
        @Ctx() {em} : MyContext
    ) {
        const groups = await em.query("Select * from Fypgroup");
        return groups;
    }

    @Mutation(() => FypResponse)
    async updateGroupUnavailability (
        @Arg("unavailability", type =>[String]) unavailability: [string],
        @Ctx() {req, em} : MyContext        
    ): Promise<FypResponse> {
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
        const group = await em.findOne(Fypgroup, {name: user.username});
        if (group === undefined) {
            return {
                errors: "fypgroup not found"
            } ;
        }

        

        group.unavailability = unavailability;

        const result = await em.save(group);
        
        return {groupname: result};
        
    }

    @Query(() => FypResponse)
    async studentInfo (
        @Ctx() {em,req} : MyContext
    ) : Promise<FypResponse> {
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
        const group = await em.findOne(Fypgroup, {name: user.username});
        if (group === undefined) {
            return {
                errors: "fypgroup not found"
            } ;
        }
        return {groupname: group};
    }
}