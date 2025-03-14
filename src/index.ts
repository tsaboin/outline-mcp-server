#!/usr/bin/env node

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// Load .env file from the project root
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env") });

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// Import handlers
import {
  handleListDocuments,
  handleGetDocument,
  handleCreateDocument,
  handleUpdateDocument,
  handleDeleteDocument,
  handleListCollections,
  handleGetCollection,
  handleListTeams,
  handleSearchDocuments
} from "./handlers/index.js";

// Import types
import {
  CreateDocumentArgs,
  DeleteDocumentArgs,
  GetCollectionArgs,
  GetDocumentArgs,
  ListCollectionsArgs,
  ListDocumentsArgs,
  ListTeamsArgs,
  SearchDocumentsArgs,
  UpdateDocumentArgs
} from "./types.js";

const server = new Server(
  {
    name: "outline-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {
        list_documents: true,
        get_document: true,
        create_document: true,
        update_document: true,
        delete_document: true,
        list_collections: true,
        get_collection: true,
        list_teams: true,
        search_documents: true,
      },
    },
  }
);

// Register request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_documents",
      description: "List documents in the Outline workspace with optional filters",
      inputSchema: {
        properties: {
          collectionId: { 
            type: "string", 
            description: "Filter by collection ID (optional)" 
          },
          query: { 
            type: "string", 
            description: "Search query to filter documents (optional)" 
          },
          limit: { 
            type: "number", 
            description: "Maximum number of documents to return (optional)" 
          },
        },
        type: "object",
      },
    },
    {
      name: "get_document",
      description: "Get details about a specific document",
      inputSchema: {
        properties: {
          documentId: { 
            type: "string", 
            description: "ID of the document to retrieve" 
          },
        },
        required: ["documentId"],
        type: "object",
      },
    },
    {
      name: "create_document",
      description: "Create a new document",
      inputSchema: {
        properties: {
          title: { 
            type: "string", 
            description: "Title of the document" 
          },
          text: { 
            type: "string", 
            description: "Content of the document in markdown format" 
          },
          collectionId: { 
            type: "string", 
            description: "ID of the collection to add the document to" 
          },
          parentDocumentId: { 
            type: "string", 
            description: "ID of the parent document (if creating a nested document)" 
          },
          publish: { 
            type: "boolean", 
            description: "Whether to publish the document immediately" 
          },
          template: { 
            type: "boolean", 
            description: "Whether this document is a template" 
          }
        },
        required: ["title", "text", "collectionId"],
        type: "object",
      },
    },
    {
      name: "update_document",
      description: "Update an existing document",
      inputSchema: {
        properties: {
          documentId: { 
            type: "string", 
            description: "ID of the document to update" 
          },
          title: { 
            type: "string", 
            description: "New title for the document" 
          },
          text: { 
            type: "string", 
            description: "New content for the document in markdown format" 
          },
          publish: { 
            type: "boolean", 
            description: "Whether to publish the document" 
          },
          done: { 
            type: "boolean", 
            description: "Whether the document is marked as done" 
          }
        },
        required: ["documentId"],
        type: "object",
      },
    },
    {
      name: "delete_document",
      description: "Delete a document",
      inputSchema: {
        properties: {
          documentId: { 
            type: "string", 
            description: "ID of the document to delete" 
          },
        },
        required: ["documentId"],
        type: "object",
      },
    },
    {
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
    },
    {
      name: "get_collection",
      description: "Get details about a specific collection",
      inputSchema: {
        properties: {
          collectionId: { 
            type: "string", 
            description: "ID of the collection to retrieve" 
          },
        },
        required: ["collectionId"],
        type: "object",
      },
    },
    {
      name: "list_teams",
      description: "List all teams in the Outline workspace",
      inputSchema: {
        properties: {
          limit: { 
            type: "number", 
            description: "Maximum number of teams to return (optional)" 
          },
        },
        type: "object",
      },
    },
    {
      name: "search_documents",
      description: "Search for documents across the Outline workspace",
      inputSchema: {
        properties: {
          query: { 
            type: "string", 
            description: "Search query to find documents" 
          },
          collectionId: { 
            type: "string", 
            description: "Filter search to a specific collection (optional)" 
          },
          limit: { 
            type: "number", 
            description: "Maximum number of results to return (optional)" 
          },
        },
        required: ["query"],
        type: "object",
      },
    },
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { params } = request;
  const tool = params.name;
  const parameters = params.arguments || {};

  try {
    let result;
    switch (tool) {
      case "list_documents":
        result = await handleListDocuments(parameters as ListDocumentsArgs);
        break;
      case "get_document":
        result = await handleGetDocument(parameters as GetDocumentArgs);
        break;
      case "create_document":
        result = await handleCreateDocument(parameters as CreateDocumentArgs);
        break;
      case "update_document":
        result = await handleUpdateDocument(parameters as UpdateDocumentArgs);
        break;
      case "delete_document":
        result = await handleDeleteDocument(parameters as DeleteDocumentArgs);
        break;
      case "list_collections":
        result = await handleListCollections(parameters as ListCollectionsArgs);
        break;
      case "get_collection":
        result = await handleGetCollection(parameters as GetCollectionArgs);
        break;
      case "list_teams":
        result = await handleListTeams(parameters as ListTeamsArgs);
        break;
      case "search_documents":
        result = await handleSearchDocuments(parameters as SearchDocumentsArgs);
        break;
      default:
        return { error: { code: ErrorCode.InvalidRequest, message: `Tool ${tool} not supported` } };
    }
    return { result };
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
  console.error("Outline MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
}); 