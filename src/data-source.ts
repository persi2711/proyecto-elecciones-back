// src/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { User } from './modules/core/objects/user-data-module/users/users.entity';
import { MediaSocial } from './modules/core/objects/user-data-module/media-socials/media-social.entity';
import { LifeWay } from './modules/core/objects/user-data-module/life-ways/life-ways.entity';
import { GeneralInfo } from './modules/core/objects/user-data-module/general-Infos/general-info.entity';
import { ContactInfo } from './modules/core/objects/user-data-module/contact-Infos/contact-info.entity';
import { Account } from './modules/core/objects/user-data-module/accounts/account.entity';
import { Vote } from './modules/core/objects/events-data-module/votes/votes.entity';
import { TextEvent } from './modules/core/objects/events-data-module/texts-events/text-event.entinty';
import { Result } from './modules/core/objects/events-data-module/results/result.entity';
import { Postulation } from './modules/core/objects/events-data-module/postulations/postulation.entity';
import { Event } from './modules/core/objects/events-data-module/events/events.entity';
import { EventParticipant } from './modules/core/objects/events-data-module/event-partipants/event-participants.entity';
import { AskOption } from './modules/core/objects/events-data-module/asks-options/asks-options.entity';
import { Answer } from './modules/core/objects/events-data-module/answers/answers.entity';
import { Resource } from './modules/core/objects/application-data-module/resources/resource.entity';
import { EmailVerificationToken } from './modules/core/objects/application-data-module/auth/email-verification-tokens';

config(); // Carga el .env para desarrollo local

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Usamos join para normalizar las rutas según el sistema operativo (Linux en Docker)
  entities: [
    User,
    MediaSocial,
    LifeWay,
    GeneralInfo,
    ContactInfo,
    Account,
    Vote,
    TextEvent,
    Result,
    Postulation,
    Event,
    EventParticipant,
    AskOption,
    Answer,
    Resource,
    EmailVerificationToken,
  ],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],

  synchronize: false,
  logging: process.env.NODE_ENV !== 'production', // Log de queries solo en dev

  // SSL: Crucial para Railway en modo producción
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
