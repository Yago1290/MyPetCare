import { healthResponseSchema } from '@mypetcare/contracts';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetHealthUseCase } from '../../use-cases/factories/make-get-health-use-case.js';

export async function getHealth(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetHealthUseCase();
  const response = useCase.execute();

  return reply.status(200).send(healthResponseSchema.parse(response));
}
