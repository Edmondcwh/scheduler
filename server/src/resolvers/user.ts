import { Resolver, Query, Ctx, Mutation, InputType, Field, Arg, ObjectType } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";
//import { Fypgroup } from "../entities/Fypgroup";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../constants";
import { Fypgroup } from "../entities/Fypgroup";
import { Professor } from "../entities/Professor";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string 
    
    @Field()
    password: string

    @Field()
    email: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string 
    @Field()
    message: string;
}


@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}


@Resolver()
export class UserResolver {
    @Query(() => User, {nullable: true})
    async me(@Ctx() {req,em} : MyContext) {
        if(!req.session.userId) {
            return null 
        }

        const user = await em.findOne(User, {id:req.session.userId});
        return user;

    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() {em} : MyContext
    ): Promise<UserResponse> {

        if(options.username.length <= 2) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'length must be greater than 2',
                    }
                ]
            }
        }

        if(options.password.length <= 4) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'length must be greater than 4',
                    }
                ]
            }
        }

        if(!options.email.includes('@')) {
            return {
                errors: [
                    {
                        field: 'email',
                        message: 'Invalid email'
                    }
                ]
            }
        }
        let role = '';
        const validUser = await em.find(Fypgroup, {name: options.username});
        const validProfessor = await em.find(Professor, {name: options.username})
        if (validUser.length === 0 && validProfessor.length === 0) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'Invalid username. For professor, insert your name. For students, insert your groupname.'
                    }
                ]
            }
        } else if (validUser.length !== 0) {
            role = 'student'
        } else if (validProfessor.length !== 0) {
            role = 'professor'
        }
        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: options.username,
                password: hashedPassword,
                email: options.email,
                role: role,
            })
            .returning('*')
            .execute()
            user = result.raw[0]
        } catch(err) {
            if(err.code === "23505") {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'You have already registered'
                        }
                    ]
                }
            }
        }
        return {user};        
    }

    @Mutation(() => UserResponse)
    async login (
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() {req}: MyContext 
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes("@") ?
            {where: {email: usernameOrEmail}} :
            {where: {username: usernameOrEmail}}
        )

        if(!user) {
            return {
                errors : [
                    {
                        field: "usernameOrEmail",
                        message: "The username does not exist."
                    }
                ]
            };
        }
        const valid = await argon2.verify(user.password,password);
        if(!valid) {
            return {
                errors: [
                    {   
                        field: "password",
                        message: "Incorrect password"
                    }
                ]
            }
        }
        req.session.userId = user.id;
        return {user,};
    }

    @Mutation(()=>Boolean)
    logout (
        @Ctx() {req, res}: MyContext
    ) {

        return new Promise(resolve => req.session.destroy(err => {
            res.clearCookie(COOKIE_NAME);
            if (err) {
                resolve(false);
                return ;
            }

            resolve(true);
        }))
    }


}