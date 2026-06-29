import { useState } from 'react';
import { Search, Download, Filter, ChevronDown, CheckCircle2, Clock, XCircle, ArrowRightCircle } from 'lucide-react';

const mockTransactions = Array(15).fill(null).map((_, i) => ({
  id: `TX-89${21 + i}`,
  customer: ['John Smith', 'Sarah Jones', 'Acme Corp', 'Global Tech', 'Jane Doe'][Math.floor(Math.random() * 5)],
  amount: `$${(Math.random() * 1000 + 50).toFixed(2)}`,
  type: ['Card Payment', 'Crypto Transfer', 'Bank Transfer'][Math.floor(Math.random() * 3)],
  status: ['Completed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
}));

const Transactions = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Transactions</h1>
              <p className="text-gray-400">View and manage all your historical transactions.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-[#13131A] border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-xl transition-all">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl transition-all font-medium">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search by TxID, customer, or amount..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
              <select className="bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary appearance-none">
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">TxID</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                    <th className="p-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {mockTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4 text-primary font-mono text-xs font-medium">{tx.id}</td>
                      <td className="p-4 text-gray-400 text-xs">{tx.date}</td>
                      <td className="p-4 text-gray-200">{tx.customer}</td>
                      <td className="p-4 text-gray-400">{tx.type}</td>
                      <td className="p-4 text-white font-bold text-right">{tx.amount}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                          tx.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                          tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {tx.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {tx.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {tx.status === 'Failed' && <XCircle className="w-3 h-3" />}
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-400">
              <span>Showing 1 to 15 of 245 entries</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">Previous</button>
                <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
