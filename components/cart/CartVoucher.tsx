"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";

import type { AppliedDiscount } from "@/lib/types";

// 1. Định nghĩa khuôn (Interface) để nhận hàm từ file cha
interface CartVoucherProps {
  onApply: (code: string) => void;
  onRemove: () => void;
  appliedDiscount?: AppliedDiscount | null;
}

export default function CartVoucher({ onApply, onRemove, appliedDiscount }: CartVoucherProps) {
  const [code, setCode] = useState("");

  return (
    <div className="rounded-[30px] bg-white p-8 shadow-sm border border-gray-100 flex flex-col items-center">
      {/* Tiêu đề Mã giảm giá - Căn giữa chuẩn tọa độ */}
      <h3 
        className="text-[18px] font-bold text-[#A53860] mb-8"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        Mã giảm giá
      </h3>

      {/* Container cho Input và Button */}
      <div className="flex items-center gap-4 w-full justify-center">
        {/* Ô nhập mã: Nền đen, Chữ trắng, Đổ bóng nội thất */}
        <input
  type="text"
  placeholder="Nhập mã"
  value={code}
  onChange={(e) => setCode(e.target.value)}
  className="w-70 h-11.25 rounded-2xl bg-white border border-transparent px-6 py-2 text-sm italic text-black placeholder:text-gray-400 outline-none shadow-[0_4px_10px_rgba(0,0,0,0.3)] focus:ring-1 focus:ring-[#000000]/50 transition-all"
/>

        {/* Nút áp dụng: Màu đỏ đô, Chữ nghiêng 1.13deg */}
        <button
          onClick={() => {
            onApply(code);
            setCode(""); // Xóa chữ sau khi bấm để sạch sẽ
          }}
          className="h-11.75 px-8 rounded-2xl bg-[#A53860] shadow-[0_4px_10px_rgba(165,56,96,0.3)] transition-all active:scale-95 hover:bg-[#DA627D] flex items-center justify-center"
        >
          <span
            style={{
              width: '59px',
              height: '18px',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF',
              transform: 'rotate(1.13deg)',
              display: 'inline-block',
              textAlign: 'center'
            }}
          >
            Áp dụng
          </span>
        </button>
      </div>

      {/* Hiển thị mã đã áp dụng (Chỉ hiện khi có mã thành công) */}
      {appliedDiscount && (
        <div className="mt-6 flex items-center justify-between w-full max-w-95 rounded-xl bg-rose-50 border border-rose-100 p-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-4 rounded-full bg-[#A53860]/30" />
            <span className="text-sm font-bold text-[#A53860]">
              Đã áp dụng: {appliedDiscount.code} (-{appliedDiscount.amount.toLocaleString()}đ)
            </span>
          </div>
          <button
            onClick={onRemove}
            className="p-1 text-rose-400 hover:text-[#A53860] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}