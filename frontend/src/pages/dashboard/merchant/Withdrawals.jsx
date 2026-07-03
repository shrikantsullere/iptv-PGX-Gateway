import { useState, useEffect } from 'react';
import { ArrowUpFromLine, Search, Clock, CheckCircle2, XCircle, X, Wallet, ArrowRight, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState('crypto');
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/settlements');
      if (res.success && res.data) {
        setWithdrawals(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch withdrawals');
    } finally {
      setLoading(false);
    }
  };

  const handlePayoutRequest = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }
    try {
      setSubmitting(true);
      await apiClient.post('/admin/settlements', {
        merchantId: 'MER-CURRENT', // Mock context for merchant
        amount: Number(amount),
        currency: 'USD',
        destinationDetails: JSON.stringify({ method: payoutMethod, target: destination })
      });
      // Optimistically add to list
      fetchWithdrawals();
      setIsModalOpen(false);
      setAmount('');
      setDestination('');
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || 'Failed to submit payout request');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredWithdrawals = withdrawals.filter(wd => 
    (wd.settlementId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (wd.merchantId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-all font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                Request Payout
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search by ID, destination, or method..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Withdrawal ID</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Method</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                    <th className="p-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                        Fetching withdrawals...
                      </td>
                    </tr>
                  ) : filteredWithdrawals.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">No withdrawals found matching your criteria.</td>
                    </tr>
                  ) : filteredWithdrawals.map((wd, i) => (
                    <tr key={wd.settlementId} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4 text-gray-300 font-mono text-xs">{wd.settlementId}</td>
                      <td className="p-4 text-gray-400 text-xs">{new Date(wd.createdAt).toLocaleString()}</td>
                      <td className="p-4">
                        <span className="bg-white/5 text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium border border-white/5">
                          {wd.payoutMethod || 'Standard'}
                        </span>
                      </td>
                      <td className="p-4 text-white font-bold text-right">- ${Number(wd.amount).toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                          wd.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          wd.status === 'Pending' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {wd.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {wd.status === 'Pending' && <Clock className="w-3.5 h-3.5 animate-spin-slow" />}
                          {wd.status === 'Failed' && <XCircle className="w-3.5 h-3.5" />}
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

      {/* Request Payout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-500/10 to-transparent shrink-0">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-500" /> Request Payout
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Method Selection */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Select Payout Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPayoutMethod('crypto')}
                    className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-2 ${
                      payoutMethod === 'crypto' 
                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                        : 'bg-[#09090B] border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    Crypto Transfer
                  </button>
                  <button 
                    onClick={() => setPayoutMethod('fiat')}
                    className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-2 ${
                      payoutMethod === 'fiat' 
                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                        : 'bg-[#09090B] border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    Fiat Bank Wire
                  </button>
                </div>
              </div>

              {/* Dynamic Fields based on Method */}
              {payoutMethod === 'crypto' ? (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Asset</label>
                    <select className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none font-bold">
                      <option>USDT (Tether)</option>
                      <option>USDC (USD Coin)</option>
                      <option>BTC (Bitcoin)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Network</label>
                    <select className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none font-bold">
                      <option>TRC-20</option>
                      <option>ERC-20</option>
                      <option>Polygon</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Saved Bank Account</label>
                  <select className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none font-bold">
                    <option>Chase Bank ending in 4921</option>
                    <option>Bank of America ending in 1102</option>
                    <option>+ Add New Bank Account</option>
                  </select>
                </div>
              )}

              {/* Destination Address (Only for Crypto) */}
              {payoutMethod === 'crypto' && (
                <div className="animate-in fade-in duration-300">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Destination Wallet Address</label>
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter recipient address..." 
                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
                  />
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                  <span>Amount to Withdraw</span>
                  <span className="text-blue-500 cursor-pointer hover:underline">Available Balance</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-bold text-lg"
                  />
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-white/5 bg-[#09090B] flex gap-3 shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                onClick={handlePayoutRequest}
                disabled={submitting || !amount || Number(amount) <= 0}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {submitting ? 'Processing...' : (
                  <>Confirm Payout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Withdrawals;
