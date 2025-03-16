import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('delete_document', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'delete_document');
  });
});
