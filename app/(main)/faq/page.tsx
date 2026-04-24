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
    <div className="overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-[10px] py-[10px] text-left transition-all duration-300"
        style={{
          background: 'rgba(255, 165, 171, 0.5)',
          borderRadius: '8px',
          height: '43px'
        }}
      >
        <span className="pr-4 text-[18px] font-normal text-black dark:text-white" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          {question}
        </span>
        <span className="flex-shrink-0 relative w-[15px] h-[15px]">
          <div 
            className="absolute top-1/2 left-0 w-full border-t-[1.5px] border-black"
            style={{ transform: 'translateY(-50%)' }}
          />
          <div 
            className={`absolute top-0 left-1/2 h-full border-l-[1.5px] border-black transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
            style={{ transform: 'translateX(-50%)' }}
          />
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
            <div className="px-2 pt-4 pb-4">
              <p 
                className="text-[18px] text-black dark:text-gray-300 leading-[23px] text-justify"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
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
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#A53860]">
              Trang chủ
            </Link>
            <span className="mx-1">&gt;</span>
            <span>Câu hỏi thường gặp</span>
          </nav>
        </div>
      </div>

      <div 
        className="relative h-[80px] w-full flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 25.48%, rgba(255, 165, 171, 0.5) 100%)'
        }}
      >
        <h1
          className="relative z-10 text-[32px] font-[900]"
          style={{ 
            fontFamily: '"Black Mango", serif',
            background: 'linear-gradient(170.56deg, #DA627D 5.47%, #450920 256.63%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Câu hỏi thường gặp
        </h1>
      </div>

      {/* FAQ Content */}
      <div className="mx-auto max-w-3xl px-4 pt-14 pb-16">
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="flex gap-6">
              {/* Category Name */}
              <div className="hidden w-[180px] flex-shrink-0 text-right sm:block pt-0">
                <h2
                  className="font-bold text-[#A53860] dark:text-pink-400 text-[24px] leading-[30px]"
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="flex-1 space-y-3">
                {/* Mobile Category Name */}
                <h2
                  className="mb-4 font-semibold text-[#450920] dark:text-white text-lg sm:hidden"
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
        <div className="mt-16 text-center text-[16px] leading-[20px] text-[#450920] dark:text-pink-200">
          <p className="italic font-[300]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Hy vọng những thông tin trên đã giúp ích cho bạn. Nếu bạn còn thắc mắc nào khác, hãy để lại lời nhắn ở trang{" "}
            <Link
              href="/contact"
              className="font-[600] italic hover:underline"
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
