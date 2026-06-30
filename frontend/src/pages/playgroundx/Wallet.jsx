import { useState } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, RefreshCcw, Send, Copy, CheckCircle2, History, CreditCard, ChevronRight, QrCode } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'tx-1', type: 'deposit', amount: '+500.00 PGX', status: 'completed', date: 'Today, 14:20', hash: '0x1a2b...3c4d' },
  { id: 'tx-2', type: 'withdraw', amount: '-150.00 USDC', status: 'completed', date: 'Yesterday, 09:15', hash: '0x9f8e...7d6c' },
  { id: 'tx-3', type: 'swap', amount: '100 PGX → 85 USDC', status: 'completed', date: '25 Jun, 18:45', hash: '0x5b4a...2c1d' },
  { id: 'tx-4', type: 'deposit', amount: '+1000.00 PGX', status: 'completed', date: '20 Jun, 11:30', hash: '0x3c2d...1a4b' },
];

export default function Wallet() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, history
  
  const walletAddress = "0x7F5...9A2B";

  const handleCopy = () => {
    navigator.clipboard.writeText("0x7F54B29A9C8D7E6F5A4B3C2D1E0F9A8B7C6D9A2B");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131A] p-6 rounded-2xl border border-white/5 shadow-xl">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
               <WalletIcon className="w-5 h-5 text-white" />
            </div>
            My Wallet
          </h1>
          <p className="text-gray-400 text-sm mt-2">Manage your PGX tokens, crypto assets, and view transaction history.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#09090B] px-4 py-2 rounded-xl border border-white/10">
          <span className="text-sm font-bold text-gray-400">Address:</span>
          <span className="text-sm font-mono text-white">{walletAddress}</span>
          <button onClick={handleCopy} className="ml-2 text-gray-500 hover:text-white transition-colors">
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Balances & Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Total Balance Card */}
          <div className="bg-gradient-to-br from-[#13131A] to-[#09090B] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
            
            <div className="relative z-10">
              <div className="text-gray-400 font-bold text-sm mb-2 uppercase tracking-wider">Total Balance</div>
              <div className="text-5xl font-black text-white mb-1 tracking-tight">$4,250.00 <span className="text-xl text-gray-500 font-bold">USD</span></div>
              <div className="text-[#7C3AED] font-bold text-sm flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-4 h-4" /> +$125.50 (3.2%) Today
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <button className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] transition-all p-4 rounded-2xl group/btn hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                    <ArrowDownLeft className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wide">Deposit</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] transition-all p-4 rounded-2xl group/btn hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wide">Withdraw</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] transition-all p-4 rounded-2xl group/btn hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wide">Send</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] transition-all p-4 rounded-2xl group/btn hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                    <RefreshCcw className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wide">Swap</span>
                </button>
              </div>
            </div>
          </div>

          {/* Assets List */}
          <div className="bg-[#13131A] rounded-3xl border border-white/5 p-6 shadow-xl">
            <h3 className="text-lg font-black text-white mb-4">Your Assets</h3>
            <div className="space-y-3">
              {/* Asset 1 */}
              <div className="flex items-center justify-between p-4 bg-[#09090B] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-black text-white text-lg shadow-lg">
                    P
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">PlayGroundX</div>
                    <div className="text-gray-400 text-sm font-medium">PGX</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-black text-lg">452.00 PGX</div>
                  <div className="text-gray-400 text-sm font-medium">≈ $452.00</div>
                </div>
              </div>
              
              {/* Asset 2 */}
              <div className="flex items-center justify-between p-4 bg-[#09090B] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-black text-white text-lg shadow-lg">
                    $
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">USDC Coin</div>
                    <div className="text-gray-400 text-sm font-medium">USDC</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-black text-lg">3,798.00 USDC</div>
                  <div className="text-gray-400 text-sm font-medium">≈ $3,798.00</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column: Quick Deposit & History */}
        <div className="space-y-6">
          
          {/* Quick Deposit QR */}
          <div className="bg-[#13131A] rounded-3xl border border-white/5 p-6 shadow-xl flex flex-col items-center text-center relative overflow-hidden group hover:border-[#7C3AED]/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none"></div>
            
            <QrCode className="w-8 h-8 text-[#7C3AED] mb-4" />
            <h3 className="text-lg font-black text-white mb-2">Receive Crypto</h3>
            <p className="text-gray-400 text-sm mb-6 px-4">Scan this QR code or copy your address to receive PGX or USDC.</p>
            
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 group-hover:scale-105 transition-transform">
               {/* Placeholder QR Code image */}
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x7F54B29A9C8D7E6F5A4B3C2D1E0F9A8B7C6D9A2B&bgcolor=ffffff" alt="QR Code" className="w-32 h-32 rounded-lg" />
            </div>
            
            <button onClick={handleCopy} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />} 
              {copied ? 'Address Copied!' : 'Copy Wallet Address'}
            </button>
          </div>

          {/* Recent Activity Mini */}
          <div className="bg-[#13131A] rounded-3xl border border-white/5 p-6 shadow-xl flex flex-col h-[350px]">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2"><History className="w-4 h-4 text-[#7C3AED]" /> Recent Activity</h3>
                <button className="text-xs font-bold text-[#7C3AED] hover:text-white transition-colors">View All</button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
               {TRANSACTIONS.map(tx => (
                 <div key={tx.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 ${
                         tx.type === 'deposit' ? 'text-green-400' : tx.type === 'withdraw' ? 'text-red-400' : 'text-blue-400'
                       }`}>
                         {tx.type === 'deposit' ? <ArrowDownLeft className="w-4 h-4" /> : tx.type === 'withdraw' ? <ArrowUpRight className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
                       </div>
                       <div>
                         <div className="text-sm font-bold text-white capitalize">{tx.type}</div>
                         <div className="text-[10px] text-gray-500">{tx.date}</div>
                       </div>
                    </div>
                    <div className={`text-sm font-black ${
                      tx.type === 'deposit' ? 'text-green-400' : tx.type === 'withdraw' ? 'text-red-400' : 'text-white'
                    }`}>
                      {tx.amount}
                    </div>
                 </div>
               ))}
             </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
