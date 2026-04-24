"use client";

import dynamic from "next/dynamic"; // 1. Import dynamic
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import {ChevronRight} from "lucide-react";
import React, { useState } from "react";
// 2. Import các component con theo kiểu Dynamic và tắt SSR
const ShippingForm = dynamic(() => import("@/components/checkout/ShippingForm"), { ssr: false });
const OrderItems = dynamic(() => import("@/components/checkout/OrderItems"), { ssr: false });
const PaymentMethods = dynamic(() => import("@/components/checkout/PaymentMethods"), { ssr: false });
const CheckoutSummary = dynamic(() => import("@/components/checkout/CheckoutSummary"), { ssr: false });

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

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("momo");
  const router = useRouter();
  
  // Lấy dữ liệu từ store
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { ghiNho: false },
  });

  const shippingFee = totalPrice >= 500000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }
    toast.success("Đặt hàng thành công!");
    clearCart();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Breadcrumbs */}
        <div className="border-b bg-white"> 
  <div className="mx-auto max-w-7xl px-4 py-4">
    <nav className="flex items-center gap-2 text-sm">
      <Link href="/" className="text-gray-500 hover:text-gray-700">Trang chủ</Link>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      <Link href="/cart" className="text-gray-500 hover:text-gray-700">Giỏ hàng</Link>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      <span className="font-medium text-[#450920]">Thanh toán</span>
    </nav>
  </div>
</div>
        <h1 className="mb-4 text-2xl font-bold text-[#450920] text-center">Thanh toán</h1>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <ShippingForm register={register} errors={errors} />
            <OrderItems items={items} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <PaymentMethods 
              selected={selectedPayment} 
              onSelect={(id) => setSelectedPayment(id)} 
            />
            <CheckoutSummary totalPrice={totalPrice}
            />
          </div>
        </div>
      </form>
    </div>
  );
}