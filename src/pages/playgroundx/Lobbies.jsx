import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, Users, GripHorizontal, Maximize2, Play, X, Lock, Globe, CheckCircle2, Loader2, Tv2 } from 'lucide-react';

const ALL_SCREENS = [
  { id: '1', name: 'Main Event TV', category: 'UFC', img: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=600' },
  { id: '2', name: 'Sky Sports 1', category: 'Football', img: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce1546?auto=format&fit=crop&q=80&w=600' },
  { id: '3', name: 'ESPN HD', category: 'Basketball', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600' },
  { id: '4', name: 'DAZN Live', category: 'Boxing', img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=600' },
  { id: '5', name: 'BeIN Sports', category: 'Tennis', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600' },
  { id: '6', name: 'TNT Sports', category: 'Racing', img: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?auto=format&fit=crop&q=80&w=600' },
];

const ONLINE_FRIENDS = ['AlexTheGreat', 'SarahConnor', 'CryptoKing'];

const INITIAL_LOBBIES = [
  { id: 0, name: 'Lobby 1', type: 'public', screens: [ALL_SCREENS[0], ALL_SCREENS[1], ALL_SCREENS[2], ALL_SCREENS[3]] },
  { id: 1, name: 'Lobby 2', type: 'public', screens: [ALL_SCREENS[4], ALL_SCREENS[5]] },
];

export default function Lobbies() {
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState(INITIAL_LOBBIES);
  const [activeLobby, setActiveLobby] = useState(0);
  const [draggedIdx, setDraggedIdx] = useState(null);

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [lobbyName, setLobbyName] = useState('');
  const [lobbyType, setLobbyType] = useState('public');
  const [selectedScreens, setSelectedScreens] = useState([]);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState([]);
  const [inviteSending, setInviteSending] = useState('');
  const [inviteSent, setInviteSent] = useState([]);

  const currentLobby = lobbies[activeLobby];
  const currentScreens = currentLobby?.screens || [];

  // Drag handlers
  const handleDragStart = (e, i) => { setDraggedIdx(i); e.dataTransfer.effectAllowed = 'move'; e.currentTarget.style.opacity = '0.4'; };
  const handleDragEnd = (e) => { e.currentTarget.style.opacity = '1'; setDraggedIdx(null); };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    setLobbies(prev => prev.map((l, li) => {
      if (li !== activeLobby) return l;
      const s = [...l.screens];
      const temp = s[draggedIdx]; s[draggedIdx] = s[targetIdx]; s[targetIdx] = temp;
      return { ...l, screens: s };
    }));
  };

  const toggleScreen = (screen) => {
    setSelectedScreens(prev =>
      prev.find(s => s.id === screen.id) ? prev.filter(s => s.id !== screen.id) : prev.length < 4 ? [...prev, screen] : prev
    );
  };

  const handleCreate = () => {
    if (!lobbyName.trim() || selectedScreens.length === 0) return;
    setCreating(true);
    setTimeout(() => {
      setCreating(false); setCreated(true);
      setTimeout(() => {
        const newId = lobbies.length;
        setLobbies(prev => [...prev, { id: newId, name: lobbyName.trim(), type: lobbyType, screens: selectedScreens }]);
        setActiveLobby(newId);
        setCreated(false); setShowCreate(false); setLobbyName(''); setSelectedScreens([]); setLobbyType('public');
      }, 1500);
    }, 1200);
  };

  const handleInvite = (friend) => {
    setInviteSending(friend);
    setTimeout(() => {
      setInviteSending('');
      setInviteSent(prev => [...prev, friend]);
    }, 900);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131A] p-5 sm:p-6 rounded-2xl border border-white/5 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Watch Party Lobbies</h1>
          <p className="text-gray-400 text-sm mt-1">Drag to rearrange screens. Max 4 screens per lobby.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Private Lobby
        </button>
      </div>

      {/* Lobby Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {lobbies.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => setActiveLobby(idx)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
              activeLobby === idx
                ? 'bg-white text-black shadow-lg scale-105'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {l.type === 'private' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
            {l.name}
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeLobby === idx ? 'bg-black/10' : 'bg-white/10'}`}>{l.screens.length}</span>
          </button>
        ))}
      </div>

      {/* Screen Grid */}
      <div className="bg-[#09090B] p-4 rounded-3xl border border-white/5 shadow-2xl">
        <div className="flex justify-end gap-2 mb-4">
          <button className="bg-black/50 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] text-white p-2 rounded-lg backdrop-blur-md transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowInvite(true)}
            className="bg-black/50 hover:bg-[#7C3AED] border border-white/10 hover:border-[#7C3AED] text-white px-3 py-2 rounded-lg backdrop-blur-md transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <Users className="w-4 h-4" /> Invite Friends
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ minHeight: '380px' }}>
          {currentScreens.map((screen, i) => (
            <div
              key={screen.id}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i)}
              className="relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/5 group cursor-grab active:cursor-grabbing shadow-lg aspect-video"
            >
              <img src={screen.img} alt={screen.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded animate-pulse">Live</div>

              <button
                onClick={() => navigate('/playgroundx/live')}
                className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-colors z-10"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>

              {/* Center hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/10">
                  <GripHorizontal className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Play button on hover */}
              <button
                onClick={() => navigate('/playgroundx/live')}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
              >
                <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.6)] scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10 pointer-events-none">
                <h3 className="font-black text-white text-sm sm:text-base">{screen.name}</h3>
                <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">{screen.category}</p>
              </div>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, 4 - currentScreens.length) }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              onClick={() => setShowCreate(true)}
              className="rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center aspect-video text-gray-500 bg-[#13131A]/30 hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all cursor-pointer group"
            >
              <Plus className="w-8 h-8 mb-2 opacity-40 group-hover:opacity-100 group-hover:text-[#7C3AED] transition-all" />
              <span className="text-sm font-bold opacity-40 group-hover:opacity-100 group-hover:text-[#7C3AED] transition-all">Empty Slot</span>
            </div>
          ))}

          {currentScreens.length === 0 && (
            <div className="col-span-2 flex flex-col items-center justify-center py-16 text-gray-500">
              <Tv2 className="w-12 h-12 mb-3 opacity-20" />
              <p className="font-bold opacity-40">No screens in this lobby</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Lobby Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl sticky top-0">
              <h2 className="text-xl font-black text-white flex items-center gap-2"><Plus className="w-5 h-5 text-[#7C3AED]" /> Create Private Lobby</h2>
              {!creating && !created && <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>

            {created ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-[#7C3AED]/20 rounded-full flex items-center justify-center mb-4 border border-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-[#7C3AED]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Lobby Created!</h4>
                <p className="text-gray-400 text-sm">"{lobbyName}" is now live.</p>
              </div>
            ) : (
              <div className="p-5 space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Lobby Name</label>
                  <input
                    value={lobbyName}
                    onChange={e => setLobbyName(e.target.value)}
                    type="text"
                    placeholder="e.g. UFC 300 Watch Party"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ key: 'public', icon: Globe, label: 'Public' }, { key: 'private', icon: Lock, label: 'Private' }].map(t => (
                      <button key={t.key} onClick={() => setLobbyType(t.key)} className={`p-3 rounded-xl border text-sm font-bold flex flex-col items-center gap-2 transition-all ${lobbyType === t.key ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]' : 'border-white/10 text-gray-400 hover:border-white/20'}`}>
                        <t.icon className="w-5 h-5" /> {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Select Screens (Max 4 — {selectedScreens.length}/4)</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    {ALL_SCREENS.map(s => {
                      const checked = !!selectedScreens.find(x => x.id === s.id);
                      const disabled = !checked && selectedScreens.length >= 4;
                      return (
                        <div
                          key={s.id}
                          onClick={() => !disabled && toggleScreen(s)}
                          className={`flex items-center gap-3 p-2.5 border rounded-xl cursor-pointer transition-all text-sm ${
                            checked ? 'border-[#7C3AED]/60 bg-[#7C3AED]/10 text-white' :
                            disabled ? 'border-white/5 bg-white/[0.02] text-gray-600 cursor-not-allowed' :
                            'border-white/5 bg-white/[0.02] hover:border-white/20 text-gray-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? 'bg-[#7C3AED] border-[#7C3AED]' : 'border-white/20'}`}>
                            {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-bold truncate">{s.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowCreate(false)} className="flex-1 py-3 rounded-xl text-white font-bold hover:bg-white/10 border border-white/10 transition-colors text-sm">Cancel</button>
                  <button
                    onClick={handleCreate}
                    disabled={!lobbyName.trim() || selectedScreens.length === 0}
                    className="flex-1 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Lobby'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invite Friends Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h2 className="text-xl font-black text-white flex items-center gap-2"><Users className="w-5 h-5 text-[#7C3AED]" /> Invite to {currentLobby?.name}</h2>
              <button onClick={() => { setShowInvite(false); setInviteSent([]); }} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-2">
              {ONLINE_FRIENDS.map((friend, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/40?u=${i + 1}`} className="w-8 h-8 rounded-full" alt={friend} />
                    <div>
                      <div className="text-sm font-bold text-white">{friend}</div>
                      <div className="text-xs text-green-400 font-medium">Online</div>
                    </div>
                  </div>
                  {inviteSent.includes(friend) ? (
                    <span className="text-xs font-bold text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Sent</span>
                  ) : (
                    <button
                      onClick={() => handleInvite(friend)}
                      disabled={inviteSending === friend}
                      className="text-xs font-bold bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-60"
                    >
                      {inviteSending === friend ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                      Invite
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5">
              <button onClick={() => { setShowInvite(false); setInviteSent([]); }} className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
