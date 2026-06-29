import { useState } from 'react';
import { UserCog, Plus, Shield, Check, X } from 'lucide-react';

export default function Roles() {
  const [roles] = useState([
    { name: 'Super Administrator', users: 2, access: 'Full System Access', risk: 'Critical' },
    { name: 'Financial Controller', users: 5, access: 'Read-only + Settlements + Reports', risk: 'High' },
    { name: 'Support Agent', users: 14, access: 'Tickets + Basic Merchant Data', risk: 'Low' },
    { name: 'Compliance Officer', users: 3, access: 'KYC/AML Modules Only', risk: 'Medium' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <UserCog className="w-8 h-8 text-[#7C3AED]" /> Admin Roles & Access
          </h1>
          <p className="text-gray-400 mt-1">Manage RBAC (Role-Based Access Control) for internal PGX staff.</p>
        </div>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roles.map((r, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-white mb-2">{r.name}</h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{r.access}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-300">{r.users} Users</span>
              <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                r.risk === 'Critical' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                r.risk === 'High' ? 'border-orange-500/50 text-orange-500 bg-orange-500/10' :
                r.risk === 'Medium' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                'border-green-500/50 text-green-500 bg-green-500/10'
              }`}>
                {r.risk} Risk
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
