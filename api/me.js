import { getSession } from "./_auth.js";

export default function handler(req, res) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ error: "Not signed in" });
  res.status(200).json({ email: session.email, name: session.name, picture: session.picture });
}
