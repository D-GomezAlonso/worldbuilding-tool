"use client";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { PanelWrapper } from "../PanelWrapper";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";

type ListItem = {
  title: string;
  description: string;
  index: string;
  list: string;
};

const baseItem = [
  {
    title: "",
    description: "",
    index: "0",
    list: "0",
  },
];

export const Panel = ({
  id,
  styles,
}: {
  id: string;
  styles: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const [lastIndex, setLastIndex] = useState(0);
  const [listItems, setListItems] = useState(baseItem);

  const onItemChange = useCallback(
    (fieldName: "title" | "description", index: string, newValue: string) => {
      const itemIndex = listItems.findIndex((item) => item.index === index);

      if (itemIndex !== -1) {
        const listItemsCopy = [...listItems];
        listItemsCopy[itemIndex][fieldName] = newValue;
        setListItems(listItemsCopy);
      }
    },
    [listItems, setListItems]
  );

  const addListItem = useCallback(() => {
    setListItems([
      ...listItems,
      {
        title: "",
        description: "",
        index: `${lastIndex + 1}`,
        list: "0",
      },
    ]);

    setLastIndex(lastIndex + 1);
  }, [listItems, setListItems, lastIndex, setLastIndex]);

  const deleteListItem = useCallback(
    (index: string) => {
      const filteredList = listItems.filter((item) => item.index !== index);
      setListItems(filteredList);
    },
    [listItems, setListItems]
  );

  const copyListItem = useCallback(
    (index: string) => {
      const item = listItems.find((item) => item.index === index);
      if (item) {
        const copiedItem = { ...item };
        copiedItem.index = `${lastIndex + 1}`;
        const newList = [...listItems, copiedItem];
        setListItems(newList);
        setLastIndex(lastIndex + 1);
      }
    },
    [listItems, setListItems, lastIndex, setLastIndex]
  );

  return (
    <PanelWrapper
      id={id}
      setNodeRef={setNodeRef}
      styles={styles}
      attributes={attributes}
      transform={transform}
    >
      <Card className="max-w-sm min-h-96 top-0 left-0">
        <CardHeader>
          <Input
            defaultValue="Header"
            classNames={{
              inputWrapper: "bg-transparent",
              input: "text-xl font-bold",
            }}
          />
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col">
          {listItems.map((item) => (
            <BodyEntry
              key={item.index}
              {...item}
              onChange={onItemChange}
              copyListItem={copyListItem}
              deleteListItem={deleteListItem}
            />
          ))}
        </CardBody>
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

const BodyEntry = ({
  description,
  index,
  title,
  onChange,
  copyListItem,
  deleteListItem,
}: ListItem & {
  onChange: (
    fieldName: "title" | "description",
    index: string,
    newValue: string
  ) => void;
  copyListItem: (index: string) => void;
  deleteListItem: (index: string) => void;
}) => {
  return (
    <div className="flex gap-2 flex-col text-">
      <div className="flex flex-col gap-3">
        <div className="flex">
          <Input
            onChange={(e) => onChange("title", index, e.currentTarget.value)}
            value={title}
            size="sm"
            placeholder="New Item Name"
            variant="flat"
            classNames={{
              inputWrapper: [
                "bg-transparent",
                "dark:bg-transparent",
                "hover:bg-transparent",
                "dark:hover:bg-transparent",
                "group-data-[focus=true]/:bg-transparent",
                "dark:group-data-[focus=true]/:bg-transparent",
                "!cursor-text",
              ],
              innerWrapper: "bg-transparent",
              input: "text-lg font-bold bg-transparent hover:bg-transparent",
            }}
          />
          <EntryOptionsButton
            index={index}
            copyListItem={copyListItem}
            deleteListItem={deleteListItem}
          />
        </div>
        <Textarea
          variant="flat"
          placeholder="Enter your description..."
          value={description}
          onChange={(e) =>
            onChange("description", index, e.currentTarget.value)
          }
        />
      </div>
      <Divider />
    </div>
  );
};

function EntryOptionsButton({
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
      key: "copy",
      label: "Copy Item",
      handler: copyListItem,
    },
    {
      key: "delete",
      label: "Delete Item",
      handler: deleteListItem,
    },
  ];

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent">
          <BsThreeDotsVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
            onClick={() => item.handler(index)}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
