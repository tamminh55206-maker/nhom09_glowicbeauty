"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, ChevronRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getFeaturedProducts, products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { assetPath } from "@/lib/utils";
import { toast } from "sonner";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500 text-lg font-bold text-white">
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-rose-500 font-bold">:</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500 text-lg font-bold text-white">
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-rose-500 font-bold">:</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500 text-lg font-bold text-white">
          {formatNumber(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
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
            <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-1 text-xs font-medium text-white">
              Sắp hết hàng
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-rose-500">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3
            className="line-clamp-2 transition-colors hover:text-rose-500"
            style={{
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: "12px",
              fontWeight: 400,
              color: "#000000",
              lineHeight: "100%",
            }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-rose-600">
            {product.price.toLocaleString("vi-VN")}đ
          </span>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-500 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Banner Section
function BannerSection() {
  const [current, setCurrent] = useState(0);

  const images = [
    "/images/banner/banner-main.jpg",
    "/images/banner/banner-sub-1.jpg",
    "/images/banner/banner-sub-2.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="w-full">
      <div className="flex h-[500px] w-full gap-2">
        {/* Left Column - 60% Slideshow */}
        <div className="relative w-[60%] overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[current]}
                alt={`Banner ${current + 1}`}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="60vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === current ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column - 40% */}
        <div className="flex w-[40%] flex-col gap-2">
          <div className="relative flex-1 overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={(current + 1) % images.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[(current + 1) % images.length]}
                  alt="Banner right top"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={(current + 2) % images.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[(current + 2) % images.length]}
                  alt="Banner right bottom"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Flash Sale Section
function FlashSaleSection() {
  const flashSaleProducts = getFeaturedProducts(6);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full bg-[#FFA5AB] py-8"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Flash Sale</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Kết thúc sau:</span>
            </div>
            <CountdownTimer />
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-rose-500 hover:text-rose-600"
          >
            Xem tất cả →
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Products Section
function ProductsSection() {
  const featuredProducts = products.slice(0, 24);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full py-12"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Pill Title */}
        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
          <h2
            style={{
              fontFamily: '"Black Mango", serif',
              fontSize: "24px",
              fontWeight: 900,
              color: "#FFFFFF",
              backgroundColor: "#A53860",
              borderRadius: "24px",
              padding: "8px 32px",
              display: "inline-block",
            }}
          >
            Sản phẩm đề xuất
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div variants={fadeInUp} className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="rounded-full px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#450920" }}
          >
            Xem tất cả sản phẩm
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Categories Section
function CategoriesSection() {
  const categories = [
    {
      name: "Son môi",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
      count: 15,
    },
    {
      name: "Kem nền",
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
      count: 12,
    },
    {
      name: "Chăm sóc da",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
      count: 20,
    },
    {
      name: "Mắt",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
      count: 18,
    },
    {
      name: "Phấn má",
      image:
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&q=80",
      count: 8,
    },
    {
      name: "Chống nắng",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
      count: 10,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full bg-gradient-to-b from-[#F9DBBD] to-[#DA627D] py-12"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <motion.h2
            variants={fadeInUp}
            className="text-left text-2xl font-bold text-gray-900"
          >
            Danh mục quan tâm
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Link
              href="/products"
              className="inline-block rounded-full px-6 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: "#450920" }}
            >
              Xem tất cả →
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={fadeInUp}>
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-medium text-white">{category.name}</h3>
                    <p className="text-sm text-white/80">
                      {category.count} sản phẩm
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Brands Section
function BrandsSection() {
  const brands = [
    { name: "Carslan", image: "/images/brands/carslan.png" },
    { name: "Cocoon", image: "/images/brands/cocoon.png" },
    { name: "L'Oréal", image: "/images/brands/loreal.png" },
    { name: "Cerave", image: "/images/brands/cerave.png" },
    { name: "Maybelline", image: "/images/brands/maybelline.png" },
    { name: "Peripera", image: "/images/brands/peripera.png" },
    { name: "Romand", image: "/images/brands/romand.png" },
    { name: "3CE", displayName: "3CE" },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full py-12"
      style={{ backgroundColor: "#DA627D" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Header with title left and button right */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex items-center justify-between"
        >
          <h2
            style={{
              fontFamily: '"Black Mango", serif',
              fontSize: "28px",
              fontWeight: 900,
              color: "#F9DBBD",
            }}
          >
            Thương hiệu nổi bật
          </h2>
          <Link
            href="/products"
            style={{
              backgroundColor: "#450920",
              color: "#FFFFFF",
              borderRadius: "20px",
              padding: "6px 12px",
              fontSize: "14px",
              fontFamily: '"Be Vietnam Pro", sans-serif',
            }}
          >
            Xem tất cả →
          </Link>
        </motion.div>

        {/* Grid 4x2 */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6"
        >
          {brands.map((brand) => (
            <motion.div key={brand.name} variants={fadeInUp}>
              <Link
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center justify-center rounded-full bg-white px-6 py-3 transition-all hover:bg-white/90"
                style={{ borderRadius: "999px", padding: "12px 24px" }}
              >
                {brand.image ? (
                  <div className="relative h-8 w-full">
                    <Image
                      src={assetPath(brand.image)}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                    />
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-800">
                    {brand.displayName}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Glowic Features Section - "Bạn cần gì đó? Có Glowic đây"
function GlowicFeaturesSection() {
  const categories = [
    {
      name: "Son môi",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    },
    {
      name: "Kem nền",
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
    },
    {
      name: "Chăm sóc da",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    },
    {
      name: "Mắt",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    },
    {
      name: "Phấn má",
      image:
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&q=80",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full overflow-visible relative"
      style={{ backgroundColor: "#F9DBBD" }}
    >
      <div className="mx-auto flex min-h-[450px] w-full max-w-[1280px] items-center gap-4 px-6 py-10">
        {/* LEFT — ảnh model trái + chữ phải */}
        <div className="flex w-[60%] flex-row items-center gap-3">
          {/* Ảnh model */}
          <div className="relative flex-shrink-0" style={{ height: "420px" }}>
            <Image
              src="/images/model-skincare.png"
              alt="Model skincare"
              width={160}
              height={340}
              loading="eager"
              className="h-full w-auto object-contain rounded-t-2xl"
            />
          </div>

          {/* Chữ bên phải ảnh */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center"
          >
            <h2
              style={{
                fontFamily: '"Black Mango", serif',
                fontSize: "32px",
                fontWeight: 900,
                lineHeight: "110%",
                color: "#450920",
              }}
            >
              Bạn cần gì đó?
            </h2>
            <h3
              style={{
                fontFamily: '"Black Mango", serif',
                fontSize: "28px",
                fontWeight: 900,
                fontStyle: "italic",
                lineHeight: "110%",
                color: "#A53860",
              }}
            >
              Có Glowic lo
            </h3>
            <p
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                color: "#000000",
                marginTop: "16px",
                lineHeight: "150%",
              }}
            >
              Lựa chọn sản phẩm phù hợp với từng loại da
            </p>
            <p
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: "18px",
                fontWeight: 600,
                fontStyle: "italic",
                color: "#A53860",
                marginTop: "8px",
              }}
            >
              Thật dễ dàng!
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Grid 2x3 */}
        <motion.div
          variants={staggerContainer}
          className="flex w-[40%] items-center"
        >
          <div className="grid w-full grid-cols-3 gap-3">
            {categories.map((category) => (
              <motion.div key={category.name} variants={fadeInUp}>
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="13vw"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <span className="text-xs font-medium text-gray-900">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
            {/* Xem thêm */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/products"
                className="flex h-full min-h-[120px] items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md"
              >
                <span
                  className="text-center text-sm font-bold"
                  style={{ color: "#450920" }}
                >
                  Xem thêm →
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <BannerSection />
      <FlashSaleSection />
      <CategoriesSection />
      <GlowicFeaturesSection />
      <BrandsSection />
      <ProductsSection />
    </div>
  );
}
