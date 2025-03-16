import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { UpdateCommentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'update_comment',
    description: 'Update an existing comment',
    inputSchema: {
      properties: {
        id: {
          type: 'string',
          description: 'ID of the comment to update',
        },
        text: {
          type: 'string',
          description: 'New content for the comment in markdown format',
        },
        data: {
          type: 'object',
          description: 'Additional data for the comment',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  async function handleUpdateComment(args: UpdateCommentArgs) {
    try {
      const payload: Record<string, any> = {
        id: args.id,
      };

      if (args.text !== undefined) {
        payload.text = args.text;
      }

      if (args.data !== undefined) {
        payload.data = args.data;
      }

      const response = await outlineClient.post('/comments.update', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating comment:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
