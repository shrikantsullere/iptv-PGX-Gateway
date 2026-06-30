import { useState } from 'react';
import { Bell, CheckCircle2, UserPlus, Wallet, Trophy, MessageSquare, Trash2, Settings } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'invite', title: 'Private Lobby Invite', desc: 'AlexTheGreat invited you to join "UFC 300 VIP Watch Party".', time: '2 mins ago', unread: true, icon: UserPlus, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, type: 'wallet', title: 'Deposit Successful', desc: '150.00 PGX has been successfully added to your wallet.', time: '1 hour ago', unread: true, icon: Wallet, color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 3, type: 'system', title: 'System Update', desc: 'PlayGroundX v2.4 is now live. Enjoy faster IPTV streaming and new lobby features.', time: '5 hours ago', unread: false, icon: Bell, color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10' },
  { id: 4, type: 'achievement', title: 'Achievement Unlocked!', desc: 'You earned the "Party Host" badge for creating 5 active lobbies.', time: 'Yesterday', unread: false, icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 5, type: 'message', title: 'New Message', desc: 'SarahConnor mentioned you in #general: "Are we watching the game tonight?"', time: 'Yesterday', unread: false, icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  
  const toggleRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131A] p-6 rounded-3xl border border-white/5 shadow-xl">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
               <Bell className="w-5 h-5 text-white" />
             </div>
             Notifications
             {unreadCount > 0 && <span className="bg-[#7C3AED] text-white text-sm font-black px-2.5 py-0.5 rounded-full">{unreadCount}</span>}
          </h1>
          <p className="text-gray-400 text-sm mt-2">Stay updated with your watch parties, transactions, and platform news.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={markAllRead} disabled={unreadCount === 0} className="flex-1 sm:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10">
             <CheckCircle2 className="w-4 h-4" /> Mark all read
          </button>
          <button className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-colors border border-white/10">
             <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-[#13131A] rounded-3xl border border-white/5 shadow-xl overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-white/5">
            {notifications.map(n => (
              <div key={n.id} className={`p-5 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center relative group ${n.unread ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}`}>
                 
                 {/* Unread Indicator */}
                 {n.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7C3AED]"></div>}
                 
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
                   <n.icon className="w-6 h-6" />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                       <h3 className={`font-bold text-base truncate pr-4 ${n.unread ? 'text-white' : 'text-gray-300'}`}>{n.title}</h3>
                       <span className="text-xs text-gray-500 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 sm:line-clamp-1 pr-12 sm:pr-0">{n.desc}</p>
                 </div>
                 
                 {/* Actions (visible on hover or always on mobile) */}
                 <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity justify-end sm:justify-start mt-2 sm:mt-0">
                    {n.type === 'invite' && n.unread && (
                      <button className="px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-lg transition-colors">Join Lobby</button>
                    )}
                    <button onClick={() => toggleRead(n.id)} className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors" title={n.unread ? 'Mark as read' : 'Mark as unread'}>
                       <CheckCircle2 className={`w-4 h-4 ${n.unread ? 'opacity-50' : 'text-green-500'}`} />
                    </button>
                    <button onClick={() => deleteNotification(n.id)} className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors" title="Delete">
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Bell className="w-10 h-10 text-gray-600" />
             </div>
             <h3 className="text-xl font-black text-white mb-2">You're all caught up!</h3>
             <p className="text-gray-400 max-w-sm">There are no new notifications right now. We'll let you know when something happens.</p>
          </div>
        )}
      </div>

    </div>
  );
}
