# --- ETAPA 1: Construcción ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluidas las de desarrollo para el build)
RUN npm install

# Copiar el resto del código y construir el proyecto
COPY . .
RUN npm run build

# --- ETAPA 2: Ejecución ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copiamos solo el package.json y el lock para instalar dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copiamos la carpeta dist generada en la etapa anterior
COPY --from=builder /app/dist ./dist

# Railway inyecta la variable PORT, nos aseguramos de exponerla
EXPOSE 8080

# Comando para arrancar la app de NestJS
CMD ["node", "dist/main"]