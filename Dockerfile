# --- ETAPA 1: Construcción ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- ETAPA 2: Ejecución ---
FROM node:20-alpine AS runner

WORKDIR /app

# En NestJS, para correr migraciones a veces necesitamos dependencias que 
# no están en --omit=dev (como typeorm o ts-node). 
# Si tu app usa las migraciones compiladas en JS, esto funcionará:
COPY package*.json ./
RUN npm install --only=production

# Copiamos la carpeta dist con TODO (código de la app + migraciones compiladas)
COPY --from=builder /app/dist ./dist

# EXTREMADAMENTE IMPORTANTE: 
# Si tus archivos de migración están en src/migrations, 
# tras el build estarán en dist/migrations.
# Asegúrate de que tu DataSource apunte a 'dist/migrations/*.js'

EXPOSE 8080

# Usamos un shell command para encadenar la ejecución
# 1. Ejecutamos migraciones
# 2. Si tienen éxito, arrancamos la app
CMD npx typeorm migration:run -d dist/data-source.js && node dist/main