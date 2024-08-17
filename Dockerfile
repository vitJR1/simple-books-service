FROM node:20-slim as build

LABEL authors="vit23031"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

RUN apt-get update && npm install --omit=dev && apt-get install -y openssl

ENV NODE_ENV=production

ARG BUILD_MODE
ENV MODE=$BUILD_MODE

ENV DATABASE_URL="postgres://postgres:root@192.168.84.104:5432/books-service"

RUN npm run generate
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "run", "start"]
