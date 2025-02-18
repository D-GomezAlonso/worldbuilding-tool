'use client';
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { ChangeEvent, CSSProperties } from 'react';
import { BsArrowsMove } from 'react-icons/bs';
import { PanelWrapper } from '../PanelWrapper';
import { useDraggable } from '@dnd-kit/core';
import { useFormContext } from 'react-hook-form';
import { ProjectFormType } from '../../../form-utils';
import { BsImage } from 'react-icons/bs';
import { FormPanelPages } from '../types';
import { useProjectPathContext } from '../../../context/projectPathContext';

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
  const { projectPath } = useProjectPathContext();

  function saveImage(e: ChangeEvent<HTMLInputElement>) {
    const upload = e.target.files?.[0];
    if (upload) {
      const savedImagePath = window.electron.files.saveImage(
        projectPath ?? '',
        upload,
      );
      setValue(`${fieldName}.image`, savedImagePath);
    }
  }

  function readImageAsBase64() {
    const placeholder = 'https://via.placeholder.com/300x300';

    if (
      watch(`${fieldName}.image`) &&
      watch(`${fieldName}.image`) !== placeholder
    ) {
      const base64 = window.electron.files.readSavedImage(
        watch(`${fieldName}.image`),
      );
      return `data:image/jpg;base64,${base64}`;
    }

    return placeholder;
  }

  return (
    <PanelWrapper
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card
        className="group flex-row -outline-offset-2 resize"
        classNames={{
          header: 'group hidden group-hover/:flex ',
          base: 'relative h-96 w-96 overflow-hidden ',
          footer: 'group hidden  group-hover/:flex',
        }}
      >
        <CardHeader className="absolute top-0 gap-4 z-[1]">
          <Input
            onInput={(e) =>
              setValue(`${fieldName}.name`, e.currentTarget.value)
            }
            value={watch(`${fieldName}.name`)}
            defaultValue="Header"
            classNames={{
              inputWrapper: 'bg-transparen z-[1]',
              input: 'text-xl font-bold z-[1]',
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
                  'h-full w-full !max-w-full -translate-x-full',
                  "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:group-hover:bg-radial-gradient",
                ],
                img: 'object-cover w-full h-full z-5',
              }}
              src={readImageAsBase64()}
            />
            <div className="h-full  w-full" />
          </div>
        </CardBody>

        <CardFooter className="absolute bottom-0 p-0">
          <input
            type="file"
            name="myImage"
            className="opacity-0 p-2 w-full h-full z-20 cursor-pointer"
            onChange={saveImage}
          />
          <div className="flex items-center gap-2 absolute left-3 z-10">
            <BsImage /> Upload Image
          </div>
        </CardFooter>
      </Card>
    </PanelWrapper>
  );
};
