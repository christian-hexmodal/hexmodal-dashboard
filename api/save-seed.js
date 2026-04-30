export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { items } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if (!items?.length) return res.status(400).json({ error: "No items provided" });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = "christian-hexmodal/hexmodal-dashboard";
  const FILE_PATH = "src/App.jsx";
  const API = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

  try {
    // Get current file
    const getResp = await fetch(API, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
    });
    const fileData = await getResp.json();
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf8");

    // Build new SEED_ITEMS block
    const itemsJson = items.map(i => JSON.stringify(i)).join(",\n  ");
    const newBlock = `// ─── SEED DATA START ──────────────────────────────────────────────────────────\nconst SEED_ITEMS = [\n  ${itemsJson},\n];\n// ─── SEED DATA END ────────────────────────────────────────────────────────────`;

    // Replace between markers
    const startMarker = "// ─── SEED DATA START ──────────────────────────────────────────────────────────";
    const endMarker = "// ─── SEED DATA END ────────────────────────────────────────────────────────────";
    const startIdx = currentContent.indexOf(startMarker);
    const endIdx = currentContent.indexOf(endMarker) + endMarker.length;
    if (startIdx === -1 || endIdx === -1) return res.status(500).json({ error: "Seed markers not found in file" });

    const updatedContent = currentContent.slice(0, startIdx) + newBlock + currentContent.slice(endIdx);

    // Commit updated file
    const today = new Date().toISOString().slice(0, 10);
    const putResp = await fetch(API, {
      method: "PUT",
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Update seed data from live Monday fetch (${today})`,
        content: Buffer.from(updatedContent).toString("base64"),
        sha: fileData.sha,
      }),
    });

    if (!putResp.ok) {
      const err = await putResp.json();
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
