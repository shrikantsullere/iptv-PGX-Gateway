import { useState } from 'react';
import { Bell, Search, Plus, Megaphone, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Notifications() {
  const [announcements] = useState([
    { title: 'Scheduled Maintenance: EU Servers', type: 'Warning', target: 'All Merchants', date: 'Upcoming (Tomorrow)' },
    { title: 'New Payment Processor Added: Stripe', type: 'Feature', target: 'Enterprise Only', date: '2 days ago' },
    { title: 'API Rate Limits Updated', type: 'System', target: 'All Merchants', date: '1 week ago' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#7C3AED]" /> Global Broadcasts
          </h1>
          <p className="text-gray-400 mt-1">Send system-wide notifications and alerts to all merchants.</p>
        </div>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Megaphone className="w-4 h-4" /> New Broadcast
        </button>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <h3 className="text-lg font-bold text-white">Broadcast History</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Message Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Target Audience</th>
              <th className="p-4 text-right">Broadcast Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {announcements.map((a, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white flex items-center gap-3">
                  {a.type === 'Warning' ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> : 
                   a.type === 'Feature' ? <Megaphone className="w-4 h-4 text-green-500" /> : 
                   <ShieldCheck className="w-4 h-4 text-blue-500" />}
                  {a.title}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    a.type === 'Warning' ? 'bg-yellow-500/10 text-yellow-500' :
                    a.type === 'Feature' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {a.type}
                  </span>
                </td>
                <td className="p-4 text-gray-400 font-medium">{a.target}</td>
                <td className="p-4 text-right text-gray-500">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
