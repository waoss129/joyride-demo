"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Bốc thông tin chuyển hướng từ link URL sang (nếu có)
  const redirectTarget = searchParams.get("redirect"); // 'booking-time'
  const service = searchParams.get("service"); // 'hair' / 'nail' / 'spa'
  const combo = searchParams.get("combo");
  const price = searchParams.get("price");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hàm xử lý chuyển hướng sang trang đăng ký bảo toàn tham số URL
  const handleNavigateToRegister = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/register?${params.toString()}`);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại bạn nhé!");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải chứa nhất 6 ký tự.");
      return;
    }

    setIsLoading(true);

    try {
      // GIẢ LẬP ĐĂNG NHẬP THÀNH CÔNG
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("isLoggedIn", "true");

      // KIỂM TRA ĐIỀU HƯỚNG THÔNG MINH
      if (redirectTarget === "booking-time" && service) {
        let nextUrl = `/booking-time?service=${service}`;
        if (combo) nextUrl += `&combo=${combo}`;
        if (price) nextUrl += `&price=${price}`;

        router.push(nextUrl);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-stone-800 font-sans antialiased flex flex-col justify-between">
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#CFECF3] px-8 py-4 shadow-sm w-full">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-2xl font-black bg-gradient-to-r from-[#FBBFDC] to-[#99DDF0] bg-clip-text text-transparent tracking-wider font-mono">
              JoyRide
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 border-l border-stone-200 pl-2 hidden md:inline">
              Beauty Studio
            </span>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            ← Quay lại trang chủ
          </button>
        </div>
      </nav>

      {/* LOGIN FORM */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-[#FBBFDC]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#CFECF3]/40 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#CFECF3]/40 shadow-xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Chào mừng trở lại!
            </h1>
            {redirectTarget === "booking-time" ? (
              <p className="text-xs font-bold text-pink-600 bg-pink-50 py-1.5 px-3 rounded-full inline-block animate-pulse">
                🔒 Vui lòng đăng nhập để hoàn tất đặt lịch hẹn
              </p>
            ) : (
              <p className="text-sm text-stone-500 font-medium">
                Đăng nhập để quản lý lịch hẹn và nhận ưu đãi độc quyền từ JoyRide.
              </p>
            )}
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold rounded-xl leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] focus:ring-2 focus:ring-[#FBBFDC]/20 transition-all font-medium text-sm"
                placeholder="yourname@gmail.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <span className="text-xs font-semibold text-[#5592A3] hover:underline cursor-pointer">
                  Quên mật khẩu?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] focus:ring-2 focus:ring-[#FBBFDC]/20 transition-all font-medium text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="accent-[#FBBFDC] rounded cursor-pointer w-4 h-4"
              />
              <label
                htmlFor="remember"
                className="text-xs font-semibold text-stone-500 cursor-pointer select-none"
              >
                Duy trì đăng nhập
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FBBFDC] hover:bg-[#F9A8CB] disabled:bg-stone-200 disabled:text-stone-400 text-stone-700 font-black py-3.5 rounded-xl shadow-md transition-all text-sm tracking-widest uppercase transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? "Đang xác thực..." : "Đăng nhập ✨"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-sm text-stone-500 font-medium">
              Bạn chưa có tài khoản?{" "}
              {/* ĐÃ SỬA: Thêm onClick gọi hàm chuyển hướng bảo toàn url query */}
              <span 
                onClick={handleNavigateToRegister}
                className="text-pink-600 font-bold hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </span>
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-stone-400 font-medium border-t border-stone-100 bg-white w-full px-6">
        © 2026 JoyRide Beauty Studio. Toàn bộ bản quyền được bảo lưu.
      </footer>
    </div>
  );
}