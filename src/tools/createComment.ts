import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { CreateCommentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<CreateCommentArgs>({
  name: 'create_comment',
  description: 'Create a new comment on a document',
  inputSchema: {
    properties: {
      documentId: {
        type: 'string',
        description: 'ID of the document to comment on',
      },
      text: {
        type: 'string',
        description: 'Content of the comment in markdown format',
      },
      parentCommentId: {
        type: 'string',
        description: 'ID of the parent comment (if replying to a comment)',
      },
      data: {
        type: 'object',
        description: 'Additional data for the comment (optional)',
      },
    },
    required: ['documentId', 'text'],
    type: 'object',
  },
  handler: async function handleCreateComment(args: CreateCommentArgs) {
    try {
      const payload: Record<string, any> = {
        documentId: args.documentId,
        text: args.text,
      };

      if (args.parentCommentId) {
        payload.parentCommentId = args.parentCommentId;
      }

      if (args.data) {
        payload.data = args.data;
      }

      const response = await outlineClient.post('/comments.create', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating comment:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
