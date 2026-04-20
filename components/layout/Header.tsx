"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { CartBadge } from "./CartBadge";

export function Header() {
  const router = useRouter();
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
    <header className="sticky top-0 z-50 border-b bg-white">
      {/* Main Header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - Mistesy + Alice */}
        <Link
          href="/"
          className="text-2xl tracking-tight text-rose-500"
          style={{ fontFamily: '"Mistesy", "Alice", serif' }}
        >
          Glowic
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden flex-1 px-8 md:block">
          <div className="relative mx-auto max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-rose-300 focus:bg-white"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification */}
          <button className="relative p-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500"></span>
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <CartBadge />
          </Link>

          {/* Mobile Menu Button */}
          <button className="p-2 md:hidden">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation Bar - Dark Pink */}
      <div className="bg-rose-400">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            {/* Hamburger Menu */}
            <button className="flex items-center gap-2 text-white">
              <Menu className="h-5 w-5" />
              <span className="hidden text-sm font-medium sm:inline">
                Danh mục
              </span>
            </button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Login/Register */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Đăng nhập/ Đăng ký</span>
            <span className="sm:hidden">Đăng nhập</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="border-t bg-white p-3 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </form>
    </header>
  );
}
