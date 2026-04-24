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

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const isDark = saved === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

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

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Danh mục sản phẩm" },
    { href: "/flash-sale", label: "Flash Sale" },
    { href: "/brands", label: "Thương hiệu nổi bật" },
    { href: "/quiz", label: "Bài test cá nhân" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* ───── Top Row ───── */}
      <div className="bg-[#DA627D] dark:bg-[#7a2840]">
        <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo – ảnh từ GitHub */}
          <Link href="/" className="flex items-center flex-shrink-0">
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

          {/* Search Bar – ẩn mobile, hiện từ md */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 justify-center px-4 lg:px-8"
          >
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 outline-none placeholder:text-gray-400
                           dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
              <button type="submit">
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <CartBadge />
            </Link>

            <button className="relative hidden sm:block">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
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
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
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

      {/* ───── Navbar Row ───── */}
      <div className="bg-[#A53860] dark:bg-[#5c1e35]">
        <div className="mx-auto flex h-[40px] max-w-7xl items-center px-4 md:px-6">
          <button
            className="flex items-center text-white flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-3 lg:gap-[70px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white transition-colors hover:text-white/80 whitespace-nowrap"
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "clamp(13px, 1.4vw, 18px)",
                  fontWeight: pathname === link.href ? 700 : 400,
                  lineHeight: "23px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ───── Mobile Search ───── */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-3 md:hidden dark:bg-gray-900"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm outline-none
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
          />
          <button type="submit">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </button>
        </div>
      </form>

      {/* ───── Mobile Dropdown ───── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#A53860] dark:bg-[#5c1e35] border-t border-white/20">
          <nav className="flex flex-col px-4 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-white border-b border-white/20 last:border-0 transition-colors hover:text-white/80"
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "16px",
                  fontWeight: pathname === link.href ? 700 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
