export type SiteConfig = typeof siteConfig;
import { IconType } from 'react-icons';
import {
  BsPinMapFill,
  BsFillPersonFill,
  BsLayoutTextWindow,
  BsMap,
  BsFillPeopleFill,
} from 'react-icons/bs';

export const pageData = {
  places: {
    label: 'Places',
    href: '/places',
  },
  characters: {
    label: 'Characters',
    href: '/characters',
  },
  maps: {
    label: 'Maps',
    href: '/maps',
  },
  relationships: { label: 'Relationships', href: '/relationships' },
};

export type PageConfig = {
  label: string;
  href: string;
  Icon: IconType;
  formRef: 'places' | 'characters' | 'maps' | 'articles' | 'relationships';
};

export const siteConfig: PageConfig[] = [
  {
    label: 'Places',
    href: '/places',
    Icon: BsPinMapFill,
    formRef: 'places' as 'places',
  },
  {
    label: 'Characters',
    href: '/characters',
    Icon: BsFillPersonFill,
    formRef: 'characters' as 'characters',
  },
  {
    label: 'Maps',
    href: '/maps',
    Icon: BsMap,
    formRef: 'maps' as 'maps',
  },
  {
    label: 'Articles',
    href: '/articles',
    Icon: BsLayoutTextWindow,
    formRef: 'articles' as 'articles',
  },
  {
    label: 'Relationships',
    href: '/relationships',
    Icon: BsFillPeopleFill,
    formRef: 'relationships' as 'relationships',
  },
];
