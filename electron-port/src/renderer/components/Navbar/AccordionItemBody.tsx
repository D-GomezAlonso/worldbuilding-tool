import { NavbarItem } from '@nextui-org/navbar';
import { BsSquareFill } from 'react-icons/bs';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { IconType } from 'react-icons';

type Item = {
  label: string;
  href: string;
  Icon: IconType;
  formRef: string;
};

type NavProps = {
  item: Item;
  activeId: string;
  setActiveId: (activeId: string) => void;
  formRef: string;
};

export const AccordionItemBody = ({
  item,
  activeId,
  setActiveId,
  formRef,
}: NavProps) => {
  const { watch } = useFormContext();
  const formField = useMemo(() => watch(formRef), [watch(formRef)]);

  return (
    <ul className="ml-7 pl-3 border-l-1 border-navbar-accordion-line">
      {formField?.map((value: { name: string; id: string }) => (
        <NavbarItem
          key={value.id}
          className="flex align-middle rounded-md pl-2 dark:data-[active=true]:bg-navbar-selected  data-[active=true]:bg-[#864c16b7]  hover:bg-divider"
          isActive={`${item.href}/${value.id}` === activeId}
        >
          <a
            className={clsx(
              linkStyles({ color: 'foreground' }),
              'data-[active=true]:text-primary data-[active=true]:font-medium gap-2',
              'w-full',
            )}
            color="foreground"
            href={`${item.href}/${value.id}`}
            onClick={() => setActiveId(`${item.href}/${value.id}`)}
          >
            <BsSquareFill className="w-2" /> {value.name}
          </a>
        </NavbarItem>
      ))}

      {!formField?.length && (
        <p className="pl-2"> {`No ${item.label} entry`}</p>
      )}
    </ul>
  );
};
