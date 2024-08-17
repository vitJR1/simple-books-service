npx prisma generate --schema="src/core/db/prisma/schema.prisma"
npx prisma migrate dev --schema="src/core/db/prisma/schema.prisma" --name init

Admin creds
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "Adm1nistr@toR"
}
```
