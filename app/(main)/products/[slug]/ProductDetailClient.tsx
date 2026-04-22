"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Minus, Plus, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

// Product Card Component for related products
function ProductCard({
  product,
}: {
  product: Product;
}) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      variants={fadeIn}
      className="group relative rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
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
            {formatPrice(product.price)}
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

// Main Product Detail Page
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
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to cart
    setTimeout(() => {
      window.location.href = "/cart";
    }, 100);
  };

  // Sample reviews
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-700"
            >
              Sản phẩm
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span
              style={{ color: "#450920" }}
              className="truncate max-w-[200px]"
            >
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Product Main Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* Left Column - Images (45%) */}
          <div className="lg:col-span-5">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
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
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? "border-rose-500"
                      : "border-transparent hover:border-gray-300"
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

          {/* Right Column - Product Info (55%) */}
          <div className="lg:col-span-7">
            {/* Brand */}
            <p className="text-sm font-medium" style={{ color: "#DA627D" }}>
              {product.brand}
            </p>

            {/* Product Name */}
            <h1
              className="mt-2 text-2xl font-bold leading-tight sm:text-3xl"
              style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} (
                {product.rating > 4 ? 328 : product.rating > 3.5 ? 256 : 188}{" "}
                đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold" style={{ color: "#450920" }}>
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Info */}
            <p className="mt-4 text-sm">
              <span className="text-gray-500">Tình trạng:</span>{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {product.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng"}
              </span>
            </p>

            {/* Skin Types */}
            <div className="mt-4">
              <span className="text-sm text-gray-500">Phù hợp với:</span>{" "}
              <span className="text-sm text-gray-700">
                {product.skinType.join(", ")}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Số lượng:
              </span>
              <div className="flex items-center rounded-lg border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#450920" }}
              >
                <ShoppingCart className="h-5 w-5" />
                Thêm vào giỏ
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                style={{ borderColor: "#450920", color: "#450920" }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div className="mt-12 border-b bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "description"
                    ? "border-b-2"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                style={{
                  borderColor:
                    activeTab === "description" ? "#450920" : "transparent",
                  color: activeTab === "description" ? "#450920" : undefined,
                }}
              >
                Mô tả sản phẩm
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "reviews"
                    ? "border-b-2"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                style={{
                  borderColor:
                    activeTab === "reviews" ? "#450920" : "transparent",
                  color: activeTab === "reviews" ? "#450920" : undefined,
                }}
              >
                Đánh giá
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mx-auto max-w-7xl py-8">
          {activeTab === "description" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose max-w-none"
            >
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-bold" style={{ color: "#450920" }}>
                  Thông tin sản phẩm
                </h3>
                <ul className="mt-3 space-y-2 text-gray-600">
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
              <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                <div className="text-center">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: "#450920" }}
                  >
                    {product.rating}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {sampleReviews.length} đánh giá
                  </p>
                </div>
              </div>

              {/* Reviews List */}
              {sampleReviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium" style={{ color: "#450920" }}>
                      {review.name}
                    </span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2
              className="mb-6 text-xl font-bold"
              style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
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
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            >
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
