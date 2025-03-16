import { test, expect, mockApiResponse, loadTool } from './setup';

test.describe('moveDocument Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'move_document');
  });

  test('should move a document to another collection', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.move', {
      data: {
        id: 'doc123',
        title: 'Test Document',
        collectionId: 'newCollection',
        updatedAt: new Date().toISOString(),
      },
    });

    // TODO: Implement test for document moving
    // 1. Navigate to document
    // 2. Select move operation
    // 3. Choose target collection
    // 4. Verify document moved successfully

    // Wait for API call
  });

  test('should handle move errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.move', {
      error: 'Not authorized to move document',
    });

    // TODO: Implement test for error handling
    // 1. Attempt to move document without permission
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
