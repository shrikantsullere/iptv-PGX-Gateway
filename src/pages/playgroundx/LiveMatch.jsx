import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Maximize, Share2, Star, Plus, Send, Users, BarChart2, ChevronRight } from 'lucide-react';

const LIVE_MATCHES = [
  { title: 'Man City vs Arsenal', league: 'Premier League • Week 32', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=1200', score: '2 - 1', time: "67'", team1: 'MCI', team2: 'ARS' },
  { title: 'Lakers vs Warriors', league: 'NBA Playoffs • Game 5', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200', score: '98 - 91', time: "Q3", team1: 'LAL', team2: 'GSW' },
  { title: 'UFC 300: Main Card', league: 'MMA • Main Event', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=1200', score: 'RD 2', time: '2:34', team1: 'Fighter A', team2: 'Fighter B' },
];

const INITIAL_CHAT = [
  { id: 1, user: 'JohnDoe99', avatar: 'https://i.pravatar.cc/40?u=12', text: 'What a goal! ⚽🔥', pro: true },
  { id: 2, user: 'CryptoFan', avatar: 'https://i.pravatar.cc/40?u=13', text: 'Haaland is inevitable.' },
  { id: 3, user: 'SarahConnor', avatar: 'https://i.pravatar.cc/40?u=2', text: 'City dominating this half 💪' },
  { id: 4, user: 'AlexTheGreat', avatar: 'https://i.pravatar.cc/40?u=1', text: 'Arsenal needs to wake up!' },
  { id: 5, user: 'MessiFan99', avatar: 'https://i.pravatar.cc/40?u=4', text: 'Come on Arsenal! 🔴', pro: true },
];

const STATS = [
  { label: 'Possession', v1: '62%', v2: '38%', p1: 62, p2: 38 },
  { label: 'Shots', v1: '14', v2: '7', p1: 67, p2: 33 },
  { label: 'Shots on Target', v1: '6', v2: '2', p1: 75, p2: 25 },
  { label: 'Passes', v1: '412', v2: '249', p1: 62, p2: 38 },
  { label: 'Corners', v1: '7', v2: '3', p1: 70, p2: 30 },
  { label: 'Fouls', v1: '8', v2: '12', p1: 40, p2: 60 },
];

export default function LiveMatch() {
  const navigate = useNavigate();
  const [activeMatch, setActiveMatch] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // chat | stats
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const chatBottomRef = useRef(null);

  const match = LIVE_MATCHES[activeMatch];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages(prev => [...prev, {
      id: Date.now(), user: 'You', avatar: 'https://i.pravatar.cc/40?u=99', text
    }]);
    setChatInput('');
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-6">

      {/* Match Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {LIVE_MATCHES.map((m, i) => (
          <button
            key={i}
            onClick={() => setActiveMatch(i)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-2 ${
              activeMatch === i ? 'bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'bg-[#13131A] text-gray-400 border border-white/5 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {m.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

        {/* Video Player */}
        <div className="flex-1 space-y-4">
          <div className="aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] group border border-white/10">
            <img
              src={match.img}
              alt={match.title}
              className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'opacity-80' : 'opacity-40'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Center Play/Pause */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(p => !p)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:scale-110 active:scale-95 transition-transform ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
              >
                {isPlaying ? <Pause className="w-7 h-7 sm:w-10 sm:h-10 text-white fill-white" /> : <Play className="w-7 h-7 sm:w-10 sm:h-10 text-white fill-white ml-1 sm:ml-2" />}
              </button>
            </div>

            {/* Top badges */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
              <span className="bg-red-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-2 sm:px-3 py-1 rounded animate-pulse">Live</span>
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded border border-white/10">4K UHD</span>
            </div>

            {/* Score overlay */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-center">
              <div className="text-white font-black text-base sm:text-xl tracking-wider">{match.score}</div>
              <div className="text-[10px] text-red-400 font-bold">{match.time}</div>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={() => setIsMuted(p => !p)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors">
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
                </button>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={() => setIsFav(p => !p)} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors ${isFav ? 'bg-yellow-500/30 border-yellow-500/50' : 'bg-black/60 border-white/10 hover:bg-white/20'}`}>
                  <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                </button>
                <button onClick={() => navigate('/playgroundx/lobbies')} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#7C3AED] transition-colors">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </button>
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </button>
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{match.title}</h1>
              <p className="text-[#7C3AED] font-bold mt-1 text-sm">{match.league}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/playgroundx/lobbies')}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> Join Watch Party
              </button>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-[#13131A] rounded-2xl sm:rounded-3xl border border-white/5 flex flex-col shadow-xl" style={{ height: 'clamp(400px, 60vh, 600px)' }}>
          {/* Tabs */}
          <div className="p-3 border-b border-white/5 flex gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'chat' ? 'bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'stats' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <BarChart2 className="w-4 h-4" /> Stats
            </button>
          </div>

          {activeTab === 'chat' ? (
            <>
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div key={msg.id || i} className="flex gap-3">
                    <img src={msg.avatar} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0" alt={msg.user} />
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`font-bold text-xs sm:text-sm ${msg.user === 'You' ? 'text-[#7C3AED]' : 'text-white'}`}>{msg.user}</span>
                        {msg.pro && <span className="text-[#7C3AED] text-[9px] font-bold bg-[#7C3AED]/10 px-1 py-0.5 rounded">PRO</span>}
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>
              <div className="p-3 sm:p-4 border-t border-white/5 shrink-0">
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendChat()}
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm min-w-0"
                  />
                  <button
                    onClick={sendChat}
                    disabled={!chatInput.trim()}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all active:scale-95 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
              {/* Scoreboard */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 text-center">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-black text-white text-lg">{match.team1}</div>
                  <div className="text-center">
                    <div className="font-black text-white text-2xl">{match.score}</div>
                    <div className="text-xs text-red-400 font-bold">{match.time}</div>
                  </div>
                  <div className="font-black text-white text-lg">{match.team2}</div>
                </div>
              </div>

              {/* Stats bars */}
              <div className="space-y-4">
                {STATS.map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-300 mb-1.5">
                      <span>{stat.v1}</span>
                      <span className="text-gray-500">{stat.label}</span>
                      <span>{stat.v2}</span>
                    </div>
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#7C3AED] rounded-full transition-all duration-500" style={{ width: `${stat.p1}%` }} />
                      <div className="bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${stat.p2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
