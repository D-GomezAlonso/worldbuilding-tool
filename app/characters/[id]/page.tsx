"use client";
import { Divider } from "@nextui-org/divider";
import React, { useMemo } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Toolbar } from "@/components/Toolbar";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createNewPanel, ProjectFormType } from "@/form-utils";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { Panel } from "./components/Panel";

export default function CharactersPage({ params }: { params: { id: string } }) {
  const { setNodeRef } = useDroppable({ id: "character-panel" });
  const { watch, control, setValue } = useFormContext<ProjectFormType>();

  const gridSize = 5;
  const snapToGridModifier = createSnapModifier(gridSize);

  const characterIndex = watch("characters").findIndex(
    (character) => character.id === params.id
  );

  const panelsName: `characters.${number}.panels` = `characters.${characterIndex}.panels`;

  const { append } = useFieldArray({
    control,
    name: panelsName,
  });

  const panels = useMemo(() => watch(panelsName), [watch(panelsName)]);

  const addNewPanel = (panelType: "list" | "text" | "image") =>
    append(createNewPanel(panelType));

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
