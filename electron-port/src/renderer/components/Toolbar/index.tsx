import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import { BsFillHouseFill } from 'react-icons/bs';
import { link as linkStyles } from '@nextui-org/theme';
import { Divider } from '@nextui-org/divider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { BsChevronDown } from 'react-icons/bs';
import { BsListUl } from 'react-icons/bs';
import { BsType } from 'react-icons/bs';
import { BsFillImageFill } from 'react-icons/bs';
import { ToolbarDropdown } from './ToolbarDropdown';
import { BsFileEarmarkTextFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { BsFillPersonDashFill } from 'react-icons/bs';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { createPanelPage, ProjectFormType } from '../../form-utils';
import { v4 as uuid } from 'uuid';
import { useDisclosure } from '@nextui-org/modal';
import { InputModal } from './InputModal';
import { useCallback, useEffect, useState } from 'react';
import { FormPanelPages } from '../Panel/types';
import { pageData } from '../../config/site';
import { useNavigate } from 'react-router-dom';

const panelDropdownItems = [
  {
    key: 'list' as 'list',
    label: 'List panel',
    icon: BsListUl,
  },
  {
    key: 'text' as 'text',
    label: 'Text panel',
    icon: BsType,
  },
  {
    key: 'image' as 'image',
    label: 'Image panel',
    icon: BsFillImageFill,
  },
];

const baseFileDropdownItems = [
  {
    key: 'create' as 'create',
    label: 'New $',
    icon: BsFillPersonPlusFill,
  },
  {
    key: 'rename' as 'rename',
    label: 'Rename $',
    icon: BsFillPersonLinesFill,
  },
  {
    key: 'delete' as 'delete',
    label: 'Delete $',
    icon: BsFillPersonDashFill,
  },
];

export const Toolbar = ({
  addNewPanel,
  pageKey,
}: {
  addNewPanel: (panelType: 'list' | 'text' | 'image') => void;
  pageKey: FormPanelPages;
}) => {
  const [activeId, setActiveId] = useState('');
  const { watch, control } = useFormContext<ProjectFormType>();
  const { append, remove, update } = useFieldArray({
    control,
    name: pageKey,
  });
  const pathname = window.location.pathname
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const id = pathname.replace(`${pageData[pageKey].href}/`, '');
    setActiveId(id);
  }, [pathname]);

  const createFile = () => {
    const id = uuid();
    append(createPanelPage(`New ${pageData[pageKey].label}`, id));
  };

  const renameFile = useCallback(
    (newName: string) => {
      const itemIndex = watch(pageKey).findIndex(({ id }) => id === activeId);

      if (itemIndex !== -1) {
        update(itemIndex, {
          ...watch(`${pageKey}.${itemIndex}`),
          name: newName,
        });
      }
    },
    [activeId],
  );

  const deleteFile = useCallback(() => {
    const itemIndex = watch(pageKey).findIndex(({ id }) => id === activeId);
    if (itemIndex !== -1) {
      navigate('/');
      remove(itemIndex);
    }
  }, [activeId]);

  const mappedFileDropdownItems = baseFileDropdownItems.map((item) => ({
    ...item,
    label: item.label.replace('$', pageData[pageKey].label),
    onClick: () => {
      if (item.key === 'create') createFile();
      if (item.key === 'rename') onOpen();
      if (item.key === 'delete') deleteFile();
    },
  }));

  return (
    <div className="flex flex-row dark:bg-gray-toolbar gap-2 items-center">
      <InputModal isOpen={isOpen} onClose={onClose} renameFile={renameFile} />

      <a
        className={clsx(
          linkStyles({ color: 'foreground' }),
          'data-[active=true]:text-primary data-[active=true]:font-medium gap-2',
          'px-4',
        )}
        color="foreground"
        href="/"
      >
        <BsFillHouseFill />
        Home
      </a>
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
          items={mappedFileDropdownItems}
          itemClasses={{
            title: 'flex items-center gap-2',
          }}
        >
          {(item) => (
            <DropdownItem key={item.key} onClick={item.onClick}>
              <item.icon className="min-w-4 min-h-4" />
              <span>{item.label}</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
