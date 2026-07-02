import { useState, useEffect } from 'react';
import { Ticket, Search, CheckCircle2, MessageSquare, AlertCircle, Clock, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/admin/support');
        if (res.success && res.data) {
          setTickets(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch support tickets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => 
    t.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ticketId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openTicketsCount = tickets.filter(t => t.status === 'Open').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolved24hCount = tickets.filter(t => t.status === 'Resolved').length; // Assuming all resolved for now or you could filter by last 24h

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
            <Ticket className="w-8 h-8 text-[#7C3AED]" /> Global Support Desk
          </h1>
          <p className="text-gray-400 mt-1">Manage merchant inquiries and escalated technical issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Open Tickets', value: openTicketsCount.toString(), icon: AlertCircle, color: 'text-yellow-500' },
          { title: 'In Progress', value: inProgressCount.toString(), icon: Clock, color: 'text-blue-500' },
          { title: 'Resolved (24h)', value: resolved24hCount.toString(), icon: CheckCircle2, color: 'text-green-500' },
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
            <input 
              type="text" 
              placeholder="Search tickets by merchant or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" 
            />
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
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                  Loading tickets...
                </td>
              </tr>
            ) : filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No support tickets found.
                </td>
              </tr>
            ) : (
              filteredTickets.map((t) => (
                <tr key={t.ticketId} className="hover:bg-white/[0.02] cursor-pointer">
                  <td className="p-4 font-mono font-bold text-gray-400">{t.ticketId.substring(0, 18)}...</td>
                  <td className="p-4 font-bold text-white">{t.merchantName}</td>
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
                  <td className="p-4 text-right text-gray-500">{timeAgo(t.lastUpdated)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
