import { Landmark, ArrowRight, Building } from 'lucide-react';

const SettlementCenter = () => {
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
           <button className="mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
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
             
             <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:border-white/40 transition-colors">
               + Link New Bank or Wallet
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementCenter;
