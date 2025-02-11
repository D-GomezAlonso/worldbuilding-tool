'use client';
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input, Textarea } from "@heroui/input";
import { CSSProperties } from 'react';
import { BsArrowsMove } from 'react-icons/bs';
import { PanelWrapper } from '../PanelWrapper';
import { useDraggable } from '@dnd-kit/core';
import { useFormContext } from 'react-hook-form';
import { ProjectFormType } from '../../../form-utils/';
import { FormPanelPages } from '../types';

export const TextPanel = ({
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

  return (
    <PanelWrapper
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card
        className="top-0 left-0"
        classNames={{ base: 'resize min-h-80 min-w-80 h-96' }}
      >
        <CardHeader className="z-0 flex gap-4">
          <Input
            onInput={(e) =>
              setValue(`${fieldName}.name`, e.currentTarget.value)
            }
            value={watch(`${fieldName}.name`)}
            defaultValue="Header"
            classNames={{
              inputWrapper: 'bg-transparent',
              input: 'text-xl font-bold',
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
            spellCheck={false}
            placeholder="Entry your text in this text panel!"
            classNames={{
              base: 'flex-1 group',
              mainWrapper: 'flex-1 ',
              inputWrapper: [
                'flex-1 bg-transparent',
                'data-[hover=true]/:bg-transparent ',
                'group-data-[focus=true]/:!bg-transparent',
              ],
              input: 'flex-1 min-h-full ',
            }}
            onInput={(e) =>
              setValue(`${fieldName}.text`, e.currentTarget.value)
            }
            value={watch(`${fieldName}.text`)}
          />
        </CardBody>
      </Card>
    </PanelWrapper>
  );
};
