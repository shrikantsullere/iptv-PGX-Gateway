import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { Plus, Settings, Users, Copy, GripHorizontal, Maximize2, Play } from 'lucide-react';

const Lobbies = () => {
  // Simulate an admin adding screens. Let's start with 6 screens to show auto-pagination.
  const allScreens = [
    { id: '1', name: 'Main Event TV', category: 'UFC', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Sky Sports 1', category: 'Football', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'ESPN HD', category: 'Basketball', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400' },
    { id: '4', name: 'DAZN Live', category: 'Boxing', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=400' },
    { id: '5', name: 'BeIN Sports', category: 'Tennis', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400' },
    { id: '6', name: 'TNT Sports', category: 'Racing', img: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?auto=format&fit=crop&q=80&w=400' },
  ];

  // Logic: Max 4 screens per lobby. Calculate total lobbies.
  const SCREENS_PER_LOBBY = 4;
  const totalLobbies = Math.ceil(allScreens.length / SCREENS_PER_LOBBY);
  
  const [activeLobbyIndex, setActiveLobbyIndex] = useState(0);
  
  // State for the screens currently visible in the active lobby. This allows Reorder to work.
  const [currentLobbyScreens, setCurrentLobbyScreens] = useState([]);

  useEffect(() => {
    const start = activeLobbyIndex * SCREENS_PER_LOBBY;
    const end = start + SCREENS_PER_LOBBY;
    setCurrentLobbyScreens(allScreens.slice(start, end));
  }, [activeLobbyIndex]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-6xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131A] p-6 rounded-2xl border border-white/5 shadow-xl">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Watch Party Lobbies</h1>
          <p className="text-gray-400 text-sm mt-1">Drag and drop screens to arrange your multi-view. Max 4 screens per lobby.</p>
        </div>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-colors flex items-center gap-2 hover:scale-105">
          <Plus className="w-4 h-4" /> Create Private Lobby
        </button>
      </div>

      {/* Lobby Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-4 overflow-x-auto custom-scrollbar">
        {Array.from({ length: totalLobbies }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveLobbyIndex(idx)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
              activeLobbyIndex === idx 
                ? 'bg-white text-black shadow-lg scale-105' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            Lobby {idx + 1}
          </button>
        ))}
      </div>

      {/* 2x2 Grid via Framer Motion Reorder */}
      <div className="bg-[#09090B] p-4 rounded-3xl border border-white/5 shadow-2xl relative">
         
         <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="bg-black/50 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] text-white p-2 rounded-lg backdrop-blur-md transition-colors"><Settings className="w-4 h-4" /></button>
            <button className="bg-black/50 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] text-white p-2 rounded-lg backdrop-blur-md transition-colors flex items-center gap-2 px-3 text-xs font-bold">
              <Users className="w-4 h-4" /> Invite Friends
            </button>
         </div>

         {/* 2x2 Layout Wrapper */}
         <div className="pt-14">
            <Reorder.Group 
              axis="y" // Reorder group handles overall layout, we use flex wrap for grid
              values={currentLobbyScreens} 
              onReorder={setCurrentLobbyScreens}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh] md:h-[70vh]"
            >
              {currentLobbyScreens.map((screen) => (
                <Reorder.Item 
                  key={screen.id} 
                  value={screen} 
                  className="relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/5 group cursor-grab active:cursor-grabbing shadow-lg"
                  whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: '0 0 40px rgba(124,58,237,0.5)' }}
                >
                  <img src={screen.img} alt={screen.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Drag Handle Indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 p-4 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                    <GripHorizontal className="w-8 h-8 text-white" />
                  </div>

                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg">Live</div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer z-10"><Maximize2 className="w-4 h-4" /></div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12 pointer-events-none">
                     <h3 className="font-black text-white text-lg">{screen.name}</h3>
                     <p className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">{screen.category}</p>
                  </div>
                </Reorder.Item>
              ))}
              
              {/* Empty state if lobby has less than 4 screens */}
              {Array.from({ length: Math.max(0, SCREENS_PER_LOBBY - currentLobbyScreens.length) }).map((_, idx) => (
                <div key={`empty-${idx}`} className="rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 bg-[#13131A]/30">
                   <Plus className="w-8 h-8 mb-2 opacity-50" />
                   <span className="text-sm font-bold opacity-50">Empty Slot</span>
                </div>
              ))}
            </Reorder.Group>
         </div>

      </div>

    </div>
  );
};

export default Lobbies;
