import { ArrowDownToLine, Search, Download, Filter, Clock } from 'lucide-react';

const mockDeposits = Array(12).fill(null).map((_, i) => ({
  id: `DEP-${9921 + i}`,
  asset: ['USDC', 'USDT', 'BTC', 'ETH'][Math.floor(Math.random() * 4)],
  network: ['ERC-20', 'TRC-20', 'Bitcoin', 'Polygon'][Math.floor(Math.random() * 4)],
  amount: (Math.random() * 5000 + 100).toFixed(2),
  status: ['Confirmed', 'Confirming', 'Failed'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
}));

const Deposits = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <ArrowDownToLine className="w-8 h-8 text-green-500" /> Deposits
              </h1>
              <p className="text-gray-400">Track all incoming funds and network confirmations.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 px-4 py-2 rounded-xl transition-all font-bold">
                Generate Address
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search deposits..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Deposit ID</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Asset</th>
                    <th className="p-4 font-medium">Network</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                    <th className="p-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {mockDeposits.map((dep, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4 text-gray-300 font-mono text-xs">{dep.id}</td>
                      <td className="p-4 text-gray-400 text-xs">{dep.date}</td>
                      <td className="p-4 font-bold text-white">{dep.asset}</td>
                      <td className="p-4">
                        <span className="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">{dep.network}</span>
                      </td>
                      <td className="p-4 text-green-400 font-bold text-right">+ {dep.amount} {dep.asset}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                          dep.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' :
                          dep.status === 'Confirming' ? 'bg-blue-500/10 text-blue-500' : 
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {dep.status === 'Confirming' && <Clock className="w-3 h-3 animate-spin-slow" />}
                          {dep.status}
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

export default Deposits;
