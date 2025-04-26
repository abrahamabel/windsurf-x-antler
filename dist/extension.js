"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
/**
 * Easy MCP Builder – VS Code extension entry point
 * Registers a command that scaffolds a FastAPI + FastApiMCP server
 */
function activate(context) {
    console.log('Easy MCP Builder extension activated');
    const disposable = vscode.commands.registerCommand('easy-mcp-builder.createMcpServer', async () => {
        try {
            const projectName = await vscode.window.showInputBox({
                prompt: 'Enter project name',
                placeHolder: 'mcp_server',
                value: 'mcp_server',
            });
            if (!projectName) {
                vscode.window.showErrorMessage('Project creation cancelled: No project name');
                return;
            }
            const defaultUri = vscode.workspace.workspaceFolders?.[0]?.uri;
            const targetDirUri = await vscode.window.showOpenDialog({
                canSelectFolders: true,
                canSelectFiles: false,
                canSelectMany: false,
                openLabel: 'Select Target Directory',
                defaultUri,
            });
            if (!targetDirUri || targetDirUri.length === 0) {
                vscode.window.showErrorMessage('Project creation cancelled: No target directory');
                return;
            }
            const targetDir = targetDirUri[0].fsPath;
            await generateMcpServer(projectName, targetDir);
            const projectPath = path.join(targetDir, projectName);
            const mainPyPath = path.join(projectPath, 'main.py');
            vscode.window.showInformationMessage(`✅ Project created at ${projectPath}. Run 'pip install -r requirements.txt' then 'uvicorn main:app --reload'.`);
            const doc = await vscode.workspace.openTextDocument(mainPyPath);
            await vscode.window.showTextDocument(doc);
        }
        catch (err) {
            vscode.window.showErrorMessage(`Error creating MCP server: ${err instanceof Error ? err.message : String(err)}`);
        }
    });
    context.subscriptions.push(disposable);
}
async function generateMcpServer(projectName, targetDir) {
    const projectPath = path.join(targetDir, projectName);
    await fs.mkdir(projectPath, { recursive: true });
    const mainPy = `from fastapi import FastAPI
from fastapi_mcp import FastApiMCP

app = FastAPI(title=\"${projectName}\")

mcp = FastApiMCP(app)
mcp.mount()

@app.get(\"/ping\")
async def ping():
    return {\"message\": \"pong\"}

if __name__ == \"__main__\":
    import uvicorn
    uvicorn.run(app, host=\"0.0.0.0\", port=8000)
`;
    const requirements = `fastapi\nfastapi-mcp\nuvicorn[standard]\n`;
    await Promise.all([
        fs.writeFile(path.join(projectPath, 'main.py'), mainPy),
        fs.writeFile(path.join(projectPath, 'requirements.txt'), requirements),
    ]);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map