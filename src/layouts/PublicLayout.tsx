import { ReactNode } from "react";
import Image from "next/image";
import LoginBackground from "@/assets/images/login-background.png";

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden flex min-w-screen w-full">
      <main className="grid mx-auto w-full">
        {children}
      </main>

      <Image
        src={LoginBackground}
        alt="leaf"
        className="w-full md:block hidden"
        width={100}
        height={100}
      />
    </div>
  )
}
