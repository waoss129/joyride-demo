"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

// CẤU HÌNH THƯ MỤC VÀ ĐỔ BÓNG MÀU PASTEL (GIỮ NGUYÊN GỐC)
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

// GIAO DIỆN CHÍNH JOYRIDE TRANG CHỦ
export default function JoyRideHomePage() {
  const router = useRouter();
  const handleServiceSelect = (serviceKey: string) => {
    // Kiểm tra xem khách đã đăng nhập chưa (giả lập bằng localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      alert('🔒 Bạn cần đăng nhập tài khoản trước khi tiến hành đặt lịch hẹn!');
      // Chuyển sang login, đính kèm thông tin dịch vụ để tí đăng nhập xong tự quay lại
      router.push(`/login?redirect=booking-time&service=${serviceKey}`);
    } else {
      // Nếu đã đăng nhập, sang thẳng trang đặt lịch kèm dịch vụ đã chọn
      router.push(`/booking-time?service=${serviceKey}`);
    }
  };
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget === "services") {
      setActiveTab("services");

      const timer = setTimeout(() => {
        const element = document.getElementById("services-section");
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleHomeClick = () => {
    setActiveTab("home");
    if (searchParams.get("scroll")) {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleServicesClick = () => {
    setActiveTab("services");
    const element = document.getElementById("services-section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    setActiveTab("contact");
    router.push("/contact");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-stone-800 font-sans antialiased selection:bg-[#FBBFDC]">
      {/* 1. THANH MENU TRÊN CÙNG (NAVBAR) */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#CFECF3] px-8 py-4 shadow-sm shadow-blue-50/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleHomeClick}
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
              onClick={handleHomeClick}
              className={`cursor-pointer pb-2 transition-all duration-150 border-b-2 ${
                activeTab === "home"
                  ? "border-[#FBBFDC] text-stone-900 font-semibold"
                  : "border-transparent hover:text-stone-900"
              }`}
            >
              Trang chủ
            </span>
            <span
              onClick={handleServicesClick}
              className={`cursor-pointer pb-2 transition-all duration-150 border-b-2 ${
                activeTab === "services"
                  ? "border-[#FBBFDC] text-stone-900 font-semibold"
                  : "border-transparent hover:text-stone-900"
              }`}
            >
              Dịch vụ
            </span>
            <span
              onClick={handleContactClick}
              className={`cursor-pointer pb-2 transition-all duration-150 border-b-2 ${
                activeTab === "contact"
                  ? "border-[#FBBFDC] text-stone-900 font-semibold"
                  : "border-transparent hover:text-stone-900"
              }`}
            >
              Liên hệ
            </span>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="bg-[#FBBFDC] hover:bg-[#F9A8CB] text-stone-700 font-bold py-2.5 px-7 rounded-full text-xs tracking-widest uppercase shadow-sm shadow-pink-100 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Đăng nhập
          </button>
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
      </section>

      {/* 4. KHỐI TIỆN ÍCH DỊCH VỤ CỐT LÕI */}
      <section
        id="services-section"
        className="bg-gradient-to-r from-[#CFECF3]/20 via-[#E1FAD4]/20 to-white/40 border-t border-[#CFECF3]/30 px-6 py-16 mt-12 md:mt-20 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-10">
            Dịch vụ cốt lõi tại JoyRide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              onClick={() => handleServiceSelect('hair')}
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
              onClick={() => handleServiceSelect('nail')}
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
              onClick={() => handleServiceSelect('spa')}
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
