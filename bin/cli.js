#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the built index.js file
const serverPath = resolve(__dirname, '../build/index.js');

// Spawn the supergateway process
const gateway = spawn('npx', [
  '-y',
  'supergateway',
  '--port',
  '6060',
  '--stdio',
  `node ${serverPath}`
], {
  stdio: 'inherit',
  shell: true
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('SIGINT received, killing outline-mcp-server');
  gateway.kill('SIGINT');
});

gateway.on('close', (code) => {
  console.log('outline-mcp-server exited with code', code);
  process.exit(code);
}); 