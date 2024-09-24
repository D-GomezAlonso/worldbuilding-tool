"use client";
import { Panel } from "./components/Panel";
import { Divider } from "@nextui-org/divider";
import React, { useEffect, useId, useMemo, useState } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Toolbar } from "@/components/Toolbar";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils/defaultValues";

export default function CharactersPage() {
  const { setNodeRef } = useDroppable({ id: "character-panel" });
  const { watch, control, setValue } = useFormContext<ProjectFormType>();

  const { append } = useFieldArray({
    control,
    name: "characters.0.panels",
  });
  const panels = useMemo(
    () => watch("characters.0.panels"),
    [watch("characters.0.panels")]
  );

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
      setValue("characters.0.panels", _notes);
    }
  }

  useEffect(() => {
    console.log(watch("characters.0.panels"));
  }, [watch("characters.0.panels")]);

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
              panelIndex={index}
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
