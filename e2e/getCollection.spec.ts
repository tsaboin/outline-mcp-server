import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('get_collection', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'get_collection');
  });
});
