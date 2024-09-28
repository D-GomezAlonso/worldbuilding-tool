"use client";
import { Panel } from "./components/Panel";
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
import { TextPanel } from "./components/TextPanel";
import { uuid } from "uuidv4";
import { ImagePanel } from "./components/ImagePanel";

export default function CharactersPage({ params }: { params: { id: string } }) {
  const { setNodeRef } = useDroppable({ id: "character-panel" });
  const { watch, control, setValue } = useFormContext<ProjectFormType>();

  const characterIndex = watch("characters").findIndex(
    (character) => character.id === params.id
  );

  const listPanelsName: `characters.${number}.panels.listPanels` = `characters.${characterIndex}.panels.listPanels`;
  const textPanelsName: `characters.${number}.panels.textPanels` = `characters.${characterIndex}.panels.textPanels`;
  const imagePanelsName: `characters.${number}.panels.imagePanels` = `characters.${characterIndex}.panels.imagePanels`;

  const { append: appendListPanel } = useFieldArray({
    control,
    name: listPanelsName,
  });
  const { append: appendTextPanel } = useFieldArray({
    control,
    name: textPanelsName,
  });
  const { append: appendImagePanel } = useFieldArray({
    control,
    name: imagePanelsName,
  });

  const listPanels = useMemo(
    () => watch(listPanelsName),
    [watch(listPanelsName)]
  );
  const textPanels = useMemo(
    () => watch(textPanelsName),
    [watch(textPanelsName)]
  );
  const imagePanels = useMemo(
    () => watch(imagePanelsName),
    [watch(imagePanelsName)]
  );

  const addNewPanel = (panelType: "list" | "text" | "image") => {
    switch (panelType) {
      case "list":
        appendListPanel({
          id: uuid(),
          position: { x: 0, y: 0 },
          entries: [{ title: "", description: "", id: uuid() }],
        });
        break;
      case "text":
        appendTextPanel({
          id: uuid(),
          position: { x: 0, y: 0 },
          entry: "",
        });
        break;
      case "image":
        appendImagePanel({
          id: uuid(),
          position: { x: 0, y: 0 },
          entry: "",
        });
        break;
    }
  };

  function handleDragEnd(e: DragEndEvent) {
    const listPanel = listPanels.find((x) => x.id === e.active.id);
    if (listPanel) {
      listPanel.position.x += e.delta.x;
      listPanel.position.y += e.delta.y;
      const _notes = listPanels.map((x) => {
        if (x.id === listPanel.id) return listPanel;
        return x;
      });
      setValue(listPanelsName, _notes);
    }

    const textPanel = textPanels.find((x) => x.id === e.active.id);
    if (textPanel) {
      textPanel.position.x += e.delta.x;
      textPanel.position.y += e.delta.y;
      const _notes = textPanels.map((x) => {
        if (x.id === textPanel.id) return textPanel;
        return x;
      });
      setValue(textPanelsName, _notes);
    }

    const imagePanel = imagePanels.find((x) => x.id === e.active.id);
    if (imagePanel) {
      imagePanel.position.x += e.delta.x;
      imagePanel.position.y += e.delta.y;
      const _notes = imagePanels.map((x) => {
        if (x.id === imagePanel.id) return imagePanel;
        return x;
      });
      setValue(imagePanelsName, _notes);
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
          {listPanels.map((note, index) => (
            <Panel
              key={note.id}
              id={note.id}
              fieldName={`${listPanelsName}.${index}.entries`}
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
              fieldName={`${textPanelsName}.${index}`}
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
              fieldName={`${imagePanelsName}.${index}`}
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
