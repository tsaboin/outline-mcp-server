import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { ArchiveDocumentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool(
  {
    name: 'archive_document',
    description:
      'Archive a document to move outdated information out of sight while retaining the ability to search and restore it later',
    inputSchema: {
      properties: {
        id: {
          type: 'string',
          description:
            'Unique identifier for the document. Either the UUID or the urlId is acceptable.',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  async function handleArchiveDocument(args: ArchiveDocumentArgs) {
    try {
      const payload = {
        id: args.id,
      };

      const response = await outlineClient.post('/documents.archive', payload);
      return response.data;
    } catch (error: any) {
      console.error('Error archiving document:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  }
);
