"use client";

import React, { useState, Suspense } from "react";
import { SERVICES_DATA } from "@/data/services";

// Khung giờ cố định
const ALL_TIME_SLOTS = [
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

function BookingTimeContent() {
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  // Logic ràng buộc ngày giờ
  const dateObj = selectedDate ? new Date(selectedDate) : null;
  const dayOfWeek = dateObj ? dateObj.getDay() : null; // 0 là Chủ Nhật

  const getAvailableSlots = () => {
    if (dayOfWeek === 0) return []; // Chủ Nhật nghỉ
    // Thứ 2 - Thứ 6: 8:00 - 17:00
    if (dayOfWeek >= 1 && dayOfWeek <= 5)
      return ALL_TIME_SLOTS.filter((t) => parseInt(t) < 17);
    // Thứ 7: 9:00 - 18:00
    if (dayOfWeek === 6)
      return ALL_TIME_SLOTS.filter((t) => parseInt(t) >= 9 && parseInt(t) < 18);
    return [];
  };

  // 1. Thêm hàm handleConfirm vào trong component BookingTimeContent
  const handleConfirm = () => {
    if (!service || !selectedDate || !selectedTime) {
      alert("⚠️ Vui lòng chọn đầy đủ Dịch vụ, Ngày và Giờ!");
      return;
    }
    // Thông báo này sẽ hiển thị đúng như bạn mong muốn
    alert(
      `🎉 Đặt lịch ${service} thành công!\nNgày: ${selectedDate}\nGiờ: ${selectedTime}\nGhi chú: ${note || "Không có"}`,
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold">JoyRide - Đặt lịch hành trình</h1>

        {/* ComboBox chọn dịch vụ */}
        <div className="grid grid-cols-2 gap-4">
          <select
            className="p-4 border rounded-xl"
            onChange={(e) => {
              setCategory(e.target.value);
              setService("");
            }}
          >
            <option value="">-- Danh mục (Hair, Nail, Spa) --</option>
            {Object.keys(SERVICES_DATA).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="p-4 border rounded-xl"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">-- Chọn dịch vụ cụ thể --</option>
            {category &&
              SERVICES_DATA[category as keyof typeof SERVICES_DATA].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </div>

        {/* Chọn ngày */}
        {/* Phần này áp dụng cho cả hai file booking/page.tsx và booking-time/page.tsx */}
        <div>
          <label className="block font-bold mb-3">
            📅 1. Chọn ngày trải nghiệm:
          </label>
          <input
            type="date"
            className="w-full p-4 border rounded-xl"
            min={new Date().toISOString().split("T")[0]} // Ràng buộc: không được chọn ngày trước hôm nay
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          {/* Thông báo chủ nhật */}
          {dayOfWeek === 0 && (
            <p className="text-red-600 mt-2 font-bold">
              ⚠️ Xin lỗi, cửa hàng nghỉ vào Chủ Nhật. Vui lòng chọn ngày khác!
            </p>
          )}
        </div>

        {/* Chọn giờ */}
        {dayOfWeek !== 0 && selectedDate && (
          <div>
            <label className="block font-bold mb-3">
              ⏰ 2. Chọn khung giờ:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {getAvailableSlots().map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl border font-bold ${selectedTime === time ? "bg-orange-600 text-white" : "bg-white"}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ghi chú */}
        <textarea
          className="w-full p-4 border rounded-xl"
          rows={3}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập yêu cầu đặc biệt..."
        />
      </div>

      {/* Vé hành trình */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 h-fit sticky top-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          🎟️ Vé hành trình
        </h2>
        <div className="space-y-3 text-sm">
          <p>
            Dịch vụ: <b>{service || "Chưa chọn dịch vụ"}</b>
          </p>
          <p>
            Ngày: <b>{selectedDate || "Chưa chọn ngày"}</b>
          </p>
          <p>
            Giờ: <b>{selectedTime || "Chưa chọn giờ"}</b>
          </p>
          <p>
            Ghi chú: <span className="italic">{note || "Không có"}</span>
          </p>
        </div>
        <button
          onClick={handleConfirm} // Đảm bảo đã có dòng này
          className="w-full mt-8 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg"
        >
          Xác nhận đặt lịch
        </button>
      </div>
    </div>
  );
}

export default function BookingTime() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <BookingTimeContent />
    </Suspense>
  );
}
