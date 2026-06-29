import { useState, useRef } from 'react';
import { Play, Settings2, Maximize, Volume2, Star, Signal, GripVertical, Plus } from 'lucide-react';

export default function IPTV() {
  const [activeLobby, setActiveLobby] = useState(0);
  const [lobbies, setLobbies] = useState([
    {
      id: 0,
      name: 'Lobby 1',
      channels: [
        { id: 'c1', name: 'Sky Sports Main Event', category: 'Sports', quality: '4K UHD', viewers: '45K', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'ESPN HD', category: 'Sports', quality: '1080p', viewers: '32K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'DAZN 1', category: 'Boxing', quality: '4K UHD', viewers: '89K', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'BeIN Sports', category: 'Football', quality: '1080p', viewers: '21K', img: 'https://images.unsplash.com/photo-1551280857-2b9bbe52cc4e?auto=format&fit=crop&q=80&w=600' },
      ]
    },
    {
      id: 1,
      name: 'Lobby 2',
      channels: [
        { id: 'c5', name: 'TNT Sports 1', category: 'UFC', quality: '1080p', viewers: '15K', img: 'https://images.unsplash.com/photo-1515121061221-7d6ce2dcaa9f?auto=format&fit=crop&q=80&w=600' },
        { id: 'c6', name: 'Sky Sports F1', category: 'Racing', quality: '4K UHD', viewers: '67K', img: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?auto=format&fit=crop&q=80&w=600' },
        { id: 'c7', name: 'NBA TV', category: 'Basketball', quality: '1080p', viewers: '42K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
        { id: 'c8', name: 'NFL Network', category: 'Football', quality: '4K UHD', viewers: '91K', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' }
      ]
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetIndex) return;

    const newLobbies = [...lobbies];
    const currentChannels = [...newLobbies[activeLobby].channels];
    
    // Swap items
    const temp = currentChannels[draggedItem];
    currentChannels[draggedItem] = currentChannels[targetIndex];
    currentChannels[targetIndex] = temp;

    newLobbies[activeLobby].channels = currentChannels;
    setLobbies(newLobbies);
  };

  const createNewLobby = () => {
    if (lobbies.length >= 5) return;
    setLobbies([...lobbies, {
      id: lobbies.length,
      name: `Lobby ${lobbies.length + 1}`,
      channels: []
    }]);
    setActiveLobby(lobbies.length);
  };

  const activeChannels = lobbies[activeLobby].channels;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">IPTV Network</h1>
          <p className="text-gray-400 text-sm mt-1">Drag and drop to rearrange your 4-screen layout.</p>
        </div>
        
        <div className="flex gap-2">
           <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors">Categories</button>
           <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors">Favorites</button>
           <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center gap-2">
             <Settings2 className="w-4 h-4" /> Filter
           </button>
        </div>
      </div>

      {/* Lobby Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {lobbies.map((lobby, index) => (
          <button 
            key={lobby.id}
            onClick={() => setActiveLobby(index)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeLobby === index ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-[#13131A] text-gray-400 hover:text-white border border-white/5'}`}
          >
            {lobby.name}
          </button>
        ))}
        {lobbies.length < 5 && (
          <button onClick={createNewLobby} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Lobby
          </button>
        )}
      </div>

      {/* Video Grid (Max 4 screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-250px)]">
        {activeChannels.map((ch, i) => (
          <div 
            key={ch.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, i)}
            className="group relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/5 shadow-xl h-full min-h-[250px] cursor-grab active:cursor-grabbing"
          >
             <div className="absolute inset-0 relative overflow-hidden h-full w-full">
               <img src={ch.img} alt={ch.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
               
               {/* Controls overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  
                  {/* Drag Handle */}
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 cursor-grab active:cursor-grabbing">
                     <GripVertical className="w-4 h-4 text-gray-400" />
                     <span className="text-white text-xs font-bold">{ch.name}</span>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Central Play */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.6)] transform scale-90 group-hover:scale-100 transition-transform pointer-events-auto">
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
               
             </div>
          </div>
        ))}

        {/* Empty slots if less than 4 */}
        {Array.from({ length: Math.max(0, 4 - activeChannels.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="rounded-2xl border-2 border-dashed border-white/10 bg-[#13131A]/50 flex flex-col items-center justify-center h-full min-h-[250px] text-gray-500 hover:text-white hover:border-[#7C3AED] transition-all cursor-pointer">
             <Plus className="w-8 h-8 mb-2 opacity-50" />
             <span className="text-sm font-bold opacity-50">Add Channel</span>
          </div>
        ))}

      </div>
    </div>
  );
}
