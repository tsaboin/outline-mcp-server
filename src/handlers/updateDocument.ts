import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import { outlineClient } from "../client.js";
import { UpdateDocumentArgs } from "../types.js";

export async function handleUpdateDocument(args: UpdateDocumentArgs) {
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