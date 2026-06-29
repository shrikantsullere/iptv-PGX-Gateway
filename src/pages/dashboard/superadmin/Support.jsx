import { useState } from 'react';
import { Ticket, Search, CheckCircle2, MessageSquare, AlertCircle, Clock } from 'lucide-react';

export default function Support() {
  const [tickets] = useState([
    { id: 'TKT-8921', merchant: 'Acme Digital', subject: 'API Rate Limit Increase', status: 'Open', priority: 'High', time: '10 mins ago' },
    { id: 'TKT-8920', merchant: 'Global Tech', subject: 'Failed Settlement (Bank Error)', status: 'In Progress', priority: 'Critical', time: '1 hour ago' },
    { id: 'TKT-8919', merchant: 'Web3 Gaming', subject: 'Custom Domain SSL Pending', status: 'Resolved', priority: 'Medium', time: '5 hours ago' },
    { id: 'TKT-8918', merchant: 'SaaS Connect', subject: 'Change Billing Email', status: 'Resolved', priority: 'Low', time: '1 day ago' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Ticket className="w-8 h-8 text-[#7C3AED]" /> Global Support Desk
          </h1>
          <p className="text-gray-400 mt-1">Manage merchant inquiries and escalated technical issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Open Tickets', value: '12', icon: AlertCircle, color: 'text-yellow-500' },
          { title: 'In Progress', value: '5', icon: Clock, color: 'text-blue-500' },
          { title: 'Resolved (24h)', value: '84', icon: CheckCircle2, color: 'text-green-500' },
          { title: 'Avg Response', value: '14m', icon: MessageSquare, color: 'text-[#7C3AED]' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center">
             <stat.icon className={`w-8 h-8 mb-3 ${stat.color} opacity-80`} />
             <h3 className="text-3xl font-black text-white mb-1">{stat.value}</h3>
             <p className="text-gray-400 text-xs font-bold uppercase">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search tickets..." className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Merchant</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priority</th>
              <th className="p-4 text-right">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {tickets.map((t, i) => (
              <tr key={i} className="hover:bg-white/[0.02] cursor-pointer">
                <td className="p-4 font-mono font-bold text-gray-400">{t.id}</td>
                <td className="p-4 font-bold text-white">{t.merchant}</td>
                <td className="p-4 text-gray-300">{t.subject}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                    t.status === 'Open' ? 'bg-yellow-500/10 text-yellow-500' :
                    t.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                    t.priority === 'Critical' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                    t.priority === 'High' ? 'border-orange-500/50 text-orange-500 bg-orange-500/10' :
                    'border-gray-500/50 text-gray-400'
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="p-4 text-right text-gray-500">{t.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
