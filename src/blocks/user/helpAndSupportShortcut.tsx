'use client';

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HelpAndSupportShortcut() {
  const t = useTranslations('menuItems');

  return (
    <Link
      href="/user/support"
      className="text-white rounded-full p-3 flex items-center gap-2 z-50 relative w-8 h-8 my-auto group"
      title={t('helpAndSupport')}
    >
      <QuestionMarkCircleIcon className="absolute w-8 h-8 -ml-3 text-black transition-transform duration-300 group-hover:shadow-lg rounded-full group-hover:text-blue-500" />
    </Link>
  );
}
