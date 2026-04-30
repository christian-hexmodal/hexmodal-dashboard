export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const parsed = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (Array.isArray(parsed.mcp_servers)) {
      parsed.mcp_servers = parsed.mcp_servers.map(s =>
        s.name === "monday"
          ? { ...s, authorization_token: process.env.MONDAY_API_TOKEN }
          : s
      );
    }
    const body = JSON.stringify(parsed);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "mcp-client-2025-04-04",
      },
      body,
    });

    const data = await response.json();
    if (!response.ok) console.error("Anthropic error:", response.status, JSON.stringify(data));
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
