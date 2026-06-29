import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CreditCard, Wallet, 
  Cpu, Repeat, ArrowRightLeft, DollarSign,
  ShieldCheck, AlertTriangle, ShieldAlert, Bell,
  HelpCircle, BarChart3, Settings, ChevronRight
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { id: 'merchants', label: 'Merchants', icon: Users },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
  { id: 'wallets', label: 'Wallets', icon: Wallet },
  { id: 'processors', label: 'Processors', icon: Cpu },
  { id: 'subscriptions', label: 'Subscriptions', icon: Repeat },
  { id: 'settlements', label: 'Settlements', icon: CreditCard },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'kyc', label: 'KYC', icon: ShieldCheck },
  { id: 'risk', label: 'Risk', icon: AlertTriangle },
  { id: 'fraud', label: 'Fraud', icon: ShieldAlert },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'support', label: 'Support', icon: HelpCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const SuperAdminSidebar = () => {
  return (
    <aside className="w-[260px] h-screen bg-[#09090B] border-r border-white/10 flex flex-col flex-shrink-0 sticky top-0 overflow-y-auto scrollbar-hide">
      <div className="p-6 pb-4 border-b border-white/5 sticky top-0 bg-[#09090B] z-10">
        <Link to="/" className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
            <span className="text-white font-black text-sm">SA</span>
          </div>
          <span className="text-white font-bold tracking-tight text-lg">PGX Master</span>
        </Link>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-10">
          Super Admin Console
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          let linkTarget = '#';
          if (item.id === 'dashboard') linkTarget = '/super-admin';
          else if (item.id === 'transactions') linkTarget = '/super-admin/transactions';
          else if (item.id === 'processors') linkTarget = '/super-admin/processors';
          else if (item.id === 'subscriptions') linkTarget = '/super-admin/subscriptions';
          
          const isActive = window.location.pathname === linkTarget;
          
          return (
            <Link
              key={item.id}
              to={linkTarget}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                isActive 
                  ? 'bg-red-500/10 text-red-500 font-medium' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span>{item.label}</span>
              </div>
              {!isActive && (
                <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/5 bg-black/20 mt-auto">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center border-2 border-white/10 shrink-0">
             <span className="text-white font-bold text-xs">SA</span>
           </div>
           <div className="flex-1 min-w-0">
             <div className="text-sm font-bold text-white truncate">System Admin</div>
             <div className="text-xs text-gray-500 truncate">admin@pgxgateway.com</div>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
