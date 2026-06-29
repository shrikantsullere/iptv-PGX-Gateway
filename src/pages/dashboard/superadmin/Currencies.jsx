import { useState } from 'react';
import { Coins, Search, Plus, RefreshCw, TrendingUp, X, CheckCircle2 } from 'lucide-react';

export default function Currencies() {
  const [currencies, setCurrencies] = useState([
    { code: 'USD', name: 'US Dollar', type: 'Fiat', rate: '1.00', status: 'Primary', fee: '0%' },
    { code: 'EUR', name: 'Euro', type: 'Fiat', rate: '0.92', status: 'Active', fee: '1.5%' },
    { code: 'GBP', name: 'British Pound', type: 'Fiat', rate: '0.79', status: 'Active', fee: '1.5%' },
    { code: 'USDC', name: 'USD Coin', type: 'Crypto', rate: '1.00', status: 'Active', fee: '0.1%' },
    { code: 'BTC', name: 'Bitcoin', type: 'Crypto', rate: '64,230.00', status: 'Active', fee: '1.0%' },
    { code: 'ETH', name: 'Ethereum', type: 'Crypto', rate: '3,450.20', status: 'Active', fee: '1.0%' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredCurrencies = currencies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAsset = {
      code: formData.get('code').toUpperCase(),
      name: formData.get('name'),
      type: formData.get('type'),
      rate: formData.get('rate'),
      status: 'Active',
      fee: formData.get('fee') + '%'
    };
    setCurrencies([newAsset, ...currencies]);
    setIsModalOpen(false);
  };

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
          <button onClick={() => setIsModalOpen(true)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
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
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredCurrencies.map((c, i) => (
              <tr key={i} className="hover:bg-white/[0.02] cursor-pointer">
                <td className="p-4 font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-cyan-500 flex items-center justify-center font-bold text-xs">{c.code.substring(0,2)}</div>
                  <div>
                    <div>{c.code}</div>
                    <div className="text-xs text-gray-500 font-medium">{c.name}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.type === 'Crypto' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-pink-500/10 text-pink-500'}`}>
                    {c.type}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="font-bold text-white">${c.rate}</div>
                  <div className="text-[10px] text-green-500 flex items-center justify-end gap-1"><TrendingUp className="w-3 h-3"/> Live</div>
                </td>
                <td className="p-4 text-right font-bold text-gray-400">{c.fee}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Primary' ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-green-500/10 text-green-500'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Add New Asset</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddAsset} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Asset Code</label>
                  <input name="code" type="text" required placeholder="e.g. SOL" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none uppercase" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Asset Name</label>
                  <input name="name" type="text" required placeholder="e.g. Solana" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Type</label>
                  <select name="type" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                    <option>Crypto</option>
                    <option>Fiat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Exchange Rate (USD)</label>
                  <input name="rate" type="text" required placeholder="e.g. 150.00" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Conversion Fee (%)</label>
                <input name="fee" type="text" required placeholder="e.g. 0.5" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
