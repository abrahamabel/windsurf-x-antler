# Easy MCP Builder

A Windsurf plugin that scaffolds a ready-to-run FastAPI + FastAPI-MCP server project with one command.

## Features

- Simple one-command scaffolding of FastAPI + FastAPI-MCP server projects
- Automatically creates a minimal project structure with all necessary files
- Integrates with Windsurf's command palette
- Enables Windsurf's Cascade agent to immediately use the new MCP tools

## Installation

Clone this repository or download the release package:

```bash
git clone https://github.com/abrahamabel/windsurf-x-antler.git
```

Install dependencies:

```bash
npm install
```

Compile the extension:

```bash
npm run compile
```

Package the extension:

```bash
npm run package
```

Install the generated VSIX file in Windsurf:

```bash
windsurf --install-extension easy-mcp-builder-0.0.1.vsix
```

## Usage

1. Open Windsurf  
2. Open the command palette (Ctrl+Shift+P or Cmd+Shift+P)  
3. Type "Easy MCP Builder: Create MCP Server" and select the command  
4. Enter a project name (or accept the default "mcp_server")  
5. Select a target directory for the project  
6. The plugin will generate the project and open the `main.py` file  

## Generated Project Structure

The plugin generates a minimal project with the following files:

- `main.py`: A FastAPI application with FastApiMCP integration and a `/ping` endpoint  
- `requirements.txt`: Lists the required dependencies (`fastapi`, `fastapi-mcp`, `uvicorn`)  
- `tsconfig.json`: TypeScript configuration for the extension project  
- `src/extension.ts`: Extension code with scaffolding logic  
- `package.json`: Extension metadata and command contributions  
- `dist/extension.js`: Compiled JavaScript output  

## Running the Generated Server

Navigate to the generated project directory:

```bash
cd <project_name>
pip install -r requirements.txt
uvicorn main:app --reload
```

The server will be available at http://127.0.0.1:8000  
The `/ping` endpoint can be accessed at http://127.0.0.1:8000/ping

## Integrating with Windsurf Cascade

1. Start your MCP server as described above  
2. In Windsurf, open Settings → Cascade → Model Context Protocol → Servers  
3. Add your MCP server URL (`http://127.0.0.1:8000`) to the MCP servers list  
4. Refresh the list – Cascade will now be able to use the tools provided by your MCP server

## Development

### Prerequisites

- Node.js 18+  
- npm  
- Python 3.10+ (for testing the generated server)

### Building

```bash
git clone https://github.com/abrahamabel/windsurf-x-antler.git
npm install
npm run compile
```

### Testing

1. Compile the extension: `npm run compile`  
2. Package it: `npm run package`  
3. Install the VSIX file in Windsurf  
4. Run the command in Windsurf to scaffold a demo project

## Dev Log

- Initial commit: Add README.md  
- chore: Sync README.md with latest edits  
- feat: Add Architecture.md and update README placeholder  
- feat: Add TypeScript configuration (tsconfig.json) for extension project scaffolding  
- feat: Implement core MCP server scaffolding logic (extension.ts, package.json, dist)  
- feat: add main.py scaffold with FastAPI + FastApiMCP integration  
- chore: add detailed comments and logs  
- chore: add requirements.txt with FastAPI, FastAPI-MCP, Uvicorn dependencies and detailed logs/comments  
- fix: Remove stray inline code from package.json title line (restore valid JSON)

## Examples

See the example images in `examples/images/` for usage screenshots and demos.

## License

MIT
