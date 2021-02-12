import { Field, ObjectType } from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column({type:"text", unique:true})
    username: string;

    @Field()
    @Column("text")
    email: string;

    @Field(() => String)
    @Column("text")
    password: string;

    @Field()
    @Column({type:"text", nullable: true})
    role: string;

}