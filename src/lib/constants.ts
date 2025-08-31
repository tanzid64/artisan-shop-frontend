import { Grid, LucideIcon } from "lucide-react";
export interface IMenuItem {
  id: number;
  label: string;
  href: string;
  icon: LucideIcon;
  children?: IMenuItem[];
}
export const ADMIN_MENU: IMenuItem[] = [
  {
    id: 1,
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: Grid,
  },
  {
    id: 2,
    label: "Settings",
    href: "/admin/settings",
    icon: Grid,
    children: [
      {
        id: 21,
        label: "Sliders",
        href: "/admin/settings/sliders",
        icon: Grid,
      },
    ],
  },
];

export const VENDOR_MENU = [];

export const USER_MENU = [];
