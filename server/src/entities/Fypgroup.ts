import { Field, ObjectType } from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Fypgroup{

    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column({type:"text", unique:true})
    name: string;

    @Field( () => [String], {nullable:true})
    @Column({type:"simple-array", array: true,nullable: true})
    students?: string[];

    @Field(() => [String], {nullable:true})
    @Column({type: "simple-array",array: true, nullable: true})
    unavailability?: string[];
}