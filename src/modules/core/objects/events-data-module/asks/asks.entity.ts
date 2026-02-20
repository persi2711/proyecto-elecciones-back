import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AskOption } from '../asks-options/asks-options.entity';
import { Answer } from '../answers/answers.entity';

export enum AskType {
  OPEN = 'OPEN',
  SELECT = 'SELECT',
}

@Entity({ name: 'Asks' })
export class Ask {
  @PrimaryGeneratedColumn()
  idAsk: number;

  @Column({
    type: 'enum',
    enum: AskType,
  })
  typeAsk: AskType;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => AskOption, (option) => option.ask)
  options: AskOption[];

  @OneToMany(() => Answer, (answer) => answer.ask)
  answers: Answer[];
}
