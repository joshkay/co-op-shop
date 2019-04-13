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
import { List } from './List';

@Entity()
@Unique(["name", "list"])
export class Item 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ default: true })
  purchased: boolean;

  @ManyToOne(list => List, list => list.items)
  list: List;
  
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
