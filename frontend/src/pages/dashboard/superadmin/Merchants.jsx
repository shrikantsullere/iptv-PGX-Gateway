import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Building2, Download, Plus, Edit, Trash, X, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const Merchants = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMerchantName, setNewMerchantName] = useState('');
  const [newMerchantEmail, setNewMerchantEmail] = useState('');
  const [newMerchantCountry, setNewMerchantCountry] = useState('');
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [merchantToUpdate, setMerchantToUpdate] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(merchants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMerchants = merchants.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/merchants');
      if (res.success) {
        setMerchants(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch merchants');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMerchant = async (e) => {
    e.preventDefault();
    if (!newMerchantName || !newMerchantEmail) return;
    
    try {
      const payload = {
        companyName: newMerchantName,
        email: newMerchantEmail,
        country: newMerchantCountry || 'US'
      };
      const res = await apiClient.post('/admin/merchants', payload);
      if (res.success) {
        setMerchants([res.data, ...merchants]);
        setNewMerchantName('');
        setNewMerchantEmail('');
        setNewMerchantCountry('');
        setIsAddModalOpen(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating merchant');
    }
  };

  const openUpdateModal = (merchant) => {
    setMerchantToUpdate(merchant);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateMerchant = async (e) => {
    e.preventDefault();
    if (!merchantToUpdate) return;
    
    try {
      const payload = {
        companyName: merchantToUpdate.companyName,
        status: merchantToUpdate.status,
      };
      const res = await apiClient.put(`/admin/merchants/${merchantToUpdate.merchantId}`, payload);
      if (res.success) {
        setMerchants(merchants.map(m => 
          m.merchantId === merchantToUpdate.merchantId ? res.data : m
        ));
        setIsUpdateModalOpen(false);
        setMerchantToUpdate(null);
      }
    } catch (err) {
      alert('Failed to update merchant');
    }
  };

  const handleDeleteMerchant = async (id) => {
    if (!window.confirm('Are you sure you want to delete this merchant?')) return;
    try {
      const res = await apiClient.delete(`/admin/merchants/${id}`);
      if (res.success) {
        setMerchants(merchants.filter(m => m.merchantId !== id));
      }
    } catch (err) {
      alert('Failed to delete merchant');
    }
  };

  const handleExport = () => {
    const headers = ['Merchant ID', 'Company', 'Email', 'Subscription', 'Revenue', 'Status', 'Country', 'Created'];
    const csvRows = merchants.map(m => 
      [m.merchantId, `"${m.companyName}"`, `"${m.email}"`, m.subscriptionPlan, `"${m.revenue}"`, m.status, m.country, m.createdAt].join(',')
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

      <div className="bg-[#13131A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-black/20">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text"
              placeholder="Search merchants..." 
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-[#7C3AED] outline-none transition-colors"
            />
          </div>
          <button className="bg-black/50 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40 border-b border-white/5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Merchant</th>
                <th className="p-4">Email</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Status</th>
                <th className="p-4">Country</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                    Loading merchants from API...
                  </td>
                </tr>
              ) : merchants.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-400 font-medium">No merchants found in the database.</td>
                </tr>
              ) : currentMerchants.map((m) => (
                <tr key={m.merchantId} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-purple-500/10 flex items-center justify-center border border-white/5">
                        <Building2 className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#7C3AED] transition-colors">{m.companyName}</div>
                        <div className="text-xs text-gray-500">{m.merchantId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{m.email}</td>
                  <td className="p-4">
                    <span className="bg-white/5 text-gray-300 px-2.5 py-1 rounded-md text-xs font-bold border border-white/10">
                      {m.subscriptionPlan}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">${Number(m.revenue).toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <span className={`flex w-fit items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
                      m.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{m.country}</td>
                  <td className="p-4 text-sm text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openUpdateModal(m)} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors" title="Update">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteMerchant(m.merchantId)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
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
          <span>Showing {merchants.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, merchants.length)} of {merchants.length} merchants</span>
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
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  value={newMerchantEmail}
                  onChange={(e) => setNewMerchantEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                  placeholder="e.g. admin@acme.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Country Code</label>
                <input 
                  type="text" 
                  value={newMerchantCountry}
                  onChange={(e) => setNewMerchantCountry(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                  placeholder="e.g. US, UK, SG"
                  maxLength={2}
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
                  value={merchantToUpdate.companyName}
                  onChange={(e) => setMerchantToUpdate({...merchantToUpdate, companyName: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <select
                  value={merchantToUpdate.status}
                  onChange={(e) => setMerchantToUpdate({...merchantToUpdate, status: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-colors">
                  Update
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
