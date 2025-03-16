import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { ListUsersArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'list_users',
    description: 'List and filter all users in the team',
    inputSchema: {
      properties: {
        offset: {
          type: 'number',
          description: 'Pagination offset',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of users to return',
        },
        sort: {
          type: 'string',
          description: 'Field to sort by (e.g., "updatedAt")',
        },
        direction: {
          type: 'string',
          enum: ['ASC', 'DESC'],
          description: 'Sort direction',
        },
        query: {
          type: 'string',
          description: 'Search query to filter users by name or email',
        },
        emails: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Filter users by specific email addresses',
        },
        filter: {
          type: 'string',
          enum: ['all', 'invited', 'active', 'suspended'],
          description: 'Filter users by status',
        },
        role: {
          type: 'string',
          enum: ['admin', 'member', 'viewer', 'guest'],
          description: 'Filter users by role',
        },
      },
      type: 'object',
    },
  },
  async function handleListUsers(args: ListUsersArgs) {
    try {
      const payload: Record<string, any> = {};

      if (args.offset !== undefined) {
        payload.offset = args.offset;
      }

      if (args.limit !== undefined) {
        payload.limit = args.limit;
      }

      if (args.sort !== undefined) {
        payload.sort = args.sort;
      }

      if (args.direction !== undefined) {
        payload.direction = args.direction;
      }

      if (args.query !== undefined) {
        payload.query = args.query;
      }

      if (args.emails !== undefined && args.emails.length > 0) {
        payload.emails = args.emails;
      }

      if (args.filter !== undefined) {
        payload.filter = args.filter;
      }

      if (args.role !== undefined) {
        payload.role = args.role;
      }

      const response = await outlineClient.post('/users.list', payload);
      return response.data;
    } catch (error: any) {
      console.error('Error listing users:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
