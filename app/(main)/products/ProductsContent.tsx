"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  ChevronRight,
  Filter,
  X,
  ChevronLeft,
} from "lucide-react";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
} as const;

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Filters {
  brands: string[];
  congDung: string[];
  loaiDa: string[];
  loaiSanPham: string[];
  giaTu: string;
  giaDen: string;
  sort: string;
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-white dark:bg-gray-800 p-3 transition-shadow hover:shadow-lg"
      style={{ border: "0.5px solid #450920", borderRadius: "12px" }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.stock < 20 && (
            <span
              className="absolute left-2 top-2 rounded-full px-2 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: "#DA627D" }}
            >
              Sắp hết hàng
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 space-y-2">
        <p
          style={{
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: "14px",
            fontWeight: 500,
            color: "#DA627D",
          }}
        >
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3
            className="line-clamp-2 transition-colors hover:text-rose-500 dark:text-white"
            style={{
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "18px",
            }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {product.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: "16px",
              fontWeight: 700,
              color: "#450920",
            }}
            className="dark:!text-rose-300"
          >
            {product.price.toLocaleString("vi-VN")}₫
          </span>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
            style={{ backgroundColor: "#DA627D" }}
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Filter Sidebar ────────────────────────────────────────────────────────────
function FilterSidebar({
  filters,
  toggleFilter,
  setFilters,
  applyGia,
  onClearFilters,
  isOpen,
  onClose,
}: {
  filters: Filters;
  toggleFilter: (
    key: "brands" | "congDung" | "loaiDa" | "loaiSanPham",
    value: string,
  ) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  applyGia: () => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const congDung = Array.from(new Set(products.map((p) => p.category)));
  const loaiDa = Array.from(new Set(products.flatMap((p) => p.skinType)));
  const loaiSanPham = Array.from(new Set(products.map((p) => p.category)));

  const filterGroups = [
    { key: "brands" as const, label: "Thương hiệu", options: brands },
    { key: "congDung" as const, label: "Công dụng", options: congDung },
    { key: "loaiDa" as const, label: "Loại da", options: loaiDa },
    { key: "loaiSanPham" as const, label: "Loại sản phẩm", options: loaiSanPham },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-[280px] transform bg-white transition-transform dark:bg-gray-800 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
            <h2
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: "18px",
                fontWeight: 700,
                color: "#450920",
              }}
              className="dark:!text-rose-300"
            >
              Bộ lọc
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Price Range */}
            <div className="mb-6">
              <h3
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#450920",
                }}
                className="mb-3 dark:!text-rose-300"
              >
                Khoảng giá
              </h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Giá từ"
                  value={filters.giaTu}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, giaTu: e.target.value }))
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                />
                <input
                  type="number"
                  placeholder="Giá đến"
                  value={filters.giaDen}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, giaDen: e.target.value }))
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                />
                <button
                  onClick={applyGia}
                  className="w-full rounded-lg py-2 text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: "#A53860" }}
                >
                  Áp dụng
                </button>
              </div>
            </div>

            {/* Filter Groups */}
            {filterGroups.map((group) => (
              <div key={group.key} className="mb-6">
                <h3
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#450920",
                  }}
                  className="mb-3 dark:!text-rose-300"
                >
                  {group.label}
                </h3>
                <div className="space-y-2">
                  {group.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={filters[group.key].includes(option)}
                        onChange={() => toggleFilter(group.key, option)}
                        className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                      />
                      <span className="dark:text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clear Filters */}
          <div className="border-t p-4 dark:border-gray-700">
            <button
              onClick={onClearFilters}
              className="w-full rounded-lg border py-2 text-sm font-medium transition-colors dark:border-gray-600 dark:text-white"
              style={{ borderColor: "#DA627D", color: "#A53860" }}
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    congDung: [],
    loaiDa: [],
    loaiSanPham: [],
    giaTu: "",
    giaDen: "",
    sort: "ban-chay",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 20;

  // Sync filters with URL params
  useEffect(() => {
    const brand = searchParams.get("brand");
    const usage = searchParams.get("usage");
    const skinType = searchParams.get("skinType");
    const productType = searchParams.get("productType");

    setFilters((prev) => ({
      ...prev,
      brands: brand ? [brand] : [],
      congDung: usage ? [usage] : [],
      loaiDa: skinType ? [skinType] : [],
      loaiSanPham: productType ? [productType] : [],
    }));
    setCurrentPage(1);
  }, [searchParams]);

  const toggleFilter = (
    key: "brands" | "congDung" | "loaiDa" | "loaiSanPham",
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
    setCurrentPage(1);
  };

  const applyGia = () => setCurrentPage(1);

  const clearFilters = () => {
    setFilters({
      brands: [],
      congDung: [],
      loaiDa: [],
      loaiSanPham: [],
      giaTu: "",
      giaDen: "",
      sort: "ban-chay",
    });
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (filters.brands.length && !filters.brands.includes(product.brand))
        return false;
      if (filters.congDung.length && !filters.congDung.includes(product.category))
        return false;
      if (filters.loaiDa.length && !filters.loaiDa.some(type => product.skinType.includes(type)))
        return false;
      if (
        filters.loaiSanPham.length &&
        !filters.loaiSanPham.includes(product.category)
      )
        return false;
      if (filters.giaTu && product.price < parseInt(filters.giaTu)) return false;
      if (filters.giaDen && product.price > parseInt(filters.giaDen))
        return false;
      return true;
    });

    // Sort
    switch (filters.sort) {
      case "gia-thap":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "gia-cao":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "danh-gia":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "ban-chay":
      default:
        filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
    }

    return filtered;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const sortTabs = [
    { key: "ban-chay", label: "Bán chạy" },
    { key: "gia-thap", label: "Giá thấp" },
    { key: "gia-cao", label: "Giá cao" },
    { key: "danh-gia", label: "Đánh giá" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              Tất cả sản phẩm
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-4">
          {/* Sidebar – desktop only */}
          <div className="hidden w-[280px] flex-shrink-0 lg:block">
            <FilterSidebar
              filters={filters}
              toggleFilter={toggleFilter}
              setFilters={setFilters}
              applyGia={applyGia}
              onClearFilters={clearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header – 2 hàng trên mobile, 1 hàng từ sm */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#450920",
                    lineHeight: "35px",
                  }}
                  className="dark:!text-rose-300"
                >
                  Tất cả sản phẩm
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {filteredProducts.length} sản phẩm
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium lg:hidden dark:border-rose-400 dark:text-rose-300"
                  style={{ borderColor: "#DA627D", color: "#A53860" }}
                >
                  <Filter className="h-4 w-4" />
                  Lọc
                </button>

                {/* Sort buttons */}
                {sortTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, sort: tab.key }));
                      setCurrentPage(1);
                    }}
                    className="text-xs sm:text-sm transition-colors dark:!text-white"
                    style={{
                      padding: "6px 10px",
                      borderRadius: "8px",
                      fontFamily: '"Be Vietnam Pro", sans-serif',
                      fontWeight: filters.sort === tab.key ? 700 : 400,
                      color: filters.sort === tab.key ? "#FFFFFF" : "#000000",
                      backgroundColor:
                        filters.sort === tab.key ? "#A53860" : "transparent",
                      border:
                        filters.sort === tab.key
                          ? "0.5px solid #FFFFFF"
                          : "0.5px solid #000000",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid – 2 cột mobile, 3 tablet, 5 desktop */}
            {paginatedProducts.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: "#A53860" }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border disabled:opacity-50 dark:border-gray-600 dark:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors dark:border-gray-600 ${
                        currentPage === page
                          ? "border-rose-500 bg-rose-500 text-white"
                          : "hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border disabled:opacity-50 dark:border-gray-600 dark:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <div className="lg:hidden">
        <FilterSidebar
          filters={filters}
          toggleFilter={toggleFilter}
          setFilters={setFilters}
          applyGia={applyGia}
          onClearFilters={clearFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>
    </div>
  );
}