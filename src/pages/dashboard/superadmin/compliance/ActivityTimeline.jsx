import { useState } from 'react';
import { CalendarClock, ShieldCheck, AlertTriangle, CheckCircle2, Eye, XCircle, Clock, UserCheck, FileText, Search } from 'lucide-react';

const timelineEvents = [
  {
    id: 'EVT-9901', time: '16:14', date: 'Today', type: 'KYC Approved', entity: 'John Martinez',
    description: 'Identity documents verified and KYC approved. Risk score: Low.',
    icon: CheckCircle2, iconColor: 'text-green-500', iconBg: 'bg-green-500/20', borderColor: 'border-green-500/30',
  },
  {
    id: 'EVT-9900', time: '15:42', date: 'Today', type: 'AML Alert Raised', entity: 'Global Trade Inc',
    description: 'Suspicious structuring detected. Transaction pattern flagged for review. Amount: $48,200.',
    icon: AlertTriangle, iconColor: 'text-red-500', iconBg: 'bg-red-500/20', borderColor: 'border-red-500/30',
  },
  {
    id: 'EVT-9899', time: '14:20', date: 'Today', type: 'KYC Submitted', entity: 'StreamBox LLC',
    description: 'New KYC submission received. Business type: SaaS platform. Documents in review queue.',
    icon: FileText, iconColor: 'text-blue-500', iconBg: 'bg-blue-500/20', borderColor: 'border-blue-500/30',
  },
  {
    id: 'EVT-9898', time: '11:05', date: 'Today', type: 'KYC Rejected', entity: 'Anonymous Entity',
    description: 'Identity verification failed. Document mismatch detected. High-risk country of origin.',
    icon: XCircle, iconColor: 'text-red-500', iconBg: 'bg-red-500/20', borderColor: 'border-red-500/30',
  },
  {
    id: 'EVT-9897', time: '09:30', date: 'Today', type: 'AML Alert Resolved', entity: 'StreamBox LLC',
    description: 'AML-4417 flagged as false positive after manual review. Entity cleared by compliance officer.',
    icon: CheckCircle2, iconColor: 'text-green-500', iconBg: 'bg-green-500/20', borderColor: 'border-green-500/30',
  },
  {
    id: 'EVT-9896', time: '22:18', date: 'Yesterday', type: 'Regulatory Filing', entity: 'System',
    description: 'Monthly SAR report automatically generated and submitted to regulatory authority.',
    icon: FileText, iconColor: 'text-purple-500', iconBg: 'bg-purple-500/20', borderColor: 'border-purple-500/30',
  },
  {
    id: 'EVT-9895', time: '18:44', date: 'Yesterday', type: 'KYC Approved', entity: 'Novo Payments',
    description: 'Enterprise merchant KYC approved. Full due diligence completed. Risk score: Low.',
    icon: UserCheck, iconColor: 'text-green-500', iconBg: 'bg-green-500/20', borderColor: 'border-green-500/30',
  },
  {
    id: 'EVT-9894', time: '14:12', date: 'Yesterday', type: 'Document Expiry Warning', entity: 'Acme Corp',
    description: 'Business registration document for Acme Corp expires in 30 days. Re-submission required.',
    icon: Clock, iconColor: 'text-yellow-500', iconBg: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30',
  },
];

const typeFilters = ['All', 'KYC Approved', 'KYC Rejected', 'KYC Submitted', 'AML Alert Raised', 'AML Alert Resolved', 'Regulatory Filing'];

export default function ActivityTimeline() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = timelineEvents.filter(ev => {
    const matchSearch = ev.entity.toLowerCase().includes(search.toLowerCase()) || ev.type.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || ev.type === typeFilter;
    return matchSearch && matchType;
  });

  const grouped = filtered.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <CalendarClock className="w-8 h-8 text-purple-500" /> Activity Timeline
          </h1>
          <p className="text-gray-400 mt-1">Chronological log of all KYC, AML, and compliance events.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Events Today', value: '5', color: 'text-white', icon: CalendarClock, bg: 'bg-[#7C3AED]/20', iconColor: 'text-[#7C3AED]' },
          { label: 'KYC Events', value: '3', color: 'text-blue-400', icon: ShieldCheck, bg: 'bg-blue-500/20', iconColor: 'text-blue-500' },
          { label: 'AML Events', value: '2', color: 'text-red-400', icon: AlertTriangle, bg: 'bg-red-500/20', iconColor: 'text-red-500' },
          { label: 'System Events', value: '1', color: 'text-purple-400', icon: FileText, bg: 'bg-purple-500/20', iconColor: 'text-purple-500' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity`} />
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by entity or event type..."
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {typeFilters.slice(0, 4).map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${typeFilter === f ? 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30' : 'text-gray-400 border-white/10 hover:border-white/20 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-gray-400 focus:outline-none"
          >
            {typeFilters.map(f => <option key={f} className="bg-[#13131A]">{f}</option>)}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([date, events]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-5">
              <div className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">{date}</div>
              <div className="flex-1 h-px bg-white/5"></div>
              <div className="text-xs text-gray-600 font-medium">{events.length} event{events.length > 1 ? 's' : ''}</div>
            </div>

            <div className="relative pl-6 space-y-4">
              {/* Vertical line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/10"></div>

              {events.map((ev, i) => (
                <div key={i} className={`relative bg-[#13131A] border ${ev.borderColor} rounded-2xl p-5 shadow-xl ml-4 hover:border-white/20 transition-colors group`}>
                  {/* Dot */}
                  <div className={`absolute -left-7 top-5 w-4 h-4 rounded-full ${ev.iconBg} border-2 ${ev.borderColor} flex items-center justify-center`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${ev.iconBg} flex items-center justify-center shrink-0`}>
                        <ev.icon className={`w-4 h-4 ${ev.iconColor}`} />
                      </div>
                      <div>
                        <div className="font-black text-white text-sm">{ev.type}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{ev.entity}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-mono font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">{ev.time}</span>
                      <span className="text-[10px] font-mono text-gray-600">{ev.id}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed pl-11">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-12 text-center shadow-xl">
            <CalendarClock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No events match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
