import { ObjectType, Field } from "type-graphql";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Professor{

    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column({type:"text", unique:true})
    name: string;

    @Field(() => [String], {nullable:true})
    @Column({type: "simple-array", nullable: true})
    unavailability?: string[];

    @Field(() => Project, {nullable:true})
    @OneToMany(() => Project, project=>project.superviser)
    supervise?: Project[];

    @Field(() => Project, {nullable:true})
    @OneToMany(()=> Project, project => project.secondExaminer)
    examine?: Project[];
}