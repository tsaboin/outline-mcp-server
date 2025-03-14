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
import axios from "axios";

const API_KEY = process.env.OUTLINE_API_KEY;
const BASE_URL = process.env.OUTLINE_BASE_URL || "https://app.getoutline.com/api";

if (!API_KEY) {
  console.error("Error: OUTLINE_API_KEY environment variable is required");
  console.error("");
  console.error("To use this tool, run it with your Outline API key:");
  console.error("OUTLINE_API_KEY=your-api-key npx outline-mcp");
  console.error("");
  console.error("Or set it in your environment:");
  console.error("export OUTLINE_API_KEY=your-api-key");
  console.error("npx outline-mcp");
  process.exit(1);
}

// Create an Axios instance for the Outline API
const outlineClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});


// Define argument types for tools
type ListDocumentsArgs = {
  collectionId?: string;
  query?: string;
  limit?: number;
};

type GetDocumentArgs = {
  documentId: string;
};

type CreateDocumentArgs = {
  title: string;
  text: string;
  collectionId: string;
  parentDocumentId?: string;
  publish?: boolean;
  template?: boolean;
};

type UpdateDocumentArgs = {
  documentId: string;
  title?: string;
  text?: string;
  publish?: boolean;
  done?: boolean;
};

type DeleteDocumentArgs = {
  documentId: string;
};

type ListCollectionsArgs = {
  limit?: number;
};

type GetCollectionArgs = {
  collectionId: string;
};

type ListTeamsArgs = {
  limit?: number;
};

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
      },
    },
  }
);

// Implement tool handlers
async function handleListDocuments(args: ListDocumentsArgs) {
  try {
    const params: Record<string, any> = {};
    
    if (args.collectionId) {
      params.collectionId = args.collectionId;
    }
    if (args.query) {
      params.query = args.query;
    }
    if (args.limit) {
      params.limit = args.limit;
    }

    const response = await outlineClient.get('/documents', { params });
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error listing documents:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

async function handleGetDocument(args: GetDocumentArgs) {
  try {
    const response = await outlineClient.get(`/documents/${args.documentId}`);
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

async function handleCreateDocument(args: CreateDocumentArgs) {
  try {
    const payload: Record<string, any> = {
      title: args.title,
      text: args.text,
      collectionId: args.collectionId,
    };

    if (args.parentDocumentId) {
      payload.parentDocumentId = args.parentDocumentId;
    }
    if (args.publish !== undefined) {
      payload.publish = args.publish;
    }
    if (args.template !== undefined) {
      payload.template = args.template;
    }

    const response = await outlineClient.post('/documents', payload);
    return response.data.data;
  } catch (error: any) {
    console.error('Error creating document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

async function handleUpdateDocument(args: UpdateDocumentArgs) {
  try {
    const payload: Record<string, any> = {};

    if (args.title !== undefined) {
      payload.title = args.title;
    }
    if (args.text !== undefined) {
      payload.text = args.text;
    }
    if (args.publish !== undefined) {
      payload.publish = args.publish;
    }
    if (args.done !== undefined) {
      payload.done = args.done;
    }

    const response = await outlineClient.patch(`/documents/${args.documentId}`, payload);
    return response.data.data;
  } catch (error: any) {
    console.error('Error updating document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

async function handleDeleteDocument(args: DeleteDocumentArgs) {
  try {
    const response = await outlineClient.delete(`/documents/${args.documentId}`);
    return response.data.data || { success: true };
  } catch (error: any) {
    console.error('Error deleting document:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

async function handleListCollections(args: ListCollectionsArgs) {
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

async function handleGetCollection(args: GetCollectionArgs) {
  try {
    const response = await outlineClient.get(`/collections/${args.collectionId}`);
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting collection:', error.message);
    throw new McpError(ErrorCode.InvalidRequest, error.message);
  }
}

async function handleListTeams(args: ListTeamsArgs) {
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