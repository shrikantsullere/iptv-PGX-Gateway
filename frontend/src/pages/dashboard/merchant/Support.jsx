import { HelpCircle, MessageSquare, Plus, X } from 'lucide-react';
import { useState } from 'react';

const mockTickets = Array(4).fill(null).map((_, i) => ({
  id: `TKT-${100 + i}`,
  subject: ['API Integration Issue', 'Billing Question', 'Webhook not firing', 'Change Account Email'][Math.floor(Math.random() * 4)],
  status: ['Open', 'In Progress', 'Resolved'][Math.floor(Math.random() * 3)],
  updated: `${i + 1} hours ago`,
}));

const Support = () => {
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" /> Support Center
              </h1>
              <p className="text-gray-400">Get help, read documentation, or contact our team.</p>
            </div>
            <button 
              onClick={() => setIsNewTicketModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl transition-all font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              <Plus className="w-4 h-4" /> New Ticket
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-lg font-bold">Your Tickets</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                      <th className="p-4 font-medium">Ticket ID</th>
                      <th className="p-4 font-medium">Subject</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    {mockTickets.map((tkt, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                        <td className="p-4 font-mono text-xs">{tkt.id}</td>
                        <td className="p-4 font-bold text-white">{tkt.subject}</td>
                        <td className="p-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            tkt.status === 'Resolved' ? 'bg-green-500/10 text-green-500' :
                            tkt.status === 'Open' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {tkt.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 text-right text-xs">{tkt.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-primary mb-2">Dedicated Manager</h3>
                <p className="text-sm text-gray-400 mb-4">As an Enterprise merchant, you have a dedicated account manager available 24/7.</p>
                <div className="flex items-center gap-3 bg-black/50 p-3 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">MS</div>
                  <div>
                    <div className="font-bold">Michael Scott</div>
                    <div className="text-xs text-gray-500">michael@pgxgateway.com</div>
                  </div>
                </div>
              </div>
              <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2">Documentation</h3>
                <p className="text-sm text-gray-400 mb-4">Find answers quickly in our comprehensive knowledge base.</p>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl border border-white/10 transition-colors font-medium">
                  Browse Help Center
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/5 shrink-0">
              <h3 className="text-xl font-bold">Create New Ticket</h3>
              <button onClick={() => setIsNewTicketModalOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cannot process refunds"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none text-sm sm:text-base">
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Inquiry</option>
                  <option value="account">Account Management</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Message</label>
                <textarea 
                  rows="4"
                  placeholder="Describe your issue in detail..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none text-sm sm:text-base"
                ></textarea>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-white/5 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-black/20 shrink-0">
              <button onClick={() => setIsNewTicketModalOpen(false)} className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => setIsNewTicketModalOpen(false)} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white transition-colors font-medium">
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Support;
