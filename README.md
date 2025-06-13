# Outline MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with [Outline](https://www.getoutline.com/)'s API, enabling AI agents to manage documents, collections, and other entities programmatically through the Outline knowledge base platform.

## 🚨 \***\*Upgrade Notice:\*\*** v5 has introduced several breaking changes: 🚨

- support has been dropped for the `stdio` transport interfaces.
  - This server now exposes:
    - a [Streamable-HTTP endpoint](https://modelcontextprotocol.io/specification/draft/basic/transports#streamable-http) at the `/mcp` route.
    - an SSE endpoint at `/sse`
  - If you require stdio, downgrade to v4
- the `--port` CLI flag has been migrated to an environment variable, `OUTLINE_MCP_PORT`
- Minimum node version has been bumped to 20

## Features

- **Document Management**

  - ✅ Create new documents with customizable properties
  - ✅ Get document details
  - ✅ Update existing documents
  - ✅ Delete documents
  - ✅ List documents
  - ✅ Search documents
  - ✅ Ask natural language questions about documents
  - ✅ Create templates from existing documents
  - ✅ Move documents to different collections or locations
  - ✅ Archive documents

- **Collection Management**

  - ✅ Get collection details
  - ✅ List collections
  - ✅ Create and update collections

- **Comment Management**

  - ✅ Create comments on documents
  - ✅ Update existing comments
  - ✅ Delete comments

- **User Management**
  - ✅ List and filter users

## Quick Start

### Prerequisites

- Node.js (v20 or higher)
- Outline account with API access
- Outline API key with appropriate permissions
- Note: if you need to use the AI-powered ask feature, you must enable the "AI Answers" feature in your Outline Workspace settings

### Installation

```bash
# (preferred) Run directly with npx
OUTLINE_API_KEY=... npx outline-mcp-server

# or install from npm
npm install -g outline-mcp-server
OUTLINE_API_KEY=... outline-mcp-server
```

### Env

- `OUTLINE_API_KEY` (_required_): your API key for outline, duh
- `OUTLINE_API_URL` (_optional_): Alternative URL for your outline API (if using an alt domain/self-hosting)
- `OUTLINE_MCP_PORT` (_optional_): Specify the port on which the server will run (default: 6060)

### Usage

Once installed, you can use the MCP server with AI assistants that support the Model Context Protocol, such as Claude via Cursor.

Example queries your AI assistant can now handle:

- "List all the documents in my Outline workspace"
- "Create a new document in the 'Product' collection"
- "Find all documents related to a specific topic"
- "Ask a natural language question about your documents"
- "Create a template from an existing document"
- "Update the content of a document"
- "Add a comment to a document"

### Run the MCP server

```bash
# Default port 6060
OUTLINE_API_KEY=... npm run start:http

# Or specify a custom port
OUTLINE_API_KEY=... OUTLINE_MCP_PORT=9001 npm run start:http
```

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

# Optional -------
# OUTLINE_API_URL=https://your-outline-instance.com/api # defaults to https://app.getoutline.com/api
# OUTLINE_MCP_PORT=9001
```

```bash
# Builds/watches the project alongside running @modelcontextprotocol/inspector
npm run dev
```

## Contributing

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for automated versioning and package publishing. Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for your commit messages to ensure proper versioning.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute to this project.

## Release Process

Releases are fully automated using semantic-release and GitHub Actions. When commits are pushed to the `master` branch, the following happens:

1. The CI pipeline runs tests and builds the package
2. semantic-release analyzes commit messages to determine the next version number
3. A new version is automatically published to npm
4. A GitHub release is created with auto-generated release notes
5. The CHANGELOG.md file is updated

No manual version bumping or release creation is needed.

## License

MIT
