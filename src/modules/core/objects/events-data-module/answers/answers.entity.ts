import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ask } from '../asks/asks.entity';
import { Postulation } from '../postulations/postulation.entity';

@Entity({ name: 'Answers' })
@Index(['idPostulation', 'idAsk'], { unique: true })
export class Answer {
  @PrimaryGeneratedColumn()
  idAnswer: number;

  @Column({ type: 'text' })
  content: string;
  @ManyToOne(() => Ask, (ask) => ask.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idAsk' })
  ask: Ask;

  @Column()
  idAsk: number;

  @ManyToOne(() => Postulation, (postulation) => postulation.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPostulation' })
  postulation: Postulation;

  @Column()
  idPostulation: number;
}
