import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.3c-.35.5-.88.88-1.53 1.1-.65.22-1.4.33-2.23.33-.95 0-1.83-.15-2.62-.46a5.43 5.43 0 01-1.96-1.28 5.7 5.7 0 01-1.2-1.95c-.28-.75-.42-1.57-.42-2.44 0-.9.14-1.74.43-2.5.28-.77.68-1.44 1.2-2.01.5-.57 1.12-1.02 1.84-1.33.72-.32 1.52-.48 2.4-.48.74 0 1.4.1 1.98.3.58.2 1.07.48 1.47.83.4.35.7.76.9 1.23.2.47.3.97.3 1.5 0 .65-.12 1.24-.35 1.77-.23.53-.56 1-1 1.4-.43.4-.95.73-1.55.98-.6.25-1.27.4-2 .47l-.08.6c-.03.2-.06.4-.1.6-.04.2-.1.38-.17.55-.08.17-.18.32-.3.45-.13.13-.3.2-.5.2-.28 0-.5-.1-.68-.3-.17-.2-.26-.47-.26-.8 0-.35.06-.7.17-1.05.12-.35.28-.7.5-1.05.22-.35.5-.7.82-1.03.33-.33.7-.65 1.13-.95.43-.3.9-.58 1.42-.83.52-.25 1.08-.47 1.68-.65.6-.18 1.23-.32 1.9-.42l.15-.02c-.12-.28-.3-.5-.55-.65-.25-.15-.57-.23-.95-.23-.45 0-.9.1-1.35.3-.45.2-.88.45-1.3.75l-.25.18c-.2.15-.4.28-.62.4-.22.12-.47.18-.75.18-.4 0-.72-.12-.97-.35-.25-.23-.37-.53-.37-.9 0-.35.1-.67.3-.95.2-.28.48-.52.85-.72.36-.2.8-.35 1.3-.45.5-.1 1.05-.15 1.65-.15.7 0 1.35.08 1.95.25.6.17 1.12.42 1.57.75.45.33.8.74 1.05 1.23.25.48.38 1.03.38 1.65 0 .45-.05.9-.15 1.33z" />
    </svg>
  );
}

function PaymentChip({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      className={`flex h-9 min-w-[66px] items-center justify-center rounded-[6px] border border-white/25 px-3 text-xs font-semibold shadow-[0_4px_10px_rgba(69,9,32,0.14)] transition-colors duration-300 dark:border-white/15 ${className}`}
    >
      {label}
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold uppercase tracking-[0.02em] text-white">
      {children}
    </h3>
  );
}

const footerLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Danh mục sản phẩm" },
  { href: "/products?sort=flash-sale", label: "Flash Sale" },
  { href: "/products?brand=all", label: "Thương hiệu nổi bật" },
  { href: "/quiz", label: "Bài test cá nhân" },
];

const aboutLinks = [
  { href: "/about", label: "Về chúng tôi" },
  { href: "/faq", label: "Chính sách trả hàng - hoàn tiền" },
  { href: "/faq", label: "Chính sách giao hàng" },
  { href: "/faq", label: "Chính sách đổi trả" },
  { href: "/faq", label: "Chính sách bảo mật" },
  { href: "/faq", label: "Điều khoản thanh toán" },
  { href: "/faq", label: "Yêu cầu xuất hóa đơn (vat)" },
  { href: "/contact", label: "Tuyển dụng" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#DA627D] text-white transition-colors duration-300 dark:bg-[#2A1620]">
      <div className="mx-auto min-h-[599px] max-w-[1280px] px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mb-10 text-shadow-glowic lg:mb-8">
          <p className="font-mistesy text-[88px] leading-[0.78] text-white sm:text-[98px]">
            Glowic
          </p>
          <p
            className="mt-[-4px] pl-[136px] text-[28px] leading-none text-white sm:pl-[150px]"
            style={{ fontFamily: '"Alice", serif' }}
          >
            beauty
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr_1.1fr_1.15fr] lg:gap-10">
          <div>
            <div className="space-y-5">
              <FooterHeading>Thông Tin Liên Hệ</FooterHeading>

              <div className="space-y-3 text-[14px] leading-6 text-white/95">
                <p>Hotline: 1900241202 (8:00 - 21:00)</p>
                <p>Hợp tác kinh doanh hàng hóa: sales@glowic.com</p>
                <p>Hợp tác truyền thông/ Quảng cáo: marketing@glowic.com</p>
              </div>

              <div className="space-y-2 text-[14px] leading-6 text-white/95">
                <p className="font-medium uppercase">
                  CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI DỊCH VỤ GLOWIC
                </p>
                <p>Giấy CNĐKDN Số: 0427048766 do sở kế hoạch và đầu tư cấp ngày 24/2/2026</p>
              </div>

              <div className="flex max-w-[290px] items-start gap-3 text-[14px] leading-6 text-white/95">
                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                <p>1 Võ Văn Ngân, Phường Thủ Đức, Thành phố Hồ Chí Minh</p>
              </div>
            </div>
          </div>

          <div>
            <FooterHeading>Danh Mục</FooterHeading>
            <div className="mt-8 space-y-3 text-[15px] leading-6 text-white/95">
              {footerLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Về Glowic</FooterHeading>
            <div className="mt-8 space-y-3 text-[15px] leading-6 text-white/95">
              {aboutLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <FooterHeading>Kết Nối Với Chúng Tôi</FooterHeading>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-white">
                <a href="#" className="transition-opacity hover:opacity-80" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" className="transition-opacity hover:opacity-80" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="transition-opacity hover:opacity-80" aria-label="TikTok">
                  <TikTokIcon />
                </a>
                <a href="#" className="transition-opacity hover:opacity-80" aria-label="Zalo">
                  <ZaloIcon />
                </a>
              </div>
            </div>

            <div>
              <FooterHeading>Phương Thức Thanh Toán</FooterHeading>
              <div className="mt-5 flex flex-wrap gap-3">
                <PaymentChip label="momo" className="bg-[#8F1D6C] text-white" />
                <PaymentChip label="SPay" className="bg-white text-[#F58B00]" />
                <PaymentChip label="VNPAY" className="bg-white text-[#1262B3]" />
              </div>
            </div>

            <div>
              <Link
                href="/faq"
                className="block text-lg font-semibold uppercase tracking-[0.02em] transition-opacity hover:opacity-80"
              >
                Câu Hỏi Thường Gặp
              </Link>
              <Link
                href="/contact"
                className="mt-4 block text-lg font-semibold uppercase tracking-[0.02em] transition-opacity hover:opacity-80"
              >
                Góp Ý - Khiếu Nại
              </Link>
            </div>

            <div className="space-y-3 text-[14px] text-white/95">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:0870772779" className="transition-opacity hover:opacity-80">
                  0870 772 779 - 0399 990 0024
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href="mailto:cskh@glowicbeauty.vn"
                  className="transition-opacity hover:opacity-80"
                >
                  cskh@glowicbeauty.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}