import { useState } from 'react';
import { Fingerprint, Check, X, FileText, Search } from 'lucide-react';

const KYC = () => {
  const kycRequests = [
    { id: 'KYC-5012', company: 'Global Tech LLC', type: 'Corporate', status: 'Pending', submitted: '2 hours ago' },
    { id: 'KYC-5011', company: 'Acme Trading', type: 'Corporate', status: 'Pending', submitted: '5 hours ago' },
    { id: 'KYC-5010', company: 'Digital Store', type: 'Individual', status: 'Approved', submitted: '1 day ago' },
    { id: 'KYC-5009', company: 'Crypto Pay', type: 'Corporate', status: 'Rejected', submitted: '2 days ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">KYC Management</h1>
          <p className="text-gray-400 text-sm mt-1">Review and approve merchant identity documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Verification Queue */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col">
          <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
             <h3 className="text-lg font-bold text-white">Verification Queue</h3>
             <div className="relative w-64">
               <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
               <input type="text" placeholder="Search applications..." className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#7C3AED] outline-none" />
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/5 bg-white/[0.02]">
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">App ID</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {kycRequests.map((req, i) => (
                   <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                     <td className="p-4 text-sm font-mono text-[#7C3AED]">{req.id}</td>
                     <td className="p-4 font-bold text-white group-hover:text-[#7C3AED] transition-colors">{req.company}</td>
                     <td className="p-4 text-sm text-gray-400">{req.type}</td>
                     <td className="p-4">
                       <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                         req.status === 'Approved' ? 'bg-green-500/10 text-green-500' :
                         req.status === 'Rejected' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                       }`}>
                         {req.status}
                       </span>
                     </td>
                     <td className="p-4 text-sm text-gray-400">{req.submitted}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Document Review Panel (Simulated Active State) */}
        <div className="bg-[#13131A] border border-[#7C3AED]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(124,58,237,0.1)] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center border border-[#7C3AED]/30">
              <Fingerprint className="w-5 h-5 text-[#7C3AED]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Global Tech LLC</h3>
              <div className="text-xs text-gray-400">KYC-5012</div>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <FileText className="w-5 h-5 text-gray-400" />
                 <div><div className="text-sm font-bold text-white">Certificate of Incorporation</div><div className="text-[10px] text-gray-500">PDF • 2.4 MB</div></div>
               </div>
               <button className="text-cyan-400 text-xs font-bold hover:underline">View</button>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <FileText className="w-5 h-5 text-gray-400" />
                 <div><div className="text-sm font-bold text-white">Director ID (Passport)</div><div className="text-[10px] text-gray-500">JPG • 1.1 MB</div></div>
               </div>
               <button className="text-cyan-400 text-xs font-bold hover:underline">View</button>
            </div>
            
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Match Score</span><span className="font-bold text-green-500">98% High</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">AML Check</span><span className="font-bold text-green-500">Passed</span></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
             <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-2.5 rounded-lg border border-red-500/20 transition-colors flex items-center justify-center gap-2">
                <X className="w-4 h-4" /> Reject
             </button>
             <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Approve
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KYC;
