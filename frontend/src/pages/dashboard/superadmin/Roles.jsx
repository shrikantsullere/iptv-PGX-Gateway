import { useState, useEffect } from 'react';
import { UserCog, Plus, Shield, Check, X, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/roles');
      if (res.success && res.data) {
        setRoles(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch roles', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      roleName: formData.get('name'),
      description: formData.get('access'),
      riskProfile: formData.get('risk'),
      permissions: ['read', 'write'] // Default mock permissions
    };
    
    try {
      setCreating(true);
      const res = await apiClient.post('/admin/roles', payload);
      if (res.success) {
        await fetchRoles(); // refresh from backend
        setIsModalOpen(false);
      }
    } catch (error) {
      alert('Failed to create role');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <UserCog className="w-8 h-8 text-[#7C3AED]" /> Admin Roles & Access
          </h1>
          <p className="text-gray-400 mt-1">Manage RBAC (Role-Based Access Control) for internal PGX staff.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 space-y-4">
          <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
          <p className="text-gray-400 font-bold">Fetching Access Rules...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {roles.length === 0 ? (
             <div className="col-span-4 text-center text-gray-500 py-10">No custom roles defined. Click 'Create Role' to add one.</div>
          ) : roles.map((r) => (
            <div key={r.roleId} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-white/10 transition-colors cursor-pointer group">
              <div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#7C3AED] transition-colors">{r.roleName}</h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">{r.description || 'No description provided'}</p>
                
                <div className="mt-4 flex gap-2">
                   <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                     r.riskProfile === 'Critical' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                     r.riskProfile === 'High' ? 'border-orange-500/50 text-orange-500 bg-orange-500/10' :
                     r.riskProfile === 'Medium' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                     'border-green-500/50 text-green-500 bg-green-500/10'
                   }`}>
                     {r.riskProfile} Risk
                   </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-300">Active</span>
                <span className="px-2 py-1 rounded text-[10px] uppercase font-bold border border-green-500/50 text-green-500 bg-green-500/10">
                  Secure
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Create Admin Role</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Role Name</label>
                <input name="name" type="text" required placeholder="e.g. Risk Analyst" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Access Level Description</label>
                <input name="access" type="text" required placeholder="e.g. Fraud + Disputes Only" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Risk Profile</label>
                <select name="risk" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                  <option value="Critical">Critical Risk</option>
                </select>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={creating} className="flex-1 flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors disabled:opacity-50">
                  {creating ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                  {creating ? 'Creating...' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
