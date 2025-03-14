import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { SearchDocumentsArgs } from "../types.js";
import { registerTool } from "../utils/listTools.js";

// Register this tool
registerTool({
  name: "search_documents",
  description: "Search for documents in the Outline workspace",
  inputSchema: {
    properties: {
      query: { 
        type: "string", 
        description: "Search query to filter documents" 
      },
      limit: { 
        type: "number", 
        description: "Maximum number of documents to return (optional)" 
      },
    },
    required: ["query"],
    type: "object",
  },
}, async function handleSearchDocuments(args: SearchDocumentsArgs) {
  try {
    const params: Record<string, any> = {
      query: args.query
    };
    
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.get('/documents.search', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error searching documents:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}); 