import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: "users"})   //UNA ENTIDAD ES UNA TABLA
export class User {

    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ type: "datetime", default: ()=>{"CURRENT_TIMESTAMP"}})
    createdAt: Date;


    @Column({nullable: true})
    authStrategy: string

}
