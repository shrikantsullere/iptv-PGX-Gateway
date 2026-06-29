import { useState } from 'react';
import { ClipboardList, Search, UserCheck, ShieldAlert, Settings } from 'lucide-react';

export default function AuditLogs() {
  const [logs] = useState([
    { action: 'Disabled Merchant Account (MER-1092)', admin: 'superadmin@pgx.com', ip: '192.168.1.1', time: '10 mins ago', type: 'Security' },
    { action: 'Updated Global API Rate Limit', admin: 'devops@pgx.com', ip: '10.0.0.4', time: '2 hours ago', type: 'Config' },
    { action: 'Approved White-Label Domain', admin: 'support@pgx.com', ip: '192.168.1.5', time: '5 hours ago', type: 'Operation' },
    { action: 'Admin Login', admin: 'superadmin@pgx.com', ip: '192.168.1.1', time: '1 day ago', type: 'Access' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-[#7C3AED]" /> Immutable Audit Logs
          </h1>
          <p className="text-gray-400 mt-1">Track every action taken by administrators on the PGX platform.</p>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by description..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" 
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Action Type</th>
              <th className="p-4">Description</th>
              <th className="p-4">Administrator</th>
              <th className="p-4">IP Address</th>
              <th className="p-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredLogs.map((log, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                    log.type === 'Security' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                    log.type === 'Config' ? 'border-purple-500/50 text-purple-500 bg-purple-500/10' :
                    log.type === 'Access' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                    'border-blue-500/50 text-blue-500 bg-blue-500/10'
                  }`}>
                    {log.type}
                  </span>
                </td>
                <td className="p-4 font-bold text-white">{log.action}</td>
                <td className="p-4 text-gray-300 flex items-center gap-2"><UserCheck className="w-4 h-4 text-gray-500"/> {log.admin}</td>
                <td className="p-4 font-mono text-gray-500 text-xs">{log.ip}</td>
                <td className="p-4 text-right text-gray-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
