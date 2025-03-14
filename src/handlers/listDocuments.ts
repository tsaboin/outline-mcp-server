import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { ListDocumentsArgs } from "../types.js";

export async function handleListDocuments(args: ListDocumentsArgs) {
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
} 