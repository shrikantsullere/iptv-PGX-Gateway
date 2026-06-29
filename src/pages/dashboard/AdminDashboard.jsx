import { 
  ArrowDownCircle, ArrowUpCircle, Wallet, FileText, 
  ChevronDown, CheckCircle2, Clock, ChevronRight, Plus
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';

const volumeData = [
  { name: 'Apr 11', value: 210000 }, { name: 'Apr 13', value: 250000 },
  { name: 'Apr 16', value: 420000 }, { name: 'Apr 18', value: 380000 },
  { name: 'Apr 21', value: 450000 }, { name: 'Apr 24', value: 480000 },
  { name: 'Apr 26', value: 460000 }, { name: 'Apr 28', value: 420000 },
  { name: 'May 01', value: 500000 }, { name: 'May 04', value: 450000 },
  { name: 'May 06', value: 520000 }, { name: 'May 08', value: 480000 },
  { name: 'May 11', value: 600000 },
];

const paymentMethodData = [
  { name: 'Card → Crypto', value: 62.0, amount: '$5,231,721.32', color: '#7C3AED' },
  { name: 'Crypto → Crypto', value: 22.4, amount: '$1,892,123.55', color: '#22C55E' },
  { name: 'Crypto → Bank', value: 12.7, amount: '$1,067,432.21', color: '#F59E0B' },
  { name: 'Other', value: 2.9, amount: '$241,938.55', color: '#3B82F6' },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0C0C11] text-white flex font-sans">
      <Sidebar role="MERCHANT" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          merchantName="PlayGroundX" 
          merchantId="PGX-001" 
          avatarInitials="PGX" 
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Welcome back,</p>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">PlayGroundX</h1>
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
              </div>
              <p className="text-gray-400 text-sm mt-2">Here's what's happening with your business today.</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <span className="text-sm text-gray-400">Current Plan</span>
                <span className="bg-primary/20 text-primary text-xs font-bold px-2.5 py-1 rounded-full">Enterprise</span>
              </div>
              <p className="text-xs text-gray-500">Renewal Date: 12 May 2025</p>
            </div>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Card 1 */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium mb-1">Total Balance</p>
                  <h3 className="text-2xl font-bold mb-1">$1,246,789.52</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    USDC
                  </div>
                  <div className="text-xs text-gray-500 mt-2">≈ 1,246,789.52 USDC</div>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium mb-1">Total Volume (30D)</p>
                  <h3 className="text-2xl font-bold mb-2">$8,432,215.63</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-500 font-medium">↑ 18.6%</span>
                    <span className="text-gray-500">vs last 30 days</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium mb-1">Total Transactions (30D)</p>
                  <h3 className="text-2xl font-bold mb-2">18,542</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-500 font-medium">↑ 22.4%</span>
                    <span className="text-gray-500">vs last 30 days</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium mb-1">Total Fees (30D)</p>
                  <h3 className="text-2xl font-bold mb-2">$589,415.32</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-500 font-medium">↑ 17.3%</span>
                    <span className="text-gray-500">vs last 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Area Chart */}
            <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Volume Overview</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">$8,432,215.63</span>
                    <span className="text-green-500 text-xs font-medium flex items-center">↑ 18.6%</span>
                    <span className="text-gray-500 text-xs">vs last 30 days</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                  Last 30 Days <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 10 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 10 }}
                      tickFormatter={(value) => `$${value / 1000}K`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#09090B', borderColor: '#333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 flex flex-col">
              <h3 className="text-lg font-bold mb-6">Volume by Payment Method</h3>
              <div className="flex-1 flex flex-col">
                <div className="h-[180px] w-full mb-6 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text (mockup didn't explicitly have text inside donut for Image 1, but we can leave it empty or add) */}
                </div>
                <div className="space-y-3 mt-auto">
                  {paymentMethodData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white">{item.amount}</span>
                        <span className="text-gray-500 w-10 text-right">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-white/5 mt-3">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-bold">$8,432,215.63</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
                <button className="text-sm bg-white/5 px-4 py-1.5 rounded-lg border border-white/5 text-gray-300 hover:text-white transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 text-xs border-b border-white/5">
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    {[
                      { type: 'Deposit', icon: ArrowDownCircle, color: 'text-green-500', bg: 'bg-green-500/20', customer: 'John Smith', amount: '+ 1,250.00 USDC', status: 'Completed', time: '2 mins ago' },
                      { type: 'Withdrawal', icon: ArrowUpCircle, color: 'text-primary', bg: 'bg-primary/20', customer: 'Sarah Johnson', amount: '- 2,500.00 USDC', status: 'Completed', time: '15 mins ago' },
                      { type: 'Deposit', icon: ArrowDownCircle, color: 'text-green-500', bg: 'bg-green-500/20', customer: 'Michael Brown', amount: '+ 850.00 USDC', status: 'Completed', time: '32 mins ago' },
                      { type: 'Deposit', icon: ArrowDownCircle, color: 'text-green-500', bg: 'bg-green-500/20', customer: 'Emily Davis', amount: '+ 1,500.00 USDC', status: 'Pending', statusColor: 'text-orange-500', time: '45 mins ago' },
                      { type: 'Withdrawal', icon: ArrowUpCircle, color: 'text-primary', bg: 'bg-primary/20', customer: 'David Wilson', amount: '- 3,200.00 USDC', status: 'Completed', time: '1 hour ago' },
                    ].map((tx, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${tx.bg}`}>
                              <tx.icon className={`w-3.5 h-3.5 ${tx.color}`} />
                            </div>
                            <span className="text-gray-300">{tx.type}</span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-300">{tx.customer}</td>
                        <td className="py-4 text-white">{tx.amount}</td>
                        <td className="py-4">
                          <span className={`text-xs font-medium ${tx.statusColor || 'text-green-500'}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 text-gray-500">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wallet Overview */}
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Wallet Overview</h3>
                <button className="text-xs text-gray-400 hover:text-white transition-colors">
                  Manage Wallets
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Primary Wallet', sub: 'USDC', amount: '1,246,789.52 USDC', fiat: '$1,246,789.52', iconColor: 'bg-blue-500/20', iconTextColor: 'text-blue-500' },
                  { name: 'Settlement Wallet (USDC)', sub: '0xA3...9f2B', amount: '578,320.10 USDC', fiat: '$578,320.10', iconColor: 'bg-green-500/20', iconTextColor: 'text-green-500' },
                  { name: 'Fee Wallet (PGX Gateway)', sub: '0xF8...7c1D', amount: '89,435.22 USDC', fiat: '$89,435.22', iconColor: 'bg-primary/20', iconTextColor: 'text-primary' },
                ].map((wallet, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${wallet.iconColor}`}>
                        <Wallet className={`w-4 h-4 ${wallet.iconTextColor}`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-200">{wallet.name}</div>
                        <div className="text-xs text-gray-500">{wallet.sub}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <div className="text-sm text-white">{wallet.amount}</div>
                        <div className="text-xs text-gray-500">{wallet.fiat}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                <Plus className="w-4 h-4" /> Add New Wallet
              </button>
            </div>
          </div>
          
          <footer className="text-[10px] text-gray-600 flex justify-between items-center py-4 border-t border-white/5">
            <div>© 2025 PGX Gateway. All rights reserved.</div>
            <div>Version 1.0.0</div>
          </footer>
        </main>
      </div>
    </div>
  );
};

// Also define Activity just in case
const Activity = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
)

export default AdminDashboard;
