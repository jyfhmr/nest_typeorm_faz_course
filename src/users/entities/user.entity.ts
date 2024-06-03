import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./profile.entity";


@Entity() //tabla
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(()=> Profile)
  @JoinColumn()
  profile: Profile //profile es el nombre de la columna Profile es la otra tabla
                   //te añade una columna con el nombre que le pusiste +Id basicamente la relaciona

}
