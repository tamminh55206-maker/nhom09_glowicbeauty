import { UseFormRegister, FieldErrors } from "react-hook-form";
interface CheckoutFormValues {
  hoTen: string;
  soDienThoai: string;
  tinhThanhPho: string;
  quanHuyen: string;
  phuongXa: string;
  diaChiCuThe: string;
  ghiNho?: boolean;
}

interface ShippingFormProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

export default function ShippingForm({ register, errors }: ShippingFormProps) {
  return (
     <div className="rounded-2xl border border-gray-100 bg-white p-[20px_31px] shadow-md shadow-rose-100/50">
    <h2 
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }} 
      className="mb-6 text-[18px] font-bold leading-[23px] text-[#A53860]"
    >
        Thông tin giao hàng
    </h2>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#000000]">Họ và tên *</label>
          <input {...register("hoTen")} className="w-full rounded-lg border px-1 py-2 outline-none border-[#DA627D] shadow-lg" />
          {errors.hoTen && <p className="mt-1 text-sm text-red-500">{errors.hoTen.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#000000]">Số điện thoại *</label>
          <input {...register("soDienThoai")} className="w-full rounded-lg border px-1 py-2 outline-none border-[#DA627D] shadow-lg" />
          {errors.soDienThoai && <p className="mt-1 text-sm text-red-500">{errors.soDienThoai.message}</p>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input {...register("tinhThanhPho")} className="rounded-lg border px-1 py-2 outline-none border-[#DA627D] shadow-lg" placeholder="Tỉnh/Thành" />
          <input {...register("quanHuyen")} className="rounded-lg border px-1 py-2 outline-none border-[#DA627D] shadow-lg" placeholder="Quận/Huyện" />
          <input {...register("phuongXa")} className="rounded-lg border px-1 py-2 outline-none border-[#DA627D] shadow-lg" placeholder="Phường/Xã" />
        </div>
        <input {...register("diaChiCuThe")} className="w-full rounded-lg border px-4 py-2 outline-none border-[#DA627D]" placeholder="Tên đường, tòa nhà, số nhà" />
      </div>
    </div>
  );
}