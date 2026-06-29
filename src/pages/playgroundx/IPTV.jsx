import { Play, Settings2, Maximize, Volume2, Star, Signal } from 'lucide-react';

const IPTV = () => {
  const channels = [
    { name: 'Sky Sports Main Event', category: 'Sports', quality: '4K UHD', viewers: '45K', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
    { name: 'ESPN HD', category: 'Sports', quality: '1080p', viewers: '32K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
    { name: 'DAZN 1', category: 'Boxing', quality: '4K UHD', viewers: '89K', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=600' },
    { name: 'BeIN Sports', category: 'Football', quality: '1080p', viewers: '21K', img: 'https://images.unsplash.com/photo-1551280857-2b9bbe52cc4e?auto=format&fit=crop&q=80&w=600' },
    { name: 'TNT Sports 1', category: 'UFC', quality: '1080p', viewers: '15K', img: 'https://images.unsplash.com/photo-1515121061221-7d6ce2dcaa9f?auto=format&fit=crop&q=80&w=600' },
    { name: 'Sky Sports F1', category: 'Racing', quality: '4K UHD', viewers: '67K', img: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">IPTV Network</h1>
          <p className="text-gray-400 text-sm mt-1">Premium 4K ultra-low latency streaming grid.</p>
        </div>
        
        <div className="flex gap-2">
           <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors">Categories</button>
           <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors">Favorites</button>
           <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center gap-2">
             <Settings2 className="w-4 h-4" /> Filter
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((ch, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/5 shadow-xl">
             <div className="aspect-video relative overflow-hidden">
               <img src={ch.img} alt={ch.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
               
               {/* Controls overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Central Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white ml-1" />
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Signal className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold text-green-500">{ch.viewers}</span>
                    </div>
                    <div className="flex gap-2 text-white">
                      <button className="hover:text-[#7C3AED] transition-colors"><Volume2 className="w-4 h-4" /></button>
                      <button className="hover:text-[#7C3AED] transition-colors"><Maximize className="w-4 h-4" /></button>
                    </div>
                  </div>
               </div>
               
               {/* Always visible tags */}
               <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                 <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Live</span>
                 <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-white/10">{ch.quality}</span>
               </div>
             </div>
             <div className="p-4 relative z-10 bg-[#13131A]">
                <h3 className="font-black text-white text-lg truncate">{ch.name}</h3>
                <p className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider mt-1">{ch.category}</p>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default IPTV;
