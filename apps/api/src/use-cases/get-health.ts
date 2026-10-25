import type { HealthResponse } from '@mypetcare/contracts';

export class GetHealthUseCase {
  execute(): HealthResponse {
    return {
      status: 'ok',
      service: 'api',
      timestamp: new Date().toISOString(),
    };
  }
}
