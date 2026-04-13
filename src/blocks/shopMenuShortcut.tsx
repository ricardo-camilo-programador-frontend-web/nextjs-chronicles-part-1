import Image from "next/image";
import shopIcon from "@/assets/svg/shop-icon.svg";
import Link from "@/components/Link";

interface ShopMenuShortcutProps {
  className?: string;
}

export const ShopMenuShortcut = ({ className }: ShopMenuShortcutProps) => {
  return (
    <Link
      className={`px-6 py-2 text-[1.75rem] hover:bg-glass transition-all duration-300 text-center flex items-center gap-2 ${className}`}
      title="Shop"
      href="/plants"
    >
      <Image src={shopIcon} alt="Shop icon" width={26} height={26} className="dark:invert" />
    </Link>
  );
};
