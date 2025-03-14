import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { ListDocumentsArgs } from "../types.js";
import { registerTool } from "../utils/listTools.js";

// Register this tool
registerTool({
  name: "list_documents",
  description: "List documents in the Outline workspace with optional filters",
  inputSchema: {
    properties: {
      collectionId: { 
        type: "string", 
        description: "Filter by collection ID (optional)" 
      },
      query: { 
        type: "string", 
        description: "Search query to filter documents (optional)" 
      },
      limit: { 
        type: "number", 
        description: "Maximum number of documents to return (optional)" 
      },
    },
    type: "object",
  },
}, async function handleListDocuments(args: ListDocumentsArgs) {
  try {
    const params: Record<string, any> = {};
    
    if (args.collectionId) {
      params.collectionId = args.collectionId;
    }
    if (args.query) {
      params.query = args.query;
    }
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.get('/documents', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error listing documents:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}); 