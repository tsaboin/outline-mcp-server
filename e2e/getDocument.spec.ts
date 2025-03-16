import { test, expect, mockApiResponse, loadTool } from './setup';

test.describe('getDocument Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'get_document');
  });

  test('should retrieve a document', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.info', {
      data: {
        id: 'doc123',
        title: 'Test Document',
        text: 'Test content',
        createdAt: new Date().toISOString(),
      },
    });

    // TODO: Implement test for document retrieval
    // 1. Enter document ID
    // 2. Submit form
    // 3. Verify document details are displayed

    // Wait for API call
  });

  test('should handle retrieval errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.info', {
      error: 'Document not found',
    });

    // TODO: Implement test for error handling
    // 1. Enter invalid document ID
    // 2. Submit form
    // 3. Verify error message is displayed

    // Wait for API call
  });
});
