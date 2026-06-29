import { useState } from 'react';
import { AlertTriangle, Search, ShieldAlert, CheckCircle2, X, Loader2, Clock, TrendingUp, Eye, Ban } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fraudByType = [
  { type: 'Card Testing', count: 42 }, { type: 'Account Takeover', count: 28 },
  { type: 'Friendly Fraud', count: 35 }, { type: 'Refund Abuse', count: 18 },
  { type: 'Identity Theft', count: 14 },
];

const fraudAlerts = [
  { id: 'FRD-2241', entity: 'Anonymous_8821', type: 'Card Testing', amount: '$4,200', txCount: 84, severity: 'Critical', time: '5 mins ago', status: 'Active' },
  { id: 'FRD-2240', entity: 'john.doe91@mail.com', type: 'Account Takeover', amount: '$18,400', txCount: 12, severity: 'High', time: '22 mins ago', status: 'Active' },
  { id: 'FRD-2239', entity: 'StreamBox LLC', type: 'Friendly Fraud', amount: '$2,100', txCount: 8, severity: 'Medium', time: '1 hour ago', status: 'Investigating' },
  { id: 'FRD-2238', entity: 'Maria Santos', type: 'Refund Abuse', amount: '$900', txCount: 5, severity: 'Low', time: '3 hours ago', status: 'Resolved' },
  { id: 'FRD-2237', entity: 'TechCo Dev API', type: 'Card Testing', amount: '$340', txCount: 120, severity: 'Critical', time: '5 hours ago', status: 'Blocked' },
];

const severityStyle = (s) => ({
  Critical: 'bg-red-600/20 text-red-400 border-red-500/30',
  High: 'bg-red-500/10 text-red-500 border-red-500/20',
  Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Low: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
}[s] || '');

const statusStyle = (s) => ({
  Active: 'bg-red-500/10 text-red-400 border-red-500/20',
  Investigating: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
  Blocked: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}[s] || '');

export default function FraudCenter() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [blocking, setBlocking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const filtered = fraudAlerts.filter(a =>
    a.entity.toLowerCase().includes(search.toLowerCase()) || a.id.includes(search)
  );

  const handleBlock = () => {
    setBlocking(true);
    setTimeout(() => { setBlocking(false); setBlocked(true); setTimeout(() => { setBlocked(false); setSelected(null); }, 1800); }, 1400);
  };

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
          { label: 'Active Fraud Alerts', value: '2', color: 'text-red-400', icon: AlertTriangle, bg: 'bg-red-500/20', iconColor: 'text-red-500', sub: 'Requires action' },
          { label: 'Blocked Today', value: '7', color: 'text-orange-400', icon: Ban, bg: 'bg-orange-500/20', iconColor: 'text-orange-500', sub: 'Entities blocked' },
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
                <th className="p-5 font-bold uppercase tracking-wider">Amount</th>
                <th className="p-5 font-bold uppercase tracking-wider">TX Count</th>
                <th className="p-5 font-bold uppercase tracking-wider">Severity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filtered.map((alert, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-mono text-xs font-bold text-gray-300">{alert.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-white text-sm truncate max-w-[160px]">{alert.entity}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{alert.time}</div>
                  </td>
                  <td className="p-5 text-gray-300 text-xs font-medium">{alert.type}</td>
                  <td className="p-5 font-black text-white font-mono">{alert.amount}</td>
                  <td className="p-5 font-mono font-bold text-gray-300">{alert.txCount}</td>
                  <td className="p-5"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${severityStyle(alert.severity)}`}>{alert.severity}</span></td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" /> {selected.id}
              </h3>
              {!blocking && !blocked && <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            {blocked ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Entity Blocked!</h4>
                <p className="text-gray-400 text-sm">{selected.entity} has been blocked from all transactions.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Entity', value: selected.entity },
                    { label: 'Fraud Type', value: selected.type },
                    { label: 'Total Amount', value: selected.amount },
                    { label: 'TX Count', value: selected.txCount },
                  ].map((f, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{f.label}</div>
                      <div className="font-bold text-white text-sm truncate">{f.value}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-orange-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> Severity: <strong className="text-white ml-1">{selected.severity}</strong>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Analyst Notes</label>
                  <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm resize-none" placeholder="Add your investigation notes..." />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSelected(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors text-sm">Mark Safe</button>
                  <button onClick={handleBlock} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all h-12 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    {blocking ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Ban className="w-4 h-4 mr-1.5" /> Block Entity</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Block Entity Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-500" /> Manual Block Entity
              </h3>
              {!blocking && !blocked && <button onClick={() => setShowBlockModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            {blocked ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Entity Blocked!</h4>
                <p className="text-gray-400 text-sm">The entity has been successfully added to the blocklist.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Entity ID / Email / IP</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm" placeholder="e.g. user@example.com" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Reason for Blocking</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm mb-3">
                    <option>Known Fraudster</option>
                    <option>Chargeback Abuse</option>
                    <option>Suspicious Activity</option>
                  </select>
                  <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm resize-none" placeholder="Additional details..." />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowBlockModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors text-sm">Cancel</button>
                  <button onClick={() => {
                      setBlocking(true);
                      setTimeout(() => { setBlocking(false); setBlocked(true); setTimeout(() => { setBlocked(false); setShowBlockModal(false); }, 1500); }, 1200);
                  }} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all h-12 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    {blocking ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Ban className="w-4 h-4 mr-1.5" /> Confirm Block</>}
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
