import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { status } from "../constants";
import { IsDate, IsEmail } from 'class-validator';
import { Roles } from './roles.entity';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true
  })
  @IsEmail()
  email: string;

  @Column()
  passhash: string;

  @Column()
  gender: string;

  @Column()
  @ManyToOne(() => Roles)
  role_id: number;

  @Column({ default: status.ACTIVE })
  status: status;

  @CreateDateColumn()
  @IsDate()
  created_date: Date

  @UpdateDateColumn()
  @IsDate()
  updated_date: Date
}