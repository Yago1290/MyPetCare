import assert from 'node:assert/strict';
import test from 'node:test';
import { healthResponseSchema } from '@mypetcare/contracts';
import { buildApp } from './app.js';

const env = {
  CORS_ORIGIN: 'http://localhost:3000',
  JWT_SECRET: 'test-only-secret-with-at-least-32-characters',
};

test('app registers cookie and JWT plugins without starting a listener', async (t) => {
  const app = buildApp(env);
  t.after(() => app.close());
  await app.ready();

  assert.equal(app.server.listening, false);
  assert.equal(app.parseCookie('session=example').session, 'example');
  const token = app.jwt.sign({ sub: 'test-user' });
  const payload = app.jwt.verify<{ sub: string; exp: number }>(token);
  assert.equal(payload.sub, 'test-user');
  assert.ok(payload.exp > Math.floor(Date.now() / 1000));
  assert.throws(() => app.jwt.verify('invalid-token'));
});

test('GET /health returns the health contract', async (t) => {
  const app = buildApp(env);
  t.after(() => app.close());

  const response = await app.inject({ method: 'GET', url: '/health' });

  assert.equal(response.statusCode, 200);
  assert.match(response.headers['content-type'] ?? '', /application\/json/);
  const body = healthResponseSchema.parse(response.json());
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'api');
  assert.ok(Number.isFinite(Date.parse(body.timestamp)));
});

test('GET /health includes the configured CORS origin', async (t) => {
  const app = buildApp(env);
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/health',
    headers: { origin: env.CORS_ORIGIN },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers['access-control-allow-origin'], env.CORS_ORIGIN);
  assert.equal(response.headers['access-control-allow-credentials'], 'true');
});
