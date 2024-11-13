import { NavbarItem } from '@nextui-org/navbar';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { BsPlus } from 'react-icons/bs';
import { link as linkStyles } from '@nextui-org/theme';

type Item = {
  label: string;
  href: string;
  Icon: IconType;
  formRef: string;
};

export const Indicator = ({
  onClick,
  item,
}: {
  onClick: MouseEventHandler<HTMLLIElement>;
  item: Item;
}) => {
  return (
    <NavbarItem key={item.href} className="flex align-middle" onClick={onClick}>
      <p
        className={clsx(
          linkStyles({ color: 'foreground' }),
          'data-[active=true]:text-primary data-[active=true]:font-medium gap-2',
        )}
        color="foreground"
      >
        <BsPlus />
      </p>
    </NavbarItem>
  );
};
