import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'ContactInfo' })
export class ContactInfo {
  @PrimaryColumn('uuid')
  idUser: string;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @Column({ type: 'varchar', length: 500, nullable: true })
  publicWebPage: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  publicPhone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicEmail: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
