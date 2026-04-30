export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

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
            column_values(ids: ["multiple_person_mm1myz1a", "color_mm1m5tvr", "date_mm1zzss8"]) {
              id
              text
              value
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

    const page = data.data?.boards?.[0]?.items_page;
    const items = (page?.items || []).map(item => {
      const col = id => item.column_values.find(c => c.id === id);
      const dateVal = col("date_mm1zzss8")?.text || null;
      return {
        id: item.id,
        name: item.name,
        lead: col("multiple_person_mm1myz1a")?.text || null,
        status: col("color_mm1m5tvr")?.text || null,
        createdDate: item.created_at?.slice(0, 10) || null,
        completedDate: dateVal || null,
      };
    });

    res.status(200).json({ items, nextCursor: page?.cursor || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
