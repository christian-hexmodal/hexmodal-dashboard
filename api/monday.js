import { requireAuth } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!requireAuth(req, res)) return;

  const { cursor } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const query = `
    query ($boardId: ID!, $cursor: String) {
      boards(ids: [$boardId]) {
        items_page(limit: 100, cursor: $cursor) {
          cursor
          items {
            id
            name
            created_at
            column_values(ids: ["multiple_person_mm1myz1a", "color_mm1m5tvr", "date_mm1zzss8", "pulse_log_mm1z7t4v", "formula_mm1zj34x", "formula_mm1zd239"]) {
              id
              text
              value
              ... on FormulaValue { display_value }
              ... on CreationLogValue { created_at }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.MONDAY_API_TOKEN,
        "API-Version": "2024-01",
      },
      body: JSON.stringify({ query, variables: { boardId: "18404792373", cursor: cursor || null } }),
    });

    const data = await response.json();
    if (data.errors) return res.status(400).json({ error: data.errors });

    const parseWeek = s => {
      const n = parseInt(s, 10);
      return Number.isFinite(n) && n >= 1 && n <= 53 ? n : null;
    };

    const page = data.data?.boards?.[0]?.items_page;
    const items = (page?.items || []).map(item => {
      const col = id => item.column_values.find(c => c.id === id);
      const dateVal = col("date_mm1zzss8")?.text || null;
      const creationLog = col("pulse_log_mm1z7t4v");
      const weekCreatedCol = col("formula_mm1zj34x");
      const weekDoneCol = col("formula_mm1zd239");
      return {
        id: item.id,
        name: item.name,
        lead: col("multiple_person_mm1myz1a")?.text || null,
        status: col("color_mm1m5tvr")?.text || null,
        createdDate: item.created_at?.slice(0, 10) || null,
        completedDate: dateVal || null,
        creationLogDate: creationLog?.created_at?.slice(0, 10) || null,
        mondayWeekCreated: parseWeek(weekCreatedCol?.display_value),
        mondayWeekDone: parseWeek(weekDoneCol?.display_value),
      };
    });

    res.status(200).json({ items, nextCursor: page?.cursor || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
