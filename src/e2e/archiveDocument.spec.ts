import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('archive_document', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'archive_document');
  });
});
