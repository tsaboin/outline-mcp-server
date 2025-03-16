import test from '@playwright/test';
import { mockApiResponse, loadTool } from './setup';

test.describe('listCollections Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'list_collections');
  });

  test('should list all collections', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/collections.list', {
      data: [
        {
          id: 'col1',
          name: 'Collection 1',
          description: 'First test collection',
        },
        {
          id: 'col2',
          name: 'Collection 2',
          description: 'Second test collection',
        },
      ],
    });

    // TODO: Implement test for collection listing
    // 1. Navigate to collections list
    // 2. Verify collections are displayed correctly
    // 3. Verify collection details match API response

    // Wait for API call
  });

  test('should handle empty collections list', async ({ page }) => {
    // Mock empty response
    await mockApiResponse(page, '/api/collections.list', {
      data: [],
    });

    // TODO: Implement test for empty list
    // 1. Navigate to collections list
    // 2. Verify empty state message is displayed

    // Wait for API call
  });

  test('should handle listing errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/collections.list', {
      error: 'Failed to retrieve collections',
    });

    // TODO: Implement test for error handling
    // 1. Trigger collection listing
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
