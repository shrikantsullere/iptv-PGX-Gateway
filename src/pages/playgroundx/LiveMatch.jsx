import { Play } from 'lucide-react';

const LiveMatch = () => {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Video Player */}
        <div className="flex-1 space-y-4">
           <div className="aspect-video bg-black rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] group border border-white/10">
              <img src="https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=1200" alt="Live Match" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                 <button className="w-20 h-20 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white fill-white ml-2" />
                 </button>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                 <span className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded">Live</span>
                 <span className="bg-black/60 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded border border-white/10">4K UHD</span>
              </div>
           </div>

           <div>
              <h1 className="text-3xl font-black text-white">Manchester City vs Arsenal</h1>
              <p className="text-[#7C3AED] font-bold mt-1">Premier League • Week 32</p>
           </div>
        </div>

        {/* Live Chat / Stats Sidebar */}
        <div className="w-full lg:w-96 bg-[#13131A] rounded-3xl border border-white/5 flex flex-col shadow-xl h-[600px] lg:h-auto">
           <div className="p-4 border-b border-white/5 flex gap-4">
              <button className="flex-1 bg-white/10 text-white py-2 rounded-lg font-bold text-sm">Live Chat</button>
              <button className="flex-1 bg-transparent text-gray-500 hover:text-white py-2 rounded-lg font-bold text-sm transition-colors">Stats</button>
           </div>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {/* Chat Messages */}
              <div className="flex gap-3">
                 <img src="https://i.pravatar.cc/150?u=12" className="w-8 h-8 rounded-full" alt="User" />
                 <div>
                   <span className="font-bold text-white text-sm">JohnDoe99</span> <span className="text-[#7C3AED] text-xs font-bold bg-[#7C3AED]/10 px-1 rounded">PRO</span>
                   <p className="text-gray-300 text-sm">What a goal! ⚽🔥</p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <img src="https://i.pravatar.cc/150?u=13" className="w-8 h-8 rounded-full" alt="User" />
                 <div>
                   <span className="font-bold text-white text-sm">CryptoFan</span>
                   <p className="text-gray-300 text-sm">Haaland is inevitable.</p>
                 </div>
              </div>
           </div>

           <div className="p-4 border-t border-white/5">
              <input type="text" placeholder="Send a message..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] outline-none text-sm" />
           </div>
        </div>
      </div>
      
    </div>
  );
};

export default LiveMatch;
