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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/merchant-dashboard')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-all">P</div>
              <span className="font-bold text-lg tracking-tight text-white">PGX Gateway</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] cursor-pointer" onClick={() => navigate('/merchant-dashboard')}>P</div>
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

        {/* Fixed Logout Button */}
        <div className="p-4 border-t border-white/5 mt-auto">
          <button 
            onClick={() => navigate('/login')}
            className={`w-full flex items-center ${isSidebarOpen ? 'justify-start px-3' : 'justify-center'} py-2.5 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-500/10 hover:text-red-400 group`}
            title={!isSidebarOpen ? 'Logout' : ''}
          >
            <LogOut className={`w-5 h-5 shrink-0 ${isSidebarOpen ? 'mr-3' : ''} group-hover:-translate-x-1 transition-transform`} />
            {isSidebarOpen && <span className="font-bold text-sm whitespace-nowrap">Logout</span>}
          </button>
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
             {/* Left side empty since search is removed */}
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
            
            {/* Notifications Dropdown */}
            <div className="relative">
              <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="p-2 rounded-lg transition-colors relative text-gray-400 hover:bg-white/10 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.8)]"></span>
              </button>
              
              {isNotificationOpen && (
                <div className="absolute top-12 right-0 w-80 bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <button className="text-xs text-[#7C3AED] hover:text-[#6D28D9] font-bold transition-colors">Mark all as read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                     <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-sm font-bold text-white mb-1">Settlement Completed</div>
                        <div className="text-xs text-gray-400">$45,200.00 has been successfully settled to your bank account.</div>
                        <div className="text-[10px] text-gray-500 mt-2">2 hours ago</div>
                     </div>
                     <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-sm font-bold text-white mb-1">New Chargeback</div>
                        <div className="text-xs text-gray-400">A chargeback of $150.00 has been filed for txn #TX-9021.</div>
                        <div className="text-[10px] text-gray-500 mt-2">5 hours ago</div>
                     </div>
                  </div>
                  <div className="p-3 text-center border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer rounded-b-2xl">
                     <span className="text-xs font-bold text-gray-400">View all notifications</span>
                  </div>
                </div>
              )}
            </div>

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
