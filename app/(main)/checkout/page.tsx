"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  Banknote,
  ChevronRight,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";
import { type AuthUser, useAuthStore, useCartStore, useOrderStore } from "@/lib/store";
import { toast } from "sonner";

import OrderItems from "@/components/checkout/OrderItems";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

const checkoutSchema = z.object({
  hoTen: z.string().min(2, "Họ tên quá ngắn"),
  soDienThoai: z.string().regex(/^[0-9]{10}$/, "SĐT không hợp lệ"),
  tinhThanhPho: z.string().min(1, "Thiếu tỉnh/thành"),
  quanHuyen: z.string().min(1, "Thiếu quận/huyện"),
  phuongXa: z.string().min(1, "Thiếu phường/xã"),
  diaChiCuThe: z.string().min(5, "Địa chỉ quá ngắn"),
  ghiNho: z.boolean().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const getCheckoutDefaultValues = (currentUser: AuthUser | null): CheckoutForm => ({
  hoTen: currentUser?.tenTaiKhoan ?? "",
  soDienThoai: currentUser?.soDienThoai ?? "",
  tinhThanhPho: "",
  quanHuyen: "",
  phuongXa: "",
  diaChiCuThe: "",
  ghiNho: false,
});

const paymentMethods = [
  { id: "momo", name: "Thanh toán bằng MoMo", icon: Smartphone, color: "#D82D8B" },
  { id: "shopeepay", name: "Thanh toán bằng Shopee Pay", icon: Wallet, color: "#EE4D2D" },
  { id: "vnpay", name: "Thanh toán bằng VNPay", icon: CreditCard, color: "#0056A7" },
  { id: "cod", name: "Thanh toán khi nhận hàng", icon: Banknote, color: "#450920" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const isCartEmpty = items.length === 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: getCheckoutDefaultValues(currentUser),
  });

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    reset(getCheckoutDefaultValues(currentUser));
  }, [currentUser, reset]);

  const onSubmit = (data: CheckoutForm) => {
    if (isCartEmpty) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    const result = placeOrder({
      user: currentUser,
      items,
      shippingInfo: {
        hoTen: data.hoTen,
        soDienThoai: data.soDienThoai,
        tinhThanhPho: data.tinhThanhPho,
        quanHuyen: data.quanHuyen,
        phuongXa: data.phuongXa,
        diaChiCuThe: data.diaChiCuThe,
      },
      paymentMethod: selectedPayment,
    });

    if (!result.success) {
      toast.error(result.message);

      if (!currentUser) {
        router.push("/login");
      }

      return;
    }

    clearCart();
    toast.success(result.message);
    router.push("/tai-khoan?tab=orders");
  };

  return (
    <div
      className="min-h-screen bg-gray-50 pb-20 font-be-vietnam"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-[13px] text-gray-500">
          <Link href="/">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cart">Giỏ hàng</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-bold text-[#450920]">Thanh toán</span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mt-4">
              <h2
                className="mb-6 text-[18px] font-bold text-[#A53860]"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                Thông tin giao hàng
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="mb-1 block font-medium">Họ và tên</label>
                  <input
                    {...register("hoTen")}
                    className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg"
                  />
                  {errors.hoTen?.message && (
                    <p className="mt-1 text-xs text-[#C1475A]">{errors.hoTen.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block font-medium">Số điện thoại</label>
                  <input
                    {...register("soDienThoai")}
                    className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg"
                  />
                  {errors.soDienThoai?.message && (
                    <p className="mt-1 text-xs text-[#C1475A]">{errors.soDienThoai.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="mb-1 block font-medium">Tỉnh/ Thành phố</label>
                    <input
                      {...register("tinhThanhPho")}
                      className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg"
                    />
                    {errors.tinhThanhPho?.message && (
                      <p className="mt-1 text-xs text-[#C1475A]">{errors.tinhThanhPho.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">Quận/ Huyện</label>
                    <input
                      {...register("quanHuyen")}
                      className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg"
                    />
                    {errors.quanHuyen?.message && (
                      <p className="mt-1 text-xs text-[#C1475A]">{errors.quanHuyen.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block font-medium">Phường/ Xã</label>
                    <input
                      {...register("phuongXa")}
                      className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg"
                    />
                    {errors.phuongXa?.message && (
                      <p className="mt-1 text-xs text-[#C1475A]">{errors.phuongXa.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block font-medium">Tên đường, tòa nhà, số nhà</label>
                  <input
                    {...register("diaChiCuThe")}
                    className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg"
                  />
                  {errors.diaChiCuThe?.message && (
                    <p className="mt-1 text-xs text-[#C1475A]">{errors.diaChiCuThe.message}</p>
                  )}
                </div>
                <label className="flex cursor-pointer items-center gap-2 pt-2 text-gray-600">
                  <input
                    type="checkbox"
                    {...register("ghiNho")}
                    className="h-4 w-4 rounded accent-[#A53860]"
                  />
                  <span>Ghi nhớ thông tin của tôi</span>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border">
              <OrderItems items={items} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mt-4">
              <h2
                className="mb-6 text-center text-[18px] font-bold text-[#A53860]"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((m) => {
                  const isSelected = selectedPayment === m.id;

                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedPayment(m.id)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all ${
                        isSelected ? "border-[#A53860] bg-rose-50/30 ring-1 ring-[#A53860]" : "border-gray-200 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          isSelected ? "border-[#A53860]" : "border-gray-300"
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-[#A53860]" />}
                      </div>
                      <m.icon className="h-5 w-5" style={{ color: m.color }} />
                      <span className="text-[14px] font-medium text-gray-800">{m.name}</span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo&nbsp;
                <Link href="#" className="underline hover:text-rose-500">
                  Điều khoản Glowic
                </Link>
              </p>
            </div>

            <CheckoutSummary
              totalPrice={totalPrice}
              disabled={isCartEmpty || isSubmitting}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </main>
    </div>
  );
}