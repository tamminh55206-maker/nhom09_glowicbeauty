"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ============================================
   Sub-components
   ============================================ */

function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-col items-start leading-none text-shadow-glowic"
    >
      <span className="font-mistesy text-[48px] leading-[47px] text-white">
        Glowic
      </span>
      <span className="font-alice w-[142px] pr-1 text-right text-[12px] leading-[14px] text-white text-shadow-glowic">
        beauty
      </span>
    </Link>
  );
}

function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative h-[45px] w-[592px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        className="h-full w-full rounded-full border border-[#A53860] bg-white py-2 pl-5 pr-12 text-sm text-[#450920] placeholder:text-[#450920]/40 shadow-[0px_4px_4px_rgba(69,9,32,0.25)] focus:outline-none focus:ring-2 focus:ring-[#A53860]/20"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#450920]"
        aria-label="Tìm kiếm"
      >
        <svg
          className="h-[22.5px] w-[22.5px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}

/* ============================================
   Inline SVG Icons (no external library)
   ============================================ */

function CartIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function HamburgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="18"
      viewBox="0 0 29 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" d="M0 1h29M0 9h29M0 17h29" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

/* ============================================
   Main Header Component
   ============================================ */

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Danh mục sản phẩm" },
    { href: "/flash-sale", label: "Flash Sale" },
    { href: "/brands", label: "Thương hiệu nổi bật" },
    { href: "/quiz", label: "Bài test cá nhân" },
  ];

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ===== HEAD SECTION (103px) ===== */}
      <div className="relative h-[103px] w-full border-b border-[#A53860] bg-[#DA627D]">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5">
          {/* Logo */}
          <Logo />

          {/* Search Box (desktop only) */}
          <div className="hidden flex-1 justify-center px-10 lg:flex">
            <SearchBar />
          </div>

          {/* Icons & Login */}
          <div className="flex items-center gap-[30px] drop-shadow-[0px_4px_4px_rgba(69,9,32,0.25)]">
            {/* Cart */}
            <Link
              href="/cart"
              className="text-white transition-transform duration-200 hover:scale-110"
              aria-label="Giỏ hàng"
            >
              <CartIcon />
            </Link>

            {/* Bell */}
            <button
              className="relative text-white transition-transform duration-200 hover:scale-110"
              aria-label="Thông báo"
            >
              <BellIcon />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#F9DBBD]" />
            </button>

            {/* Chat */}
            <button
              className="text-white transition-transform duration-200 hover:scale-110"
              aria-label="Tin nhắn"
            >
              <ChatIcon />
            </button>

            {/* User / Login */}
            <Link
              href="/login"
              className="hidden items-center gap-[11px] text-white transition-opacity duration-200 hover:opacity-90 sm:flex"
            >
              <UserIcon />
              <span className="whitespace-nowrap text-lg font-semibold leading-[23px]">
                Đăng nhập/ Đăng ký
              </span>
            </Link>

            {/* Mobile hamburger toggle */}
            <button
              className="flex text-white transition-opacity hover:opacity-80 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Mở menu"
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== MENU SECTION (40px) ===== */}
      <nav className="h-10 w-full bg-[#A53860]">
        <div className="mx-auto flex h-full max-w-[1280px] items-center px-6">
          {/* Desktop navigation */}
          <div className="hidden h-[23px] items-center gap-[97px] lg:flex">
            {/* Decorative hamburger icon */}
            <HamburgerIcon className="text-white" />

            {/* Menu links */}
            <div className="flex items-center gap-[70px]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-lg leading-[23px] text-white transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile: compact horizontal scroll */}
          <div className="flex items-center gap-6 overflow-x-auto lg:hidden">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      <div
        className={`overflow-hidden bg-[#DA627D] transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-b border-[#A53860] px-6 py-4">
          {/* Mobile search */}
          <form onSubmit={handleMobileSearch} className="relative mb-4">
            <input
              type="text"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="h-11 w-full rounded-full border border-[#A53860] bg-white py-2 pl-4 pr-10 text-sm text-[#450920] placeholder:text-[#450920]/40 shadow-[0px_4px_4px_rgba(69,9,32,0.25)] focus:outline-none focus:ring-2 focus:ring-[#A53860]/20"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#450920]"
              aria-label="Tìm kiếm"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </form>

          {/* Mobile nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-base text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="py-2 text-base font-semibold text-white transition-opacity hover:opacity-80"
            >
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
