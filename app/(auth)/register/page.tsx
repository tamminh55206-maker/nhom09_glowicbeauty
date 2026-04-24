"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store";

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
  const registerUser = useAuthStore((state) => state.registerUser);
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
    const result = registerUser({
      tenTaiKhoan: data.tenTaiKhoan,
      soDienThoai: data.soDienThoai,
      email: data.email,
      matKhau: data.matKhau,
      ngaySinh: data.ngaySinh,
      gioiTinh: "Nam",
    });

    if (result.success) {
      toast.success("Đăng ký thành công! Chào mừng bạn đến với Glowic.");
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1280px] px-4 pt-5 md:px-6">
        <nav className="border-b border-[#E8E0E3] pb-3 text-sm text-[#564C4F]">
          <Link href="/" className="transition-colors hover:text-[#B13D67]">
            Trang chủ
          </Link>
          <span className="px-1.5 text-[#9D8E93]">&gt;</span>
          <span className="text-[#2F2528]">Đăng ký</span>
        </nav>
      </div>

      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_28%,#FFF2F5_100%)]">
        <div
          className="absolute -bottom-28 right-[-12%] h-[420px] w-[68%] rounded-full blur-[10px]"
          style={{
            background:
              "radial-gradient(circle, rgba(218,98,125,0.28) 0%, rgba(248,206,216,0.58) 42%, rgba(255,255,255,0) 72%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[690px] max-w-[1280px] items-center justify-center px-4 py-16 md:px-6">
          <div className="w-full max-w-[480px] rounded-[12px] border border-[#F1D8DF] bg-white p-8 shadow-[0_12px_28px_rgba(69,9,32,0.12)] sm:p-10">
            <h1
              className="mb-8 text-center text-2xl font-bold"
              style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
            >
              Đăng ký tài khoản
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
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
                  aria-label={
                    showConfirmPassword ? "Ẩn nhập lại mật khẩu" : "Hiện nhập lại mật khẩu"
                  }
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

              <div>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    {...register("dongY")}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    Tôi đồng ý với tất cả các{" "}
                    <Link href="/faq" className="underline hover:text-rose-500">
                      điều khoản sử dụng
                    </Link>
                  </span>
                </label>
                {errors.dongY && (
                  <p className="mt-1 text-xs text-red-500">{errors.dongY.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-3 font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#C1475A" }}
              >
                Đăng ký
              </button>
            </form>

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
        </div>
      </div>
    </section>
  );
}
