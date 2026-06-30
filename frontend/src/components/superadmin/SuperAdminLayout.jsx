import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, DollarSign, Landmark, Wallet,
  Network, Receipt, Package, ShieldAlert, Globe2,
  Coins, Code, Webhook, BarChart3, Palette, Bell, Ticket,
  ClipboardList, UserCog, Settings, Sun, Moon, LogOut, ChevronLeft, ChevronRight, CheckCircle2,
  ChevronDown, Activity, Map, Percent, FileText, Database, Shield, FileCheck, Eye, AlertTriangle, UserX, Gavel, CalendarClock, Menu, X
} from 'lucide-react';

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // On mobile default closed, on desktop default open
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProcessorsOpen, setIsProcessorsOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isRiskOpen, setIsRiskOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Detect resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isProcessorRoute = location.pathname.includes('/super-admin/processors');
  const isComplianceRoute = location.pathname.includes('/super-admin/compliance');
  const isRiskRoute = location.pathname.includes('/super-admin/risk');

  useState(() => {
    if (isProcessorRoute) setIsProcessorsOpen(true);
    if (isComplianceRoute) setIsComplianceOpen(true);
    if (isRiskRoute) setIsRiskOpen(true);
  });

  const topMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/super-admin' },
    { name: 'Merchants', icon: Users, path: '/super-admin/merchants' },
    { name: 'Transactions', icon: CreditCard, path: '/super-admin/transactions' },
    { name: 'Revenue', icon: DollarSign, path: '/super-admin/revenue' },
    { name: 'Settlements', icon: Landmark, path: '/super-admin/settlements' },
    { name: 'Wallets', icon: Wallet, path: '/super-admin/wallets' },
  ];

  const processorSubItems = [
    { name: 'Dashboard', path: '/super-admin/processors/dashboard', icon: LayoutDashboard },
    { name: 'Failover Monitor', path: '/super-admin/processors/failover', icon: Activity },
    { name: 'Fee Split Engine', path: '/super-admin/processors/fee-split', icon: Percent },
    { name: 'Geo Routing', path: '/super-admin/processors/geo-routing', icon: Map },
    { name: 'Merchant Rules', path: '/super-admin/processors/merchant-fees', icon: Shield },
    { name: 'Settlement Engine', path: '/super-admin/processors/settlement-engine', icon: Landmark },
    { name: 'Revenue Wallet', path: '/super-admin/processors/revenue-wallet', icon: Wallet },
    { name: 'Logs', path: '/super-admin/processors/logs', icon: Database },
    { name: 'Reports', path: '/super-admin/processors/reports', icon: FileText },
  ];

  const complianceSubItems = [
    { name: 'KYC Dashboard', path: '/super-admin/compliance/kyc-dashboard', icon: LayoutDashboard },
    { name: 'AML Monitoring', path: '/super-admin/compliance/aml', icon: Eye },
    { name: 'Reports', path: '/super-admin/compliance/reports', icon: FileText },
    { name: 'Activity Timeline', path: '/super-admin/compliance/timeline', icon: CalendarClock },
  ];

  const riskSubItems = [
    { name: 'Risk Dashboard', path: '/super-admin/risk/dashboard', icon: LayoutDashboard },
    { name: 'Fraud Center', path: '/super-admin/risk/fraud-center', icon: AlertTriangle },
    { name: 'Blocked Entities', path: '/super-admin/risk/blocked', icon: UserX },
    { name: 'Case Management', path: '/super-admin/risk/cases', icon: Gavel },
  ];

  const bottomMenuItems = [
    { name: 'Fee Management', icon: Receipt, path: '/super-admin/fees' },
    { name: 'Subscriptions', icon: Package, path: '/super-admin/subscriptions' },
    { name: 'Countries', icon: Globe2, path: '/super-admin/countries' },
    { name: 'Currencies', icon: Coins, path: '/super-admin/currencies' },
    { name: 'API Management', icon: Code, path: '/super-admin/api' },
    { name: 'Webhooks', icon: Webhook, path: '/super-admin/webhooks' },
    { name: 'Reports', icon: BarChart3, path: '/super-admin/reports' },
    { name: 'White Label', icon: Palette, path: '/super-admin/white-label' },
    { name: 'Notifications', icon: Bell, path: '/super-admin/notifications' },
    { name: 'Support', icon: Ticket, path: '/super-admin/support' },
    { name: 'Audit Logs', icon: ClipboardList, path: '/super-admin/audit-logs' },
    { name: 'Roles', icon: UserCog, path: '/super-admin/roles' },
    { name: 'Settings', icon: Settings, path: '/super-admin/settings' },
  ];

  // Sidebar shown: always on desktop; drawer on mobile
  const showSidebar = isMobile ? isMobileOpen : true;
  const sidebarExpanded = isMobile ? true : isSidebarOpen;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`h-16 flex items-center ${sidebarExpanded ? 'justify-between px-5' : 'justify-center'} border-b ${isDarkMode ? 'border-white/5' : 'border-gray-200'} shrink-0`}>
        {sidebarExpanded ? (
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/super-admin')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-all shrink-0">P</div>
            <span className="font-bold text-lg tracking-tight text-white">PGX Gateway</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] cursor-pointer" onClick={() => navigate('/super-admin')}>P</div>
        )}
        {/* Mobile close button */}
        {isMobile && (
          <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        <nav className="space-y-1 px-3">

          {topMenuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end={item.path === '/super-admin'}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive
                  ? `bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }
              `}
              title={!sidebarExpanded ? item.name : ''}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarExpanded && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
            </NavLink>
          ))}

          {/* Payment Processors Submenu */}
          <div className="pt-2 pb-1">
            <button
              onClick={() => setIsProcessorsOpen(!isProcessorsOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isProcessorRoute
                  ? `bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }
              `}
              title={!sidebarExpanded ? 'Payment Processors' : ''}
            >
              <div className="flex items-center gap-3">
                <Network className={`w-5 h-5 shrink-0 ${isProcessorRoute ? 'text-[#7C3AED]' : ''}`} />
                {sidebarExpanded && <span className="font-bold text-sm whitespace-nowrap">Payment Processors</span>}
              </div>
              {sidebarExpanded && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProcessorsOpen ? 'rotate-180' : ''}`} />}
            </button>
            {sidebarExpanded && isProcessorsOpen && (
              <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {processorSubItems.map((sub, i) => (
                  <NavLink key={i} to={sub.path} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${isActive ? `bg-white/10 text-white font-bold` : `${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}`}>
                    <sub.icon className="w-3.5 h-3.5 shrink-0" /> {sub.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* KYC & Compliance Submenu */}
          <div className="pb-1">
            <button
              onClick={() => setIsComplianceOpen(!isComplianceOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isComplianceRoute
                  ? `bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }
              `}
              title={!sidebarExpanded ? 'KYC & Compliance' : ''}
            >
              <div className="flex items-center gap-3">
                <FileCheck className={`w-5 h-5 shrink-0 ${isComplianceRoute ? 'text-[#7C3AED]' : ''}`} />
                {sidebarExpanded && <span className="font-bold text-sm whitespace-nowrap">KYC & Compliance</span>}
              </div>
              {sidebarExpanded && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isComplianceOpen ? 'rotate-180' : ''}`} />}
            </button>
            {sidebarExpanded && isComplianceOpen && (
              <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {complianceSubItems.map((sub, i) => (
                  <NavLink key={i} to={sub.path} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${isActive ? `bg-white/10 text-white font-bold` : `${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}`}>
                    <sub.icon className="w-3.5 h-3.5 shrink-0" /> {sub.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Fraud & Risk Submenu */}
          <div className="pb-1">
            <button
              onClick={() => setIsRiskOpen(!isRiskOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isRiskRoute
                  ? `bg-red-500/10 text-red-500 border border-red-500/20`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }
              `}
              title={!sidebarExpanded ? 'Fraud & Risk' : ''}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className={`w-5 h-5 shrink-0 ${isRiskRoute ? 'text-red-500' : ''}`} />
                {sidebarExpanded && <span className="font-bold text-sm whitespace-nowrap">Fraud & Risk</span>}
              </div>
              {sidebarExpanded && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isRiskOpen ? 'rotate-180' : ''}`} />}
            </button>
            {sidebarExpanded && isRiskOpen && (
              <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {riskSubItems.map((sub, i) => (
                  <NavLink key={i} to={sub.path} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${isActive ? `bg-red-500/20 text-white font-bold` : `${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}`}>
                    <sub.icon className={`w-3.5 h-3.5 shrink-0 ${location.pathname === sub.path ? 'text-red-500' : ''}`} /> {sub.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Menu */}
          {bottomMenuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive
                  ? `bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }
              `}
              title={!sidebarExpanded ? item.name : ''}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarExpanded && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
            </NavLink>
          ))}

        </nav>
      </div>

      {/* Logout */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-200'} mt-auto shrink-0`}>
        <button
          onClick={() => navigate('/login')}
          className={`w-full flex items-center ${sidebarExpanded ? 'justify-start px-3' : 'justify-center'} py-2.5 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-500/10 hover:text-red-400 group`}
          title={!sidebarExpanded ? 'Logout' : ''}
        >
          <LogOut className={`w-5 h-5 shrink-0 ${sidebarExpanded ? 'mr-3' : ''} group-hover:-translate-x-1 transition-transform`} />
          {sidebarExpanded && <span className="font-bold text-sm whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className={`h-screen overflow-hidden flex ${isDarkMode ? 'bg-[#050508] text-white' : 'bg-gray-50 text-gray-900'} font-sans`}>

      {/* ── DESKTOP Sidebar (persistent) ── */}
      {!isMobile && (
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 border-r ${isDarkMode ? 'border-white/5 bg-[#09090B]' : 'border-gray-200 bg-white'} flex flex-col transition-all duration-300 relative z-20`}>
          <SidebarContent />
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-30 ${isDarkMode ? 'bg-[#13131A] border border-white/10 text-gray-400' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            {isSidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        </aside>
      )}

      {/* ── MOBILE Sidebar (drawer overlay) ── */}
      {isMobile && (
        <>
          {/* Backdrop */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
          {/* Drawer */}
          <aside
            className={`fixed left-0 top-0 h-full w-72 z-50 flex flex-col transition-transform duration-300 ${isDarkMode ? 'bg-[#09090B] border-r border-white/5' : 'bg-white border-r border-gray-200'}
              ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Header */}
        <header className={`h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 border-b ${isDarkMode ? 'border-white/5 bg-[#09090B]' : 'border-gray-200 bg-white'}`}>

          {/* Left: hamburger (mobile) */}
          <div className="flex items-center gap-3">
            {isMobile && (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/super-admin')}>
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-[0_0_10px_rgba(124,58,237,0.5)]">P</div>
                <span className="font-bold text-sm tracking-tight text-white">PGX Gateway</span>
              </div>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Status chip — hide on small mobile */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isDarkMode ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-green-100 text-green-700 border border-green-200'}`}>
              <CheckCircle2 className="w-3 h-3" />
              <span className="hidden md:inline">All Systems Operational</span>
              <span className="md:hidden">Online</span>
            </div>

            <div className={`hidden sm:block w-px h-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`p-2 rounded-lg transition-colors relative ${isDarkMode ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>

              {isNotificationOpen && (
                <div className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-xl shadow-2xl border ${isDarkMode ? 'bg-[#13131A] border-white/10' : 'bg-white border-gray-200'} z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
                  <div className={`p-4 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'} flex justify-between items-center`}>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                    <span className="text-xs bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-bold">1 New</span>
                  </div>
                  <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
                    <div className={`p-4 border-b ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50'} cursor-pointer transition-colors`} onClick={() => { setIsNotificationOpen(false); navigate('/super-admin/notifications'); }}>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 flex items-center justify-center shrink-0">
                          <Bell className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>System Update</p>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Platform maintenance scheduled for tonight at 2 AM EST.</p>
                          <p className="text-[10px] mt-2 font-medium text-[#7C3AED]">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 border-b ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50'} cursor-pointer transition-colors`}>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>New Merchant KYC</p>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Global Trade Inc submitted KYC docs for review.</p>
                          <p className="text-[10px] mt-2 font-medium text-orange-500">10 mins ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 text-center ${isDarkMode ? 'bg-black/20 hover:bg-black/40' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-colors`} onClick={() => { setIsNotificationOpen(false); navigate('/super-admin/notifications'); }}>
                    <span className="text-sm font-bold text-[#7C3AED]">View All Notifications</span>
                  </div>
                </div>
              )}
            </div>

            <div className={`w-px h-6 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'} hidden sm:block`}></div>

            {/* Profile */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0 ${isDarkMode ? '' : 'shadow-sm'}`}>
                SA
              </div>
              
              {/* Mobile Menu Toggle (Right Side) */}
              {isMobile && (
                <button
                  onClick={() => setIsMobileOpen(true)}
                  className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              <div className="hidden lg:block">
                <div className={`text-sm font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Super Admin</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 relative">
          <Outlet />
        </main>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}; }
      `}</style>
    </div>
  );
};

export default SuperAdminLayout;
