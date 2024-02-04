import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Library {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    filepath: string;
    @Column({ nullable: true })
    filename: string;
    @Column({ nullable: true })
    meta: string;
    @Column({ nullable: true })
    file: string;
}