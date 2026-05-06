import { setSession, ALLOWED_DOMAIN } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { credential } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if (!credential) return res.status(400).json({ error: "Missing credential" });

  try {
    // Validate ID token via Google's tokeninfo endpoint
    const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    const info = await resp.json();
    if (!resp.ok) return res.status(401).json({ error: info.error_description || "Invalid token" });

    // Check audience matches our client ID
    if (info.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ error: "Token audience mismatch" });
    }

    // Check email is verified and from the allowed Workspace domain
    if (info.email_verified !== "true" && info.email_verified !== true) {
      return res.status(401).json({ error: "Email not verified" });
    }
    if (info.hd !== ALLOWED_DOMAIN) {
      return res.status(403).json({ error: `Only ${ALLOWED_DOMAIN} accounts allowed` });
    }

    setSession(res, { email: info.email, name: info.name, picture: info.picture });
    res.status(200).json({ ok: true, email: info.email, name: info.name, picture: info.picture });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
