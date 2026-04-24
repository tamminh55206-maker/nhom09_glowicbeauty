"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronRight } from "lucide-react";

// Import các components con đã tách
import CartItems from "@/app/components/cart/CartItems";
import CartVoucher from "@/app/components/cart/CartVoucher";
import CartSummary from "@/app/components/cart/CartSummary";

import { useCartStore } from "@/lib/store";
import type { AppliedDiscount } from "@/lib/types";
import { toast } from "sonner";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
} as const;

// Mock discount codes (Bạn có thể giữ lại hoặc chuyển vào store/db)
const DISCOUNT_CODES: Record<string, { type: "percent" | "fixed"; value: number }> = {
  GLOWIC10: { type: "percent", value: 10 },
  BEAUTY20: { type: "percent", value: 20 },
  NEWUSER: { type: "fixed", value: 50000 },
};

export default function CartPage() {
  const router = useRouter();
  
  // Lấy dữ liệu từ Store
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // State cho Voucher
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);

  // Tính toán giá cuối cùng
  const finalPrice = useMemo(() => {
    return appliedDiscount ? Math.max(0, totalPrice - appliedDiscount.amount) : totalPrice;
  }, [totalPrice, appliedDiscount]);


  // Xử lý Voucher
  const handleApplyDiscount = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const discount = DISCOUNT_CODES[cleanCode];

    if (!discount) {
      toast.error("Mã giảm giá không hợp lệ!");
      return;
    }

    const amount = discount.type === "percent" ? (totalPrice * discount.value) / 100 : discount.value;
    setAppliedDiscount({ code: cleanCode, amount });
    toast.success(`Đã áp dụng mã ${cleanCode}!`);
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    toast.info("Đã xóa mã giảm giá");
  };

  // View khi giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-gray-700 transition-colors">Trang chủ</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#450920] font-medium">Giỏ hàng</span>
            </nav>
          </div>
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-[#DA627D]">
            <ShoppingCart className="h-12 w-12" />
          </div>
          <h2 className="mt-8 text-3xl font-black text-[#450920]" style={{ fontFamily: '"Black Mango", serif' }}>
            Giỏ hàng trống
          </h2>
          <p className="mt-3 text-gray-500 text-center max-w-md">
            Có vẻ như bạn chưa chọn được sản phẩm ưng ý. <br/> Hãy quay lại cửa hàng để khám phá nhé!
          </p>
          <Link href="/products" className="mt-8 rounded-2xl bg-[#C1475A] px-10 py-4 font-bold text-white shadow-lg shadow-rose-100 hover:bg-[#A53860] transition-all">
            TIẾP TỤC MUA SẮM
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#450920] font-medium">Giỏ hàng</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-2">
       <motion.h1 
  initial={{ opacity: 0, y: -10 }} 
  animate={{ opacity: 1, y: 0 }}
  className="w-full text-center mb-4"
>
  <span
    className="inline-block font-bold text-[24px] leading-[36px] text-[#450920]"
    style={{ 
      fontFamily: '"Black Mango", serif',
      width: '215px', 
      height: '36px'  
    }}
  >
    Giỏ hàng của bạn
  </span>
</motion.h1>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 items-start">
          
          {/* CỘT TRÁI: Danh sách sản phẩm (Chiếm 3/5 cột) */}
          <div className="lg:col-span-3">
            <CartItems 
              items={items} 
              onUpdateQty={updateQuantity} 
              onRemove={removeFromCart} 
            />
          </div>

          {/* CỘT PHẢI: Voucher & Tổng kết (Chiếm 2/5 cột) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <CartVoucher 
                onApply={handleApplyDiscount} 
                onRemove={handleRemoveDiscount} 
              />
            </motion.div>

            <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <CartSummary 
                items={items} 
                finalPrice={finalPrice} 
                onCheckout={() => router.push("/checkout")}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}