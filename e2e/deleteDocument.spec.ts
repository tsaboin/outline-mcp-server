import test from '@playwright/test';
import { mockApiResponse, loadTool } from './setup';

test.describe('deleteDocument Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'delete_document');
  });

  test('should delete a document', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.delete', {
      success: true,
    });

    // TODO: Implement test for document deletion
    // 1. Navigate to document list
    // 2. Select document to delete
    // 3. Confirm deletion
    // 4. Verify document was removed from list

    // Wait for API call
  });

  test('should handle deletion errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.delete', {
      error: 'Not authorized to delete document',
    });

    // TODO: Implement test for error handling
    // 1. Attempt to delete document without permission
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
