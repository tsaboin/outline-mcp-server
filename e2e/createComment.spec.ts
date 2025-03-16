import { test, expect, mockApiResponse, loadTool } from './setup';

test.describe('createComment Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'create_comment');
  });

  test('should create a new comment', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/comments.create', {
      data: {
        id: 'comment123',
        documentId: 'doc123',
        text: 'This is a test comment',
        createdAt: new Date().toISOString(),
      },
    });

    // TODO: Implement test for comment creation
    // 1. Navigate to document
    // 2. Fill in comment form
    // 3. Submit comment
    // 4. Verify comment appears in document

    // Wait for API call
  });

  test('should handle validation errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/comments.create', {
      error: 'Comment text is required',
    });

    // TODO: Implement test for validation errors
    // 1. Submit comment form with empty text
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
