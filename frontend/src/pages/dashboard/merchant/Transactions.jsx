import { useState, useEffect } from 'react';
import { Search, Download, Filter, ChevronDown, CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/transactions');
      if (res.success && res.data) {
        setTransactions(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      (tx.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.customerEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(tx.amount).includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All Statuses' || tx.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['TxID', 'Date & Time', 'Customer', 'Email', 'Type', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(tx => 
        `"${tx.transactionId}","${new Date(tx.createdAt).toLocaleString()}","${tx.customerName || 'N/A'}","${tx.customerEmail || 'N/A'}","${tx.paymentMethod}","${tx.amount}","${tx.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <button onClick={handleExportCSV} className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl transition-all font-medium">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] appearance-none cursor-pointer"
              >
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
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                        Fetching transactions...
                      </td>
                    </tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">No transactions found matching your criteria.</td>
                    </tr>
                  ) : filteredTransactions.map((tx, i) => (
                    <tr key={tx.transactionId} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4 text-[#7C3AED] font-mono text-xs font-medium">{tx.transactionId}</td>
                      <td className="p-4 text-gray-400 text-xs">{new Date(tx.createdAt).toLocaleString()}</td>
                      <td className="p-4">
                        <div className="text-gray-200 font-medium">{tx.customerName || 'Guest'}</div>
                        <div className="text-gray-500 text-xs">{tx.customerEmail || 'No Email'}</div>
                      </td>
                      <td className="p-4 text-gray-400">{tx.paymentMethod}</td>
                      <td className="p-4 text-white font-bold text-right">${Number(tx.amount).toLocaleString()} {tx.currency}</td>
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
              <span>Showing 1 to {filteredTransactions.length} entries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
