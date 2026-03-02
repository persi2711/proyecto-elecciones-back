// src/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config(); // Carga el .env para desarrollo local

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Usamos join para normalizar las rutas según el sistema operativo (Linux en Docker)
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],

  synchronize: false,
  logging: process.env.NODE_ENV !== 'production', // Log de queries solo en dev

  // SSL: Crucial para Railway en modo producción
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
