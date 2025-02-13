import { MenuItem } from "@/types/menuItem";

export const menuItems: MenuItem[] = [
  {
    menuItemKey: "home",
    to: "/",
    ariaLabel: "Home"
  },
  // {
  //   menuItemKey: "typesOfPlants",
  //   to: "#",
  //   ariaLabel: "Plants Types"
  // },
  {
    menuItemKey: "plants",
    to: "/plants",
    ariaLabel: "Plants"
  },
  {
    menuItemKey: "contactLink",
    to: "/contact",
    ariaLabel: "Contact"
  },
  {
    menuItemKey: "orders",
    to: "/orders",
    ariaLabel: "Orders"
  },
];
