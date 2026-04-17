'use client';

import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { renderMenuItem, useActiveRoute } from "@/utils/menuUtils";
import { MenuItem } from "@/types/menuItem";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
  };
}

const UserDropdownMenu: FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('menuItems');
  const { isActiveRoute } = useActiveRoute();

  const menuItems = useMemo<Array<MenuItem>>(() => [
    {
      icon: "cog6ToothIcon",
      menuItemKey: 'profileSettings',
      to: '/user/settings/profile',
      ariaLabel: "Profile Settings",
    },
    {
      icon: "keyIcon",
      menuItemKey: 'changePassword',
      to: '/user/settings/password',
      ariaLabel: "Change Password",
    },
    {
      icon: "shieldCheckIcon",
      menuItemKey: '2FaAuthentication',
      to: '/user/settings/2fa',
      ariaLabel: "2FA Authentication",
    },
    {
      icon: "identificationIcon",
      menuItemKey: 'idVerification',
      to: '/user/settings/verification',
      ariaLabel: "ID Verification",
      badge: t('approved'),
      badgeColor: 'green-500',
    },
    {
      icon: "bellIcon",
      menuItemKey: 'allNotifications',
      to: '/user/notifications',
      ariaLabel: "All Notifications",
    },
    {
      icon: "questionMarkCircleIcon",
      menuItemKey: 'helpAndSupport',
      to: '/user/support',
      ariaLabel: "Help & Support",
    },
  ], [t]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>

          <div className="py-2">
            {menuItems.map((item, index) =>
              renderMenuItem(item, index, t, isActiveRoute)
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group mt-2 border-t border-gray-100 dark:border-gray-800"
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5 group-hover:text-red-700 transition-colors" />
              <span className="group-hover:text-red-700 transition-colors">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;