import { FC } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import UserWelcomeMessage from "@/blocks/user/userWelcomeMessage";
import HelpAndSupportShortcut from "@/blocks/user/helpAndSupportShortcut";
import UserDropdownMenu from "@/blocks/user/userDropdownMenu";

const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-adminprimary backdrop-blur-sm z-[9999] px-2 flex items-center justify-between lg:pl-[16rem] border-b shadow-sm">

      <div className="hidden lg:block">
        <UserWelcomeMessage />
      </div>

      <div className="ml-auto flex items-center justify-between h-16 gap-16">
        <div className="flex gap-4">
          <LanguageSwitcher
            className="bg-white/90 text-black"
          />

          <HelpAndSupportShortcut />

          <UserDropdownMenu
            user={{
              name: "John Doe",
              email: "john.doe@mail.com",
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header;
