import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getToolDefinitions, type ToolDefinition } from './listTools.js';

/**
 * Dynamically imports all tool files from the tools directory
 */
export async function registerTools(): Promise<Record<string, ToolDefinition<unknown>>> {
  // Get the directory path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const toolsDir = path.join(__dirname, '..', 'tools');

  // Import all tool files
  const toolFiles = fs
    .readdirSync(toolsDir)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'));
  for (const file of toolFiles) {
    const resolved = path.resolve(toolsDir, file);
    await import(resolved);
  }

  // return tool definitions
  return getToolDefinitions();
}
