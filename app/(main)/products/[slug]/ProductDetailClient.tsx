"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Minus, Plus, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import type { Product } from "@/lib/types";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

// ─── Product Card (related products) ──────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      variants={fadeIn}
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
            sizes="(max-width: 768px) 50vw, 16vw"
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
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#DA627D" }}>
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3
            className="line-clamp-2 transition-colors hover:text-rose-500 dark:text-white"
            style={{
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "100%",
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
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#A53860" }}>
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

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      window.location.href = "/cart";
    }, 100);
  };

  const sampleReviews = [
    {
      id: 1,
      name: "Nguyễn Thị A",
      rating: 5,
      comment: "Sản phẩm rất tốt, đóng gói cẩn thận!",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Trần Văn B",
      rating: 4,
      comment: "Chất lượng ổn, giao hàng nhanh.",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Lê Thị C",
      rating: 5,
      comment: "Mình rất thích, sẽ mua lại!",
      date: "2024-01-05",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Sản phẩm
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1 text-gray-500 dark:text-gray-400">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        {/* Product Main Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12"
        >
          {/* ── Left: Images ── */}
          <div className="lg:col-span-5">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? "border-rose-500"
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="lg:col-span-7">
            {/* Brand */}
            <p
              className="dark:!text-gray-200"
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: "clamp(16px, 2.5vw, 22px)",
                fontWeight: 600,
                color: "#000000",
              }}
            >
              {product.brand}
            </p>

            {/* Product Name */}
            <h1
              className="mt-1 dark:!text-white"
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: "clamp(18px, 3vw, 26px)",
                fontWeight: 600,
                color: "#000000",
                lineHeight: "130%",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.rating}
              </span>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.rating > 4 ? 328 : product.rating > 3.5 ? 256 : 189}{" "}
                đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <span
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "clamp(24px, 4vw, 32px)",
                  fontWeight: 600,
                  color: "#A53860",
                }}
              >
                {product.price.toLocaleString("vi-VN")}đ
              </span>
            </div>

            {/* Stock */}
            <p className="mt-3 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Tình trạng:
              </span>{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {product.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng"}
              </span>
            </p>

            {/* Quantity */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Số lượng:
              </span>
              <div className="flex items-center rounded-lg border dark:border-gray-600">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center font-medium dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons – font nhỏ hơn trên mobile */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 py-3 disabled:opacity-50 dark:!bg-gray-700 dark:!text-white"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "0.9px solid rgba(0,0,0,0.25)",
                  boxShadow: "0px 3.6px 3.6px rgba(0,0,0,0.25)",
                  borderRadius: "4.5px",
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "clamp(15px, 2.5vw, 25.2px)",
                  fontWeight: 400,
                  color: "#000000",
                }}
              >
                <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                Thêm vào giỏ
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 py-3 disabled:opacity-50"
                style={{
                  backgroundColor: "#A53860",
                  border: "0.9px solid rgba(0,0,0,0.25)",
                  boxShadow: "0px 3.6px 3.6px rgba(0,0,0,0.25)",
                  borderRadius: "4.5px",
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "clamp(15px, 2.5vw, 25.2px)",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="mt-10 md:mt-12 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex">
            {(["description", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 md:px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
                style={{
                  borderColor: activeTab === tab ? "#DA627D" : "transparent",
                  color: activeTab === tab ? "#DA627D" : undefined,
                }}
              >
                {tab === "description" ? "Mô tả sản phẩm" : "Đánh giá"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="mx-auto max-w-7xl py-6 md:py-8">
          {activeTab === "description" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose max-w-none dark:prose-invert"
            >
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-6">
                <h3
                  className="text-lg font-bold dark:!text-rose-300"
                  style={{ color: "#DA627D" }}
                >
                  Thông tin sản phẩm
                </h3>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Thương hiệu:</strong> {product.brand}
                  </li>
                  <li>
                    <strong>Danh mục:</strong> {product.category}
                  </li>
                  <li>
                    <strong>Phù hợp với:</strong> {product.skinType.join(", ")}
                  </li>
                  <li>
                    <strong>Tồn kho:</strong> {product.stock} sản phẩm
                  </li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Rating Summary */}
              <div className="flex items-center gap-4 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
                <div className="text-center">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: "#450920" }}
                  >
                    {product.rating}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {sampleReviews.length} đánh giá
                  </p>
                </div>
              </div>

              {/* Reviews */}
              {sampleReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b dark:border-gray-700 pb-4"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-medium" style={{ color: "#450920" }}>
                      {review.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 md:mt-12">
            <h2
              className="mb-4 md:mb-6 dark:!text-white"
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: "17.61px",
                fontWeight: 600,
                color: "#000000",
              }}
            >
              Gợi ý sản phẩm liên quan
            </h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
