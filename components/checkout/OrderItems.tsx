"use client";

import Image from "next/image";

// 1. Định nghĩa Interface đầy đủ để không bị lỗi
interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  brand?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderItemsProps {
  items: CartItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-[#A53860]"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>Đơn hàng</h2>

      {/* Header bảng */}
      <div className="hidden grid-cols-12 gap-4 border-b pb-3 text-sm font-medium text-gray-500 md:grid">
        <div className="col-span-6">Sản phẩm</div>
        <div className="col-span-2 text-right">Giá</div>
        <div className="col-span-2 text-center">Số lượng</div>
        <div className="col-span-2 text-right">Thành tiền</div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => ( // Biến 'item' bắt đầu từ đây
          <div key={item.product.id} className="grid grid-cols-1 items-center gap-4 py-5 md:grid-cols-12">
            
            {/* Cột sản phẩm */}
            <div className="col-span-6 flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                {/* Tên thương hiệu màu hồng */}
                <p className="text-[13px] font-medium text-[#A53860] mb-0.5">
                  {item.product.brand || "Maybelline"}
                </p>
                
                {/* Tên sản phẩm màu đen */}
                <p className="line-clamp-2 text-[14px] font-bold text-gray-900 leading-tight">
                  {item.product.name}
                </p>
              </div>
            </div>

            {/* Cột Giá */}
            <div className="col-span-2 text-right text-sm font-bold text-gray-900 hidden md:block">
              {item.product.price.toLocaleString("vi-VN")} đ
            </div>

            {/* Cột Số lượng */}
            <div className="col-span-2 text-center text-sm font-medium text-gray-900">
              <span className="md:hidden font-normal text-gray-400">Số lượng: </span>
              {item.quantity}
            </div>

            {/* Cột Thành tiền */}
            <div className="col-span-2 text-right font-bold text-gray-900">
              {(item.product.price * item.quantity).toLocaleString("vi-VN")} đ
            </div>
          </div>
        ))} {/* Biến 'item' kết thúc ở đây */}
      </div>
    </div>
  );
}