#!/usr/bin/env bun
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getMcpServer } from './utils/getMcpServer.js';

const mcpServer = await getMcpServer();

// STDIO mode - for direct client connections
const transport = new StdioServerTransport();
await mcpServer.connect(transport);
// must not write to stdout according to mcp spec
console.error('Outline MCP Server running in STDIO mode');
