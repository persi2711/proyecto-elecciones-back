enum MediaSocialType {
  FACEBOOK = 'FACEBOOK',
  X = 'X',
  LINKEDIN = 'LINKEDIN',
  YOUTUBE = 'YOUTUBE',
  INSTAGRAM = 'INSTAGRAM',
}
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
import { User } from '../users/users.entity';

@Entity({ name: 'MediaSocial' })
export class MediaSocial {
  @PrimaryGeneratedColumn()
  idMediaSocial: number;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({
    type: 'enum',
    enum: MediaSocialType,
  })
  typeMediaSocial: MediaSocialType;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.mediaSocials, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Index(['userId', 'typeMediaSocial'], { unique: true })
  @Column({ type: 'uuid' })
  userId: string;
}
