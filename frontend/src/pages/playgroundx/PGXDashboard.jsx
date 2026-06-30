import { useNavigate } from 'react-router-dom';
import { Play, Plus, TrendingUp, ChevronRight, Tv2, Users } from 'lucide-react';

const trendingMatches = [
  { id: 1, title: 'Real Madrid vs Barcelona', sport: 'Football • El Clasico', viewers: '1.2M', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Lakers vs Warriors', sport: 'NBA Playoffs', viewers: '850K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'UFC 300: Main Event', sport: 'MMA • Live', viewers: '2.1M', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800' },
];

const PGXDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700 pb-8">

      {/* Hero Banner */}
      <div className="relative w-full rounded-[24px] overflow-hidden group" style={{ height: 'clamp(280px, 40vw, 420px)' }}>
        <img
          src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=2000"
          alt="Hero"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-auto max-w-xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-2 py-1 rounded animate-pulse">Live Now</span>
            <span className="text-gray-300 text-sm font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> 2.4M Watching
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight tracking-tight">
            Champions League Final 2026
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8 font-medium line-clamp-2">
            Experience the ultimate showdown. Join the massive watch party lobby or stream in crystal clear 4K UHD.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/playgroundx/live')}
              className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-black text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-xl"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black" /> Watch Stream
            </button>
            <button
              onClick={() => navigate('/playgroundx/lobbies')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-black text-sm backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Join Lobby
            </button>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#7C3AED]" /> Trending Now
          </h2>
          <button
            onClick={() => navigate('/playgroundx/sports')}
            className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {trendingMatches.map((match, i) => (
            <div
              key={i}
              onClick={() => navigate('/playgroundx/live')}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <img src={match.img} alt={match.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">Live</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-[#7C3AED] font-bold mb-1">{match.sport}</div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-tight">{match.title}</h3>
                  <div className="flex items-center text-xs text-gray-400 font-bold gap-1">
                    <Users className="w-3 h-3" /> {match.viewers} Viewers
                  </div>
                </div>

                {/* Hover Play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'IPTV Channels', icon: Tv2, color: 'from-purple-600 to-blue-600', path: '/playgroundx/iptv' },
          { label: 'My Lobbies', icon: Users, color: 'from-pink-600 to-purple-600', path: '/playgroundx/lobbies' },
          { label: 'Live Sports', icon: Play, color: 'from-green-600 to-teal-600', path: '/playgroundx/sports' },
          { label: 'Friends', icon: Users, color: 'from-orange-600 to-red-600', path: '/playgroundx/friends' },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className={`bg-gradient-to-br ${item.color} p-4 sm:p-5 rounded-2xl text-white font-black text-sm text-left hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl flex flex-col gap-3`}
          >
            <item.icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-80" />
            <span className="text-xs sm:text-sm leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PGXDashboard;
