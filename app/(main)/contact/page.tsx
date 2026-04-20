"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

// Contact schema
const contactSchema = z.object({
  hoTen: z.string().min(2, "Vui lòng nhập họ tên"),
  soDienThoai: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  loiNhan: z.string().min(10, "Lời nhắn tối thiểu 10 ký tự"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h. 🌸");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span style={{ color: "#450920" }}>Liên hệ</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1
            className="text-3xl font-bold"
            style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
          >
            Liên Hệ
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Chăm sóc làn da, nâng niu diện mạo. Hãy kết nối để cùng Glowic tỏa
            sáng mỗi ngày.
          </p>
        </div>

        {/* Main Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="overflow-hidden rounded-xl border bg-white shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Contact Info */}
            <div className="border-b p-8 lg:border-b-0 lg:border-r">
              <h2
                className="mb-6 text-xl font-bold"
                style={{ color: "#450920" }}
              >
                Thông tin liên hệ
              </h2>

              <div className="space-y-5">
                {/* Company Name */}
                <div className="flex items-start gap-3">
                  <Building2
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "#C1475A" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Tên công ty</p>
                    <p className="font-medium" style={{ color: "#450920" }}>
                      CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI DỊCH VỤ GLOWIC
                    </p>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "#C1475A" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Hotline</p>
                    <p className="font-medium" style={{ color: "#450920" }}>
                      1900241202
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "#C1475A" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium" style={{ color: "#450920" }}>
                      cskh@glowicbeauty.vn
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "#C1475A" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Vị trí</p>
                    <p className="font-medium" style={{ color: "#450920" }}>
                      Số 1, Võ Văn Ngân, Phường Thủ Đức, Thành phố Hồ Chí Minh
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                    style={{ color: "#C1475A" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Giờ mở cửa</p>
                    <p className="font-medium" style={{ color: "#450920" }}>
                      8:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-6 overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4!2d106.7698!3d10.8503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVsO1IFbEg24gTmfDom4!5e0!3m2!1svi!2svn!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="p-8">
              <h2
                className="mb-6 text-xl font-bold"
                style={{ color: "#450920" }}
              >
                Gửi lời nhắn cho Glowic
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Họ và tên của bạn
                  </label>
                  <input
                    type="text"
                    {...register("hoTen")}
                    placeholder="Nhập họ và tên"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#C1475A]"
                  />
                  {errors.hoTen && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.hoTen.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Số điện thoại của bạn
                  </label>
                  <input
                    type="tel"
                    {...register("soDienThoai")}
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#C1475A]"
                  />
                  {errors.soDienThoai && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.soDienThoai.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Địa chỉ Email của bạn
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#C1475A]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Lời nhắn của bạn
                  </label>
                  <textarea
                    {...register("loiNhan")}
                    rows={4}
                    placeholder="Nhập lời nhắn của bạn..."
                    className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#C1475A]"
                  />
                  {errors.loiNhan && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.loiNhan.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-full px-12 py-3 font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#C1475A" }}
                  >
                    GỬI NGAY
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
