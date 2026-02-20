import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ask } from '../asks/asks.entity';

@Entity({ name: 'AskOptions' })
export class AskOption {
  @PrimaryGeneratedColumn()
  idAskOption: number;

  @Column({ type: 'varchar', length: 300 })
  content: string;

  @ManyToOne(() => Ask, (ask) => ask.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idAsk' })
  ask: Ask;

  @Column()
  idAsk: number;
}
