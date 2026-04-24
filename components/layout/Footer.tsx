import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/utils";

/* ============================================
   Icons
   ============================================ */

function FacebookIcon() {
  return (
    <svg className="h-[26px] w-[26px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function ZaloIcon({ className = "h-[35px] w-[35px]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.3c-.35.5-.88.88-1.53 1.1-.65.22-1.4.33-2.23.33-.95 0-1.83-.15-2.62-.46a5.43 5.43 0 01-1.96-1.28 5.7 5.7 0 01-1.2-1.95c-.28-.75-.42-1.57-.42-2.44 0-.9.14-1.74.43-2.5.28-.77.68-1.44 1.2-2.01.5-.57 1.12-1.02 1.84-1.33.72-.32 1.52-.48 2.4-.48.74 0 1.4.1 1.98.3.58.2 1.07.48 1.47.83.4.35.7.76.9 1.23.2.47.3.97.3 1.5 0 .65-.12 1.24-.35 1.77-.23.53-.56 1-1 1.4-.43.4-.95.73-1.55.98-.6.25-1.27.4-2 .47l-.08.6c-.03.2-.06.4-.1.6-.04.2-.1.38-.17.55-.08.17-.18.32-.3.45-.13.13-.3.2-.5.2-.28 0-.5-.1-.68-.3-.17-.2-.26-.47-.26-.8 0-.35.06-.7.17-1.05.12-.35.28-.7.5-1.05.22-.35.5-.7.82-1.03.33-.33.7-.65 1.13-.95.43-.3.9-.58 1.42-.83.52-.25 1.08-.47 1.68-.65.6-.18 1.23-.32 1.9-.42l.15-.02c-.12-.28-.3-.5-.55-.65-.25-.15-.57-.23-.95-.23-.45 0-.9.1-1.35.3-.45.2-.88.45-1.3.75l-.25.18c-.2.15-.4.28-.62.4-.22.12-.47.18-.75.18-.4 0-.72-.12-.97-.35-.25-.23-.37-.53-.37-.9 0-.35.1-.67.3-.95.2-.28.48-.52.85-.72.36-.2.8-.35 1.3-.45.5-.1 1.05-.15 1.65-.15.7 0 1.35.08 1.95.25.6.17 1.12.42 1.57.75.45.33.8.74 1.05 1.23.25.48.38 1.03.38 1.65 0 .45-.05.9-.15 1.33z" />
    </svg>
  );
}

function PhoneIcon({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EnvelopeIcon({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function MapPinIcon({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function MomoIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white">
      MoMo
    </div>
  );
}

function SpayIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white">
      SPay
    </div>
  );
}

function VnpayIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded bg-white/20 text-[10px] font-bold text-white">
      VNPay
    </div>
  );
}

/* ============================================
   Footer
   ============================================ */

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#DA627D" }}>
      <div className="mx-auto max-w-[1280px] px-10 pb-10 pt-10">
        {/* Logo row */}
        <div className="mb-10">
          <Image
            src={assetPath("/images/logo/LOGO_white.svg")}
            alt="Glowic beauty"
            width={308}
            height={108}
            priority
          />
        </div>

        {/* 4 columns row */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Column 1: Contact Info */}
          <div className="flex flex-col gap-6">
            <h4
              className="text-lg font-semibold leading-[23px]"
              style={{ color: "#FFFFFF", fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              THÔNG TIN LIÊN HỆ
            </h4>

            <div className="flex flex-col gap-5 text-sm leading-[22px] text-white">
              <p>
                Hotline: 1900241202 (8:00-21:00)
                <br />
                Hợp tác kinh doanh hàng hoá: sales@glowic.com
                <br />
                Hợp tác truyền thông/ Quảng cáo: marketing@glowic.com
              </p>
              <p>
                CÔNG TY TNHH MỘT THÀNH VIÊN THƯƠNG MẠI DỊCH VỤ GLOWIC
                <br />
                Giấy CNĐKDN Số: 0427048766 do sở kế hoạch và đầu tư cấp ngày 24/2/2026
              </p>
            </div>

            <div className="flex items-start gap-2 text-sm leading-[18px] text-white">
              <MapPinIcon className="mt-0.5 h-[26px] w-[26px] shrink-0" />
              <span>
                1 Võ Văn Ngân, Phường Thủ Đức, Thành phố Hồ Chí Minh.
              </span>
            </div>
          </div>

          {/* Column 2: Danh mục */}
          <div className="flex flex-col gap-6">
            <h4
              className="text-lg font-semibold leading-[23px]"
              style={{ color: "#FFFFFF", fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              DANH MỤC
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "Trang chủ" },
                { href: "/products", label: "Danh mục sản phẩm" },
                { href: "/products?sort=flash-sale", label: "Flash Sale" },
                { href: "/products?brand=all", label: "Thương hiệu nổi bật" },
                { href: "/quiz", label: "Bài test cá nhân" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-[35px] text-white transition-opacity hover:opacity-80"
                    style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Về Glowic */}
          <div className="flex flex-col gap-6">
            <h4
              className="text-lg font-semibold leading-[23px]"
              style={{ color: "#FFFFFF", fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              VỀ GLOWIC
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/about", label: "Về chúng tôi" },
                { href: "/faq", label: "Chính sách trả hàng - hoàn tiền" },
                { href: "/faq", label: "Chính sách giao hàng" },
                { href: "/faq", label: "Chính sách đổi trả" },
                { href: "/faq", label: "Chính sách bảo mật" },
                { href: "/faq", label: "Điều khoản thanh toán" },
                { href: "/faq", label: "Yêu cầu xuất hóa đơn (vat)" },
                { href: "/contact", label: "Tuyển dụng" },
              ].map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-sm leading-[35px] text-white transition-opacity hover:opacity-80"
                    style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kết nối */}
          <div className="flex flex-col gap-6">
            <h4
              className="text-lg font-semibold leading-[23px]"
              style={{ color: "#FFFFFF", fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              KẾT NỐI VỚI CHÚNG TÔI
            </h4>

            <div className="flex items-center gap-[27px]">
              <a href="#" className="text-white transition-opacity hover:opacity-80">
                <FacebookIcon />
              </a>
              <a href="#" className="text-white transition-opacity hover:opacity-80">
                <InstagramIcon />
              </a>
              <a href="#" className="text-white transition-opacity hover:opacity-80">
                <TikTokIcon />
              </a>
              <a href="#" className="text-white transition-opacity hover:opacity-80">
                <ZaloIcon />
              </a>
            </div>

            <h4
              className="text-lg font-semibold leading-[23px]"
              style={{ color: "#FFFFFF", fontFamily: '"Be Vietnam Pro", sans-serif' }}
            >
              PHƯƠNG THỨC THANH TOÁN
            </h4>

            <div className="flex items-center gap-[18px]">
              <MomoIcon />
              <SpayIcon />
              <VnpayIcon />
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/faq"
                className="text-lg font-semibold leading-[23px] text-white transition-opacity hover:opacity-80"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                CÂU HỎI THƯỜNG GẶP
              </Link>
              <Link
                href="/contact"
                className="text-lg font-semibold leading-[23px] text-white transition-opacity hover:opacity-80"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                GÓP Ý - KHIẾU NẠI
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm leading-[18px] text-white">
              <PhoneIcon className="h-[26px] w-[26px] shrink-0" />
              <span>0870 772 779 - 0399 990 0024</span>
            </div>

            <div className="flex items-center gap-2 text-sm leading-[18px] text-white">
              <EnvelopeIcon className="h-[26px] w-[26px] shrink-0" />
              <span>cskh@glowicbeauty.vn</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}