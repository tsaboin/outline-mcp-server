#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

// Import tool definitions utility
import { getToolDefinitions, getToolHandlers } from './utils/listTools.js';

// Import all handlers to ensure tool definitions are registered
import './tools/createDocument.js';
import './tools/deleteDocument.js';
import './tools/getCollection.js';
import './tools/getDocument.js';
import './tools/listCollections.js';
import './tools/listDocuments.js';
import './tools/listTeams.js';
import './tools/searchDocuments.js';
import './tools/updateDocument.js';
import './tools/createCollection.js';
import './tools/updateCollection.js';

// Build the capabilities object dynamically from registered tools
const toolsCapabilities: Record<string, boolean> = {};
getToolDefinitions().forEach(tool => {
  toolsCapabilities[tool.name] = true;
});

// Get the tool handlers
const toolHandlers = getToolHandlers();

const server = new Server(
  {
    name: 'outline-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: toolsCapabilities,
    },
  }
);

// Register request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: getToolDefinitions(),
}));

server.setRequestHandler(CallToolRequestSchema, async request => {
  const { params } = request;
  const tool = params.name;
  const parameters = params.arguments || {};

  try {
    // Check if the tool is supported in our capabilities
    if (!toolsCapabilities[tool]) {
      return { error: { code: ErrorCode.InvalidRequest, message: `Tool ${tool} not supported` } };
    }

    // Get the handler for this tool
    const handler = toolHandlers[tool];
    if (!handler) {
      return {
        error: { code: ErrorCode.InvalidRequest, message: `No handler found for tool ${tool}` },
      };
    }

    // Call the handler with the provided parameters
    const result = await handler(parameters);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    if (error instanceof McpError) {
      return { error: { code: error.code, message: error.message } };
    }
    return { error: { code: ErrorCode.InternalError, message: (error as Error).message } };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Outline MCP server running on stdio');
}

main().catch(error => {
  console.error('Server error:', error);
  process.exit(1);
});
