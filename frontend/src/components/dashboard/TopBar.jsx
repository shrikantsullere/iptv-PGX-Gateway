import { Menu, Bell, Globe, HelpCircle } from 'lucide-react';

const TopBar = ({ 
  merchantName = "PlayGroundX", 
  merchantId = "PGX-001",
  avatarInitials = "PGX",
  showGlobe = true,
  notificationCount = 5
}) => {
  return (
    <header className="h-[72px] bg-[#09090B] border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-400">
          <button className="relative hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#09090B]">
                {notificationCount}
              </span>
            )}
          </button>
          {showGlobe ? (
            <button className="hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </button>
          ) : (
            <button className="hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{merchantName}</div>
            <div className="text-[10px] text-gray-500">Merchant ID: {merchantId}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
            {avatarInitials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
