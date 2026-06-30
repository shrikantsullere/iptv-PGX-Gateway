import { useState } from 'react';
import { Mail, Shield, Trash2, Edit2 } from 'lucide-react';

const TeamMembers = () => {
  const members = [
    { name: 'Alice Admin', email: 'alice@acmecorp.com', role: 'Owner', status: 'Active' },
    { name: 'Bob Finance', email: 'bob@acmecorp.com', role: 'Finance', status: 'Active' },
    { name: 'Charlie Dev', email: 'charlie@acmecorp.com', role: 'Developer', status: 'Pending' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Team Members</h1>
          <p className="text-gray-400 text-sm mt-1">Manage access control and invite your team.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Invite Member */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl h-fit">
          <h3 className="text-lg font-bold text-white mb-6">Invite Member</h3>
          <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
               <div className="relative">
                 <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                 <input type="email" placeholder="colleague@company.com" className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm" />
               </div>
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Role</label>
               <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm">
                 <option>Admin</option>
                 <option>Finance</option>
                 <option>Developer</option>
                 <option>Support</option>
               </select>
             </div>
             <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-2.5 rounded-lg transition-colors">
               Send Invite
             </button>
          </div>
        </div>

        {/* Member List */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl shadow-xl">
           <div className="p-4 border-b border-white/5">
             <h3 className="text-lg font-bold text-white">Active Users</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/5 bg-white/[0.02]">
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {members.map((m, i) => (
                   <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                     <td className="p-4">
                       <div className="flex flex-col">
                         <span className="font-bold text-white">{m.name}</span>
                         <span className="text-xs text-gray-500">{m.email}</span>
                       </div>
                     </td>
                     <td className="p-4">
                       <span className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 bg-white/5 px-2 py-1 rounded-md w-fit">
                         <Shield className="w-3 h-3 text-[#7C3AED]" /> {m.role}
                       </span>
                     </td>
                     <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          m.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {m.status}
                        </span>
                     </td>
                     <td className="p-4 text-right flex justify-end gap-2">
                        {m.role !== 'Owner' && (
                          <>
                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                            <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </>
                        )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TeamMembers;
