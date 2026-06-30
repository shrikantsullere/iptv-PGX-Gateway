import { useState } from 'react';
import { Mail, Shield, Trash2, Edit2, X, CheckCircle2, Loader2 } from 'lucide-react';

const TeamMembers = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Alice Admin', email: 'alice@acmecorp.com', role: 'Owner', status: 'Active' },
    { id: 2, name: 'Bob Finance', email: 'bob@acmecorp.com', role: 'Finance', status: 'Active' },
    { id: 3, name: 'Charlie Dev', email: 'charlie@acmecorp.com', role: 'Developer', status: 'Pending' },
  ]);

  // Invite Form States
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Admin');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      setInviteSuccess(true);
      const newMember = {
        id: Date.now(),
        name: 'New User',
        email: inviteEmail,
        role: inviteRole,
        status: 'Pending'
      };
      setMembers([...members, newMember]);
      setTimeout(() => {
        setInviteEmail('');
        setInviteRole('Admin');
        setInviteSuccess(false);
      }, 2000);
    }, 1000);
  };

  const openEdit = (member) => {
    setEditMember({ ...member });
    setIsEditModalOpen(true);
  };

  const saveEdit = () => {
    setMembers(members.map(m => m.id === editMember.id ? editMember : m));
    setIsEditModalOpen(false);
  };

  const openDelete = (member) => {
    setDeleteMember(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setMembers(members.filter(m => m.id !== deleteMember.id));
    setIsDeleteModalOpen(false);
  };

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
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl h-fit relative overflow-hidden">
          {inviteSuccess ? (
            <div className="absolute inset-0 bg-[#13131A] z-10 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                 <CheckCircle2 className="w-8 h-8 text-green-500" />
               </div>
               <h3 className="text-lg font-bold text-white mb-1">Invite Sent!</h3>
               <p className="text-gray-400 text-sm">An email has been sent to {inviteEmail}.</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white mb-6">Invite Member</h3>
              <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                   <div className="relative">
                     <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input 
                       type="email" 
                       value={inviteEmail}
                       onChange={(e) => setInviteEmail(e.target.value)}
                       placeholder="colleague@company.com" 
                       className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm transition-colors" 
                     />
                   </div>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Role</label>
                   <select 
                     value={inviteRole}
                     onChange={(e) => setInviteRole(e.target.value)}
                     className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm transition-colors appearance-none"
                   >
                     <option>Admin</option>
                     <option>Finance</option>
                     <option>Developer</option>
                     <option>Support</option>
                   </select>
                 </div>
                 <button 
                   onClick={handleInvite}
                   disabled={!inviteEmail.trim() || isInviting}
                   className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                   {isInviting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Invite'}
                 </button>
              </div>
            </>
          )}
        </div>

        {/* Member List */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col min-h-[400px]">
           <div className="p-4 border-b border-white/5 flex justify-between items-center">
             <h3 className="text-lg font-bold text-white">Active Users</h3>
             <span className="text-xs font-bold text-gray-500 bg-white/5 px-2.5 py-1 rounded-md">{members.length} Members</span>
           </div>
           <div className="overflow-x-auto flex-1">
             <table className="w-full text-left border-collapse min-w-[500px]">
               <thead>
                 <tr className="border-b border-white/5 bg-white/[0.02]">
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                   <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {members.length === 0 ? (
                   <tr>
                     <td colSpan="4" className="p-8 text-center text-gray-500 text-sm">No team members found.</td>
                   </tr>
                 ) : (
                   members.map((m) => (
                     <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
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
                              <button onClick={() => openEdit(m)} className="p-2 hover:bg-[#7C3AED]/20 rounded-lg text-gray-500 hover:text-[#7C3AED] transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => openDelete(m)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </>
                          )}
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit Team Member</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                <input 
                  type="text" 
                  value={editMember.name}
                  onChange={(e) => setEditMember({...editMember, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Role</label>
                <select 
                  value={editMember.role}
                  onChange={(e) => setEditMember({...editMember, role: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm transition-colors appearance-none"
                >
                  <option>Admin</option>
                  <option>Finance</option>
                  <option>Developer</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                <select 
                  value={editMember.status}
                  onChange={(e) => setEditMember({...editMember, status: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none text-sm transition-colors appearance-none"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-white/5 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={saveEdit} className="px-6 py-2.5 text-sm font-bold bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && deleteMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-red-500 flex items-center gap-2"><Trash2 className="w-5 h-5" /> Remove Member</h3>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-white">{deleteMember.email}</span> from your team? They will immediately lose all access to the PGX Gateway dashboard.
              </p>
              <p className="text-gray-500 text-xs mt-4">This action cannot be undone.</p>
            </div>
            <div className="p-4 border-t border-white/5 flex justify-end gap-3 bg-[#09090B] rounded-b-2xl">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-6 py-2.5 text-sm font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg transition-colors">Yes, Remove</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeamMembers;
