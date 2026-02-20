import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user-data-module/users/users.entity';
import { Event } from '../events/events.entity';

@Entity({ name: 'EventParticipants' })
@Index(['idUser', 'idEvent'], { unique: true })
export class EventParticipant {
  @PrimaryGeneratedColumn()
  idEventParticipant: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.eventParticipations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUser' })
  user: User;
  @Index(['idUser', 'idEvent'], { unique: true })
  @Column('uuid')
  idUser: string;

  @ManyToOne(() => Event, (event) => event.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @Column('uuid')
  idEvent: string;
}
