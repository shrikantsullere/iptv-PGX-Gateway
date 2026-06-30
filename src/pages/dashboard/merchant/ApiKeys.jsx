import { Key, Eye, EyeOff, Copy, RefreshCw, Trash2, Plus, X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const ApiKeys = () => {
  const [showKey, setShowKey] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isRollModalOpen, setIsRollModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  
  const [newKeyName, setNewKeyName] = useState('');

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Key className="w-8 h-8 text-primary" /> API Keys
              </h1>
              <p className="text-gray-400">Manage your secret keys for API authentication.</p>
            </div>
            <button 
              onClick={() => setIsGenerateModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl transition-all font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              <Plus className="w-4 h-4" /> Generate New Key
            </button>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold mb-1">Production Keys</h3>
            <p className="text-sm text-gray-500 mb-6">These keys allow live transactions. Keep them secure.</p>
            
            <div className="space-y-4">
              <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold">Main Production Key</span>
                    <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1.5 rounded-lg flex-1 md:flex-none">
                      {showKey ? 'pk_live_8f92j3n4v...x9q01k2' : 'pk_live_*******************'}
                    </code>
                    <button onClick={() => setShowKey(!showKey)} className="p-1.5 text-gray-500 hover:text-white transition-colors">
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Created on May 12, 2025 • Last used 2 mins ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsRollModalOpen(true)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Roll Key
                  </button>
                  <button 
                    onClick={() => setIsRevokeModalOpen(true)}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-500 mb-2">Need API Documentation?</h3>
            <p className="text-sm text-gray-400 mb-4">Learn how to integrate PGX Gateway into your application, use our SDKs, and verify webhook signatures.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
              View Developer Docs
            </button>
          </div>

        </div>
      </div>

      {/* Generate Key Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold">Generate New API Key</h3>
              <button onClick={() => setIsGenerateModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Key Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mobile App Production"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Environment</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="env" defaultChecked className="text-primary focus:ring-primary bg-black/50 border-white/10" />
                    <span className="text-sm">Production</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="env" className="text-primary focus:ring-primary bg-black/50 border-white/10" />
                    <span className="text-sm text-gray-400">Sandbox</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/20">
              <button onClick={() => setIsGenerateModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => setIsGenerateModalOpen(false)} className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white transition-colors font-medium">
                Generate Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roll Key Modal */}
      {isRollModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold flex items-center gap-2"><RefreshCw className="w-5 h-5 text-blue-500" /> Roll API Key</h3>
              <button onClick={() => setIsRollModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm mb-4">
                Rolling this key will generate a new secret. The old key will remain active for <strong className="text-white">24 hours</strong> to give you time to update your integration.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-200">After 24 hours, any API requests using the old key will be rejected.</p>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/20">
              <button onClick={() => setIsRollModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => setIsRollModalOpen(false)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium">
                Roll Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Key Modal */}
      {isRevokeModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13131A] border border-red-500/20 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold flex items-center gap-2"><Trash2 className="w-5 h-5 text-red-500" /> Revoke API Key</h3>
              <button onClick={() => setIsRevokeModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm mb-4">
                Are you sure you want to revoke this API key? This action <strong>cannot be undone</strong>.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-200">Any integrations currently using this key will immediately stop working and transactions will fail.</p>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/20">
              <button onClick={() => setIsRevokeModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={() => setIsRevokeModalOpen(false)} className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-medium">
                Yes, Revoke Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApiKeys;
