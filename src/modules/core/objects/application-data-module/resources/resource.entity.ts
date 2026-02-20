import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user-data-module/users/users.entity';
export enum StorageProvider {
  PROVIDER_A = 'PROVIDER_A',
  PROVIDER_B = 'PROVIDER_B',
}
export enum ResourceType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}
@Entity({ name: 'Resources' })
export class Resource {
  @PrimaryGeneratedColumn()
  idResource: number;

  @Column({
    type: 'enum',
    enum: ResourceType,
  })
  typeResource: ResourceType;

  @Column({
    type: 'enum',
    enum: StorageProvider,
  })
  provider: StorageProvider;

  @Column({ type: 'varchar', length: 500 })
  key: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  root: string | null;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metadata: Record<string, any> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.resources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Index(['userId', 'typeResource'])
  @Column({ type: 'uuid' })
  userId: string;
}
