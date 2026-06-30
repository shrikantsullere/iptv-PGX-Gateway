import { 
  DollarSign, Activity, Repeat, Users, Cpu, ArrowUpRight, ArrowDownRight,
  ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, ChevronDown,
  Globe, Server
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import SuperAdminSidebar from '../../components/dashboard/SuperAdminSidebar';
import SuperAdminTopBar from '../../components/dashboard/SuperAdminTopBar';

const platformData = [
  { name: 'May 1', volume: 450, revenue: 15.2 },
  { name: 'May 2', volume: 480, revenue: 16.1 },
  { name: 'May 3', volume: 520, revenue: 18.5 },
  { name: 'May 4', volume: 490, revenue: 17.0 },
  { name: 'May 5', volume: 600, revenue: 21.3 },
  { name: 'May 6', volume: 650, revenue: 24.8 },
  { name: 'May 7', volume: 720, revenue: 27.5 },
];

const processorData = [
  { name: 'Stripe', value: 45, color: '#6366F1' },
  { name: 'Coinbase', value: 30, color: '#3B82F6' },
  { name: 'Circle', value: 15, color: '#10B981' },
  { name: 'Internal', value: 10, color: '#EF4444' },
];

const countryData = [
  { name: 'USA', value: 45 },
  { name: 'UK', value: 20 },
  { name: 'Germany', value: 15 },
  { name: 'Canada', value: 10 },
  { name: 'Other', value: 10 },
];

const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex font-sans">
      <SuperAdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#09090B]">
        <SuperAdminTopBar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Platform Overview</h1>
              <p className="text-gray-400 text-sm">Real-time metrics across all merchants and processors.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-gray-300 bg-black px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                Last 7 Days <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Top Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              { title: 'Total Revenue', value: '$2,459,200', trend: '+14.5%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
              { title: 'Processing Volume', value: '$184.2M', trend: '+22.4%', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { title: 'Active Merchants', value: '4,289', trend: '+5.2%', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
              { title: 'Active Subscriptions', value: '18,542', trend: '+12.1%', icon: Repeat, color: 'text-pink-500', bg: 'bg-pink-500/10' },
              { title: 'Processor Health', value: '99.9%', trend: '-0.1%', icon: Cpu, color: 'text-red-500', bg: 'bg-red-500/10', isDown: true },
            ].map((stat, i) => (
              <div key={i} className="bg-[#111118] border border-white/5 rounded-2xl p-5 hover:bg-[#151520] transition-colors relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-${stat.color.split('-')[1]}-500/5 rounded-full -translate-y-8 translate-x-8`} />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-1 ${stat.isDown ? 'text-red-500' : 'text-green-500'}`}>
                    {stat.isDown ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    {stat.trend}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main Area Chart (Revenue & Volume) */}
            <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Platform Volume & Revenue</h3>
                <div className="flex gap-4 text-xs font-medium">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /> Volume (M)</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /> Revenue (K)</div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={platformData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#09090B', borderColor: '#333', borderRadius: '8px' }} />
                    <Area yAxisId="left" type="monotone" dataKey="volume" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                    <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Processor Usage */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Processor Routing</h3>
                <Server className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-[200px] w-full mb-6 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={processorData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                        {processorData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white">4</span>
                    <span className="text-xs text-gray-400">Active Nodes</span>
                  </div>
                </div>
                <div className="space-y-3 mt-auto">
                  {processorData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-300 font-medium">{item.name}</span>
                      </div>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 2 & Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Countries Bar Chart */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Global Volume</h3>
                <Globe className="w-5 h-5 text-gray-500" />
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={countryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <RechartsTooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#09090B', borderColor: '#333', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fraud Alerts Table */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 lg:col-span-2 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">Active Fraud Alerts</h3>
                  <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Critical</span>
                </div>
                <button className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">View All Alerts</button>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 text-xs border-b border-white/5">
                      <th className="pb-3 font-medium">Merchant</th>
                      <th className="pb-3 font-medium">Risk Score</th>
                      <th className="pb-3 font-medium">Trigger Reason</th>
                      <th className="pb-3 font-medium">Time</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    {[
                      { m: 'Acme Digital', score: '98/100', reason: 'Velocity Check Failed (100x tx/min)', time: '2m ago' },
                      { m: 'Global Tech', score: '85/100', reason: 'IP Mismatch (High Risk Country)', time: '14m ago' },
                      { m: 'Gaming Corp', score: '92/100', reason: 'Multiple Stolen Cards Detected', time: '1h ago' },
                    ].map((alert, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 text-white font-medium">{alert.m}</td>
                        <td className="py-4"><span className="text-red-500 font-mono font-bold bg-red-500/10 px-2 py-1 rounded">{alert.score}</span></td>
                        <td className="py-4 text-gray-400 text-xs">{alert.reason}</td>
                        <td className="py-4 text-gray-500">{alert.time}</td>
                        <td className="py-4">
                          <button className="text-xs bg-white text-black px-3 py-1.5 rounded-lg font-bold hover:bg-gray-200 transition-colors">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tables Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Latest Merchants */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Latest Merchants</h3>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Quantum SaaS', id: 'M-8921', status: 'Active', color: 'text-green-500', bg: 'bg-green-500/20' },
                  { name: 'Nexus Store', id: 'M-8922', status: 'Pending KYC', color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
                  { name: 'Apex Gaming', id: 'M-8923', status: 'Active', color: 'text-green-500', bg: 'bg-green-500/20' },
                  { name: 'Crypto Exchange', id: 'M-8924', status: 'Under Review', color: 'text-orange-500', bg: 'bg-orange-500/20' },
                ].map((merchant, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center font-bold text-gray-300">
                        {merchant.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{merchant.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{merchant.id}</div>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${merchant.bg} ${merchant.color}`}>
                      {merchant.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending KYC / Compliance */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">Pending KYC</h3>
                  <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full">24 In Queue</span>
                </div>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">Queue</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Nexus Store', type: 'Corporate Level 2', doc: 'Passport & Incorporation', time: '5 hours ago' },
                  { name: 'Crypto Exchange', type: 'Enterprise Level 3', doc: 'Full Audit Report', time: '12 hours ago' },
                  { name: 'Digital Nomads', type: 'Individual Level 1', doc: 'Driver License', time: '1 day ago' },
                  { name: 'Tech Solutions', type: 'Corporate Level 2', doc: 'Utility Bill Missing', time: '2 days ago' },
                ].map((kyc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{kyc.name}</div>
                        <div className="text-[10px] text-gray-400">{kyc.type} • {kyc.time}</div>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded transition-all">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
