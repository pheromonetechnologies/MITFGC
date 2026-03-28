import Navbar from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[68px] min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
