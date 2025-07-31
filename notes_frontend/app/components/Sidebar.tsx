import { NavLink } from "@remix-run/react";

// PUBLIC_INTERFACE
export default function Sidebar({
  notes,
  selectedNoteId,
  onNewNote,
  mobileOpen,
  setMobileOpen,
}: {
  notes: { id: string; title: string | null }[];
  selectedNoteId?: string;
  onNewNote: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-25 transition-opacity md:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
        onClick={() => setMobileOpen && setMobileOpen(false)}
        onKeyDown={(e) => (e.key === "Escape" || e.key === "Enter") && setMobileOpen && setMobileOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Close sidebar overlay"
      />
      <aside
        className={`fixed z-40 inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200 transition-transform duration-300 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <span className="font-bold text-xl text-primary">Notes</span>
          <button
            className="block md:hidden p-2"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2">
            <button
              className="w-full mb-4 flex items-center gap-2 px-3 py-2 bg-accent text-white rounded hover:bg-accent/90 transition"
              onClick={onNewNote}
              aria-label="New Note"
            >
              <span className="text-lg">+</span> New Note
            </button>
            <ul>
              {notes.length === 0 && (
                <li className="text-gray-500 px-3 py-2">No notes yet.</li>
              )}
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink
                    to={`/notes/${note.id}`}
                    className={({ isActive }) =>
                      `flex px-3 py-2 rounded transition-colors ${
                        isActive || note.id === selectedNoteId
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 text-gray-800"
                      }`
                    }
                  >
                    {note.title || <span className="italic text-gray-400">Untitled</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
