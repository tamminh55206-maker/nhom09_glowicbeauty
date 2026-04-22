"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Minus,
  Plus,
  X,
  ChevronRight,
  Tag,
  Trash2,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

// Format price helper
const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + "đ";
};

// Mock discount codes
const DISCOUNT_CODES: Record<
  string,
  { type: "percent" | "fixed"; value: number }
> = {
  GLOWIC10: { type: "percent", value: 10 },
  BEAUTY20: { type: "percent", value: 20 },
  NEWUSER: { type: "fixed", value: 50000 },
};

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    amount: number;
  } | null>(null);

  // Calculate final price after discount
  const finalPrice = appliedDiscount
    ? Math.max(0, totalPrice - appliedDiscount.amount)
    : totalPrice;

  // Apply discount code
  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    const discount = DISCOUNT_CODES[code];

    if (!discount) {
      toast.error("Mã giảm giá không hợp lệ!");
      return;
    }

    let discountAmount = 0;
    if (discount.type === "percent") {
      discountAmount = (totalPrice * discount.value) / 100;
    } else {
      discountAmount = discount.value;
    }

    setAppliedDiscount({ code, amount: discountAmount });
    toast.success(`Đã áp dụng mã giảm giá ${code}!`);
  };

  // Remove discount
  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    toast.info("Đã xóa mã giảm giá");
  };

  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Empty cart view
  if (items.length === 0) {
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
              <span style={{ color: "#450920" }}>Giỏ hàng</span>
            </nav>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-16"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2
            className="mt-6 text-xl font-bold"
            style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
          >
            Giỏ hàng trống
          </h2>
          <p className="mt-2 text-gray-500">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link
            href="/products"
            className="mt-6 rounded-full px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C1475A" }}
          >
            Tiếp tục mua sắm
          </Link>
        </motion.div>
      </div>
    );
  }

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
            <span style={{ color: "#450920" }}>Giỏ hàng</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1
          className="mb-8 text-2xl font-bold text-center"
          style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
        >
          Giỏ hàng của bạn ({totalItems} sản phẩm)
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - Cart Items (60%) */}
          <div className="lg:col-span-3">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              {/* Table Header */}
              <div className="hidden grid-cols-12 gap-4 border-b pb-4 text-sm font-medium text-gray-500 md:grid">
                <div className="col-span-5">Sản phẩm</div>
               <div className="col-span-2 text-center text-black">Giá</div>
                <div className="col-span-3 text-center text-black">Số lượng</div>
                <div className="col-span-2 text-right text-black">Thành tiền</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    variants={fadeIn}
                    className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-12"
                  >
                    {/* Product Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs" style={{ color: "#DA627D" }}>
                          {item.product.brand}
                        </p>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="mt-1 line-clamp-2 text-sm font-medium hover:text-rose-500"
                          style={{ color: "#450920" }}
                        >
                          {item.product.name}
                        </Link>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center md:text-left">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#450920" }}
                      >
                        {formatPrice(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity - 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="flex h-8 w-12 items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity + 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Subtotal + Remove */}
                    <div className="col-span-2 flex items-center justify-end gap-4">
                      <span className="font-bold" style={{ color: "#A53860" }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => {
                          removeFromCart(item.product.id);
                          toast.info("Đã xóa sản phẩm khỏi giỏ hàng");
                        }}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cart Total */}
              <div className="mt-6 border-t pt-6 text-right">
                 <span
    className="block text-lg font-bold italic"
    style={{ color: "#450920" }}
  >
    Tổng giá trị giỏ hàng
  </span>
              <span
    className="block text-2xl font-bold mt-1"
    style={{ color: "#A53860" }}
  >
    {formatPrice(totalPrice)}
  </span>
                </div>
            </motion.div>
          </div>

          {/* Right Column - Discount + Summary (40%) */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Discount Code Box */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
               <h3
               className="text-center text-[18px] font-bold text-[#A53860]"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
>
                 Mã giảm giá
              </h3>
                <div className="flex gap-2">
                  <input
  type="text"
  placeholder="Nhập mã"
  value={discountCode}
  onChange={(e) => setDiscountCode(e.target.value)}
  className="flex-1 rounded-lg border px-4 py-2 text-sm italic outline-none focus:border-rose-300"
/>
                  <button
                    onClick={applyDiscount}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#C1475A" }}
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Applied Discount */}
                {appliedDiscount && (
                  <div className="mt-4 flex items-center justify-between rounded-lg bg-green-50 p-3">
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Mã: {appliedDiscount.code}
                      </p>
                      <p className="text-xs text-green-600">
                        Giảm: {formatPrice(appliedDiscount.amount)}
                      </p>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Order Summary Box */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
               <h3
               className="text-center text-[18px] font-bold text-[#A53860]"
              style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
>
                 Xem trước đơn hàng
              </h3>

                {/* Summary Items */}
                <div className="mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between py-2 text-sm"
                    >
                      <div className="flex-1 truncate pr-4">
                        <span
                          className="font-medium"
                          style={{ color: "#450920" }}
                        >
                          {item.product.name.split(" ").slice(0, 4).join(" ")}
                        </span>
                        <span className="text-gray-400"> x{item.quantity}</span>
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: "#A53860" }}
                      >
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-4 border-t"></div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tạm tính</span>
                    <span style={{ color: "#450920" }}>
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600">Giảm giá</span>
                      <span className="text-green-600">
                        -{formatPrice(appliedDiscount.amount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t pt-4">
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#450920" }}
                    >
                      Tổng
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#A53860" }}
                    >
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push("/checkout")}
                  className="mt-6 w-full rounded-full py-3 font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#C1475A" }}
                >
                  Thanh toán
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
