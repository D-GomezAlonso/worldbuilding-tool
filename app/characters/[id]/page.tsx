"use client";
import { Panel } from "./components/Panel";
import { Divider } from "@nextui-org/divider";
import React, { useMemo } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Toolbar } from "@/components/Toolbar";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils/defaultValues";

export default function CharactersPage({ params }: { params: { id: string } }) {
  const { setNodeRef } = useDroppable({ id: "character-panel" });
  const { watch, control, setValue } = useFormContext<ProjectFormType>();

  const characterIndex = watch("characters").findIndex(
    (character) => character.id === params.id
  );

  const fieldName: `characters.${number}.panels` = `characters.${characterIndex}.panels`;

  const { append } = useFieldArray({
    control,
    name: fieldName,
  });
  const panels = useMemo(() => watch(fieldName), [watch(fieldName)]);

  const addNewPanel = () => {
    append({
      id: `${panels.length + 1}`,
      position: { x: 0, y: 0 },
      entries: [{ title: "", description: "", id: "1" }],
    });
  };

  function handleDragEnd(e: DragEndEvent) {
    const note = panels.find((x) => x.id === e.active.id);
    if (note) {
      note.position.x += e.delta.x;
      note.position.y += e.delta.y;
      const _notes = panels.map((x) => {
        if (x.id === note.id) return note;
        return x;
      });
      setValue(fieldName, _notes);
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar addNewPanel={addNewPanel} />
      <Divider></Divider>
      <DndContext onDragEnd={handleDragEnd}>
        <div
          className="w-full h-full p-5 relative overflow-hidden flex dark:bg-gray-background"
          ref={setNodeRef}
        >
          {panels.map((note, index) => (
            <Panel
              key={note.id}
              id={note.id}
              fieldName={`${fieldName}.${index}.entries`}
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
