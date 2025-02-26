"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/config/i18n-config";
import { Globe } from "lucide-react";

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLang = pathname.split("/")[1] ?? "pt";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative text-left inline-block border shadow-sm rounded-lg ${className}`}
      ref={menuRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
        <span>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={
                  `flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900` +
                  (locale === currentLang ? "font-bold" : "")
                }
                role="menuitem"
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
