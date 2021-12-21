import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ length: 500 })
    surname: string;

}
