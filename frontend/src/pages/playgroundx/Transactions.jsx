import { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, RefreshCcw, Download, Calendar, CheckCircle2, Clock, XCircle, ShoppingCart } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'tx-1', type: 'deposit', amount: '+500.00 PGX', fiat: '≈ $500.00', status: 'completed', date: 'Today, 14:20', hash: '0x1a2b...3c4d', desc: 'Wallet Top-up' },
  { id: 'tx-2', type: 'purchase', amount: '-25.00 PGX', fiat: '≈ $25.00', status: 'completed', date: 'Today, 10:15', hash: '0x9f8e...7d6c', desc: 'UFC 300 PPV Ticket' },
  { id: 'tx-3', type: 'swap', amount: '100 PGX → 85 USDC', fiat: '≈ $85.00', status: 'completed', date: 'Yesterday, 18:45', hash: '0x5b4a...2c1d', desc: 'Token Swap' },
  { id: 'tx-4', type: 'subscription', amount: '-49.99 PGX', fiat: '≈ $49.99', status: 'completed', date: '25 Jun 2026', hash: '0x3c2d...1a4b', desc: 'Pro Monthly Sub' },
  { id: 'tx-5', type: 'withdraw', amount: '-150.00 USDC', fiat: '≈ $150.00', status: 'pending', date: '24 Jun 2026', hash: '0x7e8f...9a0b', desc: 'Withdraw to Bank' },
  { id: 'tx-6', type: 'deposit', amount: '+1000.00 PGX', fiat: '≈ $1000.00', status: 'completed', date: '20 Jun 2026', hash: '0x4d5e...6f7g', desc: 'Wallet Top-up' },
  { id: 'tx-7', type: 'purchase', amount: '-15.00 PGX', fiat: '≈ $15.00', status: 'failed', date: '18 Jun 2026', hash: '0x1z2x...3c4v', desc: 'Champions League PPV' },
];

export default function Transactions() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTxs = TRANSACTIONS.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false;
    if (search && !tx.hash.toLowerCase().includes(search.toLowerCase()) && !tx.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const exportToCSV = () => {
    if (filteredTxs.length === 0) return;
    
    const headers = ['ID', 'Type', 'Description', 'Amount', 'Fiat Amount', 'Status', 'Date', 'Hash'];
    const csvContent = [
      headers.join(','),
      ...filteredTxs.map(tx => 
        [tx.id, tx.type, `"${tx.desc}"`, `"${tx.amount}"`, `"${tx.fiat}"`, tx.status, `"${tx.date}"`, tx.hash].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pgx_transactions_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit': return <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center"><ArrowDownLeft className="w-5 h-5" /></div>;
      case 'withdraw': return <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center"><ArrowUpRight className="w-5 h-5" /></div>;
      case 'swap': return <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center"><RefreshCcw className="w-5 h-5" /></div>;
      case 'purchase': 
      case 'subscription': return <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center"><ShoppingCart className="w-5 h-5" /></div>;
      default: return <div className="w-10 h-10 rounded-xl bg-gray-500/10 text-gray-400 flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#13131A] p-6 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white tracking-tight">Transaction History</h1>
          <p className="text-gray-400 text-sm mt-1">View and manage all your platform activities, purchases, and deposits.</p>
        </div>
        <div className="relative z-10 flex gap-3 w-full md:w-auto">
          <button 
            onClick={exportToCSV}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 custom-scrollbar">
          {['all', 'deposit', 'withdraw', 'purchase', 'swap'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all shadow-sm ${
                filter === f ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-[#13131A] text-gray-400 border border-white/5 hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by hash or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#13131A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Transactions Table/List */}
      <div className="bg-[#13131A] rounded-3xl border border-white/5 shadow-xl overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-5 border-b border-white/5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-[#09090B]">
          <div className="col-span-4">Transaction Detail</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Hash</div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-white/5">
          {filteredTxs.length > 0 ? (
            filteredTxs.map(tx => (
              <div key={tx.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 hover:bg-white/[0.02] transition-colors items-center">
                
                {/* Mobile: Top Row / Desktop: Detail */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  {getTypeIcon(tx.type)}
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">{tx.desc}</div>
                    <div className="text-xs text-gray-500 capitalize">{tx.type}</div>
                  </div>
                </div>

                {/* Mobile: Flex Info / Desktop: Columns */}
                <div className="col-span-1 md:col-span-8 grid grid-cols-2 md:grid-cols-8 gap-4 md:items-center">
                  
                  {/* Date */}
                  <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
                    <span className="md:hidden text-[10px] text-gray-500 uppercase font-bold mb-1">Date</span>
                    <div className="flex items-center gap-1.5 text-sm text-gray-300">
                      <Calendar className="w-3.5 h-3.5 text-gray-500 hidden md:block" /> {tx.date}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-end md:items-start">
                    <span className="md:hidden text-[10px] text-gray-500 uppercase font-bold mb-1">Amount</span>
                    <div className={`text-sm font-black ${
                      tx.amount.startsWith('+') ? 'text-green-400' : tx.amount.startsWith('-') ? 'text-red-400' : 'text-white'
                    }`}>
                      {tx.amount}
                    </div>
                    <div className="text-xs text-gray-500">{tx.fiat}</div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 md:col-span-2 flex flex-col justify-center mt-2 md:mt-0">
                    <span className="md:hidden text-[10px] text-gray-500 uppercase font-bold mb-1">Status</span>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(tx.status)}
                      <span className={`text-xs font-bold capitalize ${
                        tx.status === 'completed' ? 'text-green-500' : tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  {/* Hash */}
                  <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-end mt-2 md:mt-0">
                    <span className="md:hidden text-[10px] text-gray-500 uppercase font-bold mb-1">Hash</span>
                    <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-md">{tx.hash}</span>
                  </div>
                  
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No transactions found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
