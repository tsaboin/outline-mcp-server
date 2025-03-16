import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { GetCollectionArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'get_collection',
    description: 'Get details about a specific collection',
    inputSchema: {
      properties: {
        id: {
          type: 'string',
          description: 'ID of the collection to retrieve',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  async function handleGetCollection(args: GetCollectionArgs) {
    try {
      const response = await outlineClient.post(`/collections.info`, { id: args.id });
      return response.data.data;
    } catch (error: any) {
      console.error('Error getting collection:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
