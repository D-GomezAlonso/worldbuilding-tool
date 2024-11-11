import { Button } from '@nextui-org/button';
import { BsChevronDown, BsFileEarmarkTextFill } from 'react-icons/bs';
import { Divider } from '@nextui-org/divider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { ToolbarDropdown } from './ToolbarDropdown';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { createPanelPage, ProjectFormType } from '../../form-utils';
import { v4 as uuid } from 'uuid';
import { useDisclosure } from '@nextui-org/modal';
import { InputModal } from './InputModal';
import { useCallback, useEffect, useState } from 'react';
import { FormPanelPages, PanelType } from '../Panel/types';
import { pageData } from '../../config/site';
import { useNavigate } from 'react-router-dom';
import {
  baseFileDropdownItems,
  panelDropdownItems,
} from './ToolbarDropdown/dropdownItems';

export const Toolbar = ({
  addNewPanel,
  pageKey,
}: {
  addNewPanel: (panelType: PanelType) => void;
  pageKey: FormPanelPages;
}) => {
  const [activeId, setActiveId] = useState('');
  const { watch, control } = useFormContext<ProjectFormType>();
  const { append, remove, update } = useFieldArray({
    control,
    name: pageKey,
  });
  const pathname = window.location.pathname;
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
      <ToolbarDropdown
        onClick={addNewPanel}
        panelDropdownItems={panelDropdownItems}
        triggerLabel="Add New Panel"
      />
      <Divider orientation="vertical" className="max-h-7" />

      <Dropdown className="dark">
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
