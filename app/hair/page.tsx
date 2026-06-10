"use client";
import { useRouter } from "next/navigation";

export default function HairPage() {
  const router = useRouter();

  const combos = [
    {
      name: "LILY",
      price: "645k",
      desc: "Suôn mềm, tinh khôi",
      time: "60 phút",
    },
    {
      name: "ROSE",
      price: "1575k",
      desc: "Quyến rũ, nổi bật",
      time: "120 phút",
    },
    {
      name: "TULIP",
      price: "875k",
      desc: "Đẳng cấp, chuyên sâu",
      time: "90 phút",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF0] p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        {/* Nút quay lại */}
        <button
          onClick={() => router.back()}
          className="text-stone-400 hover:text-stone-900 mb-8 font-bold text-sm uppercase tracking-widest"
        >
          ← Quay lại trang chủ
        </button>

        {/* Tiêu đề */}
        <h1 className="text-5xl font-black text-stone-900 mb-12">
          Thiết Kế Tóc <span className="text-pink-400">Thời Thượng</span>
        </h1>

        {/* Danh sách Combo dạng Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {combos.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">
                Hair Style
              </div>
              <h2 className="text-2xl font-black text-stone-900 mb-2">
                {item.name}
              </h2>
              <p className="text-stone-500 text-sm mb-6">{item.desc}</p>

              <div className="flex justify-between items-center border-t pt-6">
                <span className="font-black text-stone-800 text-lg">
                  {item.price}
                </span>
                <button
                  onClick={() => {
                    // 1. Kiểm tra trạng thái đăng nhập từ trình duyệt
                    const isLoggedIn =
                      localStorage.getItem("isLoggedIn") === "true";

                    // Đường dẫn đích sau khi thỏa mãn điều kiện (Trang đặt lịch kèm thông tin gói tóc)
                    const targetUrl = `/booking-time?service=hair&combo=${item.name}&price=${item.price}`;

                    if (!isLoggedIn) {
                      alert(
                        "🔒 Bạn cần đăng nhập tài khoản trước khi tiến hành chọn lịch hẹn!",
                      );
                      // Chưa đăng nhập -> Đá sang trang login kèm thông tin điều hướng ngược lại sau khi xong
                      router.push(
                        `/login?redirect=booking-time&service=hair&combo=${item.name}&price=${item.price}`,
                      );
                    } else {
                      // Đã đăng nhập -> Cho bay thẳng vào trang chọn ngày giờ luôn
                      router.push(targetUrl);
                    }
                  }}
                  className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-pink-400 transition-colors"
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
