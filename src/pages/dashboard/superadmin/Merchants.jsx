import { useState } from 'react';
import { Search, Filter, MoreVertical, Building2, Download, Plus } from 'lucide-react';

const Merchants = () => {
  const merchants = [
    { id: 'MER-1092', name: 'Acme Corp', sub: 'Enterprise', revenue: '$1.2M', status: 'Active', country: 'US', date: '2023-10-12' },
    { id: 'MER-1093', name: 'Global Tech', sub: 'Business', revenue: '$450K', status: 'Active', country: 'UK', date: '2023-11-05' },
    { id: 'MER-1094', name: 'Digital Goods', sub: 'Starter', revenue: '$12K', status: 'Suspended', country: 'CA', date: '2024-01-20' },
    { id: 'MER-1095', name: 'SaaS Connect', sub: 'Business', revenue: '$890K', status: 'Active', country: 'AU', date: '2023-08-15' },
    { id: 'MER-1096', name: 'Web3 Gaming', sub: 'Enterprise', revenue: '$3.4M', status: 'Active', country: 'SG', date: '2023-05-30' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Merchants</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all platform merchants and their configurations.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Merchant
          </button>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-white/5 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search merchants..." className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#7C3AED] outline-none" />
          </div>
          <button className="bg-black/50 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Merchant ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subscription</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {merchants.map((m, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-sm font-mono text-gray-400">{m.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center border border-[#7C3AED]/30">
                        <Building2 className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <span className="font-bold text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      m.sub === 'Enterprise' ? 'bg-pink-500/10 text-pink-500' :
                      m.sub === 'Business' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {m.sub}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">{m.revenue}</td>
                  <td className="p-4">
                    <span className={`flex w-fit items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
                      m.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{m.country}</td>
                  <td className="p-4 text-sm text-gray-400">{m.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1 to 5 of 1,204 merchants</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">Prev</button>
            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Merchants;
