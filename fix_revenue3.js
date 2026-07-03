const fs = require('fs');
const content = `import { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownToLine, TrendingUp, Loader2, CheckCircle2, X, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../../../../../utils/apiClient';

export default function RevenueWallet() {
  const [wallet, setWallet] = useState(null);
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  const fetchData = async () => {
    try {
      const res = await apiClient.get('/admin/payment-processors/revenue-wallet');
      if (res.success) {
        setWallet(res.data.wallet);
        
        setEarningsHistory(res.data.history.map(h => ({
          month: h.month,
          earnings: h.revenueAmount / 100
        })));

        setWithdrawals(res.data.withdrawals.map((w, i) => ({
          id: \\\`WDR-\\\${501 - i}\\\`,
          date: new Date(w.withdrawalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          amount: '$' + (w.amount / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          destination: w.destination,
          status: w.status
        })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleWithdraw = async () => {
    setWithdrawing(true);
    const amount = document.getElementById('withdrawAmount').value;
    const destination = document.getElementById('withdrawDest').value;
    
    try {
        const res = await apiClient.post('/admin/payment-processors/revenue-wallet/withdraw', { amount, destination });
        if (res.success) {
            await fetchData();
            setWithdrawn(true);
            setTimeout(() => { setWithdrawn(false); setShowWithdrawModal(false); }, 2000);
        }
    } catch (e) {
        alert('Failed to withdraw');
    } finally {
        setWithdrawing(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Wallet className="w-8 h-8 text-[#7C3AED]" /> Revenue Wallet
          </h1>
          <p className="text-gray-400 mt-1">Your gateway\\'s total revenue from processing fee markups.</p>
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
        >
          <ArrowDownToLine className="w-4 h-4" /> Withdraw Funds
        </button>
      </div>

      <div className="bg-gradient-to-br from-[#7C3AED]/30 via-[#13131A] to-[#13131A] border border-[#7C3AED]/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="text-sm text-gray-400 font-medium mb-2">Total Revenue Pool</div>
              <div className="text-5xl font-black text-white mb-3">$\${Math.floor((wallet?.totalRevenuePool || 0) / 100).toLocaleString()}.<span className="text-3xl text-gray-400">{\`\${String((wallet?.totalRevenuePool || 0) % 100).padStart(2, '0')}\`}</span></div>
              <div className="flex items-center gap-2 text-sm font-bold text-green-500">
                <ArrowUpRight className="w-4 h-4" /> +$\${((wallet?.monthlyRevenue || 0)/100).toLocaleString()} this month (+24.8%)
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-xs text-gray-400 font-medium mb-1">This Month</div>
                <div className="text-xl font-black text-[#7C3AED]">$\${((wallet?.monthlyRevenue || 0)/100).toLocaleString()}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-xs text-gray-400 font-medium mb-1">Avg. Daily</div>
                <div className="text-xl font-black text-green-400">$\${((wallet?.averageDailyRevenue || 0)/100).toLocaleString()}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-xs text-gray-400 font-medium mb-1">Total Withdrawn</div>
                <div className="text-xl font-black text-orange-400">$\${((wallet?.totalWithdrawn || 0)/100).toLocaleString()}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-xs text-gray-400 font-medium mb-1">Fee Sources</div>
                <div className="text-xl font-black text-blue-400">{wallet?.revenueSources || 4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#7C3AED]" /> Monthly Earnings
          </h3>
          <select className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none text-xs">
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => \\\`$\\\${(v/1000).toFixed(0)}k\\\`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                formatter={v => [\\\`$\\\${v.toLocaleString()}\\\`, 'Earnings']}
              />
              <Area type="monotone" dataKey="earnings" stroke="#7C3AED" fill="url(#earningsGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Withdrawal History</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Date</th>
                <th className="p-5 font-bold uppercase tracking-wider">Amount</th>
                <th className="p-5 font-bold uppercase tracking-wider">Destination</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {withdrawals.map((w, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-mono font-bold text-gray-300 text-xs">{w.id}</td>
                  <td className="p-5 text-gray-400 text-xs font-medium">{w.date}</td>
                  <td className="p-5 font-black text-white font-mono">{w.amount}</td>
                  <td className="p-5 text-gray-300 text-sm">{w.destination}</td>
                  <td className="p-5 text-right">
                    <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">
                      <CheckCircle2 className="w-3 h-3" /> {w.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <ArrowDownToLine className="w-5 h-5 text-[#7C3AED]" /> Withdraw Revenue
              </h3>
              {!withdrawing && !withdrawn && <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            <div className="p-6">
              {withdrawn ? (
                <div className="flex flex-col items-center text-center py-8 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Withdrawal Initiated!</h4>
                  <p className="text-gray-400 text-sm">Funds will arrive within 1–3 business days.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-xl p-4 text-sm">
                    <div className="text-gray-400 text-xs mb-1">Available Balance</div>
                    <div className="font-black text-white text-2xl">$\${((wallet?.totalRevenuePool || 0)/100).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Withdrawal Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-400 font-bold">$</span>
                      <input id="withdrawAmount" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm font-mono" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Destination</label>
                    <select id="withdrawDest" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm">
                      <option>Primary Bank (****4421)</option>
                      <option>Reserve Account (****8821)</option>
                      <option>Cold Wallet (0x...a82c)</option>
                    </select>
                  </div>
                  <button
                    onClick={handleWithdraw}
                    className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  >
                    {withdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Withdrawal'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;
// Replace the double backslashes which we needed to escape the JS string literal
fs.writeFileSync('frontend/src/pages/dashboard/superadmin/processors/RevenueWallet.jsx', content.replace(/\\\\`/g, '`').replace(/\\`/g, '`'));
