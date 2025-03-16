# Outline MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with [Outline](https://www.getoutline.com/)'s API, enabling AI agents to manage documents, collections, and other entities programmatically through the Outline knowledge base platform.

## Features

- **Document Management**

  - ✅ Create new documents with customizable properties
  - ✅ Get document details
  - ✅ Update existing documents
  - ✅ Delete documents
  - ✅ List documents
  - ✅ Search documents

- **Collection Management**

  - ✅ Get collection details
  - ✅ List collections
  - ✅ Create and update collections

- **Comment Management**
  - ✅ Create comments on documents
  - ✅ Update existing comments

> **Note:** The SSE server implementation uses [Supergateway](https://github.com/supercorp-ai/supergateway), which provides more reliable connectivity when used with Cursor's MCP integration.

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- An Outline account with API access
- Outline API key with appropriate permissions

### Installation

```bash
# Run directly with npx
OUTLINE_API_KEY=… npx outline-mcp-server

# or install from npm
npm install -g outline-mcp-server
OUTLINE_API_KEY=… outline-mcp-server

# Run with a custom port (default is 6060)
OUTLINE_API_KEY=… outline-mcp-server --port 7070
```

### Env

- `OUTLINE_API_KEY` (_required_): your API key for outline, duh
- `OUTLINE_BASE_URL` (_optional_): Alternative URL for your outline API (if using an alt domain/self-hosting)

### CLI Options

- `--port <number>` (_optional_): Specify the port on which the server will run (default: 6060)

### Usage

Once installed, you can use the MCP server with AI assistants that support the Model Context Protocol, such as Claude via Cursor.

Example queries your AI assistant can now handle:

- "List all the documents in my Outline workspace"
- "Create a new document in the 'Product' collection"
- "Find all documents related to a specific topic"
- "Update the content of a document"
- "Add a comment to a document"

## Development

```bash
# Clone this repository
git clone https://github.com/mmmeff/outline-mcp.git
cd outline-mcp

# Install dependencies
npm install
```

### Create a `.env` file with your Outline API key:

```
OUTLINE_API_KEY=your_outline_api_key_here
OUTLINE_BASE_URL=https://your-outline-instance.com/api  # Optional, defaults to https://app.getoutline.com/api
```

```bash
# Run the project as an SSE server endpoint
npm run start

# Run the project as an stdio process
npm run start:stdio
```

## License

MIT
