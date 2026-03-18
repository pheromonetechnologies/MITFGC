import type { Metadata } from "next";
import "./globals.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MIT First Grade College | NAAC A Grade | Mysuru",
  description:
    "MIT First Grade College, Mysuru - NAAC A Grade accredited institution affiliated to University of Mysore. Offering BCA, BBA, B.COM, M.COM programs. Established 2009.",
  keywords: [
    "MIT FGC",
    "MIT First Grade College",
    "Mysuru college",
    "NAAC A Grade",
    "BCA college Mysuru",
    "BBA college",
    "University of Mysore",
    "AICTE approved",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Navbar />
        <ThemeSwitcher />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
