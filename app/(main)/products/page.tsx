"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
} as const;

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
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
        <p className="text-xs font-medium" style={{ color: "#A53860" }}>
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3
            className="line-clamp-2 text-sm font-medium transition-colors hover:text-rose-500"
            style={{ color: "#450920" }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold" style={{ color: "#A53860" }}>
            {product.price.toLocaleString("vi-VN")}đ
          </span>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#DA627D" }}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Filter type definition
type Filters = {
  brands: string[];
  congDung: string[];
  loaiDa: string[];
  loaiSanPham: string[];
  giaTu: string;
  giaDen: string;
  sort: string;
};

// Filter Sidebar Component
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
  setFilters: (filters: React.SetStateAction<Filters>) => void;
  applyGia: () => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const brands = [
    "Maybelline",
    "Carslan",
    "Cocoon",
    "L'Oréal",
    "Peripera",
    "Romand",
    "Cerave",
    "3CE",
  ];

  const skinTypes = [
    "Da dầu",
    "Da khô",
    "Da hỗn hợp",
    "Da nhạy cảm",
    "Da thường",
  ];

  const benefits = ["Trang điểm", "Chăm sóc da"];

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[280px] flex-shrink-0 overflow-y-auto bg-white p-6 shadow-lg transition-transform lg:static lg:z-auto lg:w-[280px] lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Header */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-bold" style={{ color: "#450920" }}>
            Bộ lọc
          </h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Price Range - FIRST */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold" style={{ color: "#450920" }}>
            Khoảng giá
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Từ"
              value={filters.giaTu}
              onChange={(e) =>
                setFilters((prev: typeof filters) => ({
                  ...prev,
                  giaTu: e.target.value,
                }))
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Đến"
              value={filters.giaDen}
              onChange={(e) =>
                setFilters((prev: typeof filters) => ({
                  ...prev,
                  giaDen: e.target.value,
                }))
              }
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={applyGia}
            className="mt-3 w-full rounded-lg py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#C1475A" }}
          >
            Áp dụng
          </button>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold" style={{ color: "#450920" }}>
            Thương hiệu
          </h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleFilter("brands", brand)}
                  className="h-4 w-4 rounded border-gray-300"
                  style={{ accentColor: "#A53860" }}
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Benefits Filter */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold" style={{ color: "#450920" }}>
            Công dụng
          </h3>
          <div className="space-y-2">
            {benefits.map((benefit) => (
              <label key={benefit} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.congDung.includes(benefit)}
                  onChange={() => toggleFilter("congDung", benefit)}
                  className="h-4 w-4 rounded border-gray-300"
                  style={{ accentColor: "#A53860" }}
                />
                <span className="text-sm text-gray-700">{benefit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Skin Type Filter */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold" style={{ color: "#450920" }}>
            Loại da
          </h3>
          <div className="space-y-2">
            {skinTypes.map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.loaiDa.includes(type)}
                  onChange={() => toggleFilter("loaiDa", type)}
                  className="h-4 w-4 rounded border-gray-300"
                  style={{ accentColor: "#A53860" }}
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Category Filter */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold" style={{ color: "#450920" }}>
            Loại sản phẩm
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.loaiSanPham.includes(category)}
                  onChange={() => toggleFilter("loaiSanPham", category)}
                  className="h-4 w-4 rounded border-gray-300"
                  style={{ accentColor: "#A53860" }}
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="w-full rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
          style={{ borderColor: "#DA627D", color: "#A53860" }}
        >
          Xóa bộ lọc
        </button>
      </aside>
    </>
  );
}

// Category mappings for "Công dụng" filter
const trangDiemCategories = [
  "Son kem",
  "Son bóng",
  "Son thỏi",
  "Son dưỡng",
  "Mascara",
  "Phấn phủ",
  "Phấn mắt",
  "Má hồng",
  "Eyeliner",
  "Chì kẻ mày",
  "Kem nền",
  "Che khuyết điểm",
  "Kem lót",
  "Xịt khóa",
  "Tạo khối",
];

const chamSocDaCategories = [
  "Serum",
  "Kem dưỡng",
  "Sữa rửa mặt",
  "Toner",
  "Kem chống nắng",
  "Nước tẩy trang",
  "Gel giảm mụn",
  "Dưỡng ẩm",
];

// Skin type mapping for filter normalization
const loaiDaMap: Record<string, string[]> = {
  "Da dầu": ["Dầu", "Da dầu"],
  "Da khô": ["Khô", "Da khô"],
  "Da hỗn hợp": ["Hỗn hợp", "Da hỗn hợp"],
  "Da nhạy cảm": ["Nhạy cảm", "Da nhạy cảm"],
  "Da thường": ["Thường", "Da thường"],
};

// Main Products Page
export default function ProductsPage() {
  const [filters, setFilters] = useState({
    brands: [] as string[],
    congDung: [] as string[],
    loaiDa: [] as string[],
    loaiSanPham: [] as string[],
    giaTu: "",
    giaDen: "",
    sort: "ban-chay",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 20;

  // Unified checkbox handler
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

  // Apply price filter
  const applyGia = () => {
    setCurrentPage(1);
  };

  // Clear all filters
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
    let result = [...products];

    // 1. Filter by brand
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // 2. Filter by skin type with normalization
    if (filters.loaiDa.length > 0) {
      result = result.filter((p) => {
        // If product is for all skin types, always show
        if (p.skinType.includes("Tất cả loại da")) return true;
        // Check each selected skin type
        return filters.loaiDa.some((da) => {
          const variants = loaiDaMap[da] || [da];
          return variants.some((v) => p.skinType.includes(v));
        });
      });
    }

    // 3. Filter by product category
    if (filters.loaiSanPham.length > 0) {
      result = result.filter((p) => filters.loaiSanPham.includes(p.category));
    }

    // 4. Filter by "Công dụng"
    if (filters.congDung.includes("Trang điểm")) {
      result = result.filter((p) => trangDiemCategories.includes(p.category));
    }
    if (filters.congDung.includes("Chăm sóc da")) {
      result = result.filter((p) => chamSocDaCategories.includes(p.category));
    }

    // 5. Filter by price range
    if (filters.giaTu !== "") {
      result = result.filter((p) => p.price >= Number(filters.giaTu));
    }
    if (filters.giaDen !== "") {
      result = result.filter((p) => p.price <= Number(filters.giaDen));
    }

    // 6. Sort
    if (filters.sort === "gia-tang") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "gia-giam") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // ban-chay: sort by rating descending
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span style={{ color: "#450920" }}>Tất cả sản phẩm</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-4">
          {/* Sidebar */}
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
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{
                    color: "#450920",
                    fontFamily: '"Black Mango", serif',
                  }}
                >
                  Tất cả sản phẩm
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredProducts.length} sản phẩm
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium lg:hidden"
                  style={{ borderColor: "#DA627D", color: "#A53860" }}
                >
                  <Filter className="h-4 w-4" />
                  Lọc
                </button>

                {/* Sort Buttons */}
                {[
                  { key: "ban-chay", label: "Bán chạy" },
                  { key: "gia-tang", label: "Giá tăng dần" },
                  { key: "gia-giam", label: "Giá giảm dần" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, sort: tab.key }));
                      setCurrentPage(1);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      filters.sort === tab.key
                        ? "text-white"
                        : "border text-gray-600 hover:text-gray-900"
                    }`}
                    style={{
                      backgroundColor:
                        filters.sort === tab.key ? "#C1475A" : "transparent",
                      borderColor:
                        filters.sort === tab.key ? "#C1475A" : "#e5e7eb",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 lg:grid-cols-5"
                style={{ gap: "16px" }}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
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
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                        currentPage === page
                          ? "text-white"
                          : "border hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor:
                          currentPage === page ? "#A53860" : "transparent",
                      }}
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg border disabled:opacity-50"
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
