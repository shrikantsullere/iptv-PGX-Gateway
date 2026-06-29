import { Key, Eye, EyeOff, Copy, RefreshCw, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

const ApiKeys = () => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Key className="w-8 h-8 text-primary" /> API Keys
              </h1>
              <p className="text-gray-400">Manage your secret keys for API authentication.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl transition-all font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)]">
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
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4" /> Roll Key
                  </button>
                  <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors">
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
    </div>
  );
};

export default ApiKeys;
