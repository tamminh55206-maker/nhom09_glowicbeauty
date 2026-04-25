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

  const inputClassName =
    "flex flex-row justify-center items-center h-[36.47px] w-full rounded-[5.95443px] border-[0.37px] border-[#A53860] bg-white px-[7.44px] text-base text-[#DA627D] outline-none transition placeholder:font-['Be_Vietnam_Pro'] placeholder:text-[#DA627D] focus:border-[#B13D67] focus:ring-2 focus:ring-[#B13D67]/10 dark:bg-[#1F151B] dark:text-[#F7E8EC] dark:placeholder:text-[#CFAABB]";

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
    <section className="w-full bg-white transition-colors duration-300 dark:bg-[#140F13]">
      <div className="relative min-h-[850px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_36.96%,#EAA29F_78.8%,#DA627D_97.39%)] transition-colors duration-300 dark:bg-[linear-gradient(180deg,#171017_0%,#21131C_35%,#462435_78%,#24131D_100%)]" />

        <div className="relative mx-auto h-full max-w-[1280px] px-4 pt-[26px] md:px-[38px]">
          <nav className="flex items-center gap-1 text-[14px] text-[#2F2528] transition-colors duration-300 dark:text-[#F3E1E7]">
            <Link
              href="/"
              className="transition-colors hover:text-[#B13D67] dark:hover:text-[#F3AABD]"
            >
              Trang chủ
            </Link>
            <span className="text-[#8E8186] dark:text-[#CDB7BF]">&gt;</span>
            <span>Đăng ký</span>
          </nav>

          <div className="mt-[8px] h-px w-full bg-[#D9D9D9] transition-colors duration-300 dark:bg-[#594A52]" />

          <div className="mt-[36px] flex justify-center pb-20">
            <div className="w-[380px] rounded-[8.18px] border-[0.74px] border-[#BFBFBF] bg-white px-[28.28px] pb-6 pt-[12.61px] shadow-[-2.23px_0.74px_11.16px_rgba(0,0,0,0.25)] transition-colors duration-300 dark:border-[#5A444F] dark:bg-[#24171F]">
              <h1
                className="text-center text-[25.3px] font-bold leading-[38px]"
                style={{
                  fontFamily: '"Black Mango", serif',
                  background: 'linear-gradient(170.56deg, #DA627D 5.47%, #450920 256.63%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Đăng ký
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <div>
                  <input
                    type="text"
                    {...register("tenTaiKhoan")}
                    placeholder="Tên tài khoản"
                    className={inputClassName}
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
                    className={inputClassName}
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
                    className={inputClassName}
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
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DA627D] hover:text-[#B13D67] dark:text-[#CFAABB]"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
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
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DA627D] hover:text-[#B13D67] dark:text-[#CFAABB]"
                    aria-label={
                      showConfirmPassword ? "Ẩn nhập lại mật khẩu" : "Hiện nhập lại mật khẩu"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  {errors.nhapLaiMatKhau && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.nhapLaiMatKhau.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-[12px] text-[#8E8186] dark:text-[#CDB7BF]">Ngày sinh</label>
                  <input
                    type="date"
                    {...register("ngaySinh")}
                    className={`${inputClassName} block`}
                  />
                  {errors.ngaySinh && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.ngaySinh.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      {...register("dongY")}
                      className="mt-1 h-4 w-4 rounded-[0.74px] border-[0.74px] border-[#A53860] bg-white accent-[#A53860]"
                    />
                    <span className="text-[12px] leading-[1.4] text-black dark:text-[#E5D5DB]">
                      Tôi đồng ý với tất cả các{" "}
                      <Link href="/faq" className="underline hover:text-[#9E3C59] dark:hover:text-[#F19AB0]">
                        điều khoản sử dụng
                      </Link>
                    </span>
                  </label>
                  {errors.dongY && (
                    <p className="text-xs text-red-500">{errors.dongY.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="h-[40px] w-full rounded-[5.95px] bg-[#A53860] text-[16.37px] font-medium text-white transition-colors hover:bg-[#8E3B55]"
                >
                  Đăng ký
                </button>
              </form>

              <p className="mt-6 text-center text-[12px] text-black transition-colors duration-300 dark:text-[#EEE2E6]">
                Bạn có tài khoản rồi?{" "}
                <Link
                  href="/login"
                  className="text-[#A53860] transition-colors hover:text-[#9E3C59] dark:text-[#F3AABD] dark:hover:text-[#FFD6E1]"
                >
                  Đăng nhập
                </Link>
              </p>

              <p className="mt-4 text-center text-[8px] leading-[10px] text-[#878787] transition-colors duration-300 dark:text-[#B89FA8]">
                Bằng việc đăng ký, bạn đồng ý với điều khoản & chính sách của
                Glowic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
