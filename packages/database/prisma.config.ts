import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    // Geração e build não exigem um banco ativo ou um arquivo .env.
    url: process.env.DATABASE_URL ?? 'postgresql://mypetcare:mypetcare_dev@localhost:5432/mypetcare?schema=public',
  },
});
