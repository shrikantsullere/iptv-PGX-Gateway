import { useState } from 'react';
import { BarChart3, Download, Filter, FileText, PieChart, TrendingUp } from 'lucide-react';

export default function Reports() {
  const [reports] = useState([
    { id: 'REP-2023-11', type: 'Gateway P&L', generated: '2 hours ago', size: '2.4 MB' },
    { id: 'REP-2023-11-TAX', type: 'Global Tax Liability', generated: '1 day ago', size: '1.1 MB' },
    { id: 'REP-2023-10', type: 'Gateway P&L', generated: '1 month ago', size: '2.3 MB' },
    { id: 'REP-2023-Q3', type: 'Quarterly Volume', generated: '3 months ago', size: '8.4 MB' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#7C3AED]" /> System Reports & Analytics
          </h1>
          <p className="text-gray-400 mt-1">Generate and download master P&L, volume, and tax reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-white/10 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
            <FileText className="w-4 h-4" /> Generate New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
           <div>
             <p className="text-gray-400 text-xs font-bold uppercase mb-1">Total Processed (YTD)</p>
             <h3 className="text-3xl font-black text-white">$1.24B</h3>
             <span className="text-green-500 text-xs font-bold flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> +14.5% vs Last Year</span>
           </div>
           <PieChart className="w-12 h-12 text-[#7C3AED] opacity-50" />
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <h3 className="text-lg font-bold text-white">Generated Reports</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Report ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Generated</th>
              <th className="p-4">Size</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {reports.map((r, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-mono font-bold text-gray-400">{r.id}</td>
                <td className="p-4 font-bold text-white">{r.type}</td>
                <td className="p-4 text-gray-400">{r.generated}</td>
                <td className="p-4 text-gray-500 text-xs">{r.size}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="p-2 text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
