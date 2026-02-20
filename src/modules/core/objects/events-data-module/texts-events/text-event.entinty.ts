import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Event } from '../events/events.entity';

enum TextType {
  RULES = 'RULES',
  PROFILE = 'PROFILE',
  REQUIREMENTS = 'REQUIREMENTS',
}

@Entity({ name: 'TextsEvents' })
export class TextEvent {
  @PrimaryGeneratedColumn()
  idText: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: false })
  blackTitle: boolean;

  @Column({ type: 'boolean', default: false })
  blackContent: boolean;

  @Column({
    type: 'enum',
    enum: TextType,
  })
  typeText: TextType;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Event, (event) => event.texts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEvent' })
  event: Event;

  @Column({ type: 'uuid' })
  idEvent: string;
}
