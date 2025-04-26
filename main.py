from fastapi import FastAPI
from fastapi_mcp import FastApiMCP

app = FastAPI(title="test-mcp-project")

# Integrate MCP server into the FastAPI app
mcp = FastApiMCP(app)
mcp.mount()

# Example endpoint (tool) for demonstration
@app.get("/ping")
async def ping():
    return {"message": "pong"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
