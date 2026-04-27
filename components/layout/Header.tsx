"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
import { useState, useEffect, useMemo, useRef } from "react";
import { CartBadge } from "./CartBadge";
import { useAuthStore } from "@/lib/store";
import { products } from "@/lib/data";
import { getBasePath } from "@/lib/getBasePath";

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

type FilterCategoryKey = "brand" | "function" | "skinType" | "category";

type FilterCategory = {
  key: FilterCategoryKey;
  label: string;
};

type SubPanelProps = {
  options: string[];
  onSelect: (value: string) => void;
};

function SubPanel({ options, onSelect }: SubPanelProps) {
  const splitIndex = Math.ceil(options.length / 2);
  const leftColumn = options.slice(0, splitIndex);
  const rightColumn = options.slice(splitIndex);

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="w-[485px] bg-white p-[11px] text-[16px] text-black"
    >
      <div className="grid max-h-[65vh] grid-cols-2 content-center gap-x-[90px] overflow-y-auto">
        <div className="flex flex-col justify-center gap-2">
          {leftColumn.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="w-full rounded-md px-2 py-1 text-left leading-6 transition-all duration-150 hover:-translate-y-px hover:bg-rose-50 hover:text-[#A53860]"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2">
          {rightColumn.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="w-full rounded-md px-2 py-1 text-left leading-6 transition-all duration-150 hover:-translate-y-px hover:bg-rose-50 hover:text-[#A53860]"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

type FilterPanelProps = {
  categories: FilterCategory[];
  activeCategory: FilterCategoryKey | null;
  onCategoryClick: (key: FilterCategoryKey) => void;
};

function FilterPanel({
  categories,
  activeCategory,
  onCategoryClick,
}: FilterPanelProps) {
  return (
    <div className="w-[200px] self-stretch bg-[#FFA5AB] p-[11px] text-[16px] text-black">
      <div className="flex h-full flex-col gap-[18px]">
        {categories.map((category) => {
          const isActive = activeCategory === category.key;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategoryClick(category.key)}
              className={`rounded-md px-2 py-1 text-left leading-6 transition-colors ${
                isActive
                  ? "bg-[#f28895] text-white"
                  : "text-black hover:bg-[#ffb9be]"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HamburgerMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FilterCategoryKey | null>(
    null,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const categories: FilterCategory[] = [
    { key: "brand", label: "Thương hiệu" },
    { key: "function", label: "Công dụng" },
    { key: "skinType", label: "Loại da" },
    { key: "category", label: "Loại sản phẩm" },
  ];

  const skinTypeOptions = useMemo(() => {
    const rawTypes = new Set(
      products.flatMap((product) =>
        product.skinType.filter((type) => type !== "Tất cả loại da"),
      ),
    );
    const normalized = new Set<string>();
    rawTypes.forEach((type) => {
      if (type === "Dầu") normalized.add("Da dầu");
      else if (type === "Khô") normalized.add("Da khô");
      else if (type === "Hỗn hợp") normalized.add("Da hỗn hợp");
      else if (type === "Nhạy cảm") normalized.add("Da nhạy cảm");
      else if (type === "Thường") normalized.add("Da thường");
      else normalized.add(type);
    });
    return Array.from(normalized).sort((a, b) => a.localeCompare(b, "vi"));
  }, []);

  const filterOptions = useMemo(() => {
    const brands = Array.from(new Set(products.map((product) => product.brand))).sort(
      (a, b) => a.localeCompare(b, "vi"),
    );
    const productTypes = Array.from(
      new Set(products.map((product) => product.category)),
    ).sort((a, b) => a.localeCompare(b, "vi"));
    return {
      brand: brands,
      function: ["Trang điểm", "Chăm sóc da"],
      skinType: skinTypeOptions,
      category: productTypes,
    } as Record<FilterCategoryKey, string[]>;
  }, [skinTypeOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveCategory(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCategoryClick = (category: FilterCategoryKey) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleSelectOption = (value: string) => {
    if (!activeCategory) return;
  
    const queryMap: Record<FilterCategoryKey, string> = {
      brand: "brand",
      category: "category",
      skinType: "skinType",
      function: "function",
    };
  
    const queryKey = queryMap[activeCategory];
    const encodedValue = encodeURIComponent(value);
  
    const url = `${getBasePath()}/products?${queryKey}=${encodedValue}`;
  
    // đóng menu trước khi chuyển
    setIsOpen(false);
    setActiveCategory(null);
  
    // chuyển trang KHÔNG dùng router
    window.location.href = url;
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        className="flex shrink-0 items-center text-white"
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (isOpen) {
            setActiveCategory(null);
          }
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-[calc(100%+8px)] z-50 flex items-stretch overflow-hidden rounded-xl"
            >
              <FilterPanel
                categories={categories}
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
              />
              <AnimatePresence>
                {activeCategory && (
                  <SubPanel
                    options={filterOptions[activeCategory]}
                    onSelect={handleSelectOption}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuthStore();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem("darkMode") === "true";
  });

  const displayName = currentUser
    ? currentUser.tenTaiKhoan?.trim() || currentUser.email || "Tài khoản"
    : "Đăng nhập/ Đăng ký";

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
    }
  };

  // ADDED
  const handleSectionNavigation = (
    sectionId: "flash-sale" | "featured-brands",
  ) => {
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
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={assetPath("/images/logo/LOGO_white.svg")}
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

            <Link href="/user" className="relative hidden sm:block">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
                3
              </span>
            </Link>

            <Link
              href="/faq"
              className="hidden sm:block transition-transform hover:scale-110"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Link>

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
              href={currentUser ? "/user?tab=profile" : "/login"}
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
                {displayName}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#A53860] dark:bg-[#5c1e35]">
        <div className="mx-auto flex h-[40px] max-w-7xl items-center px-4 md:px-6">
          <HamburgerMenu />

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

    </header>
  );
}
