"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

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

// Component này chứa toàn bộ logic và giao diện
function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("service") || "Chưa chọn dịch vụ";

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return TIME_SLOTS;
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) return [];
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return TIME_SLOTS.filter(
        (time) =>
          parseInt(time.split(":")[0]) >= 8 &&
          parseInt(time.split(":")[0]) < 17,
      );
    }
    if (dayOfWeek === 6) {
      return TIME_SLOTS.filter(
        (time) =>
          parseInt(time.split(":")[0]) >= 9 &&
          parseInt(time.split(":")[0]) < 18,
      );
    }
    return TIME_SLOTS;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("⚠️ Vui lòng chọn đầy đủ ngày và giờ!");
      return;
    }
    alert(
      `🎉 Đặt lịch ${serviceName} thành công!\n📅 Ngày: ${selectedDate}\n⏰ Giờ: ${selectedTime}`,
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 text-gray-800">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          JoyRide - Thời Gian Hành Trình
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-base font-bold mb-3">
                📅 1. Chọn ngày trải nghiệm
              </label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-base font-bold mb-3">
                ⏰ 2. Chọn khung giờ
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {getAvailableTimeSlots().map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-2 rounded-xl border ${selectedTime === time ? "bg-orange-500 text-white" : "bg-white"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: VÉ HÀNH TRÌNH */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit border sticky top-6">
          <h2 className="text-2xl font-bold border-b pb-4 mb-5">
            🎟️ Vé hành trình
          </h2>
          <div className="space-y-4">
            <p>
              Dịch vụ: <strong>{serviceName}</strong>
            </p>
            <p>Ngày: {formatDateDisplay(selectedDate)}</p>
            <p>Giờ: {selectedTime || "Chưa chọn"}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-bold"
          >
            Xác nhận đặt lịch
          </button>
        </div>
      </div>
    </div>
  );
}

// Export duy nhất một lần
export default function Booking() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <BookingContent />
    </Suspense>
  );
}
