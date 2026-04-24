"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  MessageCircle,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect, useSyncExternalStore } from "react";
import { CartBadge } from "./CartBadge";
import { useAuthStore } from "@/lib/store";

const emptySubscribe = () => () => {};
const DARK_MODE_STORAGE_KEY = "darkMode";
const DARK_MODE_EVENT = "glowic-dark-mode-change";

const subscribeToDarkMode = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = (event: Event) => {
    if (
      event instanceof StorageEvent &&
      event.key !== null &&
      event.key !== DARK_MODE_STORAGE_KEY
    ) {
      return;
    }

    callback();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(DARK_MODE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(DARK_MODE_EVENT, handleChange);
  };
};

const getDarkModeSnapshot = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(DARK_MODE_STORAGE_KEY) === "true";
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const darkMode = useSyncExternalStore(
    subscribeToDarkMode,
    getDarkModeSnapshot,
    () => false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(newVal));
    document.documentElement.classList.toggle("dark", newVal);
    window.dispatchEvent(new Event(DARK_MODE_EVENT));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push("/");
  };

  const isLoggedIn = isClient && Boolean(currentUser);

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
            <img
              src="/images/logo/LOGO_white.svg"
              alt="Glowic Beauty Logo"
              width={150}
              height={50}
              className="block h-[50px] w-auto"
              loading="eager"
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

            {isLoggedIn && currentUser ? (
              <div className="flex items-center gap-2 text-white">
                <Link href="/tai-khoan" className="flex items-center gap-1.5 min-w-0">
                  <User className="h-6 w-6 shrink-0" />
                  <div className="hidden lg:block min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/70">
                      Tài khoản
                    </p>
                    <p className="max-w-28 truncate text-sm font-semibold">
                      {currentUser.tenTaiKhoan}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden rounded-full border border-white/35 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/10 lg:inline-flex"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-white">
                <Link href="/login" className="flex items-center gap-1.5">
                  <User className="h-6 w-6" />
                  <span
                    className="hidden lg:inline"
                    style={{
                      fontFamily: '"Be Vietnam Pro", sans-serif',
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    Đăng nhập
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="hidden lg:inline text-[18px] font-semibold"
                  style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  / Đăng ký
                </Link>
              </div>
            )}
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

          <div className="border-t border-white/20 px-4 py-3 text-white">
            {isLoggedIn && currentUser ? (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-white/70">Đang đăng nhập</p>
                  <Link href="/tai-khoan" onClick={() => setMobileMenuOpen(false)}>
                    <p className="truncate text-sm font-semibold">
                      {currentUser.tenTaiKhoan}
                    </p>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 rounded-full border border-white/35 px-3 py-1 text-xs font-medium transition hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Đăng nhập
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
