import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { UpdateDocumentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<UpdateDocumentArgs>({
  name: 'update_document',
  description: 'Update an existing document',
  inputSchema: {
    properties: {
      documentId: {
        type: 'string',
        description: 'ID of the document to update',
      },
      title: {
        type: 'string',
        description: 'New title for the document',
      },
      text: {
        type: 'string',
        description: 'New content for the document in markdown format',
      },
      publish: {
        type: 'boolean',
        description: 'Whether to publish the document',
      },
      done: {
        type: 'boolean',
        description: 'Whether the document is marked as done',
      },
    },
    required: ['documentId'],
    type: 'object',
  },
  handler: async function handleUpdateDocument(args: UpdateDocumentArgs) {
    try {
      const payload: Record<string, any> = {
        id: args.documentId,
      };

      if (args.title !== undefined) {
        payload.title = args.title;
      }

      if (args.text !== undefined) {
        payload.text = args.text;
      }

      if (args.publish !== undefined) {
        payload.publish = args.publish;
      }

      if (args.done !== undefined) {
        payload.done = args.done;
      }

      const response = await outlineClient.post('/documents.update', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating document:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
