# B2Bizzio MCP Server

A TypeScript implementation of a Model Context Protocol (MCP) server for B2Bizzio business intelligence services.

## Overview

This MCP server provides a foundation for integrating B2Bizzio services with AI applications that support the Model Context Protocol. It includes sample tools, resources, and prompts that can be extended with real business intelligence functionality.

## Features

### Tools
- **get_info**: Get information about B2Bizzio services
- **echo**: Echo a message back to the user

### Resources
- **welcome**: Welcome message and server information

### Prompts
- **business_analysis**: Generate comprehensive business analysis prompts

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript project:
   ```bash
   npm run build
   ```

## Running the Server

### As a Standalone Server
```bash
npm start
```

### With MCP Clients

#### Claude Desktop
Add the server to your Claude Desktop configuration:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "b2bizzio-mcp-server": {
      "command": "node",
      "args": ["path/to/b2bizzio-mcp/build/index.js"]
    }
  }
}
```

#### VS Code with MCP Extension
The project includes a `.vscode/mcp.json` configuration file for development and testing.

## Development

### Project Structure
```
b2bizzio-mcp/
├── src/
│   └── index.ts           # Main server implementation
├── build/                 # Compiled JavaScript output
├── .vscode/
│   └── mcp.json          # MCP configuration for VS Code
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled server
- `npm run dev` - Build and run in one command

### Extending the Server

#### Adding New Tools
```typescript
server.registerTool(
  "your_tool_name",
  {
    description: "Description of your tool",
    inputSchema: {
      param1: z.string().describe("Parameter description"),
      param2: z.number().optional().describe("Optional parameter")
    }
  },
  async ({ param1, param2 }) => {
    // Your tool implementation
    return {
      content: [
        {
          type: "text",
          text: `Result: ${param1}`
        }
      ]
    };
  }
);
```

#### Adding New Resources
```typescript
server.registerResource(
  "resource_name",
  "your-protocol://resource-uri",
  {
    description: "Resource description",
    mimeType: "text/plain"
  },
  async () => {
    return {
      contents: [
        {
          uri: "your-protocol://resource-uri",
          mimeType: "text/plain",
          text: "Resource content"
        }
      ]
    };
  }
);
```

#### Adding New Prompts
```typescript
server.prompt(
  "prompt_name",
  "Prompt description",
  {
    param1: z.string().describe("Parameter description")
  },
  async ({ param1 }, extra) => {
    return {
      description: `Generated prompt for ${param1}`,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Your prompt text here with ${param1}`
          }
        }
      ]
    };
  }
);
```

## Testing

You can test the server using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

## Architecture

This server is built on:
- **@modelcontextprotocol/sdk**: Official TypeScript SDK for MCP
- **zod**: Schema validation and type safety
- **TypeScript**: Type-safe development environment

The server uses the stdio transport for communication, making it compatible with most MCP clients.

## Security Considerations

- The server runs with the permissions of the user account
- All tool executions require explicit approval from the MCP client
- Input validation is performed using Zod schemas
- Error handling prevents information leakage

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Build and test locally
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Links

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
