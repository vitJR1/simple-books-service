Admin creds
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "Adm1nistr@toR"
}
```

Database
```bash
npx prisma generate --schema="src/core/db/prisma/schema.prisma"
npx prisma migrate dev --schema="src/core/db/prisma/schema.prisma" --name init

```

Docker build 
```bash 
docker build -t books-service .
```

Docker start 
```bash
docker run --env-file .env -p 3000:3000 --name books-service -d books-service
```

.env
```
PORT=3000

ACCESS_SECRET=lkaonsdn21klf408ehfeqGOwrwqrasMTdf23geSS

DATABASE_URL="postgres://postgres:root@localhost:5432/books-service"
```
