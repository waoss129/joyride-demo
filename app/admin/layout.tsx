export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-stone-50">
      
      {/* THANH SIDEBAR TRÁI: Giữ nguyên nền Trắng gốc */}
      <aside className="w-64 bg-white border-r border-stone-200 p-6 flex flex-col justify-between">
        <div>
          {/* ĐÃ ĐỔI: Chữ JoyRide Admin sang MÀU ĐEN hoàn toàn (Yêu cầu ảnh 1) */}
          <h1 className="text-2xl font-black text-black mb-10 tracking-tight">
            JoyRide Admin
          </h1>
          
          <nav className="space-y-1">
            {/* Mục Dashboard giữ nguyên màu hồng nhạt gốc */}
            <a
              href="/admin/dashboard"
              className="block p-3 bg-pink-50 text-pink-600 rounded-xl font-bold transition-colors"
            >
              📊 Dashboard
            </a>

            <div className="pt-4 pb-1 px-3 text-xs font-bold text-stone-400 uppercase tracking-widest">
              Quản lý
            </div>
            <a href="/admin/appointments" className="block p-3 text-stone-600 hover:bg-stone-50 rounded-xl font-bold transition-colors">
              📅 Lịch hẹn
            </a>
            <a href="/admin/users" className="block p-3 text-stone-600 hover:bg-stone-50 rounded-xl font-bold transition-colors">
              👥 Khách hàng
            </a>
            <a href="/admin/staff" className="block p-3 text-stone-600 hover:bg-stone-50 rounded-xl font-bold transition-colors">
              👩‍💼 Nhân viên
            </a>

            <div className="pt-4 pb-1 px-3 text-xs font-bold text-stone-400 uppercase tracking-widest">
              Dịch vụ
            </div>
            <a href="/admin/services/hair" className="block p-3 pl-6 text-stone-600 hover:bg-stone-50 rounded-xl font-semibold transition-colors">
              ✂️ Tóc
            </a>
            <a href="/admin/services/nail" className="block p-3 pl-6 text-stone-600 hover:bg-stone-50 rounded-xl font-semibold transition-colors">
              💅 Nail
            </a>
            <a href="/admin/services/spa" className="block p-3 pl-6 text-stone-600 hover:bg-stone-50 rounded-xl font-semibold transition-colors">
              🌿 Spa
            </a>
          </nav>
        </div>
      </aside>

      {/* SLIDE PHẢI (MAIN CONTENT): Đổi sang nền màu kem #f7f4e9 (Yêu cầu ảnh 2) */}
      <main className="flex-1 p-8 bg-[#f7f4e9] min-h-screen">
        {children}
      </main>

    </div>
  );
}