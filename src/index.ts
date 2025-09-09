#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server instance
const server = new McpServer({
  name: "b2bizzio-mcp-server",
  version: "1.0.0"
});

// Define schemas for tool arguments (extract shape from Zod schemas)
const GetInfoArgsSchema = {
  topic: z.string().describe("The topic to get information about")
};

const EchoArgsSchema = {
  message: z.string().describe("The message to echo back")
};

// Register tools using the newer registerTool API
server.registerTool(
  "get_info",
  {
    description: "Get information about B2Bizzio services",
    inputSchema: GetInfoArgsSchema
  },
  async ({ topic }) => {
    return {
      content: [
        {
          type: "text",
          text: `Information about ${topic}: This is a sample B2Bizzio MCP server. You can extend this to provide real business intelligence and data services.`
        }
      ]
    };
  }
);

server.registerTool(
  "echo",
  {
    description: "Echo a message back to the user", 
    inputSchema: EchoArgsSchema
  },
  async ({ message }) => {
    return {
      content: [
        {
          type: "text",
          text: `Echo: ${message}`
        }
      ]
    };
  }
);

// Register a simple resource
server.registerResource(
  "welcome",
  "b2bizzio://welcome",
  {
    description: "Welcome message for B2Bizzio MCP server",
    mimeType: "text/plain"
  },
  async () => {
    return {
      contents: [
        {
          uri: "b2bizzio://welcome",
          mimeType: "text/plain",
          text: "Welcome to B2Bizzio MCP Server! This server provides business intelligence tools and data access."
        }
      ]
    };
  }
);

// Register a prompt
server.prompt(
  "business_analysis",
  "Generate a business analysis prompt",
  {
    company: z.string().describe("The company name to analyze")
  },
  async ({ company }, extra) => {
    return {
      description: `Business analysis prompt for ${company}`,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please provide a comprehensive business analysis for ${company}, including market position, competitive advantages, and growth opportunities.`
          }
        }
      ]
    };
  }
);

// Main function to start the server
async function main() {
  // Create stdio transport
  const transport = new StdioServerTransport();
  
  // Connect the server to the transport
  await server.connect(transport);
  
  // Log to stderr (not stdout to avoid interfering with MCP protocol)
  console.error("B2Bizzio MCP Server is running...");
}

// Handle process termination gracefully
process.on('SIGINT', async () => {
  console.error("Shutting down B2Bizzio MCP Server...");
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.error("Shutting down B2Bizzio MCP Server...");
  await server.close();
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
