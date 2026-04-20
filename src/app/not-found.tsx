// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Trang không tìm thấy</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      
      <Link 
        href="/"
        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
      >
        Quay về Trang chủ
      </Link>
    </div>
  )
}