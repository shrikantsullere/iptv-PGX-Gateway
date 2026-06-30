import { useState } from 'react';
import { Search, Filter, MoreVertical, Building2, Download, Plus, Edit, Trash, X } from 'lucide-react';

const Merchants = () => {
  const [merchants, setMerchants] = useState([
    { id: 'MER-1092', name: 'Acme Corp', sub: 'Enterprise', revenue: '$1.2M', status: 'Active', country: 'US', date: '2023-10-12' },
    { id: 'MER-1093', name: 'Global Tech', sub: 'Business', revenue: '$450K', status: 'Active', country: 'UK', date: '2023-11-05' },
    { id: 'MER-1094', name: 'Digital Goods', sub: 'Starter', revenue: '$12K', status: 'Suspended', country: 'CA', date: '2024-01-20' },
    { id: 'MER-1095', name: 'SaaS Connect', sub: 'Business', revenue: '$890K', status: 'Active', country: 'AU', date: '2023-08-15' },
    { id: 'MER-1096', name: 'Web3 Gaming', sub: 'Enterprise', revenue: '$3.4M', status: 'Active', country: 'SG', date: '2023-05-30' },
    { id: 'MER-1097', name: 'Crypto Pay', sub: 'Business', revenue: '$2.1M', status: 'Active', country: 'UAE', date: '2023-02-14' },
    { id: 'MER-1098', name: 'Nexus Solutions', sub: 'Enterprise', revenue: '$5.5M', status: 'Active', country: 'US', date: '2022-11-20' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMerchantName, setNewMerchantName] = useState('');
  const [newMerchantCountry, setNewMerchantCountry] = useState('');
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [merchantToUpdate, setMerchantToUpdate] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(merchants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMerchants = merchants.slice(startIndex, startIndex + itemsPerPage);

  const handleAddMerchant = (e) => {
    e.preventDefault();
    if (!newMerchantName) return;
    const newObj = {
      id: `MER-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newMerchantName,
      sub: 'Starter',
      revenue: '$0',
      status: 'Active',
      country: newMerchantCountry || 'US',
      date: new Date().toISOString().split('T')[0]
    };
    setMerchants([newObj, ...merchants]);
    setNewMerchantName('');
    setNewMerchantCountry('');
    setIsAddModalOpen(false);
  };

  const openUpdateModal = (merchant) => {
    setMerchantToUpdate(merchant);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateMerchant = (e) => {
    e.preventDefault();
    if (!merchantToUpdate) return;
    
    setMerchants(merchants.map(m => 
      m.id === merchantToUpdate.id ? merchantToUpdate : m
    ));
    setIsUpdateModalOpen(false);
    setMerchantToUpdate(null);
  };

  const handleDeleteMerchant = (id) => {
    setMerchants(merchants.filter(m => m.id !== id));
  };

  const handleExport = () => {
    const headers = ['Merchant ID', 'Company', 'Subscription', 'Revenue', 'Status', 'Country', 'Created'];
    const csvRows = merchants.map(m => 
      [m.id, `"${m.name}"`, m.sub, `"${m.revenue}"`, m.status, m.country, m.date].join(',')
    );
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'merchants_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Merchants</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all platform merchants and their configurations.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-white/10 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Merchant
          </button>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col">
        {/* Filters */}
        <div className="p-4 border-b border-white/5 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search merchants..." className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#7C3AED] outline-none" />
          </div>
          <button onClick={() => alert('Filters applied')} className="bg-black/50 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Merchant ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subscription</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentMerchants.map((m, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-sm font-mono text-gray-400">{m.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center border border-[#7C3AED]/30">
                        <Building2 className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <span className="font-bold text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      m.sub === 'Enterprise' ? 'bg-pink-500/10 text-pink-500' :
                      m.sub === 'Business' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {m.sub}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">{m.revenue}</td>
                  <td className="p-4">
                    <span className={`flex w-fit items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
                      m.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{m.country}</td>
                  <td className="p-4 text-sm text-gray-400">{m.date}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openUpdateModal(m)} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors" title="Update">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteMerchant(m.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {merchants.length === 0 ? 0 : startIndex + 1} to {startIndex + currentMerchants.length} of {merchants.length} merchants</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Add Merchant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Add New Merchant</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMerchant} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={newMerchantName}
                  onChange={(e) => setNewMerchantName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                <input 
                  type="text" 
                  value={newMerchantCountry}
                  onChange={(e) => setNewMerchantCountry(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                  placeholder="e.g. US, UK, SG"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
                  Save Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Merchant Modal */}
      {isUpdateModalOpen && merchantToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Update Merchant</h2>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateMerchant} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={merchantToUpdate.name}
                  onChange={(e) => setMerchantToUpdate({...merchantToUpdate, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                <input 
                  type="text" 
                  value={merchantToUpdate.country}
                  onChange={(e) => setMerchantToUpdate({...merchantToUpdate, country: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                  Update Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merchants;
