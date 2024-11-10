import {
  BsListUl,
  BsType,
  BsFillImageFill,
  BsFillPersonPlusFill,
  BsFillPersonDashFill,
  BsFillPersonLinesFill,
} from 'react-icons/bs';

export const panelDropdownItems = [
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

export const baseFileDropdownItems = [
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
