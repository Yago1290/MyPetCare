import assert from 'node:assert/strict';
import test from 'node:test';
import { loadEnv } from './env-schema.js';

const JWT_SECRET = 'test-only-secret-with-at-least-32-characters';

test('environment defaults match local development', () => {
  assert.deepEqual(loadEnv({ JWT_SECRET }), {
    JWT_SECRET,
    PORT: 3333,
    HOST: '127.0.0.1',
    CORS_ORIGIN: 'http://localhost:3000',
  });
});

test('environment accepts explicit values and coerces the port', () => {
  assert.deepEqual(loadEnv({
    JWT_SECRET,
    PORT: '4000',
    HOST: '0.0.0.0',
    CORS_ORIGIN: 'https://example.com',
  }), {
    JWT_SECRET,
    PORT: 4000,
    HOST: '0.0.0.0',
    CORS_ORIGIN: 'https://example.com',
  });
});

test('environment rejects invalid values', () => {
  for (const PORT of ['0', '65536', '3.5', 'invalid', '']) {
    assert.throws(() => loadEnv({ JWT_SECRET, PORT }));
  }
  assert.throws(() => loadEnv({ JWT_SECRET, HOST: ' ' }));
  assert.throws(() => loadEnv({ JWT_SECRET, CORS_ORIGIN: 'invalid' }));
  assert.throws(() => loadEnv({}), /Variáveis de ambiente inválidas: JWT_SECRET/);
  assert.throws(() => loadEnv({ JWT_SECRET: 'short' }));
  assert.throws(() => loadEnv({ JWT_SECRET: ' '.repeat(32) }));
});
