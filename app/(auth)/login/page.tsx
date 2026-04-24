"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store";

const loginSchema = z.object({
  soDienThoai: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  duyTriDangNhap: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.loginUser);
  const inputClassName =
    "flex flex-row justify-center items-center h-[36.47px] w-[280.6px] rounded-[5.95443px] border-[0.37px] border-[#A53860] bg-white px-[7.44px] text-base text-[#DA627D] outline-none transition placeholder:font-['Be_Vietnam_Pro'] placeholder:text-[#DA627D] focus:border-[#B13D67] focus:ring-2 focus:ring-[#B13D67]/10 dark:bg-[#1F151B] dark:text-[#F7E8EC] dark:placeholder:text-[#CFAABB]";

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
    const result = loginUser({
      soDienThoai: data.soDienThoai,
      matKhau: data.matKhau,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/tai-khoan");
  };

  return (
    <section className="w-full bg-white transition-colors duration-300 dark:bg-[#140F13]">
      <div className="relative h-[547px] w-full overflow-hidden">
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
            <span>Đăng nhập</span>
          </nav>

          <div className="mt-[8px] h-px w-full bg-[#D9D9D9] transition-colors duration-300 dark:bg-[#594A52]" />

          <div className="mt-[36px] flex justify-center">
            <div className="min-h-[294px] w-[337.17px] rounded-[8.18px] border-[0.74px] border-[#BFBFBF] bg-white px-[28.28px] pb-4 pt-[12.61px] shadow-[-2.23px_0.74px_11.16px_rgba(0,0,0,0.25)] transition-colors duration-300 dark:border-[#5A444F] dark:bg-[#24171F]">
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
                Đăng nhập
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
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
                    type="password"
                    {...register("matKhau")}
                    placeholder="Mật khẩu"
                    className={inputClassName}
                  />
                  {errors.matKhau && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.matKhau.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 text-[11px] text-black transition-colors duration-300 dark:text-[#E5D5DB]">
                  <label className="flex items-center gap-[5.21px]">
                    <input
                      type="checkbox"
                      {...register("duyTriDangNhap")}
                      className="h-[9px] w-[9px] rounded-[0.74px] border-[0.74px] border-[#A53860] bg-white accent-[#A53860]"
                    />
                    <span className="text-[12px] leading-[15px]">Duy trì đăng nhập</span>
                  </label>

                  <Link
                    href="/faq"
                    className="text-[11px] leading-[14px] underline transition-colors hover:text-[#9E3C59] dark:text-white dark:hover:text-[#F19AB0]"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="h-[36.47px] w-[280.6px] rounded-[5.95px] bg-[#A53860] text-[16.37px] font-medium text-white transition-colors hover:bg-[#8E3B55]"
                >
                  Đăng nhập
                </button>
              </form>

              <p className="mt-6 text-center text-[12px] text-black transition-colors duration-300 dark:text-[#EEE2E6]">
                Bạn chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="text-[#A53860] transition-colors hover:text-[#9E3C59] dark:text-[#F3AABD] dark:hover:text-[#FFD6E1]"
                >
                  Đăng ký ngay
                </Link>
              </p>

              <p className="mt-4 text-center text-[8px] leading-[10px] text-[#878787] transition-colors duration-300 dark:text-[#B89FA8]">
                Bằng việc đăng nhập, bạn đồng ý với điều khoản & chính sách của
                Glowic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
