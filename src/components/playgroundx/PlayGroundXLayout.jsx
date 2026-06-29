import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Home, Trophy, Tv2, Radio, LayoutGrid, Users, MessageSquare, 
  Wallet, Receipt, Bell, UserCircle, Settings, HelpCircle,
  Search, LogOut, ChevronLeft, ChevronRight, Gamepad2, CircleDot, UserPlus
} from 'lucide-react';

const PlayGroundXLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/playgroundx' },
    { name: 'Sports Lounge', icon: Trophy, path: '/playgroundx/sports' },
    { name: 'IPTV', icon: Tv2, path: '/playgroundx/iptv' },
    { name: 'Live Matches', icon: Radio, path: '/playgroundx/live' },
    { name: 'Lobbies', icon: LayoutGrid, path: '/playgroundx/lobbies' },
    { name: 'Friends', icon: Users, path: '/playgroundx/friends' },
    { name: 'Chat', icon: MessageSquare, path: '/playgroundx/chat' },
    { name: 'Wallet', icon: Wallet, path: '/playgroundx/wallet' },
    { name: 'Transactions', icon: Receipt, path: '/playgroundx/transactions' },
    { name: 'Notifications', icon: Bell, path: '/playgroundx/notifications' },
    { name: 'Profile', icon: UserCircle, path: '/playgroundx/profile' },
    { name: 'Settings', icon: Settings, path: '/playgroundx/settings' },
    { name: 'Support', icon: HelpCircle, path: '/playgroundx/support' },
  ];

  const onlineFriends = [
    { name: 'AlexTheGreat', game: 'Watching Manchester Derby', avatar: 'https://i.pravatar.cc/150?u=1' },
    { name: 'SarahConnor', game: 'In UFC 300 Lobby', avatar: 'https://i.pravatar.cc/150?u=2' },
    { name: 'CryptoKing', game: 'Idle', avatar: 'https://i.pravatar.cc/150?u=3' },
    { name: 'MessiFan99', game: 'Watching IPTV', avatar: 'https://i.pravatar.cc/150?u=4' },
  ];

  return (
    <div className="h-screen overflow-hidden flex bg-[#050508] text-white font-sans">
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Left Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isSidebarOpen ? 'w-56' : 'w-20'} flex-shrink-0 bg-[#09090B] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)]
        `}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center ${isSidebarOpen ? 'justify-between px-6' : 'justify-center'} border-b border-white/5`}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/playgroundx')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-all">P</div>
              <span className="font-bold text-lg tracking-tight text-white">PGX Gateway</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] cursor-pointer" onClick={() => navigate('/playgroundx')}>P</div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {menuItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === '/playgroundx'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? `text-white bg-white/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]` 
                    : `text-gray-400 hover:text-white hover:bg-white/5`
                  }
                `}
                title={!isSidebarOpen ? item.name : ''}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#7C3AED] rounded-r-full shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>}
                    <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#7C3AED]' : 'group-hover:text-white'} ${isSidebarOpen ? '' : 'mx-auto'}`} />
                    {isSidebarOpen && <span className={`font-bold text-sm whitespace-nowrap ${isActive ? 'text-white' : ''}`}>{item.name}</span>}
                  </>
                )}
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

        {/* Sidebar Toggle (Desktop Only) */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full items-center justify-center shadow-lg bg-[#13131A] border border-white/10 text-gray-400 hover:text-white transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        >
          {isSidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#050508] relative">
        
        {/* Top Header */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 bg-gradient-to-b from-[#09090B] to-[#050508] border-b border-white/5 md:border-transparent sticky top-0 z-30">
          
          <div className="flex items-center gap-4 w-full max-w-xl">
             {/* Mobile Logo Title */}
             <div className="md:hidden flex items-center gap-2">
               <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center font-black text-white text-xs shadow-[0_0_10px_rgba(124,58,237,0.5)]">P</div>
               <span className="font-bold text-base tracking-tight text-white">PGX Gateway</span>
             </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wallet Balance Pill */}
            <div onClick={() => navigate('/playgroundx/wallet')} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#7C3AED]/50 transition-colors cursor-pointer hover:scale-105 active:scale-95">
               <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#7C3AED] to-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                 <Wallet className="w-3 h-3 text-white" />
               </div>
               <span className="text-sm font-black text-white px-1">452.00 PGX</span>
            </div>
            
            {/* Notifications Dropdown */}
            <div className="relative">
              <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative border border-white/5 text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#09090B]"></span>
              </button>
              
              {isNotificationOpen && (
                <div className="absolute top-12 right-0 w-80 bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <button onClick={() => setIsNotificationOpen(false)} className="text-xs text-[#7C3AED] hover:text-white font-bold transition-colors">Mark all as read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                     <div onClick={() => { setIsNotificationOpen(false); navigate('/playgroundx/lobbies'); }} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-sm font-bold text-white mb-1">AlexTheGreat invited you</div>
                        <div className="text-xs text-gray-400">Join the UFC 300 Private Watch Party!</div>
                        <div className="text-[10px] text-gray-500 mt-2">2 mins ago</div>
                     </div>
                     <div onClick={() => { setIsNotificationOpen(false); navigate('/playgroundx/wallet'); }} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-sm font-bold text-white mb-1">Deposit Successful</div>
                        <div className="text-xs text-gray-400">150.00 PGX has been added to your wallet.</div>
                        <div className="text-[10px] text-gray-500 mt-2">1 hour ago</div>
                     </div>
                  </div>
                  <div onClick={() => { setIsNotificationOpen(false); navigate('/playgroundx/notifications'); }} className="p-3 text-center border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer rounded-b-2xl">
                     <span className="text-xs font-bold text-[#7C3AED]">View all notifications →</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div onClick={() => navigate('/playgroundx/profile')} className="flex items-center gap-2 cursor-pointer group" title="My Profile">
              <img src="https://i.pravatar.cc/150?u=9" className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-[#7C3AED] transition-colors hover:scale-110 active:scale-95" alt="Profile" />
            </div>

             {/* Mobile Menu Toggle (Right Side) */}
             <button 
               className="md:hidden p-2 -mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <LayoutGrid className="w-6 h-6" />
             </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative custom-scrollbar">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          
          <Outlet />
        </main>

      </div>

      {/* Right Activity Panel (Friends) */}
      <aside className="hidden xl:flex w-64 flex-shrink-0 bg-[#09090B] border-l border-white/5 flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-20">
         <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
           <h3 className="font-bold text-white tracking-tight">Active Friends</h3>
           <button onClick={() => navigate('/playgroundx/friends')} className="text-gray-400 hover:text-[#7C3AED] transition-colors" title="Add Friend"><UserPlus className="w-4 h-4" /></button>
         </div>
         <div className="p-4 border-b border-white/5">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input type="text" placeholder="Add friend by username..." className="w-full bg-[#13131A] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#7C3AED]" />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Online — {onlineFriends.length}</div>
            {onlineFriends.map((friend, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                <div className="relative">
                  <img src={friend.avatar} className="w-10 h-10 rounded-full" alt={friend.name} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#09090B]"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate group-hover:text-[#7C3AED] transition-colors">{friend.name}</div>
                  <div className="text-xs text-gray-500 truncate flex items-center gap-1">
                    {friend.game !== 'Idle' ? <CircleDot className="w-2 h-2 text-red-500 animate-pulse" /> : null}
                    {friend.game}
                  </div>
                </div>
                <button onClick={() => navigate('/playgroundx/lobbies')} className="opacity-0 group-hover:opacity-100 p-1.5 bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white rounded-lg transition-all" title="Invite to Lobby">
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>
            ))}
         </div>
      </aside>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default PlayGroundXLayout;
