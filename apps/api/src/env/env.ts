import 'dotenv/config';
import { loadEnv } from './env-schema.js';

export { envSchema, loadEnv } from './env-schema.js';

export const env = loadEnv();
