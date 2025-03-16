import { test, type Page } from '@playwright/test';
import { registerTools } from '../src/utils/importTools.js';
import { ToolDefinition } from '../src/utils/listTools.js';

/**
 * Helper function to mock API responses
 */
export async function mockApiResponse(page: Page, url: string, response: any) {
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
export async function loadTool(page: Page, toolName: string): Promise<ToolDefinition<unknown>> {
  return await test.step(`Loading tool: ${toolName}`, async () => {
    const toolDefinitions = await registerTools();
    const tool = toolDefinitions[toolName];
    if (!tool) {
      // TODO: Make this actually type-safe instead of a runtime error
      throw new Error(`Tool not found for name: ${toolName}`);
    }

    await page.goto('/');
    await page.getByRole('button', { name: 'Connect' }).click();
    await page.getByRole('button', { name: 'List Tools' }).click();
    await page.getByText(toolName).click();
    await page.waitForTimeout(100);

    return tool;
  });
}
