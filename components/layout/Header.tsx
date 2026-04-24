"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  Menu,
  Search,
  Bell,
  User,
  MessageCircle,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import { CartBadge } from "./CartBadge";

type NavLink = {
  href: string;
  label: string;
  sectionId?: "flash-sale" | "featured-brands";
};

// ADDED
function scrollToSectionWithOffset(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = -150;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem("darkMode", String(newVal));
    document.documentElement.classList.toggle("dark", newVal);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  // ADDED
  const handleSectionNavigation = (sectionId: "flash-sale" | "featured-brands") => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      const target = document.getElementById(sectionId);
      if (target) {
        window.history.replaceState(null, "", `/#${sectionId}`);
        // UPDATED
        scrollToSectionWithOffset(sectionId);
      }
      return;
    }

    router.push(`/#${sectionId}`);
  };

  const navLinks: NavLink[] = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Danh mục sản phẩm" },
    // UPDATED
    { href: "/#flash-sale", label: "Flash Sale", sectionId: "flash-sale" },
    // UPDATED
    {
      href: "/#featured-brands",
      label: "Thương hiệu nổi bật",
      sectionId: "featured-brands",
    },
    { href: "/quiz", label: "Bài test cá nhân" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#DA627D] dark:bg-[#7a2840]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16 lg:px-8">
          <Link href="/" className="flex flex-shrink-0 items-center">
            <Image
              src="/images/logo/LOGO_white.svg"
              alt="Glowic Beauty Logo"
              width={150}
              height={50}
              className="h-[50px] w-auto"
              style={{ width: "auto", height: "50px" }}
              loading="eager"
              unoptimized
            />
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden flex-1 justify-center px-4 md:flex lg:px-8"
          >
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
              <button type="submit">
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <CartBadge />
            </Link>

            <button className="relative hidden sm:block">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
                3
              </span>
            </button>

            <button className="hidden sm:block">
              <MessageCircle className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={toggleDarkMode}
              className="text-white transition-transform hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm text-white"
            >
              <User className="h-6 w-6" />
              <span
                className="hidden lg:inline"
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Đăng nhập/ Đăng ký
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#A53860] dark:bg-[#5c1e35]">
        <div className="mx-auto flex h-[40px] max-w-7xl items-center px-4 md:px-6">
          <button
            className="flex flex-shrink-0 items-center text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden flex-1 items-center justify-center gap-3 md:flex lg:gap-[70px]">
            {navLinks.map((link) =>
              link.sectionId ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleSectionNavigation(link.sectionId!)}
                  className="whitespace-nowrap text-white transition-colors hover:text-white/80"
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "clamp(13px, 1.4vw, 18px)",
                    fontWeight: pathname === "/" ? 700 : 400,
                    lineHeight: "23px",
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-white transition-colors hover:text-white/80"
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "clamp(13px, 1.4vw, 18px)",
                    fontWeight: pathname === link.href ? 700 : 400,
                    lineHeight: "23px",
                  }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-white p-3 dark:bg-gray-900 md:hidden"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
          <button type="submit">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </form>

      {mobileMenuOpen && (
        <div className="border-t border-white/20 bg-[#A53860] dark:bg-[#5c1e35] md:hidden">
          <nav className="flex flex-col px-4 py-1">
            {navLinks.map((link) =>
              link.sectionId ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleSectionNavigation(link.sectionId!)}
                  className="border-b border-white/20 py-3 text-left text-white transition-colors last:border-0 hover:text-white/80"
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "16px",
                    fontWeight: pathname === "/" ? 700 : 400,
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/20 py-3 text-white transition-colors last:border-0 hover:text-white/80"
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "16px",
                    fontWeight: pathname === link.href ? 700 : 400,
                  }}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
