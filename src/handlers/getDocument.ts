import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { GetDocumentArgs } from "../types.js";

export async function handleGetDocument(args: GetDocumentArgs) {
  try {
    const response = await outlineClient.get(`/documents/${args.documentId}`);
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
} 