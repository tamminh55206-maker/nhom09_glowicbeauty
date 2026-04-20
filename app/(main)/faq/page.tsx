"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, X } from "lucide-react";

// FAQ Data
const faqData = [
  {
    category: "Tài khoản",
    questions: [
      {
        q: "Đăng ký thành viên Glowic như thế nào?",
        a: 'Quý khách vui lòng nhấn vào nút "Đăng nhập/Đăng ký" (Đối với Desktop) trên góc phải màn hình, chọn biểu tượng Menu rồi chọn "Đăng nhập/Đăng ký" (Đối với Mobile). Vui lòng điền đầy đủ các thông tin được yêu cầu và nhấn nút "Đăng ký".',
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
        a: "Quý khách yêu cầu xuất hóa đơn VAT ngay tại thờI điểm mua hàng. Vui lòng cung cấp thông tin công ty đầy đủ cho nhân viên thu ngân.",
      },
      {
        q: "Đối với mua online",
        a: "Quý khách gửi yêu cầu xuất hóa đơn VAT qua email cskh@glowicbeauty.vn trong vòng 24 giờ sau khi nhận hàng kèm theo thông tin công ty.",
      },
    ],
  },
];

// Accordion Item Component
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  itemId,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  itemId: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between p-4 text-left transition-colors ${
          isOpen ? "bg-rose-200" : "bg-rose-100 hover:bg-rose-200/50"
        }`}
      >
        <span className="pr-4 font-medium" style={{ color: "#450920" }}>
          {question}
        </span>
        <span className="flex-shrink-0">
          {isOpen ? (
            <X className="h-5 w-5" style={{ color: "#A53860" }} />
          ) : (
            <Plus className="h-5 w-5" style={{ color: "#A53860" }} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-rose-50 px-4 py-4">
              <p className="text-gray-700 leading-relaxed">{answer}</p>
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
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Breadcrumb */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span style={{ color: "#450920" }}>Câu hỏi thường gặp</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="py-12 text-center">
        <h1
          className="text-3xl font-bold"
          style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
        >
          Câu hỏi thường gặp
        </h1>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="flex gap-6">
              {/* Category Name */}
              <div className="hidden w-[150px] flex-shrink-0 sm:block">
                <h2
                  className="sticky top-24 font-semibold"
                  style={{ color: "#450920" }}
                >
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="flex-1 space-y-3">
                {/* Mobile Category Name */}
                <h2
                  className="mb-3 font-semibold sm:hidden"
                  style={{ color: "#450920" }}
                >
                  {category.category}
                </h2>

                {category.questions.map((q, qIndex) => {
                  const itemId = `${categoryIndex}-${qIndex}`;
                  return (
                    <AccordionItem
                      key={itemId}
                      question={q.q}
                      answer={q.a}
                      isOpen={openItem === itemId}
                      onToggle={() => handleToggle(itemId)}
                      itemId={itemId}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Hy vọng những thông tin trên đã giúp ích cho bạn.
          </p>
          <p className="mt-2 text-gray-600">
            Nếu bạn còn thắc mắc nào khác, hãy để lại lởi nhắn ở trang{" "}
            <Link
              href="/contact"
              className="font-medium underline transition-colors hover:text-rose-500"
              style={{ color: "#C1475A" }}
            >
              Liên hệ
            </Link>
            , mình sẽ phản hồi thật sớm.
          </p>
        </div>
      </div>
    </div>
  );
}
