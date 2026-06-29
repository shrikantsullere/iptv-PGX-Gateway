import { useState } from 'react';
import { UserX, Search, Plus, Ban, Trash2, Eye, CheckCircle2, X, Loader2, ShieldAlert, Globe } from 'lucide-react';

const blockedEntities = [
  { id: 'BLK-1421', name: 'Anonymous_8821', type: 'IP Address', value: '185.220.101.24', reason: 'Card Testing', blockedAt: 'Jun 29, 2025', severity: 'Critical', status: 'Active' },
  { id: 'BLK-1420', name: 'TechCo Dev API', type: 'API Key', value: 'sk_live_...8f2a', reason: 'Velocity Abuse', blockedAt: 'Jun 29, 2025', severity: 'Critical', status: 'Active' },
  { id: 'BLK-1419', name: 'john.doe91@mail.com', type: 'Email', value: 'john.doe91@mail.com', reason: 'Account Takeover', blockedAt: 'Jun 28, 2025', severity: 'High', status: 'Active' },
  { id: 'BLK-1418', name: 'DarkWeb Corp', type: 'Merchant', value: 'MER-0042', reason: 'Fraudulent Activity', blockedAt: 'Jun 27, 2025', severity: 'Critical', status: 'Active' },
  { id: 'BLK-1417', name: '192.168.44.21', type: 'IP Address', value: '192.168.44.21', reason: 'AML Flagged', blockedAt: 'Jun 25, 2025', severity: 'Medium', status: 'Reviewing' },
  { id: 'BLK-1416', name: 'fake_user@temp.io', type: 'Email', value: 'fake_user@temp.io', reason: 'Identity Fraud', blockedAt: 'Jun 20, 2025', severity: 'High', status: 'Unblocked' },
];

const typeIcon = (type) => ({
  'IP Address': Globe, 'Email': UserX, 'API Key': ShieldAlert, 'Merchant': Ban,
}[type] || UserX);

const severityStyle = (s) => ({
  Critical: 'bg-red-600/20 text-red-400 border-red-500/30',
  High: 'bg-red-500/10 text-red-500 border-red-500/20',
  Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
}[s] || 'bg-gray-500/10 text-gray-400 border-gray-500/20');

const statusStyle = (s) => ({
  Active: 'bg-red-500/10 text-red-400 border-red-500/20',
  Reviewing: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Unblocked: 'bg-green-500/10 text-green-500 border-green-500/20',
}[s] || '');

export default function BlockedEntities() {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [entities, setEntities] = useState(blockedEntities);

  const filtered = entities.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.reason.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => { setAdding(false); setAdded(true); setTimeout(() => { setAdded(false); setShowAddModal(false); }, 1500); }, 1200);
  };

  const handleDelete = (id) => setEntities(e => e.filter(x => x.id !== id));

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <UserX className="w-8 h-8 text-red-500" /> Blocked Entities
          </h1>
          <p className="text-gray-400 mt-1">IP addresses, merchants, emails, and API keys blocked from the platform.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Block Entity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Blocked', value: entities.filter(e => e.status === 'Active').length, color: 'text-red-400' },
          { label: 'IP Addresses', value: entities.filter(e => e.type === 'IP Address').length, color: 'text-orange-400' },
          { label: 'Emails', value: entities.filter(e => e.type === 'Email').length, color: 'text-yellow-400' },
          { label: 'Under Review', value: entities.filter(e => e.status === 'Reviewing').length, color: 'text-blue-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 text-center shadow-xl">
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">Blocklist</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entity or reason..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Entity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Value</th>
                <th className="p-5 font-bold uppercase tracking-wider">Block Reason</th>
                <th className="p-5 font-bold uppercase tracking-wider">Blocked On</th>
                <th className="p-5 font-bold uppercase tracking-wider">Severity</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filtered.map((e, i) => {
                const Icon = typeIcon(e.type);
                return (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="font-bold text-white text-sm truncate max-w-[120px]">{e.name}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-400 text-xs font-medium">{e.type}</td>
                    <td className="p-5 font-mono text-xs text-gray-300 truncate max-w-[120px]">{e.value}</td>
                    <td className="p-5 text-gray-300 text-xs">{e.reason}</td>
                    <td className="p-5 text-gray-400 text-xs font-medium">{e.blockedAt}</td>
                    <td className="p-5"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${severityStyle(e.severity)}`}>{e.severity}</span></td>
                    <td className="p-5"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle(e.status)}`}>{e.status}</span></td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-[#7C3AED] p-1.5 rounded-lg hover:bg-[#7C3AED]/10 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(e.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Block Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2"><Ban className="w-5 h-5 text-red-500" /> Block New Entity</h3>
              {!adding && !added && <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            {added ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Entity Blocked!</h4>
                <p className="text-gray-400 text-sm">The entity has been added to the blocklist.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Entity Type</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm">
                    <option>IP Address</option>
                    <option>Email</option>
                    <option>API Key</option>
                    <option>Merchant</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Entity Value</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm font-mono" placeholder="e.g. 192.168.1.1 or user@email.com" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Block Reason</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors text-sm">
                    <option>Card Testing</option>
                    <option>Account Takeover</option>
                    <option>Velocity Abuse</option>
                    <option>AML Flagged</option>
                    <option>Identity Fraud</option>
                    <option>Manual Review</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Severity</label>
                  <div className="flex gap-2">
                    {['Medium', 'High', 'Critical'].map(s => (
                      <button key={s} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${s === 'Critical' ? 'border-red-500/30 bg-red-500/10 text-red-400' : s === 'High' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Ban className="w-4 h-4 mr-2" /> Confirm Block</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
