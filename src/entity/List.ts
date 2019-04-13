import {
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';

@Entity()
@Unique(["name", "user"])
export class List 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ default: true })
  purchased: boolean;

  @ManyToOne(type => User, user => user.lists)
  user: User;
  
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
