"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  Truck,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { AppliedDiscount } from "@/lib/types";
import { toast } from "sonner";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
} as const;

// Format price helper
const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + "đ";
};

// Checkout schema
const checkoutSchema = z.object({
  hoTen: z.string().min(2, "Vui lòng nhập họ tên"),
  soDienThoai: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  tinhThanhPho: z.string().min(1, "Vui lòng chọn tỉnh/thành"),
  quanHuyen: z.string().min(1, "Vui lòng nhập quận/huyện"),
  phuongXa: z.string().min(1, "Vui lòng nhập phường/xã"),
  diaChiCuThe: z.string().min(5, "Vui lòng nhập địa chỉ"),
  ghiNho: z.boolean().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

// Payment methods
const paymentMethods = [
  {
    id: "momo",
    name: "Thanh toán bằng MoMo",
    icon: Smartphone,
    color: "#D82D8B",
  },
  {
    id: "shopeepay",
    name: "Thanh toán bằng Shopee Pay",
    icon: Wallet,
    color: "#EE4D2D",
  },
  {
    id: "vnpay",
    name: "Thanh toán bằng VNPay",
    icon: CreditCard,
    color: "#0056A7",
  },
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    icon: Banknote,
    color: "#450920",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ghiNho: false,
    },
  });

  // Calculate shipping
  const shippingFee = 20000;

  // Calculate final total
  const finalTotal = totalPrice + shippingFee - (appliedDiscount?.amount || 0);

  // Handle form submission
  const onSubmit = async (data: CheckoutForm) => {
    // Validate cart not empty
    if (items.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    // Mock order success
    toast.success("Đặt hàng thành công! 🎉");
    clearCart();
    router.push("/");
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
              <Link href="/cart" className="text-gray-500 hover:text-gray-700">
                Giỏ hàng
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span style={{ color: "#450920" }}>Thanh toán</span>
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
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2
            className="mt-6 text-xl font-bold"
            style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
          >
            Giỏ hàng trống
          </h2>
          <p className="mt-2 text-gray-500">
            Bạn cần thêm sản phẩm vào giỏ hàng để thanh toán
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
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              Giỏ hàng
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span style={{ color: "#450920" }}>Thanh toán</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1
          className="mb-8 text-2xl font-bold text-center"
          style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
        >
          Thanh toán
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Left Column - Shipping Info + Order (60%) */}
            <div className="lg:col-span-3">
              {/* Shipping Info Box */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-6 rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2
                  className="mb-6 text-lg font-bold"
                  style={{ color: "#A53860", fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  Thông tin giao hàng
                </h2>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 ">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      {...register("hoTen")}
                      className="w-full rounded-lg border px-4 py-2 outline-none focus:border-rose-300 hover: shadow-lg"
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.hoTen && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.hoTen.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      {...register("soDienThoai")}
                      className="w-full rounded-lg border px-4 py-2 outline-none focus:border-rose-300 hover: shadow-lg"
                      placeholder="0123456789"
                    />
                    {errors.soDienThoai && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.soDienThoai.message}
                      </p>
                    )}
                  </div>

                  {/* Address Row - 3 columns */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Tỉnh/Thành phố *
                      </label>
                      <input
                        type="text"
                        {...register("tinhThanhPho")}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-rose-300 hover: shadow-lg"
                        placeholder="TP. Hồ Chí Minh"
                      />
                      {errors.tinhThanhPho && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.tinhThanhPho.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Quận/Huyện *
                      </label>
                      <input
                        type="text"
                        {...register("quanHuyen")}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-rose-300 hover: shadow-lg"
                        placeholder="Quận 1"
                      />
                      {errors.quanHuyen && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.quanHuyen.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Phường/Xã *
                      </label>
                      <input
                        type="text"
                        {...register("phuongXa")}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-rose-300 hover: shadow-lg"
                        placeholder="Phường Bến Nghé"
                      />
                      {errors.phuongXa && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phuongXa.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Detailed Address */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Tên đường, tòa nhà, số nhà *
                    </label>
                    <input
                      type="text"
                      {...register("diaChiCuThe")}
                      className="w-full rounded-lg border px-4 py-2 outline-none focus:border-rose-300 hover: shadow-lg"
                      placeholder="123 Nguyễn Huệ, Tòa nhà ABC"
                    />
                    {errors.diaChiCuThe && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.diaChiCuThe.message}
                      </p>
                    )}
                  </div>

                  {/* Remember checkbox */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="ghiNho"
                      {...register("ghiNho")}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="ghiNho" className="text-sm text-gray-600">
                      Ghi nhớ thông tin của tôi
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Order Items Box */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2
                  className="mb-6 text-lg font-bold"
                  style={{ color: "#A53860", fontFamily: '"Be Vietnam Pro", sans-serif' }}
                >
                  Đơn hàng 
                </h2>

                {/* Table Header */}
                <div className="hidden grid-cols-12 gap-4 border-b pb-3 text-sm font-medium text-gray-500 md:grid">
                  <div className="col-span-5">Sản phẩm</div>
                  <div className="col-span-2 text-center">Giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-3 text-right">Thành tiền</div>
                </div>

                {/* Items */}
                <div className="divide-y">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-12"
                    >
                      {/* Product */}
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="line-clamp-2 text-sm font-medium"
                            style={{ color: "#450920" }}
                          >
                            {item.product.name}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center text-sm">
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 text-center text-sm">
                        {item.quantity}
                      </div>

                      {/* Subtotal */}
                      <div
                        className="col-span-3 text-right font-medium"
                        style={{ color: "#A53860" }}
                      >
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Payment + Total (40%) */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Payment Methods */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2
                    className="mb-4 text-lg font-bold"
                    style={{ color: "#A53860", fontFamily: '"Be Vietnam Pro", sans-serif' }}
                  >
                    Phương thức thanh toán
                  </h2>

                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 hover:shadow-md ${
                            selectedPayment === method.id
                              ? "border-2"
                              : "hover:bg-gray-50"
                          }`}
                          style={{
                            borderColor:
                              selectedPayment === method.id
                                ? "#C1475A"
                                : undefined,
                          }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={() => setSelectedPayment(method.id)}
                            className="h-4 w-4"
                          />
                          <Icon
                            className="h-5 w-5"
                            style={{ color: method.color }}
                          />
                          <span className="flex-1 text-sm font-medium">
                            {method.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2
                    className="mb-4 text-lg font-bold"
                    style={{ color: "#A53860", fontFamily: '"Be Vietnam Pro", sans-serif' }}
                  >
                    Tổng tiền hàng
                  </h2>

                  <div className="space-y-3">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tổng tiền hàng</span>
                      <span style={{ color: "#450920" }}>
                        {formatPrice(totalPrice)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Truck className="h-4 w-4" />
                        Phí vận chuyển
                      </span>
                      <span style={{ color: "#450920" }}>
                        {formatPrice(shippingFee)}
                      </span>
                    </div>

                    {/* Discount */}
                    {appliedDiscount && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Tag className="h-4 w-4" />
                          Giảm giá
                        </span>
                        <span className="text-green-600">
                          -{formatPrice(appliedDiscount.amount)}
                        </span>
                      </div>
                    )}

                    {/* Free shipping note */}
                    {totalPrice < 500000 && (
                      <p className="text-xs text-gray-500">
                        Mua thêm {formatPrice(500000 - totalPrice)} để được miễn
                        phí vận chuyển
                      </p>
                    )}

                    {/* Divider */}
                    <div className="my-4 border-t"></div>

                    {/* Final Total */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-lg font-bold"
                        style={{ color: "#450920" }}
                      >
                        Tổng thanh toán
                      </span>
                      <span
                        className="text-xl font-bold"
                        style={{ color: "#A53860" }}
                      >
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Terms */}
                  <p className="mt-4 text-xs text-gray-500">
                    Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo&nbsp;
                    <Link href="#" className="underline hover:text-rose-500">
                      Điều khoản Glowic
                    </Link>
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-full py-3 font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#C1475A" }}
                  >
                    Đặt hàng
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
