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
import { useEffect, useMemo, useRef, useState } from "react";
import { CartBadge } from "./CartBadge";
import { products } from "@/lib/data";

type NavLink = {
  href: string;
  label: string;
  sectionId?: "flash-sale" | "featured-brands";
};

type FilterGroup = {
  key: string;
  label: string;
  queryKey: "brand" | "usage" | "skinType" | "productType";
  options: string[];
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
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  // UPDATED: Changed from expandedCategory to activeCategory for main panel selection
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // ADDED: Ref for the filter panel to detect clicks outside
  const panelRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // UPDATED: Click outside detection for filter panel - also resets active category
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setFilterPanelOpen(false);
        setActiveCategory(null);
      }
    }

    if (filterPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterPanelOpen]);

  // UPDATED: ESC key handler to close filter panel - also resets active category
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && filterPanelOpen) {
        setFilterPanelOpen(false);
        setActiveCategory(null);
      }
    };

    if (filterPanelOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [filterPanelOpen]);

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
      setFilterPanelOpen(false);
    }
  };

  // UPDATED
  const handleSectionNavigation = (sectionId: "flash-sale" | "featured-brands") => {
    setFilterPanelOpen(false);

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

  // ADDED
  const filterGroups: FilterGroup[] = useMemo(
    () => [
      {
        key: "brand",
        label: "Thương hiệu",
        queryKey: "brand",
        options: Array.from(new Set(products.map((product) => product.brand))).sort(),
      },
      {
        key: "usage",
        label: "Công dụng",
        queryKey: "usage",
        options: ["Trang điểm", "Chăm sóc da"],
      },
      {
        key: "skinType",
        label: "Loại da",
        queryKey: "skinType",
        options: ["Da dầu", "Da khô", "Da hỗn hợp", "Da nhạy cảm", "Da thường"],
      },
      {
        key: "productType",
        label: "Loại sản phẩm",
        queryKey: "productType",
        options: Array.from(new Set(products.map((product) => product.category))).sort(),
      },
    ],
    [],
  );

  // ADDED: Handle main category selection (opens sub-panel)
  const handleCategorySelect = (categoryKey: string) => {
    setActiveCategory(categoryKey);
  };

  // UPDATED: Handle sub-option selection (redirects to products)
  const handleFilterSelection = (
    queryKey: FilterGroup["queryKey"],
    value: string,
  ) => {
    setFilterPanelOpen(false);
    setActiveCategory(null);
    router.push(`/products?${queryKey}=${encodeURIComponent(value)}`);
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
            onClick={() => setFilterPanelOpen((prev) => !prev)}
            aria-label="Toggle filter panel"
          >
            {filterPanelOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

      {filterPanelOpen && (
        <>
          {/* UPDATED: Overlay to close panel (simplified since click outside detection handles it) */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40"
            aria-label="Close filter panel"
            onClick={() => setFilterPanelOpen(false)}
          />

          {/* UPDATED: Connected frame layout - main panel only initially, sub panel appears on category selection */}
          <div
            ref={panelRef}
            className={`fixed left-4 top-[104px] z-50 flex overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#24171F] md:left-6 ${
              activeCategory ? 'w-[600px] max-w-[calc(100vw-2rem)]' : 'w-[300px] max-w-[calc(50vw-1rem)]'
            }`}
          >
            {/* Main Panel (Left) - takes full width when no category selected */}
            <div className={`border-[#EBC7D2] bg-[#FFF8FA] p-4 dark:border-[#5A3E49] dark:bg-[#2A1C23] ${
              activeCategory ? 'w-1/2 border-r' : 'w-full'
            }`}>
              <div className="mb-3">
                <p
                  className="text-[16px] font-semibold text-[#450920] dark:text-white"
                  style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  Bộ lọc sản phẩm
                </p>
                <p className="mt-1 text-sm text-[#7A5A67] dark:text-[#DDBBC7]">
                  Chọn danh mục
                </p>
              </div>

              <div className="space-y-2">
                {filterGroups.map((group) => {
                  const isActive = activeCategory === group.key;

                  return (
                    <button
                      key={group.key}
                      type="button"
                      onClick={() => handleCategorySelect(group.key)}
                      className={`w-full rounded-xl px-4 py-3 text-left transition-colors ${
                        isActive
                          ? "bg-[#DA627D] text-white"
                          : "bg-white text-[#450920] hover:bg-[#F8E5EA] dark:bg-[#24171F] dark:text-white dark:hover:bg-[#352028]"
                      }`}
                      style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                    >
                      <span className="text-[14px] font-medium">{group.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPDATED: Sub Panel (Right) - only appears when category is selected */}
            {activeCategory && (
              <div className="w-1/2 bg-white p-4 dark:bg-[#24171F]">
                <div className="mb-3">
                  <p
                    className="text-[16px] font-semibold text-[#450920] dark:text-white"
                    style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                  >
                    {filterGroups.find(g => g.key === activeCategory)?.label}
                  </p>
                  <p className="mt-1 text-sm text-[#7A5A67] dark:text-[#DDBBC7]">
                    Chọn tùy chọn
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {filterGroups
                    .find(g => g.key === activeCategory)
                    ?.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          handleFilterSelection(
                            filterGroups.find(g => g.key === activeCategory)!.queryKey,
                            option
                          )
                        }
                        className="rounded-xl border border-[#DA627D] bg-[#FFF8FA] px-3 py-2 text-sm font-medium text-[#A53860] transition hover:bg-[#FFF0F3] dark:bg-[#2A1C23] dark:border-[#5A3E49] dark:text-[#F3AABD] dark:hover:bg-[#352028]"
                        style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                      >
                        {option}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
