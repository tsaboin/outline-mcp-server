import test from '@playwright/test';
import { mockApiResponse, loadTool } from './setup';

test.describe('archiveDocument Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'archive_document');
  });
  test('should archive a document', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.archive', {
      data: {
        id: 'doc123',
        title: 'Test Document',
        archivedAt: new Date().toISOString(),
      },
    });

    // TODO: Implement test for document archiving
    // 1. Navigate to document
    // 2. Trigger archive action
    // 3. Confirm archive
    // 4. Verify document is archived

    // Wait for API call
  });

  test('should handle archive errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.archive', {
      error: 'Not authorized to archive document',
    });

    // TODO: Implement test for error handling
    // 1. Attempt to archive document without permission
    // 2. Verify error message is displayed

    // Wait for API call
  });
});
