import { redirect } from "@remix-run/node";
import { getNotes } from "~/utils/api";

export async function loader() {
  const notes = await getNotes();
  if (notes.length > 0) {
    return redirect(`/notes/${notes[0].id}`);
  }
  return null;
}

export default function NotesIndex() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="flex flex-col items-center gap-5">
        <span className="text-xl text-gray-400">No note selected</span>
        <span className="text-sm text-gray-500">Create a new note to get started.</span>
      </div>
    </div>
  );
}
