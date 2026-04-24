interface CheckoutSummaryProps {
  totalPrice: number;
}

export default function CheckoutSummary({ totalPrice }: CheckoutSummaryProps) {
  const shippingFee = 20000; 
  const finalTotal = totalPrice + shippingFee;

  return (
    <div 
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <h2 className="mb-6 text-[18px] font-bold text-[#A53860]"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>Tổng tiền hàng</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tổng tiền hàng</span>
          <span className="font-medium text-gray-900">{totalPrice.toLocaleString("vi-VN")}đ</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Phí vận chuyển</span>
          <span className="font-medium text-gray-900">20.000đ</span>
        </div>

        <div className="my-4 border-t border-dashed border-gray-200" />

        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Tổng thanh toán</span>
          <span className="text-[20px] font-extrabold text-[#A53860]">
            {finalTotal.toLocaleString("vi-VN")}đ
          </span>
        </div>
         <p className="mt-4 text-center text-[12px] leading-relaxed text-gray-500">
            {`Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Glowic`}

          </p>
        <div className="pt-4">
          <button className="w-full rounded-xl bg-[#A53860] py-3.5 font-bold text-white hover:bg-[#DA627D] transition-all">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}