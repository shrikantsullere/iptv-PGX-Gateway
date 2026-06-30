import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Star, Filter, ChevronRight, Users } from 'lucide-react';

const categories = [
  {
    name: 'Trending Football',
    matches: [
      { title: 'Manchester City vs Arsenal', sport: 'Premier League', status: 'Live', viewers: '1.2M', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
      { title: 'PSG vs Bayern Munich', sport: 'Champions League', status: 'Live', viewers: '980K', img: 'https://images.unsplash.com/photo-1551280857-2b9bbe52cc4e?auto=format&fit=crop&q=80&w=600' },
      { title: 'Inter Milan vs Juventus', sport: 'Serie A', status: 'Starts in 2h', viewers: '450K', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600' },
      { title: 'Boca Juniors vs River Plate', sport: 'Copa Libertadores', status: 'Tomorrow', viewers: '720K', img: 'https://images.unsplash.com/photo-1431324155629-1a6d0a11f4d1?auto=format&fit=crop&q=80&w=600' },
    ]
  },
  {
    name: 'UFC & Boxing',
    matches: [
      { title: 'UFC 300: Main Card', sport: 'MMA', status: 'Live', viewers: '2.1M', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=600' },
      { title: 'Fury vs Usyk 2', sport: 'Heavyweight Boxing', status: 'Live', viewers: '1.8M', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=600' },
      { title: 'UFC Fight Night', sport: 'MMA Prelims', status: 'Upcoming', viewers: '340K', img: 'https://images.unsplash.com/photo-1515121061221-7d6ce2dcaa9f?auto=format&fit=crop&q=80&w=600' },
    ]
  },
  {
    name: 'NBA Highlights',
    matches: [
      { title: 'Lakers vs Nuggets', sport: 'NBA Playoffs', status: 'Live', viewers: '850K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
      { title: 'Celtics vs Heat', sport: 'NBA — Q3', status: 'Q3 — 78:71', viewers: '620K', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600' },
      { title: 'Suns vs Mavericks', sport: 'NBA — Final', status: 'Final', viewers: '390K', img: 'https://images.unsplash.com/photo-1519861531473-9200260768bf?auto=format&fit=crop&q=80&w=600' },
    ]
  }
];

export default function SportsLounge() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Football', 'UFC & Boxing', 'NBA', 'Live Only'];

  const toggleFavorite = (e, title) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  return (
    <div className="space-y-10 pb-10 animate-in fade-in zoom-in-95 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Sports Lounge</h1>
          <p className="text-gray-400 text-sm mt-1">Your personalized hub for live sports and massive watch parties.</p>
        </div>
        <button
          onClick={() => navigate('/playgroundx/lobbies')}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Watch Party
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        <Filter className="w-4 h-4 text-gray-500 shrink-0" />
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              activeFilter === f
                ? 'bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]'
                : 'bg-[#13131A] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Category Rows */}
      {categories.map((cat, i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl sm:text-2xl font-black text-white">{cat.name}</h2>
            <button
              onClick={() => navigate('/playgroundx/live')}
              className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 px-1 custom-scrollbar snap-x">
            {cat.matches.map((match, j) => (
              <div
                key={j}
                onClick={() => navigate('/playgroundx/live')}
                className="min-w-[260px] sm:min-w-[320px] snap-center group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative">
                  <img src={match.img} alt={match.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    {match.status === 'Live' ? (
                      <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded animate-pulse">Live</span>
                    ) : (
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">{match.status}</span>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(e, match.title)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
                      favorites.includes(match.title)
                        ? 'bg-yellow-500/30 border-yellow-500/50 text-yellow-400'
                        : 'bg-black/50 border-white/10 text-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${favorites.includes(match.title) ? 'fill-yellow-400' : ''}`} />
                  </button>

                  {/* Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-[#7C3AED] font-bold mb-1">{match.sport}</div>
                    <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-tight">{match.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-400 font-bold gap-1">
                        <Users className="w-3 h-3" /> {match.viewers}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate('/playgroundx/live'); }}
                          className="bg-white text-black hover:bg-gray-200 px-3 py-1.5 rounded-full font-black text-xs transition-colors flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-black" /> Watch
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Center play on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add to Lobby card */}
            <div
              onClick={() => navigate('/playgroundx/lobbies')}
              className="min-w-[180px] snap-center rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all group"
            >
              <Plus className="w-8 h-8 text-gray-600 group-hover:text-[#7C3AED] transition-colors mb-2" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-[#7C3AED] transition-colors">Add to Lobby</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
