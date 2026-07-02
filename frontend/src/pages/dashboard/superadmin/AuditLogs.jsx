import { useState, useEffect } from 'react';
import { ClipboardList, Search, UserCheck, ShieldAlert, Settings, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/audit-logs');
      if (res.success && res.data) {
        setLogs(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch audit logs', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(l => 
    l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const timeAgo = (date) => {
    if (!date) return 'Never';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} secs ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hrs ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
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
              {loading ? (
                 <tr>
                   <td colSpan="5" className="p-8 text-center text-gray-400">
                     <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                     Fetching Secure Ledger...
                   </td>
                 </tr>
              ) : filteredLogs.length === 0 ? (
                 <tr>
                   <td colSpan="5" className="p-8 text-center text-gray-500">
                     No audit logs found.
                   </td>
                 </tr>
              ) : filteredLogs.map((log) => (
                <tr key={log.auditId} className="hover:bg-white/[0.02]">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                      log.actionType === 'Security' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                      log.actionType === 'Config' ? 'border-purple-500/50 text-purple-500 bg-purple-500/10' :
                      log.actionType === 'Access' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                      'border-blue-500/50 text-blue-500 bg-blue-500/10'
                    }`}>
                      {log.actionType}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">{log.description}</td>
                  <td className="p-4 text-gray-300 flex items-center gap-2"><UserCheck className="w-4 h-4 text-gray-500"/> {log.administratorEmail}</td>
                  <td className="p-4 font-mono text-gray-500 text-xs">{log.ipAddress}</td>
                  <td className="p-4 text-right text-gray-400">{timeAgo(log.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
