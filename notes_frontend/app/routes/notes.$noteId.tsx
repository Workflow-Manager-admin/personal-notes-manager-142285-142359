import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, Form, useActionData, useNavigation, useRevalidator } from "@remix-run/react";
import { getNote, updateNote, deleteNote } from "~/utils/api";
import NoteEditor from "~/components/NoteEditor";
import { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
export async function loader({ params }: LoaderFunctionArgs) {
  const { noteId } = params;
  if (!noteId) throw new Response("Not Found", { status: 404 });
  const note = await getNote(noteId);
  return json({ note });
}

// PUBLIC_INTERFACE
export async function action({ request, params }: ActionFunctionArgs) {
  const { noteId } = params;
  if (!noteId) throw new Response("Not Found", { status: 404 });

  const formData = await request.formData();
  const _method = formData.get("_method");
  if (_method === "delete") {
    await deleteNote(noteId);
    return redirect("/notes");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  await updateNote(noteId, { title, content });
  return json({ ok: true });
}

export default function NoteEditorPage() {
  const { note } = useLoaderData<typeof loader>();
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  // Whenever note.id changes, reset local state
  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id, note.title, note.content]);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  // Auto-save on typing (debounced)
  useEffect(() => {
    if (navigation.state === "submitting") return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      const form = document.getElementById("note-form") as HTMLFormElement | null;
      if (form) form.requestSubmit();
    }, 600);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <Form
        id="note-form"
        method="post"
        className="flex flex-col gap-4"
        replace
        onSubmit={() => setTimeout(() => revalidator.revalidate(), 200)}
      >
        <input
          className="text-2xl font-semibold px-2 py-1 rounded border-b border-gray-100 outline-primary mb-2 bg-transparent"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Title"
        />
        <NoteEditor value={content} onChange={setContent} />
        <div className="flex items-center justify-between mt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/80 transition"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Saving..." : "Save"}
          </button>
          <Form method="post" replace onSubmit={() => navigate("/notes")} >
            <input type="hidden" name="_method" value="delete" />
            <button
              type="submit"
              className="px-4 py-2 rounded bg-danger text-white hover:bg-danger/90 transition"
              style={{ backgroundColor: "#e53935" }}
              disabled={navigation.state === "submitting"}
            >
              Delete
            </button>
          </Form>
        </div>
        {actionData?.ok && (
          <span className="text-green-500 text-sm mt-2">Saved!</span>
        )}
      </Form>
    </div>
  );
}
