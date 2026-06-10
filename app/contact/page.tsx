"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  // Biểu mẫu liên hệ
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-stone-800 font-sans antialiased selection:bg-[#FBBFDC]">
      {/* 1. THANH MENU TRÊN CÙNG (NAVBAR) */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#CFECF3] px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-2xl font-black bg-gradient-to-r from-[#FBBFDC] to-[#99DDF0] bg-clip-text text-transparent tracking-wider font-mono">
              JoyRide
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 border-l border-stone-200 pl-2 hidden md:inline">
              Beauty Studio
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-10 text-[15px] font-medium text-stone-700 tracking-wide">
            <span
              onClick={() => router.push("/")}
              className="cursor-pointer pb-2 transition-all hover:text-stone-900"
            >
              Trang chủ
            </span>
            <span
              onClick={() => router.push("/?scroll=services")}
              className="cursor-pointer pb-2 transition-all hover:text-stone-900"
            >
              Dịch vụ
            </span>
            <span className="cursor-pointer pb-2 transition-all border-b-2 border-[#FBBFDC] text-stone-900 font-semibold">
              Liên hệ
            </span>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="bg-[#FBBFDC] hover:bg-[#F9A8CB] text-stone-700 font-bold py-2.5 px-7 rounded-full text-xs tracking-widest uppercase"
          >
            Đăng nhập
          </button>
        </div>
      </nav>

      {/* 2. NỘI DUNG FORM LIÊN HỆ */}
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#E1FAD4]/60 text-emerald-700 border border-[#CBEFBC] uppercase tracking-widest">
            ✉️ Kết nối với JoyRide
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-stone-500 font-medium text-sm sm:text-base leading-relaxed">
            Mọi ý kiến đóng góp hoặc nhu cầu đặt lịch đặc biệt, <br />
            xin vui lòng để lại tin nhắn. Đội ngũ JoyRide sẽ phản hồi bạn trong
            24h!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#CFECF3]/40 shadow-xl relative overflow-hidden">
          {/* Cột trái: Thông tin studio */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#CFECF3]/30 to-[#99DDF0]/10 rounded-2xl p-6 sm:p-8 space-y-8 flex flex-col justify-between border border-[#CFECF3]/20">
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Thông tin studio
              </h3>
              <div className="space-y-4 text-stone-600 font-medium text-sm">
                <p>
                  📍 <strong>Địa chỉ:</strong> 123 Đường Bông Hồng Pastel, Q.1,
                  TP. HCM
                </p>
                <p>
                  📞 <strong>Hotline:</strong> 1900 xxxx
                </p>
                <p>
                  ✉️ <strong>Email:</strong> hello@joyridebeauty.com
                </p>
              </div>
            </div>
            <div className="bg-white/80 p-4 rounded-xl text-xs font-semibold text-stone-500 space-y-1">
              <p className="text-pink-600 uppercase font-bold tracking-wider text-[10px]">
                Giờ hoạt động
              </p>
              <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
              <p>Thứ 7: 9:00 - 18:00</p>
            </div>
          </div>

          {/* Cột phải: Form nhập */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 p-2">
            <h3 className="text-xl font-extrabold text-stone-900 tracking-tight mb-2">
              Gửi tin nhắn cho chúng tôi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] text-sm"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] text-sm"
                  placeholder="09012345xx"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] text-sm"
                placeholder="yourname@gmail.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Lời nhắn
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] text-sm resize-none"
                placeholder="Bạn cần tư vấn thêm về gói dịch vụ nào..."
              />
            </div>

            {submitted ? (
              <div className="bg-[#E1FAD4] text-emerald-800 font-bold p-3.5 rounded-xl text-center text-sm border border-emerald-200">
                🎉 Tin nhắn đã được gửi thành công! JoyRide cảm ơn bạn.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#FBBFDC] hover:bg-[#F9A8CB] text-stone-700 font-black py-3.5 rounded-xl shadow-md transition-all text-sm tracking-widest uppercase"
              >
                Gửi lời nhắn ✨
              </button>
            )}
          </form>
        </div>
      </main>

      {/* 3. KHÔI PHỤC HOÀN TOÀN KHỐI FOOTER LỚN CHO TRANG LIÊN HỆ (Bao gồm đầy đủ icon từ image_a447c3.png) */}
      <footer className="bg-white border-t border-[#CFECF3] px-6 py-12 text-stone-600 text-sm">
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
                Điện thoại: 1900 xxxx
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

          {/* Gắn khối icon theo chuẩn ảnh mẫu image_a447c3.png */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105"
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
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105"
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
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105"
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
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105"
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
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 bg-white transition-all duration-300 hover:scale-105"
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
