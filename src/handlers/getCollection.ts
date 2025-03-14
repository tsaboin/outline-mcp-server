import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { GetCollectionArgs } from "../types.js";

export async function handleGetCollection(args: GetCollectionArgs) {
  try {
    const response = await outlineClient.get(`/collections/${args.collectionId}`);
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting collection:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
} 