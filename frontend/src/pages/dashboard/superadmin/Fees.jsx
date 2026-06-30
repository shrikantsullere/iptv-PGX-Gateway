import { useState } from 'react';
import { Receipt, Save, Plus, X, CheckCircle2 } from 'lucide-react';

const Fees = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [gatewaySaving, setGatewaySaving] = useState(false);
  const [processorSaving, setProcessorSaving] = useState(false);
  const [ruleCreating, setRuleCreating] = useState(false);
  
  const handleSaveGateway = () => {
    setGatewaySaving(true);
    setTimeout(() => setGatewaySaving(false), 2000);
  };

  const handleSaveProcessor = () => {
    setProcessorSaving(true);
    setTimeout(() => setProcessorSaving(false), 2000);
  };

  const handleCreateRule = (e) => {
    e.preventDefault();
    setRuleCreating(true);
    setTimeout(() => {
      setRuleCreating(false);
      setIsCreateModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Fee Management</h1>
          <p className="text-gray-400 text-sm mt-1">Configure global platform processing fees and splits.</p>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gateway Fees */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Receipt className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Gateway Fees</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Base Platform Fee (%)</label>
              <input type="text" defaultValue="0.5" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fixed Transaction Fee ($)</label>
              <input type="text" defaultValue="0.30" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">White Label Markup (%)</label>
              <input type="text" defaultValue="1.0" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none font-mono" />
            </div>
            <button onClick={handleSaveGateway} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2 mt-4">
              {gatewaySaving ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />} 
              {gatewaySaving ? <span className="text-green-500">Saved Successfully!</span> : "Save Gateway Fees"}
            </button>
          </div>
        </div>

        {/* Processor Pass-Through Fees */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Receipt className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Processor Fees</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
               <span className="font-bold text-sm text-white">MoonPay</span>
               <div className="flex items-center gap-2">
                 <input type="text" defaultValue="4.5" className="w-16 bg-black border border-white/10 rounded text-center py-1 text-sm text-white outline-none" /> %
               </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
               <span className="font-bold text-sm text-white">Banxa</span>
               <div className="flex items-center gap-2">
                 <input type="text" defaultValue="3.9" className="w-16 bg-black border border-white/10 rounded text-center py-1 text-sm text-white outline-none" /> %
               </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
               <span className="font-bold text-sm text-white">Transak</span>
               <div className="flex items-center gap-2">
                 <input type="text" defaultValue="4.0" className="w-16 bg-black border border-white/10 rounded text-center py-1 text-sm text-white outline-none" /> %
               </div>
            </div>
            <button onClick={handleSaveProcessor} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2 mt-4">
              {processorSaving ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />} 
              {processorSaving ? <span className="text-green-500">Saved Successfully!</span> : "Save Processor Fees"}
            </button>
          </div>
        </div>

      </div>

      {/* Create Rule Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Create New Fee Rule</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateRule} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Rule Name</label>
                <input type="text" required placeholder="e.g. VIP Merchant Discount" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Applicable Merchant</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option>All Merchants</option>
                  <option>Acme Corp</option>
                  <option>Global Tech</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Fee %</label>
                  <input type="text" required placeholder="0.5" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Fixed Fee $</label>
                  <input type="text" required placeholder="0.30" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={ruleCreating} className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 rounded-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                  {ruleCreating ? <><CheckCircle2 className="w-4 h-4" /> Created!</> : "Create Rule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Fees;
