// app/(main)/checkout/_components/PaymentMethods.tsx
import { Smartphone, Wallet, CreditCard, Banknote } from "lucide-react";

const methods = [
  { id: "momo", name: "Thanh toán bằng MoMo", icon: Smartphone, color: "#D82D8B" },
  { id: "shopeepay", name: "Thanh toán bằng Shopee Pay", icon: Wallet, color: "#EE4D2D" },
  { id: "vnpay", name: "Thanh toán bằng VNPay", icon: CreditCard, color: "#0056A7" },
  { id: "cod", name: "Thanh toán khi nhận hàng", icon: Banknote, color: "#450920" },
];

export default function PaymentMethods({ 
  selected, 
  onSelect 
}: { 
  selected: string, 
  onSelect: (id: string) => void 
}) {
  return (
    <div 
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mb-6"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <h2 className="mb-6 text-[18px] font-bold text-[#A53860] text-center tracking-wide"
       style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        Phương thức thanh toán
      </h2>

      <div className="flex flex-col gap-3">
        {methods.map((m) => {
          const isSelected = selected === m.id;
          return (
            <div
              key={m.id}
              onClick={() => onSelect(m.id)} // Bấm vào bất kỳ đâu trong ô là chọn
              className={`
                flex cursor-pointer items-center gap-4 rounded-xl border p-4 
                transition-all duration-300 ease-in-out
                ${isSelected 
                  ? "border-[#A53860] bg-rose-50/50 shadow-md ring-1 ring-[#A53860]/20" 
                  : "border-gray-100 bg-white hover:border-[#A53860]/30 hover:shadow-lg hover:-translate-y-0.5"
                }
              `}
            >
              {/* Nút tròn tích chọn Custom */}
              <div className="flex items-center justify-center">
                <div className={`
                  h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? "border-[#A53860]" : "border-gray-300"}
                `}>
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#A53860] animate-in zoom-in-50 duration-200" />
                  )}
                </div>
              </div>

              {/* Icon phương thức */}
              <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-white' : 'bg-gray-50'}`}>
                <m.icon className="h-5 w-5" style={{ color: m.color }} />
              </div>

              {/* Tên phương thức */}
              <span className={`text-[14px] transition-colors ${isSelected ? "font-bold text-[#450920]" : "font-medium text-gray-700"}`}>
                {m.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}