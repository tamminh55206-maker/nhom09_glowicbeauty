import type { Metadata } from "next";
import { Alice, Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const alice = Alice({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alice",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "Glowic Beauty",
  description: "Beauty for everyone.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${alice.variable} ${beVietnamPro.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
