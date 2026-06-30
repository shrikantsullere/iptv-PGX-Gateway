import { Webhook, Plus, CheckCircle2, XCircle, X } from 'lucide-react';
import { useState } from 'react';

const mockLogs = Array(5).fill(null).map((_, i) => ({
  id: `evt_${83726 + i}`,
  event: ['payment.created', 'payment.failed', 'payout.processed'][Math.floor(Math.random() * 3)],
  url: 'https://api.acme.com/webhooks/pgx',
  status: ['200 OK', '500 Error'][Math.floor(Math.random() * 2)],
  time: `${i * 15} mins ago`,
}));

const Webhooks = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [endpointUrl, setEndpointUrl] = useState('');
  
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Webhook className="w-8 h-8 text-pink-500" /> Webhooks
              </h1>
              <p className="text-gray-400">Receive real-time HTTP notifications for events.</p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition-all font-bold"
            >
              <Plus className="w-4 h-4" /> Add Endpoint
            </button>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Configured Endpoints</h3>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-white">https://api.acme.com/webhooks/pgx</span>
                  <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Active</span>
                </div>
                <p className="text-xs text-gray-500">Listening to: payment.*, payout.*</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-lg font-bold">Recent Delivery Logs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Event ID</th>
                    <th className="p-4 font-medium">Event Type</th>
                    <th className="p-4 font-medium">Endpoint</th>
                    <th className="p-4 font-medium">Response</th>
                    <th className="p-4 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {mockLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                      <td className="p-4 text-gray-400 font-mono text-xs">{log.id}</td>
                      <td className="p-4 font-bold text-white">{log.event}</td>
                      <td className="p-4 text-gray-400 text-xs">{log.url}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
                          log.status.includes('200') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {log.status.includes('200') ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 text-xs">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Endpoint Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold">Add Webhook Endpoint</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Endpoint URL</label>
                <input 
                  type="url" 
                  placeholder="https://your-domain.com/webhooks"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Events to send</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" />
                    <div>
                      <div className="text-sm font-medium text-white">payment.*</div>
                      <div className="text-xs text-gray-500">All payment related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" />
                    <div>
                      <div className="text-sm font-medium text-white">payout.*</div>
                      <div className="text-xs text-gray-500">All payout related events</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/20">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors font-medium">
                Add Endpoint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Endpoint Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold">Edit Webhook Endpoint</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Endpoint URL</label>
                <input 
                  type="url" 
                  defaultValue="https://api.acme.com/webhooks/pgx"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Events to send</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" />
                    <div>
                      <div className="text-sm font-medium text-white">payment.*</div>
                      <div className="text-xs text-gray-500">All payment related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" />
                    <div>
                      <div className="text-sm font-medium text-white">payout.*</div>
                      <div className="text-xs text-gray-500">All payout related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" />
                    <div>
                      <div className="text-sm font-medium text-white">dispute.*</div>
                      <div className="text-xs text-gray-500">All dispute related events</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium text-sm">
                Delete Endpoint
              </button>
              <div className="flex gap-3">
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Webhooks;
