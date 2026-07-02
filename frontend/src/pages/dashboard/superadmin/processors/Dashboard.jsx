import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertTriangle, ArrowUpRight, ArrowDownRight, Server, Zap, CheckCircle2, X, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../../../../utils/apiClient';

export default function ProcessorDashboard() {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await apiClient.get('/admin/payment-processors/dashboard');
        if (res.success) {
          setDashboardData(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleDownload = () => {
    const content = `PGX Gateway - Processor Health Report\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processor_health_report.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
        <p className="text-gray-400 font-bold">Loading Processor Dashboard...</p>
      </div>
    );
  }

  const summary = dashboardData?.summary || {};
  const volumeData = dashboardData?.volumeData || [];
  const nodes = dashboardData?.nodes || [];


  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#7C3AED]" /> Processor Health
          </h1>
          <p className="text-gray-400 mt-1">Global processor health, volume distribution, and node status.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={handleDownload} className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors">
            Download Report
          </button>
          <button onClick={() => setIsConfigModalOpen(true)} className="flex-1 sm:flex-none bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            Configure Nodes
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-[30px] group-hover:bg-green-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Total 24h Volume</h3>
          </div>
          <div className="text-3xl font-black text-white mb-2">${(summary.total24hVolume / 1000000).toFixed(1)}M</div>
          <div className="flex items-center gap-1 text-sm font-bold text-green-500">
            <ArrowUpRight className="w-4 h-4" /> +14.5% vs yesterday
          </div>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[30px] group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Active Nodes</h3>
          </div>
          <div className="text-3xl font-black text-white mb-2">{summary.activeNodes} / {summary.totalNodes}</div>
          <div className="flex items-center gap-1 text-sm font-bold text-blue-500">
            <CheckCircle2 className="w-4 h-4" /> 100% Operational
          </div>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-[30px] group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Global Approval Rate</h3>
          </div>
          <div className="text-3xl font-black text-white mb-2">{summary.approvalRate}%</div>
          <div className="flex items-center gap-1 text-sm font-bold text-purple-500">
            <ArrowUpRight className="w-4 h-4" /> +0.8% optimization
          </div>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-[30px] group-hover:bg-orange-500/20 transition-colors" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Critical Alerts</h3>
          </div>
          <div className="text-3xl font-black text-white mb-2">{summary.criticalAlerts}</div>
          <div className="flex items-center gap-1 text-sm font-bold text-orange-500">
            All systems normal
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-white">Live Volume Processing</h3>
            <div className="flex items-center gap-4 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_5px_#7C3AED]"></div> Stripe</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_#3B82F6]"></div> MoonPay</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_5px_#06B6D4]"></div> Coinbase</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStripe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMoonpay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCoinbase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="stripe" stackId="1" stroke="#7C3AED" fill="url(#colorStripe)" strokeWidth={2} />
                <Area type="monotone" dataKey="moonpay" stackId="1" stroke="#3B82F6" fill="url(#colorMoonpay)" strokeWidth={2} />
                <Area type="monotone" dataKey="coinbase" stackId="1" stroke="#06B6D4" fill="url(#colorCoinbase)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 flex flex-col shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">Processor Health Index</h3>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-white">Stripe</span>
                <span className="text-green-500 font-bold">99.9%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-[#7C3AED] h-2 rounded-full shadow-[0_0_10px_#7C3AED]" style={{ width: '99.9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-white">MoonPay</span>
                <span className="text-green-500 font-bold">94.2%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full shadow-[0_0_10px_#3B82F6]" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-white">Coinbase</span>
                <span className="text-orange-500 font-bold">88.4%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full shadow-[0_0_10px_#06B6D4]" style={{ width: '88.4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-white">LocalGate</span>
                <span className="text-green-500 font-bold">96.7%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full shadow-[0_0_10px_#EC4899]" style={{ width: '96.7%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nodes Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">Active Processing Nodes</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Node Name</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider">Uptime</th>
                <th className="p-5 font-bold uppercase tracking-wider">Latency</th>
                <th className="p-5 font-bold uppercase tracking-wider">Success Rate</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {nodes.map((node, i) => (
                <tr key={node.monitorId || i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-bold text-white flex items-center gap-3">
                    <Server className={`w-4 h-4 ${node.status === 'Operational' ? 'text-green-500' : 'text-orange-500'}`} />
                    {node.processorName}
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${node.status === 'Operational' ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 'bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]'}`}>
                      {node.status}
                    </span>
                  </td>
                  <td className="p-5 text-gray-300 font-mono font-medium">99.99%</td>
                  <td className="p-5 text-gray-300 font-mono font-medium">{node.pingMs}ms</td>
                  <td className="p-5 font-bold text-white">{node.successRate}%</td>
                  <td className="p-5 text-right">
                    <button onClick={() => setSelectedNode(node)} className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 px-3 py-1.5 rounded-lg border border-[#7C3AED]/20">
                      View Metrics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Configure Active Nodes</h2>
              <button onClick={() => setIsConfigModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Failover Threshold (%)</label>
                <input type="number" defaultValue={98} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Load Balancing Strategy</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option>Round Robin</option>
                  <option>Least Connections</option>
                  <option>Weighted Performance</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setIsConfigModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">Cancel</button>
                <button onClick={() => setIsConfigModalOpen(false)} className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">Save config</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Server className="w-5 h-5 text-[#7C3AED]" /> {selectedNode.processorName} Metrics</h2>
              <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 border border-white/5 rounded-xl p-4">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">Uptime</p>
                  <p className="text-white font-bold text-xl">99.99%</p>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-xl p-4">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">Latency</p>
                  <p className="text-white font-bold text-xl">{selectedNode.pingMs}ms</p>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-xl p-4">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">Success Rate</p>
                  <p className="text-white font-bold text-xl">{selectedNode.successRate}%</p>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-xl p-4">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">Status</p>
                  <p className={`font-bold text-xl ${selectedNode.status === 'Operational' ? 'text-green-500' : 'text-orange-500'}`}>{selectedNode.status}</p>
                </div>
              </div>
              <div className="pt-4">
                <button onClick={() => setSelectedNode(null)} className="w-full bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#7C3AED] py-2 rounded-lg font-bold border border-[#7C3AED]/30 transition-colors">Close Metrics</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
