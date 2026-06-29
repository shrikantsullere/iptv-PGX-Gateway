import { useState } from 'react';
import { Globe2, Search, Plus, MoreVertical, Edit2, ShieldBan, Map } from 'lucide-react';

export default function Countries() {
  const [countries] = useState([
    { name: 'United States', code: 'US', region: 'North America', status: 'Active', merchants: 1240, methods: 12 },
    { name: 'United Kingdom', code: 'UK', region: 'Europe', status: 'Active', merchants: 850, methods: 9 },
    { name: 'India', code: 'IN', region: 'Asia', status: 'Active', merchants: 420, methods: 5 },
    { name: 'Russia', code: 'RU', region: 'Europe/Asia', status: 'Sanctioned', merchants: 0, methods: 0 },
    { name: 'Brazil', code: 'BR', region: 'South America', status: 'Active', merchants: 310, methods: 4 },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-[#7C3AED]" /> Global Jurisdictions
          </h1>
          <p className="text-gray-400 mt-1">Manage supported countries and regional compliance blocks.</p>
        </div>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Region
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: 'Supported Countries', value: '184', icon: Globe2, color: 'text-blue-500' },
          { title: 'Sanctioned / Blocked', value: '12', icon: ShieldBan, color: 'text-red-500' },
          { title: 'High Risk Regions', value: '8', icon: Map, color: 'text-yellow-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</p>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search countries..." className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Country</th>
              <th className="p-4">Region</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Merchants</th>
              <th className="p-4 text-right">Payment Methods</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {countries.map((c, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-gray-400">{c.code}</div>
                  {c.name}
                </td>
                <td className="p-4 text-gray-400">{c.region}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-white">{c.merchants}</td>
                <td className="p-4 text-right font-bold text-gray-400">{c.methods}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
