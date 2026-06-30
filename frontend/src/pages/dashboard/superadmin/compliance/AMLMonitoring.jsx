import { useState } from 'react';
import { Eye, Search, Filter, AlertTriangle, ShieldAlert, CheckCircle2, Clock, ArrowUpRight, X, Loader2, Flag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const riskTrend = [
  { date: 'Jun 23', alerts: 4 }, { date: 'Jun 24', alerts: 7 }, { date: 'Jun 25', alerts: 3 },
  { date: 'Jun 26', alerts: 9 }, { date: 'Jun 27', alerts: 5 }, { date: 'Jun 28', alerts: 12 },
  { date: 'Jun 29', alerts: 6 },
];

const amlAlerts = [
  { id: 'AML-4421', entity: 'Global Trade Inc', amount: '$48,200', type: 'Structuring', severity: 'High', time: '15 mins ago', status: 'Open' },
  { id: 'AML-4420', entity: 'StreamBox LLC', amount: '$12,000', type: 'Layering', severity: 'Medium', time: '1 hour ago', status: 'Investigating' },
  { id: 'AML-4419', entity: 'John Doe', amount: '$9,800', type: 'Smurfing', severity: 'Low', time: '3 hours ago', status: 'Resolved' },
  { id: 'AML-4418', entity: 'Novo Payments', amount: '$125,000', type: 'Unusual Volume', severity: 'High', time: '5 hours ago', status: 'Open' },
  { id: 'AML-4417', entity: 'Maria Santos', amount: '$4,400', type: 'Rapid Movement', severity: 'Low', time: '8 hours ago', status: 'Resolved' },
];

const severityStyle = (s) => ({
  High: 'bg-red-500/10 text-red-500 border-red-500/20',
  Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Low: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
}[s] || '');

const statusStyle = (s) => ({
  Open: 'bg-red-500/10 text-red-400 border-red-500/20',
  Investigating: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
}[s] || '');

export default function AMLMonitoring() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [flagging, setFlagging] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);

  const filtered = amlAlerts.filter(a =>
    a.entity.toLowerCase().includes(search.toLowerCase()) || a.id.includes(search)
  );

  const handleFlag = () => {
    setFlagging(true);
    setTimeout(() => { setFlagging(false); setFlagged(true); setTimeout(() => { setFlagged(false); setSelected(null); }, 1500); }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Eye className="w-8 h-8 text-red-500" /> AML Monitoring
          </h1>
          <p className="text-gray-400 mt-1">Anti-Money Laundering alerts, suspicious activity detection and case review.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setShowFlagModal(true)} className="flex-1 sm:flex-none bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Flag for Escalation
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Open Alerts', value: '2', color: 'text-red-400', icon: AlertTriangle, bg: 'bg-red-500/20', iconColor: 'text-red-500' },
          { label: 'Investigating', value: '1', color: 'text-blue-400', icon: Search, bg: 'bg-blue-500/20', iconColor: 'text-blue-500' },
          { label: 'Resolved Today', value: '4', color: 'text-green-400', icon: CheckCircle2, bg: 'bg-green-500/20', iconColor: 'text-green-500' },
          { label: 'Flagged Entities', value: '3', color: 'text-orange-400', icon: Flag, bg: 'bg-orange-500/20', iconColor: 'text-orange-500' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity`} />
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Alert Trend Chart */}
      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> AML Alert Trend (Last 7 Days)
          </h3>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">AML Alert Log</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entity or alert ID..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Alert ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Entity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Alert Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Amount</th>
                <th className="p-5 font-bold uppercase tracking-wider">Severity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filtered.map((alert, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-mono text-xs font-bold text-gray-300">{alert.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-white">{alert.entity}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{alert.time}</div>
                  </td>
                  <td className="p-5 text-gray-300 font-medium text-xs">{alert.type}</td>
                  <td className="p-5 font-black text-white font-mono">{alert.amount}</td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${severityStyle(alert.severity)}`}>{alert.severity}</span>
                  </td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle(alert.status)}`}>{alert.status}</span>
                  </td>
                  <td className="p-5 text-right">
                    <button onClick={() => setSelected(alert)} className="text-xs font-bold text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-colors">
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigate Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> {selected.id}
              </h3>
              {!flagging && !flagged && <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            {flagged ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Alert Escalated!</h4>
                <p className="text-gray-400 text-sm">The compliance team has been notified for {selected.entity}.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Entity</div>
                    <div className="font-bold text-white text-sm">{selected.entity}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Alert Type</div>
                    <div className="font-bold text-white text-sm">{selected.type}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Amount</div>
                    <div className="font-black text-red-400 text-lg">{selected.amount}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Severity</div>
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${severityStyle(selected.severity)}`}>{selected.severity}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Investigator Notes</label>
                  <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm resize-none" placeholder="Add notes for compliance team..." />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSelected(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors text-sm">Mark Resolved</button>
                  <button onClick={handleFlag} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all h-12 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    {flagging ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Escalate Alert'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flag for Escalation Modal (Header Button) */}
      {showFlagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Flag Entity
              </h3>
              {!flagging && !flagged && <button onClick={() => setShowFlagModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            {flagged ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Entity Flagged!</h4>
                <p className="text-gray-400 text-sm">The compliance team has been notified.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Entity Name / ID</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm" placeholder="Search entity..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Reason for Escalation</label>
                  <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm resize-none" placeholder="Add notes for compliance team..." />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowFlagModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors text-sm">Cancel</button>
                  <button onClick={() => {
                      setFlagging(true);
                      setTimeout(() => { setFlagging(false); setFlagged(true); setTimeout(() => { setFlagged(false); setShowFlagModal(false); }, 1500); }, 1200);
                  }} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all h-12 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    {flagging ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Flag Entity'}
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
