"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

// ... [Giữ nguyên GRID_DISPLAY_CONFIG và ServiceCard như cũ] ...
// CẤU HÌNH THƯ MỤC VÀ ĐỔ BÓNG MÀU PASTEL
const GRID_DISPLAY_CONFIG = {
  hair: {
    tag: "Hair Trend",
    title: "Cắt & Tạo Kiểu Layer",
    folder: "hair",
    textColor: "text-pink-400",
    borderColor: "border-[#FBBFDC]/40",
    glowShadow: "shadow-[0_20px_50px_-12px_rgba(251,191,220,0.55)]",
    extraClass: "",
  },
  nail: {
    tag: "Nail Art",
    title: "Sơn Gel Thiết Kế",
    folder: "nail",
    textColor: "text-[#99DDF0]",
    borderColor: "border-[#CFECF3]/50",
    glowShadow: "shadow-[0_20px_50px_-12px_rgba(153,221,240,0.55)]",
    extraClass: "sm:translate-y-6",
  },
  spa: {
    tag: "Therapy Spa",
    title: "Gội Dưỡng Sinh Chữa Lành",
    folder: "spa",
    textColor: "text-emerald-400",
    borderColor: "border-[#E1FAD4]/60",
    glowShadow: "shadow-[0_22px_55px_-10px_rgba(134,239,172,0.7)]",
    extraClass: "col-span-2 sm:col-span-1",
  },
};

// COMPONENT CON: VÒNG LẶP ẢNH ĐỘNG
function ServiceCard({ item }: { item: any }) {
  const [images, setImages] = useState<string[]>([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/get-images?folder=${item.folder}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      })
      .catch((err) => console.error("Lỗi nạp ảnh động:", err));
  }, [item.folder]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className={`bg-stone-900 rounded-3xl aspect-[3/4] flex flex-col justify-end p-6 border ${item.borderColor} relative overflow-hidden cursor-pointer transform transition-all duration-500 ease-out hover:-translate-y-2 ${item.glowShadow} group ${item.extraClass}`}
    >
      {images.map((imgUrl, imgIndex) => (
        <div
          key={imgIndex}
          className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-in-out scale-100 group-hover:scale-[1.03]"
          style={{
            backgroundImage: `url('${imgUrl}')`,
            opacity: imgIndex === currentImgIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent z-10" />
      <span
        className={`text-[11px] font-bold tracking-widest uppercase mb-1.5 z-20 block transition-all duration-300 ${item.textColor}`}
      >
        {item.tag}
      </span>
      <h3 className="font-bold text-white text-base text-left z-20 tracking-tight transition-transform duration-300 group-hover:translate-x-0.5">
        {item.title}
      </h3>
    </div>
  );
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState("home"); // Đã sửa lỗi thiếu biến

  const handleHomeClick = () => {
    setActiveTab("home");
    router.push("/");
  };

  const handleContactClick = () => {
    router.push("/contact");
  };

  // Hàm trỏ về trang chủ và cuộn đến vị trí
  const handleNavigateTo = (target: string) => {
    setActiveTab(target);
    router.push(`/?scroll=${target}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-stone-800 font-sans antialiased selection:bg-[#FBBFDC]">
      {/* 1. NAVBAR DÀNH CHO KHÁCH HÀNG */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#CFECF3] px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleHomeClick}
          >
            <span className="text-2xl font-black bg-gradient-to-r from-[#FBBFDC] to-[#99DDF0] bg-clip-text text-transparent tracking-wider font-mono">
              JoyRide
            </span>
          </div>

          {/* Menu Điều hướng */}
          <div className="hidden sm:flex items-center gap-10 text-[15px] font-medium text-stone-700 tracking-wide">
            <div className="flex flex-col items-center">
              <span
                className="cursor-pointer text-stone-900 font-bold"
                onClick={handleHomeClick}
              >
                Trang chủ
              </span>
              <div className="w-8 h-[2px] bg-[#FBBFDC] mt-1" />
            </div>
            <span
              className="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors"
              onClick={() => handleNavigateTo("services")}
            >
              Dịch vụ
            </span>
            <span
              className="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors"
              onClick={() => handleNavigateTo("contact")}
            >
              Liên hệ
            </span>
          </div>

          {/* Avatar và Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FBBFDC] to-[#99DDF0] border-2 border-white shadow-md hover:scale-105 transition-transform"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-stone-50">
                  <p className="text-xs font-bold text-stone-800">
                    Nguyễn Văn A
                  </p>
                </div>
                <button
                  onClick={() => router.push("/client-dashboard/profile")}
                  className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition"
                >
                  Hồ sơ cá nhân
                </button>
                <button
                  onClick={() => router.push("/client-dashboard/appointment")}
                  className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition"
                >
                  Lịch hẹn của tôi
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 2. KHU VỰC HERO SECTION */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-10 left-1/3 w-[300px] h-[300px] bg-[#FBBFDC]/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-20 right-1/3 w-[250px] h-[250px] bg-[#CFECF3]/60 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#E1FAD4]/40 rounded-full blur-[90px] pointer-events-none" />

        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#CFECF3]/50 text-stone-600 border border-[#BBE3ED]/60 uppercase tracking-widest relative z-10">
          ✨ Kiêu sa diện mạo • Rạng rỡ hành trình
        </span>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-tight max-w-4xl mx-auto relative z-10">
          Đẹp hơn mỗi ngày, <br />
          <span className="bg-gradient-to-r from-[#FBBFDC] via-[#E2A6C5] to-[#99DDF0] bg-clip-text text-transparent">
            Vui trên mỗi hành trình
          </span>
        </h1>

        <p className="text-base sm:text-lg text-stone-500 max-w-3xl mx-auto font-medium leading-relaxed relative z-10 [text-wrap:balance]">
          Làm đẹp không chỉ là kết quả, đó là một chuyến đi cảm xúc đầy tiếng
          cười. Hãy để JoyRide vỗ về làn da, mái tóc và đánh thức sự tự tin
          trong bạn.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md mx-auto relative z-10">
          <button
            onClick={() => router.push("/booking-time")}
            className="w-full bg-gradient-to-r from-[#FBBFDC] to-[#CFECF3] hover:from-[#F9A8CB] hover:to-[#BBE3ED] text-stone-700 font-black py-4 px-10 rounded-2xl shadow-lg shadow-pink-100/50 transition-all duration-200 text-base tracking-wide transform hover:-translate-y-0.5"
          >
            🌸 ĐẶT LỊCH HẸN NGAY
          </button>
        </div>

        {/* 3. KHỐI TRƯNG BÀY GRID */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl mx-auto w-full relative z-10">
          {Object.entries(GRID_DISPLAY_CONFIG).map(([key, item]) => (
            <ServiceCard key={key} item={item} />
          ))}
        </div>

        {/* 3.5. KHỐI QUY TRÌNH LÀM ĐẸP (ĐÃ CHỈNH SỬA) */}
        <section className="pt-28 pb-16 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Đặt lịch",
                desc: "Chọn dịch vụ & thời gian",
              },
              { step: "02", title: "Tư vấn", desc: "Chuyên viên lắng nghe" },
              { step: "03", title: "Trải nghiệm", desc: "Thực hiện dịch vụ" },
              { step: "04", title: "Hoàn thiện", desc: "Chăm sóc sau dịch vụ" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-2 group"
              >
                <span
                  className="text-4xl font-black transition-colors group-hover:scale-110 duration-300"
                  style={{ color: "#BACAF2" }}
                >
                  {item.step}
                </span>
                <h4 className="font-bold text-stone-800 text-sm tracking-wide uppercase">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. KHỐI TRÍCH DẪN (BRAND QUOTE) */}
        <section className="py-16 px-6 bg-[#FFFDF0]">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <svg
              className="w-8 h-8 text-[#BACAF2] mx-auto opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
            </svg>

            <p className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed italic">
              "Clear skin, shiny hair, fit body, healthy mind."
            </p>

            <div className="pt-4">
              <span className="block h-[1px] w-12 bg-[#BACAF2] mx-auto mb-4"></span>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-bold">
                JoyRide Philosophy
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* 4. KHỐI TIỆN ÍCH DỊCH VỤ CỐT LÕI */}
      <section
        id="services-section"
        className="bg-gradient-to-r from-[#CFECF3]/20 via-[#E1FAD4]/20 to-white/40 border-t border-[#CFECF3]/30 px-6 py-16 mt-0 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-10">
            Dịch vụ cốt lõi tại JoyRide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              onClick={() => handleServiceSelect("hair")}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#CFECF3]/20 hover:border-pink-300 transition-all cursor-pointer hover:shadow-md"
            >
              <div className="text-3xl">💇</div>
              <h4 className="text-lg font-bold text-stone-900">
                Thiết Kế Tóc Thời Thượng
              </h4>
              <p className="text-sm text-stone-500 font-medium leading-relaxed">
                Cắt, uốn, nhuộm balayage đón đầu xu hướng cùng chuyên viên VIP.
              </p>
            </div>

            <div
              onClick={() => handleServiceSelect("nail")}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#CFECF3]/20 hover:border-pink-300 transition-all cursor-pointer hover:shadow-md"
            >
              <div className="text-3xl">💅</div>
              <h4 className="text-lg font-bold text-stone-900">
                Nail Art Nghệ Thuật
              </h4>
              <p className="text-sm text-stone-500 font-medium leading-relaxed">
                Chăm sóc và sơn gel, đính đá custom theo cá tính riêng của bạn.
              </p>
            </div>

            <div
              onClick={() => handleServiceSelect("spa")}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#CFECF3]/20 hover:border-pink-300 transition-all cursor-pointer hover:shadow-md"
            >
              <div className="text-3xl">💆</div>
              <h4 className="text-lg font-bold text-stone-900">
                Spa & Trị Liệu Da Mặt
              </h4>
              <p className="text-sm text-stone-500 font-medium leading-relaxed">
                Thải độc detox, gội đầu dưỡng sinh chữa lành và massage thư
                giãn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHÂN TRANG (FOOTER) - KHÔI PHỤC HOÀN TOÀN ICON TỪ image_a447c3.png */}
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
