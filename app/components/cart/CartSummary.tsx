"use client";
import Image from "next/image";
import { CartItem } from "@/lib/types";

interface CartSummaryProps {
  items: CartItem[];
  finalPrice: number;
  onCheckout: () => void;
}

export default function CartSummary({ items, finalPrice }: CartSummaryProps) {
  const formatPrice = (p: number) => p.toLocaleString("vi-VN") + "đ";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 sticky top-10 flex flex-col">
  
  {/* Container tiêu đề để xử lý position absolute */}
  <div className="relative w-full h-11.25 mb-4"> 
    <h3 
      className="absolute left-1/2 -translate-x-1/2 top-4.25 w-48.75 h-5.75 font-bold text-[18px] leading-5.75 text-[#A53860] whitespace-nowrap text-center"
      style={{ 
        fontFamily: "'Be Vietnam Pro', sans-serif",
        transform: "none" 
      }}
    >
      Xem trước đơn hàng
    </h3>
  </div>
      
      {/* 1. KHU VỰC TIÊU ĐỀ: Phải hiện rõ SL và T.Tiền */}
      <div className="grid grid-cols-12 gap-2 pb-3 mb-1 border-b-2 border-gray-100 text-[11px] font-medium text-black px-1">
  <div className="col-span-7">Sản phẩm</div>
  <div className="col-span-2 text-center">SL</div>
  <div className="col-span-3 text-right pr-1">T.Tiền</div>
</div>

      {/* 2. KHU VỰC DANH SÁCH: Có đường kẻ ngang phân cách từng dòng */}
      <div className="max-h-100 overflow-y-auto pr-1">
        {items.map((item) => (
          <div 
            key={item.product.id} 
            className="grid grid-cols-12 gap-2 py-4 items-center border-b border-gray-200 last:border-0"
          >
            {/* Cột Sản phẩm */}
            <div className="col-span-7 flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                <Image 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  fill 
                  className="object-cover" 
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#DA627D] truncate">
                  {item.product.brand}
                </p>
                <p className="text-[12px] font-semibold text-[#450920] leading-tight normal-case line-clamp-2 tracking-normal">
                  {item.product.name}
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  Màu: {item.product.variant || "01"}
                </p>
              </div>
            </div>

            {/* Cột SL */}
            <div className="col-span-2 text-center text-xs font-medium text-[#450920]">
              {item.quantity}
            </div>

            {/* Cột T.Tiền */}
            <div className="col-span-3 text-right text-xs font-bold text-[#A53860]">
              {formatPrice(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* 3. KHU VỰC TỔNG CỘNG */}
      <div className="mt-4 pt-6 border-t-2 border-dashed border-gray-200">
        <div className="mt-6 text-right px-1">
  <p className="text-[16px] font-bold italic text-black leading-none">Tổng</p>
  <p className="text-[22px] font-bold text-[#A53860] mt-1">
    {finalPrice.toLocaleString()} 
  </p>
</div>
      </div>

      {/* 4. NÚT THANH TOÁN */}
      <button className="mt-8 w-full rounded-2xl py-4 font-bold text-white bg-[#A53860] hover:bg-[#DA627D] shadow-lg shadow-rose-100 transition-all active:scale-[0.98]">
        Thanh toán
      </button>
    </div>
  );
}