import { useState } from 'react';
import { Search, UserPlus, MessageSquare, X, CheckCircle2, Loader2, Tv2, Users, Clock, ChevronRight, UserCheck, UserX } from 'lucide-react';

const LOBBIES = [
  { id: 0, name: 'Lobby 1', type: 'public', screens: 5 },
  { id: 1, name: 'Lobby 2', type: 'public', screens: 3 },
  { id: 2, name: 'My Night Lobby', type: 'private', screens: 2 },
];

const INITIAL_FRIENDS = [
  { id: 1, name: 'AlexTheGreat', status: 'Online', activity: 'Watching Manchester Derby', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'SarahConnor', status: 'Online', activity: 'In UFC 300 Lobby', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'MessiFan99', status: 'Online', activity: 'Watching IPTV', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 4, name: 'GamerX', status: 'Offline', activity: 'Last seen 2h ago', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 5, name: 'CryptoWhale', status: 'Offline', activity: 'Last seen 1 day ago', avatar: 'https://i.pravatar.cc/150?u=6' },
];

const PENDING_REQUESTS = [
  { id: 10, name: 'SportsFanatic', avatar: 'https://i.pravatar.cc/150?u=10', since: '5 mins ago' },
  { id: 11, name: 'GoalMachine', avatar: 'https://i.pravatar.cc/150?u=11', since: '2 hours ago' },
];

export default function Friends() {
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [pending, setPending] = useState(PENDING_REQUESTS);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all | pending | blocked

  // Add Friend modal
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [addFriendInput, setAddFriendInput] = useState('');
  const [addingFriend, setAddingFriend] = useState(false);
  const [friendAdded, setFriendAdded] = useState(false);

  // Invite to Lobby modal
  const [inviteFriend, setInviteFriend] = useState(null); // friend object
  const [selectedLobby, setSelectedLobby] = useState(null);
  const [inviteSending, setInviteSending] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );
  const onlineFriends = filtered.filter(f => f.status === 'Online');
  const offlineFriends = filtered.filter(f => f.status === 'Offline');

  const handleAddFriend = () => {
    if (!addFriendInput.trim()) return;
    setAddingFriend(true);
    setTimeout(() => {
      setAddingFriend(false);
      setFriendAdded(true);
      setTimeout(() => {
        setFriendAdded(false);
        setShowAddFriend(false);
        setAddFriendInput('');
      }, 1800);
    }, 1200);
  };

  const handleInvite = () => {
    if (!selectedLobby) return;
    setInviteSending(true);
    setTimeout(() => {
      setInviteSending(false);
      setInviteSent(true);
      setTimeout(() => {
        setInviteSent(false);
        setInviteFriend(null);
        setSelectedLobby(null);
      }, 1800);
    }, 1200);
  };

  const acceptRequest = (id) => setPending(prev => prev.filter(p => p.id !== id));
  const declineRequest = (id) => setPending(prev => prev.filter(p => p.id !== id));

  return (
    <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto pb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131A] p-5 rounded-2xl border border-white/5 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { key: 'all', label: 'All Friends', count: friends.length },
            { key: 'pending', label: 'Pending', count: pending.length },
            { key: 'blocked', label: 'Blocked', count: 0 },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === tab.key ? 'bg-white/20' : 'bg-white/10'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAddFriend(true)}
          className="shrink-0 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.3)]"
        >
          <UserPlus className="w-4 h-4" /> Add Friend
        </button>
      </div>

      {/* Pending Requests Tab */}
      {activeTab === 'pending' && (
        <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 border-b border-white/5 bg-black/20">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" /> Incoming Friend Requests
            </h3>
          </div>
          {pending.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No pending requests</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pending.map(req => (
                <div key={req.id} className="px-5 py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={req.avatar} className="w-11 h-11 rounded-full" alt={req.name} />
                    <div>
                      <div className="font-bold text-white">{req.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {req.since}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptRequest(req.id)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button
                      onClick={() => declineRequest(req.id)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <UserX className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Blocked Tab */}
      {activeTab === 'blocked' && (
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-10 shadow-xl text-center text-gray-500">
          <UserX className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">No blocked users</p>
        </div>
      )}

      {/* All Friends Tab */}
      {activeTab === 'all' && (
        <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                type="text"
                placeholder="Search friends..."
                className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-[#7C3AED] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="divide-y divide-white/5">

            {/* Online */}
            {onlineFriends.length > 0 && (
              <div className="px-5 py-2 text-xs font-bold text-green-500 uppercase tracking-wider bg-green-500/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online — {onlineFriends.length}
              </div>
            )}
            {onlineFriends.map(friend => (
              <div key={friend.id} className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={friend.avatar} className="w-11 h-11 rounded-full" alt={friend.name} />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#13131A]" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-[#7C3AED] transition-colors">{friend.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{friend.activity}</div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setInviteFriend(friend); setSelectedLobby(null); setInviteSent(false); }}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 hover:bg-[#7C3AED]/20 transition-colors flex items-center gap-1.5"
                    title="Invite to Lobby"
                  >
                    <Tv2 className="w-3.5 h-3.5" /> Invite to Lobby
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/5 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Offline */}
            {offlineFriends.length > 0 && (
              <div className="px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-black/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-500" /> Offline — {offlineFriends.length}
              </div>
            )}
            {offlineFriends.map(friend => (
              <div key={friend.id} className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer opacity-60 hover:opacity-100">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={friend.avatar} className="w-11 h-11 rounded-full grayscale group-hover:grayscale-0 transition-all" alt={friend.name} />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-gray-500 border-2 border-[#13131A]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-300 text-sm">{friend.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{friend.activity}</div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/5 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No friends found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-green-500" /> Add Friend
              </h3>
              {!addingFriend && !friendAdded && (
                <button onClick={() => { setShowAddFriend(false); setAddFriendInput(''); }} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {friendAdded ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Friend Request Sent!</h4>
                <p className="text-gray-400 text-sm">Waiting for <span className="text-white font-bold">{addFriendInput}</span> to accept.</p>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Username or Email</label>
                  <input
                    value={addFriendInput}
                    onChange={e => setAddFriendInput(e.target.value)}
                    placeholder="Enter username or email..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors text-sm"
                    onKeyDown={e => e.key === 'Enter' && handleAddFriend()}
                  />
                  <p className="text-[11px] text-gray-600 mt-1.5">They'll receive a friend request notification.</p>
                </div>
                <button
                  onClick={handleAddFriend}
                  disabled={!addFriendInput.trim()}
                  className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)]"
                >
                  {addingFriend ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-4 h-4" /> Send Request</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invite to Lobby Modal */}
      {inviteFriend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Tv2 className="w-5 h-5 text-[#7C3AED]" /> Invite to Lobby
              </h3>
              {!inviteSending && !inviteSent && (
                <button onClick={() => setInviteFriend(null)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {inviteSent ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-[#7C3AED]/20 rounded-full flex items-center justify-center mb-4 border border-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-[#7C3AED]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Invite Sent!</h4>
                <p className="text-gray-400 text-sm">
                  <span className="text-white font-bold">{inviteFriend.name}</span> has been invited to <span className="text-[#7C3AED] font-bold">{selectedLobby?.name}</span>.
                </p>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                {/* Friend preview */}
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                  <img src={inviteFriend.avatar} className="w-10 h-10 rounded-full" alt={inviteFriend.name} />
                  <div>
                    <div className="font-bold text-white text-sm">{inviteFriend.name}</div>
                    <div className="text-xs text-green-400">{inviteFriend.activity}</div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Select Lobby</label>
                  <div className="space-y-2">
                    {LOBBIES.map(lobby => (
                      <button
                        key={lobby.id}
                        onClick={() => setSelectedLobby(lobby)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all
                          ${selectedLobby?.id === lobby.id
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                            : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Tv2 className={`w-4 h-4 ${selectedLobby?.id === lobby.id ? 'text-[#7C3AED]' : 'text-gray-500'}`} />
                          <div>
                            <div className="font-bold text-white text-sm">{lobby.name}</div>
                            <div className="text-[11px] text-gray-500">{lobby.screens} screens · {lobby.type}</div>
                          </div>
                        </div>
                        {selectedLobby?.id === lobby.id && (
                          <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleInvite}
                  disabled={!selectedLobby}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                >
                  {inviteSending
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : <><Tv2 className="w-4 h-4" /> Send Lobby Invite</>
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
