"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z
  .object({
    tenTaiKhoan: z.string().min(2, "Tên tối thiểu 2 ký tự"),
    soDienThoai: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    nhapLaiMatKhau: z.string(),
    ngaySinh: z.string().min(1, "Vui lòng nhập ngày sinh"),
    dongY: z.boolean().refine((val) => val === true, {
      message: "Vui lòng đồng ý với điều khoản",
    }),
  })
  .refine((data) => data.matKhau === data.nhapLaiMatKhau, {
    message: "Mật khẩu không khớp",
    path: ["nhapLaiMatKhau"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      dongY: false,
    },
  });

  const onSubmit = (data: RegisterForm) => {
    toast.success("Đăng ký thành công! Chào mừng bạn đến với Glowic 🎉");
    router.push("/");
  };

  return (
    <div className="w-full max-w-[480px] rounded-xl bg-white p-8 shadow-lg sm:p-10">
      {/* Title */}
      <h1
        className="mb-8 text-center text-2xl font-bold"
        style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
      >
        Đăng ký tài khoản
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Account Name */}
        <div>
          <input
            type="text"
            {...register("tenTaiKhoan")}
            placeholder="Tên tài khoản"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#C1475A]"
          />
          {errors.tenTaiKhoan && (
            <p className="mt-1 text-xs text-red-500">
              {errors.tenTaiKhoan.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            {...register("soDienThoai")}
            placeholder="Số điện thoại"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#C1475A]"
          />
          {errors.soDienThoai && (
            <p className="mt-1 text-xs text-red-500">
              {errors.soDienThoai.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="E-mail"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#C1475A]"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("matKhau")}
            placeholder="Mật khẩu"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#C1475A]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {errors.matKhau && (
            <p className="mt-1 text-xs text-red-500">
              {errors.matKhau.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("nhapLaiMatKhau")}
            placeholder="Nhập lại mật khẩu"
            className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#C1475A]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {errors.nhapLaiMatKhau && (
            <p className="mt-1 text-xs text-red-500">
              {errors.nhapLaiMatKhau.message}
            </p>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label className="mb-1 block text-xs text-gray-500">Ngày sinh</label>
          <input
            type="date"
            {...register("ngaySinh")}
            className="w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[#C1475A]"
          />
          {errors.ngaySinh && (
            <p className="mt-1 text-xs text-red-500">
              {errors.ngaySinh.message}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("dongY")}
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              Tôi đồng ý với tất cả các{" "}
              <Link href="#" className="underline hover:text-rose-500">
                điều khoản sử dụng
              </Link>
            </span>
          </label>
          {errors.dongY && (
            <p className="mt-1 text-xs text-red-500">{errors.dongY.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-full py-3 font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#C1475A" }}
        >
          Đăng ký
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Bạn có tài khoản rồi?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline"
          style={{ color: "#C1475A" }}
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
