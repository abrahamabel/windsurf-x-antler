import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Easy MCP Builder – VS Code extension entry point
 * Registers a command that scaffolds a FastAPI + FastApiMCP server
 */

export function activate(context: vscode.ExtensionContext) {
    console.log('Easy MCP Builder extension activated');

    const disposable = vscode.commands.registerCommand(
        'easy-mcp-builder.createMcpServer',
        async () => {
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

                vscode.window.showInformationMessage(
                    `✅ Project created at ${projectPath}. Run 'pip install -r requirements.txt' then 'uvicorn main:app --reload'.`,
                );

                const doc = await vscode.workspace.openTextDocument(mainPyPath);
                await vscode.window.showTextDocument(doc);
            } catch (err) {
                vscode.window.showErrorMessage(
                    `Error creating MCP server: ${err instanceof Error ? err.message : String(err)}`,
                );
            }
        },
    );

    context.subscriptions.push(disposable);
}

async function generateMcpServer(projectName: string, targetDir: string) {
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

export function deactivate() {}
