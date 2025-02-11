'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { PageConfig } from '../../config/site';
import {
  BsChevronDoubleLeft,
  BsFillHouseFill,
  BsFloppyFill,
} from 'react-icons/bs';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  createArticlelPage,
  createPanelPage,
} from '../../form-utils/defaultValues';
import { v4 as uuid } from 'uuid';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { Divider } from "@heroui/divider";
import { toSingularCapitalised } from './utils';
import { OptionsModal } from './OptionsModal';
import { useNavigate } from 'react-router-dom';
import { useProjectPathContext } from '../../context/projectPathContext';
import { NavbarAccordion } from './NavbarAcordion';

export const Navbar = () => {
  const { watch, setValue, getValues, reset } = useFormContext();
  const [activeId, setActiveId] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const { projectPath } = useProjectPathContext();
  const [selectedKeys, setSelectedKeys] = useState(
    new Set<string | number>([]),
  );

  const handleAccordionClick = useCallback(
    (item: Omit<PageConfig, 'formRef'>, index: number) => {
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

  const createNewItem = (itemName: string, id: string) => {
    const currentValue = watch(itemName);

    const newPage =
      itemName !== 'articles'
        ? createPanelPage(`New ${toSingularCapitalised(itemName)}`, id)
        : createArticlelPage(`New ${toSingularCapitalised(itemName)}`, id);

    setValue(itemName, [...currentValue, newPage]);
  };

  const createAndNavigate = (href: string, formRef: string) => {
    const id = uuid();
    createNewItem(formRef, id);
    navigate(`${href}/${id}`);
    setActiveId(`${href}/${id}`);
  };

  function saveProject() {
    window.electron.files.saveProject(
      projectPath ?? '',
      JSON.stringify(getValues()),
    );
  }

  return (
    <NextUINavbar
      maxWidth="sm"
      classNames={{
        base: 'flex flex-col w-auto bg-gray-navbar',
        wrapper: 'flex flex-col w-auto h-full items-start px-0',
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

          <NavbarItem className="h-7 cursor-pointer">
            <BsFillHouseFill
              className="h-[18px] w-[18px]"
              onClick={() => {
                saveProject();
                navigate('/');
              }}
            />
          </NavbarItem>
          <NavbarItem className="h-7 cursor-pointer">
            <BsFloppyFill onClick={saveProject} />
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" />
        <div
          className={`overflow-hidden pt-3 transition-drawer ease-in-out duration-1000  ${isNavbarOpen ? 'w-60  pl-3' : 'w-0  pl-0'}`}
        >
          <div className="h-10 w-56 flex items-center">
            <p className="px-3 text-xl font-bold bg-transparent">
              {watch('name')}
            </p>
          </div>
          <NavbarContent className="p-0 w-60">
            <ul className="flex flex-col h-full gap-4 justify-start p-0">
              <NavbarAccordion
                activeId={activeId}
                setActiveId={setActiveId}
                createAndNavigate={createAndNavigate}
                handleAccordionClick={handleAccordionClick}
                selectedKeys={selectedKeys}
              />
            </ul>
          </NavbarContent>
        </div>
      </div>
    </NextUINavbar>
  );
};
