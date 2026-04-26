"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";

interface CartItemsProps {
  items: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItems({ items, onUpdateQty,  onRemove }: CartItemsProps) {
  const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

  return (
    <div className=" rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-900/20 transition-colors duration-300">
      {/* 1. Header Lưới với các đường kẻ dọc */}
      <div className="grid grid-cols-13 bg-gray-50 dark:bg-gray-900">
        <div className="col-span-6 p-4 font-medium text-[#000000] dark:text-gray-100 text-sm">Sản phẩm</div>
        <div className="col-span-2 p-4 font-medium text-[#000000] dark:text-gray-100 text-center text-sm ">Giá</div>
        <div className="col-span-2 p-4 font-medium text-[#000000] dark:text-gray-100 text-center text-sm ">Số lượng</div>
        <div className="col-span-3 p-4 mr-12 font-medium text-[#000000] dark:text-gray-100 text-center text-sm ">Thành tiền</div>
      </div>

      {/* 2. Danh sách sản phẩm */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {items.map((item) => (
          <div key={item.product.id} className="grid grid-cols-13 group hover:bg-gray-50/20 dark:hover:bg-gray-700/40 transition-colors duration-300">
            
            
            <div className="col-span-6 p-4 flex items-center gap-4 border-r border-gray-100 dark:border-gray-700">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900">
                <Image 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  fill 
                  className="object-cover" 
                  sizes="96px"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-[#DA627D] tracking-normal mb-1">
                  {item.product.brand}
                </p>
                <Link 
                  href={`/products/${item.product.slug}`} 
                  className="block text-[12px] font-medium text-[#000000] dark:text-gray-100 hover:text-[#C1475A] leading-relaxed normal-case transition-colors"
                >
                  {item.product.name}
                </Link>
              </div>
            </div>

            {/* Cột Giá */}
            <div className="col-span-2 p-4 flex items-center justify-center border-r border-gray-100 dark:border-gray-700 text-[15px] font-semibold text-[#450920] dark:text-[#F3B8CF]">
              {formatPrice(item.product.price)}
            </div>

            {/* Cột Số lượng */}
            <div className="col-span-2 p-4 flex items-center justify-center border-r border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 transition-colors duration-300">
                <button 
                  onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                  className="text-gray-400 dark:text-gray-300 hover:text-[#C1475A] transition-colors p-1"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-sm text-[#450920] dark:text-gray-100">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                  className="text-gray-400 dark:text-gray-300 hover:text-[#C1475A] transition-colors p-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Cột Thành tiền */}
           {/* Cột Thành tiền */}
<div className=" col-span-3 p-4 flex items-center justify-center text-[15px] font-bold text-[#A53860] dark:text-[#F0A7BC]">
  {formatPrice(item.product.price * item.quantity)}

  <button
    onClick={() => onRemove(item.product.id)}
    className="ml-auto mr-1 text-gray-400 hover:text-[#a53860] transition-colors"
  >
    <Trash2 className="h-4 w-4" />
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}
