import { useState, useEffect } from 'react';
import { AlertTriangle, Activity, Zap, Settings2, RefreshCw, CheckCircle2, ArrowUpRight, Mail, Bell, BellOff, Loader2, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialLatencyData = Array.from({ length: 20 }).map((_, i) => ({
  time: `${i}s`,
  stripe: Math.floor(Math.random() * 50) + 20,
  moonpay: Math.floor(Math.random() * 80) + 40,
  coinbase: Math.floor(Math.random() * 200) + 100,
}));

const failoverEvents = [
  { id: 'FO-9921', time: '10 mins ago', original: 'Coinbase Commerce', fallback: 'MoonPay Crypto', trigger: 'Latency > 500ms', status: 'Completed' },
  { id: 'FO-9920', time: '2 hours ago', original: 'Stripe Gateway EU', fallback: 'Stripe Gateway US', trigger: '503 Service Unavailable', status: 'Completed' },
  { id: 'FO-9919', time: '1 day ago', original: 'LocalGate Asia', fallback: 'Stripe Gateway EU', trigger: 'Timeout (10s)', status: 'Completed' },
];

const activeNodes = [
  { name: 'Stripe EU', ping: '32ms', status: 'Healthy', load: '45%' },
  { name: 'MoonPay', ping: '120ms', status: 'Healthy', load: '78%' },
  { name: 'Coinbase', ping: '450ms', status: 'Degraded', load: '92%' },
];

export default function FailoverMonitor() {
  const [latencyData, setLatencyData] = useState(initialLatencyData);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);

  // Email notification state
  const [alertEmail, setAlertEmail] = useState('admin@pgxgateway.com');
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);
  const [notifToggles, setNotifToggles] = useState({
    failover: true,
    degraded: true,
    recovered: false,
    dailyDigest: true,
  });

  const handleSaveNotif = () => {
    setNotifSaving(true);
    setTimeout(() => {
      setNotifSaving(false);
      setNotifSaved(true);
      setTimeout(() => setNotifSaved(false), 2500);
    }, 1200);
  };

  const toggleNotif = (key) => setNotifToggles(prev => ({ ...prev, [key]: !prev[key] }));


  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: 'now',
          stripe: Math.floor(Math.random() * 50) + 20,
          moonpay: Math.floor(Math.random() * 80) + 40,
          coinbase: Math.floor(Math.random() * 200) + 100,
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-cyan-500" /> Failover Monitor
          </h1>
          <p className="text-gray-400 mt-1">Live ping times, node health, and automatic failover engine.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setIsLogsModalOpen(true)} className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors">
            View Logs
          </button>
          <button onClick={() => setIsRoutingModalOpen(true)} className="flex-1 sm:flex-none bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2">
            <Settings2 className="w-4 h-4" /> Routing Rules
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Latency Chart */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-500" /> Real-time Node Latency
            </h3>
            <div className="flex items-center gap-3 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7C3AED]"></div> Stripe</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> MoonPay</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Coinbase</div>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="stripe" stroke="#7C3AED" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="moonpay" stroke="#3B82F6" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="coinbase" stroke="#F97316" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Node Status Sidebar */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Active Monitors</h3>
          <div className="flex-1 space-y-4">
            {activeNodes.map((node, i) => (
              <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-white text-sm">{node.name}</div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${node.status === 'Healthy' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {node.status}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Ping</div>
                    <div className={`font-mono text-lg font-black ${parseInt(node.ping) > 200 ? 'text-orange-500' : 'text-white'}`}>{node.ping}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-0.5">Load</div>
                    <div className="font-bold text-gray-300">{node.load}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Triggers */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" /> Active Triggers
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">High Latency</span>
                <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded font-bold">Enabled</span>
              </div>
              <p className="text-xs text-gray-400">Triggers failover if ping exceeds <strong className="text-white">500ms</strong> for 3 consecutive checks.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">HTTP 5xx Errors</span>
                <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded font-bold">Enabled</span>
              </div>
              <p className="text-xs text-gray-400">Triggers immediate failover upon receiving <strong className="text-white">503/504</strong> status codes.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">Success Drop</span>
                <span className="bg-gray-500/20 text-gray-500 text-xs px-2 py-0.5 rounded font-bold">Disabled</span>
              </div>
              <p className="text-xs text-gray-400">Triggers if approval rate drops below 85% in a 10 min window.</p>
            </div>
          </div>
        </div>

        {/* Failover Logs */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" /> Recent Failover Events
          </h3>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                  <th className="p-4 font-bold uppercase tracking-wider">Event ID</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Route Change</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Trigger Reason</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {failoverEvents.map((ev, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-mono text-xs font-bold text-white">{ev.id}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{ev.time}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 font-medium text-xs line-through">{ev.original}</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-500" />
                        <span className="text-green-400 font-bold text-xs">{ev.fallback}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-mono text-orange-300 bg-orange-500/5 rounded px-2">{ev.trigger}</td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" /> {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Email Notification Settings */}
      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-500" /> Email Alert Notifications
            </h3>
            <p className="text-xs text-gray-500 mt-1">Get notified by email when a processor fails or degrades.</p>
          </div>
          <button
            onClick={handleSaveNotif}
            className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${notifSaved
                ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              }`}
          >
            {notifSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : notifSaved ? (
              <><CheckCircle2 className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Settings</>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alert Email Input */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Alert Recipient Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  value={alertEmail}
                  onChange={e => setAlertEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                />
              </div>
              <p className="text-[11px] text-gray-600 mt-1.5">Alerts will be sent to this address instantly when a processor fails.</p>
            </div>

            <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Latest Alert Sent</div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Coinbase Commerce Failed</div>
                  <div className="text-xs text-gray-400 mt-0.5">Routed to MoonPay · 10 mins ago</div>
                  <div className="text-[11px] text-gray-600 mt-1">Sent to: {alertEmail}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Options */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Notify Me When</label>
            <div className="space-y-3">
              {[
                { key: 'failover', label: 'Processor Failover Occurs', desc: 'Instant alert when traffic is rerouted to backup', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                { key: 'degraded', label: 'Processor Degrades', desc: 'Alert when latency or error rate spikes', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
                { key: 'recovered', label: 'Processor Recovers', desc: 'Notify when a failed processor comes back online', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                { key: 'dailyDigest', label: 'Daily Health Digest', desc: 'Summary email every morning at 8 AM UTC', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => toggleNotif(item.key)}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${notifToggles[item.key] ? item.bg : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className={`text-sm font-bold ${notifToggles[item.key] ? item.color : 'text-gray-300'}`}>{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5 truncate">{item.desc}</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-300 relative shrink-0 ${notifToggles[item.key] ? 'bg-cyan-500' : 'bg-white/10'
                    }`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${notifToggles[item.key] ? 'left-5' : 'left-1'
                      }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
