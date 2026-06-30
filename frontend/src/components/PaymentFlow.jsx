import { UserCircle2, Globe2, Building2, Network, ArrowRight } from 'lucide-react';

const PaymentFlow = () => {
  return (
    <section className="py-24 bg-[#050508] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Intelligent Payment Routing</h2>
          <p className="text-gray-400 text-lg">See how transactions flow securely from the customer through our gateway to your merchant wallets.</p>
        </div>

        {/* Animated Flow Diagram */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-8 bg-[#09090B] border border-white/10 rounded-3xl shadow-2xl relative">
          
          {/* Animated Connecting Line Background */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-gray-800 via-[#7C3AED] to-gray-800 -translate-y-1/2 z-0 opacity-50"></div>

          <div className="flex flex-col items-center z-10 relative">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mb-4">
              <UserCircle2 className="w-8 h-8 text-gray-400" />
            </div>
            <span className="font-bold text-white text-sm">Customer</span>
          </div>

          <ArrowRight className="w-6 h-6 text-[#7C3AED] lg:hidden my-2" />

          <div className="flex flex-col items-center z-10 relative">
            <div className="w-20 h-20 rounded-2xl bg-[#13131A] border border-[#7C3AED]/30 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.2)] mb-4 animate-pulse" style={{ animationDuration: '3s' }}>
              <Globe2 className="w-10 h-10 text-[#7C3AED]" />
            </div>
            <span className="font-bold text-white text-sm">Merchant Website</span>
            <span className="text-[10px] text-gray-500">Checkout Widget</span>
          </div>

          <ArrowRight className="w-6 h-6 text-[#7C3AED] lg:hidden my-2" />

          <div className="flex flex-col items-center z-10 relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-blue-600 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] mb-4">
              <span className="font-black text-white text-2xl">PGX</span>
            </div>
            <span className="font-bold text-white text-sm">Gateway Engine</span>
            <span className="text-[10px] text-gray-500">Risk & Routing</span>
          </div>

          <ArrowRight className="w-6 h-6 text-[#7C3AED] lg:hidden my-2" />

          <div className="flex flex-col gap-3 z-10 relative">
            <div className="flex items-center gap-3 bg-black/80 border border-green-500/30 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
              <span className="font-bold text-sm text-white">MoonPay</span>
            </div>
            <div className="flex items-center gap-3 bg-black/80 border border-white/10 px-4 py-2 rounded-xl opacity-50">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="font-bold text-sm text-gray-400">Banxa</span>
            </div>
            <div className="flex items-center gap-3 bg-black/80 border border-white/10 px-4 py-2 rounded-xl opacity-50">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span className="font-bold text-sm text-gray-400">Transak</span>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-[#7C3AED] lg:hidden my-2" />

          <div className="flex flex-col items-center z-10 relative">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mb-4">
              <Building2 className="w-8 h-8 text-cyan-400" />
            </div>
            <span className="font-bold text-white text-sm">Settlement</span>
            <span className="text-[10px] text-gray-500">Merchant Wallet</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PaymentFlow;
