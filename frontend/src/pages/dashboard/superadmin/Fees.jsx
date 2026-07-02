import { useState, useEffect } from 'react';
import { Receipt, Save, Plus, X, CheckCircle2, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const Fees = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [gatewaySaving, setGatewaySaving] = useState(false);
  const [processorSaving, setProcessorSaving] = useState(false);
  const [ruleCreating, setRuleCreating] = useState(false);
  
  const [loading, setLoading] = useState(true);
  
  const [gatewayFees, setGatewayFees] = useState({
    basePlatformFee: '',
    fixedTransactionFee: '',
    whiteLabelMarkup: ''
  });
  
  const [processorFees, setProcessorFees] = useState([
    { name: 'MoonPay', fee: '' },
    { name: 'Banxa', fee: '' },
    { name: 'Transak', fee: '' }
  ]);
  
  const [ruleForm, setRuleForm] = useState({
    ruleName: '',
    merchantScope: 'All Merchants',
    feePercentage: '',
    fixedFee: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gwRes, procRes] = await Promise.all([
        apiClient.get('/admin/settings/gateway-fees'),
        apiClient.get('/admin/settings/processor-fees')
      ]);

      if (gwRes.success && gwRes.data) {
        setGatewayFees({
          basePlatformFee: gwRes.data.basePlatformFee ? (gwRes.data.basePlatformFee / 100).toString() : '0.0',
          fixedTransactionFee: gwRes.data.fixedTransactionFee ? (gwRes.data.fixedTransactionFee / 100).toString() : '0.0',
          whiteLabelMarkup: gwRes.data.whiteLabelMarkup ? (gwRes.data.whiteLabelMarkup / 100).toString() : '0.0'
        });
      }

      if (procRes.success && procRes.data && procRes.data.length > 0) {
        // Map saved processor fees
        const savedProcs = procRes.data;
        setProcessorFees(prev => prev.map(p => {
          const found = savedProcs.find(s => s.processorName === p.name);
          return found ? { ...p, fee: (found.feePercentage / 100).toString() } : { ...p, fee: '0.0' };
        }));
      } else {
        // If empty DB
        setProcessorFees(prev => prev.map(p => ({ ...p, fee: '0.0' })));
      }
    } catch (error) {
      console.error('Failed to fetch fees data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGateway = async () => {
    try {
      setGatewaySaving(true);
      await apiClient.put('/admin/settings/gateway-fees', gatewayFees);
      setTimeout(() => setGatewaySaving(false), 2000);
    } catch (error) {
      console.error('Failed to save gateway fees');
      setGatewaySaving(false);
    }
  };

  const handleSaveProcessor = async () => {
    try {
      setProcessorSaving(true);
      await apiClient.put('/admin/settings/processor-fees', { processors: processorFees });
      setTimeout(() => setProcessorSaving(false), 2000);
    } catch (error) {
      console.error('Failed to save processor fees');
      setProcessorSaving(false);
    }
  };

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      setRuleCreating(true);
      await apiClient.post('/admin/settings/fee-rules', ruleForm);
      setTimeout(() => {
        setRuleCreating(false);
        setIsCreateModalOpen(false);
        setRuleForm({ ruleName: '', merchantScope: 'All Merchants', feePercentage: '', fixedFee: '' });
      }, 1000);
    } catch (error) {
      console.error('Failed to create fee rule');
      setRuleCreating(false);
    }
  };

  const handleProcessorFeeChange = (index, value) => {
    const updated = [...processorFees];
    updated[index].fee = value;
    setProcessorFees(updated);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-20">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin mb-4" />
        <p className="text-gray-400 font-bold">Syncing Configuration...</p>
      </div>
    );
  }

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
              <input type="text" value={gatewayFees.basePlatformFee} onChange={e => setGatewayFees({...gatewayFees, basePlatformFee: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fixed Transaction Fee ($)</label>
              <input type="text" value={gatewayFees.fixedTransactionFee} onChange={e => setGatewayFees({...gatewayFees, fixedTransactionFee: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">White Label Markup (%)</label>
              <input type="text" value={gatewayFees.whiteLabelMarkup} onChange={e => setGatewayFees({...gatewayFees, whiteLabelMarkup: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#7C3AED] outline-none font-mono" />
            </div>
            <button onClick={handleSaveGateway} disabled={gatewaySaving} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2 mt-4">
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
            {processorFees.map((proc, index) => (
              <div key={proc.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                 <span className="font-bold text-sm text-white">{proc.name}</span>
                 <div className="flex items-center gap-2">
                   <input type="text" value={proc.fee} onChange={e => handleProcessorFeeChange(index, e.target.value)} className="w-16 bg-black border border-white/10 rounded text-center py-1 text-sm text-white outline-none" /> %
                 </div>
              </div>
            ))}
            <button onClick={handleSaveProcessor} disabled={processorSaving} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2 mt-4">
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
                <input type="text" required value={ruleForm.ruleName} onChange={e => setRuleForm({...ruleForm, ruleName: e.target.value})} placeholder="e.g. VIP Merchant Discount" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-1">Applicable Merchant</label>
                <select value={ruleForm.merchantScope} onChange={e => setRuleForm({...ruleForm, merchantScope: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none appearance-none">
                  <option>All Merchants</option>
                  <option>Acme Corp</option>
                  <option>Global Tech</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Fee %</label>
                  <input type="text" required value={ruleForm.feePercentage} onChange={e => setRuleForm({...ruleForm, feePercentage: e.target.value})} placeholder="0.5" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-1">Fixed Fee $</label>
                  <input type="text" required value={ruleForm.fixedFee} onChange={e => setRuleForm({...ruleForm, fixedFee: e.target.value})} placeholder="0.30" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#7C3AED] outline-none font-mono" />
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
