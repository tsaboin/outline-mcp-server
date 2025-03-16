import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { UpdateCollectionArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
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
          description: 'New title for the collection',
        },
        description: {
          type: 'string',
          description: 'New description for the collection',
        },
        permission: {
          type: 'string',
          description: 'New permission level for the collection (read, read_write)',
        },
        color: {
          type: 'string',
          description: 'New hex color code for the collection',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  async function handleUpdateCollection(args: UpdateCollectionArgs) {
    try {
      const payload: Record<string, any> = {
        id: args.id,
      };

      if (args.name !== undefined) {
        payload.name = args.name;
      }

      if (args.description !== undefined) {
        payload.description = args.description;
      }

      if (args.permission !== undefined) {
        payload.permission = args.permission;
      }

      if (args.color !== undefined) {
        payload.color = args.color;
      }

      const response = await outlineClient.post('/collections.update', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating collection:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
