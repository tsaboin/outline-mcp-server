import test from '@playwright/test';
import runSmokeTestForTool from './util/smokeTest';

test.describe('move_document', () => {
  test('passes a smoke test', async ({ page }) => {
    await runSmokeTestForTool(page, 'move_document');
  });
});
