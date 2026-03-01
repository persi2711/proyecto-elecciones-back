import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrestrucuture.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './objects/user-data-module/accounts/account.entity';
import { User } from './objects/user-data-module/users/users.entity';
import { GeneralInfo } from './objects/user-data-module/general-Infos/general-info.entity';
import { MediaSocial } from './objects/user-data-module/media-socials/media-social.entity';
import { LifeWay } from './objects/user-data-module/life-ways/life-ways.entity';
import { Resource } from './objects/application-data-module/resources/resource.entity';
import { TextEvent } from './objects/events-data-module/texts-events/text-event.entinty';
import { Vote } from './objects/events-data-module/votes/votes.entity';
import { Ask } from './objects/events-data-module/asks/asks.entity';
import { AskOption } from './objects/events-data-module/asks-options/asks-options.entity';
import { Answer } from './objects/events-data-module/answers/answers.entity';
import { Postulation } from './objects/events-data-module/postulations/postulation.entity';
import { Result } from './objects/events-data-module/results/result.entity';
import { EventParticipant } from './objects/events-data-module/event-partipants/event-participants.entity';
import { ContactInfo } from './objects/user-data-module/contact-Infos/contact-info.entity';
import { Event } from './objects/events-data-module/events/events.entity';
import { UserDataTrader } from './traders/user-data-traders/user-data-tarder.service';
import { GeneralInfoDataTrader } from './traders/user-data-traders/general-info-data-trader.service';
import { AccountDataTrader } from './traders/user-data-traders/account-data-trader.service';
import { RegisterManagerService } from './managers/auth/register-manager.service';
import { EmailVerificationToken } from './objects/application-data-module/auth/email-verification-tokens';
import { UserQueryService } from './querys/auth/user-query.service';
import { LoginManagerService } from './managers/auth/login-manager.service';
import { EmailVerificationTokenDataTrader } from './traders/application-data-traders/email-verification-token-data-trader.service';
import { UpdateUserManagerService } from './managers/user/update-user-manager.service';
import { ResourceDataTrader } from './traders/application-data-traders/resource-data-trader.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      User,
      GeneralInfo,
      MediaSocial,
      ContactInfo,
      LifeWay,
      Resource,
      TextEvent,
      Vote,
      Event,
      Ask,
      AskOption,
      Answer,
      Postulation,
      Result,
      EventParticipant,
      EmailVerificationToken,
    ]),
  ],
  providers: [
    UserDataTrader,
    GeneralInfoDataTrader,
    AccountDataTrader,
    RegisterManagerService,
    LoginManagerService,
    UserQueryService,
    EmailVerificationTokenDataTrader,
    UpdateUserManagerService,
    ResourceDataTrader,
  ],
  exports: [
    RegisterManagerService,
    LoginManagerService,
    UserQueryService,
    UpdateUserManagerService,
  ],
})
export class CoreModule {}
