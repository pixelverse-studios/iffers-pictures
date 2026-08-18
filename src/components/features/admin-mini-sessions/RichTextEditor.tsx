"use client";

import { useId, useLayoutEffect, useRef } from "react";
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
  const isComposingRef = useRef(false);
  const lastEmittedValueRef = useRef(value);
  const pendingExternalValueRef = useRef<string | null>(null);
  const id = useId();

  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.innerHTML === value) return;

    if (document.activeElement === editor || isComposingRef.current) {
      if (value !== lastEmittedValueRef.current) {
        pendingExternalValueRef.current = value;
      }
      return;
    }

    pendingExternalValueRef.current = null;
    lastEmittedValueRef.current = value;
    editor.innerHTML = value;
  }, [value]);

  function emitCurrentValue() {
    const nextValue = editorRef.current?.innerHTML ?? "";
    pendingExternalValueRef.current = null;
    lastEmittedValueRef.current = nextValue;
    onChange(nextValue);
  }

  function handleBlur() {
    const editor = editorRef.current;
    const pendingValue = pendingExternalValueRef.current;
    if (!editor || pendingValue === null || isComposingRef.current) return;

    pendingExternalValueRef.current = null;
    lastEmittedValueRef.current = pendingValue;
    if (editor.innerHTML !== pendingValue) {
      editor.innerHTML = pendingValue;
    }
  }

  function runCommand(command: string) {
    editorRef.current?.focus();
    document.execCommand(command);
    emitCurrentValue();
  }

  return (
    <div>
      <p id={`${id}-label`} className="mb-2 block text-sm font-bold text-[var(--foreground)]">{label}</p>
      <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-white focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand-soft)]">
        <div className="flex flex-wrap gap-1 border-b border-[var(--border)] bg-[var(--background-warm)] p-2" aria-label={`${label} formatting`}>
          {tools.map(({ command, label: toolLabel, Icon }) => (
            <button key={command} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand(command)} className="grid h-9 w-9 place-items-center rounded-sm text-[var(--foreground)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand-strong)]" aria-label={toolLabel} title={toolLabel}>
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          ))}
        </div>
        <div
          ref={editorRef}
          id={id}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-labelledby={`${id}-label`}
          aria-multiline="true"
          onBlur={handleBlur}
          onCompositionStart={() => {
            isComposingRef.current = true;
          }}
          onCompositionEnd={() => {
            isComposingRef.current = false;
            emitCurrentValue();
          }}
          onInput={emitCurrentValue}
          className="mini-rich-editor min-h-40 px-4 py-3 text-sm leading-7 text-[var(--foreground)] outline-none"
        />
      </div>
      {helperText && <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{helperText}</p>}
    </div>
  );
}
