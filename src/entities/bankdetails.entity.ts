import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { Users } from './users.entity';

@Entity('BankDetails')
export class BankDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user_id: string;

  @Column()
  bank_name: string;

  @Column()
  ifsc_code: string;

  @Column({
    unique: true
  })
  account_number: string;

  @CreateDateColumn()
  @IsDate()
  created_date: Date

  @UpdateDateColumn()
  @IsDate()
  updated_date: Date
}