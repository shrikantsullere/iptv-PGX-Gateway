import { useState } from 'react';
import { Palette, Search, Globe, CheckCircle2, XCircle } from 'lucide-react';

export default function WhiteLabel() {
  const [requests] = useState([
    { merchant: 'Acme Digital', domain: 'pay.acme.com', ssl: 'Active', status: 'Approved' },
    { merchant: 'Global Tech', domain: 'checkout.globaltech.io', ssl: 'Provisioning', status: 'Pending Review' },
    { merchant: 'Scam Casino', domain: 'pay.fakesite.net', ssl: 'Failed', status: 'Rejected' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = requests.filter(r => 
    r.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.domain.toLowerCase().includes(searchQuery.toLowerCase())
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
            {filteredRequests.map((r, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{r.merchant}</td>
                <td className="p-4 text-cyan-500 font-mono flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {r.domain}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    r.ssl === 'Active' ? 'bg-green-500/10 text-green-500' :
                    r.ssl === 'Provisioning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {r.ssl}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                    r.status === 'Approved' ? 'border-green-500/30 text-green-500' :
                    r.status === 'Pending Review' ? 'border-yellow-500/30 text-yellow-500' : 'border-red-500/30 text-red-500'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  {r.status === 'Pending Review' && (
                    <>
                      <button className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-lg"><CheckCircle2 className="w-5 h-5" /></button>
                      <button className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg"><XCircle className="w-5 h-5" /></button>
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
