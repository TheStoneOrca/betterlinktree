"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function DocumentTextArea(props: { textareatext?: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.textareatext as any | "<h1>This is your bio</h1>",
    editorProps: {
      attributes: {
        class: "w-72 dark:border-white border-black border h-96",
      },
    },
  });
  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
