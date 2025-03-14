import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { DeleteDocumentArgs } from "../types.js";
import { registerTool } from "../utils/listTools.js";

// Register this tool
registerTool({
  name: "delete_document",
  description: "Delete a document",
  inputSchema: {
    properties: {
      id: { 
        type: "string", 
        description: "ID of the document to delete" 
      },
    },
    required: ["documentId"],
    type: "object",
  },
}, async function handleDeleteDocument(args: DeleteDocumentArgs) {
  try {
    const response = await outlineClient.post(`/documents.delete`, {
      id: args.id
    });
    return { success: response.status === 200 };
  } catch (error: any) {
    console.error('Error deleting document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}); 