"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  const inputClassName =
    "h-[36.47px] w-full rounded-[5.95px] border-[0.37px] border-[#E1B6C4] bg-white px-3 text-[13px] text-[#4A3139] outline-none transition placeholder:text-[#C09AA7] focus:border-[#B13D67] focus:ring-2 focus:ring-[#B13D67]/10 dark:border-[#6D505C] dark:bg-[#1F151B] dark:text-[#F7E8EC] dark:placeholder:text-[#A98A95]";
  const labelClassName =
    "mb-[5px] block text-[11px] leading-[14px] text-[#2F2528] transition-colors duration-300 dark:text-[#F3E1E7]";

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
      <div className="relative min-h-[780px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_34%,#E9A09F_76%,#DA627D_98%)] transition-colors duration-300 dark:bg-[linear-gradient(180deg,#171017_0%,#21131C_35%,#462435_78%,#24131D_100%)]" />

        <div className="relative mx-auto max-w-[1280px] px-4 pt-[26px] md:px-[38px]">
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

          <div className="flex justify-center px-4 pb-20 pt-[32px]">
            <div className="w-full max-w-[396px] rounded-[8.18px] border-[0.74px] border-[#BFBFBF] bg-white px-[15px] pb-[24px] pt-[14px] shadow-[-2.23px_0.74px_11.16px_rgba(0,0,0,0.25)] transition-colors duration-300 dark:border-[#5A444F] dark:bg-[#24171F]">
              <h1
                className="text-center text-[21px] font-bold leading-[32px]"
                style={{
                  fontFamily: '"Black Mango", serif',
                  background:
                    "linear-gradient(170.56deg, #DA627D 5.47%, #450920 256.63%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Đăng ký tài khoản
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-[10px] space-y-[8px]">
                <div>
                  <label htmlFor="tenTaiKhoan" className={labelClassName}>
                    Tên tài khoản
                  </label>
                  <input
                    id="tenTaiKhoan"
                    type="text"
                    autoComplete="username"
                    {...register("tenTaiKhoan")}
                    className={inputClassName}
                  />
                  {errors.tenTaiKhoan && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.tenTaiKhoan.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="soDienThoai" className={labelClassName}>
                    Số điện thoại
                  </label>
                  <input
                    id="soDienThoai"
                    type="tel"
                    autoComplete="tel"
                    {...register("soDienThoai")}
                    className={inputClassName}
                  />
                  {errors.soDienThoai && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.soDienThoai.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={inputClassName}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="matKhau" className={labelClassName}>
                    Mật khẩu
                  </label>
                  <input
                    id="matKhau"
                    type="password"
                    autoComplete="new-password"
                    {...register("matKhau")}
                    className={inputClassName}
                  />
                  {errors.matKhau && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.matKhau.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="nhapLaiMatKhau" className={labelClassName}>
                    Nhập lại mật khẩu
                  </label>
                  <input
                    id="nhapLaiMatKhau"
                    type="password"
                    autoComplete="new-password"
                    {...register("nhapLaiMatKhau")}
                    className={inputClassName}
                  />
                  {errors.nhapLaiMatKhau && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.nhapLaiMatKhau.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ngaySinh" className={labelClassName}>
                    Ngày sinh
                  </label>
                  <input
                    id="ngaySinh"
                    type="date"
                    {...register("ngaySinh")}
                    className={`${inputClassName} [color-scheme:light] dark:[color-scheme:dark]`}
                  />
                  {errors.ngaySinh && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.ngaySinh.message}
                    </p>
                  )}
                </div>

                <div className="pt-[2px]">
                  <label className="flex items-start gap-[6px] text-[10px] leading-[14px] text-[#4B4044] transition-colors duration-300 dark:text-[#E5D5DB]">
                    <input
                      type="checkbox"
                      {...register("dongY")}
                      className="mt-[2px] h-[10px] w-[10px] rounded-[1px] border border-[#A53860] bg-white accent-[#A53860]"
                    />
                    <span>
                      Tôi đồng ý với tất cả các điều khoản sử dụng.
                    </span>
                  </label>
                  {errors.dongY && (
                    <p className="mt-1 text-xs text-red-500">{errors.dongY.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-[2px] h-[36.47px] w-full rounded-[5.95px] bg-[#A53860] text-[15px] font-medium text-white transition-colors hover:bg-[#8E3B55]"
                >
                  Đăng ký
                </button>
              </form>

              <p className="mt-4 text-center text-[12px] text-black transition-colors duration-300 dark:text-[#EEE2E6]">
                Bạn có tài khoản rồi?{" "}
                <Link
                  href="/login"
                  className="text-[#A53860] transition-colors hover:text-[#9E3C59] dark:text-[#F3AABD] dark:hover:text-[#FFD6E1]"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
