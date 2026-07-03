import { Webhook, Plus, CheckCircle2, XCircle, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import apiClient from '../../../utils/apiClient';

const Webhooks = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [endpointUrl, setEndpointUrl] = useState('');
  const [endpoints, setEndpoints] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState({ payment: true, payout: true, dispute: false });

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/merchant/webhooks');
      if (res.success && res.data) {
        setEndpoints(res.data.endpoints || []);
        setLogs(res.data.logs || []);
      }
    } catch (err) {
      console.error('Failed to fetch webhooks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEndpoint = async () => {
    if (!endpointUrl) return;
    try {
      setActionLoading(true);
      const events = [];
      if (selectedEvents.payment) events.push('payment.*');
      if (selectedEvents.payout) events.push('payout.*');
      if (selectedEvents.dispute) events.push('dispute.*');

      const res = await apiClient.post('/merchant/webhooks', { endpointUrl, events });
      if (res.success) {
        setIsAddModalOpen(false);
        setEndpointUrl('');
        fetchWebhooks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditEndpoint = async () => {
    if (!endpointUrl || !currentEditId) return;
    try {
      setActionLoading(true);
      const events = [];
      if (selectedEvents.payment) events.push('payment.*');
      if (selectedEvents.payout) events.push('payout.*');
      if (selectedEvents.dispute) events.push('dispute.*');

      const res = await apiClient.put(`/merchant/webhooks/${currentEditId}`, { endpointUrl, events });
      if (res.success) {
        setIsEditModalOpen(false);
        setEndpointUrl('');
        setCurrentEditId(null);
        fetchWebhooks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEndpoint = async () => {
    if (!currentEditId) return;
    try {
      setActionLoading(true);
      const res = await apiClient.delete(`/merchant/webhooks/${currentEditId}`);
      if (res.success) {
        setIsEditModalOpen(false);
        setEndpointUrl('');
        setCurrentEditId(null);
        fetchWebhooks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const openAddModal = () => {
    setEndpointUrl('');
    setSelectedEvents({ payment: true, payout: true, dispute: false });
    setIsAddModalOpen(true);
  };

  const openEditModal = (ep) => {
    setCurrentEditId(ep.endpointId);
    setEndpointUrl(ep.endpointUrl);
    const ev = ep.eventType || '';
    setSelectedEvents({
      payment: ev.includes('payment'),
      payout: ev.includes('payout'),
      dispute: ev.includes('dispute')
    });
    setIsEditModalOpen(true);
  };
  
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
              onClick={openAddModal}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition-all font-bold"
            >
              <Plus className="w-4 h-4" /> Add Endpoint
            </button>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Configured Endpoints</h3>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
              </div>
            ) : endpoints.length === 0 ? (
              <div className="text-center text-gray-500 py-6">No endpoints configured yet.</div>
            ) : (
              <div className="space-y-4">
                {endpoints.map((ep) => (
                  <div key={ep.endpointId} className="bg-black/50 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-white">{ep.endpointUrl}</span>
                        <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">{ep.status}</span>
                      </div>
                      <p className="text-xs text-gray-500">Listening to: {ep.eventType}</p>
                    </div>
                    <button 
                      onClick={() => openEditModal(ep)}
                      className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin text-pink-500 mx-auto" /></td>
                    </tr>
                  ) : logs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">No logs available.</td>
                    </tr>
                  ) : logs.map((log, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                      <td className="p-4 text-gray-400 font-mono text-xs">{log.deliveryId ? log.deliveryId.split('-')[0] : `evt_${i}`}</td>
                      <td className="p-4 font-bold text-white">{log.eventType}</td>
                      <td className="p-4 text-gray-400 text-xs">{endpoints.find(e => e.endpointId === log.endpointId)?.endpointUrl || 'Unknown Endpoint'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
                          log.status.includes('200') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {log.status.includes('200') ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 text-xs">{new Date(log.deliveredAt).toLocaleString()}</td>
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/5 shrink-0">
              <h3 className="text-xl font-bold">Add Webhook Endpoint</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Endpoint URL</label>
                <input 
                  type="url" 
                  placeholder="https://your-domain.com/webhooks"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Events to send</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedEvents.payment}
                      onChange={(e) => setSelectedEvents({...selectedEvents, payment: e.target.checked})}
                      className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">payment.*</div>
                      <div className="text-xs text-gray-500">All payment related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedEvents.payout}
                      onChange={(e) => setSelectedEvents({...selectedEvents, payout: e.target.checked})}
                      className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">payout.*</div>
                      <div className="text-xs text-gray-500">All payout related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedEvents.dispute}
                      onChange={(e) => setSelectedEvents({...selectedEvents, dispute: e.target.checked})}
                      className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">dispute.*</div>
                      <div className="text-xs text-gray-500">All dispute related events</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-white/5 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-black/20 shrink-0">
              <button onClick={() => setIsAddModalOpen(false)} className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={handleAddEndpoint} disabled={actionLoading} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors font-medium flex justify-center items-center">
                {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add Endpoint'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Endpoint Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/5 shrink-0">
              <h3 className="text-xl font-bold">Edit Webhook Endpoint</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Endpoint URL</label>
                <input 
                  type="url" 
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Events to send</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedEvents.payment}
                      onChange={(e) => setSelectedEvents({...selectedEvents, payment: e.target.checked})}
                      className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">payment.*</div>
                      <div className="text-xs text-gray-500">All payment related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedEvents.payout}
                      onChange={(e) => setSelectedEvents({...selectedEvents, payout: e.target.checked})}
                      className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">payout.*</div>
                      <div className="text-xs text-gray-500">All payout related events</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedEvents.dispute}
                      onChange={(e) => setSelectedEvents({...selectedEvents, dispute: e.target.checked})}
                      className="w-4 h-4 text-pink-500 rounded border-white/10 bg-black/50 focus:ring-pink-500 focus:ring-offset-gray-900" 
                    />
                    <div>
                      <div className="text-sm font-medium text-white">dispute.*</div>
                      <div className="text-xs text-gray-500">All dispute related events</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20 shrink-0">
              <button onClick={handleDeleteEndpoint} disabled={actionLoading} className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium text-sm sm:text-base order-last sm:order-first flex justify-center items-center">
                Delete Endpoint
              </button>
              <div className="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                <button onClick={() => setIsEditModalOpen(false)} className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleEditEndpoint} disabled={actionLoading} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors font-medium flex justify-center items-center">
                  {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
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
