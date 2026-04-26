"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { assetPath } from "@/lib/utils";
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
import { useAuthStore } from "@/lib/store";

type NavLink = {
  href: string;
  label: string;
  sectionId?: "flash-sale" | "featured-brands";
};

function scrollToSectionWithOffset(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = -150;
  const y =
    element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ detect client (thay cho mounted)
  const isClient = typeof window !== "undefined";

  // ✅ lazy init darkMode (không cần effect setState)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // ✅ chỉ sync DOM (KHÔNG setState)
  useEffect(() => {
    if (!isClient) return;
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode, isClient]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", String(newValue));
      return newValue;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleSectionNavigation = (
    sectionId: "flash-sale" | "featured-brands"
  ) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      const target = document.getElementById(sectionId);
      if (target) {
        window.history.replaceState(null, "", `/#${sectionId}`);
        scrollToSectionWithOffset(sectionId);
      }
      return;
    }

    router.push(`/#${sectionId}`);
  };

  const navLinks: NavLink[] = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Danh mục sản phẩm" },
    { href: "/#flash-sale", label: "Flash Sale", sectionId: "flash-sale" },
    {
      href: "/#featured-brands",
      label: "Thương hiệu nổi bật",
      sectionId: "featured-brands",
    },
    { href: "/quiz", label: "Bài test cá nhân" },
  ];

  // ❗ chặn render trên server → tránh hydration mismatch
  if (!isClient) return null;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#DA627D] dark:bg-[#7a2840]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16 lg:px-8">
          <Link href="/" className="flex flex-shrink-0 items-center">
            <Image
              src={assetPath("/images/logo/LOGO_white.svg")}
              alt="Glowic Beauty Logo"
              width={120}
              height={40}
              priority
            />
          </Link>

          {/* SEARCH */}
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
                className="w-full rounded-full bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 outline-none dark:bg-gray-800 dark:text-white"
              />
              <button type="submit">
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <CartBadge />
            </Link>

            <Link href="/user" className="relative hidden sm:block">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
                3
              </span>
            </Link>

            <Link href="/faq" className="hidden sm:block">
              <MessageCircle className="h-6 w-6 text-white" />
            </Link>

            {/* ✅ dark mode không còn mismatch */}
            <button
              onClick={toggleDarkMode}
              className="text-white transition-transform hover:scale-110"
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>

            <Link
              href={currentUser ? "/user" : "/login"}
              className="flex items-center gap-1.5 text-sm text-white"
            >
              <User className="h-6 w-6" />
              <span className="hidden lg:inline">
                {currentUser
                  ? currentUser.tenTaiKhoan
                  : "Đăng nhập/ Đăng ký"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-[#A53860] dark:bg-[#5c1e35]">
        <div className="mx-auto flex h-[40px] max-w-7xl items-center px-4 md:px-6">
          <button
            className="flex items-center text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <nav className="hidden flex-1 justify-center gap-6 md:flex">
            {navLinks.map((link) =>
              link.sectionId ? (
                <button
                  key={link.href}
                  onClick={() => handleSectionNavigation(link.sectionId!)}
                  className="text-white hover:text-white/80"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-white/80"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}