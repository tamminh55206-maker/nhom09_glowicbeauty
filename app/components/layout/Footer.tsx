import Link from "next/link";

// Social Icons
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

// Payment Icons
function MomoIcon() {
  return (
    <div className="flex h-8 w-12 items-center justify-center rounded bg-white/20 text-xs font-bold text-white">
      MoMo
    </div>
  );
}

function SpayIcon() {
  return (
    <div className="flex h-8 w-12 items-center justify-center rounded bg-white/20 text-xs font-bold text-white">
      SPay
    </div>
  );
}

function VnpayIcon() {
  return (
    <div className="flex h-8 w-12 items-center justify-center rounded bg-white/20 text-xs font-bold text-white">
      VNPay
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#A53860" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Column 1: Logo & Company Info */}
          <div className="md:col-span-2">
            <h3
              className="text-2xl tracking-tight"
              style={{
                fontFamily: '"Mistesy", "Alice", serif',
                color: "#F9DBBD",
              }}
            >
              Glowic
            </h3>
            <p className="mt-1 text-sm text-white/80">beauty</p>
            <p className="mt-4 text-sm text-white/70">
              Trang điểm để bạn tỏa sáng, chăm sóc da để bạn giữ được ánh glow
              ấy.
            </p>

            {/* Company Info */}
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p className="font-semibold text-white/90">
                CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ GLOWIC
              </p>
              <p>Giấy CNĐKDN Số: 0427048766</p>
              <p>Địa chỉ: 1 Võ Văn Ngân, Phường Thủ Đức, TP.HCM</p>
            </div>
          </div>

          {/* Column 2: Danh mục */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#F9DBBD" }}
            >
              Danh mục
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Danh mục sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sort=flash-sale"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Flash Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/products?brand=all"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Thương hiệu nổi bật
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Bài test cá nhân
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Về Glowic */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#F9DBBD" }}
            >
              Về Glowic
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Chính sách trả hàng - hoàn tiền
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Điều khoản thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Yêu cầu xuất hóa đơn (VAT)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Khách hàng doanh nghiệp
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 & 5: Kết nối & Liên hệ */}
          <div className="md:col-span-1">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#F9DBBD" }}
            >
              Kết nối
            </h4>

            {/* Social Icons */}
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="text-white/80 transition-colors hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="text-white/80 transition-colors hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="text-white/80 transition-colors hover:text-white"
              >
                <TikTokIcon />
              </a>
              <a
                href="#"
                className="text-white/80 transition-colors hover:text-white"
              >
                <ZaloIcon />
              </a>
            </div>

            {/* Payment Methods */}
            <h4
              className="mt-6 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#F9DBBD" }}
            >
              Phương thức thanh toán
            </h4>
            <div className="mt-4 flex gap-2">
              <MomoIcon />
              <SpayIcon />
              <VnpayIcon />
            </div>

            {/* Contact Info */}
            <h4
              className="mt-6 text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#F9DBBD" }}
            >
              Thông tin liên hệ
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li className="font-semibold text-white">
                Hotline: 1900241202 (8:00-21:00)
              </li>
              <li>
                <a
                  href="tel:0870772779"
                  className="transition-colors hover:text-white"
                >
                  0870 772 779
                </a>
                {" - "}
                <a
                  href="tel:03999900024"
                  className="transition-colors hover:text-white"
                >
                  0399 990 0024
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@glowic.com"
                  className="transition-colors hover:text-white"
                >
                  sales@glowic.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:marketing@glowic.com"
                  className="transition-colors hover:text-white"
                >
                  marketing@glowic.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:cskh@glowicbeauty.vn"
                  className="transition-colors hover:text-white"
                >
                  cskh@glowicbeauty.vn
                </a>
              </li>
            </ul>

            {/* Support Links */}
            <div className="mt-6 space-y-2">
              <Link
                href="/faq"
                className="block text-sm font-semibold text-white transition-colors hover:text-white/80"
              >
                CÂU HỎI THƯỜNG GẶP
              </Link>
              <Link
                href="/contact"
                className="block text-sm font-semibold text-white transition-colors hover:text-white/80"
              >
                GÓP Ý - KHIẾU NẠI
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/60">
            © 2026 Glowic Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
