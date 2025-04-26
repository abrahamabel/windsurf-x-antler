<!-- Title -->
<h1 align="center">
  Windsurf × Antler Hackathon  
  <br/>🌊 Easy MCP Builder Plugin
</h1>

<p align="center">
  <em>“Spin up a custom FastAPI + MCP server for Windsurf’s agents in <strong>under 60 seconds</strong>.”</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-demo">Demo GIF</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-how-it-works">Architecture</a> •
  <a href="#-customising-your-server">Custom Server</a> •
  <a href="#-roadmap">Road-map</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ⚡ Elevator Pitch
Windsurf’s coding agents gain super-powers from **MCP servers**, but crafting one from scratch is fiddly.  
This plugin compresses the entire process into a single command:

> **⌘ ⇧ P → “Create MCP Server” → Project Name**  
> ✅ A ready-to-run **FastAPI + FastApiMCP** project appears, complete with a health-check endpoint and dependency list.

No boilerplate, no context-switching—just immediate extensibility for Cascade’s *Write* & *Chat* agents.

---

## ✨ Features
|  | Capability | Benefit |
|---|------------|---------|
| **One-shot scaffold** | Generates `main.py`, `requirements.txt`, and folder structure | Zero boilerplate |
| **FastAPI + FastApiMCP** | `FastApiMCP(app).mount()` auto-registers MCP routes | Works with Claude, GPT-4, etc. |
| **Health check** | Built-in `/ping` endpoint | Verify server alive in <10 s |
| **Friendly UX** | Two prompts (name & location) + success toast | Stays in developer flow |
| **Cross-platform** | VS Code API; works on macOS, Windows, Linux | No special setup |
| **Hackathon-ready** | Built in 3 h; <200 LOC | Easy to grok & extend |

---

## 🎥 Quick Demo
> _Animated GIF placeholder — drop your recording here_  
> <img src="demo.gif" width="700"/>

---

## 🚀 Getting Started

### Prerequisites
* **Windsurf** ≥ 2025.4  
* **Node 18+** (for the extension host)  
* **Python 3.10+** & `pip` or **Poetry**  
* Run inside a Windsurf workspace with write permissions

### Installation
```bash
# 1. Install the VSIX (local or Marketplace after approval)
windsurf --install-extension easy-mcp-builder.vsix

# 2. Reload Windsurf

Usage

⇧⌘P (or Ctrl+Shift+P)
> Create MCP Server
[enter project name]  e.g.  weather_tool
[choose directory]    (defaults to current workspace)

cd weather_tool
pip install -r requirements.txt
uvicorn main:app --reload   # visit http://127.0.0.1:8000/ping

Add the server (stdio cmd or SSE URL) under
Settings → Cascade → Model Context Protocol → Servers → Refresh.
```
⸻

🧩 How It Works
```
graph TD
    WIDE[Windsurf IDE] -- ⌘⇧P --> PLUGIN[Easy MCP Builder]
    PLUGIN -- Prompts --> USER((Developer))
    PLUGIN -- File Scaffold --> FS[Project Folder]
    FS -- main.py/start --> MCP[FastAPI + FastApiMCP]
    MCP -- Tools --> CASCADE[Cascade Agent]
    subgraph "Run Time"
        MCP -. JSON-RPC .-> CASCADE
    end
```

**1. Command Trigger:** Extension registers createMcpServer in VS Code API.

**2. Minimal Prompts:** Two input boxes gather project name & target dir.

**3. Scaffolder:** Writes main.py with FastAPI boilerplate and `FastApiMCP(app).mount().`

**4. Developer Runs Server:** uvicorn spins up an MCP endpoint.

**5. Cascade Discovers Tools:** Windsurf’s MCP client handshake exposes `/ping` (and future tools) to the agent.

⸻

🛠️ Customising Your Server

Once scaffolded, extend main.py like so:

from fastapi import FastAPI
from fastapi_mcp import FastApiMCP

app = FastAPI()
mcp = FastApiMCP(app).mount()

# Example MCP tool
@app.post("/summarise")
async def summarise(text: str):
    "Summarise arbitrary text."
    return {"summary": text[:100] + "..."}          # ← replace with real logic

Every path you add becomes an MCP-callable function for the LLM.
Just restart the server and click Refresh in Windsurf to reload tools.

⸻

🛤 Roadmap
	•	Settings UI – choose Python / TypeScript template
	•	One-click Start∕Stop MCP server inside Windsurf
	•	Config auto-injection (append to mcp_config.json)
	•	Template gallery & marketplace publishing
	•	Unit tests & CI GitHub Action

⸻

👩‍💻 Contributing
	1.	Fork → create branch → commit PR.
	2.	For new templates, follow TEMPLATE_GUIDE.md.
	3.	All code under MIT; sign CLA in CLA.md.

⸻

📜 License

MIT © 2025 Odyssey Therapeia & Contributors
“Windsurf” is a trademark of @ 2025 Exafunction, Inc. All rights reserved.
FastAPI® is a trademark of Sebastián Ramírez.
Model Context Protocol © Anthropic PBC.

⸻

✍️ Author

Abraham Abel Boodala
Director of Innovation, Odyssey Therapeia

Built at the Windsurf × Antler Hackathon. April 26th 2025
May this save you hours of boilerplate and unleash a wave of custom AI tools.

