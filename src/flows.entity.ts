import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
@Entity()
export class Flows {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true, type: process.env.isHANA ? 'nclob' : 'text'})
    flows: string;
    @Column({ nullable: true, type: process.env.isHANA ? 'nclob' : 'text'})
    credentials: string;
    @Column({ nullable: true, type: process.env.isHANA ? 'nclob' : 'text'})
    settings: string;
}