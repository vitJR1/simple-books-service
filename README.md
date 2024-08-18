DOCS: http://localhost:3000/docs/

START: 
Docker compose 
```bash 
docker compose up
```

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
npx prisma generate
npx prisma migrate dev

```

Docker compose 
```bash 
docker compose up
```

.env
```
PORT=3000

ACCESS_SECRET=lkaonsdn21klf408ehfeqGOwrwqrasMTdf23geSS

DATABASE_URL="postgres://postgres:root@localhost:5432/books-service"

MAILGUN_API_KEY=<YOUR_API_KEY>

MAILGUN_DOMAIN=<DOMAIN>
```
