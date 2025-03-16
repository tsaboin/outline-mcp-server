import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { UpdateCollectionArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<UpdateCollectionArgs>({
  name: 'update_collection',
  description: 'Update an existing collection',
  inputSchema: {
    properties: {
      id: {
        type: 'string',
        description: 'ID of the collection to update',
      },
      name: {
        type: 'string',
        description: 'New name for the collection (optional)',
      },
      description: {
        type: 'string',
        description: 'New description for the collection (optional)',
      },
      permission: {
        type: 'string',
        description: 'New permission setting for the collection (optional)',
      },
      color: {
        type: 'string',
        description: 'New color for the collection (optional)',
      },
    },
    required: ['id'],
    type: 'object',
  },
  handler: async function handleUpdateCollection(args: UpdateCollectionArgs) {
    try {
      const payload: Record<string, any> = {
        id: args.id,
      };

      if (args.name) {
        payload.name = args.name;
      }

      if (args.description !== undefined) {
        payload.description = args.description;
      }

      if (args.permission) {
        payload.permission = args.permission;
      }

      if (args.color) {
        payload.color = args.color;
      }

      const response = await outlineClient.post('/collections.update', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating collection:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
