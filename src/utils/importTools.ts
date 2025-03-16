import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getToolDefinitions, type ToolDefinition } from './listTools';

/**
 * Dynamically imports all tool files from the tools directory
 */
export async function registerTools(): Promise<Record<string, ToolDefinition<unknown>>> {
  // Get the directory path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const toolsDir = path.join(__dirname, '..', 'tools');

  // Import all tool files
  const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.ts'));
  for (const file of toolFiles) {
    await import(`../tools/${file}`);
  }

  // return tool definitions
  return getToolDefinitions();
}
