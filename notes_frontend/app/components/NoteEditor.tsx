import { ChangeEvent } from "react";

// PUBLIC_INTERFACE
export default function NoteEditor({
  value,
  onChange,
  placeholder = "Start writing your note...",
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <textarea
      className="w-full min-h-[60vh] p-4 border border-gray-200 rounded bg-gray-50 text-base font-normal outline-primary focus:border-primary transition"
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
