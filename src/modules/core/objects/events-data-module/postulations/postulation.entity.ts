import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answers/answers.entity';
import { User } from '../../user-data-module/users/users.entity';
import { Event } from '../events/events.entity';
import { Result } from '../results/result.entity';
enum PostulationStatus {
  EVALUATION = 'EVALUATION',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
@Entity({ name: 'Postulations' })
export class Postulation {
  @PrimaryGeneratedColumn()
  idPostulation: number;

  @Column({
    type: 'enum',
    enum: PostulationStatus,
    default: PostulationStatus.EVALUATION,
  })
  status: PostulationStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Answer, (answer) => answer.postulation)
  answers: Answer[];

  @ManyToOne(() => User, (user) => user.postulations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @Column('uuid')
  idUser: string;

  @ManyToOne(() => Event, (event) => event.postulations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @Column('uuid')
  idEvent: string;

  @OneToOne(() => Result, (result) => result.postulation)
  result: Result;
}
