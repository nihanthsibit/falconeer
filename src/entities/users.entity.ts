import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { status } from "../constants";
import { IsDate, IsEmail } from 'class-validator';
import { Roles } from './roles.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('Users')
@ObjectType()
export class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({
    unique: true
  })
  @IsEmail()
  email: string;

  @Column()
  passhash: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  @ManyToOne(() => Roles)
  role_id: number;

  @Field()
  @Column({ default: status.ACTIVE })
  status: status;

  @CreateDateColumn()
  @IsDate()
  created_date: Date

  @UpdateDateColumn()
  @IsDate()
  updated_date: Date
}