import { useState, useEffect } from 'react';
import { Coins, Search, Plus, RefreshCw, TrendingUp, X, CheckCircle2, Edit2, Trash2, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function Currencies() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/settings/currencies');
      if (res.success && res.data) {
        setCurrencies(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch currencies', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCurrencies = currencies.filter(c => 
    c.assetName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.assetCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSync = () => {
    setIsSyncing(true);
    // Real sync would trigger backend external API (e.g. CoinGecko/Forex APIs).
    // For now, we simulate success and re-fetch existing DB entries.
    setTimeout(() => {
      setIsSyncing(false);
      fetchCurrencies();
    }, 1500);
  };

  const handleOpenAdd = () => {
    setEditingCurrency(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (currency) => {
    setEditingCurrency(currency);
    setIsModalOpen(true);
  };

  const handleDelete = async (assetId) => {
    try {
      setDeleting(assetId);
      await apiClient.delete(`/admin/settings/currencies/${assetId}`);
      await fetchCurrencies();
    } catch (error) {
      console.error('Failed to delete currency', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      code: formData.get('code').toUpperCase(),
      name: formData.get('name'),
      type: formData.get('type'),
      rate: formData.get('rate'),
      fee: formData.get('fee'),
      status: formData.get('status')
    };

    try {
      setSaving(true);
      if (editingCurrency) {
        await apiClient.put(`/admin/settings/currencies/${editingCurrency.assetId}`, payload);
      } else {
        await apiClient.post('/admin/settings/currencies', payload);
      }
      await fetchCurrencies();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save currency', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] w-full">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin mb-4" />
        <p className="text-gray-400 font-bold">Loading Currencies & FX...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Coins className="w-8 h-8 text-[#7C3AED]" /> Currencies & FX
          </h1>
          <p className="text-gray-400 mt-1">Manage supported fiat/crypto pairs and exchange rates.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSync} className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-white/10 transition-all">
            {isSyncing ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <RefreshCw className="w-4 h-4" />}
            {isSyncing ? <span className="text-green-500">Synced!</span> : "Sync Rates"}
          </button>
          <button onClick={handleOpenAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Asset
          </button>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search currencies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" 
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Asset</th>
              <th className="p-4">Type</th>
              <th className="p-4 text-right">Exchange Rate (vs USD)</th>
              <th className="p-4 text-right">Conversion Fee</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredCurrencies.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No assets found. Click 'Add Asset' to create one.
                </td>
              </tr>
            ) : (
              filteredCurrencies.map((c) => (
                <tr key={c.assetId} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-cyan-500 flex items-center justify-center font-bold text-xs">
                      {c.assetCode.substring(0,2)}
                    </div>
                    <div>
                      <div>{c.assetCode}</div>
                      <div className="text-xs text-gray-500 font-medium">{c.assetName}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.assetType === 'Crypto' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-pink-500/10 text-pink-500'}`}>
                      {c.assetType}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-bold text-white">${(c.exchangeRateUSD / 10000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}</div>
                    <div className="text-[10px] text-green-500 flex items-center justify-end gap-1"><TrendingUp className="w-3 h-3"/> Live</div>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-400">{c.conversionFee / 100}%</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Primary' ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-green-500/10 text-green-500'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(c.assetId)} disabled={deleting === c.assetId} className="p-1.5 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50">
                      {deleting === c.assetId ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">{editingCurrency ? 'Edit Asset' : 'Add New Asset'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Asset Code</label>
                  <input name="code" defaultValue={editingCurrency?.assetCode || ''} type="text" required placeholder="e.g. SOL" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none uppercase" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Asset Name</label>
                  <input name="name" defaultValue={editingCurrency?.assetName || ''} type="text" required placeholder="e.g. Solana" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Type</label>
                  <select name="type" defaultValue={editingCurrency?.assetType || 'Crypto'} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                    <option>Crypto</option>
                    <option>Fiat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Exchange Rate (USD)</label>
                  <input name="rate" defaultValue={editingCurrency ? editingCurrency.exchangeRateUSD / 10000 : ''} type="text" required placeholder="e.g. 150.00" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Conversion Fee (%)</label>
                  <input name="fee" defaultValue={editingCurrency ? editingCurrency.conversionFee / 100 : ''} type="text" required placeholder="e.g. 0.5" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingCurrency?.status || 'Active'} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                    <option>Active</option>
                    <option>Primary</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors disabled:opacity-70">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                  {saving ? 'Saving...' : (editingCurrency ? 'Save Changes' : 'Add Asset')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
