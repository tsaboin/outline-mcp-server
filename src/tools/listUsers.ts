import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { ListUsersArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<ListUsersArgs>({
  name: 'list_users',
  description: 'List all users in the Outline workspace',
  inputSchema: {
    properties: {
      offset: {
        type: 'number',
        description: 'Pagination offset (optional)',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of users to return (optional)',
      },
      sort: {
        type: 'string',
        description: 'Field to sort by (e.g. "name", "email", "createdAt") (optional)',
      },
      direction: {
        type: 'string',
        description: 'Sort direction, either "ASC" or "DESC" (optional)',
        enum: ['ASC', 'DESC'],
      },
      query: {
        type: 'string',
        description: 'Search query to filter users (optional)',
      },
      emails: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Filter by email addresses (optional)',
      },
      filter: {
        type: 'string',
        description: 'Filter by user status (optional)',
        enum: ['all', 'invited', 'active', 'suspended'],
      },
      role: {
        type: 'string',
        description: 'Filter by user role (optional)',
        enum: ['admin', 'member', 'viewer', 'guest'],
      },
    },
    type: 'object',
  },
  handler: async function handleListUsers(args: ListUsersArgs) {
    try {
      const payload: Record<string, any> = {};

      if (args.offset !== undefined) {
        payload.offset = args.offset;
      }

      if (args.limit !== undefined) {
        payload.limit = args.limit;
      }

      if (args.sort) {
        payload.sort = args.sort;
      }

      if (args.direction) {
        payload.direction = args.direction;
      }

      if (args.query) {
        payload.query = args.query;
      }

      if (args.emails && args.emails.length > 0) {
        payload.emails = args.emails;
      }

      if (args.filter) {
        payload.filter = args.filter;
      }

      if (args.role) {
        payload.role = args.role;
      }

      const response = await outlineClient.post('/users.list', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error listing users:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
