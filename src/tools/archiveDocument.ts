import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { ArchiveDocumentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<ArchiveDocumentArgs>({
  name: 'archive_document',
  description: 'Archive a document',
  inputSchema: {
    properties: {
      id: {
        type: 'string',
        description: 'ID of the document to archive',
      },
    },
    required: ['id'],
    type: 'object',
  },
  handler: async function handleArchiveDocument(args: ArchiveDocumentArgs) {
    try {
      const response = await outlineClient.post('/documents.archive', {
        id: args.id,
      });
      return response.data.data;
    } catch (error: any) {
      console.error('Error archiving document:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
