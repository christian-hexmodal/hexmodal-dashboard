import { requireAuth } from "./_auth.js";

const VALID_SOURCES = ["computed", "monday"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!requireAuth(req, res)) return;

  const { weekSource } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if (!VALID_SOURCES.includes(weekSource)) return res.status(400).json({ error: "Invalid weekSource" });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = "christian-hexmodal/hexmodal-dashboard";
  const FILE_PATH = "src/App.jsx";
  const API = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

  try {
    const getResp = await fetch(API, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
    });
    const fileData = await getResp.json();
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf8");

    const startMarker = "// ─── WEEK SOURCE DEFAULT START ────────────────────────────────────────────────";
    const endMarker = "// ─── WEEK SOURCE DEFAULT END ──────────────────────────────────────────────────";
    const startIdx = currentContent.indexOf(startMarker);
    const endIdx = currentContent.indexOf(endMarker) + endMarker.length;
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      return res.status(500).json({ error: "Week source markers not found in file" });
    }

    const newBlock = `${startMarker}\n// "computed" = Tuesday-start ISO week (tuesdayWeek below)\n// "monday"   = Monday board formula columns (US Sun-start WEEKNUM)\n// Saved via /api/save-setting → updates this constant on main.\nconst WEEK_SOURCE_DEFAULT = ${JSON.stringify(weekSource)};\n${endMarker}`;

    const updatedContent = currentContent.slice(0, startIdx) + newBlock + currentContent.slice(endIdx);
    if (updatedContent === currentContent) return res.status(200).json({ ok: true, unchanged: true });

    const today = new Date().toISOString().slice(0, 10);
    const putResp = await fetch(API, {
      method: "PUT",
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Set default week source to ${weekSource} (${today})`,
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
