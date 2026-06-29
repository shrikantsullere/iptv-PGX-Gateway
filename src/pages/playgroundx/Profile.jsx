import { useState } from 'react';
import { UserCircle, Edit3, Shield, Trophy, Users, Clock, Star, Tv2, Calendar, Crown, Share2, LogOut, ExternalLink } from 'lucide-react';

const FAV_CHANNELS = [
  { name: 'Main Event TV', category: 'UFC', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=200' },
  { name: 'Sky Sports 1', category: 'Football', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=200' },
  { name: 'ESPN HD', category: 'Basketball', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=200' }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-6xl mx-auto pb-10">
      
      {/* Cover & Profile Header */}
      <div className="bg-[#13131A] rounded-3xl border border-white/5 shadow-xl overflow-hidden group">
         {/* Cover Image */}
         <div className="h-48 sm:h-64 relative w-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000" alt="Cover" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13131A] to-transparent"></div>
            <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-xl text-white hover:bg-white/20 transition-colors border border-white/10 opacity-0 group-hover:opacity-100"><Edit3 className="w-4 h-4" /></button>
         </div>

         {/* Profile Info Row */}
         <div className="px-6 sm:px-10 pb-8 relative">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 sm:-mt-20 mb-6">
               <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#13131A] bg-[#09090B] overflow-hidden relative z-10 shadow-2xl">
                     <img src="https://i.pravatar.cc/300?u=9" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#13131A] z-20" title="Online"></div>
                  <button className="absolute bottom-2 right-12 bg-[#7C3AED] p-2 rounded-full text-white hover:bg-[#6D28D9] transition-colors border-2 border-[#13131A] z-20 shadow-lg" title="Change Avatar"><Edit3 className="w-3.5 h-3.5" /></button>
               </div>
               
               <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-1">
                     <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">CryptoKing</h1>
                     <span className="bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30 text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1"><Shield className="w-3 h-3" /> PRO</span>
                  </div>
                  <p className="text-gray-400 font-medium">@cryptoking_pgx • Joined March 2026</p>
               </div>
               
               <div className="flex gap-3 pb-2 w-full sm:w-auto">
                  <button onClick={() => setIsEditing(!isEditing)} className="flex-1 sm:flex-none px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-colors">
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                  </button>
                  <button className="px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold rounded-xl border border-blue-500/20 transition-colors">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
               Sports enthusiast, UFC fanatic, and Web3 believer. Usually found hosting the best 4K watch parties in Lobby 1. 🚀
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Left Sidebar */}
         <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-[#13131A] rounded-3xl border border-white/5 p-6 shadow-xl">
               <h3 className="font-black text-white text-lg mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-[#7C3AED]" /> Player Stats</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#09090B] p-4 rounded-2xl border border-white/5 flex flex-col gap-1 items-center justify-center text-center">
                     <Users className="w-5 h-5 text-blue-400 mb-1" />
                     <span className="text-2xl font-black text-white">124</span>
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Friends</span>
                  </div>
                  <div className="bg-[#09090B] p-4 rounded-2xl border border-white/5 flex flex-col gap-1 items-center justify-center text-center">
                     <Tv2 className="w-5 h-5 text-pink-400 mb-1" />
                     <span className="text-2xl font-black text-white">45</span>
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Lobbies Hosted</span>
                  </div>
                  <div className="bg-[#09090B] p-4 rounded-2xl border border-white/5 flex flex-col gap-1 items-center justify-center text-center col-span-2">
                     <Clock className="w-5 h-5 text-green-400 mb-1" />
                     <span className="text-2xl font-black text-white">342<span className="text-sm text-gray-500 ml-1">hours</span></span>
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Total Watch Time</span>
                  </div>
               </div>
            </div>

            {/* Subscription Card */}
            <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#09090B] rounded-3xl border border-[#7C3AED]/30 p-6 shadow-[0_0_30px_rgba(124,58,237,0.1)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none"></div>
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <Crown className="w-6 h-6 text-[#7C3AED]" />
                        <h3 className="font-black text-white text-lg">PRO Plan</h3>
                     </div>
                     <span className="bg-[#7C3AED] text-white text-[10px] font-black uppercase px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-4">Enjoying 4K streams, unlimited lobbies, and zero ads.</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-6 bg-white/5 p-2 rounded-lg border border-white/10">
                     <Calendar className="w-4 h-4 text-gray-400" /> Renews on 12 Jul 2026
                  </div>
                  <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 transition-colors text-sm">Manage Subscription</button>
               </div>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* About / Edit Form */}
            {isEditing && (
              <div className="bg-[#13131A] rounded-3xl border border-[#7C3AED]/50 p-6 shadow-xl animate-in fade-in slide-in-from-top-4">
                 <h3 className="font-black text-white text-lg mb-4 flex items-center gap-2"><UserCircle className="w-5 h-5 text-[#7C3AED]" /> Edit Profile</h3>
                 <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Username</label>
                          <input type="text" defaultValue="CryptoKing" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm" />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email (Hidden)</label>
                          <input type="email" defaultValue="crypto@example.com" disabled className="w-full bg-[#09090B]/50 border border-white/5 rounded-xl px-4 py-2.5 text-gray-500 text-sm cursor-not-allowed" />
                       </div>
                    </div>
                    <div>
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Bio</label>
                       <textarea rows="3" defaultValue="Sports enthusiast, UFC fanatic, and Web3 believer. Usually found hosting the best 4K watch parties in Lobby 1. 🚀" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm resize-none"></textarea>
                    </div>
                 </div>
              </div>
            )}

            {/* Favorite Channels */}
            <div className="bg-[#13131A] rounded-3xl border border-white/5 p-6 shadow-xl">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-white text-lg flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Favorite Channels</h3>
                  <button className="text-xs font-bold text-[#7C3AED] hover:text-white transition-colors">Edit List</button>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {FAV_CHANNELS.map((ch, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10">
                       <div className="aspect-video relative">
                          <img src={ch.img} alt={ch.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3">
                             <h4 className="font-black text-white text-sm truncate">{ch.name}</h4>
                             <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">{ch.category}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#13131A] rounded-3xl border border-white/5 p-6 shadow-xl">
               <h3 className="font-black text-white text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-[#7C3AED]" /> Recent Activity</h3>
               <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 text-[#7C3AED] flex items-center justify-center shrink-0 mt-1">
                        <Tv2 className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white font-bold">You</span> hosted a watch party for <span className="text-white font-bold">UFC 300</span> with 12 friends.</p>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center shrink-0 mt-1">
                        <Trophy className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white font-bold">You</span> unlocked the <span className="text-yellow-400 font-bold">Party Host</span> achievement badge!</p>
                        <span className="text-xs text-gray-500">Yesterday</span>
                     </div>
                  </div>
               </div>
            </div>
            
         </div>
      </div>
      
    </div>
  );
}
