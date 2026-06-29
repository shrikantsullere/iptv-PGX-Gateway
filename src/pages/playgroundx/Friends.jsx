import { Search, UserPlus, MoreVertical, MessageSquare } from 'lucide-react';

const Friends = () => {
  const friendsList = [
    { name: 'AlexTheGreat', status: 'Online', game: 'Watching Manchester Derby', avatar: 'https://i.pravatar.cc/150?u=1' },
    { name: 'SarahConnor', status: 'Online', game: 'In UFC 300 Lobby', avatar: 'https://i.pravatar.cc/150?u=2' },
    { name: 'MessiFan99', status: 'Online', game: 'Watching IPTV', avatar: 'https://i.pravatar.cc/150?u=4' },
    { name: 'GamerX', status: 'Offline', game: 'Last seen 2h ago', avatar: 'https://i.pravatar.cc/150?u=5' },
    { name: 'CryptoWhale', status: 'Offline', game: 'Last seen 1 day ago', avatar: 'https://i.pravatar.cc/150?u=6' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#13131A] p-6 rounded-2xl border border-white/5 shadow-xl">
        <div className="flex items-center gap-4">
           <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors">All Friends</button>
           <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Pending</button>
           <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Blocked</button>
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.4)]">
          <UserPlus className="w-4 h-4" /> Add Friend
        </button>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col overflow-hidden">
         <div className="p-4 border-b border-white/5">
           <div className="relative">
             <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
             <input type="text" placeholder="Search friends..." className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#7C3AED] outline-none transition-colors" />
           </div>
         </div>
         
         <div className="divide-y divide-white/5">
            <div className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-black/20">Online — 3</div>
            {friendsList.filter(f => f.status === 'Online').map((friend, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer">
                 <div className="flex items-center gap-4">
                   <div className="relative">
                     <img src={friend.avatar} className="w-12 h-12 rounded-full" alt={friend.name} />
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#13131A]"></div>
                   </div>
                   <div>
                     <div className="font-bold text-white text-base group-hover:text-[#7C3AED] transition-colors">{friend.name}</div>
                     <div className="text-xs text-gray-400">{friend.game}</div>
                   </div>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors shadow-sm border border-white/5">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors shadow-sm border border-white/5">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}

            <div className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-black/20 mt-2">Offline — 2</div>
            {friendsList.filter(f => f.status === 'Offline').map((friend, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer opacity-70 hover:opacity-100">
                 <div className="flex items-center gap-4">
                   <div className="relative">
                     <img src={friend.avatar} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all" alt={friend.name} />
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-gray-500 border-2 border-[#13131A]"></div>
                   </div>
                   <div>
                     <div className="font-bold text-gray-300 text-base">{friend.name}</div>
                     <div className="text-xs text-gray-500">{friend.game}</div>
                   </div>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors shadow-sm border border-white/5">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default Friends;
