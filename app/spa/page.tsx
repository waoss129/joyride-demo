"use client";
import { useRouter } from "next/navigation";

export default function SpaPage() {
  const router = useRouter();
  const combos = [
    { name: "JASMINE", price: "645k", desc: "Thư giãn, chữa lành" },
    { name: "DAISY", price: "745k", desc: "Tươi trẻ, làm sạch" },
    { name: "LOTUS", price: "1245k", desc: "Premium, tận hưởng" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF0] p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-stone-400 hover:text-stone-900 mb-8 font-bold text-sm uppercase tracking-widest"
        >
          ← Quay lại
        </button>
        <h1 className="text-5xl font-black text-stone-900 mb-12">
          Spa & <span className="text-emerald-400">Trị Liệu</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {combos.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
                  Therapy
                </div>
                <h2 className="text-2xl font-black text-stone-900 mb-2">
                  {item.name}
                </h2>
                <p className="text-stone-500 text-sm mb-6">{item.desc}</p>
              </div>
              <div className="flex justify-between items-center border-t pt-6">
                <span className="font-black text-stone-800 text-lg">
                  {item.price}
                </span>
                <button
                  onClick={() =>
                    router.push(
                      `/booking?combo=${item.name}&price=${item.price}`,
                    )
                  }
                  className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-emerald-500"
                >
                  Chọn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
