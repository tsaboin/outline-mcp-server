import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { ListTeamsArgs } from "../types.js";
import { registerTool } from "../utils/listTools.js";

// Register this tool
registerTool({
  name: "list_teams",
  description: "List all teams in the workspace",
  inputSchema: {
    properties: {
      random_string: { 
        type: "string", 
        description: "Dummy parameter for no-parameter tools" 
      },
    },
    required: ["random_string"],
    type: "object",
  },
}, async function handleListTeams(args: ListTeamsArgs) {
  try {
    const response = await outlineClient.get('/collections.list');
    
    // Outline doesn't have teams, but we'll use collections as a proxy
    // Transform the data to match a teams-like schema
    const collections = response.data.data || [];
    return collections.map((collection: any) => ({
      id: collection.id,
      name: collection.name,
      description: collection.description,
    }));
  } catch (error: any) {
    console.error('Error listing teams:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}); 