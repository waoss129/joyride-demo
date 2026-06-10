export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar - Cố định bên trái */}
      <aside className="w-64 bg-white border-r border-stone-200 p-6">
        <h1 className="text-2xl font-black text-pink-500 mb-10">
          JoyRide Admin
        </h1>
        <nav className="space-y-2">
          <a
            href="/admin/dashboard"
            className="block p-3 bg-pink-50 text-pink-600 rounded-xl font-bold"
          >
            Dashboard
          </a>
          <a
            href="/admin/appointments"
            className="block p-3 text-stone-600 hover:bg-stone-100 rounded-xl font-bold"
          >
            Lịch hẹn
          </a>
          <a
            href="/admin/users"
            className="block p-3 text-stone-600 hover:bg-stone-100 rounded-xl font-bold"
          >
            Khách hàng
          </a>
        </nav>
      </aside>

      {/* Main Content - Nội dung trang con */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
