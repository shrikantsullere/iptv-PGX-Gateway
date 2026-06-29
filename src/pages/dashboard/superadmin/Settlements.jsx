import { useState } from 'react';
import { Landmark, ArrowRight, ArrowDownRight, Clock, CheckCircle2, XCircle, X } from 'lucide-react';

const Settlements = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  const openReview = (settlement) => {
    setSelectedSettlement(settlement);
    setIsReviewModalOpen(true);
  };
  const settlements = [
    { id: 'SET-991', merchant: 'Acme Corp', amount: '$45,200.00', status: 'Completed', date: '2023-11-20', method: 'Wire Transfer (USD)' },
    { id: 'SET-992', merchant: 'Global Tech', amount: '$12,450.00', status: 'Processing', date: '2023-11-21', method: 'SEPA (EUR)' },
    { id: 'SET-993', merchant: 'Web3 Gaming', amount: '12.5 BTC', status: 'Pending', date: '2023-11-21', method: 'On-Chain (BTC)' },
    { id: 'SET-994', merchant: 'SaaS Connect', amount: '$8,900.00', status: 'Failed', date: '2023-11-19', method: 'ACH (USD)' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Settlement Center</h1>
          <p className="text-gray-400 text-sm mt-1">Manage fiat and crypto payouts to merchants.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2">Pending Volume</div>
           <div className="text-3xl font-black text-white">$1.2M</div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2">Processing</div>
           <div className="text-3xl font-black text-blue-500">14</div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2">Completed Today</div>
           <div className="text-3xl font-black text-green-500">$840K</div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="text-sm font-bold text-gray-500 mb-2">Failed</div>
           <div className="text-3xl font-black text-red-500">2</div>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Settlement Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Merchant</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Method</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {settlements.map((s, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-sm font-mono text-gray-400">{s.id}</td>
                  <td className="p-4 font-bold text-white">{s.merchant}</td>
                  <td className="p-4 font-bold text-white">{s.amount}</td>
                  <td className="p-4 text-sm text-gray-400">{s.method}</td>
                  <td className="p-4">
                    <span className={`flex w-fit items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
                      s.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      s.status === 'Processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                      s.status === 'Failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                      'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                    }`}>
                      {s.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                      {s.status === 'Failed' && <XCircle className="w-3 h-3" />}
                      {(s.status === 'Processing' || s.status === 'Pending') && <Clock className="w-3 h-3" />}
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{s.date}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openReview(s)} className="text-[#7C3AED] hover:text-white font-bold text-sm transition-colors">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && selectedSettlement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Review Settlement</h2>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Settlement ID</p>
                  <p className="text-white font-mono">{selectedSettlement.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Date</p>
                  <p className="text-white">{selectedSettlement.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Merchant</p>
                  <p className="text-white font-bold">{selectedSettlement.merchant}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Amount</p>
                  <p className="text-white font-black text-lg">{selectedSettlement.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Method</p>
                  <p className="text-white">{selectedSettlement.method}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
                    selectedSettlement.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                    selectedSettlement.status === 'Processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                    selectedSettlement.status === 'Failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                    'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                  }`}>
                    {selectedSettlement.status}
                  </span>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-white/5 mt-6">
                <button onClick={() => setIsReviewModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors border border-white/10">
                  Close
                </button>
                <button onClick={() => { alert('Action processed'); setIsReviewModalOpen(false); }} className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settlements;
