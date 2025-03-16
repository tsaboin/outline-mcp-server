import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('update_collection', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'update_collection');
  });
});
