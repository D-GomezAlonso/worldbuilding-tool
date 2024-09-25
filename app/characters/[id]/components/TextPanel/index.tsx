"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { CSSProperties } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { PanelWrapper } from "../PanelWrapper";
import { useDraggable } from "@dnd-kit/core";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils/defaultValues";

export const TextPanel = ({
  id,
  fieldName,
  styles,
}: {
  id: string;
  fieldName: `characters.${number}.panels.textPanels.${number}`;
  styles: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const { watch, setValue } = useFormContext<ProjectFormType>();

  return (
    <PanelWrapper
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card
        className="top-0 left-0"
        classNames={{ base: "resize min-h-80 min-w-80 h-96" }}
      >
        <CardHeader className="z-0 flex gap-4">
          <Input
            defaultValue="Header"
            classNames={{
              inputWrapper: "bg-transparent",
              input: "text-xl font-bold",
            }}
          />
          <div {...listeners}>
            <BsArrowsMove className="cursor-grab active:cursor-grabbing" />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3 h-full">
          <Textarea
            size="lg"
            fullWidth
            disableAnimation
            disableAutosize
            placeholder="Entry your text in this text panel!"
            classNames={{
              base: "flex-1",
              mainWrapper: "flex-1",
              inputWrapper: "flex-1",
              input: "flex-1 min-h-full",
            }}
            onInput={(e) =>
              setValue(`${fieldName}.entry`, e.currentTarget.value)
            }
            value={watch(`${fieldName}.entry`)}
          />
        </CardBody>
      </Card>
    </PanelWrapper>
  );
};
