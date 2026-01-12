# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Инсталираме зависимостите
COPY package*.json ./
RUN npm install

# Копираме Prisma и генерираме клиента
COPY prisma ./prisma/
RUN npx prisma generate

# Копираме всичко останало и строим сайта
COPY . .
RUN npm run build

# Run stage
FROM node:20-alpine AS runner

WORKDIR /app

# Инсталираме само prisma локално, за да можем да пуснем db push
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# ВАЖНО: Преди да стартираме сайта, казваме на Prisma да създаде таблиците
CMD npx prisma db push && npm start