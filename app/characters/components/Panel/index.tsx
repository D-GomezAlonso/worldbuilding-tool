"use client";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { CSSProperties, useCallback, useState } from "react";
import { BsArrowsMove } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { PanelWrapper } from "../PanelWrapper";
import { Button } from "@nextui-org/button";
import { CardBodyList } from "./CardBodyList";
import { ListItem } from "./types";

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
  styles,
}: {
  id: string;
  styles: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const [lastIndex, setLastIndex] = useState(0);
  const [listItems, setListItems] = useState<ListItem[]>(baseItem);

  const addListItem = useCallback(() => {
    setListItems([
      ...listItems,
      {
        title: "",
        description: "",
        id: `${lastIndex + 1}`,
        list: "0",
      },
    ]);

    setLastIndex(lastIndex + 1);
  }, [listItems, setListItems, lastIndex, setLastIndex]);

  const deleteListItem = useCallback(
    (index: string) => {
      const filteredList = listItems.filter((item) => item.id !== index);
      setListItems(filteredList);
    },
    [listItems, setListItems]
  );

  const copyListItem = useCallback(
    (index: string) => {
      const item = listItems.find((item) => item.id === index);
      if (item) {
        const copiedItem = { ...item };
        copiedItem.id = `${lastIndex + 1}`;
        const newList = [...listItems, copiedItem];
        setListItems(newList);
        setLastIndex(lastIndex + 1);
      }
    },
    [listItems, setListItems, lastIndex, setLastIndex]
  );

  const onItemChange = useCallback(
    (fieldName: "title" | "description", index: string, newValue: string) => {
      const itemIndex = listItems.findIndex((item) => item.id === index);

      if (itemIndex !== -1) {
        const listItemsCopy = [...listItems];
        listItemsCopy[itemIndex][fieldName] = newValue;
        setListItems(listItemsCopy);
      }
    },
    [listItems, setListItems]
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
        <CardBodyList
          listItems={listItems}
          setListItems={setListItems}
          deleteListItem={deleteListItem}
          copyListItem={copyListItem}
          onChange={onItemChange}
        />
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
