import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input, Textarea } from "@nextui-org/input";
import { BsArrowsMove, BsThreeDotsVertical } from "react-icons/bs";

export const BodyEntry = ({
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

          <div className="flex gap-1">
            <div className="flex flex-col justify-center">
              <BsArrowsMove className="cursor-grab active:cursor-grabbing" />
            </div>
            <OptionsButton
              index={index}
              copyListItem={copyListItem}
              deleteListItem={deleteListItem}
            />
          </div>
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
        <Button isIconOnly className="bg-transparent min-h-0 min-w-0" size="sm">
          <BsThreeDotsVertical className="min-h-4 min-w-4" />
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
