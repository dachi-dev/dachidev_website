const API_URL =
  import.meta.env.VITE_API_URL || "https://dachidev-api.tommyhojobs.workers.dev";

export async function sendMessage(messages) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}
