import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { DeleteCommentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'delete_comment',
    description: 'Delete an existing comment',
    inputSchema: {
      properties: {
        id: {
          type: 'string',
          description: 'ID of the comment to delete',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  async function handleDeleteComment(args: DeleteCommentArgs) {
    try {
      const payload = {
        id: args.id,
      };

      const response = await outlineClient.post('/comments.delete', payload);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
