"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { teamMembers } from "@/lib/team";
import { assetPath } from "@/lib/utils";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

// Member Card Component
function MemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const imageSrc = encodeURI(assetPath(member.avatar));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex h-[311px] w-[300px] flex-col items-center justify-start gap-4 rounded-2xl border border-white/40 bg-white/60 pt-[18px] pb-[30px] px-[20px] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-100/40 to-transparent" />

      {/* Avatar */}
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full bg-white ring-4 ring-white transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(255,105,135,0.4)]">
        <Image
          src={imageSrc}
          alt={member.name}
          width={120}
          height={120}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://placehold.co/120x120/f9a8d4/9f1239?text=Avatar";
          }}
        />
      </div>

      {/* Name */}
      <h3 className="relative text-center text-[17px] font-semibold tracking-wide text-[#450920] font-[var(--font-be-vietnam)]">
        {member.name}
      </h3>

      {/* Info section */}
      <div className="relative flex flex-col items-center space-y-1 text-sm text-gray-700">
        <p>MSSV: {member.studentId}</p>
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: "#DA627D" }}
        >
          {member.role === "Leader" ? "Leader" : "Member"}
        </span>
        {member.github && (
          <Link
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#450920] underline underline-offset-2 transition-opacity hover:opacity-80 break-all"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
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
            <span style={{ color: "#450920" }}>Về chúng tôi</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Section 1 - About Us */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <h1
            className="mb-8 text-center text-3xl font-bold"
            style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
          >
            VỀ CHÚNG TÔI
          </h1>

          <div className="rounded-2xl bg-rose-50/50 p-8 shadow-sm">
            <p className="leading-relaxed text-gray-700">
              Glowic được thành lập vào năm 2026 tại TP. Hồ Chí Minh với sứ mệnh
              mang đến cho mọi cô gái và chàng trai cơ hội tỏa sáng theo cách
              riêng của mình.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Chúng tôi tin rằng trang điểm là ngôn ngữ của sự tự tin. Mỗi lớp
              cushion mịn màng, mỗi thỏi son màu sắc cá tính, mỗi má hồng ửng
              hồng tự nhiên hay hàng mi cong vút đều giúp bạn thể hiện phiên bản
              đẹp nhất của chính mình.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Tại Glowic, chúng tôi không chỉ bán sản phẩm trang điểm. Chúng tôi
              xây dựng một hành trình làm đẹp toàn diện.
            </p>
            <p
              className="mt-4 text-center font-medium"
              style={{ color: "#C1475A" }}
            >
              Glowic – Trang điểm cho nàng tỏa sáng, dưỡng da giữ trọn nét rạng ngời.
            </p>
          </div>
        </motion.section>

        {/* Section 2 - Team Members */}
        <section className="mx-auto max-w-[1158px]">
          <h2 className="mb-6 text-center text-[18px] font-semibold text-[#450920]">
            Thành viên
          </h2>

          {/* Leader */}
          {(() => {
            const leader = teamMembers.find((m) => m.role === "Leader");
            return leader ? (
              <div className="flex justify-center mb-10">
                <MemberCard member={leader} index={0} />
              </div>
            ) : null;
          })()}

          {/* Others */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-3 gap-8 justify-items-center"
          >
            {teamMembers
              .filter((m) => m.role !== "Leader")
              .map((member, index) => (
                <MemberCard key={member.studentId} member={member} index={index + 1} />
              ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
