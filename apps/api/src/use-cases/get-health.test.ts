import assert from 'node:assert/strict';
import test from 'node:test';
import { GetHealthUseCase } from './get-health.js';

test('health use case returns availability without HTTP or database dependencies', () => {
  const useCase = new GetHealthUseCase();
  const before = Date.now();
  const result = useCase.execute();

  assert.equal(result.status, 'ok');
  assert.equal(result.service, 'api');
  const timestamp = Date.parse(result.timestamp);
  assert.ok(timestamp >= before && timestamp <= Date.now());
});
