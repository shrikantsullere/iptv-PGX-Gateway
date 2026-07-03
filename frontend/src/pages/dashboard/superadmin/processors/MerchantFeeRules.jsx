import { useState, useEffect } from 'react';
import apiClient from '../../../../utils/apiClient';
import { Shield, Search, Edit, Plus, X, Loader2, CheckCircle2, Building2 } from 'lucide-react';

export default function MerchantFeeRules() {
  const [search, setSearch] = useState('');
  const [editMerchant, setEditMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/payment-processors/merchant-rules');
      if (res.success) {
        setMerchants(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch merchant rules', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const filtered = merchants.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    setSaving(true);
    const customPct = document.querySelector('input[name="customPct"]').value;
    const customFixed = document.querySelector('input[name="customFixed"]').value;
    const reason = document.querySelector('textarea[name="reason"]').value;
    
    try {
      const res = await apiClient.put(`/admin/payment-processors/merchant-rules/${editMerchant.id}`, {
        customPct,
        customFixed,
        reason
      });
      if (res.success) {
        await fetchMerchants();
        setSaved(true);
        setTimeout(() => { setSaved(false); setEditMerchant(null); }, 1500);
      }
    } catch (error) {
      alert('Failed to override fee');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-orange-500" /> Merchant Fee Rules
          </h1>
          <p className="text-gray-400 mt-1">Override global processing fees for individual merchants.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Merchants', value: merchants.length, color: 'text-white' },
          { label: 'Custom Fee Rules', value: merchants.filter(m => m.status === 'Custom').length, color: 'text-[#7C3AED]' },
          { label: 'On Standard Fee', value: merchants.filter(m => m.status === 'Standard').length, color: 'text-blue-400' },
          { label: 'Global Base Fee', value: '2.9% +$0.30', color: 'text-green-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 text-center shadow-xl">
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs font-medium text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">Merchant Fee Configuration</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Search merchant or ID..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Merchant</th>
                <th className="p-5 font-bold uppercase tracking-wider">Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Monthly Volume</th>
                <th className="p-5 font-bold uppercase tracking-wider">Global Fee</th>
                <th className="p-5 font-bold uppercase tracking-wider">Custom Fee</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filtered.map((m, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-blue-500 flex items-center justify-center font-black text-white text-xs shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{m.name}</div>
                        <div className="text-xs font-mono text-gray-500">{m.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${m.type === 'Enterprise' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : m.type === 'Pro' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-white font-mono">{m.volume}</td>
                  <td className="p-5 text-gray-400 font-mono text-xs">{m.globalFee}</td>
                  <td className="p-5">
                    {m.status === 'Custom' ? (
                      <span className="font-mono text-green-400 font-bold text-xs">{m.customFee}</span>
                    ) : (
                      <span className="text-gray-500 text-xs italic">Standard</span>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => setEditMerchant(m)}
                      className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 px-3 py-1.5 rounded-lg border border-[#7C3AED]/20 transition-colors"
                    >
                      Override Fee
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Edit className="w-5 h-5 text-orange-500" /> Override Fee for {editMerchant.name}
              </h3>
              <button onClick={() => setEditMerchant(null)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {saved ? (
              <div className="p-12 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Fee Rule Saved!</h4>
                <p className="text-gray-400 text-sm">{editMerchant.name}'s custom fee rule has been applied successfully.</p>
              </div>
            ) : (
              <div className="p-6 space-y-5" id="override-modal">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-xs text-orange-300">
                  Merchant ID: <strong className="font-mono">{editMerchant.id}</strong> — Current base fee: <strong>{editMerchant.globalFee}</strong>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Custom Percentage Fee</label>
                  <div className="relative">
                    <input type="text" name="customPct" defaultValue={editMerchant.customFee !== '—' ? editMerchant.customFee.split('%')[0] : ''} placeholder="e.g. 2.2" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm font-mono" />
                    <span className="absolute right-4 top-3 text-gray-500 font-bold">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Fixed Fee per Transaction</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-bold">$</span>
                    <input type="text" name="customFixed" defaultValue={editMerchant.customFee !== '—' ? editMerchant.customFee.split('$')[1] : ''} placeholder="e.g. 0.25" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm font-mono" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Override Reason (Internal)</label>
                  <textarea name="reason" rows={2} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm resize-none" placeholder="e.g. Enterprise contract negotiated Q2 2025..." />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all h-12 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Fee Override'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
