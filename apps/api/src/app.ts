import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import {fastify} from 'fastify';
import { env } from './env/env.js';
import { routes } from './http/routes.js';


export const app = fastify()

app.register(cors, { origin: env.CORS_ORIGIN, credentials: true });
app.register(cookie);
app.register(jwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '15m' },
});
app.register(routes);
