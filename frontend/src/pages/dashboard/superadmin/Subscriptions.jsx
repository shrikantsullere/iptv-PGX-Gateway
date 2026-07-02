import { useState, useEffect } from 'react';
import { CreditCard, Plus, MoreVertical, Edit2, Copy, Archive, Trash2, CheckCircle2, DollarSign, Percent, List, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const getThemeClasses = (color) => {
  const map = {
    blue: { color: 'from-blue-500/20 to-blue-900/20', border: 'border-blue-500/30', btn: 'bg-blue-500 hover:bg-blue-600', text: 'text-blue-500' },
    purple: { color: 'from-purple-500/20 to-purple-900/20', border: 'border-purple-500/50', btn: 'bg-purple-500 hover:bg-purple-600', text: 'text-purple-500' },
    orange: { color: 'from-orange-500/20 to-orange-900/20', border: 'border-orange-500/30', btn: 'bg-orange-500 hover:bg-orange-600', text: 'text-orange-500' },
    green: { color: 'from-green-500/20 to-green-900/20', border: 'border-green-500/30', btn: 'bg-green-500 hover:bg-green-600', text: 'text-green-500' },
    pink: { color: 'from-pink-500/20 to-pink-900/20', border: 'border-pink-500/30', btn: 'bg-pink-500 hover:bg-pink-600', text: 'text-pink-500' },
  };
  return map[color?.toLowerCase()] || map.blue;
};

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    planName: '',
    themeColor: 'blue',
    monthlyPrice: '',
    billingCycle: 'monthly',
    transactionFee: '',
    features: ['']
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/settings/subscriptions');
      if (res.success && res.data) {
        setPlans(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions', error);
    } finally {
      setLoading(false);
    }
  };

  const openEditor = (plan = null) => {
    setEditingPlan(plan);
    if (plan) {
      setFormData({
        planName: plan.planName,
        themeColor: plan.themeColor || 'blue',
        monthlyPrice: (plan.monthlyPrice / 100).toString(),
        billingCycle: plan.billingCycle,
        transactionFee: (plan.transactionFee / 100).toString(),
        features: Array.isArray(plan.features) && plan.features.length ? plan.features : ['']
      });
    } else {
      setFormData({
        planName: '',
        themeColor: 'blue',
        monthlyPrice: '',
        billingCycle: 'Monthly',
        transactionFee: '',
        features: ['']
      });
    }
    setShowEditor(true);
    setActiveMenu(null);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    if (newFeatures.length === 0) newFeatures.push('');
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        ...formData,
        monthlyPrice: parseFloat(formData.monthlyPrice || 0) * 100,
        transactionFee: parseFloat(formData.transactionFee || 0) * 100,
        features: formData.features.filter(f => f.trim() !== '')
      };

      if (editingPlan) {
        await apiClient.put(`/admin/settings/subscriptions/${editingPlan.planId}`, payload);
      } else {
        await apiClient.post('/admin/settings/subscriptions', payload);
      }
      
      await fetchPlans();
      setShowEditor(false);
    } catch (error) {
      console.error('Failed to save subscription', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (planId) => {
    try {
      setDeleting(planId);
      await apiClient.delete(`/admin/settings/subscriptions/${planId}`);
      await fetchPlans();
    } catch (error) {
      console.error('Failed to delete subscription', error);
    } finally {
      setDeleting(null);
      setActiveMenu(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] w-full">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-400 font-bold">Loading Subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-pink-500" /> Subscription Management
              </h1>
              <p className="text-gray-400">Create and configure pricing tiers, transaction fees, and features for merchants.</p>
            </div>
            <button 
              onClick={() => openEditor()}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-xl transition-all font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            >
              <Plus className="w-5 h-5" /> Create New Plan
            </button>
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-20 bg-[#13131A] border border-white/5 rounded-3xl">
              <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Subscription Plans</h3>
              <p className="text-gray-400 mb-6">Create your first subscription plan to offer to your merchants.</p>
              <button onClick={() => openEditor()} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-colors">
                Create First Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => {
                const theme = getThemeClasses(plan.themeColor);
                return (
                  <div key={plan.planId} className={`bg-gradient-to-b ${theme.color} border ${theme.border} rounded-3xl p-6 relative flex flex-col`}>
                    
                    {/* Context Menu Button */}
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === plan.planId ? null : plan.planId)}
                        className="p-1.5 bg-black/50 hover:bg-black/80 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenu === plan.planId && (
                        <div className="absolute top-10 right-0 w-48 bg-[#1A1A24] border border-white/10 rounded-xl shadow-2xl py-2 z-10 animate-in fade-in zoom-in-95">
                          <button onClick={() => openEditor(plan)} className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-white/5 text-gray-300 hover:text-white transition-colors"><Edit2 className="w-4 h-4"/> Edit Plan</button>
                          <div className="h-px bg-white/10 my-1"></div>
                          <button onClick={() => handleDelete(plan.planId)} disabled={deleting === plan.planId} className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-red-500/10 text-red-500 transition-colors disabled:opacity-50">
                            {deleting === plan.planId ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4"/>} Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <span className="bg-black/50 border border-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300">
                        {plan.planName}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-400">$</span>
                        <span className="text-4xl font-black text-white">{plan.monthlyPrice / 100}</span>
                        <span className="text-sm text-gray-400">/{plan.billingCycle?.toLowerCase() || 'month'}</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-2 font-medium">
                        Transaction Fee: <span className="text-white font-bold">{plan.transactionFee / 100}%</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Included Features</p>
                      <ul className="space-y-3">
                        {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle2 className={`w-4 h-4 ${theme.text} mt-0.5 shrink-0`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          )}

          {/* Editor Slide-over Overlay */}
          {showEditor && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-xl bg-[#111118] h-full border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B]">
                  <h2 className="text-xl font-bold">{editingPlan ? `Edit ${editingPlan.planName} Plan` : 'Create New Plan'}</h2>
                  <button onClick={() => setShowEditor(false)} className="text-gray-500 hover:text-white transition-colors">
                    <Trash2 className="w-6 h-6 hidden" /> {/* Hidden placeholder for alignment */}
                    <span className="text-sm font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg">Close</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Basic Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Plan Identity</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
                      <input type="text" value={formData.planName} onChange={e => setFormData({...formData, planName: e.target.value})} placeholder="e.g. Pro, Growth" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Theme Color</label>
                      <div className="flex gap-2">
                         {['blue', 'purple', 'orange', 'green', 'pink'].map(c => (
                            <button key={c} onClick={() => setFormData({...formData, themeColor: c})} className={`w-8 h-8 rounded-full bg-${c}-500 border-2 ${formData.themeColor === c ? 'border-white' : 'border-transparent'}`}></button>
                         ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Editor */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><DollarSign className="w-4 h-4"/> Pricing Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Price ($)</label>
                        <input type="text" value={formData.monthlyPrice} onChange={e => setFormData({...formData, monthlyPrice: e.target.value})} placeholder="e.g. 99" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Billing Cycle</label>
                        <select value={formData.billingCycle} onChange={e => setFormData({...formData, billingCycle: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 appearance-none">
                          <option>Monthly</option>
                          <option>Yearly</option>
                          <option>One-time</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Fee Editor */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><Percent className="w-4 h-4"/> Transaction Fees</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Base Fee (%)</label>
                      <input type="text" value={formData.transactionFee} onChange={e => setFormData({...formData, transactionFee: e.target.value})} placeholder="e.g. 2.9" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500" />
                    </div>
                    <p className="text-xs text-gray-500">This fee is charged on top of the payment gateway processing fees.</p>
                  </div>

                  {/* Feature Editor */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><List className="w-4 h-4"/> Feature List</h3>
                    <div className="space-y-2">
                      {formData.features.map((feat, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={feat} onChange={e => handleFeatureChange(i, e.target.value)} placeholder="Describe a feature..." className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-pink-500 text-sm" />
                          <button onClick={() => removeFeature(i)} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5"/></button>
                        </div>
                      ))}
                    </div>
                    <button onClick={addFeature} className="text-sm text-pink-500 font-bold hover:text-pink-400 transition-colors">+ Add Feature</button>
                  </div>

                </div>

                <div className="p-6 border-t border-white/5 bg-[#09090B] flex justify-end gap-3">
                  <button onClick={() => setShowEditor(false)} className="px-6 py-2.5 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-pink-500 hover:bg-pink-600 shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-colors disabled:opacity-70">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                    {saving ? 'Saving...' : 'Save Plan Configuration'}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
