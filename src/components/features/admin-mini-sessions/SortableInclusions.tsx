"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface SortableInclusionsProps {
  items: string[];
  onChange: (items: string[]) => void;
}

interface SortableItem {
  id: string;
  label: string;
}

function getSortableItems(items: string[]): SortableItem[] {
  const occurrences = new Map<string, number>();
  return items.map((label) => {
    const occurrence = occurrences.get(label) ?? 0;
    occurrences.set(label, occurrence + 1);
    return { id: `inclusion:${label}:${occurrence}`, label };
  });
}

export function SortableInclusions({ items, onChange }: SortableInclusionsProps) {
  const sortableItems = useMemo(() => getSortableItems(items), [items]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const activeItem = sortableItems.find((item) => item.id === activeId);

  function finishDrag(event: DragEndEvent) {
    setActiveId(null);
    if (!event.over || event.active.id === event.over.id) return;

    const from = sortableItems.findIndex((item) => item.id === event.active.id);
    const to = sortableItems.findIndex((item) => item.id === event.over?.id);
    if (from < 0 || to < 0) return;
    onChange(arrayMove(items, from, to));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(String(event.active.id))}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={finishDrag}
    >
      <SortableContext
        items={sortableItems.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="mt-4 space-y-2" aria-label="Included items in display order">
          {sortableItems.map((item, index) => (
            <SortableInclusion
              key={item.id}
              item={item}
              index={index}
              itemCount={sortableItems.length}
              onMove={(to) => onChange(arrayMove(items, index, to))}
              onRemove={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            />
          ))}
        </ul>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {activeItem ? (
          <div className="flex min-h-12 rotate-[0.4deg] items-center gap-3 rounded-sm border border-[var(--brand)] bg-white px-3 py-2 text-sm shadow-[0_18px_42px_-20px_rgba(38,63,82,0.48)]">
            <GripVertical className="h-4 w-4 text-[var(--brand-strong)]" aria-hidden />
            <span className="font-semibold text-[var(--foreground)]">{activeItem.label}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function SortableInclusion({
  item,
  index,
  itemCount,
  onMove,
  onRemove,
}: {
  item: SortableItem;
  index: number;
  itemCount: number;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: item.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex min-h-12 items-center gap-3 rounded-sm border px-3 py-2 text-sm will-change-transform ${
        isDragging
          ? "border-dashed border-[var(--brand)] bg-[var(--brand-soft)]/45 opacity-35"
          : isOver
            ? "border-[var(--brand)] bg-[var(--brand-soft)]/55 shadow-[inset_4px_0_0_var(--brand)]"
            : "border-transparent bg-[var(--background-warm)]"
      }`}
    >
      <button
        type="button"
        className="grid h-9 w-9 shrink-0 touch-none cursor-grab place-items-center rounded-sm text-[var(--text-muted)] transition-colors hover:bg-white hover:text-[var(--brand-strong)] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand-strong)]"
        aria-label={`Drag ${item.label} to reorder`}
        title="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" aria-hidden />
      </button>
      <span className="flex-1 leading-6 text-[var(--foreground)]">{item.label}</span>
      <div className="flex gap-1">
        <button type="button" onClick={() => onMove(index - 1)} disabled={index === 0} className="h-8 px-2 text-xs font-bold disabled:opacity-30" aria-label={`Move ${item.label} up`}>↑</button>
        <button type="button" onClick={() => onMove(index + 1)} disabled={index === itemCount - 1} className="h-8 px-2 text-xs font-bold disabled:opacity-30" aria-label={`Move ${item.label} down`}>↓</button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="grid h-9 w-9 place-items-center rounded-sm text-red-700 transition-colors hover:bg-red-50"
        aria-label={`Remove inclusion ${item.label}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden />
      </button>
    </li>
  );
}
