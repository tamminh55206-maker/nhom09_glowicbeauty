import Image from "next/image";

// Định nghĩa cấu trúc sản phẩm và item trong giỏ hàng
interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Đây là "hợp đồng" quy định component này CHỈ nhận mảng items
interface OrderItemsProps {
  items: CartItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-[#A53860]"
         style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        Đơn hàng
      </h2>

      {/* Header cho bảng đơn hàng (ẩn trên mobile) */}
      <div className="hidden grid-cols-12 gap-4 border-b pb-3 text-sm font-medium text-gray-500 md:grid">
        <div className="col-span-6">Sản phẩm</div>
        <div className="col-span-2 text-center">Số lượng</div>
        <div className="col-span-4 text-right">Thành tiền</div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-12"
          >
            {/* Cột sản phẩm */}
            <div className="col-span-6 flex items-center gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-[#450920]">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-400 md:hidden">
                  Đơn giá: {item.product.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>

            {/* Cột số lượng */}
            <div className="col-span-2 text-center text-sm font-medium text-gray-600">
              <span className="md:hidden">Số lượng: </span>
              {item.quantity}
            </div>

            {/* Cột thành tiền */}
            <div className="col-span-4 text-right font-bold text-[#A53860]">
              {(item.product.price * item.quantity).toLocaleString("vi-VN")}đ
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}