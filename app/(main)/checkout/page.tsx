"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { 
  ChevronRight, 
  Smartphone, 
  Wallet, 
  CreditCard, 
  Banknote,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { AppliedDiscount } from "@/lib/types";
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

const paymentMethods = [
  { id: "momo", name: "Thanh toán bằng MoMo", icon: Smartphone, color: "#D82D8B" },
  { id: "shopeepay", name: "Thanh toán bằng Shopee Pay", icon: Wallet, color: "#EE4D2D" },
  { id: "vnpay", name: "Thanh toán bằng VNPay", icon: CreditCard, color: "#0056A7" },
  { id: "cod", name: "Thanh toán khi nhận hàng", icon: Banknote, color: "#450920" },
];

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("momo");
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { ghiNho: false }
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) return toast.error("Giỏ hàng trống!");
    console.log("Dữ liệu:", { ...data, paymentMethod: selectedPayment });
    toast.success("Đặt hàng thành công!");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-be-vietnam" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Breadcrumbs */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-2 text-[13px] text-gray-500">
          <Link href="/">Trang chủ</Link> <ChevronRight className="h-4 w-4" />
          <Link href="/cart">Giỏ hàng</Link> <ChevronRight className="h-4 w-4" />
          <span className="font-bold text-[#450920]">
             Thanh toán 
          </span>
  <h1 style={{
    position: 'absolute',
    width: '200px',
    height: '36px',
    left: '611px',
    top: '200px',
    fontFamily: "'Black Mango', sans-serif",
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#450920', // Cho hiện lên trên cùng
}}>
    Thanh toán
</h1>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-6">
      
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* CỘT TRÁI (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. THÔNG TIN GIAO HÀNG */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mt-4">
              <h2 className="mb-6 text-[18px] font-bold text-[#A53860]"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }} >Thông tin giao hàng</h2>
              <div className="space-y-4 text-sm">
                <div>
                   <label className="mb-1 block font-medium">Họ và tên</label>
                   <input {...register("hoTen")} className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg" />
                </div>
                <div>
                   <label className="mb-1 block font-medium">Số điện thoại</label>
                   <input {...register("soDienThoai")} className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <div>
                      <label className="mb-1 block font-medium">Tỉnh/ Thành phố</label>
                      <input {...register("tinhThanhPho")} className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg" />
                   </div>
                   <div>
                      <label className="mb-1 block font-medium">Quận/ Huyện</label>
                      <input {...register("quanHuyen")} className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg" />
                   </div>
                   <div>
                      <label className="mb-1 block font-medium">Phường/ Xã</label>
                      <input {...register("phuongXa")} className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg" />
                   </div>
                </div>
                <div>
                   <label className="mb-1 block font-medium">Tên đường, tòa nhà, số nhà</label>
                   <input {...register("diaChiCuThe")} className="w-full rounded-lg border border-[#DA627D] p-2.5 outline-none focus:border-[#A53860] shadow-lg" />
                </div>
                <label className="flex cursor-pointer items-center gap-2 pt-2 text-gray-600">
                   <input type="checkbox" {...register("ghiNho")} className="h-4 w-4 rounded accent-[#A53860]" />
                   <span>Ghi nhớ thông tin của tôi</span>
                </label>
              </div>
            </div>

            {/* 2. ĐƠN HÀNG (OrderItems) */}
            <div className="rounded-2xl border">
               <OrderItems items={items} />
            </div>
          </div>

          {/* CỘT PHẢI (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 3. PHƯƠNG THỨC THANH TOÁN */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mt-4">
              <h2 className="mb-6 text-[18px] font-bold text-[#A53860] text-center "
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>Phương thức thanh toán</h2>
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
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#A53860]" : "border-gray-300"}`}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-[#A53860]" />}
                      </div>
                      <m.icon className="h-5 w-5" style={{ color: m.color }} />
                      <span className="text-[14px] font-medium text-gray-800">{m.name}</span>
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

            {/* 4. TỔNG TIỀN (CheckoutSummary) */}
            <CheckoutSummary totalPrice={totalPrice} />
          </div>

        </form>
      </main>
    </div>
  );
}