const apiBase =
  typeof window !== "undefined"
    ? (window as { ENV?: { NOTES_API_BASE_URL?: string } }).ENV?.NOTES_API_BASE_URL || "/api"
    : process.env.NOTES_API_BASE_URL || "/api";

export async function getNotes() {
  const res = await fetch(`${apiBase}/notes`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return await res.json();
}

export async function getNote(id: string) {
  const res = await fetch(`${apiBase}/notes/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch note");
  return await res.json();
}

export async function createNote(note: { title?: string; content: string }) {
  const res = await fetch(`${apiBase}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to create note");
  return await res.json();
}

export async function updateNote(id: string, note: { title?: string; content: string }) {
  const res = await fetch(`${apiBase}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update note");
  return await res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`${apiBase}/notes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  // returns nothing or 204
  return true;
}
