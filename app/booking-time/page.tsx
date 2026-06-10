"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const TIME_SLOTS = [
  "08:30",
  "09:30",
  "10:30",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:30",
  "19:30",
];

// Bản đồ chuyển đổi key dịch vụ sang chữ hiển thị thân thiện
const SERVICE_NAMES: Record<string, string> = {
  hair: "💇 Cắt & Tạo Kiểu Tóc Thời Thượng",
  nail: "💅 Sơn Gel & Nail Art Thiết Kế",
  spa: "💆 Gội Đầu Dưỡng Sinh & Trị Liệu",
};

export default function BookingTimePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy mã dịch vụ từ URL bốc từ trang chủ sang
  const serviceKey = searchParams.get("service") || "";

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  // KIỂM TRA BẢO MẬT NGAY KHI VÀO TRANG
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // 1. Nếu chưa đăng nhập -> Ép quay về đăng nhập
    if (!isLoggedIn) {
      alert("🔒 Vui lòng đăng nhập tài khoản để thực hiện đặt lịch!");
      router.push(`/login?redirect=booking-time&service=${serviceKey}`);
      return;
    }

    // 2. Nếu chưa chọn dịch vụ mà cố tình vào thẳng link -> Ép về trang chủ chọn dịch vụ
    if (!serviceKey || !SERVICE_NAMES[serviceKey]) {
      alert(
        "⚠️ Bạn chưa chọn dịch vụ trải nghiệm. Vui lòng chọn dịch vụ trước!",
      );
      router.push("/?scroll=services");
    }
  }, [serviceKey, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("⚠️ Vui lòng chọn ngày bạn muốn trải nghiệm dịch vụ!");
      return;
    }
    if (!selectedTime) {
      alert("⚠️ Vui lòng chọn khung giờ cụ thể để JoyRide chuẩn bị tốt nhất!");
      return;
    }

    alert(
      `🎉 Đặt lịch hẹn thành công!\n💼 Dịch vụ: ${SERVICE_NAMES[serviceKey]}\n📅 Ngày: ${selectedDate}\n⏰ Khung giờ: ${selectedTime}\n📝 Ghi chú: ${note || "Không có"}\n\nHệ thống đang lưu hành trình của bạn...`,
    );

    router.push("/");
  };

  const today = new Date().toISOString().split("T")[0];

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "Chưa chọn ngày";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] p-6 md:p-8 text-stone-800 font-sans antialiased selection:bg-[#FBBFDC]">
      {/* HEADER TRANG */}
      <header className="text-center mb-12 max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#99DDF0]/40 text-stone-700 border border-[#6FAEC0]/30 uppercase tracking-widest">
          ✨ Hành trình cá nhân hóa
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          JoyRide - Thời Gian Hành Trình
        </h1>
        <p className="text-stone-500 font-medium text-sm sm:text-base">
          Chọn thời gian phù hợp để chúng tôi phục vụ dịch vụ tốt nhất dành
          riêng cho bạn
        </p>
      </header>

      {/* BỐ CỤC 2 CỘT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {/* CỘT TRÁI: KHU VỰC ĐIỀN THÔNG TIN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-[#CFECF3]/40 shadow-xl space-y-6">
            {/* HIỂN THỊ DỊCH VỤ ĐÃ CHỌN (KHÓA CỨNG - KHÔNG CHO KHÁCH ĐỔI BẬY) */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                Dịch vụ bạn đang đặt
              </span>
              <p className="text-base font-extrabold text-stone-900">
                {SERVICE_NAMES[serviceKey] || "Đang tải..."}
              </p>
            </div>

            {/* 1. CHỌN NGÀY */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                📅 1. Chọn ngày trải nghiệm dịch vụ
              </label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] transition-all font-semibold text-stone-700 shadow-sm bg-stone-50/50"
              />
            </div>

            {/* 2. CHỌN GIỜ */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                ⏰ 2. Chọn khung giờ hẹn phù hợp
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                      selectedTime === time
                        ? "bg-[#99DDF0] text-stone-800 border-[#6FAEC0] shadow-md transform scale-[1.02]"
                        : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. GHI CHÚ THÊM */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                📝 3. Lưu ý hoặc yêu cầu đặc biệt gửi tới JoyRide
              </label>
              <textarea
                rows={4}
                placeholder="Ví dụ: Da mình nhạy cảm với tinh dầu hoa nhài, cần chuyên viên làm móng nhẹ nhàng..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] transition-all text-sm text-stone-700 bg-stone-50/50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: TẤM VÉ XÁC NHẬN LỊCH HẸN TRỰC QUAN */}
        <div className="bg-white p-6 rounded-3xl shadow-xl h-fit border border-[#CFECF3]/40 sticky top-24 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-black text-stone-900 border-b pb-4 mb-5 flex items-center gap-2 uppercase tracking-wide">
              🎟 Castle Pass / Vé của bạn
            </h2>

            <div className="space-y-4 bg-[#FBBFDC]/10 p-4 rounded-2xl border border-[#FBBFDC]/20">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-[#FBBFDC]/30">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Dịch vụ:
                </span>
                <span className="text-xs font-black text-stone-800 text-right max-w-[180px] truncate">
                  {SERVICE_NAMES[serviceKey]
                    ? SERVICE_NAMES[serviceKey].split(" ")[1]
                    : "Chưa rõ"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-dashed border-[#FBBFDC]/30">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Ngày hẹn:
                </span>
                <span
                  className={`text-sm font-black ${selectedDate ? "text-pink-600" : "text-stone-400 italic"}`}
                >
                  {formatDateDisplay(selectedDate)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-dashed border-[#FBBFDC]/30">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Giờ đón khách:
                </span>
                <span
                  className={`text-sm font-black ${selectedTime ? "text-pink-600" : "text-stone-400 italic"}`}
                >
                  {selectedTime ? `${selectedTime} Có mặt` : "Chưa chọn giờ"}
                </span>
              </div>

              <div className="py-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                  Yêu cầu đặc biệt:
                </span>
                <p className="text-xs text-stone-600 italic line-clamp-3 bg-white p-3 rounded-xl border border-stone-100 min-h-[48px]">
                  {note || "Không có yêu cầu đặc biệt."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#FBBFDC] to-[#CFECF3] hover:from-[#F9A8CB] hover:to-[#BBE3ED] text-stone-700 font-black py-4 px-4 rounded-xl shadow-md transition duration-200 text-xs tracking-widest uppercase text-center transform hover:-translate-y-0.5"
            >
              Xác nhận & Hoàn tất đặt lịch ✨
            </button>

            <button
              type="button"
              onClick={() => router.push("/?scroll=services")}
              className="w-full bg-white hover:bg-stone-50 text-stone-500 font-bold py-3 px-4 rounded-xl transition duration-200 border border-stone-200 text-xs tracking-wider uppercase text-center"
            >
              ← Thay đổi dịch vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
