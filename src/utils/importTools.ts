import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Dynamically imports all tool files from the tools directory
 */
export async function registerTools(): Promise<void> {
  // Get the directory path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const toolsDir = path.join(__dirname, '..', 'tools');

  // Import all tool files
  const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.js'));
  for (const file of toolFiles) {
    await import(`../tools/${file}`);
  }
}
