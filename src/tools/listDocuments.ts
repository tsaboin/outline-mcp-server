import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { ListDocumentsArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'list_documents',
    description: 'List documents in the Outline workspace with optional filters',
    inputSchema: {
      properties: {
        collectionId: {
          type: 'string',
          description: 'Filter by collection ID (optional)',
        },
        query: {
          type: 'string',
          description: 'Search query to filter documents (optional)',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of documents to return (optional)',
        },
        offset: {
          type: 'number',
          description: 'Pagination offset (optional)',
        },
        sort: {
          type: 'string',
          description: 'Field to sort by (e.g. "updatedAt") (optional)',
        },
        direction: {
          type: 'string',
          description: 'Sort direction, either "ASC" or "DESC" (optional)',
          enum: ['ASC', 'DESC'],
        },
        template: {
          type: 'boolean',
          description: 'Optionally filter to only templates (optional)',
        },
        userId: {
          type: 'string',
          description: 'Optionally filter by user ID (optional)',
        },
        parentDocumentId: {
          type: 'string',
          description: 'Optionally filter by parent document ID (optional)',
        },
        backlinkDocumentId: {
          type: 'string',
          description: 'Optionally filter by backlink document ID (optional)',
        },
      },
      type: 'object',
    },
  },
  async function handleListDocuments(args: ListDocumentsArgs) {
    try {
      const params: Record<string, any> = {};

      // Add all optional parameters if they exist
      if (args.collectionId) params.collectionId = args.collectionId;
      if (args.query) params.query = args.query;
      if (args.limit) params.limit = args.limit;
      if (args.offset) params.offset = args.offset;
      if (args.sort) params.sort = args.sort;
      if (args.direction) params.direction = args.direction;
      if (args.template !== undefined) params.template = args.template;
      if (args.userId) params.userId = args.userId;
      if (args.parentDocumentId) params.parentDocumentId = args.parentDocumentId;
      if (args.backlinkDocumentId) params.backlinkDocumentId = args.backlinkDocumentId;

      const response = await outlineClient.post('/documents.list', params);
      return response.data.data || [];
    } catch (error: any) {
      console.error('Error listing documents:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
