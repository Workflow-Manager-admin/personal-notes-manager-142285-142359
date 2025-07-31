import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { useState } from "react";
import Sidebar from "~/components/Sidebar";
import AppHeader from "~/components/AppHeader";
import { getNotes, createNote } from "~/utils/api";

// PUBLIC_INTERFACE
export async function loader() {
  const notes = await getNotes();
  return json({ notes });
}

export default function NotesLayout() {
  const { notes } = useLoaderData<typeof loader>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  async function handleNewNote() {
    // Create empty note, then redirect to its editor page.
    const note = await createNote({ title: "", content: "" });
    revalidator.revalidate();
    navigate(`/notes/${note.id}`);
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar
        notes={notes}
        onNewNote={handleNewNote}
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} title="Notes" />
        <main className="flex-1 overflow-y-auto p-4 bg-white max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
