'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { siteConfig } from '../../config/site';
import { ThemeSwitch } from '../../components/theme-switch';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import {
  BsChevronDoubleLeft,
  BsChevronRight,
  BsFloppyFill,
} from 'react-icons/bs';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import { useFormContext } from 'react-hook-form';
import {
  createArticlelPage,
  createPanelPage,
} from '../../form-utils/defaultValues';
import { v4 as uuid } from 'uuid';
import { Indicator } from './Indicator';
import { AccordionItemBody } from './AccordionItemBody';
import { BsChevronDoubleRight, BsUpload } from 'react-icons/bs';
import { Divider } from '@nextui-org/divider';
import { BsGearFill } from 'react-icons/bs';
import { toSingularCapitalised, userDownloadFile } from './utils';
import { useDisclosure } from '@nextui-org/modal';
import { OptionsModal } from './OptionsModal';
import { Input } from '@nextui-org/input';
import { useNavigate } from 'react-router-dom';
import { useProjectPathContext } from '../../context/projectPathContext';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { watch, setValue, getValues, reset } = useFormContext();
  const [activeId, setActiveId] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const { projectPath } = useProjectPathContext();
  const [selectedKeys, setSelectedKeys] = useState(
    new Set<string | number>([]),
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
    [selectedKeys, setSelectedKeys],
  );

  const createNewItem = (
    itemName: 'characters' | 'places' | 'maps' | 'articles',
    id: string,
  ) => {
    const currentValue = watch(itemName);

    const newPage =
      itemName !== 'articles'
        ? createPanelPage(`New ${toSingularCapitalised(itemName)}`, id)
        : createArticlelPage(`New ${toSingularCapitalised(itemName)}`, id);

    setValue(itemName, [...currentValue, newPage]);
  };

  const createAndNavigate = (
    href: string,
    formRef: 'characters' | 'places' | 'maps' | 'articles' | 'relationships',
  ) => {
    if (formRef !== 'relationships') {
      const id = uuid();
      createNewItem(formRef, id);
      navigate(`${href}/${id}`);
      setActiveId(`${href}/${id}`);
    }
  };

  return (
    <NextUINavbar
      maxWidth="sm"
      classNames={{
        base: 'flex flex-col w-auto bg-gray-navbar',
        wrapper: 'flex flex-col w-auto h-full items-start px-0',
      }}
    >
      <OptionsModal isOpen={isOpen} onClose={onClose} />
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
          <NavbarItem></NavbarItem>
          <NavbarItem className="h-7 cursor-pointer relative">
            <input
              type="file"
              name="myImage"
              className="opacity-0 p-2 w-full h-full z-20 cursor-pointer absolute"
              onChange={(event) => {
                const fileReader = new FileReader();
                const { files } = event.target;

                if (files) {
                  fileReader.readAsText(files?.[0], 'UTF-8');
                  fileReader.onload = (e) => {
                    const content = e.target?.result;
                    if (content) {
                      var enc = new TextDecoder('utf-8');
                      const fileText =
                        typeof content === 'string'
                          ? content
                          : enc.decode(content);

                      reset(JSON.parse(fileText));
                    }
                  };
                }
              }}
            />
            <BsUpload />
          </NavbarItem>
          <NavbarItem className="h-7 cursor-pointer">
            <BsFloppyFill
              onClick={() => {
                window.electron.files.saveProject(
                  projectPath ?? '',
                  JSON.stringify(getValues()),
                );
              }}
            />
          </NavbarItem>
          <NavbarItem className="h-7 cursor-pointer" onClick={onOpen}>
            <BsGearFill />
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" />
        <div
          className={`overflow-hidden pt-3 transition-drawer ease-in-out duration-1000  ${isNavbarOpen ? 'w-60  pl-3' : 'w-0  pl-0'}`}
        >
          <Input
            defaultValue={watch('name')}
            variant="flat"
            classNames={{
              base: 'w-56 pr-3',
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
              input: 'text-xl  font-bold bg-transparent hover:bg-transparent',
            }}
          />
          <NavbarContent className="p-0 w-60">
            <ul className="flex flex-col h-full gap-4 justify-start p-0">
              <Accordion
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                className="group px-0"
                itemClasses={{
                  base: ['group'],
                  startContent: 'group-data-[open=true]/:rotate-90 transition',
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
