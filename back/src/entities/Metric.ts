import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsNumber, IsString } from "class-validator";

@Entity()
export class Metric extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsNumber()
    value: number;

    @Column()
    @IsDate()
    timestamp: Date; 
}
