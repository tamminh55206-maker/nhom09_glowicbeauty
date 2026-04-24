import type { Metadata, Viewport } from "next";
import { Alice, Be_Vietnam_Pro, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

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

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Glowic Beauty",
  description: "Beauty for everyone.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#DA627D",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${alice.variable} ${beVietnamPro.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
