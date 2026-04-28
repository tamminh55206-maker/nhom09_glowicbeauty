"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getFeaturedProducts, products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { image } from "framer-motion/client";
import { assetPath } from "@/lib/utils";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

// ADDED
function scrollToSectionWithOffset(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = -150;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

// ─── Countdown Timer ───────────────────────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1">
      {/* Nhỏ hơn trên mobile, full size từ md */}
      {[fmt(timeLeft.hours), fmt(timeLeft.minutes), fmt(timeLeft.seconds)].map(
        (val, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-rose-500 text-sm md:text-lg font-bold text-white">
              {val}
            </span>
            {i < 2 && <span className="text-rose-500 font-bold">:</span>}
          </span>
        ),
      )}
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  showSalePrice = false,
}: {
  product: (typeof products)[0];
  showSalePrice?: boolean;
}) {
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
            <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-1 text-xs font-medium text-white">
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
          <div className="flex flex-col">
            {showSalePrice && (
              <span className="text-xs text-gray-400 line-through">
                {Math.round(product.price * 1.13).toLocaleString("vi-VN")}đ
              </span>
            )}
            <span
              style={{ fontSize: "14px", fontWeight: 600, color: "#A53860" }}
            >
              {product.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            suppressHydrationWarning
            className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-500 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


// ─── Banner Section ────────────────────────────────────────────────────────────
function BannerSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // xử lý hướng animation

  const images = [
    assetPath("/images/banner/banner-1.jpg"),
    assetPath("/images/banner/banner-2.png"),
    assetPath("/images/banner/banner-3.jpg"),
    assetPath("/images/banner/banner-4.jpg"),
    assetPath("/images/banner/banner-5.png"),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1); // auto slide theo chiều next
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full">
      <div className="relative h-[220px] sm:h-[350px] md:h-[530px] w-full overflow-hidden bg-white-100 dark:bg-gray-800">

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`Banner ${current + 1}`}
              fill
              className="object-contain"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev */}
        <button
          onClick={() => {
            setDirection(-1);
            setCurrent((prev) => (prev - 1 + images.length) % images.length);
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10
                     flex h-12 w-12 md:h-14 md:w-14
                     items-center justify-center
                     rounded-full bg-white/80 text-gray-800
                     hover:bg-white transition-all
                     text-3xl md:text-4xl font-bold shadow-md"
          aria-label="Previous banner"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % images.length);
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10
                     flex h-12 w-12 md:h-14 md:w-14
                     items-center justify-center
                     rounded-full bg-white/80 text-gray-800
                     hover:bg-white transition-all
                     text-3xl md:text-4xl font-bold shadow-md"
          aria-label="Next banner"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── Flash Sale Section ────────────────────────────────────────────────────────
function FlashSaleSection() {
  const flashSaleProducts = getFeaturedProducts(6);

  return (
    <motion.section
      id="flash-sale"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full bg-[#FFA5AB] dark:bg-[#7a2840] py-8"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
        {/* Header: stack dọc trên mobile, hàng ngang từ sm */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Flash Sale
            </h2>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4" />
              <span>Kết thúc sau:</span>
            </div>
            <CountdownTimer />
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {flashSaleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showSalePrice={true}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Products Section ──────────────────────────────────────────────────────────
function ProductsSection() {
  const featuredProducts = products.slice(0, 24);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full py-10 md:py-12 dark:bg-gray-900"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-12">
        <motion.div
          variants={fadeInUp}
          className="mb-6 md:mb-8 flex justify-center"
        >
          <h2
            style={{
              fontFamily: '"Black Mango", serif',
              fontSize: "clamp(18px, 3vw, 24px)",
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
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

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

// ─── Categories Section ────────────────────────────────────────────────────────
function CategoriesSection() {
  const categories = [
    { name: "Son bóng", image: assetPath("/images/danhmuc/son.png"), count: 6 },
    {
      name: "Kem nền",
      image: assetPath("/images/danhmuc/kem-nen.png"),
      count: 3,
    },
    {
      name: "Kem dưỡng",
      image: assetPath("/images/danhmuc/duong-da.png"),
      count: 4,
    },
    { name: "Mascara", image: assetPath("/images/danhmuc/mat.png"), count: 5 },
    { name: "Má hồng", image: assetPath("/images/danhmuc/ma.png"), count: 6 },
    {
      name: "Serum",
      image: assetPath("/images/danhmuc/kem-lot.png"),
      count: 5,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full bg-gradient-to-b from-[#F9DBBD] to-[#DA627D] dark:from-[#3d1520] dark:to-[#5c1e35] py-10 md:py-12"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-12">
        <div className="mb-6 md:mb-8 flex flex-wrap items-center justify-between gap-3">
          <motion.h2
            variants={fadeInUp}
            style={{
              fontFamily: '"Black Mango", serif',
              fontWeight: 900,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "#450920",
            }}
            className="dark:!text-rose-200"
          >
            Danh mục quan tâm
          </motion.h2>

          <motion.div variants={fadeInUp}>
            <Link
              href="/products"
              className="inline-block rounded-full px-5 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: "#450920" }}
            >
              Xem tất cả →
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={fadeInUp}>
              {/* sửa giống cơ chế skinType */}
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

                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                    <h3
                      style={{
                        fontFamily: '"Black Mango", serif',
                        fontWeight: 700,
                        fontSize: "clamp(13px, 1.5vw, 18px)",
                        lineHeight: "120%",
                        color: "white",
                      }}
                    >
                      {category.name}
                    </h3>

                    <p className="text-xs md:text-sm text-white/80">
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

// ─── Brands Section ────────────────────────────────────────────────────────────
function BrandsSection() {
  const brands = [
    { name: "Carslan", image: assetPath("/images/brands/carslan.png") },
    { name: "Cocoon", image: assetPath("/images/brands/cocoon.png") },
    { name: "L'Oréal", image: assetPath("/images/brands/loreal.png") },
    { name: "Cerave", image: assetPath("/images/brands/cerave.png") },
    { name: "Maybelline", image: assetPath("/images/brands/maybelline.png") },
    { name: "Peripera", image: assetPath("/images/brands/peripera.png") },
    { name: "Romand", image: assetPath("/images/brands/romand.png") },
    { name: "3CE", image: assetPath("/images/brands/3ce.png") },
  ];

  return (
    <motion.section
      id="featured-brands"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full py-10 md:py-12"
      style={{ backgroundColor: "#DA627D" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-12">
        <motion.div
          variants={fadeInUp}
          className="mb-6 md:mb-8 flex items-center justify-between"
        >
          <h2
            style={{
              fontFamily: '"Black Mango", serif',
              fontSize: "clamp(20px, 3vw, 28px)",
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

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-6"
        >
          {brands.map((brand) => (
            <motion.div key={brand.name} variants={fadeInUp}>
              <Link
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center justify-center rounded-full bg-white px-4 py-3 transition-all hover:bg-white/90"
                style={{ borderRadius: "999px" }}
              >
                {brand.image ? (
                  <div className="relative h-7 md:h-8 w-full">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <span className="text-base md:text-lg font-bold text-gray-800">
                    {brand.name}
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

function GlowicFeaturesSection() {
  const skinCategories = [
    { name: "Da thường", image: assetPath("/images/skin/da-thuong.png") },
    { name: "Da khô", image: assetPath("/images/skin/da-kho.png") },
    { name: "Da dầu", image: assetPath("/images/skin/da-dau.png") },
    { name: "Da nhạy cảm", image: assetPath("/images/skin/da-nhay-cam.png") },
    { name: "Da hỗn hợp", image: assetPath("/images/skin/da-hon-hop.png") },
  ];

  // Helper cho mỗi ô chọn loại da
  const SkinCard = ({
    cat,
  }: {
    cat: { name: string; image: string };
  }) => (
    <Link
      href={`/products?skinType=${encodeURIComponent(cat.name)}`}
      className="block"
    >
      <div
        className="relative w-[185px] h-[185px] bg-white 
                   border border-black/10 
                   shadow-[0px_4px_4px_rgba(165,56,96,0.75)] 
                   rounded-xl overflow-hidden"
      >
        <Image
          src={cat.image}
          alt={cat.name}
          width={130}
          height={130}
          className="absolute top-[7px] left-[27px] object-contain"
        />

        {/* Overlay tên */}
        <div
          className="absolute bottom-0 left-0 w-full 
                     text-black text-center py-2"
        >
          <span
            className="text-[20px]"
            style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
          >
            {cat.name}
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <motion.section
      className="w-full relative overflow-hidden h-min-[600px]"
      style={{
        background: "linear-gradient(0deg, #F9DBBD -9.31%, #FFFFFF 96.81%)",
      }}
    >
      {/* 1. LỚP NỀN: Ảnh model */}
      <div className="relative mx-auto max-w-[1280px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">

          {/* LEFT: Banner */}
          <div className="col-span-1 md:col-span-6 relative h-full min-h-[600px]">
            <Image
              src={assetPath("/images/model-banner.png")}
              alt="Banner"
              fill
              className="object-contain object-left scale-110"
              priority
            />
          </div>

          {/* RIGHT: Grid sản phẩm */}
          <div className="col-span-1 md:col-span-6 flex items-center justify-center p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skinCategories.map((cat) => (
                <SkinCard key={cat.name} cat={cat} />
              ))}

              {/* Ô Xem thêm */}
              <Link
                href="/quiz"
                className="flex flex-col items-center justify-center w-[185px] h-[185px] bg-white borderborder border-black/10 
                   shadow-[0px_4px_4px_rgba(165,56,96,0.75)] 
                   rounded-xl overflow-hidden"
              >
                <span
                  className="text-[20px] font-bold text-black w-[120px] text-center"
                  style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  Xác định loại da
                </span>
                <ArrowRight className="mt-2" size={24} color="black" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  // ADDED
  useEffect(() => {
    const scrollToHashSection = () => {
      if (!window.location.hash) {
        return;
      }

      const id = window.location.hash.replace("#", "");

      // UPDATED
      window.setTimeout(() => {
        scrollToSectionWithOffset(id);
      }, 100);
    };

    scrollToHashSection();
    window.addEventListener("hashchange", scrollToHashSection);

    return () => {
      window.removeEventListener("hashchange", scrollToHashSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 space-y-[45px]">
      <BannerSection />
      <FlashSaleSection />
      <CategoriesSection />
      <GlowicFeaturesSection />
      <BrandsSection />
      <ProductsSection />
    </div>
  );
}
