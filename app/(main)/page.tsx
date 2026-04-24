"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ChevronRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getFeaturedProducts, products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
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
            <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-1 text-xs font-medium text-white">
              Sắp hết hàng
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-rose-500">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-rose-500">
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
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="relative w-full overflow-hidden bg-gradient-to-r from-cyan-100 via-pink-50 to-amber-50"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12 md:px-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.span
              variants={fadeInUp}
              className="inline-block rounded-full bg-rose-500 px-4 py-1.5 text-sm font-medium text-white"
            >
              Khuyến mãi mùa hè
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Giảm đến <span className="text-rose-500">15% OFF</span>
              <br />
              cho đơn hàng đầu tiên
            </motion.h1>
            <motion.p variants={fadeInUp} className="max-w-lg text-gray-600">
              Khám phá bộ sưu tập mỹ phẩm cao cấp từ các thương hiệu hàng đầu.
              Ưu đãi có hạn, đặt hàng ngay hôm nay!
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-600"
              >
                Mua ngay
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="relative hidden lg:block">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
                alt="Beauty products"
                fill
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
    </motion.section>
  );
}

// Flash Sale Section
function FlashSaleSection() {
  const flashSaleProducts = getFeaturedProducts(4);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full bg-rose-50 py-12"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
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
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6"
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
            className="inline-block rounded-full px-8 py-3 text-xl font-bold text-white sm:text-2xl"
            style={{ backgroundColor: "#450920" }}
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
      className="w-full bg-gray-50 py-12"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        <motion.h2
          variants={fadeInUp}
          className="mb-8 text-center text-2xl font-bold text-gray-900"
        >
          Danh mục quan tâm
        </motion.h2>

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
                <div className="relative aspect-square overflow-hidden rounded-2xl">
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
      style={{ backgroundColor: "#7D3554" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Header with title left and button right */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-white">Thương hiệu nổi bật</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-white hover:text-white/80"
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
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
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
      className="w-full py-16"
      style={{ backgroundColor: "#F5E6D3" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - 40% */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <h2
              className="text-4xl font-bold sm:text-5xl"
              style={{ fontFamily: '"Black Mango", serif', color: "#450920" }}
            >
              Bạn cần gì đó?
            </h2>
            <h3
              className="mt-2 text-3xl sm:text-4xl"
              style={{ fontFamily: '"Mistesy", cursive', color: "#C4526E" }}
            >
              Có Glowic đây
            </h3>
            <p className="mt-4 text-lg text-gray-800">
              Lựa chọn sản phẩm phù hợp với từng loại da
            </p>
            <p
              className="mt-2 text-xl font-bold"
              style={{ fontFamily: '"Black Mango", serif', color: "#C4526E" }}
            >
              Thật dễ dàng!
            </p>
          </motion.div>

          {/* Right Column - 60% - Grid 3x2 */}
          <motion.div variants={staggerContainer} className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {categories.map((category) => (
                <motion.div key={category.name} variants={fadeInUp}>
                  <Link
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {/* View More Card */}
              <motion.div variants={fadeInUp}>
                <Link
                  href="/products"
                  className="flex h-full min-h-[120px] items-center justify-center rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Xem thêm →
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
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
