import { useState, useEffect } from 'react';
import { Palette, Search, Globe, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function WhiteLabel() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/whitelabel');
      if (res.success && res.data) {
        setRequests(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch white-label requests', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      setActionLoading(id);
      await apiClient.put(`/admin/whitelabel/${id}/${action}`);
      await fetchRequests();
    } catch (error) {
      console.error(`Failed to ${action} request`, error);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = requests.filter(r => 
    r.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.requestedDomain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Palette className="w-8 h-8 text-[#7C3AED]" /> White-Label Approvals
          </h1>
          <p className="text-gray-400 mt-1">Review and approve custom domains and SSL requests for Enterprise merchants.</p>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by merchant or domain..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" 
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Merchant</th>
              <th className="p-4">Requested Domain</th>
              <th className="p-4">SSL Status</th>
              <th className="p-4">Approval Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                  Loading requests...
                </td>
              </tr>
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No white-label requests found.</td>
              </tr>
            ) : filteredRequests.map((r) => (
              <tr key={r.requestId} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{r.merchantName}</td>
                <td className="p-4 text-cyan-500 font-mono flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {r.requestedDomain}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    r.sslStatus === 'Active' ? 'bg-green-500/10 text-green-500' :
                    r.sslStatus === 'Provisioning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {r.sslStatus}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                    r.approvalStatus === 'APPROVED' ? 'border-green-500/30 text-green-500' :
                    r.approvalStatus === 'PENDING REVIEW' ? 'border-yellow-500/30 text-yellow-500' : 'border-red-500/30 text-red-500'
                  }`}>
                    {r.approvalStatus}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  {r.approvalStatus === 'PENDING REVIEW' && (
                    <>
                      <button onClick={() => handleAction(r.requestId, 'approve')} disabled={actionLoading === r.requestId} className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50">
                        {actionLoading === r.requestId ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                      </button>
                      <button onClick={() => handleAction(r.requestId, 'reject')} disabled={actionLoading === r.requestId} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50">
                         {actionLoading === r.requestId ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
