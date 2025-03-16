import type { Tool } from '@modelcontextprotocol/sdk/types';

// Define a type for handler functions
export type ToolHandler<Args> = (args: Args) => Promise<unknown>;

/**
 * Utility to collect tool definitions from handler modules
 */

// Define the tool schema interface
export interface ToolDefinition<Args> extends Tool {
  handler: ToolHandler<Args>;
}

// We'll collect all tool definitions here, keyed by name
const toolDefinitions: Record<string, ToolDefinition<unknown>> = {};

// Function to register a tool definition
export function registerTool<Args>(definition: ToolDefinition<Args>): void {
  toolDefinitions[definition.name] = definition as unknown as ToolDefinition<unknown>;
}

// Function to get all registered tool definitions
export function getToolDefinitions(): Record<string, ToolDefinition<unknown>> {
  return toolDefinitions;
}
