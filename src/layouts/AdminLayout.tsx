import { ReactNode } from "react";
import AdminHeader from "@/components/AdminHeader";
import { adminMenuItems } from "@/static/menuItems";
import SidebarMenu from "@/components/SidebarMenu";

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="flex fixed">
        <SidebarMenu
          menuItems={adminMenuItems}
        />

        <AdminHeader />
      </div>

      <main className="mt-16 lg:pl-64 w-full min-h-screen">
        <div className="p-2">
          {children}
        </div>
      </main>
    </div>
  );
}
