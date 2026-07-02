import { useState, useEffect } from 'react';
import { Code, Key, Copy, RefreshCw, ShieldAlert, Zap, X, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function API() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [revoking, setRevoking] = useState(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/settings/apikeys');
      if (res.success && res.data) {
        setKeys(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch API keys', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      keyName: formData.get('name'),
      environment: formData.get('environment')
    };

    try {
      setGenerating(true);
      await apiClient.post('/admin/settings/apikeys', payload);
      await fetchKeys();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to generate key', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleRevoke = async (keyId) => {
    try {
      setRevoking(keyId);
      await apiClient.put(`/admin/settings/apikeys/${keyId}/revoke`);
      await fetchKeys();
    } catch (error) {
      console.error('Failed to revoke key', error);
    } finally {
      setRevoking(null);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('API Key copied to clipboard!');
  };

  const timeAgo = (date) => {
    if (!date) return 'Never';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} secs ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hrs ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] w-full">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin mb-4" />
        <p className="text-gray-400 font-bold">Loading API Keys...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Code className="w-8 h-8 text-[#7C3AED]" /> Master API Access
          </h1>
          <p className="text-gray-400 mt-1">SuperAdmin API keys for external system integrations.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
          <Key className="w-4 h-4" /> Generate New Key
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none"></div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> API Usage (This Month)</h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black text-white">4.2M</span>
            <span className="text-gray-500 font-bold mb-1">/ 10M calls</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-gradient-to-r from-[#7C3AED] to-cyan-500 w-[42%]"></div>
          </div>
        </div>
        
        <div className="bg-[#13131A] border border-red-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-500" /> Security Warning</h3>
          <p className="text-sm text-gray-400">These API keys bypass merchant isolation and provide full read/write access to the entire gateway infrastructure. Never expose these keys in client-side code.</p>
        </div>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase border-b border-white/5 bg-white/[0.02]">
              <th className="p-4">Key Name</th>
              <th className="p-4">Environment</th>
              <th className="p-4">Token</th>
              <th className="p-4">Last Used</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {keys.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No active API keys found. Click 'Generate New Key' to create one.
                </td>
              </tr>
            ) : (
              keys.map((k) => (
                <tr key={k.keyId} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white">{k.keyName}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${k.environment === 'Production' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {k.environment}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 bg-[#09090B] px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                      <span className="font-mono text-gray-400">
                        {k.apiToken.substring(0, 15)}...{k.apiToken.substring(k.apiToken.length - 4)}
                      </span>
                      <button onClick={() => copyToClipboard(k.apiToken)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{timeAgo(k.lastUsedAt)}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => handleRevoke(k.keyId)} disabled={revoking === k.keyId} title="Revoke Key" className="p-2 text-gray-500 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50">
                      {revoking === k.keyId ? <Loader2 className="w-4 h-4 animate-spin"/> : <RefreshCw className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Generate API Key</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleGenerate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Key Name</label>
                <input name="name" type="text" required placeholder="e.g. Mobile App Gateway" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Environment</label>
                <select name="environment" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option>Sandbox</option>
                  <option>Production</option>
                </select>
                <p className="text-xs text-red-400 mt-2">Warning: Production keys have full access.</p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={generating} className="flex-1 flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors disabled:opacity-70">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                  {generating ? 'Generating...' : 'Generate Key'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
