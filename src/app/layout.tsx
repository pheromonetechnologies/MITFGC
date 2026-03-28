import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MIT First Grade College | NAAC A Grade | Mysuru",
    template: "%s | MIT FGC",
  },
  description:
    "MIT First Grade College, Mysuru - NAAC A Grade accredited institution affiliated to University of Mysore. Offering BCA, BBA, B.COM, M.COM programs.",
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
  metadataBase: new URL("https://mitfgc.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MIT First Grade College",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
