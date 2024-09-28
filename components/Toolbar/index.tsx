import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { BsFillHouseFill } from "react-icons/bs";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { BsChevronDown } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { BsType } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonDashFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";

const panelDropdownItems = [
  {
    key: "list" as "list",
    label: "List panel",
    icon: BsListUl,
  },
  {
    key: "text" as "text",
    label: "Text panel",
    icon: BsType,
  },
  {
    key: "image" as "image",
    label: "Image panel",
    icon: BsFillImageFill,
  },
];

const fileDropdownItems = [
  {
    key: "newCharacter" as "newCharacter",
    label: "New Character",
    icon: BsFillPersonPlusFill,
  },
  {
    key: "renameCharacter" as "renameCharacter",
    label: "Rename Character",
    icon: BsFillPersonLinesFill,
  },
  {
    key: "deleteCharacter" as "deleteCharacter",
    label: "Delete Character",
    icon: BsFillPersonDashFill,
  },
];

export const Toolbar = ({
  addNewPanel,
}: {
  addNewPanel: (panelType: "list" | "text" | "image") => void;
}) => {
  return (
    <div className="flex flex-row dark:bg-gray-toolbar gap-2 items-center">
      <NextLink
        className={clsx(
          linkStyles({ color: "foreground" }),
          "data-[active=true]:text-primary data-[active=true]:font-medium gap-2",
          "px-4"
        )}
        color="foreground"
        href="/"
      >
        <BsFillHouseFill />
        Home
      </NextLink>
      <Divider orientation="vertical" className="max-h-7" />

      <ToolbarDropdown
        onClick={addNewPanel}
        panelDropdownItems={panelDropdownItems}
        triggerLabel="Add New Panel"
      />
      <Divider orientation="vertical" className="max-h-7" />

      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" className="flex items-center ">
            <BsFileEarmarkTextFill />
            File
            <BsChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          items={fileDropdownItems}
          itemClasses={{
            title: "flex items-center gap-2",
          }}
        >
          {(item) => (
            <DropdownItem key={item.key}>
              <item.icon className="min-w-4 min-h-4" />
              <span>{item.label}</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
