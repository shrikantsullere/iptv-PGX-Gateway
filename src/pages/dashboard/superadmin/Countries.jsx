import { useState } from 'react';
import { Globe2, Search, Plus, Trash2, Edit2, ShieldBan, Map, X } from 'lucide-react';

export default function Countries() {
  const [countries, setCountries] = useState([
    { name: 'United States', code: 'US', region: 'North America', status: 'Active', merchants: 1240, methods: 12 },
    { name: 'United Kingdom', code: 'UK', region: 'Europe', status: 'Active', merchants: 850, methods: 9 },
    { name: 'India', code: 'IN', region: 'Asia', status: 'Active', merchants: 420, methods: 5 },
    { name: 'Russia', code: 'RU', region: 'Europe/Asia', status: 'Sanctioned', merchants: 0, methods: 0 },
    { name: 'Brazil', code: 'BR', region: 'South America', status: 'Active', merchants: 310, methods: 4 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (code) => {
    setCountries(countries.filter(c => c.code !== code));
  };

  const handleOpenEdit = (country) => {
    setEditingCountry(country);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingCountry(null);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCountry = {
      name: formData.get('name'),
      code: formData.get('code').toUpperCase(),
      region: formData.get('region'),
      status: formData.get('status'),
      merchants: editingCountry ? editingCountry.merchants : 0,
      methods: editingCountry ? editingCountry.methods : 0,
    };

    if (editingCountry) {
      setCountries(countries.map(c => c.code === editingCountry.code ? newCountry : c));
    } else {
      setCountries([newCountry, ...countries]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-[#7C3AED]" /> Global Jurisdictions
          </h1>
          <p className="text-gray-400 mt-1">Manage supported countries and regional compliance blocks.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Region
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: 'Supported Countries', value: '184', icon: Globe2, color: 'text-blue-500' },
          { title: 'Sanctioned / Blocked', value: '12', icon: ShieldBan, color: 'text-red-500' },
          { title: 'High Risk Regions', value: '8', icon: Map, color: 'text-yellow-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</p>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search countries..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" 
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Country</th>
              <th className="p-4">Region</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Merchants</th>
              <th className="p-4 text-right">Payment Methods</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredCountries.map((c, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-gray-400">{c.code}</div>
                  {c.name}
                </td>
                <td className="p-4 text-gray-400">{c.region}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-white">{c.merchants}</td>
                <td className="p-4 text-right font-bold text-gray-400">{c.methods}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(c.code)} className="p-1.5 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">{editingCountry ? 'Edit Region' : 'Add New Region'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Country Name</label>
                <input name="name" defaultValue={editingCountry?.name || ''} type="text" required placeholder="e.g. Canada" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Country Code</label>
                  <input name="code" defaultValue={editingCountry?.code || ''} type="text" required placeholder="CA" maxLength={2} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none uppercase" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingCountry?.status || 'Active'} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                    <option>Active</option>
                    <option>Sanctioned</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Region</label>
                <select name="region" defaultValue={editingCountry?.region || 'North America'} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option>North America</option>
                  <option>South America</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>Europe/Asia</option>
                  <option>Africa</option>
                  <option>Oceania</option>
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
                  {editingCountry ? 'Save Changes' : 'Add Region'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
