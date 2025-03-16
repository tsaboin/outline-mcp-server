import { test, expect, mockApiResponse, loadTool } from './setup';

test.describe('createDocument Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'create_document');
  });

  test('should create a new document', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.create', {
      data: {
        id: 'doc123',
        title: 'Test Document',
        text: 'Test content',
        createdAt: new Date().toISOString(),
      },
    });

    // TODO: Implement test for document creation
    // 1. Navigate to UI
    // 2. Fill in document details
    // 3. Submit form
    // 4. Verify document was created

    // Wait for API call
  });

  test('should handle validation errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.create', {
      error: 'Title is required',
    });

    // TODO: Implement test for validation errors
    // 1. Submit form with invalid data
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
