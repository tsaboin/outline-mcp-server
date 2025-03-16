import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { AskDocumentsArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<AskDocumentsArgs>({
  name: 'ask_documents',
  description:
    'Query documents with natural language. This method allows asking direct questions of your documents - where possible an answer will be provided. Search results will be restricted to those accessible by the current access token. Note that "AI answers" must be enabled for the workspace.',
  inputSchema: {
    properties: {
      query: {
        type: 'string',
        description: 'The natural language query to ask about your documents',
      },
      userId: {
        type: 'string',
        description:
          'Any documents that have not been edited by the user identifier will be filtered out',
      },
      collectionId: {
        type: 'string',
        description: 'A collection to search within',
      },
      documentId: {
        type: 'string',
        description: 'A document to search within',
      },
      statusFilter: {
        type: 'string',
        enum: ['draft', 'archived', 'published'],
        description: 'Any documents that are not in the specified status will be filtered out',
      },
      dateFilter: {
        type: 'string',
        enum: ['day', 'week', 'month', 'year'],
        description:
          'Any documents that have not been updated within the specified period will be filtered out',
      },
    },
    required: ['query'],
    type: 'object',
  },
  handler: async function handleAskDocuments(args: AskDocumentsArgs) {
    try {
      const payload: Record<string, any> = {
        query: args.query,
      };

      if (args.userId) {
        payload.userId = args.userId;
      }

      if (args.collectionId) {
        payload.collectionId = args.collectionId;
      }

      if (args.documentId) {
        payload.documentId = args.documentId;
      }

      if (args.statusFilter) {
        payload.statusFilter = args.statusFilter;
      }

      if (args.dateFilter) {
        payload.dateFilter = args.dateFilter;
      }

      const response = await outlineClient.post('/documents.answerQuestion', payload);
      return response.data;
    } catch (error: any) {
      console.error('Error asking documents:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
