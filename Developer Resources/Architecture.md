Easy MCP Builder Plugin Architecture

Overview

The "Easy MCP Builder" plugin is a VS Code-style extension for Windsurf that provides a simple command to scaffold a ready-to-run FastAPI + FastAPI-MCP server project. This document outlines the architecture and structure of the plugin.
Plugin Components

1. Extension Entry Point

extension.ts: Main entry point for the plugin that registers the command and activates the extension.
2. Command Registration

Register the "Create MCP Server" command in Windsurf's command palette.
Hook the command to the scaffolding function.
3. User Input Handling

Prompt for project name (default: "mcp_server").
Prompt for target directory (default: current workspace root).
4. Scaffolding Logic

generateMcpServer(): Core function that creates the FastAPI + FastAPI-MCP server project.
Creates project directory.
Generates main.py with FastAPI app and FastAPI-MCP integration.
Creates requirements.txt with necessary dependencies.
5. Feedback Mechanism

Display success notification with instructions.
Open main.py in the editor for immediate viewing.
File Structure

easy-mcp-builder/
├── package.json         # Extension metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── src/
│   └── extension.ts     # Main extension code
├── templates/           # Templates for generated files
│   ├── main.py.template # Template for FastAPI + MCP server
│   └── requirements.txt.template # Template for dependencies
└── README.md            # Plugin documentation
Data Flow

User activates "Create MCP Server" command from Windsurf command palette.
Plugin prompts for project name and target directory.
Plugin creates project directory and generates files based on templates.
Plugin displays success notification and opens main.py in editor.
Dependencies

VS Code Extension API (compatible with Windsurf)
Node.js file system module (fs.promises) for file operations