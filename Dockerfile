FROM node:20-slim as build

LABEL authors="vit23031"

RUN apt-get update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist/router ./dist/router

RUN apt-get update && npm install --omit=dev

ENV NODE_ENV=production

ARG BUILD_MODE
ENV MODE=$BUILD_MODE

EXPOSE 3000

CMD ["npm", "run", "start"]
