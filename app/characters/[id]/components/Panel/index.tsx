"use client";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { PanelWrapper } from "../PanelWrapper";
import { Button } from "@nextui-org/button";
import { CardBodyList } from "./CardBodyList";
import { ListItem } from "./types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils/defaultValues";
import { uuid } from "uuidv4";

const baseItem = [
  {
    title: "",
    description: "",
    id: "0",
    list: "0",
  },
];

export const Panel = ({
  id,
  panelIndex,
  styles,
}: {
  id: string;
  panelIndex: number;
  styles: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const { control } = useFormContext<ProjectFormType>();

  const { append } = useFieldArray({
    control,
    name: `characters.0.panels.${panelIndex}.entries`,
  });

  const addListItem = () => {
    append({ title: "", description: "", id: uuid() });
  };

  return (
    <PanelWrapper
      id={id}
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card className="max-w-sm min-h-96 top-0 left-0">
        <CardHeader className="z-0">
          <Input
            defaultValue="Header"
            classNames={{
              inputWrapper: "bg-transparent",
              input: "text-xl font-bold",
            }}
          />
        </CardHeader>
        <Divider />
        <CardBodyList panelIndex={panelIndex} />
        <CardFooter className="flex justify-between">
          <Button isIconOnly onClick={addListItem}>
            <BsPlusLg />
          </Button>
          <div {...listeners}>
            <BsArrowsMove className="cursor-grab active:cursor-grabbing" />
          </div>
        </CardFooter>
      </Card>
    </PanelWrapper>
  );
};
