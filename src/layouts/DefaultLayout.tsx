import { Header } from "@/components/Header";
import { menuItems } from "@/static/menuItems";
import Footer from "@/blocks/sections/footer";

interface Props {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden grid">
      <Header menuItems={menuItems} />

      <main className="grid mx-auto py-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}
