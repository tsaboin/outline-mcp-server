import type { Page } from '@playwright/test';

/**
 * Helper function to mock API responses
 */
export async function mockApiResponse(page, url, response) {
  await page.route(url, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Helper function to wait for API calls
 */
export async function loadTool(page: Page, toolName: string) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Connect' }).click();
  await page.getByRole('button', { name: 'List Tools' }).click();
  await page.getByText(toolName).click();
  await page.waitForTimeout(1000);

  // TODO: Maybe implement this!
}
