# Outline MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Outline's API, enabling AI agents to manage documents, collections, and other entities programmatically through the Outline knowledge base platform.

## Features

- **Document Management**
  - Create new documents with customizable properties
  - Get document details
  - Update existing documents
  - Delete documents
  - List documents

- **Collection Management**
  - Get collection details
  - List collections
  - Create and update collections

- **Team Management**
  - List teams/groups
  - Get team/group details

## Prerequisites

- Node.js (v18 or higher)
- An Outline account with API access
- Outline API key with appropriate permissions

## Quick Start

### Installation

```bash
# Install from npm
npm install -g outline-mcp

# Or run directly with npx
npx outline-mcp
```

### Setup

1. Create a `.env` file with your Outline API key:

```
OUTLINE_API_KEY=your_outline_api_key_here
OUTLINE_BASE_URL=https://your-outline-instance.com/api  # Optional, defaults to https://app.getoutline.com/api
```

### Usage

Once installed, you can use the MCP server with AI assistants that support the Model Context Protocol, such as Claude via Cursor.

Example queries your AI assistant can now handle:

- "List all the documents in my Outline workspace"
- "Create a new document in the 'Product' collection"
- "Find all documents related to a specific topic"
- "Update the content of a document"

## Development

```bash
# Clone this repository
git clone https://github.com/mmmeff/outline-mcp.git
cd outline-mcp

# Install dependencies
npm install

# Run the project as an SSE server endpoint 
npm run start

# Run the project as an stdio process
npm run start:stdio
```

## License

MIT 