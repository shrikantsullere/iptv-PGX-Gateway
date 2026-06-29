import { ArrowUpFromLine, Search, Clock, CheckCircle2, XCircle } from 'lucide-react';

const mockWithdrawals = Array(10).fill(null).map((_, i) => ({
  id: `WD-${7821 + i}`,
  destination: ['Bank Account ending in 4921', '0x71C...8976F', 'T9y...K2L', 'Bank Account ending in 1102'][Math.floor(Math.random() * 4)],
  method: ['Fiat Wire', 'Crypto ERC-20', 'Crypto TRC-20', 'ACH Transfer'][Math.floor(Math.random() * 4)],
  amount: (Math.random() * 10000 + 500).toFixed(2),
  status: ['Completed', 'Processing', 'Failed'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.random() * 5000000000).toLocaleString(),
}));

const Withdrawals = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <ArrowUpFromLine className="w-8 h-8 text-blue-500" /> Withdrawals
              </h1>
              <p className="text-gray-400">Manage all your outgoing payouts and settlements.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all font-bold">
                Request Payout
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search by ID or destination..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Withdrawal ID</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Destination</th>
                    <th className="p-4 font-medium">Method</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                    <th className="p-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {mockWithdrawals.map((wd, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4 text-gray-300 font-mono text-xs">{wd.id}</td>
                      <td className="p-4 text-gray-400 text-xs">{wd.date}</td>
                      <td className="p-4 text-gray-200">{wd.destination}</td>
                      <td className="p-4">
                        <span className="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">{wd.method}</span>
                      </td>
                      <td className="p-4 text-white font-bold text-right">- ${wd.amount}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                          wd.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                          wd.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {wd.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {wd.status === 'Processing' && <Clock className="w-3 h-3 animate-pulse" />}
                          {wd.status === 'Failed' && <XCircle className="w-3 h-3" />}
                          {wd.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
