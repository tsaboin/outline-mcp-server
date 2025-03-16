import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { MoveDocumentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'move_document',
    description: 'Move a document to a new location or collection',
    inputSchema: {
      properties: {
        id: {
          type: 'string',
          description:
            'Unique identifier for the document. Either the UUID or the urlId is acceptable.',
        },
        collectionId: {
          type: 'string',
          description: 'The ID of the collection to move the document to',
        },
        parentDocumentId: {
          type: 'string',
          description:
            'The ID of the parent document to move the document under. If not provided, the document will be moved to the collection root.',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  async function handleMoveDocument(args: MoveDocumentArgs) {
    try {
      const payload: Record<string, any> = {
        id: args.id,
      };

      if (args.collectionId !== undefined) {
        payload.collectionId = args.collectionId;
      }

      if (args.parentDocumentId !== undefined) {
        payload.parentDocumentId = args.parentDocumentId;
      }

      const response = await outlineClient.post('/documents.move', payload);
      return response.data;
    } catch (error: any) {
      console.error('Error moving document:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
