import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../user-data-module/accounts/account.entity';

@Entity({ name: 'EmailVerificationTokens' })
@Index(['idAccount'], { unique: true })
export class EmailVerificationToken {
  @PrimaryGeneratedColumn()
  idToken: number;

  @Column('uuid')
  idAccount: string;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idAccount' })
  account: Account;

  @Column({ type: 'varchar', length: 255 })
  tokenHash: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
