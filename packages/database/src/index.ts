import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

export { PrismaClient } from './generated/prisma/client.js';

export function createDatabaseClient(connectionString: string): PrismaClient {
  if (!connectionString) {
    throw new Error('DATABASE_URL é obrigatória para conectar ao banco.');
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}
