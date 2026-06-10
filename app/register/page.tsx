"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State quản lý dữ liệu nhập vào
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State quản lý thông báo lỗi và trạng thái loading
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hàm chuyển ngược về login kèm theo params cũ
  const handleNavigateToLogin = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/login?${params.toString()}`);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp. Bạn kiểm tra lại nhé!");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu cần ít nhất 6 ký tự để bảo mật.");
      return;
    }

    setIsLoading(true);

    try {
      // Giả lập chờ đợi phản hồi từ server
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Dữ liệu đăng ký:", { fullName, email, password });

      // Sau khi đăng ký xong, tự động đưa họ về trang đăng nhập và giữ params để họ login tiếp
      handleNavigateToLogin();
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra khi đăng ký.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-stone-800 font-sans antialiased flex flex-col justify-between">
      {/* 1. NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#CFECF3] px-8 py-4 shadow-sm w-full">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-2xl font-black bg-gradient-to-r from-[#FBBFDC] to-[#99DDF0] bg-clip-text text-transparent tracking-wider font-mono">
              JoyRide
            </span>
          </div>
          {/* ĐÃ SỬA: Thay đổi từ router.push('/login') cố định thành hàm handleNavigateToLogin */}
          <button
            onClick={handleNavigateToLogin}
            className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            Đã có tài khoản? Đăng nhập →
          </button>
        </div>
      </nav>

      {/* 2. KHỐI FORM ĐĂNG KÝ */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#99DDF0]/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-[#FBBFDC]/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#CFECF3]/40 shadow-xl shadow-stone-200/30 relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Tạo tài khoản mới
            </h1>
            <p className="text-sm text-stone-500 font-medium">
              Tham gia JoyRide để tận hưởng dịch vụ làm đẹp chuẩn 5 sao.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold rounded-xl leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider pl-1">
                Họ và Tên
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#99DDF0] focus:ring-2 focus:ring-[#99DDF0]/20 transition-all font-medium text-sm"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider pl-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#99DDF0] focus:ring-2 focus:ring-[#99DDF0]/20 transition-all font-medium text-sm"
                placeholder="name@gmail.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider pl-1">
                Mật khẩu
              </label>
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider pl-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#FBBFDC] focus:ring-2 focus:ring-[#FBBFDC]/20 transition-all font-medium text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#99DDF0] hover:bg-[#86CDDE] disabled:bg-stone-200 disabled:text-stone-400 text-white font-black py-3.5 rounded-xl shadow-md shadow-blue-50 transition-all text-sm tracking-widest uppercase transform hover:-translate-y-0.5 mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? "Đang tạo tài khoản..." : "Đăng ký ngay ✨"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 text-center text-xs text-stone-400">
            Bằng cách đăng ký, bạn đồng ý với Điều khoản & Chính sách của JoyRide.
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-stone-400 font-medium border-t border-stone-100 bg-white w-full">
        © 2026 JoyRide Beauty Studio.
      </footer>
    </div>
  );
}