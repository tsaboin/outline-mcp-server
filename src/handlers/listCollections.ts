import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { ListCollectionsArgs } from "../types.js";

export async function handleListCollections(args: ListCollectionsArgs) {
  try {
    const params: Record<string, any> = {};
    
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.get('/collections', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error listing collections:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
} 