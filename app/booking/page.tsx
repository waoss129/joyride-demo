"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";

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

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("service") || "PEONY";

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  const dateObj = selectedDate ? new Date(selectedDate) : null;
  const dayOfWeek = dateObj ? dateObj.getDay() : null;

  const getAvailableSlots = () => {
    if (dayOfWeek === 0) return [];
    if (dayOfWeek >= 1 && dayOfWeek <= 5)
      return ALL_TIME_SLOTS.filter((t) => parseInt(t) < 17);
    if (dayOfWeek === 6)
      return ALL_TIME_SLOTS.filter((t) => parseInt(t) >= 9 && parseInt(t) < 18);
    return [];
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("⚠️ Vui lòng chọn đầy đủ ngày và giờ!");
      return;
    }
    alert(
      `🎉 Đặt lịch ${serviceName} thành công!\nNgày: ${selectedDate}\nGiờ: ${selectedTime}`,
    );
    router.push("/");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* CỘT TRÁI: FORM */}
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold">JoyRide - Đặt lịch trải nghiệm</h1>

        {/* <div>
          <label className="block font-bold mb-3">📅 1. Chọn ngày:</label>
          <input
            type="date"
            className="w-full p-4 border rounded-xl"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {dayOfWeek === 0 && (
            <p className="text-red-600 mt-2 font-bold">
              ⚠️ Chủ Nhật nghỉ, vui lòng chọn ngày khác!
            </p>
          )}
        </div> */}

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
        <div>
          <label className="block font-bold mb-3">⏰ 2. Chọn khung giờ:</label>
          {dayOfWeek !== 0 && selectedDate && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {getAvailableSlots().map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl border font-bold ${selectedTime === time ? "bg-orange-500 text-white" : "bg-white border-gray-200"}`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block font-bold mb-3">📝 3. Ghi chú:</label>
          <textarea
            className="w-full p-4 border rounded-xl"
            rows={3}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nhập yêu cầu đặc biệt..."
          />
        </div>
      </div>

      {/* CỘT PHẢI: VÉ HÀNH TRÌNH - NÚT BẤM NẰM TRỰC TIẾP Ở ĐÂY */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 h-fit sticky top-8 flex flex-col">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          🎟️ Vé hành trình
        </h2>
        <div className="space-y-3 text-sm flex-grow">
          <p>
            Dịch vụ: <b>{serviceName}</b>
          </p>
          <p>
            Ngày: <b>{selectedDate || "Chưa chọn"}</b>
          </p>
          <p>
            Giờ: <b>{selectedTime || "Chưa chọn"}</b>
          </p>
          <p>
            Ghi chú: <span className="italic">{note || "Không có"}</span>
          </p>
        </div>

        {/* NÚT XÁC NHẬN NẰM TRONG DIV CỦA VÉ */}
        <button
          onClick={handleConfirm}
          className="w-full mt-8 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg"
        >
          Xác nhận đặt lịch
        </button>
      </div>
    </div>
  );
}

export default function Booking() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <BookingContent />
    </Suspense>
  );
}
