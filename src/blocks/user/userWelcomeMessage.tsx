"use client";

import type { FC } from "react";
import { useTranslations } from 'next-intl';

interface UserWelcomeMessageProps {
  userName?: string;
}

const UserWelcomeMessage: FC<UserWelcomeMessageProps> = ({ userName = "Demo user!" }) => {
  const t = useTranslations("greetings");
  const timeOfDay = getTimeOfDay();

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return t("morning");
    if (hour < 18) return t("afternoon");
    return t("evening");
  }

  return (
    <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">
      {timeOfDay}! <span className="font-semibold">{userName}</span>
    </h1>
  );
};

export default UserWelcomeMessage;
