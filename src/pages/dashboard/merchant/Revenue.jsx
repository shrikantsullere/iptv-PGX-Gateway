import { DollarSign, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Revenue = () => {
  const data = [
    { name: 'Week 1', revenue: 15000, fee: 150 },
    { name: 'Week 2', revenue: 22000, fee: 220 },
    { name: 'Week 3', revenue: 18000, fee: 180 },
    { name: 'Week 4', revenue: 28000, fee: 280 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Revenue Breakdown</h1>
          <p className="text-gray-400 text-sm mt-1">Detailed view of your gross volume and platform fees.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Download Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Gross Revenue (MTD)</div>
           <div className="text-3xl font-black text-white">$83,000.00</div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Network & Gateway Fees</div>
           <div className="text-3xl font-black text-red-500">-$830.00</div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Net Revenue</div>
           <div className="text-3xl font-black text-green-500">$82,170.00</div>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl h-96">
         <h3 className="text-lg font-bold text-white mb-6">Monthly Performance</h3>
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data}>
             <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
             <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
             <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
             <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
             <Bar dataKey="revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Gross Revenue" />
             <Bar dataKey="fee" fill="#ef4444" radius={[4, 4, 0, 0]} name="Fees" />
           </BarChart>
         </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Revenue;
