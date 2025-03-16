import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('ask_documents', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'ask_documents');
  });
});
