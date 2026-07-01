import { useState, useEffect } from 'react';
import { 
  DollarSign, Activity, Users, CreditCard, ArrowUpRight, Wallet,
  Receipt, Landmark, Loader2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import apiClient from '../../../utils/apiClient';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/dashboard/overview');
      if (res.success && res.data) {
        setOverview(res.data);
        // Generate mock revenue chart based on the volume
        const baseVol = (res.data.totalVolume || 400000) / 100;
        setRevenueData([
          { name: 'Mon', value: baseVol * 0.4 }, 
          { name: 'Tue', value: baseVol * 0.3 }, 
          { name: 'Wed', value: baseVol * 0.5 },
          { name: 'Thu', value: baseVol * 0.8 }, 
          { name: 'Fri', value: baseVol * 0.65 }, 
          { name: 'Sat', value: baseVol * 0.9 }, 
          { name: 'Sun', value: baseVol * 1.2 },
        ]);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  const transactionData = [
    { name: 'Crypto', value: 6000 }, { name: 'Card', value: 4000 }, { name: 'Bank', value: 2000 }
  ];

  if (loading || !overview) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="w-12 h-12 text-[#7C3AED] animate-spin" />
        <p className="text-gray-400 font-bold">Loading Your Merchant Metrics...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Volume Processed', value: `$${(overview.totalVolume || 0).toLocaleString()}`, inc: true, pct: '+24.5%', icon: DollarSign },
    { label: 'Wallet Balance', value: `$${(overview.totalRevenue || 0).toLocaleString()}`, inc: true, pct: '+5.2%', icon: Wallet },
    { label: "Today's Volume", value: `$${(overview.todayVolume || 0).toLocaleString()}`, inc: true, pct: '+12%', icon: Activity },
    { label: "Total Transactions", value: (overview.totalTransactions || 0).toLocaleString(), inc: true, pct: '+18%', icon: CreditCard },
  ];

  const secondaryStats = [
    { label: 'Pending Settlement', value: '$12,400', icon: Landmark },
    { label: 'Gateway Fees Paid', value: '$4,200', icon: Receipt },
    { label: 'Active Customers', value: '1,204', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Here is what's happening with your business today.</p>
        </div>
      </div>

      {/* KPI Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-[#7C3AED]/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-[#7C3AED]/10 transition-colors pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-[#7C3AED] transition-colors" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-green-500/10 text-green-500`}>
                <ArrowUpRight className="w-3 h-3" />
                {stat.pct}
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Secondary KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {secondaryStats.map((stat, i) => (
           <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-4 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                   <stat.icon className="w-5 h-5 text-gray-400" />
                 </div>
                 <div>
                   <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                   <div className="text-xl font-black text-white">{stat.value}</div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Revenue (Last 7 Days)</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorRev2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Chart */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Volume by Method</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardOverview;
