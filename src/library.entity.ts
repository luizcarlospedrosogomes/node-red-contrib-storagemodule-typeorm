import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Library {
    @PrimaryGeneratedColumn()
    id: number;
    filepath: string;
    filename: string;
    meta: string;
    file: string;
}