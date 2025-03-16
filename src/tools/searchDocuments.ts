import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { SearchDocumentsArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<SearchDocumentsArgs>({
  name: 'search_documents',
  description: 'Search for documents in the Outline workspace',
  inputSchema: {
    properties: {
      query: {
        type: 'string',
        description: 'Search query to filter documents',
      },
      collectionId: {
        type: 'string',
        description: 'Filter by collection ID (optional)',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of documents to return (optional)',
      },
    },
    required: ['query'],
    type: 'object',
  },
  handler: async function handleSearchDocuments(args: SearchDocumentsArgs) {
    try {
      const payload: Record<string, any> = {
        query: args.query,
      };

      if (args.collectionId) {
        payload.collectionId = args.collectionId;
      }

      if (args.limit) {
        payload.limit = args.limit;
      }

      const response = await outlineClient.post('/documents.search', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error searching documents:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
