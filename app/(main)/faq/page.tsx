"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Minus, Plus } from "lucide-react";

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

const blackMangoFontStyle = {
  fontFamily: '"Black Mango", serif',
} as const;

const faqSections = [
  {
    category: "Tài khoản",
    questions: [
      {
        q: "Đăng ký thành viên Glowic như thế nào?",
        a: "Quý khách vui lòng nhấn vào nút Đăng nhập/Đăng ký ở góc phải màn hình trên desktop. Với mobile, chọn biểu tượng Menu rồi chọn Đăng nhập/Đăng ký. Sau đó điền đầy đủ các thông tin được yêu cầu và nhấn nút Đăng ký để hoàn tất.",
      },
      {
        q: "Tại sao tôi không thể đăng nhập vào tài khoản của tôi?",
        a: "Quý khách vui lòng kiểm tra kỹ kiểu gõ và phím Caps Lock khi nhập thông tin đăng nhập. Nếu vẫn không thành công, hãy chọn Quên mật khẩu và nhập email hoặc số điện thoại đã đăng ký. Hệ thống sẽ gửi đường dẫn đặt lại mật khẩu qua email hoặc SMS.",
      },
    ],
  },
  {
    category: "Đặt hàng",
    questions: [
      {
        q: "Tôi có thể đặt hàng qua điện thoại được không?",
        a: "Có. Quý khách có thể liên hệ hotline 1900241202 trong khung giờ hỗ trợ để được tư vấn sản phẩm, xác nhận thông tin nhận hàng và tạo đơn trực tiếp với nhân viên chăm sóc khách hàng.",
      },
      {
        q: "Tôi muốn thay đổi hoặc hủy bỏ đơn hàng đã mua thì sao?",
        a: "Quý khách có thể thay đổi hoặc hủy đơn hàng khi đơn chưa được giao thành công. Vui lòng liên hệ Glowic qua hotline hoặc email cskh@glowicbeauty.vn sớm nhất để được hỗ trợ kiểm tra và xử lý đơn.",
      },
    ],
  },
  {
    category: "Phí vận chuyển",
    questions: [
      {
        q: "Phí vận chuyển của Glowic như thế nào?",
        a: "Glowic áp dụng miễn phí vận chuyển với các đơn hàng đạt điều kiện khuyến mãi theo từng thời điểm. Với các đơn chưa đủ điều kiện, phí giao hàng sẽ được hiển thị rõ tại bước thanh toán trước khi quý khách xác nhận đơn.",
      },
    ],
  },
  {
    category: "Đổi trả - hoàn tiền",
    questions: [
      {
        q: "Chính sách đổi trả",
        a: "Glowic hỗ trợ đổi trả theo chính sách hiện hành đối với sản phẩm lỗi do nhà sản xuất hoặc giao sai sản phẩm. Sản phẩm cần còn nguyên tem, hộp và đầy đủ phụ kiện đi kèm để được tiếp nhận xử lý.",
      },
      {
        q: "Cách thức đổi trả",
        a: "Quý khách vui lòng liên hệ Glowic qua hotline 1900241202 hoặc email cskh@glowicbeauty.vn, cung cấp mã đơn hàng và hình ảnh sản phẩm. Bộ phận chăm sóc khách hàng sẽ hướng dẫn chi tiết quy trình đổi trả hoặc hoàn tiền phù hợp.",
      },
    ],
  },
  {
    category: "Xuất hóa đơn",
    questions: [
      {
        q: "Đối với mua tại cửa hàng",
        a: "Quý khách vui lòng yêu cầu xuất hóa đơn VAT ngay tại thời điểm thanh toán và cung cấp đầy đủ thông tin công ty cho nhân viên cửa hàng để được hỗ trợ lập hóa đơn đúng quy định.",
      },
      {
        q: "Đối với mua online",
        a: "Với đơn mua online, quý khách vui lòng gửi yêu cầu xuất hóa đơn đến cskh@glowicbeauty.vn kèm mã đơn hàng và thông tin doanh nghiệp trong thời gian Glowic tiếp nhận theo chính sách để được hỗ trợ nhanh nhất.",
      },
    ],
  },
 ] as const;

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4.5 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`relative flex h-10.75 w-full items-center gap-2.5 rounded-[8px] px-2.5 text-left transition-colors duration-300 ${
          isOpen
            ? "bg-[#FFA5AB] dark:bg-[#4A2C39]"
            : "bg-[rgba(255,165,171,0.5)] hover:bg-[#FFA5AB] dark:bg-[#2D1C24] dark:hover:bg-[#4A2C39]"
        }`}
      >
        <span
          className="max-w-[calc(100%-32px)] text-[18px] leading-5.75 font-normal text-black transition-colors duration-300 dark:text-[#F6E8ED]"
          style={beVietnamFontStyle}
        >
          {question}
        </span>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black transition-colors duration-300 dark:text-[#F6E8ED]">
          {isOpen ? (
            <Minus className="h-3.75 w-3.75 stroke-[1.5]" />
          ) : (
            <Plus className="h-3.75 w-3.75 stroke-[1.5]" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="px-3.5 pb-0.5 pt-0">
              <p
                className="max-w-143.75 text-justify text-[18px] leading-5.75 font-normal text-black transition-colors duration-300 dark:text-[#F6E8ED]"
                style={beVietnamFontStyle}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (itemId: string) => {
    setOpenItem((currentItem) =>
      currentItem === itemId ? null : itemId,
    );
  };

  return (
    <div className="bg-white transition-colors duration-300 dark:bg-[#140F13]">
      <div className="border-b border-[#E6E0E3] bg-white transition-colors duration-300 dark:border-[#594A52] dark:bg-[#140F13]">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-3.5 sm:px-6 lg:px-10">
          <nav
            className="flex items-center gap-1.5 text-[12px] leading-3.75 text-[#5B4F54] transition-colors duration-300 dark:text-[#F3E1E7]"
            style={beVietnamFontStyle}
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#A53860] dark:hover:text-[#F3AABD]"
            >
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#A79AA0] transition-colors duration-300 dark:text-[#CDB7BF]" />
            <span>Câu hỏi thường gặp</span>
          </nav>
        </div>
      </div>

      <section className="mx-auto min-h-211.25 max-w-7xl pb-19">
        <div className="mt-3 h-20 bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFFF_25.48%,rgba(255,165,171,0.5)_100%)] transition-colors duration-300 dark:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(243,170,189,0.16)_0%,rgba(20,15,19,1)_100%)]" />

        <div className="-mt-15.25 flex justify-center px-4">
          <div className="w-full max-w-219">
            <div className="flex justify-center">
              <h1
                className="bg-[linear-gradient(170.56deg,#DA627D_5.47%,#450920_256.63%)] bg-clip-text text-center text-[32px] font-black leading-12.25 text-transparent dark:bg-[linear-gradient(170.56deg,#F3AABD_5.47%,#FFF1F5_256.63%)]"
                style={{
                  ...blackMangoFontStyle,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Câu hỏi thường gặp
              </h1>
            </div>

            <div className="mt-12.75 flex flex-col gap-10">
              {faqSections.map((section, sectionIndex) => (
                <section
                  key={section.category}
                  className="grid gap-4 lg:grid-cols-[226px_minmax(0,630px)] lg:gap-5"
                >
                  <div className="flex items-start justify-start lg:justify-end">
                    <h2
                      className="pt-1 text-left text-[24px] leading-7.5 font-bold text-[#A53860] transition-colors duration-300 dark:text-[#FFB7CA] lg:text-right"
                      style={beVietnamFontStyle}
                    >
                      {section.category}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    {section.questions.map((item, itemIndex) => {
                      const itemId = `${sectionIndex}-${itemIndex}`;

                      return (
                        <AccordionItem
                          key={itemId}
                          question={item.q}
                          answer={item.a}
                          isOpen={openItem === itemId}
                          onToggle={() => handleToggle(itemId)}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 flex justify-center px-4">
              <p
                className="max-w-181.75 text-center text-[16px] leading-5 font-light italic text-[#450920] transition-colors duration-300 dark:text-[#DABBC6]"
                style={beVietnamFontStyle}
              >
                Hy vọng những thông tin trên đã giúp ích cho bạn.
                <br />
                Nếu bạn còn thắc mắc nào khác, hãy để lại lời nhắn ở trang{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-black transition-colors duration-200 hover:text-[#FF8FA3] dark:text-[#F6E8ED] dark:hover:text-[#F3AABD]"
                >
                  Liên hệ
                </Link>
                , mình sẽ phản hồi thật sớm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
