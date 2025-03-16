import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { outlineClient } from '../client.js';
import { CreateTemplateFromDocumentArgs } from '../types.js';
import { registerTool } from '../utils/listTools.js';

// Register this tool
registerTool<CreateTemplateFromDocumentArgs>({
  name: 'create_template_from_document',
  description:
    'Create a template from an existing document. This method allows you to create a new template using an existing document as the basis.',
  inputSchema: {
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the document to use as a basis for the template',
      },
    },
    required: ['id'],
    type: 'object',
  },
  handler: async function handleCreateTemplateFromDocument(args: CreateTemplateFromDocumentArgs) {
    try {
      const payload = {
        id: args.id,
      };

      const response = await outlineClient.post('/documents.templatize', payload);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating template from document:', error.message);
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
  },
});
