// app/booking-time/page.tsx
import { redirect } from 'next/navigation';

export default function BookingPage() {
  // Chuyển hướng về trang chủ ngay lập tức, không cho phép load nội dung
  redirect('/'); 
}