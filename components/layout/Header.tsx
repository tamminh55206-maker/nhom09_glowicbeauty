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
} from "lucide-react";
import { useState } from "react";
import { CartBadge } from "./CartBadge";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
      {/* Top Row */}
      <div className="bg-[#DA627D]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/LOGO_white.svg"
              alt="Glowic Beauty Logo"
              width={150}
              height={50}
              className="h-[50px] w-auto"
              unoptimized
            />
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 justify-center px-8 md:flex"
          >
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <CartBadge />
            </Link>
            <button className="relative">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
                3
              </span>
            </button>
            <Link href="/faq">
              <MessageCircle className="h-6 w-6 text-white" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm text-white"
            >
              <User className="h-6 w-6" />
              <span
                className="hidden sm:inline"
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

      {/* Navbar Row */}
      <div className="bg-[#A53860]">
        <div className="mx-auto flex h-[40px] max-w-7xl items-center px-6">
          {/* Hamburger */}
          <button className="flex items-center text-white flex-shrink-0">
            <Menu className="h-5 w-5" />
          </button>

          {/* Nav links */}
          <nav
            className="flex flex-1 items-center justify-center"
            style={{ gap: "70px" }}
            suppressHydrationWarning
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white transition-colors hover:text-white/80"
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "18px",
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

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="bg-white p-3 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm outline-none"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </form>
    </header>
  );
}
