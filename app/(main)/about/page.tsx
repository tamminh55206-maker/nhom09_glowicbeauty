"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

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
    transition: { staggerChildren: 0.15 },
  },
} as const;

// Team members data
const members = [
  {
    name: "Nguyễn Ái Quỳnh Anh",
    mssv: "24126004",
    role: "Leader",
    github: "#",
    image: "/images/team/quynh-anh.jpg",
    position: "center",
  },
  {
    name: "Huỳnh Thị Yến Nhi",
    mssv: "24126162",
    role: "",
    github: "#",
    image: "/images/team/yen-nhi.jpg",
    position: "left",
  },
  {
    name: "Nguyễn Thị Trà Mi",
    mssv: "24126131",
    role: "",
    github: "#",
    image: "/images/team/tra-mi.jpg",
    position: "right",
  },
  {
    name: "Phạm Minh Tâm",
    mssv: "24126201",
    role: "",
    github: "#",
    image: "/images/team/minh-tam.jpg",
    position: "center",
  },
  {
    name: "Đinh Nhật Huy",
    mssv: "24126084",
    role: "",
    github: "#",
    image: "/images/team/nhat-huy.jpg",
    position: "left",
  },
  {
    name: "Lương Thị Nguyệt",
    mssv: "24126158",
    role: "",
    github: "#",
    image: "/images/team/thi-nguyet.jpg",
    position: "right",
  },
  {
    name: "Bùi Khang Huy",
    mssv: "24126083",
    role: "",
    github: "#",
    image: "/images/team/khang-huy.jpg",
    position: "center",
  },
];

// Member Card Component
function MemberCard({
  member,
  index,
}: {
  member: (typeof members)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col items-center rounded-xl bg-rose-50 p-5 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Avatar */}
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full bg-rose-200">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="120px"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src =
              "https://placehold.co/120x120/f9a8d4/9f1239?text=Avatar";
          }}
        />
      </div>

      {/* Info */}
      <h3 className="mt-4 font-semibold" style={{ color: "#450920" }}>
        {member.name}
      </h3>
      <p className="text-sm text-gray-500">{member.mssv}</p>
      {member.role && (
        <p className="mt-1 text-sm font-medium" style={{ color: "#C1475A" }}>
          {member.role}
        </p>
      )}

      {/* GitHub Link */}
      <Link
        href={member.github}
        className="mt-3 flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
        style={{ color: "#C1475A" }}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub
      </Link>
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

      <div className="mx-auto max-w-5xl px-4 py-12">
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

          <div className="rounded-xl bg-rose-50/50 p-8 shadow-sm">
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
              Glowic – Trang điểm để bạn tỏa sáng, chăm sóc da để bạn giữ được
              ánh glow ấy.
            </p>
          </div>
        </motion.section>

        {/* Section 2 - Team Members */}
        <section>
          <h2
            className="mb-10 text-center text-2xl font-bold"
            style={{ color: "#450920", fontFamily: '"Black Mango", serif' }}
          >
            Thành viên nhóm
          </h2>

          {/* Flower-like Layout */}
          <div className="space-y-8">
            {/* Row 1 - Center */}
            <div className="flex justify-center">
              <div className="w-[200px]">
                <MemberCard member={members[0]} index={0} />
              </div>
            </div>

            {/* Row 2 - Left and Right with gap */}
            <div className="flex justify-center gap-32 sm:gap-48">
              <div className="w-[200px]">
                <MemberCard member={members[1]} index={1} />
              </div>
              <div className="w-[200px]">
                <MemberCard member={members[2]} index={2} />
              </div>
            </div>

            {/* Row 3 - Center */}
            <div className="flex justify-center">
              <div className="w-[200px]">
                <MemberCard member={members[3]} index={3} />
              </div>
            </div>

            {/* Row 4 - Left and Right with gap */}
            <div className="flex justify-center gap-32 sm:gap-48">
              <div className="w-[200px]">
                <MemberCard member={members[4]} index={4} />
              </div>
              <div className="w-[200px]">
                <MemberCard member={members[5]} index={5} />
              </div>
            </div>

            {/* Row 5 - Center */}
            <div className="flex justify-center">
              <div className="w-[200px]">
                <MemberCard member={members[6]} index={6} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
