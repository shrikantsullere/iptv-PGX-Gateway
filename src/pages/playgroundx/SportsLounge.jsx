import { ChevronRight, Play, Plus, Star } from 'lucide-react';

const SportsLounge = () => {
  const categories = [
    {
      name: 'Trending Football',
      matches: [
        { title: 'Manchester City vs Arsenal', status: 'Live', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
        { title: 'PSG vs Bayern Munich', status: 'Live', img: 'https://images.unsplash.com/photo-1551280857-2b9bbe52cc4e?auto=format&fit=crop&q=80&w=600' },
        { title: 'Inter Milan vs Juventus', status: 'Starts in 2h', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600' },
        { title: 'Boca Juniors vs River Plate', status: 'Tomorrow', img: 'https://images.unsplash.com/photo-1431324155629-1a6d0a11f4d1?auto=format&fit=crop&q=80&w=600' },
      ]
    },
    {
      name: 'UFC & Boxing',
      matches: [
        { title: 'UFC 300: Main Card', status: 'Live', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=600' },
        { title: 'Fury vs Usyk', status: 'Live', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=600' },
        { title: 'UFC Fight Night', status: 'Upcoming', img: 'https://images.unsplash.com/photo-1515121061221-7d6ce2dcaa9f?auto=format&fit=crop&q=80&w=600' },
      ]
    },
    {
      name: 'NBA Highlights',
      matches: [
        { title: 'Lakers vs Nuggets', status: 'Live', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
        { title: 'Celtics vs Heat', status: 'Q3', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600' },
        { title: 'Suns vs Mavericks', status: 'Final', img: 'https://images.unsplash.com/photo-1519861531473-9200260768bf?auto=format&fit=crop&q=80&w=600' },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-10 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Dynamic Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Sports Lounge</h1>
        <p className="text-gray-400 text-lg">Your personalized hub for live sports and massive watch parties.</p>
      </div>

      {categories.map((cat, i) => (
        <div key={i} className="space-y-4">
          <h2 className="text-2xl font-black text-white px-2">{cat.name}</h2>
          
          {/* Horizontal Scroll Row */}
          <div className="flex gap-4 overflow-x-auto pb-6 px-2 custom-scrollbar snap-x">
            {cat.matches.map((match, j) => (
              <div key={j} className="min-w-[280px] md:min-w-[340px] snap-center group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                <div className="aspect-[16/10] relative">
                  <img src={match.img} alt={match.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                     {match.status === 'Live' ? (
                       <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded animate-pulse">Live</span>
                     ) : (
                       <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">{match.status}</span>
                     )}
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 transform translate-x-4 group-hover:translate-x-0 duration-300">
                    <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-colors">
                      <Star className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-colors">
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <h3 className="text-lg font-black text-white leading-tight mb-2">{match.title}</h3>
                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                       <button className="bg-white text-black hover:bg-gray-200 px-4 py-1.5 rounded-full font-black text-xs transition-colors flex items-center gap-1">
                         <Play className="w-3 h-3 fill-black" /> Watch
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportsLounge;
