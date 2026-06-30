import { useState, useEffect } from 'react';
import { Play, Settings2, Maximize, Volume2, Star, Signal, GripVertical, Plus, X, Lock, Globe, Users, Tv2, ChevronRight, Check } from 'lucide-react';

const ALL_CHANNELS = [
  { id: 'c1', name: 'Sky Sports Main Event', category: 'Sports', quality: '4K UHD', viewers: '45K', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
  { id: 'c2', name: 'ESPN HD', category: 'Sports', quality: '1080p', viewers: '32K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
  { id: 'c3', name: 'DAZN 1', category: 'Boxing', quality: '4K UHD', viewers: '89K', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=600' },
  { id: 'c4', name: 'BeIN Sports', category: 'Football', quality: '1080p', viewers: '21K', img: 'https://images.unsplash.com/photo-1551280857-2b9bbe52cc4e?auto=format&fit=crop&q=80&w=600' },
  { id: 'c5', name: 'TNT Sports 1', category: 'UFC', quality: '1080p', viewers: '15K', img: 'https://images.unsplash.com/photo-1515121061221-7d6ce2dcaa9f?auto=format&fit=crop&q=80&w=600' },
  { id: 'c6', name: 'Sky Sports F1', category: 'Racing', quality: '4K UHD', viewers: '67K', img: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?auto=format&fit=crop&q=80&w=600' },
  { id: 'c7', name: 'NBA TV', category: 'Basketball', quality: '1080p', viewers: '42K', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
  { id: 'c8', name: 'NFL Network', category: 'Football', quality: '4K UHD', viewers: '91K', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
  { id: 'c9', name: 'Cricket Live HD', category: 'Cricket', quality: '1080p', viewers: '28K', img: 'https://images.unsplash.com/photo-1540747913346-19212a4b423a?auto=format&fit=crop&q=80&w=600' },
  { id: 'c10', name: 'Eurosport 1', category: 'Multi-Sport', quality: '1080p', viewers: '19K', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600' },
  { id: 'c11', name: 'WWE Network', category: 'Wrestling', quality: '4K UHD', viewers: '55K', img: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&q=80&w=600' },
  { id: 'c12', name: 'Golf Channel', category: 'Golf', quality: '1080p', viewers: '12K', img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600' },
];

const INITIAL_LOBBIES = [
  { id: 0, name: 'Lobby 1', type: 'public', channels: [ALL_CHANNELS[0], ALL_CHANNELS[1], ALL_CHANNELS[2], ALL_CHANNELS[3], ALL_CHANNELS[4]] },
  { id: 1, name: 'Lobby 2', type: 'public', channels: [ALL_CHANNELS[5], ALL_CHANNELS[6], ALL_CHANNELS[7]] },
];

// Distribute channels into pages of 4
const getPages = (channels) => {
  const pages = [];
  for (let i = 0; i < channels.length; i += 4) {
    pages.push(channels.slice(i, i + 4));
  }
  if (pages.length === 0) pages.push([]);
  return pages;
};

export default function IPTV() {
  const [lobbies, setLobbies] = useState(INITIAL_LOBBIES);
  const [activeLobby, setActiveLobby] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Modals
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [showNewLobby, setShowNewLobby] = useState(false);
  const [newLobbyName, setNewLobbyName] = useState('');
  const [newLobbyType, setNewLobbyType] = useState('public');
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Reset page when switching lobby
  useEffect(() => { setActivePage(0); }, [activeLobby]);

  const currentLobby = lobbies[activeLobby];
  const pages = getPages(currentLobby.channels);
  const currentPage = pages[activePage] || [];
  const totalPages = pages.length;

  // Drag & drop within current page
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.4';
  };
  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const pageOffset = activePage * 4;
    const newLobbies = lobbies.map((l, li) => {
      if (li !== activeLobby) return l;
      const chs = [...l.channels];
      const from = pageOffset + draggedIndex;
      const to = pageOffset + targetIndex;
      const temp = chs[from];
      chs[from] = chs[to];
      chs[to] = temp;
      return { ...l, channels: chs };
    });
    setLobbies(newLobbies);
  };

  // Add channel to current lobby
  const addChannel = () => {
    if (!selectedChannel) return;
    if (currentLobby.channels.find(c => c.id === selectedChannel.id)) {
      setShowAddChannel(false);
      setSelectedChannel(null);
      return;
    }
    setLobbies(prev => prev.map((l, i) =>
      i === activeLobby ? { ...l, channels: [...l.channels, selectedChannel] } : l
    ));
    setShowAddChannel(false);
    setSelectedChannel(null);
    // Jump to last page
    const newTotal = currentLobby.channels.length + 1;
    setActivePage(Math.floor((newTotal - 1) / 4));
  };

  // Remove channel from lobby
  const removeChannel = (chId) => {
    setLobbies(prev => prev.map((l, i) =>
      i === activeLobby ? { ...l, channels: l.channels.filter(c => c.id !== chId) } : l
    ));
  };

  // Create new lobby
  const createLobby = () => {
    if (!newLobbyName.trim()) return;
    const newId = lobbies.length;
    setLobbies(prev => [...prev, { id: newId, name: newLobbyName.trim(), type: newLobbyType, channels: [] }]);
    setActiveLobby(lobbies.length);
    setNewLobbyName('');
    setShowNewLobby(false);
  };

  const availableChannels = ALL_CHANNELS.filter(c => !currentLobby.channels.find(x => x.id === c.id));

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Tv2 className="w-7 h-7 text-[#7C3AED]" /> IPTV Network
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {currentLobby.channels.length} screens · {totalPages} page{totalPages > 1 ? 's' : ''} · Drag to rearrange
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowAddChannel(true)}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Screen
          </button>
          <button
            onClick={() => setShowNewLobby(true)}
            className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Lobby
          </button>
        </div>
      </div>

      {/* Lobby Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {lobbies.map((lobby, index) => (
          <button
            key={lobby.id}
            onClick={() => setActiveLobby(index)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0
              ${activeLobby === index
                ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                : 'bg-[#13131A] text-gray-400 hover:text-white border border-white/5'
              }`}
          >
            {lobby.type === 'private' ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
            {lobby.name}
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeLobby === index ? 'bg-white/20' : 'bg-white/10'}`}>
              {lobby.channels.length}
            </span>
          </button>
        ))}
      </div>

      {/* Page Navigation (only when > 1 page) */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-bold mr-2">SCREENS PAGE:</span>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`w-8 h-8 rounded-lg text-xs font-black transition-all
                ${activePage === i
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]'
                  : 'bg-[#13131A] text-gray-400 border border-white/10 hover:text-white'
                }`}
            >
              {i + 1}
            </button>
          ))}
          <span className="text-xs text-gray-600 ml-2 font-medium">
            Screens {activePage * 4 + 1}–{Math.min((activePage + 1) * 4, currentLobby.channels.length)} of {currentLobby.channels.length}
          </span>
        </div>
      )}

      {/* Video Grid (2×2 per page) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ minHeight: '420px' }}>
        {currentPage.map((ch, i) => (
          <div
            key={ch.id}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, i)}
            className="group relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/5 shadow-xl aspect-video cursor-grab active:cursor-grabbing"
          >
            <img src={ch.img} alt={ch.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 absolute inset-0" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />

            {/* Hover Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

              {/* Top: drag handle + remove */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-xs font-bold truncate max-w-[120px]">{ch.name}</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-yellow-500/30 hover:text-yellow-400 transition-colors text-white">
                    <Star className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeChannel(ch.id)}
                    className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-red-500/30 hover:text-red-400 transition-colors text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Play */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.6)] transform scale-90 group-hover:scale-100 transition-transform pointer-events-auto">
                  <Play className="w-5 h-5 text-white fill-white ml-1" />
                </button>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-lg">
                    <Signal className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs font-bold text-green-400">{ch.viewers}</span>
                  </div>
                  <div className="bg-black/50 px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-bold text-gray-300">{ch.quality}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 text-white">
                  <button className="w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:text-[#7C3AED] transition-colors"><Volume2 className="w-3.5 h-3.5" /></button>
                  <button className="w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:text-[#7C3AED] transition-colors"><Maximize className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>

            {/* Badge always visible */}
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 opacity-70 group-hover:opacity-0 transition-opacity">
              <span className="text-white text-[10px] font-bold truncate max-w-[100px] block">{ch.name}</span>
            </div>
          </div>
        ))}

        {/* Empty slots to fill 2×2 grid (only on last page if < 4 channels) */}
        {activePage === totalPages - 1 && Array.from({ length: Math.max(0, 4 - currentPage.length) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            onClick={() => setShowAddChannel(true)}
            className="rounded-2xl border-2 border-dashed border-white/10 bg-[#13131A]/50 flex flex-col items-center justify-center aspect-video text-gray-500 hover:text-white hover:border-[#7C3AED] transition-all cursor-pointer group"
          >
            <Plus className="w-8 h-8 mb-2 opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity">Add Screen</span>
          </div>
        ))}

        {/* Empty state when lobby has no channels */}
        {currentLobby.channels.length === 0 && (
          <div className="col-span-2 rounded-2xl border-2 border-dashed border-white/10 bg-[#13131A]/50 flex flex-col items-center justify-center py-20 text-gray-500">
            <Tv2 className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm font-bold opacity-50">No screens in this lobby yet</p>
            <button onClick={() => setShowAddChannel(true)} className="mt-4 bg-[#7C3AED] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#6D28D9] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <Plus className="w-4 h-4" /> Add First Screen
            </button>
          </div>
        )}
      </div>

      {/* Add Channel Modal */}
      {showAddChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl shrink-0">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#7C3AED]" /> Add Screen to {currentLobby.name}
              </h3>
              <button onClick={() => { setShowAddChannel(false); setSelectedChannel(null); }} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {availableChannels.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Tv2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">All channels already added.</p>
                </div>
              ) : availableChannels.map(ch => (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannel(selectedChannel?.id === ch.id ? null : ch)}
                  className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all
                    ${selectedChannel?.id === ch.id
                      ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5'
                    }`}
                >
                  <img src={ch.img} alt={ch.name} className="w-14 h-10 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm truncate">{ch.name}</div>
                    <div className="text-xs text-gray-400 font-medium">{ch.category} · {ch.quality}</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-green-400 font-bold">
                      <Signal className="w-3 h-3" /> {ch.viewers}
                    </div>
                    {selectedChannel?.id === ch.id && (
                      <div className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5 shrink-0">
              <button
                onClick={addChannel}
                disabled={!selectedChannel}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add {selectedChannel ? `"${selectedChannel.name}"` : 'Channel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Lobby Modal */}
      {showNewLobby && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#7C3AED]" /> Create Lobby
              </h3>
              <button onClick={() => setShowNewLobby(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Lobby Name</label>
                <input
                  value={newLobbyName}
                  onChange={e => setNewLobbyName(e.target.value)}
                  placeholder="e.g. Sports Night Lobby"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm"
                  onKeyDown={e => e.key === 'Enter' && createLobby()}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Lobby Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewLobbyType('public')}
                    className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-2
                      ${newLobbyType === 'public' ? 'border-[#7C3AED] bg-[#7C3AED]/20 text-[#7C3AED]' : 'border-white/10 text-gray-400 hover:border-white/20'}`}
                  >
                    <Globe className="w-5 h-5" /> Public
                  </button>
                  <button
                    onClick={() => setNewLobbyType('private')}
                    className={`p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-2
                      ${newLobbyType === 'private' ? 'border-purple-500 bg-purple-500/20 text-purple-400' : 'border-white/10 text-gray-400 hover:border-white/20'}`}
                  >
                    <Lock className="w-5 h-5" /> Private
                  </button>
                </div>
                {newLobbyType === 'private' && (
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Invite-only — you can share via Friends page
                  </p>
                )}
              </div>
              <button
                onClick={createLobby}
                disabled={!newLobbyName.trim()}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              >
                Create Lobby
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
