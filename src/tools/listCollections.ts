import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { ListCollectionsArgs } from "../types.js";
import { registerTool } from "../utils/listTools.js";

// Register this tool
registerTool({
  name: "list_collections",
  description: "List all collections in the Outline workspace",
  inputSchema: {
    properties: {
      limit: { 
        type: "number", 
        description: "Maximum number of collections to return (optional)" 
      },
    },
    type: "object",
  },
}, async function handleListCollections(args: ListCollectionsArgs) {
  try {
    const params: Record<string, any> = {};
    
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.post('/collections.list', params);
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error listing collections:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}); 