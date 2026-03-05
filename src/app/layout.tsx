import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LUXE — Considered Luxury",
    template: "%s | LUXE",
  },
  description:
    "Curated luxury fashion and accessories. Timeless pieces crafted with exceptional materials and artisanal expertise.",
  keywords: ["luxury fashion", "designer clothing", "handcrafted accessories"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUXE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1c1917",
              color: "#fafaf9",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              borderRadius: "4px",
              padding: "12px 16px",
            },
          }}
        />
      </body>
    </html>
  );
}
