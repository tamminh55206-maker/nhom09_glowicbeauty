"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FAA5AB] py-20">
      <div className="text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[120px] md:text-[180px] font-light leading-none text-[#DA627D]"
          style={{ fontFamily: '"Black Mango", serif' }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 md:text-[22px] italic text-[#450920] whitespace-nowrap "
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif"  }}
        >
          Ôi! Có vẻ làn da của bạn cần được chăm sóc, và trang web này cũng vậy.
        </motion.p>

        {/* Nút Về Trang Chủ - Bo tròn, nền màu đỏ mận đặc trưng của nhóm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="inline-block rounded-[20px] bg-[#A53860] px-12 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#450920] shadow-md"
          >
            VỀ TRANG CHỦ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}