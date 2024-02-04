import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Flows {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    flows: string;
    @Column({ nullable: true })
    credentials: string;
    @Column({ nullable: true })
    settings: string;
}