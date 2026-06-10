'use client';
import { useRouter } from 'next/navigation';

export default function NailPage() {
  const router = useRouter();
  const combos = [
    { name: 'PEONY', price: '995k', desc: 'Kiêu sa, lộng lẫy' },
    { name: 'SAKURA', price: '875k', desc: 'Rực rỡ, dịu dàng' },
    { name: 'LAVENDER', price: '425k', desc: 'Hoàn mỹ, bền lâu' },
    { name: 'SUNFLOWER', price: '295k', desc: 'Kiên định, chân thành' },
  ];

  return (
    <div className='min-h-screen bg-[#FFFDF0] p-8 md:p-16'>
      <div className='max-w-4xl mx-auto'>
        <button onClick={() => router.back()} className='text-stone-400 hover:text-stone-900 mb-8 font-bold text-sm uppercase tracking-widest'>← Quay lại</button>
        <h1 className='text-5xl font-black text-stone-900 mb-12'>Nail Art <span className='text-blue-400'>Nghệ Thuật</span></h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {combos.map((item, idx) => (
            <div key={idx} className='bg-white p-6 rounded-3xl border border-blue-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between'>
              <div>
                <div className='text-xs font-bold text-blue-400 uppercase tracking-widest mb-2'>Nail Design</div>
                <h2 className='text-xl font-black text-stone-900 mb-2'>{item.name}</h2>
                <p className='text-stone-500 text-sm mb-6'>{item.desc}</p>
              </div>
              <div className='flex justify-between items-center border-t pt-4 mt-2'>
                <span className='font-black text-stone-800'>{item.price}</span>
<button 
  onClick={() => router.push(`/booking?combo=${item.name}&price=${item.price}`)} 
  className='bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-400'
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