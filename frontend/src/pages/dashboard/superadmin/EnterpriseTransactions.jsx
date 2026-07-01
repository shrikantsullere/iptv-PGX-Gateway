import { useState, useEffect } from 'react';
import { 
  Search, Download, Filter, Calendar, MapPin, Building,
  Server, Coins, Link as LinkIcon, ExternalLink, MoreHorizontal, ArrowRightLeft,
  Edit, Trash, X, Loader2
} from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const EnterpriseTransactions = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [txToUpdate, setTxToUpdate] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/transactions');
      if (res.success) {
        setTransactions(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    (tx.merchantId || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (tx.customerEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const headers = ['Transaction ID', 'Timestamp', 'Merchant', 'Customer', 'Amount', 'Currency', 'Processor', 'Gateway Fee', 'Status'];
    const csvRows = filteredTransactions.map(tx => 
      [tx.transactionId, `"${tx.createdAt}"`, `"${tx.merchantId}"`, `"${tx.customerEmail}"`, tx.amount, tx.currency, tx.processorName, tx.gatewayFee, tx.status].join(',')
    );
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openUpdateModal = (tx) => {
    setTxToUpdate(tx);
    setIsUpdateModalOpen(true);
  };

  const handleRefund = async (e) => {
    e.preventDefault();
    if (!txToUpdate) return;
    
    try {
      const res = await apiClient.post(`/admin/transactions/${txToUpdate.transactionId}/refund`, {
        reason: 'Requested by Super Admin'
      });
      if (res.success) {
        setTransactions(transactions.map(t => t.transactionId === txToUpdate.transactionId ? { ...t, status: 'Refunded' } : t));
        setIsUpdateModalOpen(false);
        setTxToUpdate(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Refund failed');
    }
  };

  const handleDelete = (id) => {
    alert("Transaction deletion is restricted by compliance rules. Please use Refund instead.");
  };

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
          <button onClick={handleExport} className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl transition-all font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-[#13131A] p-6 rounded-2xl border border-white/5 animate-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl">
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Merchant</label>
             <input type="text" placeholder="Filter by Merchant" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#7C3AED]" />
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Processor</label>
             <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#7C3AED]">
               <option value="">All Processors</option>
               <option value="MoonPay">MoonPay</option>
               <option value="Transak">Transak</option>
             </select>
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
             <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#7C3AED]">
               <option value="">All Statuses</option>
               <option value="Completed">Completed</option>
               <option value="Pending">Pending</option>
               <option value="Failed">Failed</option>
             </select>
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date Range</label>
             <input type="date" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-gray-400 outline-none focus:border-[#7C3AED]" />
           </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-[#13131A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Merchant, or Customer..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-[#7C3AED] outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40 border-b border-white/5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Transaction Info</th>
                <th className="p-4">Merchant & User</th>
                <th className="p-4">Amount & Cur.</th>
                <th className="p-4">Processor & Route</th>
                <th className="p-4">PGX Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">No transactions found.</td>
                </tr>
              ) : currentTransactions.map((tx) => (
                <tr key={tx.transactionId} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="font-mono text-sm font-bold text-white group-hover:text-[#7C3AED] transition-colors flex items-center gap-2">
                      {tx.transactionId} <ExternalLink className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white" />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {new Date(tx.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-white">{tx.merchantId}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{tx.customerEmail}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-white">{tx.amount}</span>
                      <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded border border-white/10 font-bold">{tx.currency}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-gray-300">{tx.processorName || 'Auto Routed'}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-mono truncate w-32">{tx.paymentHash || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-green-400 font-bold">
                      <Coins className="w-4 h-4" />
                      +{tx.gatewayFee}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`flex w-fit items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                      tx.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      tx.status === 'Refunded' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tx.status === 'Completed' ? 'bg-green-500' : 
                        tx.status === 'Pending' ? 'bg-yellow-500' :
                        tx.status === 'Refunded' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}></span>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {tx.status === 'Completed' && (
                        <button onClick={() => openUpdateModal(tx)} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors" title="Process Refund">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(tx.transactionId)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredTransactions.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Refund Modal */}
      {isUpdateModalOpen && txToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Process Refund</h2>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRefund} className="p-6 space-y-4">
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-sm text-gray-300">
                You are about to process a full refund for transaction 
                <span className="font-mono text-white mx-1">{txToUpdate.transactionId}</span> 
                amounting to <span className="text-white font-bold">{txToUpdate.amount} {txToUpdate.currency}</span>.
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-colors">
                  Confirm Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EnterpriseTransactions;
