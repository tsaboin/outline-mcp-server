/**
 * Utility to collect tool definitions from handler modules
 */

// Define the tool schema interface
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    properties: Record<string, any>;
    required?: string[];
    type: string;
  };
}

// Define a type for handler functions
export type ToolHandler = (args: any) => Promise<any>;

// We'll collect all tool definitions here
const toolDefinitions: ToolDefinition[] = [];

// Map of tool names to handler functions
const toolHandlers: Record<string, ToolHandler> = {};

// Function to register a tool definition
export function registerTool(definition: ToolDefinition, handler: ToolHandler): void {
  toolDefinitions.push(definition);
  toolHandlers[definition.name] = handler;
}

// Function to get all registered tool definitions
export function getToolDefinitions(): ToolDefinition[] {
  return toolDefinitions;
}

// Function to get all registered tool handlers
export function getToolHandlers(): Record<string, ToolHandler> {
  return toolHandlers;
}
