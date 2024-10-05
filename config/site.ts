export type SiteConfig = typeof siteConfig;
import {
  BsPinMapFill,
  BsFillPersonFill,
  BsLayoutTextWindow,
  BsMap,
  BsFillPeopleFill,
} from "react-icons/bs";

export const pageData = {
  places: {
    label: "Places",
    href: "/places",
  },
  characters: {
    label: "Characters",
    href: "/characters",
  },
  blogs: {
    label: "Blogs",
    href: "/blogs",
  },
};

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Places",
      href: "/places",
      Icon: BsPinMapFill,
      formRef: "places" as "places",
    },
    {
      label: "Characters",
      href: "/characters",
      Icon: BsFillPersonFill,
      formRef: "characters" as "characters",
    },
    {
      label: "Maps",
      href: "/maps",
      Icon: BsMap,
      formRef: "maps" as "maps",
    },
    {
      label: "Articles",
      href: "/articles",
      Icon: BsLayoutTextWindow,
      formRef: "articles" as "articles",
    },
    {
      label: "Relationships",
      href: "/relationships",
      Icon:   BsFillPeopleFill,
      formRef: "relationships" as "relationships",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
