"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const registerSchema = z
  .object({
    tenTaiKhoan: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập tên tài khoản")
      .min(2, "Tên tối thiểu 2 ký tự"),
    soDienThoai: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số điện thoại")
      .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa 10 chữ số")
      .length(10, "Số điện thoại phải gồm 10 số"),
    email: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập e-mail")
      .email("E-mail không hợp lệ"),
    matKhau: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu tối thiểu 6 ký tự"),
    nhapLaiMatKhau: z.string().trim().min(1, "Vui lòng nhập lại mật khẩu"),
    ngaySinh: z.string().min(1, "Vui lòng chọn ngày sinh"),
    dongY: z.boolean().refine((value) => value === true, {
      message: "Vui lòng tích vào ô đồng ý điều khoản",
    }),
  })
  .refine((data) => data.matKhau === data.nhapLaiMatKhau, {
    message: "Mật khẩu không khớp",
    path: ["nhapLaiMatKhau"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

const fieldClassName =
  "flex h-[36.47px] w-[280.6px] items-center rounded-[5.95443px] border-[0.37px] border-[#A53860] bg-white px-[7.44px] text-[15.8605px] font-normal leading-5 text-black outline-none transition placeholder:text-[#B48996] focus:border-[#B13D67] focus:ring-2 focus:ring-[#B13D67]/10 dark:bg-[#1F151B] dark:text-[#F7E8EC] dark:placeholder:text-[#CFAABB]";

const fieldLabelClassName =
  "mb-[4px] block text-[15.8605px] font-medium leading-5 text-black transition-colors duration-300 dark:text-[#F3E1E7]";

export default function RegisterPage() {
  const router = useRouter();

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

  const onSubmit = () => {
    toast.success("Đăng ký thành công! Chào mừng bạn đến với Glowic.");
    router.push("/login");
  };

  return (
    <section className="w-full bg-white transition-colors duration-300 dark:bg-[#140F13]">
      <div className="relative min-h-160 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_36.96%,#EAA29F_78.8%,#DA627D_97.39%)] transition-colors duration-300 dark:bg-[linear-gradient(180deg,#171017_0%,#21131C_35%,#462435_78%,#24131D_100%)]" />

        <div className="relative mx-auto h-full max-w-7xl px-4 pt-6.5 md:px-9.5">
          <nav className="flex items-center gap-1 text-[14px] text-[#2F2528] transition-colors duration-300 dark:text-[#F3E1E7]">
            <Link
              href="/"
              className="transition-colors hover:text-[#B13D67] dark:hover:text-[#F3AABD]"
            >
              Trang chủ
            </Link>
            <span className="text-[#8E8186] dark:text-[#CDB7BF]">&gt;</span>
            <Link
              href="/login"
              className="transition-colors hover:text-[#B13D67] dark:hover:text-[#F3AABD]"
            >
              Đăng nhập
            </Link>
            <span className="text-[#8E8186] dark:text-[#CDB7BF]">&gt;</span>
            <span>Đăng ký tài khoản</span>
          </nav>

          <div className="mt-2 h-px w-full bg-[#D9D9D9] transition-colors duration-300 dark:bg-[#594A52]" />

          <div className="mt-7 flex justify-center pb-12">
            <div className="w-[337.17px] rounded-[8.18px] border-[0.74px] border-[#BFBFBF] bg-white px-[28.28px] pb-5 pt-[12.61px] shadow-[-2.23px_0.74px_11.16px_rgba(0,0,0,0.25)] transition-colors duration-300 dark:border-[#5A444F] dark:bg-[#24171F]">
              <h1
                className="text-center text-[26.9628px] font-black leading-10.25"
                style={{
                  fontFamily: '"Black Mango", serif',
                  background: "linear-gradient(170.56deg, #DA627D 5.47%, #450920 256.63%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Đăng ký tài khoản
              </h1>

              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="mt-1.5 space-y-2.25"
              >
                <div>
                  <label
                    htmlFor="tenTaiKhoan"
                    className={fieldLabelClassName}
                    style={beVietnamFontStyle}
                  >
                    Tên tài khoản
                  </label>
                  <input
                    id="tenTaiKhoan"
                    type="text"
                    {...register("tenTaiKhoan")}
                    className={fieldClassName}
                    style={beVietnamFontStyle}
                  />
                  {errors.tenTaiKhoan && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.tenTaiKhoan.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="soDienThoai"
                    className={fieldLabelClassName}
                    style={beVietnamFontStyle}
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="soDienThoai"
                    type="tel"
                    {...register("soDienThoai")}
                    className={fieldClassName}
                    style={beVietnamFontStyle}
                  />
                  {errors.soDienThoai && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.soDienThoai.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={fieldLabelClassName}
                    style={beVietnamFontStyle}
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={fieldClassName}
                    style={beVietnamFontStyle}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="matKhau"
                    className={fieldLabelClassName}
                    style={beVietnamFontStyle}
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="matKhau"
                    type="password"
                    {...register("matKhau")}
                    className={fieldClassName}
                    style={beVietnamFontStyle}
                  />
                  {errors.matKhau && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.matKhau.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nhapLaiMatKhau"
                    className={fieldLabelClassName}
                    style={beVietnamFontStyle}
                  >
                    Nhập lại mật khẩu
                  </label>
                  <input
                    id="nhapLaiMatKhau"
                    type="password"
                    {...register("nhapLaiMatKhau")}
                    className={fieldClassName}
                    style={beVietnamFontStyle}
                  />
                  {errors.nhapLaiMatKhau && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.nhapLaiMatKhau.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ngaySinh"
                    className={fieldLabelClassName}
                    style={beVietnamFontStyle}
                  >
                    Ngày sinh
                  </label>
                  <input
                    id="ngaySinh"
                    type="date"
                    autoComplete="bday"
                    {...register("ngaySinh")}
                    className={fieldClassName}
                    style={beVietnamFontStyle}
                  />
                  {errors.ngaySinh && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.ngaySinh.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="flex items-center gap-[5.21px] text-[13.3765px] font-normal leading-4.25 text-black transition-colors duration-300 dark:text-[#EEE2E6]"
                    style={beVietnamFontStyle}
                  >
                    <input
                      type="checkbox"
                      {...register("dongY")}
                      className="h-2.25 w-2.25 rounded-[0.74px] border-[0.74px] border-[#A53860] bg-white accent-[#A53860]"
                    />
                    <span>
                      Tôi đồng ý với tất cả các{" "}
                      <Link
                        href="/faq"
                        className="text-[#A53860] transition-colors hover:text-[#9E3C59] dark:text-[#F3AABD] dark:hover:text-[#FFD6E1]"
                        style={beVietnamFontStyle}
                      >
                        điều khoản sử dụng.
                      </Link>
                    </span>
                  </label>
                  {errors.dongY && (
                    <p className="mt-1 text-xs text-red-500" style={beVietnamFontStyle}>
                      {errors.dongY.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="h-[36.47px] w-[280.6px] rounded-[5.95px] bg-[#A53860] text-[17.4465px] font-medium leading-5.5 text-white transition-colors hover:bg-[#8E3B55]"
                  style={beVietnamFontStyle}
                >
                  Đăng ký
                </button>
              </form>

              <p
                className="mt-3 text-center text-[15.8605px] font-normal leading-5 text-black transition-colors duration-300 dark:text-[#EEE2E6]"
                style={beVietnamFontStyle}
              >
                Bạn có tài khoản rồi?{" "}
                <Link
                  href="/login"
                  className="text-[#DA627D] transition-colors hover:text-[#9E3C59] dark:text-[#F3AABD] dark:hover:text-[#FFD6E1]"
                  style={beVietnamFontStyle}
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
