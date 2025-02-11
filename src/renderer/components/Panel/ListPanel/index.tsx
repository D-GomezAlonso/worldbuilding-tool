'use client';
import { useDraggable } from '@dnd-kit/core';
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { CSSProperties } from 'react';
import { BsArrowsMove } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { PanelWrapper } from '../PanelWrapper';
import { Button } from "@heroui/button";
import { CardBodyList } from './CardBodyList';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProjectFormType } from '../../../form-utils';
import { v4 as uuid } from 'uuid';
import { FormPanelPages } from '../types';

export const ListPanel = ({
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
  const { control, setValue, watch } = useFormContext<ProjectFormType>();

  const { append } = useFieldArray({
    control,
    name: `${fieldName}.entries`,
  });

  const addListItem = () => {
    append({ title: '', description: '', id: uuid() });
  };

  return (
    <PanelWrapper
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card className="min-w-80 min-h-96 top-0 left-0 resize">
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
        <CardBodyList fieldName={`${fieldName}.entries`} />
        <CardFooter className="flex justify-between">
          <Button isIconOnly onPress={addListItem}>
            <BsPlusLg />
          </Button>
        </CardFooter>
      </Card>
    </PanelWrapper>
  );
};
