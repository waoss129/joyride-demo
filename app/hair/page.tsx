"use client";

import React from "react";

import Link from "next/link";

const hairServices = [
  { id: "lily", title: "LILY", desc: "Suôn mềm, tinh khôi", price: "645k" },
  { id: "rose", title: "ROSE", desc: "Quyến rũ, nổi bật", price: "1575k" },
  { id: "tulip", title: "TULIP", desc: "Đẳng cấp, chuyên sâu", price: "875k" },
];

export default function HairPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF0] px-6 py-16 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề chính */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4">
            Thiết Kế Tóc <span className="text-pink-400">Thời Thượng</span>
          </h1>
          <p className="text-stone-500 font-medium">
            Trải nghiệm dịch vụ đẳng cấp cùng đội ngũ chuyên viên tại JoyRide
          </p>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hairServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-3xl border border-pink-100 shadow-[0_20px_40px_-15px_rgba(251,191,220,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-pink-300"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                  {service.title}
                </h2>
                <p className="text-sm text-stone-400 mt-1 font-medium">
                  {service.desc}
                </p>
              </div>

              <div className="text-3xl font-black text-pink-400 mb-6">
                {service.price}
              </div>
              <Link
                href={`/booking?service=${encodeURIComponent(service.title)}`}>
                <button className="w-full py-4 rounded-2xl bg-stone-900 text-white font-bold tracking-widest uppercase text-xs hover:bg-pink-400 transition-colors duration-300">
                  Chọn ngay
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
