import { useState } from 'react';
import { Landmark, ArrowRight, Building, X, Wallet, CheckCircle2 } from 'lucide-react';

const SettlementCenter = () => {
  const [modalType, setModalType] = useState(null); // 'early_payout' or 'link_account'
  const [linkMethod, setLinkMethod] = useState('bank'); // 'bank' or 'crypto'

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Settlement Center</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your fiat bank accounts and crypto payout addresses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Next Settlement */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center">
           <div className="w-16 h-16 rounded-full bg-[#7C3AED]/20 flex items-center justify-center border border-[#7C3AED]/30 mb-4">
             <Landmark className="w-8 h-8 text-[#7C3AED]" />
           </div>
           <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Upcoming Settlement</div>
           <div className="text-4xl font-black text-white mb-2">$12,450.00</div>
           <div className="text-sm text-gray-400">Scheduled for Tomorrow, 09:00 AM UTC</div>
           <button 
             onClick={() => setModalType('early_payout')}
             className="mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors hover:-translate-y-0.5"
           >
             Request Early Payout
           </button>
        </div>

        {/* Linked Accounts */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
           <h3 className="text-lg font-bold text-white mb-6">Linked Accounts</h3>
           
           <div className="space-y-4">
             <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-[#7C3AED]/30 transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center border border-white/10">
                   <Building className="w-5 h-5 text-gray-400" />
                 </div>
                 <div>
                   <div className="font-bold text-white text-sm">JPMorgan Chase (USD)</div>
                   <div className="text-xs text-gray-500">**** **** **** 4912</div>
                 </div>
               </div>
               <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">Primary</span>
             </div>

             <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-cyan-500/30 transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center border border-white/10">
                   <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=029" className="w-5 h-5" alt="USDC" />
                 </div>
                 <div>
                   <div className="font-bold text-white text-sm">USDC (Polygon)</div>
                   <div className="text-xs text-gray-500 font-mono">0x71C...9A23</div>
                 </div>
               </div>
             </div>
             
             <button 
               onClick={() => setModalType('link_account')}
               className="w-full py-3 border border-dashed border-white/20 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:border-white/40 transition-colors hover:bg-white/[0.02]"
             >
               + Link New Bank or Wallet
             </button>
           </div>
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#09090B]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {modalType === 'early_payout' ? (
                  <><Landmark className="w-5 h-5 text-[#7C3AED]" /> Early Payout</>
                ) : (
                  <><Wallet className="w-5 h-5 text-[#7C3AED]" /> Link Account</>
                )}
              </h3>
              <button 
                onClick={() => setModalType(null)}
                className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              {modalType === 'early_payout' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-bold">Payout Amount</p>
                    <h4 className="text-4xl font-black text-white">$12,450.00</h4>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Select Destination</label>
                    <select className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors appearance-none font-bold">
                      <option>JPMorgan Chase (USD) - **** 4912</option>
                      <option>USDC (Polygon) - 0x71C...9A23</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    A processing fee of 1% will be applied for early payouts. Funds will arrive within 1 hour.
                  </p>
                </div>
              )}

              {modalType === 'link_account' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Account Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setLinkMethod('bank')}
                        className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-2 ${
                          linkMethod === 'bank' 
                            ? 'bg-[#7C3AED]/10 border-[#7C3AED]/50 text-[#7C3AED]' 
                            : 'bg-[#09090B] border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        Fiat Bank Account
                      </button>
                      <button 
                        onClick={() => setLinkMethod('crypto')}
                        className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-2 ${
                          linkMethod === 'crypto' 
                            ? 'bg-[#7C3AED]/10 border-[#7C3AED]/50 text-[#7C3AED]' 
                            : 'bg-[#09090B] border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        Crypto Wallet
                      </button>
                    </div>
                  </div>

                  {linkMethod === 'bank' ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Bank Name</label>
                        <input type="text" placeholder="e.g. Bank of America" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors font-bold text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Account Number</label>
                        <input type="text" placeholder="Enter Account Number" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors font-mono text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Routing Number</label>
                        <input type="text" placeholder="Enter Routing Number" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors font-mono text-sm" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Asset / Network</label>
                        <select className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors appearance-none font-bold">
                          <option>USDC (ERC-20)</option>
                          <option>USDT (TRC-20)</option>
                          <option>BTC (Bitcoin)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Wallet Address</label>
                        <input type="text" placeholder="0x..." className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors font-mono text-sm" />
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-[#09090B] flex gap-3 shrink-0">
              <button 
                onClick={() => setModalType(null)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setModalType(null)}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 group"
              >
                {modalType === 'early_payout' ? 'Confirm Payout' : 'Link Account'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SettlementCenter;
