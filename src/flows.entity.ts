import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Flows {
    @PrimaryGeneratedColumn()
    id: number;
    flows: string;
    credentials: string;
    settings: string;
}