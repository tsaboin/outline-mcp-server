import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { DeleteCommentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<DeleteCommentArgs>({
  name: 'delete_comment',
  description: 'Delete a comment from a document',
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
  handler: async function handleDeleteComment(args: DeleteCommentArgs) {
    try {
      const response = await outlineClient.post('/comments.delete', {
        id: args.id,
      });
      return response.data.success;
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
