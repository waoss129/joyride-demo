"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu biểu đồ doanh thu cố định chuẩn mockup
const monthlyRevenueData = [
  { name: "T1", revenue: 45 },
  { name: "T2", revenue: 55 },
  { name: "T3", revenue: 40 },
  { name: "T4", revenue: 65 },
  { name: "T5", revenue: 80 },
  { name: "T6", revenue: 75 },
];

export default function AdminDashboard() {
  // Đặt dữ liệu mặc định chuẩn
  const [totalUsers, setTotalUsers] = useState(85);
  const [successBookings, setSuccessBookings] = useState(142);
  const [todayRevenue, setTodayRevenue] = useState(4500000);

  useEffect(() => {
    // 1. Định nghĩa hàm fetch dữ liệu từ API hệ thống
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/admin/dashboard-stats");
        
        // Kiểm tra an toàn để tránh crash khi lỗi 404 HTML xảy ra
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          if (data) {
            // Cập nhật state tự động khi có dữ liệu mới từ database
            setTotalUsers(data.totalUsers || 85);
            setSuccessBookings(data.successBookings || 142);
            setTodayRevenue(data.todayRevenue || 4500000);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu tự động hệ thống:", error);
      }
    }

    // Gọi lần đầu tiên ngay khi truy cập trang
    fetchDashboardData();

    // 2. Thiết lập cơ chế tự động cập nhật (Polling) mỗi 5 giây một lần (5000ms)
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    // Dọn dẹp bộ nhớ (bỏ interval) khi người dùng rời khỏi trang tránh tràn bộ nhớ
    return () => clearInterval(intervalId);
  }, []);

  // Thiết lập các ô thống kê: Chữ số màu ĐEN thuần, Nền vuông bọc icon màu xám tro #ccc9ce
  const stats = [
    {
      title: "Khách hàng",
      value: totalUsers.toString(),
      color: "text-black font-black", 
      bgIcon: "bg-[#ccc9ce]",          
      icon: "👥",
    },
    {
      title: "Lịch hẹn thành công",
      value: `${successBookings}`,    
      color: "text-black font-black", 
      bgIcon: "bg-[#ccc9ce]",          
      icon: "✅",
    },
    {
      title: "Doanh thu hôm nay",
      value: `${todayRevenue.toLocaleString("vi-VN")} đ`,
      color: "text-black font-black", 
      bgIcon: "bg-[#ccc9ce]",          
      icon: "💰",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto font-sans text-stone-800">
      {/* 1. THANH HEADER TÌM KIẾM TRÊN CÙNG */}
      <header className="bg-white border border-stone-200 rounded-2xl flex justify-between items-center px-6 py-4 mb-8 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng, lịch hẹn..."
            className="bg-stone-50 border border-stone-200 px-5 py-2.5 rounded-xl text-sm w-80 md:w-96 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-xl hover:scale-105 transition">
            🔔
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full ring-2 ring-white"></span>
          </button>
          <div className="flex items-center gap-3 border-l border-stone-200 pl-6">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-black text-white shadow-sm">
              A
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold block">Admin</span>
              <span className="text-xs text-stone-400 block">Quản lý</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. TIÊU ĐỀ CHÍNH & NÚT HÀNH ĐỘNG ĐEN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">
            Tổng quan hệ thống
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Chào mừng quay trở lại, đây là số liệu dữ liệu tự động cập nhật liên tục từ hệ thống.
          </p>
        </div>
        <button className="bg-black text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-stone-900 transition shadow-sm">
          + Thêm lịch hẹn mới
        </button>
      </div>

      {/* 3. THÈ THỐNG KÊ (Hàng 3 ô cập nhật tự động) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex justify-between items-center hover:shadow-md transition duration-200"
          >
            <div>
              <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider">
                {stat.title}
              </h3>
              <p className={`text-3xl font-black mt-2 tracking-tight ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-14 h-14 ${stat.bgIcon} rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 4. BIỂU ĐỒ DOANH THU CỘT ĐEN THUẦN CHUẨN MOCKUP */}
      <div className="w-full bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
        <div className="mb-6">
          <h3 className="font-bold text-lg text-stone-800">
            Biểu đồ doanh thu theo tháng (Trăm triệu VNĐ)
          </h3>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyRevenueData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#a8a29e" fontSize={12} tickLine={false} />
              <YAxis stroke="#a8a29e" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
                labelStyle={{ fontWeight: "bold", color: "#1c1917" }}
              />
              <Bar dataKey="revenue" fill="#000000" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}