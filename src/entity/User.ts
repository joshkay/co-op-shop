import {
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import { List } from './List';
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

  @OneToMany(type => List, list => list.user)
  lists: List[];
  
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
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
