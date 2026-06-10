export default function AdminDashboard() {
  const stats = [
    { title: "Lịch hẹn mới", value: "12", color: "text-blue-500" },
    { title: "Doanh thu hôm nay", value: "4.5M", color: "text-green-500" },
    { title: "Khách hàng", value: "85", color: "text-purple-500" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-black text-stone-900 mb-8">Tổng quan</h2>
      
      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-stone-500 text-sm font-bold uppercase">{stat.title}</h3>
            <p className={`text-4xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bảng dữ liệu mẫu */}
      <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
        <h3 className="font-bold mb-4">Lịch hẹn gần đây</h3>
        <div className="text-stone-400 text-sm italic">
          (Dữ liệu từ Database sẽ hiển thị tại đây...)
        </div>
      </div>
    </div>
  );
}