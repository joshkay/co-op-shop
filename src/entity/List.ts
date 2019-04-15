import {
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Unique
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Item } from './Item';

@Entity()
//@Unique(["name", "user"])
export class List 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  name: string;

  @OneToMany(type => Item, item => item.list, { onDelete: 'CASCADE' })
  items: Item[];

  @ManyToOne(type => User, user => user.lists)
  user: User;
  
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
