"use client";
import { Divider } from "@nextui-org/divider";
import React, { useMemo } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Toolbar } from "@/components/Toolbar";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils/defaultValues";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { uuid } from "uuidv4";
import { Panel } from "./components/Panel";

export default function CharactersPage({ params }: { params: { id: string } }) {
  const { setNodeRef } = useDroppable({ id: "character-panel" });
  const { watch, control, setValue } = useFormContext<ProjectFormType>();

  const characterIndex = watch("characters").findIndex(
    (character) => character.id === params.id
  );

  const panelsName: `characters.${number}.panels` = `characters.${characterIndex}.panels`;

  const { append } = useFieldArray({
    control,
    name: panelsName,
  });

  const panels = useMemo(() => watch(panelsName), [watch(panelsName)]);

  const addNewPanel = (panelType: "list" | "text" | "image") => {
    const common = { id: uuid(), position: { x: 0, y: 0 } };

    switch (panelType) {
      case "list":
        append({
          ...common,
          entries: [{ title: "", description: "", id: uuid() }],
        });
        break;
      case "text":
        append({
          ...common,
          text: "",
        });
        break;
      case "image":
        append({
          ...common,
          image: "",
        });
        break;
    }
  };

  function handleDragEnd(e: DragEndEvent) {
    const panel = panels.find((x) => x.id === e.active.id);
    if (panel) {
      panel.position.x += e.delta.x;
      panel.position.y += e.delta.y;
      const _notes = panels.map((x) => {
        if (x.id === panel.id) return panel;
        return x;
      });
      setValue(panelsName, _notes);
    }
  }

  const gridSize = 5;
  const snapToGridModifier = createSnapModifier(gridSize);

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar addNewPanel={addNewPanel} />
      <Divider></Divider>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[snapToGridModifier, restrictToParentElement]}
      >
        <div
          className="w-full h-full p-5 relative overflow-hidden flex dark:bg-gray-background"
          ref={setNodeRef}
        >
          {panels.map((note, index) => (
            <Panel
              key={note.id}
              id={note.id}
              fieldName={`${panelsName}.${index}`}
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
