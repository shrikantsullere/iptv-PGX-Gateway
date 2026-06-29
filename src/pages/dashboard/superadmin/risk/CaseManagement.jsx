import { useState } from 'react';
import { ShieldCheck, Search, Activity, AlertTriangle } from 'lucide-react';

export default function CaseManagement() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#7C3AED]" /> Case & Dispute Management
          </h1>
          <p className="text-gray-400 mt-1">Dispute and chargeback resolution ticketing system.</p>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden p-8 flex flex-col items-center justify-center text-center">
        <Activity className="w-16 h-16 text-cyan-500 mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-white mb-2">Module Active: Case & Dispute Management</h2>
        <p className="text-gray-400 max-w-md">This operational engine is currently active. Advanced UI controls are loaded from the backend configuration matrix.</p>
      </div>
      
      
<div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden mt-6">
    <div className="p-4 border-b border-white/5 flex gap-4">
        <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input type="text" placeholder="Search records..." className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#7C3AED]" />
        </div>
    </div>
    <table className="w-full text-left border-collapse">
        <thead>
        <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
            <th className="p-4">Record ID</th>
            <th className="p-4">Status</th>
            <th className="p-4">Details</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
        <tr className="hover:bg-white/[0.02]">
            <td className="p-4 font-mono font-bold text-gray-400">REC-9821</td>
            <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-500">Active</span></td>
            <td className="p-4 text-gray-300">System processed successfully.</td>
        </tr>
        <tr className="hover:bg-white/[0.02]">
            <td className="p-4 font-mono font-bold text-gray-400">REC-9820</td>
            <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-yellow-500/10 text-yellow-500">Pending</span></td>
            <td className="p-4 text-gray-300">Awaiting secondary validation.</td>
        </tr>
        <tr className="hover:bg-white/[0.02]">
            <td className="p-4 font-mono font-bold text-gray-400">REC-9819</td>
            <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-500">Failed</span></td>
            <td className="p-4 text-gray-300">Validation error code 400.</td>
        </tr>
        </tbody>
    </table>
</div>

    </div>
  );
}
