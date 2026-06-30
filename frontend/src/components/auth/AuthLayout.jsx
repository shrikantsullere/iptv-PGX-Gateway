import { Link } from 'react-router-dom';
import { Layers, Bitcoin, ShieldCheck, Activity, BarChart3, LineChart } from 'lucide-react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] flex font-sans text-white selection:bg-[#7C3AED]/30">
      
      {/* LEFT SIDE - Animated Fintech Illustration (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#050508] border-r border-white/5 overflow-hidden flex-col justify-between p-12">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen" style={{ animation: 'pulse 5s infinite' }}></div>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group relative z-10 w-max">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all">
            P
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">PGX Gateway</span>
        </Link>

        {/* Floating Abstract Illustration */}
        <div className="relative flex-1 flex items-center justify-center my-12 z-10 perspective-1000">
          
          <div className="relative w-full max-w-lg h-96">
            
            {/* Main Central Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-gradient-to-br from-[#13131A] to-[#09090B] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between z-20 hover:scale-105 transition-transform duration-500">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center"><Bitcoin className="w-5 h-5 text-[#7C3AED]" /></div>
                     <div><div className="text-sm font-bold">PGX Routing</div><div className="text-[10px] text-gray-500">Active Engine</div></div>
                  </div>
                  <div className="text-right">
                     <div className="text-lg font-black text-white">$45,200.00</div>
                     <div className="text-[10px] text-green-500 flex justify-end gap-1 items-center">+12.5% <Activity className="w-3 h-3"/></div>
                  </div>
               </div>
               
               {/* Mini Chart */}
               <div className="h-16 flex items-end gap-1 mt-4">
                  {[30, 50, 40, 70, 60, 90, 80, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-[#7C3AED] to-cyan-400 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
                  ))}
               </div>
            </div>

            {/* Floating Elements around */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-center gap-2 -rotate-12 z-10 shadow-[0_0_40px_rgba(34,211,238,0.1)] animate-[bounce_6s_infinite]">
              <ShieldCheck className="w-8 h-8 text-cyan-400 mb-1" />
              <div className="w-16 h-2 bg-white/20 rounded-full"></div>
              <div className="w-12 h-2 bg-white/10 rounded-full"></div>
            </div>

            <div className="absolute bottom-10 right-0 w-40 h-28 bg-[#1A1A24]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 rotate-6 z-30 shadow-2xl flex flex-col justify-between animate-[bounce_8s_infinite]">
              <div className="flex justify-between items-center"><BarChart3 className="w-5 h-5 text-green-500"/><span className="text-xs font-bold text-white">Live</span></div>
              <div className="space-y-1.5">
                 <div className="w-full h-1.5 bg-white/10 rounded-full"><div className="w-3/4 h-full bg-green-500 rounded-full"></div></div>
                 <div className="w-full h-1.5 bg-white/10 rounded-full"><div className="w-1/2 h-full bg-[#7C3AED] rounded-full"></div></div>
              </div>
            </div>

            {/* Grid Floor */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwVjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] [transform:rotateX(75deg)] opacity-50 z-0"></div>

          </div>

        </div>

        {/* Copy Text */}
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Secure Access to Your Payment Infrastructure</h1>
          <p className="text-gray-400 text-lg max-w-md">Manage your merchants, wallets, transactions, settlements, and analytics from one secure platform.</p>
        </div>

      </div>

      {/* RIGHT SIDE - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 xl:p-24 relative bg-[#09090B]">
        {/* Mobile Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-[100px] lg:hidden"></div>
        
        <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center justify-center gap-2 mb-10 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              P
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">PGX Gateway</span>
          </Link>

          {/* Form Content Injected Here */}
          <div className="bg-[#13131A]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
             {/* Subtle Inner Glow */}
             <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none"></div>
             {children}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
