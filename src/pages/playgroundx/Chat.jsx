import { useState } from 'react';
import { Hash, Search, Plus, Image as ImageIcon, Smile, Gift, Settings, Hash as HashIcon, Mic, Headphones, Monitor } from 'lucide-react';

const Chat = () => {
  return (
    <div className="h-[calc(100vh-8rem)] bg-[#13131A] rounded-3xl border border-white/5 flex overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      
      {/* Channels Sidebar */}
      <div className="w-64 bg-[#09090B] border-r border-white/5 flex flex-col">
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
          <h3 className="font-black text-white">PGX Community</h3>
          <Settings className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
          
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase flex items-center justify-between mb-1 px-1">
              Text Channels <Plus className="w-3 h-3 hover:text-white cursor-pointer" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/10 rounded-md cursor-pointer group">
                <HashIcon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                <span className="text-sm font-bold text-white">general</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer group">
                <HashIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300">sports-betting</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer group">
                <HashIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300">crypto-talk</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-gray-500 uppercase flex items-center justify-between mb-1 px-1">
              Voice Channels <Plus className="w-3 h-3 hover:text-white cursor-pointer" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer group">
                <VolumeIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Lounge 1</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer group">
                <VolumeIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Match Watch Party</span>
              </div>
            </div>
          </div>

        </div>

        {/* User Controls */}
        <div className="h-16 bg-[#050508] border-t border-white/5 p-2 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <img src="https://i.pravatar.cc/150?u=9" className="w-8 h-8 rounded-full" alt="Me" />
             <div className="flex flex-col">
               <span className="text-sm font-bold text-white leading-tight">CryptoKing</span>
               <span className="text-[10px] text-gray-400 leading-tight">#9921</span>
             </div>
           </div>
           <div className="flex gap-1">
             <button className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white"><Mic className="w-4 h-4" /></button>
             <button className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white"><Headphones className="w-4 h-4" /></button>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#13131A]">
        
        {/* Chat Header */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/5 shadow-sm">
          <div className="flex items-center gap-2">
             <HashIcon className="w-5 h-5 text-gray-400" />
             <h3 className="font-bold text-white">general</h3>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
               <input type="text" placeholder="Search" className="w-48 bg-[#09090B] border border-white/10 rounded-md px-3 py-1 text-sm text-white focus:w-64 transition-all outline-none focus:border-[#7C3AED]" />
               <Search className="w-3 h-3 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
             </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
           
           <div className="flex justify-center">
             <span className="text-xs font-bold text-gray-500 bg-black/50 px-3 py-1 rounded-full border border-white/5">Today</span>
           </div>

           <div className="flex gap-4 group">
             <img src="https://i.pravatar.cc/150?u=12" className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition-transform" alt="User" />
             <div>
               <div className="flex items-baseline gap-2">
                 <span className="font-bold text-white cursor-pointer hover:underline text-sm">JohnDoe99</span>
                 <span className="text-xs text-gray-500">Today at 10:42 AM</span>
               </div>
               <p className="text-gray-300 text-sm mt-1">Anyone watching the UFC fights tonight? I have a private lobby setup if anyone wants to join.</p>
             </div>
           </div>

           <div className="flex gap-4 group">
             <img src="https://i.pravatar.cc/150?u=2" className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition-transform" alt="User" />
             <div>
               <div className="flex items-baseline gap-2">
                 <span className="font-bold text-white cursor-pointer hover:underline text-sm">SarahConnor</span>
                 <span className="text-xs text-gray-500">Today at 10:45 AM</span>
               </div>
               <p className="text-gray-300 text-sm mt-1">Send me the invite link! I was just about to create one.</p>
             </div>
           </div>

        </div>

        {/* Chat Input */}
        <div className="p-4 pt-0">
          <div className="bg-[#2B2D31] rounded-lg p-2 flex items-center gap-3">
             <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
               <Plus className="w-5 h-5" />
             </button>
             <input type="text" placeholder="Message #general" className="flex-1 bg-transparent text-white outline-none text-sm" />
             <div className="flex items-center gap-1 text-gray-400">
               <button className="p-2 hover:text-white transition-colors"><Gift className="w-5 h-5" /></button>
               <button className="p-2 hover:text-white transition-colors"><ImageIcon className="w-5 h-5" /></button>
               <button className="p-2 hover:text-white transition-colors"><Smile className="w-5 h-5" /></button>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
};

const VolumeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);

export default Chat;
