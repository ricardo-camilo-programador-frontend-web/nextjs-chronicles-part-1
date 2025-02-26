import type { JSX } from "react";
import { usePathname } from "next/navigation";
import { getUniqueId } from "@/utils/getUniqueId";
import { MenuItem } from "@/types/menuItem";
import Link from "@/components/Link";
import {
  HomeIcon,
  PlusCircleIcon,
  WalletIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  CalculatorIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  ChartPieIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  KeyIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  BellIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  HomeIcon,
  PlusCircleIcon,
  WalletIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  CalculatorIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  ChartPieIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  KeyIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  BellIcon,
  QuestionMarkCircleIcon,
};
export interface MenuColorScheme {
  text: string;
  hover: string;
  active: string;
}

export interface MenuTheme {
  [key: string]: MenuColorScheme;
}

export const menuTheme: MenuTheme = {
  home: {
    text: "text-gray-500",
    hover: "hover:bg-gray-500/10",
    active: "bg-gray-500",
  },
  plants: {
    text: "text-purple-500",
    hover: "hover:bg-purple-500/10",
    active: "bg-purple-500",
  },
  contactLink: {
    text: "text-purple-500",
    hover: "hover:bg-purple-500/10",
    active: "bg-purple-500",
  },
  orders: {
    text: "text-purple-500",
    hover: "hover:bg-purple-500/10",
    active: "bg-purple-500",
  },
  dashboard: {
    text: "text-purple-500",
    hover: "hover:bg-purple-500/10",
    active: "bg-purple-500",
  },
  deposit: {
    text: "text-blue-500",
    hover: "hover:bg-blue-500/10",
    active: "bg-blue-500",
  },
  wallets: {
    text: "text-pink-500",
    hover: "hover:bg-pink-500/10",
    active: "bg-pink-500",
  },
  virtualCards: {
    text: "text-cyan-500",
    hover: "hover:bg-cyan-500/10",
    active: "bg-cyan-500",
  },
  fundTransfer: {
    text: "text-emerald-500",
    hover: "hover:bg-emerald-500/10",
    active: "bg-emerald-500",
  },
  dps: {
    text: "text-orange-500",
    hover: "hover:bg-orange-500/10",
    active: "bg-orange-500",
  },
  fdr: {
    text: "text-red-500",
    hover: "hover:bg-red-500/10",
    active: "bg-red-500",
  },
  loan: {
    text: "text-green-500",
    hover: "hover:bg-green-500/10",
    active: "bg-green-500",
  },
  payBill: {
    text: "text-yellow-600",
    hover: "hover:bg-yellow-600/10",
    active: "bg-yellow-600",
  },
  transactions: {
    text: "text-indigo-500",
    hover: "hover:bg-indigo-500/10",
    active: "bg-indigo-500",
  },
  withdraw: {
    text: "text-lime-600",
    hover: "hover:bg-lime-600/10",
    active: "bg-lime-600",
  },
  referral: {
    text: "text-sky-500",
    hover: "hover:bg-sky-500/10",
    active: "bg-sky-500",
  },
  portfolio: {
    text: "text-violet-500",
    hover: "hover:bg-violet-500/10",
    active: "bg-violet-500",
  },
  rewards: {
    text: "text-amber-500",
    hover: "hover:bg-amber-500/10",
    active: "bg-amber-500",
  },
  support: {
    text: "text-rose-500",
    hover: "hover:bg-rose-500/10",
    active: "bg-rose-500",
  },
  settings: {
    text: "text-gray-500",
    hover: "hover:bg-gray-500/10",
    active: "bg-gray-500",
  },
  profileSettings: {
    text: "text-gray-500",
    hover: "hover:bg-gray-500/10",
    active: "bg-gray-500",
  },
  changePassword: {
    text: "text-blue-500",
    hover: "hover:bg-blue-500/10",
    active: "bg-blue-500",
  },
  '2FaAuthentication': {
    text: "text-green-500",
    hover: "hover:bg-green-500/10",
    active: "bg-green-500",
  },
  'ID Verification': {
    text: "text-yellow-500",
    hover: "hover:bg-yellow-500/10",
    active: "bg-yellow-500",
  },
  'All Notifications': {
    text: "text-purple-500",
    hover: "hover:bg-purple-500/10",
    active: "bg-purple-500",
  },
  'Help & Support': {
    text: "text-rose-500",
    hover: "hover:bg-rose-500/10",
    active: "bg-rose-500",
  },
  idVerification: {
    text: "text-yellow-500",
    hover: "hover:bg-yellow-500/10",
    active: "bg-yellow-500",
  },
  allNotifications: {
    text: "text-purple-500",
    hover: "hover:bg-purple-500/10",
    active: "bg-purple-500",
  },
  helpAndSupport: {
    text: "text-rose-500",
    hover: "hover:bg-rose-500/10",
    active: "bg-rose-500",
  }
};

export const useActiveRoute = () => {
  const pathname = usePathname();

  const isActiveRoute = (itemPath: string): boolean => {
    const normalizedPathname = pathname.replace(/^\/[^/]+/, "");
    return (
      normalizedPathname === itemPath ||
      normalizedPathname.startsWith(`${itemPath}/`)
    );
  };

  return { isActiveRoute };
};

export const renderIcon = (
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  menuKey: string,
  isActive: boolean,
): JSX.Element | null => {
  if (!Icon) return null;

  return (
    <Icon
      className={`w-5 h-5 ${isActive ? "text-white" : menuTheme[menuKey].text}`}
      aria-hidden="true"
    />
  );
};

export const getMenuItemClasses = (
  menuKey: string,
  isActive: boolean,
  theme: MenuTheme
): string => {
  const defaultTheme: MenuColorScheme = {
    text: "text-gray-500",
    hover: "hover:bg-gray-500/10",
    active: "bg-gray-500"
  };

  const colorScheme = theme[menuKey] || defaultTheme;
  return isActive
    ? `${colorScheme.active} text-white`
    : `${colorScheme.text} ${colorScheme.hover}`;
};

export const renderMenuItem = (
  item: MenuItem,
  index: number,
  t: (key: string) => string,
  isActiveRoute: (path: string) => boolean
): JSX.Element => {
  const itemKey = `${item.menuItemKey}-${index}-menu-${getUniqueId()}`;
  let Icon;
  if (item.icon) {
    Icon = iconMap[item.icon];
  }
  const isActive = isActiveRoute(item.to);
  const defaultText = "text-gray-500";

  return (
    <li
      key={itemKey}
      className={`w-full transition-all duration-300 border-b border-transparent flex items-center justify-center ${getMenuItemClasses(
        item.menuItemKey,
        isActive,
        menuTheme
      )}`}
    >
      <Link
        href={item.to}
        aria-label={item.ariaLabel}
        className={`flex items-center justify-center mx-2 p-4 text-sm rounded-md font-bold transition-colors duration-200 w-full ${isActive ? "text-white" : ""}`}
      >
        <div className="flex">
          {Icon && (
            <div className="w-2/12">
              {renderIcon(Icon, item.menuItemKey, isActive)}
            </div>
          )}
          <div className={`w-8/12 ${isActive ? "text-white" : (menuTheme[item.menuItemKey]?.text || defaultText)}`}>
            {t(item.menuItemKey)}
          </div>

          {item.badge && item.badgeColor && (
            <div className="flex items-center justify-center ml-2 w-2/12">
              <span
                className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-${item.badgeColor} rounded-full`}
              >
                {item.badge}
              </span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};