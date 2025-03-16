import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { MoveDocumentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<MoveDocumentArgs>({
  name: 'move_document',
  description: 'Move a document to a different collection or parent document',
  inputSchema: {
    properties: {
      id: {
        type: 'string',
        description: 'ID of the document to move',
      },
      collectionId: {
        type: 'string',
        description: 'ID of the collection to move the document to (optional)',
      },
      parentDocumentId: {
        type: 'string',
        description: 'ID of the parent document to move under (optional)',
      },
    },
    required: ['id'],
    type: 'object',
  },
  handler: async function handleMoveDocument(args: MoveDocumentArgs) {
    try {
      const payload: Record<string, any> = {
        id: args.id,
      };

      if (args.collectionId) {
        payload.collectionId = args.collectionId;
      }

      if (args.parentDocumentId) {
        payload.parentDocumentId = args.parentDocumentId;
      }

      const response = await outlineClient.post('/documents.move', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error moving document:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
