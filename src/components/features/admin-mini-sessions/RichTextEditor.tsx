"use client";

import { useEffect, useId, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
}

const tools = [
  { command: "bold", label: "Bold", Icon: Bold },
  { command: "italic", label: "Italic", Icon: Italic },
  { command: "underline", label: "Underline", Icon: Underline },
  { command: "insertUnorderedList", label: "Bulleted list", Icon: List },
  { command: "insertOrderedList", label: "Numbered list", Icon: ListOrdered },
] as const;

export function RichTextEditor({ label, value, onChange, helperText }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && document.activeElement !== editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  function runCommand(command: string) {
    editorRef.current?.focus();
    document.execCommand(command);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-[var(--foreground)]">{label}</label>
      <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-white focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand-soft)]">
        <div className="flex flex-wrap gap-1 border-b border-[var(--border)] bg-[var(--background-warm)] p-2" aria-label={`${label} formatting`}>
          {tools.map(({ command, label: toolLabel, Icon }) => (
            <button key={command} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand(command)} className="grid h-9 w-9 place-items-center rounded-sm text-[var(--foreground)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand-strong)]" aria-label={toolLabel} title={toolLabel}>
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          ))}
        </div>
        <div ref={editorRef} id={id} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" onInput={(event) => onChange(event.currentTarget.innerHTML)} className="mini-rich-editor min-h-40 px-4 py-3 text-sm leading-7 text-[var(--foreground)] outline-none" dangerouslySetInnerHTML={{ __html: value }} />
      </div>
      {helperText && <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{helperText}</p>}
    </div>
  );
}
