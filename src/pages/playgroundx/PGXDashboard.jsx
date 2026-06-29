import { Play, Plus, TrendingUp, Trophy, Star, ChevronRight } from 'lucide-react';

const PGXDashboard = () => {
  const trendingMatches = [
    { title: 'Real Madrid vs Barcelona', sport: 'Football • El Clasico', viewers: '1.2M', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=800' },
    { title: 'Lakers vs Warriors', sport: 'NBA Playoffs', viewers: '850K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800' },
    { title: 'UFC 300: Main Event', sport: 'MMA • Live', viewers: '2.1M', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Massive Hero Banner */}
      <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero" 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-10 left-10 max-w-xl">
          <div className="flex items-center gap-2 mb-3">
             <span className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-2 py-1 rounded">Live Now</span>
             <span className="text-gray-300 text-sm font-bold flex items-center gap-1"><UsersIcon /> 2.4M Watching</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">Champions League Final 2026</h1>
          <p className="text-gray-300 text-lg mb-8 line-clamp-2 font-medium">Experience the ultimate showdown. Join the massive watch party lobby or stream in crystal clear 4K UHD.</p>
          
          <div className="flex items-center gap-4">
            <button className="bg-white text-black hover:bg-gray-200 px-8 py-3.5 rounded-full font-black text-sm transition-all flex items-center gap-2 hover:scale-105">
              <Play className="w-5 h-5 fill-black" /> Watch Stream
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-black text-sm backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105">
              <Plus className="w-5 h-5" /> Join Lobby
            </button>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#7C3AED]" /> Trending Now</h2>
          <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {trendingMatches.map((match, i) => (
             <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-video relative">
                  <img src={match.img} alt={match.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                     <span className="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">Live</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                     <div className="text-xs text-[#7C3AED] font-bold mb-1">{match.sport}</div>
                     <h3 className="text-lg font-black text-white mb-2 leading-tight">{match.title}</h3>
                     <div className="flex items-center text-xs text-gray-400 font-bold gap-1">
                        <UsersIcon /> {match.viewers} Viewers
                     </div>
                  </div>
                  
                  {/* Hover Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                     <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                       <Play className="w-8 h-8 text-white fill-white ml-1" />
                     </div>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default PGXDashboard;
