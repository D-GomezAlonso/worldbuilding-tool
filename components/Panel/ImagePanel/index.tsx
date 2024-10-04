"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { ChangeEvent, CSSProperties } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { PanelWrapper } from "../PanelWrapper";
import { useDraggable } from "@dnd-kit/core";
import { useFormContext } from "react-hook-form";
import { ProjectFormType } from "@/form-utils";
import { BsImage } from "react-icons/bs";
import { FormPanelPages } from "../types";

export const ImagePanel = ({
  id,
  fieldName,
  styles,
}: {
  id: string;
  fieldName: `${FormPanelPages}.${number}.panels.${number}`;
  styles: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const fileToString = (e: ChangeEvent<HTMLInputElement>) => {
    const upload = e.target.files?.[0];
    return upload ? URL.createObjectURL(upload) : "";
  };

  return (
    <PanelWrapper
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card
        className="group flex-row -outline-offset-2 resize "
        classNames={{
          header: "group hidden group-hover/:flex ",
          base: "relative  h-96 w-96 overflow-hidden ",
          footer: "group hidden  group-hover/:flex",
        }}
      >
        <CardHeader className="absolute top-0 gap-4 z-[1]">
          <Input
            defaultValue="Header"
            classNames={{
              inputWrapper: "bg-transparen z-[1]",
              input: "text-xl font-bold z-[1]",
            }}
          />
          <div {...listeners}>
            <BsArrowsMove className="cursor-grab active:cursor-grabbing" />
          </div>
        </CardHeader>

        <CardBody className="flex flex-col h-full w-full overflow-hidden p-0 active:z-10">
          <div className="flex h-full w-[300%] overflow-hidden">
            <div className="h-full  w-full" />
            <Image
              alt="Card background"
              classNames={{
                wrapper: [
                  "h-full w-full !max-w-full -translate-x-full",
                  "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:group-hover:bg-radial-gradient",
                ],
                img: "object-cover w-full h-full z-5",
              }}
              src={
                watch(`${fieldName}.image`) ||
                "https://via.placeholder.com/300x300"
              }
            />
            <div className="h-full  w-full" />
          </div>
        </CardBody>

        <CardFooter className="absolute bottom-0 p-0">
          <input
            type="file"
            name="myImage"
            className="opacity-0 p-2 w-full h-full z-20 cursor-pointer"
            onChange={(e) => {
              setValue(`${fieldName}.image`, fileToString(e));
            }}
          />
          <div className="flex items-center gap-2 absolute left-3 z-10">
            <BsImage /> Upload Image
          </div>
        </CardFooter>
      </Card>
    </PanelWrapper>
  );
};
