"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { BsChevronDoubleLeft, BsChevronRight } from "react-icons/bs";
import { useCallback, useState } from "react";
import { IconType } from "react-icons";
import { useFormContext } from "react-hook-form";
import { createCharacter } from "@/form-utils/defaultValues";
import { uuid } from "uuidv4";
import { useRouter } from "next/navigation";
import { Indicator } from "./Indicator";
import { AccordionItemBody } from "./AccordionItemBody";
import { BsChevronDoubleRight, BsDownload, BsUpload } from "react-icons/bs";
import { Divider } from "@nextui-org/divider";

export const Navbar = () => {
  const { watch, setValue } = useFormContext();
  const [activeId, setActiveId] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState(
    new Set<string | number>([])
  );

  const handleAccordionClick = useCallback(
    (item: { label: string; href: string; Icon: IconType }, index: number) => {
      const key = `${item.label}-${index}`;
      const copySet = new Set(selectedKeys);

      if (copySet.has(key)) {
        copySet.delete(`${item.label}-${index}`);
      } else {
        copySet.add(`${item.label}-${index}`);
      }
      setSelectedKeys(copySet);
    },
    [selectedKeys, setSelectedKeys]
  );

  const createNewItem = (
    itemName: "characters" | "places" | "blogs",
    id: string
  ) => {
    const newItemName = itemName === "characters" ? "Character" : "Place";
    const currentValue = watch(itemName);
    const newCharacter = createCharacter(`New ${newItemName}`, id);
    setValue(itemName, [...currentValue, newCharacter]);
  };

  const createAndNavigate = (
    href: string,
    formRef: "characters" | "places" | "blogs"
  ) => {
    const id = uuid();
    createNewItem(formRef, id);
    router.push(`${href}/${id}`);
    setActiveId(`${href}/${id}`);
  };

  return (
    <NextUINavbar
      maxWidth="sm"
      classNames={{
        base: "flex flex-col w-auto dark:bg-gray-navbar",
        wrapper: "flex flex-col w-auto h-full items-start px-0",
      }}
    >
      <div className="flex h-full">
        <NavbarContent
          justify="start"
          className="gap-4 flex flex-col pl-3 pt-3 pr-3 "
        >
          <NavbarItem
            className="cursor-pointer py-1.5"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            {isNavbarOpen ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="h-7 cursor-pointer">
            <BsUpload />
          </NavbarItem>
          <NavbarItem className="h-7 cursor-pointer">
            <BsDownload />
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" />
        <div
          className={`overflow-hidden pt-3 transition-drawer ease-in-out duration-1000  ${isNavbarOpen ? "w-60  pl-3" : "w-0  pl-0"}`}
        >
          <h1 className="text-xl font-bold w-60">New Project</h1>
          <NavbarContent className="p-0 w-60">
            <ul className="flex flex-col h-full gap-4 justify-start p-0">
              <Accordion
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                className="group px-0"
                itemClasses={{
                  base: ["group"],
                  startContent: "group-data-[open=true]/:rotate-90 transition",
                }}
              >
                {siteConfig.navItems.map((item, index) => (
                  <AccordionItem
                    className="p-0 m-0"
                    key={`${item.label}-${index}`}
                    aria-label={`${item.label}-${index}`}
                    startContent={
                      <BsChevronRight
                        onClick={() => handleAccordionClick(item, index)}
                      />
                    }
                    indicator={
                      <Indicator
                        item={item}
                        onClick={() =>
                          createAndNavigate(item.href, item.formRef)
                        }
                      />
                    }
                    disableIndicatorAnimation
                    title={
                      <div
                        onClick={() => handleAccordionClick(item, index)}
                        className="flex items-center gap-3 min-w-40"
                      >
                        <item.Icon /> {item.label}
                      </div>
                    }
                  >
                    <AccordionItemBody
                      activeId={activeId}
                      setActiveId={setActiveId}
                      formRef={item.formRef}
                      item={item}
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </ul>
          </NavbarContent>
        </div>
      </div>
    </NextUINavbar>
  );
};
