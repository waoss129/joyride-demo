"use client";

import React from "react";

import Link from "next/link";

const nailServices = [
  { id: "peony", title: "PEONY", desc: "Kiêu sa, lộng lẫy", price: "995k" },
  { id: "sakura", title: "SAKURA", desc: "Rực rỡ, dịu dàng", price: "875k" },
  {
    id: "lavender",
    title: "LAVENDER",
    desc: "Hoàn mỹ, bền lâu",
    price: "425k",
  },
  {
    id: "sunflower",
    title: "SUNFLOWER",
    desc: "Kiên định, chân thành",
    price: "295k",
  },
];

export default function NailPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF0] px-6 py-16 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề chính */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4">
            Nail Art <span className="text-[#99DDF0]">Nghệ Thuật</span>
          </h1>
          <p className="text-stone-500 font-medium">
            Cá nhân hóa vẻ đẹp đôi bàn tay của bạn
          </p>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nailServices.map((service) => (
            // Trong phần map của NailPage
            <div
              key={service.id}
              className="group bg-white p-8 rounded-3xl border border-[#99DDF0]/30 shadow-[0_20px_40px_-15px_rgba(153,221,240,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-[#99DDF0]"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                  {service.title}
                </h2>
                <p className="text-sm text-stone-400 mt-1 font-medium">
                  {service.desc}
                </p>
              </div>
              <div className="text-3xl font-black text-[#99DDF0] mb-6">
                {service.price}
              </div>
              <Link href="/booking">
                <button className="w-full py-4 rounded-2xl bg-stone-900 text-white font-bold tracking-widest uppercase text-xs hover:bg-blue-400 hover:text-stone-900 transition-colors duration-300">
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
