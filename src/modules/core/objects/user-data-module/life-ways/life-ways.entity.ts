import { VisibilityStatusEnum } from 'src/modules/core/enums/visibility-enum/visibility-enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

enum LifeWayType {
  PROFESSIONAL = 'PROFESSIONAL',
  EDUCATIONAL = 'EDUCATIONAL',
  CERTIFICATIONAL = 'CERTIFICATIONAL',
  SOCIAL = 'SOCIAL',
}

@Entity({ name: 'LifeWay' })
export class LifeWay {
  @PrimaryGeneratedColumn()
  idLifeWay: number;

  @Column({
    type: 'enum',
    enum: LifeWayType,
  })
  typeLifeWay: LifeWayType;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  institution: string | null;

  @Column({ type: 'date', nullable: true })
  initDate: Date | null;

  @Column({ type: 'date', nullable: true })
  finishDate: Date | null;

  @Column({
    type: 'enum',
    enum: VisibilityStatusEnum,
    default: VisibilityStatusEnum.PRIVATE,
  })
  visibility: VisibilityStatusEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.lifeWays, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @Column({ type: 'uuid' })
  idUser: string;
}
