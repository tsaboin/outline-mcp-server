import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { SearchDocumentsArgs } from "../types.js";

export async function handleSearchDocuments(args: SearchDocumentsArgs) {
  try {
    const params: Record<string, any> = {
      query: args.query,
    };
    
    if (args.collectionId) {
      params.collectionId = args.collectionId;
    }
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.get('/documents/search', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error searching documents:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
} 