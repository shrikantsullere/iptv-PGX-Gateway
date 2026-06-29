import { useState } from 'react';
import { 
  Search, Download, Filter, Calendar, MapPin, Building,
  Server, Coins, Link as LinkIcon, ExternalLink, MoreHorizontal, ArrowRightLeft
} from 'lucide-react';

const mockEnterpriseTransactions = Array(25).fill(null).map((_, i) => ({
  id: `G-TX-${89021 + i}`,
  merchant: ['Acme Digital', 'Global Tech', 'Quantum SaaS', 'Nexus Store'][Math.floor(Math.random() * 4)],
  customer: ['John S.', 'Sarah J.', 'Mike B.', 'Emma W.'][Math.floor(Math.random() * 4)],
  wallet: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
  amount: (Math.random() * 5000 + 100).toFixed(2),
  currency: ['USDC', 'USDT', 'BTC', 'ETH'][Math.floor(Math.random() * 4)],
  processor: ['MoonPay', 'Banxa', 'Transak', 'Ramp'][Math.floor(Math.random() * 4)],
  fee: `$${(Math.random() * 10 + 1).toFixed(2)}`,
  status: ['Completed', 'Pending', 'Failed', 'Refunded'][Math.floor(Math.random() * 4)],
  hash: `0x${Math.random().toString(16).slice(2, 14)}`,
  date: new Date(Date.now() - Math.random() * 10000000).toLocaleString(),
}));

const EnterpriseTransactions = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-[#7C3AED]" /> Enterprise Ledger
          </h1>
          <p className="text-gray-400 mt-1">Global transaction management across all merchants and processors.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm border ${
              showFilters ? 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
            }`}
          >
            <Filter className="w-4 h-4" /> Advanced Filters
          </button>
          <button className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl transition-all font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-[#13131A] border border-[#7C3AED]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(124,58,237,0.1)] animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Same filter inputs but with updated styling */}
            {[
              { icon: Calendar, label: 'Date Range', options: ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Custom Range'] },
              { icon: Building, label: 'Merchant', options: ['All Merchants', 'Acme Digital', 'Global Tech'] },
              { icon: Server, label: 'Processor', options: ['All Processors', 'MoonPay', 'Banxa', 'Transak'] },
              { icon: MapPin, label: 'Country', options: ['Global', 'United States', 'United Kingdom'] },
              { icon: Coins, label: 'Currency', options: ['All Assets', 'USDC', 'BTC', 'ETH'] },
              { icon: LinkIcon, label: 'Blockchain', options: ['All Networks', 'Ethereum (ERC-20)', 'Tron (TRC-20)', 'Polygon'] }
            ].map((filter, i) => (
              <div key={i}>
                <label className="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider"><filter.icon className="w-3.5 h-3.5 text-[#7C3AED]"/> {filter.label}</label>
                <select className="w-full bg-[#09090B] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] appearance-none">
                  {filter.options.map((opt, j) => <option key={j}>{opt}</option>)}
                </select>
              </div>
            ))}
            <div className="md:col-span-2 lg:col-span-1 xl:col-span-2 flex items-end">
              <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 px-4 py-2.5 rounded-lg transition-colors">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Global Search (TxID, Merchant, Hash, Customer, Wallet)..." 
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="text-gray-500 text-[11px] font-bold uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Merchant</th>
                <th className="p-4">Customer</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4">Processor</th>
                <th className="p-4 text-right">Gateway Fee</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {mockEnterpriseTransactions.map((tx, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="p-4 text-[#7C3AED] font-bold">{tx.id}</td>
                  <td className="p-4 text-gray-500 text-xs">{tx.date}</td>
                  <td className="p-4 font-bold text-gray-200">{tx.merchant}</td>
                  <td className="p-4 text-gray-400">{tx.customer}</td>
                  <td className="p-4 text-white font-black text-right">{tx.amount} <span className="text-gray-500 font-medium text-xs">{tx.currency}</span></td>
                  <td className="p-4">
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300 font-bold text-xs">{tx.processor}</span>
                  </td>
                  <td className="p-4 text-green-500 font-bold text-right">{tx.fee}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center justify-center gap-1 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                      tx.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                      tx.status === 'Refunded' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-bold">
          <span>Showing 1 to 25 of 14,290 entries</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 text-white font-bold border border-white/10">Prev</button>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg bg-[#7C3AED] text-white font-bold flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.5)]">1</button>
              <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-bold flex items-center justify-center transition-colors">2</button>
              <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-bold flex items-center justify-center transition-colors">3</button>
              <span className="px-1">...</span>
              <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-bold flex items-center justify-center transition-colors">572</button>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white font-bold border border-white/10">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EnterpriseTransactions;
