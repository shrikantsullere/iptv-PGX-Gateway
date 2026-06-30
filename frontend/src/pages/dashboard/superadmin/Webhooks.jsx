import { useState } from 'react';
import { Webhook, Activity, Plus, Search, CheckCircle2, XCircle, X } from 'lucide-react';

export default function Webhooks() {
  const [logs, setLogs] = useState([
    { event: 'merchant.created', endpoint: 'https://api.internal.com/hooks', status: 200, time: '1 min ago' },
    { event: 'transaction.failed', endpoint: 'https://api.internal.com/hooks', status: 200, time: '5 mins ago' },
    { event: 'settlement.processed', endpoint: 'https://api.internal.com/hooks', status: 500, time: '1 hour ago' },
    { event: 'processor.failover', endpoint: 'https://api.internal.com/hooks', status: 200, time: '3 hours ago' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEndpoint = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const endpointUrl = formData.get('endpoint');
    const eventType = formData.get('event');
    
    // Add a mock active log for the new endpoint
    const newLog = {
      event: eventType === '*' ? 'all_events' : eventType,
      endpoint: endpointUrl,
      status: 200,
      time: 'Just now'
    };
    
    setLogs([newLog, ...logs]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Webhook className="w-8 h-8 text-[#7C3AED]" /> Global Webhooks
          </h1>
          <p className="text-gray-400 mt-1">Manage system-wide event streams and endpoint deliveries.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Endpoint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
           <div>
             <p className="text-gray-400 text-xs font-bold uppercase mb-1">Active Endpoints</p>
             <h3 className="text-3xl font-black text-white">4</h3>
           </div>
           <Webhook className="w-8 h-8 text-blue-500 opacity-50" />
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
           <div>
             <p className="text-gray-400 text-xs font-bold uppercase mb-1">Deliveries (24h)</p>
             <h3 className="text-3xl font-black text-white">12,492</h3>
           </div>
           <Activity className="w-8 h-8 text-[#7C3AED] opacity-50" />
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
           <div>
             <p className="text-gray-400 text-xs font-bold uppercase mb-1">Failure Rate</p>
             <h3 className="text-3xl font-black text-red-500">0.02%</h3>
           </div>
           <XCircle className="w-8 h-8 text-red-500 opacity-50" />
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <h3 className="text-lg font-bold text-white">Recent Deliveries</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Event Type</th>
              <th className="p-4">Target URL</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-gray-300 font-mono text-xs">{log.event}</td>
                <td className="p-4 text-gray-500 font-mono text-xs">{log.endpoint}</td>
                <td className="p-4 text-center">
                  {log.status === 200 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold"><CheckCircle2 className="w-3 h-3"/> 200 OK</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-500 rounded text-xs font-bold"><XCircle className="w-3 h-3"/> 500 ERR</span>
                  )}
                </td>
                <td className="p-4 text-right text-gray-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Add Webhook Endpoint</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddEndpoint} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Endpoint URL</label>
                <input name="endpoint" type="url" required placeholder="https://your-domain.com/webhook" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Event Type</label>
                <select name="event" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option value="*">All Events (*)</option>
                  <option value="merchant.created">merchant.created</option>
                  <option value="transaction.failed">transaction.failed</option>
                  <option value="settlement.processed">settlement.processed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Secret Key (Optional)</label>
                <input name="secret" type="text" placeholder="Leave blank to auto-generate" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors">
                  Save Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
