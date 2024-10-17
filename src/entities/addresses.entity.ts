import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { status } from "../constants";
import { IsDate } from 'class-validator';
import { Users } from './users.entity';

@Entity('Addresses')
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  address_id: string;

  @ManyToOne(() => Users)
  @JoinColumn()
  user_id: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ default: status.ACTIVE })
  status: status;

  @CreateDateColumn()
  @IsDate()
  created_date: Date
}