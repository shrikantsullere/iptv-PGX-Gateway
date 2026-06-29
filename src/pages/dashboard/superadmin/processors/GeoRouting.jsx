import { useState } from 'react';
import { Globe, Plus, Trash2, Edit, ChevronRight, Flag, Shield, ArrowRight } from 'lucide-react';

const routingRules = [
  { id: 1, region: 'North America', countries: 'US, CA, MX', processor: 'Stripe Gateway US', priority: 1, status: 'Active', color: 'bg-[#7C3AED]' },
  { id: 2, region: 'Europe', countries: 'DE, FR, GB, ES, IT', processor: 'Stripe Gateway EU', priority: 1, status: 'Active', color: 'bg-blue-600' },
  { id: 3, region: 'Asia Pacific', countries: 'JP, SG, KR, AU', processor: 'LocalGate Asia', priority: 1, status: 'Active', color: 'bg-cyan-600' },
  { id: 4, region: 'Middle East', countries: 'AE, SA, QA', processor: 'MoonPay Crypto', priority: 2, status: 'Active', color: 'bg-amber-600' },
  { id: 5, region: 'Latin America', countries: 'BR, AR, CL, CO', processor: 'Stripe Gateway US', priority: 2, status: 'Draft', color: 'bg-pink-600' },
  { id: 6, region: 'Africa', countries: 'NG, ZA, KE, GH', processor: 'MoonPay Crypto', priority: 3, status: 'Draft', color: 'bg-green-600' },
];

const processorOptions = ['Stripe Gateway US', 'Stripe Gateway EU', 'MoonPay Crypto', 'Coinbase Commerce', 'LocalGate Asia'];

export default function GeoRouting() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [rules, setRules] = useState(routingRules);
  const [editRule, setEditRule] = useState(null);

  const deleteRule = (id) => setRules(r => r.filter(x => x.id !== id));

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-500" /> Geo Routing
          </h1>
          <p className="text-gray-400 mt-1">Configure regional payment processor routing rules and priority levels.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Routing Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Regions', value: rules.filter(r => r.status === 'Active').length, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Draft Rules', value: rules.filter(r => r.status === 'Draft').length, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Processors Used', value: new Set(rules.map(r => r.processor)).size, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Countries Covered', value: '140+', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 flex flex-col items-center text-center shadow-xl">
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs font-medium text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl hover:border-white/10 transition-colors group relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${rule.color}`}></div>
            <div className="pl-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <h4 className="font-black text-white">{rule.region}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${rule.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                    {rule.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Flag className="w-3 h-3 text-gray-500 shrink-0" />
                <p className="text-xs text-gray-400 font-medium">{rule.countries}</p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 mb-4 border border-white/5">
                <ArrowRight className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="text-sm font-bold text-white">{rule.processor}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  Priority {rule.priority}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-[#7C3AED] transition-colors p-1.5 rounded-lg hover:bg-[#7C3AED]/10">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteRule(rule.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-xl flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" /> New Routing Rule
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Region Name</label>
                <input className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="e.g. Southeast Asia" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Countries (ISO codes)</label>
                <input className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm font-mono" placeholder="e.g. TH, MY, ID, VN" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Processor</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm appearance-none">
                  {processorOptions.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Priority</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm">
                  <option>1 — Primary</option>
                  <option>2 — Secondary</option>
                  <option>3 — Fallback</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
