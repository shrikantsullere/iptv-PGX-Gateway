import { 
  DollarSign, Wallet, Clock, CreditCard, ChevronDown, Download,
  ArrowRightCircle, ArrowUpCircle, CheckCircle2, ChevronRight, Activity, Terminal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';

const apiUsageData = [
  { name: 'Mon', calls: 12000 },
  { name: 'Tue', calls: 19000 },
  { name: 'Wed', calls: 15000 },
  { name: 'Thu', calls: 22000 },
  { name: 'Fri', calls: 18000 },
  { name: 'Sat', calls: 25000 },
  { name: 'Sun', calls: 30000 },
];

const walletDistribution = [
  { name: 'USDC', value: 45, amount: '$45,240', color: '#3B82F6' },
  { name: 'USDT', value: 30, amount: '$30,500', color: '#14B8A6' },
  { name: 'BTC', value: 15, amount: '$15,000', color: '#F59E0B' },
  { name: 'ETH', value: 10, amount: '$10,000', color: '#8B5CF6' },
];

const MerchantDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0C0C11] text-white flex font-sans">
      <Sidebar role="MERCHANT" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          merchantName="Acme Digital Ltd." 
          merchantId="MRC-7845" 
          avatarInitials="AD" 
        />
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Welcome back,</p>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Acme Digital Ltd.</h1>
                <span className="bg-green-500/20 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">Verified</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          {/* Top Stats Widgets (4 Cards as requested) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: 'Total Revenue', value: '$284,500.00', trend: '+12.5%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
              { title: 'Wallet Balance', value: '$100,740.00', trend: '+5.2%', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { title: 'Pending Settlement', value: '$45,200.00', trend: '-2.1%', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', isDown: true },
              { title: 'Fees Paid', value: '$4,500.00', trend: '+1.5%', icon: CreditCard, color: 'text-pink-500', bg: 'bg-pink-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex gap-3 items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{stat.title}</p>
                    <h3 className="text-xl font-bold truncate">{stat.value}</h3>
                  </div>
                </div>
                <div className={`text-xs ${stat.isDown ? 'text-red-500' : 'text-green-500'} font-medium`}>
                  {stat.trend} <span className="text-gray-600">vs last week</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Wallet Distribution */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Wallet Distribution</h3>
                <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                  Manage <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row items-center gap-8">
                <div className="h-[200px] w-[200px] relative shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={walletDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                        {walletDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-white">4</span>
                    <span className="text-xs text-gray-400">Assets</span>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-4">
                  {walletDistribution.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">{item.amount}</span>
                        <span className="text-white font-bold w-12 text-right">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* API Usage Chart */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-bold">API Usage</h3>
                </div>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">141k Calls / 7D</span>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apiUsageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                    <RechartsTooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#09090B', borderColor: '#333', borderRadius: '8px' }} />
                    <Bar dataKey="calls" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            
            {/* Recent Transactions */}
            <div className="xl:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
                <button className="text-sm bg-white/5 px-4 py-1.5 rounded-lg border border-white/5 text-gray-300 hover:text-white transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 text-xs border-b border-white/5">
                      <th className="pb-3 font-medium">TxID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    {[
                      { id: 'TX-8921', cust: 'John S.', type: 'Deposit', icon: ArrowDownToLine, color: 'text-green-500', amount: '+ 1,250 USDC', status: 'Completed', sColor: 'text-green-500' },
                      { id: 'TX-8922', cust: 'Sarah J.', type: 'Withdrawal', icon: ArrowUpFromLine, color: 'text-blue-500', amount: '- 500 USDC', status: 'Pending', sColor: 'text-yellow-500' },
                      { id: 'TX-8923', cust: 'Mike B.', type: 'Payment', icon: ArrowRightCircle, color: 'text-primary', amount: '+ 85 USDC', status: 'Completed', sColor: 'text-green-500' },
                      { id: 'TX-8924', cust: 'Emma W.', type: 'Refund', icon: ArrowUpFromLine, color: 'text-red-500', amount: '- 120 USDC', status: 'Failed', sColor: 'text-red-500' },
                      { id: 'TX-8925', cust: 'David L.', type: 'Deposit', icon: ArrowDownToLine, color: 'text-green-500', amount: '+ 3,000 USDC', status: 'Completed', sColor: 'text-green-500' },
                    ].map((tx, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 text-gray-400 font-mono text-xs">{tx.id}</td>
                        <td className="py-4 text-gray-200">{tx.cust}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <tx.icon className={`w-4 h-4 ${tx.color}`} />
                            <span className="text-gray-300">{tx.type}</span>
                          </div>
                        </td>
                        <td className="py-4 text-white font-medium text-right">{tx.amount}</td>
                        <td className="py-4 text-right">
                          <span className={`text-xs font-medium bg-white/5 px-2 py-1 rounded ${tx.sColor}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Settlement Timeline */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-bold">Settlement Timeline</h3>
                </div>
              </div>
              <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
                {[
                  { date: 'Today, 14:30', title: 'Batch #4892 Processed', amount: '$12,450.00', status: 'completed', desc: 'Sent to 0xA3...9f2B' },
                  { date: 'Tomorrow, 09:00', title: 'Scheduled Settlement', amount: '$45,200.00', status: 'pending', desc: 'Auto-settlement to Bank' },
                  { date: '21 Jun, 09:00', title: 'Scheduled Settlement', amount: 'Est. $18,000.00', status: 'upcoming', desc: 'Standard T+2 payout' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-6">
                    <div className={`absolute -left-1.5 w-3 h-3 rounded-full border-2 border-[#13131A] ${
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'pending' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'
                    }`} />
                    <div className="text-xs text-gray-500 mb-1">{item.date}</div>
                    <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                    <div className={`font-medium mb-1 ${item.status === 'upcoming' ? 'text-gray-400' : 'text-primary'}`}>{item.amount}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white font-medium transition-colors">
                View All Schedules
              </button>
            </div>
            
          </div>
          
        </main>
      </div>
    </div>
  );
};

// Quick Icons for table
const ArrowDownToLine = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>;
const ArrowUpFromLine = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/></svg>;

export default MerchantDashboard;
