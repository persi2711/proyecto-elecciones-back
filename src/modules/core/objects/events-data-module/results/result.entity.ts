import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Postulation } from '../postulations/postulation.entity';
import { User } from '../../user-data-module/users/users.entity';
enum EvaluationResult {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
@Entity({ name: 'Results' })
@Index(['idPostulation'], { unique: true })
export class Result {
  @PrimaryGeneratedColumn()
  idResult: number;

  @Column({
    type: 'enum',
    enum: EvaluationResult,
  })
  result: EvaluationResult;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => Postulation, (postulation) => postulation.result, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPostulation' })
  postulation: Postulation;
  @Index(['idPostulation', 'idUserEval'], { unique: true })
  @Column()
  idPostulation: number;

  @ManyToOne(() => User, (user) => user.evaluationsMade, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUserEval' })
  evaluator: User;

  @Column('uuid')
  idUserEval: string;
}
