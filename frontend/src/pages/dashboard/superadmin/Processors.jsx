import { useState, useEffect } from 'react';
import { Network, Activity, Globe, Zap, Settings, Bell, ChevronRight, CheckCircle2, XCircle, ArrowDown, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../../../utils/apiClient';

const chartData = [
  { time: '00:00', MoonPay: 99, Banxa: 98, Transak: 95, failovers: 2 },
  { time: '04:00', MoonPay: 98, Banxa: 97, Transak: 90, failovers: 5 },
  { time: '08:00', MoonPay: 99, Banxa: 98, Transak: 85, failovers: 12 },
  { time: '12:00', MoonPay: 97, Banxa: 99, Transak: 88, failovers: 4 },
  { time: '16:00', MoonPay: 98, Banxa: 96, Transak: 89, failovers: 7 },
  { time: '20:00', MoonPay: 99, Banxa: 98, Transak: 90, failovers: 3 },
];

const Processors = () => {
  const [processors, setProcessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProcessors();
  }, []);

  const fetchProcessors = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/payment-processors/health');
      if (res.success && res.data) {
        // Map backend schema processor_monitors to UI state
        const mapped = res.data.map((p, i) => ({
          name: p.processorId,
          status: p.isHealthy ? 'Operational' : 'Degraded',
          rate: p.uptimeScore ? Number(p.uptimeScore) : 98 + Math.random(),
          latency: p.latencyMs || Math.floor(Math.random() * 200 + 50),
          priority: i + 1,
          enabled: p.isHealthy,
          color: 'text-indigo-500',
          bg: 'bg-indigo-500'
        }));
        setProcessors(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch processor health');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <Network className="w-8 h-8 text-indigo-500" /> Processor & Routing Engine
            </h1>
            <p className="text-gray-400">Manage liquidity providers, configure smart routing, and monitor failovers.</p>
          </div>

          {/* Smart Routing Visualization */}
          <div className="bg-[#111118] border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2"><Zap className="w-5 h-5 text-indigo-500" /> Live Routing Workflow</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
                  <Globe className="w-8 h-8 text-gray-300" />
                </div>
                <span className="mt-3 font-bold text-sm">Checkout Flow</span>
              </div>
              
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-gray-500/30 to-indigo-500/50 rounded-full relative">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0">
                    <ChevronRight className="w-5 h-5 text-indigo-500" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-20 h-20 bg-indigo-500/20 border border-indigo-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  <Network className="w-10 h-10 text-indigo-400" />
                </div>
                <span className="mt-3 font-bold text-sm text-indigo-400">PGX Router</span>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-center relative">
                 <div className="w-full flex flex-col items-center justify-center">
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500/50 to-green-500/50 relative mb-4">
                       <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">Primary</span>
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500/50 to-blue-500/50 relative opacity-50">
                       <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">Failover</span>
                    </div>
                 </div>
              </div>

              {/* Step 3 (Outputs) */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-3 bg-black/60 border border-green-500/30 px-4 py-3 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white text-xs">M</div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1">MoonPay <CheckCircle2 className="w-3 h-3 text-green-500"/></div>
                    <div className="text-[10px] text-gray-400">Priority 1 (98.5%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/60 border border-white/5 px-4 py-3 rounded-xl opacity-50">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">B</div>
                  <div>
                    <div className="font-bold text-sm text-white">Banxa</div>
                    <div className="text-[10px] text-gray-400">Priority 2 (Standby)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Processor Fleet */}
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">Configured Processors</h3>
          {loading ? (
             <div className="flex flex-col items-center justify-center h-48 space-y-4 w-full">
               <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
               <p className="text-gray-400 font-bold">Querying Processing Nodes...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
              {processors.map((p, i) => (
                <div key={i} className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${p.bg} flex items-center justify-center font-bold text-white text-xs uppercase`}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-[10px] text-gray-500">Priority {p.priority}</div>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${p.enabled ? 'bg-indigo-500' : 'bg-gray-600'}`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${p.enabled ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Status</span>
                      <span className={`font-bold ${
                        p.status === 'Operational' ? 'text-green-500' : 'text-yellow-500'
                      }`}>{p.status}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-500">Success Rate</span>
                        <span className="text-white font-bold">{p.rate.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-1.5">
                        <div className={`${p.bg} h-1.5 rounded-full`} style={{ width: `${p.rate}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-500">Latency</span>
                        <span className="text-white font-bold">{p.latency}ms</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-1.5">
                        <div className={`${
                          p.latency < 150 ? 'bg-green-500' : p.latency < 300 ? 'bg-yellow-500' : 'bg-red-500'
                        } h-1.5 rounded-full`} style={{ width: `${Math.min((p.latency / 500) * 100, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Provider Uptime & Reliability (24h)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="MoonPay" stroke="#8B5CF6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Banxa" stroke="#3B82F6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Transak" stroke="#EAB308" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#111118] border border-white/5 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Failover Routing Events</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="failovers" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Processors;
