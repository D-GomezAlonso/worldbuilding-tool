"use client";
import { Panel } from "./components/Panel";
import { Divider } from "@nextui-org/divider";
import React, { useMemo } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Toolbar } from "@/components/Toolbar";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  isImagePanel,
  isListPanel,
  isTextPanel,
  ProjectFormType,
} from "@/form-utils/defaultValues";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { TextPanel } from "./components/TextPanel";
import { uuid } from "uuidv4";
import { ImagePanel } from "./components/ImagePanel";

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
    switch (panelType) {
      case "list":
        append({
          id: uuid(),
          position: { x: 0, y: 0 },
          entries: [{ title: "", description: "", id: uuid() }],
        });
        break;
      case "text":
        append({
          id: uuid(),
          position: { x: 0, y: 0 },
          text: "",
        });
        break;
      case "image":
        append({
          id: uuid(),
          position: { x: 0, y: 0 },
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

  const listPanels = useMemo(
    () => panels.filter((panel) => isListPanel(panel)),
    [panels]
  );
  const textPanels = useMemo(
    () => panels.filter((panel) => isTextPanel(panel)),
    [panels]
  );
  const imagePanels = useMemo(
    () => panels.filter((panel) => isImagePanel(panel)),
    [panels]
  );

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
          {listPanels.map((note, index) => (
            <Panel
              key={note.id}
              id={note.id}
              fieldName={`${panelsName}.${index}.entries`}
              styles={{
                position: "absolute",
                left: `${note.position.x}px`,
                top: `${note.position.y}px`,
              }}
            />
          ))}
          {textPanels.map((note, index) => (
            <TextPanel
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
          {imagePanels?.map((note, index) => (
            <ImagePanel
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
