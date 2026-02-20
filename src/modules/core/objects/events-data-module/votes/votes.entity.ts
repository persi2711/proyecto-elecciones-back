import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user-data-module/users/users.entity';
import { Event } from '../events/events.entity';

@Entity({ name: 'Votes' })
@Index(['idEvent'])
@Index(['candidateId'])
@Index(['voterId'])
export class Vote {
  @PrimaryGeneratedColumn()
  idVote: number;

  @Column({ type: 'inet', nullable: true })
  ipAddress: string | null;

  @Column({ type: 'jsonb', nullable: true })
  deviceData: Record<string, any> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Event, (event) => event.votes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @Column('uuid')
  idEvent: string;

  @ManyToOne(() => User, (user) => user.votesMade, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'voterId' })
  voter: User;

  @Column('uuid')
  voterId: string;

  @ManyToOne(() => User, (user) => user.votesReceived, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidateId' })
  candidate: User;

  @Column('uuid')
  candidateId: string;
}
