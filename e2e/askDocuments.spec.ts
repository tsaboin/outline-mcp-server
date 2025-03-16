import { test, expect, mockApiResponse, loadTool } from './setup';

test.describe('askDocuments Tool', () => {
  test.beforeEach(async ({ page }) => {
    await loadTool(page, 'ask_documents');
  });

  test('should ask questions about documents', async ({ page }) => {
    // Mock API response
    await mockApiResponse(page, '/api/documents.ask', {
      data: {
        answer: 'This is the answer to your question about the documents.',
        documents: [
          { id: 'doc1', title: 'Document 1' },
          { id: 'doc2', title: 'Document 2' },
        ],
      },
    });

    // TODO: Implement test for asking questions
    // 1. Enter question
    // 2. Submit question form
    // 3. Verify answer is displayed
    // 4. Verify referenced documents are shown

    // Wait for API call
  });

  test('should handle empty results', async ({ page }) => {
    // Mock response with no relevant documents
    await mockApiResponse(page, '/api/documents.ask', {
      data: {
        answer: 'No information found about your query.',
        documents: [],
      },
    });

    // TODO: Implement test for no results
    // 1. Enter question with no relevant documents
    // 2. Submit question form
    // 3. Verify empty results message is displayed

    // Wait for API call
  });

  test('should handle query errors', async ({ page }) => {
    // Mock error response
    await mockApiResponse(page, '/api/documents.ask', {
      error: 'Failed to process question',
    });

    // TODO: Implement test for error handling
    // 1. Enter invalid question
    // 2. Submit question form
    // 3. Verify error message is displayed

    // Wait for API call
  });
});
