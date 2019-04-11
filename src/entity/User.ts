import {
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Length(3, 30)
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword(): void
  {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkPassword(plainPassword: string): boolean
  {
    return bcrypt.compareSync(plainPassword, this.password);
  }
}
