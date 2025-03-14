import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { CreateDocumentArgs } from "../types.js";

export async function handleCreateDocument(args: CreateDocumentArgs) {
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