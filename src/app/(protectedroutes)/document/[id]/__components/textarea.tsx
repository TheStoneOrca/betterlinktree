"use client";

import { Button } from "@/components/ui/button";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SaveTextArea from "@/actions/savetextarea";
import FormError from "@/components/formerror";
import "@/components/textarea.css";

export default function DocumentTextArea(props: {
  textareatext?: string;
  documentid: number;
}) {
  const [text, setText] = useState<string>("");
  const [isRecentlySaved, setIsRecentlySaved] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1],
        },
      }),
    ],
    content: props.textareatext as any | "<h1>This is your bio</h1>",
    editorProps: {
      attributes: {
        class: "w-64 dark:border-white border-black border h-96",
      },
    },
    onUpdate: ({ editor }) => {
      setText(editor.getHTML());
    },
  });
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="flex gap-x-1">
        <Button
          onClick={() => {
            editor?.commands.toggleBold();
          }}
        >
          <Bold />
        </Button>
        <Button
          onClick={() => {
            editor?.commands.toggleItalic();
          }}
        >
          <Italic />
        </Button>
        <Button
          onClick={() => {
            editor?.commands.toggleHeading({ level: 1 });
          }}
        >
          H1
        </Button>
        <Button
          onClick={() => {
            editor?.commands.toggleBulletList();
          }}
        >
          <ListBulletIcon />
        </Button>
      </div>
      <EditorContent editor={editor} />
      <form
        action={(data) => {
          try {
            SaveTextArea(data).then((res) => {
              if (res.success) {
                setIsRecentlySaved(true);
                setTimeout(() => {
                  setIsRecentlySaved(false);
                }, 3000);
              } else {
                setError("Unexpected Error while saving. Please try again.");
              }
            });
          } catch (error) {
            console.error(error);
            setError("Unexpected Error while saving. Please try again.");
          }
        }}
      >
        <Input type="hidden" value={text} name="text" />
        <Input type="hidden" value={props.documentid} name="textareadocument" />

        {isRecentlySaved ? (
          <Button variant="secondary" type="submit">
            Recently Saved
          </Button>
        ) : (
          <Button variant="secondary" type="submit">
            Save
          </Button>
        )}

        {error && <FormError message={error} />}
      </form>
    </div>
  );
}
