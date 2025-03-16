import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('create_comment', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'create_comment');
  });
});
