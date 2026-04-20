"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8d7da]">
      <div className="text-center">
        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-9xl font-bold text-[#da627d]/60"
          style={{ fontFamily: '"Black Mango", serif' }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-md px-4 text-center text-lg italic text-gray-600"
        >
          Ôi! Có vẻ làn da của bạn cần được chăm sóc, và trang web này cũng vậy.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-block rounded-full border-2 border-gray-800 px-8 py-3 font-semibold text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white"
          >
            VỀ TRANG CHỦ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
