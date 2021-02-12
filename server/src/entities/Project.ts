import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fypgroup } from "./Fypgroup";
import { Professor } from "./Professor";


@ObjectType()
@Entity()
export class Project {

    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field(() => Fypgroup)
    @OneToOne(() => Fypgroup)
    @JoinColumn()
    fypgroup: Fypgroup;

    @Field()
    @Column()
    title: string;

    @Field( () => Professor, {nullable:true})
    @ManyToOne(() => Professor, professor => professor.supervise)
    superviser: Professor;

    @Field( () => Professor, {nullable:true})
    @ManyToOne(() => Professor, professor => professor.examine)
    secondExaminer: Professor;

    @Field( {nullable:true})
    @Column({nullable: true})
    schedule?: string


}