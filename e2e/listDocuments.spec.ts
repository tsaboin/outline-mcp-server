import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('list_documents', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'list_documents');
  });
});
