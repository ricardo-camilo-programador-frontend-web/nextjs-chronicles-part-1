import { ReactNode } from "react";
import PublicLayout from "@/layouts/PublicLayout";

type Props = {
  children: ReactNode;
};

export default async function UserLayout({
  children,
}: Props) {

  return (
    <PublicLayout>
        {children}
    </PublicLayout>
  );
}
