"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { BsPlus } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { useFormContext } from "react-hook-form";
import { createCharacter } from "@/form-utils/defaultValues";
import { uuid } from "uuidv4";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { watch, setValue } = useFormContext();

  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set<string | number>([])
  );
  const router = useRouter();

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

  const createNewItem = (itemName: string, id: string) => {
    if (itemName === "characters") {
      const currentValue = watch(itemName);
      const test = createCharacter("Paco Sanz", id);
      setValue("characters", [...currentValue, test]);
    }
  };

  return (
    <NextUINavbar
      maxWidth="sm"
      classNames={{
        base: "flex flex-col w-auto dark:bg-gray-navbar",
        wrapper: "flex flex-col w-auto h-full py-24 items-start ",
      }}
    >
      <h1 className="text-xl font-bold">New Project</h1>
      <NavbarContent className="p-0">
        <ul className="flex flex-col h-full gap-4 justify-start p-0">
          <Accordion
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            className="group px-0"
            itemClasses={{
              base: "group",
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
                indicator={() => {
                  return (
                    <NavbarItem
                      key={item.href}
                      className="flex align-middle"
                      onClick={() => {
                        const id = uuid();
                        createNewItem("characters", id);
                        router.push(`${item.href}/${id}`);
                      }}
                    >
                      <p
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium gap-2"
                        )}
                        color="foreground"
                      >
                        <BsPlus />
                      </p>
                    </NavbarItem>
                  );
                }}
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
                {watch(item.formRef) ? (
                  <ul className="ml-7">
                    {watch(item.formRef).map(
                      (value: { name: string; id: string }) => (
                        <NavbarItem
                          key={value.id}
                          className="flex align-middle"
                        >
                          <NextLink
                            className={clsx(
                              linkStyles({ color: "foreground" }),
                              "data-[active=true]:text-primary data-[active=true]:font-medium gap-2"
                            )}
                            color="foreground"
                            href={`${item.href}/${value.id}`}
                          >
                            - {value.name}
                          </NextLink>
                        </NavbarItem>
                      )
                    )}
                  </ul>
                ) : (
                  `No ${item.label} entry`
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </ul>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
