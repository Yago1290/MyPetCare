import type { FastifyInstance } from 'fastify';
import { getHealth } from './controllers/get-health.js';

export async function routes(app: FastifyInstance) {
  app.get('/health', getHealth);
}
