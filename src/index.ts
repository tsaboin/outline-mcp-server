#!/usr/bin/env bun
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import fastify from 'fastify';
import { getMcpServer } from './utils/getMcpServer.js';

const mcpServer = await getMcpServer();

// HTTP mode - default behavior
const app = fastify();

// Stateless mode (default, recommended for most deployments)
app.post('/mcp', async (request, reply) => {
  try {
    const httpTransport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    reply.raw.on('close', () => {
      httpTransport.close();
      mcpServer.close();
    });
    await mcpServer.connect(httpTransport);
    await httpTransport.handleRequest(request.raw, reply.raw, request.body);
  } catch (error) {
    if (!reply.sent) {
      reply.code(500).send({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', async (request, reply) => {
  reply.code(405).send({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not allowed.',
    },
    id: null,
  });
});

app.delete('/mcp', async (request, reply) => {
  reply.code(405).send({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Method not allowed.',
    },
    id: null,
  });
});

// Legacy SSE endpoint for older clients
let sseTransport: SSEServerTransport | null = null;
app.get('/sse', async (request, reply) => {
  try {
    // Create SSE transport for legacy clients
    if (!sseTransport) {
      sseTransport = new SSEServerTransport('/messages', reply.raw);
      await mcpServer.connect(sseTransport);
    }
  } catch (error) {
    console.error(error);
    if (!reply.sent) {
      reply.code(500).send({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

// Legacy message endpoint for older clients
app.post('/messages', async (req, res) => {
  if (!sseTransport) {
    res.status(400).send('No transport found');
    return;
  }
  await sseTransport.handlePostMessage(req.raw, res.raw, req.body);
});

const PORT = process.env.OUTLINE_MCP_PORT ? parseInt(process.env.OUTLINE_MCP_PORT, 10) : 6060;
app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(
    `\n\nOutline MCP Server running:\n\tstreamable-http: ${address}/mcp\n\tsse (deprecated): ${address}/sse\n\n`
  );
  console.log('To use this MCP server in stdio mode, run it via `outline-mcp-server-stdio`.');
});
