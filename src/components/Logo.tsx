import Link from "@/components/Link";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, imageClassName, width = 128, height = 128 }: LogoProps) {
  return (
    <Link
      href="/"
      className={`block transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg scale-125 ml-3 md:ml-0 md:scale-100 ${className}`}
    >
      <Image
        src={logo}
        alt="Logo"
        width={width}
        height={height}
        className={`w-32 h-auto object-contain drop-shadow-md hover:drop-shadow-lg transition-shadow dark:brightness-110 ${imageClassName}`}
        priority
      />
    </Link>
  )
}

