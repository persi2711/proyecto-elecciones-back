enum EventStatus {
  DRAFT = 'DRAFT',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  VOTING_OPEN = 'VOTING_OPEN',
  CLOSED = 'CLOSED',
  FINISHED = 'FINISHED',
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TextEvent } from '../texts-events/text-event.entinty';
import { Vote } from '../votes/votes.entity';
import { Postulation } from '../postulations/postulation.entity';
import { EventParticipant } from '../event-partipants/event-participants.entity';

@Entity({ name: 'Events' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  idEvent: string;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'boolean', default: true })
  uniqueVotes: boolean;

  @Column({ type: 'boolean', default: false })
  uniqueParticipants: boolean;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => TextEvent, (text) => text.event)
  texts: TextEvent[];

  @OneToMany(() => Vote, (vote) => vote.event)
  votes: Vote[];
  @OneToMany(() => Postulation, (postulation) => postulation.event)
  postulations: Postulation[];

  @OneToMany(() => EventParticipant, (ep) => ep.event)
  participants: EventParticipant[];
}
