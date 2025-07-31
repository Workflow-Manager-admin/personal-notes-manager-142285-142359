import { ReactNode } from "react";

// PUBLIC_INTERFACE
export default function AppHeader({
  onMenuClick,
  title,
  right,
}: {
  onMenuClick?: () => void;
  title?: string;
  right?: ReactNode;
}) {
  return (
    <header className="sticky z-20 top-0 bg-white border-b border-gray-100 flex items-center justify-between h-16 px-4 shadow-sm">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button className="md:hidden p-2 text-gray-600" onClick={onMenuClick} aria-label="Open sidebar">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        )}
        <span className="font-bold tracking-tight text-xl text-primary">{title ?? "Notes"}</span>
      </div>
      <div>{right}</div>
    </header>
  );
}
