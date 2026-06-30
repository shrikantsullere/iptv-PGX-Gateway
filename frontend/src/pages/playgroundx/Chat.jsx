import { useState, useRef, useEffect } from 'react';
import { Hash, Search, Plus, Image as ImageIcon, Smile, Settings, Mic, Headphones, Send, Volume2, Users, X } from 'lucide-react';

const CHANNELS = [
  { id: 'general', name: 'general', type: 'text', unread: 0 },
  { id: 'sports-betting', name: 'sports-betting', type: 'text', unread: 3 },
  { id: 'crypto-talk', name: 'crypto-talk', type: 'text', unread: 1 },
  { id: 'iptv-streams', name: 'iptv-streams', type: 'text', unread: 0 },
];

const VOICE_CHANNELS = [
  { id: 'lounge1', name: 'Lounge 1', members: ['AlexTheGreat', 'SarahConnor'] },
  { id: 'watch-party', name: 'Match Watch Party', members: ['CryptoKing'] },
];

const INITIAL_MESSAGES = {
  general: [
    { id: 1, user: 'JohnDoe99', avatar: 'https://i.pravatar.cc/40?u=12', time: '10:42 AM', text: 'Anyone watching the UFC fights tonight? I have a private lobby setup if anyone wants to join. 🔥' },
    { id: 2, user: 'SarahConnor', avatar: 'https://i.pravatar.cc/40?u=2', time: '10:45 AM', text: 'Send me the invite link! I was just about to create one.' },
    { id: 3, user: 'AlexTheGreat', avatar: 'https://i.pravatar.cc/40?u=1', time: '10:48 AM', text: 'Champions League tonight is gonna be insane. Already set up my 4-screen lobby 🏆' },
    { id: 4, user: 'MessiFan99', avatar: 'https://i.pravatar.cc/40?u=4', time: '11:02 AM', text: 'Who else thinks Real Madrid takes it tonight? Their form has been incredible.' },
    { id: 5, user: 'CryptoKing', avatar: 'https://i.pravatar.cc/40?u=9', time: '11:15 AM', text: 'Stream quality on Sky Sports 4K is perfect rn. Zero lag 🎯' },
  ],
  'sports-betting': [
    { id: 1, user: 'AlexTheGreat', avatar: 'https://i.pravatar.cc/40?u=1', time: '09:30 AM', text: 'Man City odds looking good at 1.85 for tonight.' },
    { id: 2, user: 'GamerX', avatar: 'https://i.pravatar.cc/40?u=5', time: '09:45 AM', text: 'I always go with the underdog. More exciting!' },
    { id: 3, user: 'JohnDoe99', avatar: 'https://i.pravatar.cc/40?u=12', time: '10:00 AM', text: 'DYOR always. Never bet what you can\'t lose.' },
  ],
  'crypto-talk': [
    { id: 1, user: 'CryptoKing', avatar: 'https://i.pravatar.cc/40?u=9', time: '08:00 AM', text: 'BTC looking bullish this week. Breaking key resistance at 72k.' },
    { id: 2, user: 'MessiFan99', avatar: 'https://i.pravatar.cc/40?u=4', time: '08:30 AM', text: 'USDC deposits on PGX working perfectly. Instant settlement!' },
  ],
  'iptv-streams': [
    { id: 1, user: 'SarahConnor', avatar: 'https://i.pravatar.cc/40?u=2', time: '07:00 AM', text: 'Sky Sports 4K stream is up for the Champions League final tonight 🔴' },
    { id: 2, user: 'AlexTheGreat', avatar: 'https://i.pravatar.cc/40?u=1', time: '07:15 AM', text: 'Added it to Lobby 1 already. Come join!' },
  ],
};

const EMOJIS = ['🔥', '🏆', '⚽', '🎯', '👏', '😂', '🙌', '💪', '🚀', '❤️', '😎', '🎉'];
const ME = { user: 'You', avatar: 'https://i.pravatar.cc/40?u=99' };

export default function Chat() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [headphonesOn, setHeadphonesOn] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [channels, setChannels] = useState(CHANNELS);
  
  // Add Channel Modal State
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), { id: Date.now(), ...ME, time, text }],
    }));
    setInput('');
    setShowEmoji(false);
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      const id = newChannelName.trim();
      setChannels(prev => [...prev, { id, name: id, type: 'text', unread: 0 }]);
      setMessages(prev => ({ ...prev, [id]: [] }));
      setShowAddChannel(false);
      setNewChannelName('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const addEmoji = (emoji) => { setInput(prev => prev + emoji); };

  const markRead = (chId) => {
    setChannels(prev => prev.map(c => c.id === chId ? { ...c, unread: 0 } : c));
  };

  const currentMessages = (messages[activeChannel] || []).filter(m =>
    search ? m.text.toLowerCase().includes(search.toLowerCase()) || m.user.toLowerCase().includes(search.toLowerCase()) : true
  );

  const SidebarContent = () => (
    <>
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
        <h3 className="font-black text-white">PGX Community</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          {isMobileSidebarOpen && (
            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white lg:hidden">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-5 custom-scrollbar">
        {/* Text Channels */}
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase flex items-center justify-between mb-1 px-1">
            Text Channels
            <button onClick={() => setShowAddChannel(true)} className="hover:text-white transition-colors cursor-pointer">
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-0.5">
            {channels.map(ch => (
              <button
                key={ch.id}
                onClick={() => { setActiveChannel(ch.id); markRead(ch.id); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group transition-colors ${
                  activeChannel === ch.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium truncate">{ch.name}</span>
                </div>
                {ch.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Channels */}
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase flex items-center justify-between mb-1 px-1">
            Voice Channels <Plus className="w-3 h-3 hover:text-white cursor-pointer" />
          </div>
          <div className="space-y-1">
            {VOICE_CHANNELS.map(vc => (
              <div key={vc.id} className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer group text-gray-400 hover:text-white transition-colors">
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{vc.name}</span>
                </div>
                {vc.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 pl-7 py-0.5 text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs font-medium">{m}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="h-16 bg-[#050508] border-t border-white/5 p-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img src={ME.avatar} className="w-8 h-8 rounded-full" alt="Me" />
          <div>
            <div className="text-sm font-bold text-white leading-tight">CryptoKing</div>
            <div className="text-[10px] text-green-400 leading-tight">Online</div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setMicOn(p => !p)}
            className={`p-1.5 rounded-md transition-colors ${micOn ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-red-400 bg-red-500/10'}`}
            title={micOn ? 'Mute' : 'Unmute'}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => setHeadphonesOn(p => !p)}
            className={`p-1.5 rounded-md transition-colors ${headphonesOn ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-red-400 bg-red-500/10'}`}
            title={headphonesOn ? 'Deafen' : 'Undeafen'}
          >
            <Headphones className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-[calc(100vh-8rem)] bg-[#13131A] rounded-3xl border border-white/5 flex overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500 relative">

      {/* Mobile backdrop */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-60 bg-[#09090B] border-r border-white/5 flex-col shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed left-0 top-0 h-full w-60 bg-[#09090B] border-r border-white/5 flex flex-col z-40 transition-transform duration-300 lg:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-white/5 shadow-sm shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors">
              <Hash className="w-5 h-5" />
            </button>
            <Hash className="w-5 h-5 text-gray-400 hidden sm:block" />
            <h3 className="font-bold text-white text-sm sm:text-base">{activeChannel}</h3>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 border-l border-white/10 pl-3 ml-1">
              <Users className="w-3 h-3" />
              <span>{(messages[activeChannel] || []).length > 0 ? '128 online' : '0 online'}</span>
            </div>
          </div>
          <div className="relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="w-28 sm:w-48 bg-[#09090B] border border-white/10 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white focus:w-36 sm:focus:w-64 transition-all outline-none focus:border-[#7C3AED]"
            />
            <Search className="w-3 h-3 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          <div className="flex justify-center">
            <span className="text-xs font-bold text-gray-500 bg-black/50 px-3 py-1 rounded-full border border-white/5">Today</span>
          </div>

          {currentMessages.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              <Hash className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">{search ? 'No messages match your search.' : 'Be the first to say something!'}</p>
            </div>
          )}

          {currentMessages.map((msg, i) => {
            const isMe = msg.user === 'You';
            return (
              <div key={msg.id || i} className={`flex gap-3 sm:gap-4 group ${isMe ? 'flex-row-reverse' : ''}`}>
                <img
                  src={msg.avatar}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer hover:scale-105 transition-transform shrink-0"
                  alt={msg.user}
                />
                <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`flex items-baseline gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <span className={`font-bold text-sm ${isMe ? 'text-[#7C3AED]' : 'text-white'}`}>{msg.user}</span>
                    <span className="text-xs text-gray-600">{msg.time}</span>
                  </div>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? 'bg-[#7C3AED] text-white rounded-tr-sm'
                      : 'bg-black/40 text-gray-300 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 pt-0 shrink-0">
          {showEmoji && (
            <div className="mb-2 bg-[#09090B] border border-white/10 rounded-xl p-3 flex flex-wrap gap-2">
              {EMOJIS.map(emoji => (
                <button key={emoji} onClick={() => addEmoji(emoji)} className="text-xl hover:scale-125 transition-transform active:scale-95">
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <div className="bg-[#2B2D31] rounded-xl p-2 flex items-center gap-2">
            <button
              onClick={() => setShowEmoji(p => !p)}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors shrink-0 ${showEmoji ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'}`}
            >
              <Smile className="w-5 h-5" />
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder={`Message #${activeChannel}`}
              className="flex-1 bg-transparent text-white outline-none text-sm min-w-0"
            />
            <div className="flex items-center gap-1 text-gray-500 shrink-0">
              <button className="p-2 hover:text-white transition-colors hidden sm:block"><ImageIcon className="w-5 h-5" /></button>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2 hover:text-white transition-colors disabled:opacity-30 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] disabled:bg-transparent disabled:text-gray-500 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 mt-1 px-1">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
      
      {/* Create Channel Modal */}
      {showAddChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Hash className="w-5 h-5 text-[#7C3AED]" /> Create Channel
              </h3>
              <button onClick={() => { setShowAddChannel(false); setNewChannelName(''); }} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Channel Name</label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    value={newChannelName}
                    onChange={e => setNewChannelName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="e.g. highlights"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && newChannelName.trim()) {
                         handleCreateChannel();
                      }
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-600 mt-2">Spaces will automatically be converted to hyphens.</p>
              </div>
              <button
                onClick={handleCreateChannel}
                disabled={!newChannelName.trim()}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              >
                Create Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
