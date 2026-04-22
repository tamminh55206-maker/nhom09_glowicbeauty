"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  soDienThoai: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  duyTriDangNhap: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const inputClassName =
    "h-10 w-full rounded-[4px] border border-[#E5A8B8] bg-white px-3 text-sm text-[#512A36] outline-none transition placeholder:text-[#D18B9F] focus:border-[#B13D67] focus:ring-2 focus:ring-[#B13D67]/10 dark:border-[#7A5A67] dark:bg-[#1F151B] dark:text-[#F7E8EC] dark:placeholder:text-[#CFAABB] dark:focus:border-[#D06482] dark:focus:ring-[#D06482]/15";

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

  const onSubmit = () => {
    toast.success("Đăng nhập thành công!");
    router.push("/");
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
            <div className="min-h-[294px] w-full max-w-[337px] rounded-[4px] border border-[#D8D0D3] bg-white px-[18px] pb-4 pt-3 shadow-[0_6px_14px_rgba(69,9,32,0.18)] transition-colors duration-300 dark:border-[#5A444F] dark:bg-[#24171F] dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <h1
                className="text-center text-[2rem] leading-none text-[#D06482] dark:text-[#F19AB0]"
                style={{ fontFamily: '"Black Mango", serif' }}
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

                <div className="flex items-center justify-between gap-3 text-[11px] text-[#574D51] transition-colors duration-300 dark:text-[#E5D5DB]">
                  <label className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      {...register("duyTriDangNhap")}
                      className="h-3.5 w-3.5 rounded border-[#DAB0BC] accent-[#B13D67] dark:border-[#8A6677]"
                    />
                    <span>Duy trì đăng nhập</span>
                  </label>

                  <Link
                    href="/faq"
                    className="font-medium text-[#8E3B55] transition-colors hover:text-[#B13D67] dark:text-[#F3B3C4] dark:hover:text-[#FFD6E1]"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="h-10 w-full rounded-[4px] bg-[#B13D67] text-base font-semibold text-white transition-colors hover:bg-[#972D55]"
                >
                  Đăng nhập
                </button>
              </form>

              <p className="mt-4 text-center text-[12px] text-[#5F5458] transition-colors duration-300 dark:text-[#EEE2E6]">
                Bạn chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="font-medium text-[#B13D67] transition-colors hover:text-[#972D55] dark:text-[#F3AABD] dark:hover:text-[#FFD6E1]"
                >
                  Đăng ký ngay
                </Link>
              </p>

              <p className="mt-2 text-center text-[9px] leading-[1.5] text-[#A49A9E] transition-colors duration-300 dark:text-[#B89FA8]">
                Bằng việc đăng nhập, bạn đồng ý với điều khoản và chính sách của
                Glowic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
