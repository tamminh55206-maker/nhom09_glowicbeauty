"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  soDienThoai: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  duyTriDangNhap: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      duyTriDangNhap: false,
    },
  });

  const onSubmit = (data: LoginForm) => {
    // Mock: any valid format phone + password works
    toast.success("Đăng nhập thành công!");
    router.push("/");
  };

  return (
    <div className="w-full max-w-[480px] rounded-xl bg-white p-8 shadow-lg sm:p-10">
      {/* Title */}
      <h1
        className="mb-8 text-center text-2xl font-bold"
        style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
      >
        Đăng nhập
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        {/* Remember + Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("duyTriDangNhap")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Duy trì đăng nhập</span>
          </label>
          <Link
            href="#"
            className="text-sm hover:underline"
            style={{ color: "#C1475A" }}
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-full py-3 font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#C1475A" }}
        >
          Đăng nhập
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Bạn chưa có tài khoản?{" "}
        <Link
          href="/register"
          className="font-medium hover:underline"
          style={{ color: "#C1475A" }}
        >
          Đăng ký
        </Link>
      </p>

      {/* Terms */}
      <p className="mt-4 text-center text-xs text-gray-500">
        Bằng việc đăng nhập, bạn đồng ý với{" "}
        <Link href="#" className="underline hover:text-rose-500">
          điều khoản & chính sách
        </Link>{" "}
        của Glowic
      </p>
    </div>
  );
}
