import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('search_documents', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'search_documents');
  });
});
