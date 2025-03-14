import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { ListTeamsArgs } from "../types.js";

export async function handleListTeams(args: ListTeamsArgs) {
  try {
    const params: Record<string, any> = {};
    
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.get('/teams', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error listing teams:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
} 