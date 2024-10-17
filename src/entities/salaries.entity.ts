import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { Users } from './users.entity';

@Entity('Salaries')
export class Salaries {
  @PrimaryGeneratedColumn('uuid')
  salary_id: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user_id: number;

  @Column({
    type: 'decimal'
  })
  amount: number;

  @Column()
  start_date: string;

  @Column({
    nullable: true
  })
  end_date: string;

  @CreateDateColumn()
  @IsDate()
  created_date: Date

  @UpdateDateColumn()
  @IsDate()
  updated_date: Date
}