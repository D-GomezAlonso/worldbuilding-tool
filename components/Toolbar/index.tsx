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
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { BsType } from "react-icons/bs";

export const Toolbar = ({
  addNewPanel,
}: {
  addNewPanel: (panelType: "list" | "text") => void;
}) => {
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
  ];

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

      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" className="flex items-center ">
            <BsFillPlusSquareFill />
            Add New Panel
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
            <DropdownItem key={item.key} onClick={() => addNewPanel(item.key)}>
              <item.icon className="min-w-4 min-h-4" />
              <span>{item.label}</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
