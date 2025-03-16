import { test, expect, mockApiResponse, loadTool } from './setup';

test.describe('createTemplateFromDocument Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'create_template_from_document');
  });

  test('should create a template from a document', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.templatize', {
      data: {
        id: 'template123',
        title: 'New Template',
        text: 'Template content',
        template: true,
        createdAt: new Date().toISOString(),
      },
    });

    // TODO: Implement test for template creation
    // 1. Navigate to document
    // 2. Select "Create template" option
    // 3. Confirm template creation
    // 4. Verify template was created

    // Wait for API call
  });

  test('should handle template creation errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.templatize', {
      error: 'Not authorized to create templates',
    });

    // TODO: Implement test for error handling
    // 1. Attempt to create template without permission
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
