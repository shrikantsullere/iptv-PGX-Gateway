import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, CreditCard, ArrowDownToLine, ArrowUpToLine, Wallet, 
  Landmark, Users, DollarSign, BarChart3, Key, Webhook, 
  Palette, Brush, Receipt, Users2, Bell, Settings, HelpCircle,
  Search, LogOut, ChevronLeft, ChevronRight, Copy
} from 'lucide-react';

const MerchantLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/merchant-dashboard' },
    { name: 'Transactions', icon: CreditCard, path: '/merchant/transactions' },
    { name: 'Deposits', icon: ArrowDownToLine, path: '/merchant/deposits' },
    { name: 'Withdrawals', icon: ArrowUpToLine, path: '/merchant/withdrawals' },
    { name: 'Wallet Management', icon: Wallet, path: '/wallets' },
    { name: 'Settlement Center', icon: Landmark, path: '/merchant/settlements' },
    { name: 'Customers', icon: Users, path: '/merchant/customers' },
    { name: 'Revenue', icon: DollarSign, path: '/merchant/revenue' },
    { name: 'Reports & Analytics', icon: BarChart3, path: '/merchant/reports' },
    { name: 'API Keys', icon: Key, path: '/merchant/api' },
    { name: 'Webhooks', icon: Webhook, path: '/merchant/webhooks' },
    { name: 'White Label', icon: Palette, path: '/merchant/whitelabel' },
    { name: 'Branding', icon: Brush, path: '/merchant/branding' },
    { name: 'Billing & Subscription', icon: Receipt, path: '/merchant/billing' },
    { name: 'Team Members', icon: Users2, path: '/merchant/team' },
    { name: 'Notifications', icon: Bell, path: '/merchant/notifications' },
    { name: 'Settings', icon: Settings, path: '/merchant/settings' },
    { name: 'Support', icon: HelpCircle, path: '/merchant/support' },
  ];

  return (
    <div className="h-screen overflow-hidden flex bg-[#050508] text-white font-sans">
      
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 border-r border-white/5 bg-[#09090B] flex flex-col transition-all duration-300 relative z-20`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center ${isSidebarOpen ? 'justify-between px-6' : 'justify-center'} border-b border-white/5`}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-cyan-600 flex items-center justify-center font-black text-white text-lg">M</div>
              <span className="font-bold text-lg tracking-tight">Acme Corp</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-cyan-600 flex items-center justify-center font-black text-white text-lg">M</div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {menuItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === '/merchant-dashboard'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? `bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]` 
                    : `text-gray-400 hover:text-white hover:bg-white/5`
                  }
                `}
                title={!isSidebarOpen ? item.name : ''}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isSidebarOpen ? '' : 'mx-auto'}`} />
                {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center shadow-lg bg-[#13131A] border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/5 bg-[#09090B] sticky top-0 z-10">
          
          <div className="flex items-center gap-6">
            <div className="relative flex items-center w-64 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 focus-within:ring-1 focus-within:ring-[#7C3AED] transition-all">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Balance Pill */}
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
               <div className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center">
                 <Wallet className="w-3 h-3 text-white" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-400 uppercase font-bold leading-none">Available Balance</span>
                 <span className="text-sm font-black text-white leading-tight">$124,500.00</span>
               </div>
            </div>

            <div className="w-px h-6 bg-white/10 mx-2"></div>
            
            <button className="p-2 rounded-lg transition-colors relative text-gray-400 hover:bg-white/10 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.8)]"></span>
            </button>

            <div className="w-px h-6 bg-white/10 mx-2"></div>

            {/* Profile */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-[#7C3AED] flex items-center justify-center font-bold text-white text-sm">
                AC
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold leading-tight text-white group-hover:text-[#7C3AED] transition-colors">Acme Corp</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  ID: MER-1092 <Copy className="w-3 h-3 hover:text-white transition-colors" />
                </div>
              </div>
            </div>
            
            <button onClick={() => navigate('/login')} className="ml-2 p-2 rounded-lg transition-colors text-red-400 hover:bg-red-500/10">
              <LogOut className="w-5 h-5" />
            </button>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8 relative">
          <Outlet />
        </main>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default MerchantLayout;
