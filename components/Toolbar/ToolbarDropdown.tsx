import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

type ToolbarDropdownProps = {
  panelDropdownItems: any[];
  triggerLabel: string;
  onClick:  (panelType: "list" | "text" | "image") => void
};

export const ToolbarDropdown = ({panelDropdownItems, triggerLabel, onClick}: ToolbarDropdownProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="flex items-center ">
          <BsFillPlusSquareFill />
          {triggerLabel}
          <BsChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={panelDropdownItems}
        itemClasses={{
          title: "flex items-center gap-2",
        }}
      >
        {(item) => (
          <DropdownItem key={item.key} onClick={() => onClick(item.key)}>
            <item.icon className="min-w-4 min-h-4" />
            <span>{item.label}</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
