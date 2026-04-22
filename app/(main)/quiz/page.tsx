"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { products } from "@/lib/data";
import { useQuizStore } from "@/lib/store";

// Quiz Data - Part 1: Skin Type (5 questions)
const skinTypeQuestions = [
  {
    id: 1,
    section: "PHẦN 1: BẠN THUỘC LOẠI DA NÀO?",
    question:
      "Sau khi rửa mặt sạch và chờ 20–30 phút không thoa bất kỳ sản phẩm gì, da bạn cảm thấy:",
    options: [
      { key: "A", text: "Căng rát, khô ráp, như kéo da" },
      { key: "B", text: "Mềm mại, cân bằng, dễ chịu" },
      {
        key: "C",
        text: "Vùng trán-mũi hơi bóng dầu, hai má hơi khô hoặc căng",
      },
      { key: "D", text: "Toàn mặt bóng dầu, nhờn rít" },
      { key: "E", text: "Da hơi đỏ, châm chích hoặc khó chịu" },
    ],
  },
  {
    id: 2,
    section: "PHẦN 1: BẠN THUỘC LOẠI DA NÀO?",
    question: "Trong ngày, da bạn bóng dầu nhiều nhất ở đâu?",
    options: [
      { key: "A", text: "Không bóng dầu, thậm chí khô" },
      { key: "B", text: "Ít hoặc không bóng" },
      { key: "C", text: "Chỉ ở vùng T-zone (trán – mũi – cằm)" },
      { key: "D", text: "Khắp mặt, đặc biệt nhiều dầu" },
      { key: "E", text: "Không rõ bóng dầu nhưng da dễ đỏ hoặc kích ứng" },
    ],
  },
  {
    id: 3,
    section: "PHẦN 1: BẠN THUỘC LOẠI DA NÀO?",
    question: "Da bạn có thường bị bong tróc, khô nứt hoặc căng rát không?",
    options: [
      { key: "A", text: "Có, thường xuyên (đặc biệt má và quanh miệng)" },
      { key: "B", text: "Hiếm khi" },
      { key: "C", text: "Chỉ ở vùng má" },
      { key: "D", text: "Không bao giờ" },
      { key: "E", text: "Không khô nhưng dễ mẩn đỏ, ngứa hoặc kích ứng" },
    ],
  },
  {
    id: 4,
    section: "PHẦN 1: BẠN THUỘC LOẠI DA NÀO?",
    question: "Khi thử sản phẩm mới, da bạn thường phản ứng thế nào?",
    options: [
      { key: "A", text: "Hấp thụ tốt, da cải thiện" },
      { key: "B", text: "Không có phản ứng gì đặc biệt" },
      { key: "C", text: "Tốt ở má nhưng T-zone dễ dầu hoặc mụn" },
      { key: "D", text: "Dễ bóng dầu hơn hoặc nổi mụn" },
      { key: "E", text: "Dễ đỏ, ngứa, châm chích hoặc mẩn" },
    ],
  },
  {
    id: 5,
    section: "PHẦN 1: BẠN THUỘC LOẠI DA NÀO?",
    question: "Tổng thể, da bạn dễ gặp vấn đề gì nhất?",
    options: [
      { key: "A", text: "Khô ráp, thiếu ẩm, xỉn màu" },
      { key: "B", text: "Không có vấn đề rõ rệt, da cân bằng" },
      { key: "C", text: "Dầu ở T-zone + khô ở má" },
      { key: "D", text: "Dầu thừa nhiều, dễ mụn đầu đen" },
      { key: "E", text: "Dễ kích ứng, đỏ ửng, nhạy cảm với sản phẩm" },
    ],
  },
];

// Quiz Data - Part 2: Personal Color (5 questions)
const personalColorQuestions = [
  {
    id: 6,
    section: "PHẦN 2: PERSONAL COLOR CỦA BẠN LÀ GÌ?",
    question:
      "Nhìn tĩnh mạch ở mặt trong cổ tay dưới ánh sáng tự nhiên, bạn thấy màu gì rõ nhất?",
    options: [
      { key: "A", text: "Xanh lá hoặc xanh vàng" },
      { key: "B", text: "Xanh dương hoặc tím nhạt" },
      { key: "C", text: "Khó phân biệt, lẫn lộn" },
    ],
  },
  {
    id: 7,
    section: "PHẦN 2: PERSONAL COLOR CỦA BẠN LÀ GÌ?",
    question: "Màu trang sức nào làm da bạn trông sáng và khỏe hơn?",
    options: [
      { key: "A", text: "Vàng hoặc đồng" },
      { key: "B", text: "Bạc hoặc platinum" },
      { key: "C", text: "Cả hai đều ổn, không rõ khác biệt" },
    ],
  },
  {
    id: 8,
    section: "PHẦN 2: PERSONAL COLOR CỦA BẠN LÀ GÌ?",
    question: "Bạn mặc áo trắng tinh, thì da trông như thế nào?",
    options: [
      { key: "A", text: "Da bị xỉn, mệt mỏi hoặc hơi vàng" },
      { key: "B", text: "Da sáng lên rõ rệt" },
      { key: "C", text: "Bình thường, không thay đổi nhiều" },
    ],
  },
  {
    id: 9,
    section: "PHẦN 2: PERSONAL COLOR CỦA BẠN LÀ GÌ?",
    question:
      "Tone son môi hoặc má hồng nào thường làm da bạn tươi và tự nhiên nhất?",
    options: [
      { key: "A", text: "Cam đào, đỏ cam" },
      { key: "B", text: "Hồng lạnh, đỏ hồng tím" },
      { key: "C", text: "Nude hoặc trung tính" },
    ],
  },
  {
    id: 10,
    section: "PHẦN 2: PERSONAL COLOR CỦA BẠN LÀ GÌ?",
    question: "Da bạn khi ra nắng thường phản ứng ra sao?",
    options: [
      { key: "A", text: "Rám nắng nhanh, chuyển sang tone vàng/nâu đẹp" },
      { key: "B", text: "Dễ bỏng đỏ trước, sau mới rám nhẹ" },
      { key: "C", text: "Ít thay đổi rõ rệt" },
    ],
  },
];

const allQuestions = [...skinTypeQuestions, ...personalColorQuestions];

// Calculate skin type result
const getSkinType = (skinAnswers: string[]) => {
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  skinAnswers.forEach((a) => {
    if (count[a] !== undefined) count[a]++;
  });
  const max = Math.max(...Object.values(count));

  if (count.E === max) return "sensitive";
  if (count.A === max) return "dry";
  if (count.B === max) return "normal";
  if (count.C === max) return "combination";
  if (count.D === max) return "oily";
  return "normal";
};

// Calculate personal color result
const getPersonalColor = (colorAnswers: string[]) => {
  let warm = 0,
    cool = 0,
    neutral = 0;
  colorAnswers.forEach((a) => {
    if (a === "A") warm++;
    else if (a === "B") cool++;
    else neutral++;
  });
  if (warm >= 3) return "warm";
  if (cool >= 3) return "cool";
  return "neutral";
};

// Skin type results
const skinTypeResults: Record<
  string,
  {
    title: string;
    desc: string;
    skincare: { name: string; benefit: string; slug: string }[];
    makeup: { name: string; benefit: string; slug: string }[];
  }
> = {
  dry: {
    title: "Da Khô (Dry Skin)",
    desc: "Da bạn cần dưỡng ẩm sâu và phục hồi barrier để giảm căng rát, bong tróc.",
    skincare: [
      {
        name: "Cocoon Rose Serum 30ml",
        benefit: "Cấp ẩm sâu & phục hồi da",
        slug: "cocoon-rose-serum-30ml",
      },
      {
        name: "Cocoon Ben Tre Coconut Lip Balm 5g",
        benefit: "Dưỡng môi mềm mịn",
        slug: "cocoon-ben-tre-coconut-lip-balm-5g",
      },
      {
        name: "Cocoon Winter Melon Gel Cream 30ml",
        benefit: "Dưỡng ẩm nhẹ ban ngày",
        slug: "cocoon-winter-melon-gel-cream-30ml",
      },
    ],
    makeup: [
      {
        name: "Maybelline Lifter Gloss 5.4ml",
        benefit: "Son bóng dưỡng môi căng mọng",
        slug: "maybelline-lifter-gloss-54ml",
      },
      {
        name: "Maybelline Super Stay 30H Lumi Matte Foundation",
        benefit: "Kem nền sáng tự nhiên",
        slug: "maybelline-super-stay-30h-lumi-matte-foundation",
      },
    ],
  },
  normal: {
    title: "Da Thường (Normal Skin)",
    desc: "Da bạn cân bằng tốt, dễ chăm sóc. Hãy duy trì và thêm sáng da dần.",
    skincare: [
      {
        name: "Cocoon Winter Melon Gel Cream 30ml",
        benefit: "Dưỡng ẩm & cân bằng",
        slug: "cocoon-winter-melon-gel-cream-30ml",
      },
      {
        name: "L'Oréal Glycolic Bright Glowing Peeling Toner",
        benefit: "Làm sáng & đều màu da",
        slug: "loreal-glycolic-bright-glowing-peeling-toner",
      },
      {
        name: "Cocoon Hung Yen Turmeric Gel Cream",
        benefit: "Dưỡng sáng từ nghệ",
        slug: "cocoon-hung-yen-turmeric-gel-cream",
      },
    ],
    makeup: [
      {
        name: "Maybelline Super Stay 30H Lumi Matte Foundation",
        benefit: "Kem nền mỏng nhẹ",
        slug: "maybelline-super-stay-30h-lumi-matte-foundation",
      },
      {
        name: "3CE Face Blush 5.5g",
        benefit: "Má hồng tươi tắn",
        slug: "3ce-face-blush-55g",
      },
    ],
  },
  combination: {
    title: "Da Hỗn Hợp (Combination Skin)",
    desc: "Da bạn cần kiểm soát dầu T-zone và dưỡng ẩm vùng má.",
    skincare: [
      {
        name: "Cocoon Winter Melon Cleanser 310ml",
        benefit: "Làm sạch dầu thừa, dịu nhẹ",
        slug: "cocoon-winter-melon-cleanser-310ml",
      },
      {
        name: "Cocoon Winter Melon Serum 70ml",
        benefit: "Giảm mụn & kiểm soát dầu",
        slug: "cocoon-winter-melon-serum-70ml",
      },
      {
        name: "Cocoon Winter Melon Gel Cream 30ml",
        benefit: "Dưỡng ẩm không gây bí",
        slug: "cocoon-winter-melon-gel-cream-30ml",
      },
    ],
    makeup: [
      {
        name: "L'Oréal Infallible 32H Matte Cover Foundation",
        benefit: "Kiềm dầu tốt",
        slug: "loreal-infallible-32h-matte-cover-foundation",
      },
      {
        name: "Maybelline Super Stay Matte Ink City Edition",
        benefit: "Son kem lì lâu trôi",
        slug: "maybelline-super-stay-matte-ink-city-edition",
      },
    ],
  },
  oily: {
    title: "Da Dầu (Oily Skin)",
    desc: "Da bạn cần kiểm soát dầu mạnh, ngừa mụn và mattifying.",
    skincare: [
      {
        name: "Cocoon Winter Melon Cleanser 310ml",
        benefit: "Làm sạch sâu, kiểm soát dầu",
        slug: "cocoon-winter-melon-cleanser-310ml",
      },
      {
        name: "Cocoon Winter Melon Serum 70ml",
        benefit: "Giảm mụn & thâm mụn",
        slug: "cocoon-winter-melon-serum-70ml",
      },
      {
        name: "Cocoon Winter Melon Sunscreen SPF50+",
        benefit: "Chống nắng không bóng dầu",
        slug: "cocoon-winter-melon-sunscreen-spf50",
      },
    ],
    makeup: [
      {
        name: "L'Oréal Infallible 32H Matte Cover Foundation",
        benefit: "Kem nền kiềm dầu cực tốt",
        slug: "loreal-infallible-32h-matte-cover-foundation",
      },
      {
        name: "Maybelline Super Stay 30H Flex Powder",
        benefit: "Phấn phủ kiềm dầu mạnh",
        slug: "maybelline-super-stay-30h-flex-powder",
      },
    ],
  },
  sensitive: {
    title: "Da Nhạy Cảm (Sensitive Skin)",
    desc: "Da bạn cần sản phẩm dịu nhẹ, tránh kích ứng.",
    skincare: [
      {
        name: "Cocoon Winter Melon Micellar Water 500ml",
        benefit: "Tẩy trang & làm sạch dịu nhẹ",
        slug: "cocoon-winter-melon-micellar-water-500ml",
      },
      {
        name: "Cocoon Rose Serum 30ml",
        benefit: "Phục hồi & cấp ẩm nhẹ nhàng",
        slug: "cocoon-rose-serum-30ml",
      },
      {
        name: "Cocoon Winter Melon Sunscreen SPF50+",
        benefit: "Chống nắng cho da nhạy cảm",
        slug: "cocoon-winter-melon-sunscreen-spf50",
      },
    ],
    makeup: [
      {
        name: "Maybelline Lifter Gloss 5.4ml",
        benefit: "Son bóng dưỡng môi, ít kích ứng",
        slug: "maybelline-lifter-gloss-54ml",
      },
      {
        name: "Maybelline Instant Age Rewind Concealer",
        benefit: "Che khuyết điểm dịu nhẹ",
        slug: "maybelline-instant-age-rewind-concealer",
      },
    ],
  },
};

// Personal color results
const personalColorResults: Record<
  string,
  { title: string; desc: string; tips: string }
> = {
  warm: {
    title: "Warm Tone 🌅",
    desc: "Da bạn có tone ấm, hợp với màu sắc đất, cam, vàng, đỏ cam.",
    tips: "Ưu tiên son cam đào, đỏ cam, má hồng peach. Tránh màu lạnh như hồng tím.",
  },
  cool: {
    title: "Cool Tone 🌙",
    desc: "Da bạn có tone lạnh, hợp với màu hồng, tím, đỏ hồng, bạc.",
    tips: "Ưu tiên son hồng lạnh, đỏ hồng tím, má hồng rose. Tránh màu cam quá ấm.",
  },
  neutral: {
    title: "Neutral Tone ✨",
    desc: "Da bạn trung tính, linh hoạt với nhiều màu sắc khác nhau.",
    tips: "May mắn! Bạn hợp với hầu hết màu sắc. Thử nghiệm thoải mái!",
  },
};

// Get product info by name (fuzzy match)
const getProductInfo = (productName: string) => {
  const searchTerm = productName.toLowerCase().split(" ").slice(0, 3).join(" ");
  const found = products.find((p) => p.name.toLowerCase().includes(searchTerm));
  return {
    slug: found ? `/products/${found.slug}` : "/products",
    image:
      found?.images[0] || "https://placehold.co/300x300/f9a8d4/9f1239?text=SP",
  };
};

// Product Card Component
function ProductCard({
  product,
}: {
  product: { name: string; benefit: string; slug: string };
}) {
  const { slug, image } = getProductInfo(product.name);
  return (
    <Link href={slug} className="group block">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="150px"
          />
        </div>
        <div className="p-3">
          <h4
            className="line-clamp-2 text-sm font-medium"
            style={{ color: "#450920" }}
          >
            {product.name}
          </h4>
          <p className="mt-1 text-xs text-gray-500">{product.benefit}</p>
          <span
            className="mt-2 inline-block text-xs font-medium"
            style={{ color: "#C1475A" }}
          >
            Xem sản phẩm →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function QuizPage() {
  const [mounted, setMounted] = useState(false);
  const {
    quizAnswers: answers,
    quizCompleted: showResult,
    currentQuestion,
    setQuizAnswers,
    setQuizCompleted,
    setCurrentQuestion,
    resetQuiz,
  } = useQuizStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const question = allQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;

  const handleSelect = (key: string) => {
    setSelectedOption(key);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...answers, selectedOption];
    setQuizAnswers(newAnswers);

    if (currentQuestion === allQuestions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setSelectedOption(null);
  };

  const handleRestart = () => {
    resetQuiz();
    setSelectedOption(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate results
  const skinType = getSkinType(answers.slice(0, 5));
  const personalColor = getPersonalColor(answers.slice(5, 10));
  const skinResult = skinTypeResults[skinType];
  const colorResult = personalColorResults[personalColor];

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
            <span style={{ color: "#450920" }}>Bài test cá nhân</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="py-8 text-center">
        <h1
          className="text-2xl font-bold md:text-3xl"
          style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
        >
          Khám phá vẻ đẹp cá nhân của bạn
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm italic text-gray-600">
          Thấu hiểu làn da, định hình phong cách.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium" style={{ color: "#450920" }}>
                    Câu {currentQuestion + 1}/{allQuestions.length}
                  </span>
                  <span className="text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "#C1475A" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                {/* Section Label */}
                <p
                  className="mb-4 text-center text-sm font-semibold"
                  style={{ color: "#C1475A" }}
                >
                  {question.section}
                </p>

                {/* Question */}
                <h2
                  className="mb-8 text-center text-lg font-medium md:text-xl"
                  style={{ color: "#450920" }}
                >
                  {question.question}
                </h2>

                {/* Options */}
                <div
                  className={`grid gap-3 ${
                    question.options.length === 3
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {question.options.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleSelect(option.key)}
                      className={`rounded-xl border-2 p-4 text-left text-sm transition-all ${
                        selectedOption === option.key
                          ? "border-[#C1475A] bg-rose-200 font-semibold"
                          : "border-rose-100 bg-rose-50 hover:border-rose-300 hover:bg-rose-100"
                      }`}
                      style={{ color: "#450920" }}
                    >
                      <span
                        className="mr-2 font-bold"
                        style={{ color: "#C1475A" }}
                      >
                        {option.key}.
                      </span>
                      {option.text}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: "#C1475A" }}
                  >
                    {currentQuestion === allQuestions.length - 1
                      ? "Xem kết quả"
                      : "Tiếp tục"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Skin Type Result */}
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <div
                  className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-white"
                  style={{ backgroundColor: "#C1475A" }}
                >
                  Loại da của bạn
                </div>
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: "#450920",
                    fontFamily: '"Black Mango", serif',
                  }}
                >
                  {skinResult.title}
                </h2>
                <p className="mt-3 text-gray-600">{skinResult.desc}</p>

                {/* Skincare Recommendations */}
                <div className="mt-6">
                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "#450920" }}
                  >
                    <Sparkles
                      className="mr-2 inline-block h-4 w-4"
                      style={{ color: "#C1475A" }}
                    />
                    Gợi ý Skincare
                  </h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {skinResult.skincare.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                </div>

                {/* Makeup Recommendations */}
                <div className="mt-6">
                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "#450920" }}
                  >
                    <Sparkles
                      className="mr-2 inline-block h-4 w-4"
                      style={{ color: "#C1475A" }}
                    />
                    Gợi ý Makeup
                  </h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                    {skinResult.makeup.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Color Result */}
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <div
                  className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-white"
                  style={{ backgroundColor: "#DA627D" }}
                >
                  Personal Color
                </div>
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: "#450920",
                    fontFamily: '"Black Mango", serif',
                  }}
                >
                  {colorResult.title}
                </h2>
                <p className="mt-3 text-gray-600">{colorResult.desc}</p>
                <div className="mt-4 rounded-xl bg-rose-50 p-4">
                  <p className="text-sm" style={{ color: "#A53860" }}>
                    <strong>Gợi ý:</strong> {colorResult.tips}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-3 font-medium transition-all hover:bg-gray-100"
                  style={{ borderColor: "#C1475A", color: "#C1475A" }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Làm quiz lại
                </button>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#C1475A" }}
                >
                  Xem tất cả sản phẩm
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
