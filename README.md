Admin creds
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "Adm1nistr@toR"
}
```

How to start:
```
npx prisma generate
npx prisma migrate dev
docker compose up
```

Database
```bash
npx prisma generate
npx prisma migrate dev

```

Docker compose 
```bash 
docker compose up
```

Docker build 
```bash 
docker build -t books-service .
```

Docker start 
```bash
docker run \
  -e PORT=3000 \
  -e ACCESS_SECRET=lkaonsdn21klf408ehfeqGOwrwqrasMTdf23geSS \
  -e DATABASE_URL="postgres://postgres:root@192.168.84.104:5432/books-service" \
  -p 3000:3000 \
  --name books-service \
  -d books-service

```

.env
```
PORT=3000

ACCESS_SECRET=lkaonsdn21klf408ehfeqGOwrwqrasMTdf23geSS

DATABASE_URL="postgres://postgres:root@localhost:5432/books-service"

MAILGUN_API_KEY=<YOUR_API_KEY>

MAILGUN_DOMAIN=<DOMAIN>
```
