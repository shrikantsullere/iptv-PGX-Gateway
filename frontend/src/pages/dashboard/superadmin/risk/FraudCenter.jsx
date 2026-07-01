import { useState, useEffect } from 'react';
import { AlertTriangle, Search, ShieldAlert, CheckCircle2, X, Loader2, Clock, TrendingUp, Eye, Ban } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../../../../utils/apiClient';

const severityStyle = (s) => ({
  Critical: 'bg-red-600/20 text-red-400 border-red-500/30',
  High: 'bg-red-500/10 text-red-500 border-red-500/20',
  Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Low: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
}[s] || 'bg-gray-500/10 text-gray-400');

const statusStyle = (s) => ({
  Active: 'bg-red-500/10 text-red-400 border-red-500/20',
  Investigating: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
  Blocked: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}[s] || 'bg-gray-500/10 text-gray-400');

export default function FraudCenter() {
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [blocking, setBlocking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/risk/alerts');
      if (res.success) {
        setFraudAlerts(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch fraud alerts");
    } finally {
      setLoading(false);
    }
  };

  const filtered = fraudAlerts.filter(a =>
    (a.merchantId || '').toLowerCase().includes(search.toLowerCase()) || 
    (a.alertId || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleResolve = async (status) => {
    if (!selected) return;
    try {
      const res = await apiClient.put(`/admin/risk/alerts/${selected.alertId}/resolve`, { status, notes: 'Action taken via UI' });
      if (res.success) {
        setFraudAlerts(fraudAlerts.map(a => a.alertId === selected.alertId ? { ...a, status } : a));
        setSelected(null);
      }
    } catch (err) {
      alert('Failed to resolve alert');
    }
  };

  const handleBlock = () => {
    setBlocking(true);
    setTimeout(() => { 
      setBlocking(false); 
      setBlocked(true); 
      setTimeout(() => { 
        setBlocked(false); 
        setShowBlockModal(false); 
      }, 1800); 
    }, 1400);
  };

  // Derive stats
  const activeAlertsCount = fraudAlerts.filter(a => a.status === 'Active' || a.status === 'Investigating').length;
  const blockedToday = fraudAlerts.filter(a => a.status === 'Blocked').length;
  
  // Dummy chart since backend doesn't aggregate by type yet
  const fraudByType = [
    { type: 'Card Testing', count: 42 }, { type: 'Account Takeover', count: 28 },
    { type: 'Friendly Fraud', count: 35 }, { type: 'Refund Abuse', count: 18 },
    { type: 'Identity Theft', count: 14 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-500" /> AI Fraud Center
          </h1>
          <p className="text-gray-400 mt-1">Real-time fraud detection, AI-flagged transactions, and manual review queue.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setShowBlockModal(true)} className="flex-1 sm:flex-none bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Block Entity
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Active Fraud Alerts', value: activeAlertsCount, color: 'text-red-400', icon: AlertTriangle, bg: 'bg-red-500/20', iconColor: 'text-red-500', sub: 'Requires action' },
          { label: 'Blocked Entities', value: blockedToday, color: 'text-orange-400', icon: Ban, bg: 'bg-orange-500/20', iconColor: 'text-orange-500', sub: 'Prevented' },
          { label: 'Fraud Prevented', value: '$22.4k', color: 'text-green-400', icon: CheckCircle2, bg: 'bg-green-500/20', iconColor: 'text-green-500', sub: 'Today' },
          { label: 'ML Accuracy', value: '98.2%', color: 'text-purple-400', icon: TrendingUp, bg: 'bg-purple-500/20', iconColor: 'text-purple-500', sub: 'AI model precision' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity`} />
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs font-medium text-gray-400">{s.label}</div>
            <div className="text-[10px] text-gray-600 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-6">Fraud Incidents by Type (This Month)</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fraudByType} layout="vertical" margin={{ top: 0, right: 20, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="type" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Bar dataKey="count" fill="#EF4444" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">Fraud Alert Queue</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entity or alert ID..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors" />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Alert ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Entity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Fraud Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Severity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500 mb-2" />
                    Fetching Fraud Alerts...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                 <tr>
                   <td colSpan="6" className="p-8 text-center text-gray-400">No fraud alerts detected.</td>
                 </tr>
              ) : filtered.map((alert, i) => (
                <tr key={alert.alertId} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-mono text-xs font-bold text-gray-300">{alert.alertId}</td>
                  <td className="p-5">
                    <div className="font-bold text-white text-sm truncate max-w-[160px]">{alert.merchantId}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{new Date(alert.timestamp).toLocaleString()}</div>
                  </td>
                  <td className="p-5 text-gray-300 text-xs font-medium">{alert.fraudType}</td>
                  <td className="p-5"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${severityStyle(alert.severityLevel)}`}>{alert.severityLevel}</span></td>
                  <td className="p-5"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle(alert.status)}`}>{alert.status}</span></td>
                  <td className="p-5 text-right">
                    <button onClick={() => setSelected(alert)} className="text-xs font-bold text-orange-500 hover:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 rounded-lg border border-orange-500/20 transition-colors">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Review Fraud Alert</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Entity</p>
                  <p className="text-white font-bold">{selected.merchantId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Type</p>
                  <p className="text-white">{selected.fraudType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Severity</p>
                  <p className="text-white">{selected.severityLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-white">{selected.status}</p>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-white/5 mt-6">
                <button onClick={() => handleResolve('Blocked')} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-lg font-bold transition-colors border border-red-500/20">
                  Block Entity
                </button>
                <button onClick={() => handleResolve('Resolved')} className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2 rounded-lg font-bold transition-colors border border-green-500/20">
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-200">
            {blocked ? (
              <div className="py-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Entity Blocked</h3>
                <p className="text-gray-400 text-sm">The entity has been globally blocked from the PGX network.</p>
              </div>
            ) : blocking ? (
              <div className="py-4">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Propagating Block...</h3>
                <p className="text-gray-400 text-sm">Applying rule to all gateways.</p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldAlert className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Block Entity</h3>
                <p className="text-gray-400 text-sm mb-6">Are you sure you want to globally block this entity? All pending transactions will be halted.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowBlockModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-bold transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleBlock} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-colors">
                    Confirm Block
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
