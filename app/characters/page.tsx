"use client";
import { Button } from "@nextui-org/button";
import { Panel } from "./components/Panel";
import { Divider } from "@nextui-org/divider";
import React, { useState } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

const notesData = [
  {
    id: "1",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
  },
];

export default function CharactersPage() {
  const { setNodeRef } = useDroppable({ id: "character-panel" });
  const [notes, setNotes] = useState(notesData);

  const addNewPanel = () => {
    setNotes([
      ...notes,
      { id: `${notes.length + 1}`, content: "asd", position: { x: 0, y: 0 } },
    ]);
  };

  function handleDragEnd(e: DragEndEvent) {
    const note = notes.find((x) => x.id === e.active.id);
    if (note) {
      note.position.x += e.delta.x;
      note.position.y += e.delta.y;
      const _notes = notes.map((x) => {
        if (x.id === note.id) return note;
        return x;
      });
      setNotes(_notes);
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row px-16 dark:bg-gray-navbar">
        <Button onClick={addNewPanel} color="primary">
          Add Panel
        </Button>
      </div>
      <Divider></Divider>
      <DndContext onDragEnd={handleDragEnd}>
        <div
          className="w-full h-full p-5 relative overflow-hidden flex dark:bg-gray-background"
          ref={setNodeRef}
        >
          {notes.map((note) => (
            <Panel
              key={note.id}
              id={note.id}
              styles={{
                position: "absolute",
                left: `${note.position.x}px`,
                top: `${note.position.y}px`,
              }}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
