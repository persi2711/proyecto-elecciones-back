import { ActivityStatusEnum } from 'src/modules/core/enums/active-enum/active-enum';
import { VisibilityStatusEnum } from 'src/modules/core/enums/visibility-enum/visibility-enum';
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
import { Account } from '../accounts/account.entity';
import { MediaSocial } from '../media-socials/media-social.entity';
import { LifeWay } from '../life-ways/life-ways.entity';
import { Resource } from '../../application-data-module/resources/resource.entity';
import { Vote } from '../../events-data-module/votes/votes.entity';
import { Postulation } from '../../events-data-module/postulations/postulation.entity';
import { Result } from '../../events-data-module/results/result.entity';
import { EventParticipant } from '../../events-data-module/event-partipants/event-participants.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100 })
  sector: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;
  @Column({
    type: 'enum',
    enum: ActivityStatusEnum,
    default: ActivityStatusEnum.ACTIVE,
  })
  activityStatus: ActivityStatusEnum;

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

  @ManyToOne(() => Account, (account) => account.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idAccount' })
  account: Account;

  @Index(['idAccount'], { unique: true })
  @Column({ type: 'uuid' })
  idAccount: string;
  @OneToMany(() => MediaSocial, (media) => media.user)
  mediaSocials: MediaSocial[];

  @OneToMany(() => LifeWay, (lifeWay) => lifeWay.user)
  lifeWays: LifeWay[];

  @OneToMany(() => Resource, (resource) => resource.user)
  resources: Resource[];

  @OneToMany(() => Vote, (vote) => vote.voter)
  votesMade: Vote[];

  @OneToMany(() => Vote, (vote) => vote.candidate)
  votesReceived: Vote[];
  @OneToMany(() => Postulation, (postulation) => postulation.user)
  postulations: Postulation[];
  @OneToMany(() => Result, (result) => result.evaluator)
  evaluationsMade: Result[];

  @OneToMany(() => EventParticipant, (ep) => ep.user)
  eventParticipations: EventParticipant[];
}
