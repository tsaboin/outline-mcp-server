import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { DeleteDocumentArgs } from "../types.js";

export async function handleDeleteDocument(args: DeleteDocumentArgs) {
  try {
    const response = await outlineClient.delete(`/documents/${args.documentId}`);
    return response.data.data || { success: true };
  } catch (error: any) {
    console.error('Error deleting document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
} 