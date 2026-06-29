import { Search, Bell, Menu, Activity, ShieldCheck, Maximize } from 'lucide-react';

const SuperAdminTopBar = () => {
  return (
    <header className="h-[72px] bg-[#09090B]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40">
      
      <div className="flex items-center gap-6 flex-1">
        <button className="text-gray-400 hover:text-white transition-colors lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Global Search */}
        <div className="hidden md:flex items-center bg-black/50 border border-white/10 rounded-xl px-4 py-2 w-96 focus-within:border-red-500/50 focus-within:bg-black transition-all group">
          <Search className="w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors mr-3" />
          <input 
            type="text" 
            placeholder="Search merchants, txids, wallets..." 
            className="bg-transparent border-none text-sm text-white placeholder-gray-600 focus:outline-none w-full"
          />
          <div className="flex items-center gap-1 ml-2">
            <kbd className="hidden sm:inline-block bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono text-gray-400">Ctrl</kbd>
            <kbd className="hidden sm:inline-block bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono text-gray-400">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* System Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 cursor-pointer hover:bg-green-500/20 transition-colors">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 text-xs font-medium">All Systems Operational</span>
        </div>

        <div className="h-6 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors tooltip" title="Network Activity">
            <Activity className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors tooltip" title="Security Logs">
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#09090B]">
              12
            </span>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default SuperAdminTopBar;
