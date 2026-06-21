"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

export default function MyAppointmentsPage() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-stone-800">
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#CFECF3] px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-2xl font-black bg-gradient-to-r from-[#FBBFDC] to-[#99DDF0] bg-clip-text text-transparent tracking-wider font-mono">
              JoyRide
            </span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-stone-600">
            <span
              className="cursor-pointer hover:text-[#BACAF2]"
              onClick={() => router.push("/")}
            >
              Trang chủ
            </span>
            <span className="cursor-pointer hover:text-[#BACAF2]">Dịch vụ</span>
            <span className="cursor-pointer hover:text-[#BACAF2]">Liên hệ</span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <h2 className="text-2xl font-bold text-[#BACAF2] mb-8">
            LỊCH HẸN CỦA TÔI
          </h2>

          {/* BỘ LỌC TÌM KIẾM */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <input
              className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-sm"
              placeholder="Tìm theo trạng thái"
            />
            <input
              className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-sm"
              placeholder="Tìm theo ngày đặt lịch"
            />
            <div className="col-span-2 flex gap-2">
              <input
                className="flex-1 p-3 bg-stone-50 rounded-lg border border-stone-100 text-sm"
                placeholder="Tìm theo mã lịch hẹn"
              />
              <button className="bg-[#BACAF2] text-white px-6 rounded-lg hover:opacity-90 transition">
                Tìm
              </button>
            </div>
          </div>

          {/* BẢNG DỮ LIỆU */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-stone-500 text-sm">
                  <th className="pb-4 font-medium">Mã lịch hẹn</th>
                  <th className="pb-4 font-medium">Loại</th>
                  <th className="pb-4 font-medium">Tên khách hàng</th>
                  <th className="pb-4 font-medium">Giờ hẹn</th>
                  <th className="pb-4 font-medium">Ngày hẹn</th>
                  <th className="pb-4 font-medium">Tổng tiền</th>
                  <th className="pb-4 font-medium">Trạng thái</th>
                  <th className="pb-4 font-medium text-center">Xem</th>
                </tr>
              </thead>
              <tbody className="text-sm text-stone-700">
                <tr className="border-b border-stone-50 hover:bg-stone-50 transition">
                  <td className="py-4 font-medium"></td>
                  <td className="py-4"></td>
                  <td className="py-4"></td>
                  <td className="py-4"></td>
                  <td className="py-4"></td>
                  <td className="py-4"></td>
                  <td className="py-4 text-[#BACAF2] font-semibold"></td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() =>
                        router.push(`/appointments/detail/LH55660768`)
                      }
                      className="p-2 border border-stone-200 rounded-lg hover:bg-stone-100"
                    >
                      <FiEdit className="text-stone-500" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        id="contact-section"
        className="bg-white border-t border-[#CFECF3] px-6 py-12 text-stone-600 text-sm"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left pb-8">
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h4 className="text-base font-black uppercase tracking-wider text-stone-900">
              Chúng Tôi Luôn Ở Đây
            </h4>
            <div className="space-y-1 font-medium text-stone-500 leading-relaxed text-center md:text-left">
              <p>
                Bạn có câu hỏi? Bạn có thể tìm câu trả lời trong mục Câu hỏi
                thường gặp (FAQs).
              </p>
              <p>Hoặc bạn cũng có thể liên hệ trực tiếp với chúng tôi:</p>
              <p className="font-bold text-stone-800 pt-1">
                Điện thoại: 1900 1234
              </p>
              <p>Thứ Hai đến Thứ Sáu: 8:00 - 17:00</p>
              <p>Thứ Bảy: 9:00 - 18:00</p>
              <p className="text-[#6FAEC0] hover:underline cursor-pointer pt-1 inline-block">
                Gửi email cho chúng tôi
              </p>
            </div>
          </div>

          <div className="space-y-3 flex flex-col items-center md:items-end">
            <h4 className="text-base font-black uppercase tracking-wider text-stone-900 md:text-right w-full">
              Dịch Vụ Khách Hàng
            </h4>
            <ul className="space-y-2 font-medium text-stone-500 md:text-right w-full">
              <li
                className="hover:text-[#6FAEC0] cursor-pointer transition-colors"
                onClick={handleContactClick}
              >
                Liên hệ với chúng tôi
              </li>
              <li className="hover:text-[#6FAEC0] cursor-pointer transition-colors">
                Câu hỏi thường gặp (FAQ)
              </li>
              <li className="hover:text-[#6FAEC0] cursor-pointer transition-colors">
                Thẻ quà tặng / Ưu đãi
              </li>
              <li className="hover:text-[#6FAEC0] cursor-pointer transition-colors">
                Chính sách & Bảo hành
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto border-t border-stone-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400 font-medium">
            © 2026 JoyRide Beauty Studio. Toàn bộ bản quyền được bảo lưu.
          </p>

          {/* KHỐI CÁC ICON MXH ĐEN TRẮNG CHUẨN ĐƯỢC KHÔI PHỤC THEO THIẾT KẾ image_a447c3.png */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105 hover:bg-stone-50"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105 hover:bg-stone-50"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105 hover:bg-stone-50"
            >
              <svg
                className="w-[15px] h-[15px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Youtube */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105 hover:bg-stone-50"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11c-.51 1.871-.51 5.776-.51 5.776s0 3.905.51 5.776a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11c.51-1.871.51-5.776.51-5.776s0-3.905-.51-5.776zm-14.242 9.2V8.637L15.424 12l-6.168 3.363z" />
              </svg>
            </a>
            {/* Tiktok */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105 hover:bg-stone-50"
            >
              <svg
                className="w-[15px] h-[15px]"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105 hover:bg-stone-50"
            >
              <svg
                className="w-[16px] h-[16px]"
                fill="currentColor"
                viewBox="0 0 496 512"
              >
                <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-166.5 74.4-166.5 161.8 0 36.2 19.3 81.6 48.6 96 5.4 2.6 8.3 1.4 9.5-3.6 1-3.9 3.2-13.1 4.3-17.2 1.5-5.6.8-7.7-3.4-12.7-14.8-17.6-24.1-40.7-24.1-70.4 0-70.8 53.7-139.7 147.2-139.7 80 0 131.8 54.9 131.8 126.3 0 83.2-41.9 141-98.3 141-30.5 0-53.4-25.3-46.1-56.3 8.8-37.1 25.8-77.1 25.8-103.9 0-23.9-12.8-43.9-39.3-43.9-31.2 0-56.2 32.2-56.2 75.3 0 27.5 9.3 46.1 9.3 46.1s-30.7 130.2-36.1 152.9c-10.7 45.4-4.8 101.4-2.5 116.9C40.8 429.4 0 347.4 0 256 0 119 111 8 248 8s248 111 248 248z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
