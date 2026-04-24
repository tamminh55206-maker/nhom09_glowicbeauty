"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

const faqSections = [
  {
    category: "Tài khoản",
    questions: [
      {
        q: "Đăng ký thành viên Glowic như thế nào?",
        a: 'Quý khách vui lòng nhấn vào nút "Đăng nhập/Đăng ký" ở góc phải màn hình, điền đầy đủ thông tin được yêu cầu và chọn "Đăng ký" để hoàn tất.',
      },
      {
        q: "Tại sao tôi không thể đăng nhập vào tài khoản của tôi?",
        a: "Vui lòng kiểm tra lại số điện thoại và mật khẩu. Nếu quên mật khẩu, hãy sử dụng chức năng 'Quên mật khẩu' để đặt lại. Nếu vẫn không đăng nhập được, liên hệ hotline 1900241202 để được hỗ trợ.",
      },
    ],
  },
  {
    category: "Đặt hàng",
    questions: [
      {
        q: "Tôi có thể đặt hàng qua điện thoại được không?",
        a: "Có, quý khách có thể đặt hàng qua hotline 1900241202 (8:00-21:00). Nhân viên tư vấn sẽ hỗ trợ bạn chọn sản phẩm và xử lý đơn hàng.",
      },
      {
        q: "Tôi muốn thay đổi hoặc hủy bỏ đơn hàng đã mua thì sao?",
        a: "Quý khách có thể thay đổi hoặc hủy đơn hàng trong vòng 24 giờ kể từ khi đặt hàng bằng cách liên hệ hotline hoặc email cskh@glowicbeauty.vn.",
      },
    ],
  },
  {
    category: "Phí vận chuyển",
    questions: [
      {
        q: "Phí vận chuyển của Glowic như thế nào?",
        a: "Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Đơn hàng dưới 500.000đ phí vận chuyển 30.000đ. Thời gian giao hàng 2-5 ngày làm việc.",
      },
    ],
  },
  {
    category: "Đổi trả - hoàn tiền",
    questions: [
      {
        q: "Chính sách đổi trả",
        a: "Glowic chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện sản phẩm còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ bao bì.",
      },
      {
        q: "Cách thức đổi trả",
        a: "Liên hệ hotline 1900241202 hoặc email cskh@glowicbeauty.vn để được hướng dẫn quy trình đổi trả. Glowic sẽ hoàn tiền trong vòng 3-5 ngày làm việc.",
      },
    ],
  },
  {
    category: "Xuất hóa đơn",
    questions: [
      {
        q: "Đối với mua tại cửa hàng",
        a: "Quý khách yêu cầu xuất hóa đơn VAT ngay tại thời điểm mua hàng. Vui lòng cung cấp đầy đủ thông tin công ty cho nhân viên thu ngân.",
      },
      {
        q: "Đối với mua online",
        a: "Quý khách gửi yêu cầu xuất hóa đơn VAT qua email cskh@glowicbeauty.vn trong vòng 24 giờ sau khi nhận hàng kèm theo thông tin công ty.",
      },
    ],
  },
];

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
    <div className="overflow-hidden rounded-[4px]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[30px] w-full items-center justify-between gap-4 px-3 py-[7px] text-left transition-colors duration-200"
        style={{ backgroundColor: "#f8c8d2" }}
      >
        <span
          className="pr-4 text-[13px] leading-[1.25] font-medium"
          style={{ color: "#5e2431" }}
        >
          {question}
        </span>
        <span
          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-200 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          style={{ color: "#b45267" }}
        >
          <Plus className="h-[14px] w-[14px]" strokeWidth={2.2} />
        </span>
      </button>

      {isOpen ? (
        <div className="border-t border-white/60 px-3 py-3" style={{ backgroundColor: "#fde9ee" }}>
          <p className="text-[13px] leading-6 text-[#6c5260]">{answer}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[#ebe0e3] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[12px] text-[#7d6a72]">
            <Link href="/" className="transition-colors hover:text-[#a53860]">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#c6b1b6]" />
            <span className="text-[#725862]">Câu hỏi thường gặp</span>
          </nav>
        </div>
      </div>

      <div
        className="flex min-h-[37px] items-center justify-center px-4 text-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(251, 221, 226, 0.92) 0%, rgba(248, 203, 212, 0.96) 55%, rgba(250, 220, 225, 0.92) 100%)",
        }}
      >
        <h1
          className="pt-[1px] text-[26px] leading-none font-bold sm:text-[30px]"
          style={{
            color: "#cf6c82",
            fontFamily: '"Black Mango", serif',
            textShadow: "0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          Câu hỏi thường gặp
        </h1>
      </div>

      <div className="mx-auto max-w-[860px] px-4 pb-14 pt-6 sm:px-6 sm:pt-7">
        <div className="space-y-6">
          {faqSections.map((category, categoryIndex) => (
            <section
              key={category.category}
              className="grid gap-2 sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-3"
            >
              <div className="pt-[2px] sm:text-right">
                <h2
                  className="text-[15px] leading-6 font-semibold whitespace-nowrap"
                  style={{ color: "#bf5369" }}
                >
                  {category.category}
                </h2>
              </div>

              <div className="space-y-[7px]">
                {category.questions.map((q, qIndex) => {
                  const itemId = `${categoryIndex}-${qIndex}`;
                  return (
                    <AccordionItem
                      key={itemId}
                      question={q.q}
                      answer={q.a}
                      isOpen={openItem === itemId}
                      onToggle={() => handleToggle(itemId)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[520px] text-center text-[11px] leading-5 text-[#8e7d83] italic">
          <p>
            Hy vọng những thông tin trên đã giúp ích cho bạn.
          </p>
          <p>
            Nếu bạn còn thắc mắc nào khác, hãy để lại lời nhắn ở trang{" "}
            <Link
              href="/contact"
              className="font-medium underline transition-colors hover:text-[#a53860]"
              style={{ color: "#c1475a" }}
            >
              Liên hệ
            </Link>
            {" "}mình sẽ phản hồi thật sớm.
          </p>
        </div>
      </div>
    </div>
  );
}
