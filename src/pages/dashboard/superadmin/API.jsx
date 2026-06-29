import { useState } from 'react';
import { Code, Key, Copy, RefreshCw, ShieldAlert, Zap } from 'lucide-react';

export default function API() {
  const [keys] = useState([
    { name: 'Gateway Production Key', key: 'pk_live_8f92j...x92j', env: 'Production', created: '2023-10-12', lastUsed: '2 mins ago' },
    { name: 'Sandbox Testing Key', key: 'pk_test_3m9k2...k20m', env: 'Sandbox', created: '2023-10-12', lastUsed: '5 hrs ago' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Code className="w-8 h-8 text-[#7C3AED]" /> Master API Access
          </h1>
          <p className="text-gray-400 mt-1">SuperAdmin API keys for external system integrations.</p>
        </div>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all">
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
            {keys.map((k, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{k.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${k.env === 'Production' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {k.env}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 bg-[#09090B] px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                    <span className="font-mono text-gray-400">{k.key}</span>
                    <button className="text-gray-500 hover:text-white"><Copy className="w-4 h-4" /></button>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{k.lastUsed}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><RefreshCw className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
