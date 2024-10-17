import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsDate } from 'class-validator';
export type RoleType = "admin" | "employee";
@Entity('Roles')
export class Roles {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;

  @CreateDateColumn()
  @IsDate()
  created_date: Date
}