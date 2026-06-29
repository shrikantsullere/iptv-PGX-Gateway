import { useState } from 'react';
import { ShieldAlert, AlertTriangle, TrendingUp, TrendingDown, Activity, CheckCircle2, ArrowUpRight, Server, Zap, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const riskTrend = [
  { time: 'Mon', score: 42 }, { time: 'Tue', score: 58 }, { time: 'Wed', score: 35 },
  { time: 'Thu', score: 72 }, { time: 'Fri', score: 48 }, { time: 'Sat', score: 30 },
  { time: 'Sun', score: 55 },
];

const radarData = [
  { subject: 'Fraud Rate', A: 68 }, { subject: 'Chargeback', A: 42 }, { subject: 'AML Risk', A: 55 },
  { subject: 'Velocity', A: 80 }, { subject: 'Geo Anomaly', A: 35 }, { subject: 'Identity', A: 60 },
];

const topRisks = [
  { entity: 'Global Trade Inc', type: 'Velocity Abuse', score: 92, trend: 'up', txCount: 140 },
  { entity: 'Anonymous_8821', type: 'Geo Anomaly', score: 88, trend: 'up', txCount: 42 },
  { entity: 'StreamBox LLC', type: 'Chargeback Spike', score: 74, trend: 'down', txCount: 88 },
  { entity: 'MoonPay API Key', type: 'Unusual Volume', score: 68, trend: 'up', txCount: 210 },
  { entity: 'Maria Santos', type: 'AML Watchlist', score: 61, trend: 'stable', txCount: 22 },
];

const riskColor = (score) => {
  if (score >= 80) return 'text-red-500';
  if (score >= 60) return 'text-orange-500';
  return 'text-yellow-500';
};

const riskBg = (score) => {
  if (score >= 80) return 'bg-red-500/10 border-red-500/20';
  if (score >= 60) return 'bg-orange-500/10 border-orange-500/20';
  return 'bg-yellow-500/10 border-yellow-500/20';
};

export default function RiskDashboard() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showIncidentsModal, setShowIncidentsModal] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-500" /> Risk Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Real-time threat scoring, anomaly detection, and risk posture overview.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setShowConfigModal(true)} className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors">
            Configure Rules
          </button>
          <button onClick={() => setShowIncidentsModal(true)} className="flex-1 sm:flex-none bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Active Incidents
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Platform Risk Score', value: '52', sub: 'Moderate Risk', icon: ShieldAlert, color: 'text-orange-400', bg: 'bg-orange-500/20', iconColor: 'text-orange-500' },
          { label: 'Active Threats', value: '3', sub: '2 High priority', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20', iconColor: 'text-red-500' },
          { label: 'Blocked Today', value: '14', sub: 'Fraud attempts stopped', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20', iconColor: 'text-green-500' },
          { label: 'Rules Active', value: '48', sub: 'Across all processors', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/20', iconColor: 'text-purple-500' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity`} />
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs font-medium text-gray-400">{s.label}</div>
            <div className="text-[10px] text-gray-600 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Platform Risk Score Trend</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
              <Activity className="w-3 h-3" /> Live Monitoring
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#EF4444" fill="url(#riskGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4">Risk Category Radar</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Risk" dataKey="A" stroke="#EF4444" fill="#EF4444" fillOpacity={0.25} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Risk Entities */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Top Risk Entities</h3>
          <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">Live</span>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Entity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Risk Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Transactions</th>
                <th className="p-5 font-bold uppercase tracking-wider">Risk Score</th>
                <th className="p-5 font-bold uppercase tracking-wider">Trend</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {topRisks.map((r, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${riskBg(r.score)} border flex items-center justify-center font-black text-xs ${riskColor(r.score)}`}>{r.entity.charAt(0)}</div>
                      <span className="font-bold text-white">{r.entity}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-300 text-xs font-medium">{r.type}</td>
                  <td className="p-5 text-gray-300 font-mono font-bold">{r.txCount}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/5 rounded-full h-1.5 w-24">
                        <div className={`h-1.5 rounded-full ${r.score >= 80 ? 'bg-red-500' : r.score >= 60 ? 'bg-orange-500' : 'bg-yellow-500'}`} style={{ width: `${r.score}%` }}></div>
                      </div>
                      <span className={`font-black text-sm ${riskColor(r.score)}`}>{r.score}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    {r.trend === 'up' ? <span className="flex items-center gap-1 text-red-400 text-xs font-bold"><TrendingUp className="w-3.5 h-3.5" /> Rising</span>
                      : r.trend === 'down' ? <span className="flex items-center gap-1 text-green-400 text-xs font-bold"><TrendingDown className="w-3.5 h-3.5" /> Falling</span>
                      : <span className="text-gray-400 text-xs font-medium">Stable</span>}
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-xs font-bold text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-colors">
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configure Rules Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" /> Configure Risk Rules
              </h3>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Global Risk Threshold</label>
                <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-red-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Lenient</span>
                  <span className="font-bold text-white">80 / 100</span>
                  <span>Strict</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Action on High Risk</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm">
                  <option>Block Transaction & Alert</option>
                  <option>Hold for Manual Review</option>
                  <option>Alert Only (Monitor)</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setShowConfigModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors text-sm">Cancel</button>
                <button onClick={() => setShowConfigModal(false)} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]">Save Rules</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Incidents Modal */}
      {showIncidentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Active Incidents (3)
              </h3>
              <button onClick={() => setShowIncidentsModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {topRisks.filter(r => r.score > 70).map((r, i) => (
                <div key={i} className="bg-black/40 border border-red-500/20 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-white text-sm">{r.entity}</div>
                      <div className="text-xs text-red-400 font-medium">{r.type}</div>
                    </div>
                    <span className="font-black text-red-500 text-lg">{r.score}</span>
                  </div>
                  <button onClick={() => setShowIncidentsModal(false)} className="w-full mt-2 text-xs font-bold text-white bg-red-600/20 hover:bg-red-600/30 py-2 rounded-lg transition-colors border border-red-500/20">Review Case</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
