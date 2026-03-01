import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'Accounts' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  idAccount: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    nullable: true,
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAccountVerified: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  emailCooldownUntil: Date | null;
  @Column({ type: 'boolean', default: false })
  isGoogleAccount: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false,
  })
  sessionTokenHash: string | null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  sessionTokenExpiresAt: Date | null;

  @OneToMany(() => User, (user) => user.account)
  users: User[];

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;
}
