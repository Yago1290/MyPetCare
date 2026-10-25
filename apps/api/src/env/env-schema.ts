import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3333),
  HOST: z.string().trim().min(1).default('127.0.0.1'),
  CORS_ORIGIN: z.url().default('http://localhost:3000'),
  JWT_SECRET: z.string().trim().min(32),
});

export function loadEnv(source: NodeJS.ProcessEnv = process.env) {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Variáveis de ambiente inválidas: ${details}. Verifique apps/api/.env.`);
  }

  return result.data;
}
