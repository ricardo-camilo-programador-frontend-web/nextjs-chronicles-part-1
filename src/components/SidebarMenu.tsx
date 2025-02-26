"use client";

import type { FC, JSX } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/Link";
import { MenuItem } from "@/types/menuItem";
import { useTranslations } from "next-intl";
import { isClickOutsideElement } from "@/utils/isClickOutsideElement";
import { getUniqueId } from "@/utils/getUniqueId";
import { Logo } from "./Logo";
import Button from "./Button";
import {
  Bars2Icon,
} from "@heroicons/react/24/outline";
import {
  useActiveRoute,
  menuTheme,
  renderIcon,
  iconMap,
} from "@/utils/menuUtils";

interface SidebarMenuProps {
  menuItems: MenuItem[];
}

const SidebarMenu: FC<SidebarMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const translateMenu = useTranslations("menuItems");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { isActiveRoute } = useActiveRoute();

  const getMenuItemClasses = (menuKey: string, isActive: boolean): string => {
    const theme = menuTheme[menuKey];
    return isActive
      ? `${theme.active} text-white`
      : `${theme.text} ${theme.hover}`;
  };

  const renderMenuItem = (
    item: MenuItem,
    index: number,
    isMobile: boolean = false
  ): JSX.Element => {
    const isActive = isActiveRoute(item.to);
    const itemKey = `${item.menuItemKey}-${index}-${isMobile ? "mobile" : "desktop"
      }-menu-${getUniqueId()}`;

    return (
      <li
        key={itemKey}
        className={`w-full transition-all duration-300 border-b border-transparent flex items-center justify-center ${getMenuItemClasses(
          item.menuItemKey,
          isActive
        )}`}
      >
        <Link
          href={item.to}
          aria-label={item.ariaLabel}
          className={`flex items-center justify-center mx-2 p-4 text-sm rounded-md font-bold transition-colors duration-200 w-full ${isActive ? "text-white" : ""
            }`}
          onClick={isMobile ? () => setIsOpen(false) : undefined}
        >
          <div className="flex">
            <div className="w-2/12">
              {item.icon && (
                <div className="w-2/12">
                  {renderIcon(iconMap[item.icon], item.menuItemKey, isActive)}
                </div>
              )}
            </div>
            <div
              className={`w-10/12 ${isActive ? "text-white" : menuTheme[item.menuItemKey].text
                }`}
            >
              {translateMenu(item.menuItemKey)}
            </div>
          </div>
        </Link>
      </li>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isClickOutsideElement(mobileMenuRef.current, event)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="p-4 border-b h-16 flex gap-2 z-[99999]">
        <Button
          className="flex items-center justify-center w-12 border-none text-black lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars2Icon className="w-6 h-6 text-black" />
        </Button>
        <Logo />
      </header>

      <aside className="hidden lg:flex flex-col w-64 h-screen bg-admimprimary backdrop-blur-sm border-r border-white/20 shadow-sm fixed left-0 top-0 z-[9999] py-8 overflow-y-auto">
        <nav className="flex-1 pt-8">
          <ul className="flex flex-col gap-2 w-full">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </ul>
        </nav>
      </aside>

      <div className="flex lg:hidden min-w-[20rem] pt-24">
        <div
          className={`fixed inset-y-0 left-0 w-full bg-admimprimary backdrop-blur-sm min-h-screen border-r border-white/20 shadow-sm z-[999] max-w-xs p-2 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300`}
        >
          <div
            ref={mobileMenuRef}
            className="flex flex-col items-center space-y-4 min-w-[17rem] pt-8 -mt-[5rem]"
          >
            <ul className="flex flex-col items-center gap-2 w-full mt-24">
              {menuItems.map((item, index) =>
                renderMenuItem(item, index, true)
              )}
            </ul>
          </div>
        </div>

        <Button
          className={`fixed inset-0 min-w-screen min-h-screen bg-black/10 backdrop-blur-xs z-[99] ${isOpen ? "block" : "hidden"
            } lg:hidden`}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </>
  );
};

export default SidebarMenu;
