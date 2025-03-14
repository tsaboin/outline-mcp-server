import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { GetDocumentArgs } from "../types.js";
import { registerTool } from "../utils/listTools.js";

// Register this tool
registerTool({
  name: "get_document",
  description: "Get details about a specific document. At least id XOR shareId are required.",
  inputSchema: {
    properties: {
      id: { 
        type: "string", 
        description: "ID of the document to retrieve" 
      },
      shareId: {
        type: "string",
        description: "Share ID (urlId) of the document to retrieve"
      }
    },
    type: "object",
  },
}, async function handleGetDocument(args: GetDocumentArgs) {
  try {
    const response = await outlineClient.post(`/documents.info`, { id: args.id });
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}); 