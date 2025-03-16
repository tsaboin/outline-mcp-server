import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('list_collections', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'list_collections');
  });
});
