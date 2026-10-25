import { app } from './app.js';
import { env } from './env/env.js';


try {
  await app.listen({ port: env.PORT, host: env.HOST });
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
  await app.close();
}
