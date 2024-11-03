import { Button } from '@nextui-org/button';
import { CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Input, Textarea } from '@nextui-org/input';
import { BsArrowsMove, BsThreeDotsVertical } from 'react-icons/bs';
import { ListItem } from './types';
import {
  Active,
  DndContext,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { createContext, CSSProperties, useId, useMemo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableOverlay } from './SortableOverlay';
import React from 'react';
import { ProjectFormType } from '../../../form-utils';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { FormPanelPages } from '../types';

type CardBodyListProps = {
  fieldName: `${FormPanelPages}.${number}.panels.${number}.entries`;
};

export const CardBodyList = ({ fieldName }: CardBodyListProps) => {
  const [active, setActive] = useState<Active | null>(null);

  const { watch, control, setValue } = useFormContext<ProjectFormType>();

  const { append, update, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const listItems = useMemo(() => watch(fieldName), [watch(fieldName)]);

  const activeItem = useMemo(
    () => listItems.find((item) => item.id === active?.id),
    [active, listItems],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onChange = (
    fieldName: 'title' | 'description',
    id: string,
    value: string,
  ) => {
    const itemIndex = listItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const item = listItems[itemIndex];
      item[fieldName] = value;
      update(itemIndex, item);
    }
  };

  const copyListItem = (id: string) => {
    const item = listItems.find((item) => item.id === id);
    if (item) {
      const newId = uuid();
      const copiedItem = { ...item, id: newId };
      copiedItem.id = `${newId}`;
      append(copiedItem);
    }
  };

  const deleteListItem = (id: string) => {
    const index = listItems.findIndex((item) => item.id === id);
    if (index > -1) {
      remove(index);
    }
  };

  const renderItem = (item: ListItem) => (
    <BodyEntry
      key={item.id}
      {...item}
      onChange={onChange}
      copyListItem={copyListItem}
      deleteListItem={deleteListItem}
    />
  );

  return (
    <CardBody className="flex flex-col gap-3">
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          setActive(active);
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id) {
            const activeIndex = listItems.findIndex(
              ({ id }) => id === active.id,
            );
            const overIndex = listItems.findIndex(({ id }) => id === over.id);

            setValue(fieldName, arrayMove(listItems, activeIndex, overIndex));
          }
          setActive(null);
        }}
        onDragCancel={() => {
          setActive(null);
        }}
      >
        <SortableContext items={listItems}>
          {listItems.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </SortableContext>
        <SortableOverlay>
          {activeItem ? renderItem(activeItem) : null}
        </SortableOverlay>
      </DndContext>
    </CardBody>
  );
};

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export const BodyEntry = ({
  description,
  id,
  title,
  onChange,
  copyListItem,
  deleteListItem,
}: ListItem & {
  onChange: (
    fieldName: 'title' | 'description',
    id: string,
    value: string,
  ) => void;
  copyListItem: (index: string) => void;
  deleteListItem: (index: string) => void;
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div className="flex gap-2 flex-col" ref={setNodeRef} style={style}>
        <div className="flex flex-col gap-3">
          <div className="flex">
            <Input
              onChange={(e) => onChange('title', id, e.currentTarget.value)}
              value={title}
              size="sm"
              placeholder="New Item Name"
              variant="flat"
              classNames={{
                inputWrapper: [
                  'bg-transparent',
                  'dark:bg-transparent',
                  'hover:bg-transparent',
                  'dark:hover:bg-transparent',
                  'group-data-[focus=true]/:bg-transparent',
                  'dark:group-data-[focus=true]/:bg-transparent',
                  '!cursor-text',
                ],
                innerWrapper: 'bg-transparent',
                input: 'text-lg font-bold bg-transparent hover:bg-transparent',
              }}
            />

            <div className="flex gap-1">
              <div
                className="flex flex-col justify-center"
                {...context.listeners}
              >
                <BsArrowsMove className="cursor-grab active:cursor-grabbing" />
              </div>
              <OptionsButton
                index={id}
                copyListItem={copyListItem}
                deleteListItem={deleteListItem}
              />
            </div>
          </div>
          <Textarea
            spellCheck={false}
            variant="flat"
            placeholder="Enter your description..."
            value={description}
            onChange={(e) => onChange('description', id, e.currentTarget.value)}
          />
        </div>
        <Divider />
      </div>
    </SortableItemContext.Provider>
  );
};

function OptionsButton({
  index,
  copyListItem,
  deleteListItem,
}: {
  index: string;
  copyListItem: (index: string) => void;
  deleteListItem: (index: string) => void;
}) {
  const items = [
    {
      key: 'copy',
      label: 'Copy Item',
      handler: copyListItem,
    },
    {
      key: 'delete',
      label: 'Delete Item',
      handler: deleteListItem,
    },
  ];

  return (
    <Dropdown className="dark" placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          className="bg-transparent min-h-0 min-w-0 z-0"
          size="sm"
        >
          <BsThreeDotsVertical className="min-h-4 min-w-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === 'delete' ? 'danger' : 'default'}
            className={item.key === 'delete' ? 'text-danger' : ''}
            onClick={() => item.handler(index)}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
