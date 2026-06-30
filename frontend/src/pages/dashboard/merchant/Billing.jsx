import { useState } from 'react';
import { FileText, CreditCard, Download, CheckCircle2, X, Zap, Shield, Plus, Loader2 } from 'lucide-react';

const Billing = () => {
  const [modalType, setModalType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleDownload = (id) => {
    setSelectedInvoice(id);
    setModalType('download');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessComplete(true);
      setTimeout(() => {
        setProcessComplete(false);
        setModalType(null);
        setSelectedInvoice(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-500" /> Billing & Plans
            </h1>
            <p className="text-gray-400">Manage your subscription, invoices, and payment methods.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Current Plan */}
            <div className="lg:col-span-2 bg-gradient-to-br from-orange-500/10 to-[#13131A] border border-orange-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                  <div>
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Enterprise</span>
                    <h2 className="text-3xl font-bold">$499 <span className="text-lg text-gray-400 font-normal">/ month</span></h2>
                  </div>
                  <button 
                    onClick={() => setModalType('upgrade')}
                    className="mt-4 sm:mt-0 w-full sm:w-auto bg-white text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    Upgrade Plan
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  {['Unlimited Transactions', 'Dedicated Account Manager', 'White-label Checkout', 'SLA Guarantee (99.99%)'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" /> {feat}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-black/50 rounded-full h-2.5 mb-2 overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full relative" style={{ width: '45%' }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500">45k / 100k API calls this month</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><CreditCard className="w-5 h-5 text-gray-400" /> Payment Method</h3>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors">
                  <div className="w-14 h-9 bg-white rounded-lg flex items-center justify-center font-black text-blue-900 text-sm shadow-sm">VISA</div>
                  <div>
                    <div className="font-bold text-white tracking-wider">•••• 4242</div>
                    <div className="text-xs font-medium text-gray-500 mt-0.5">Expires 12/28</div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setModalType('payment')}
                className="text-sm text-primary font-bold hover:text-primary/80 transition-colors text-left mt-6 flex items-center gap-1.5 relative z-10 w-fit"
              >
                <Plus className="w-4 h-4" /> Add Payment Method
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-5 border-b border-white/5 bg-[#09090B]">
              <h3 className="text-lg font-bold text-white">Billing History</h3>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-5 font-bold uppercase tracking-wider">Invoice ID</th>
                    <th className="p-5 font-bold uppercase tracking-wider">Date</th>
                    <th className="p-5 font-bold uppercase tracking-wider">Amount</th>
                    <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                    <th className="p-5 font-bold uppercase tracking-wider text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {[
                    { id: 'INV-2025-05', date: 'May 01, 2025', amount: '$499.00', status: 'Paid' },
                    { id: 'INV-2025-04', date: 'Apr 01, 2025', amount: '$499.00', status: 'Paid' },
                    { id: 'INV-2025-03', date: 'Mar 01, 2025', amount: '$499.00', status: 'Paid' },
                  ].map((inv, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-5 font-mono text-xs font-bold text-gray-300">{inv.id}</td>
                      <td className="p-5 text-gray-400 text-xs font-medium">{inv.date}</td>
                      <td className="p-5 font-bold text-white">{inv.amount}</td>
                      <td className="p-5">
                        <span className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleDownload(inv.id)}
                          className="text-gray-500 hover:text-white hover:bg-white/10 transition-all p-2 rounded-lg inline-flex items-center justify-center group-hover:text-primary"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`bg-[#13131A] border border-white/10 rounded-3xl w-full ${modalType === 'upgrade' ? 'max-w-3xl' : 'max-w-md'} max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden`}>
            
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#09090B]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {modalType === 'upgrade' && <Zap className="w-5 h-5 text-orange-500" />}
                {modalType === 'payment' && <CreditCard className="w-5 h-5 text-primary" />}
                {modalType === 'download' && <FileText className="w-5 h-5 text-primary" />}
                
                {modalType === 'upgrade' && 'Upgrade Plan'}
                {modalType === 'payment' && 'Add Payment Method'}
                {modalType === 'download' && 'Downloading Invoice'}
              </h3>
              <button 
                onClick={() => !isProcessing && setModalType(null)}
                disabled={isProcessing}
                className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              
              {/* DOWNLOAD MODAL */}
              {modalType === 'download' && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  {processComplete ? (
                    <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                      <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Download Complete!</h4>
                      <p className="text-gray-400 text-sm">Invoice {selectedInvoice} has been downloaded to your device.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                      <h4 className="text-lg font-bold text-white mb-1">Generating PDF...</h4>
                      <p className="text-gray-400 text-sm">Please wait while we prepare {selectedInvoice}.</p>
                    </div>
                  )}
                </div>
              )}

              {/* PAYMENT MODAL */}
              {modalType === 'payment' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Card Number</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-primary transition-colors text-sm font-mono" />
                      <CreditCard className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm font-mono" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">CVC</label>
                      <input type="text" placeholder="123" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm font-mono" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-6 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Shield className="w-4 h-4 text-green-500" />
                    Your payment information is securely encrypted.
                  </div>

                  <button 
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => { setIsProcessing(false); setModalType(null); }, 1000);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-4 flex justify-center items-center h-12"
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Payment Method'}
                  </button>
                </div>
              )}

              {/* UPGRADE MODAL */}
              {modalType === 'upgrade' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pro Plan */}
                  <div className="bg-[#09090B] border border-white/5 hover:border-primary/50 transition-colors rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-xl font-bold text-white mb-2">Pro Plan</h4>
                    <div className="text-3xl font-black text-white mb-4">$199 <span className="text-sm font-normal text-gray-500">/ mo</span></div>
                    <ul className="space-y-3 mb-6">
                      {['10k API calls / month', 'Standard Support', 'Basic Analytics'].map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-2.5 rounded-xl border border-white/10 font-bold text-gray-300 hover:bg-white/5 transition-colors text-sm">
                      Select Pro
                    </button>
                  </div>
                  
                  {/* Current Enterprise Plan */}
                  <div className="bg-gradient-to-b from-orange-500/20 to-[#09090B] border border-orange-500/50 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full px-4 text-center">
                      <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-b-lg shadow-lg">Current Plan</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 mt-4">Enterprise</h4>
                    <div className="text-3xl font-black text-white mb-4">$499 <span className="text-sm font-normal text-gray-500">/ mo</span></div>
                    <ul className="space-y-3 mb-6">
                      {['100k API calls / month', 'Dedicated Support', 'White-label Checkout', 'SLA Guarantee'].map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>
                    <button disabled className="w-full py-2.5 rounded-xl bg-orange-500/20 text-orange-500 font-bold text-sm cursor-not-allowed">
                      Current Plan
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Billing;
