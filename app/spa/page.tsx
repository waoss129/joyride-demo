"use client";

import React from "react";

import Link from "next/link";

const spaServices = [
  {
    id: "jasmine",
    title: "JASMINE",
    desc: "Thư giãn, chữa lành",
    price: "645k",
  },
  { id: "daisy", title: "DAISY", desc: "Tươi trẻ, làm sạch", price: "745k" },
  { id: "lotus", title: "LOTUS", desc: "Premium, tận hưởng", price: "1245k" },
];

export default function SpaPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF0] px-6 py-16 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4">
            Spa & Trị Liệu <span className="text-emerald-400">Da Mặt</span>
          </h1>
          <p className="text-stone-500 font-medium">
            Vỗ về làn da, tái tạo năng lượng từ sâu bên trong
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-3xl border border-emerald-100 shadow-[0_20px_40px_-15px_rgba(52,211,153,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300"
            >
              <h2 className="text-2xl font-black text-stone-900 mb-2">
                {service.title}
              </h2>
              <p className="text-sm text-stone-400 mb-6 font-medium">
                {service.desc}
              </p>
              <div className="text-3xl font-black text-emerald-400 mb-6">
                {service.price}
              </div>
              <Link href="/booking">
                <button className="w-full py-4 rounded-2xl bg-stone-900 text-white font-bold tracking-widest uppercase text-xs hover:bg-emerald-500 hover:text-stone-900 transition-colors duration-300">
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
