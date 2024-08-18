FROM node:20-slim as build

LABEL authors="vit23031"

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY schema.prisma ./
COPY migrations ./migrations

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/schema.prisma ./
COPY --from=build /app/migrations ./migrations

RUN apt-get update && npm install && apt-get install -y openssl

ENV NODE_ENV=production

ARG BUILD_MODE
ENV MODE=$BUILD_MODE

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
