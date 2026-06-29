import { useState } from 'react';
import { Gavel, Search, Plus, Eye, ChevronRight, Clock, AlertTriangle, CheckCircle2, X, Loader2, User, FileText } from 'lucide-react';

const cases = [
  { id: 'CASE-8821', entity: 'Global Trade Inc', type: 'AML Investigation', opened: 'Jun 29, 2025', assignedTo: 'Sarah K.', priority: 'Critical', status: 'Open', events: 3 },
  { id: 'CASE-8820', entity: 'Anonymous_8821', type: 'Fraud Investigation', opened: 'Jun 28, 2025', assignedTo: 'James M.', priority: 'High', status: 'Active', events: 7 },
  { id: 'CASE-8819', entity: 'StreamBox LLC', type: 'Chargeback Dispute', opened: 'Jun 27, 2025', assignedTo: 'Rachel T.', priority: 'Medium', status: 'Active', events: 2 },
  { id: 'CASE-8818', entity: 'DarkWeb Corp', type: 'Sanctions Screening', opened: 'Jun 25, 2025', assignedTo: 'James M.', priority: 'Critical', status: 'Escalated', events: 9 },
  { id: 'CASE-8817', entity: 'john.doe91@mail.com', type: 'Account Takeover', opened: 'Jun 23, 2025', assignedTo: 'Rachel T.', priority: 'High', status: 'Resolved', events: 5 },
  { id: 'CASE-8816', entity: 'Novo Payments', type: 'KYC Dispute', opened: 'Jun 20, 2025', assignedTo: 'Sarah K.', priority: 'Low', status: 'Resolved', events: 4 },
];

const priorityStyle = (p) => ({
  Critical: 'bg-red-600/20 text-red-400 border-red-500/30',
  High: 'bg-red-500/10 text-red-500 border-red-500/20',
  Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Low: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
}[p] || '');

const statusStyle = (s) => ({
  Open: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Active: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Escalated: 'bg-red-500/10 text-red-400 border-red-500/20',
  Resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
}[s] || '');

const caseNotes = {
  'CASE-8821': [
    { time: '14:22', by: 'Sarah K.', note: 'Initial AML alert reviewed. Suspicious structuring pattern confirmed. Escalating to senior officer.' },
    { time: '13:05', by: 'System', note: 'Automatic alert triggered for transaction pattern on MoonPay routing.' },
    { time: '12:00', by: 'James M.', note: 'Case created and assigned to Sarah K. for AML review.' },
  ],
};

export default function CaseManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const filters = ['All', 'Open', 'Active', 'Escalated', 'Resolved'];

  const filtered = cases.filter(c => {
    const matchSearch = c.entity.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search);
    const matchFilter = filter === 'All' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => { setAdding(false); setAdded(true); setTimeout(() => { setAdded(false); setShowAddModal(false); }, 1500); }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Gavel className="w-8 h-8 text-purple-500" /> Case Management
          </h1>
          <p className="text-gray-400 mt-1">Track and manage fraud, AML, and compliance investigation cases.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Open New Case
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Cases', value: cases.length, color: 'text-white' },
          { label: 'Open / Active', value: cases.filter(c => c.status === 'Open' || c.status === 'Active').length, color: 'text-blue-400' },
          { label: 'Escalated', value: cases.filter(c => c.status === 'Escalated').length, color: 'text-red-400' },
          { label: 'Resolved', value: cases.filter(c => c.status === 'Resolved').length, color: 'text-green-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 text-center shadow-xl">
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search case ID or entity..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${filter === f ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'text-gray-400 border-white/10 hover:border-white/20 hover:text-white'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl hover:border-white/10 transition-colors cursor-pointer group" onClick={() => setSelectedCase(c)}>
            <div className="flex justify-between items-start mb-4">
              <div className="font-mono text-xs font-bold text-gray-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">{c.id}</div>
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityStyle(c.priority)}`}>{c.priority}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black text-white text-sm shrink-0">
                {c.entity.charAt(0)}
              </div>
              <div>
                <div className="font-black text-white text-sm">{c.entity}</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">{c.type}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle(c.status)}`}>{c.status}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FileText className="w-3 h-3" /> {c.events} events
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span className="font-medium">{c.assignedTo}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>{c.opened}</span>
              </div>
            </div>

            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-bold text-purple-400">
              <Eye className="w-3.5 h-3.5" /> View Case Details <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Case Detail Side Panel */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl sticky top-0">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Gavel className="w-5 h-5 text-purple-500" /> {selectedCase.id}
              </h3>
              <button onClick={() => setSelectedCase(null)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full shrink-0"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Entity', value: selectedCase.entity },
                  { label: 'Case Type', value: selectedCase.type },
                  { label: 'Assigned To', value: selectedCase.assignedTo },
                  { label: 'Opened', value: selectedCase.opened },
                ].map((f, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{f.label}</div>
                    <div className="font-bold text-white text-sm">{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${priorityStyle(selectedCase.priority)}`}>{selectedCase.priority} Priority</span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${statusStyle(selectedCase.status)}`}>{selectedCase.status}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" /> Case Timeline
                </h4>
                <div className="space-y-3">
                  {(caseNotes[selectedCase.id] || [
                    { time: '09:00', by: 'System', note: 'Case created automatically based on risk alert trigger.' },
                    { time: '09:15', by: selectedCase.assignedTo, note: 'Case assigned and initial review started.' },
                  ]).map((note, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex-1">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-bold text-purple-400">{note.by}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{note.time}</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">{note.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Add Note</label>
                <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none" placeholder="Add investigation notes..." />
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-colors text-sm">Mark Resolved</button>
                <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] text-sm">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2"><Gavel className="w-5 h-5 text-purple-500" /> Open New Case</h3>
              {!adding && !added && <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            {added ? (
              <div className="p-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Case Opened!</h4>
                <p className="text-gray-400 text-sm">The case has been created and assigned.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Entity Name / ID</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm" placeholder="e.g. Global Trade Inc or MER-1092" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Case Type</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm">
                    <option>AML Investigation</option>
                    <option>Fraud Investigation</option>
                    <option>Chargeback Dispute</option>
                    <option>Sanctions Screening</option>
                    <option>KYC Dispute</option>
                    <option>Account Takeover</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Assign To</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm">
                    <option>Sarah K.</option>
                    <option>James M.</option>
                    <option>Rachel T.</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Priority</label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High', 'Critical'].map(p => (
                      <button key={p} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${p === 'Critical' ? 'border-red-500/30 bg-red-500/10 text-red-400' : p === 'High' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' : p === 'Medium' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' : 'border-gray-500/30 bg-gray-500/10 text-gray-400'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Initial Description</label>
                  <textarea rows={2} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none" placeholder="Brief description of the case..." />
                </div>
                <button onClick={handleAdd} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Open Case'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
