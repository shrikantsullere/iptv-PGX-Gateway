import { Link } from 'react-router-dom';
import { 
  Home, List, ArrowDownToLine, ArrowUpFromLine, Wallet, 
  Users, BarChart3, Code, Webhook, FileText, Palette, Box,
  Settings, HelpCircle, ChevronDown, Headset
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
  { id: 'transactions', label: 'Transactions', icon: List },
  { id: 'deposits', label: 'Deposits', icon: ArrowDownToLine },
  { id: 'withdrawals', label: 'Withdrawals', icon: ArrowUpFromLine },
  { id: 'wallets', label: 'Wallets', icon: Wallet },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'api', label: 'API', icon: Code },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'billing', label: 'Billing', icon: FileText },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'whitelabel', label: 'White Label', icon: Box },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

const Sidebar = ({ role = "MERCHANT" }) => {
  return (
    <aside className="w-[260px] h-screen bg-[#0C0C11] border-r border-white/5 flex flex-col flex-shrink-0 sticky top-0 overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div className="p-6 pb-2">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="text-xl font-bold tracking-tighter flex items-center">
            <span className="text-primary font-black">PGX</span>
            <span className="text-white font-medium ml-1">GATEWAY</span>
          </div>
        </Link>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
          {role}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 pb-6">
        {menuItems.map((item) => {
          let linkTarget = '#';
          if (item.id === 'dashboard') linkTarget = '/merchant-dashboard';
          else if (item.id === 'wallets') linkTarget = '/wallets';
          else linkTarget = `/merchant/${item.id}`;
          
          const isActive = window.location.pathname === linkTarget;
          
          return (
            <Link
              key={item.id}
              to={linkTarget}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-primary/20 text-white font-medium' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-primary' : ''}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-[#13131A] rounded-xl p-5 border border-white/5 relative overflow-hidden">
          <div className="text-lg font-bold tracking-tighter flex items-center opacity-30 mb-4">
            <span className="text-primary font-black">PGX</span>
            <span className="text-white font-medium ml-1">GATEWAY</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h5 className="text-white font-bold text-sm mb-1">Need Help?</h5>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Our support team is here 24/7 to help you.
              </p>
              <button className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
            <Headset className="w-8 h-8 text-primary/50 shrink-0" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
