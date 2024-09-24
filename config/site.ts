export type SiteConfig = typeof siteConfig;
import { BsPinMapFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsLayoutTextWindow } from "react-icons/bs";

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Places",
      href: "/places",
      Icon: BsPinMapFill,
      formRef: "places",
    },
    {
      label: "Characters",
      href: "/characters",
      Icon: BsFillPersonFill,
      formRef: "characters",
    },
    {
      label: "Blog",
      href: "/blog",
      Icon: BsLayoutTextWindow,
      formRef: "blogs",
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
