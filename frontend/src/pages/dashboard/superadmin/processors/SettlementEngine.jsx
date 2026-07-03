import { useState, useEffect } from 'react';
import apiClient from '../../../../utils/apiClient';
import { Landmark, Settings, Clock, ArrowDownToLine, CheckCircle2, Loader2, X, TrendingDown } from 'lucide-react';

export default function SettlementEngine() {
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [settling, setSettling] = useState(false);
  const [settled, setSettled] = useState(false);
  const [isAutoSettleEnabled, setIsAutoSettleEnabled] = useState(true);
  const [showModifyModal, setShowModifyModal] = useState(false);
  
  const [balances, setBalances] = useState([]);
  const [recentSettlements, setRecentSettlements] = useState([]);
  const [autoSettleRule, setAutoSettleRule] = useState({ frequency: 'Daily at 00:00 UTC', minimumThreshold: 500000 });

  const fetchData = async () => {
    try {
      const res = await apiClient.get('/admin/payment-processors/settlement-engine');
      if (res.success) {
        const { balances, recentSettlements, autoSettle } = res.data;
        setBalances(balances.map(b => ({
          processor: b.processorName,
          available: (b.currency === 'USD' ? '$' : '€') + (b.availableBalance / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          pending: (b.currency === 'USD' ? '$' : '€') + (b.pendingBalance / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          settled: (b.currency === 'USD' ? '$' : '€') + (b.totalSettled / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          currency: b.currency
        })));
        
        setRecentSettlements(recentSettlements.map((s, i) => ({
          id: 'SET-' + (8821 - i),
          processor: s.processorId === '1' ? 'Stripe US' : s.processorId === '2' ? 'Stripe EU' : s.processorId === '3' ? 'MoonPay' : s.processorId,
          amount: '$' + (s.amount / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          date: new Date(s.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          method: s.settlementMethod,
          status: s.status
        })));
        
        setAutoSettleRule(autoSettle);
        setIsAutoSettleEnabled(autoSettle.enabled);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSettle = async () => {
    setSettling(true);
    const amount = document.getElementById('settleAmount').value;
    const processor = document.getElementById('settleProcessor').value;
    const destination = document.getElementById('settleDestination').value;
    
    try {
        const res = await apiClient.post('/admin/payment-processors/settlement-engine/settle', { amount, processor, destination });
        if (res.success) {
            await fetchData();
            setSettled(true);
            setTimeout(() => { setSettled(false); setShowSettleModal(false); }, 2000);
        }
    } catch(e) {
        alert('Failed to settle');
    } finally {
        setSettling(false);
    }
  };
  
  const handleSaveAutoSettle = async () => {
    const frequency = document.getElementById('autoFreq').value;
    const threshold = document.getElementById('autoThresh').value;
    const processors = document.getElementById('autoProc').value;
    
    try {
        const res = await apiClient.put('/admin/payment-processors/settlement-engine/auto-settle', { frequency, threshold, processors });
        if (res.success) {
            await fetchData();
            setShowModifyModal(false);
        }
    } catch(e) {
        alert('Failed to save rules');
    }
  };
  
  const toggleAutoSettle = async () => {
    const newState = !isAutoSettleEnabled;
    setIsAutoSettleEnabled(newState);
    try {
        await apiClient.put('/admin/payment-processors/settlement-engine/auto-settle', { enabled: newState });
    } catch(e) {
        setIsAutoSettleEnabled(!newState);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Landmark className="w-8 h-8 text-cyan-500" /> Settlement Engine
          </h1>
          <p className="text-gray-400 mt-1">Manage balances across processors and trigger settlement batches.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setShowModifyModal(true)} className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" /> Auto-Settle Rules
          </button>
          <button
            onClick={() => setShowSettleModal(true)}
            className="flex-1 sm:flex-none bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
          >
            <ArrowDownToLine className="w-4 h-4" /> Settle Now
          </button>
        </div>
      </div>

      {/* Auto-Settle Status Bar */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-[#13131A] border border-cyan-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Auto-Settle Active</div>
            <div className="text-xs text-gray-400">Scheduled: <strong className="text-white">{autoSettleRule.frequency}</strong> | Minimum threshold: <strong className="text-white">${autoSettleRule.minimumThreshold / 100}</strong></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleAutoSettle}
            className={`text-xs px-3 py-1 rounded-full font-bold border transition-colors ${isAutoSettleEnabled ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'}`}
          >
            {isAutoSettleEnabled ? 'Enabled' : 'Disabled'}
          </button>
          <button onClick={() => setShowModifyModal(true)} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1 rounded-lg transition-colors bg-white/5 hover:bg-white/10">Modify</button>
        </div>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {balances.map((b, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <div className="font-bold text-white">{b.processor}</div>
                  <div className="text-xs text-gray-500">{b.currency}</div>
                </div>
              </div>
              <button onClick={() => setShowSettleModal(true)} className="text-xs font-bold text-cyan-500 hover:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/20 transition-colors">
                Settle
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Available</div>
                <div className="font-black text-white text-base">{b.available}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Pending</div>
                <div className="font-black text-orange-400 text-base">{b.pending}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Settled</div>
                <div className="font-black text-green-400 text-base">{b.settled}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Settlements */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Recent Settlements</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Processor</th>
                <th className="p-5 font-bold uppercase tracking-wider">Amount</th>
                <th className="p-5 font-bold uppercase tracking-wider">Date</th>
                <th className="p-5 font-bold uppercase tracking-wider">Method</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {recentSettlements.map((s, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-mono font-bold text-gray-300 text-xs">{s.id}</td>
                  <td className="p-5 font-bold text-white">{s.processor}</td>
                  <td className="p-5 font-black text-white font-mono">{s.amount}</td>
                  <td className="p-5 text-gray-400 text-xs font-medium">{s.date}</td>
                  <td className="p-5 text-gray-400 text-xs">{s.method}</td>
                  <td className="p-5 text-right">
                    <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">
                      <CheckCircle2 className="w-3 h-3" /> {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settle Now Modal */}
      {showSettleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <ArrowDownToLine className="w-5 h-5 text-cyan-500" /> Initiate Settlement
              </h3>
              {!settling && !settled && <button onClick={() => setShowSettleModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full transition-colors"><X className="w-5 h-5" /></button>}
            </div>
            <div className="p-6">
              {settled ? (
                <div className="flex flex-col items-center text-center py-8 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Settlement Initiated!</h4>
                  <p className="text-gray-400 text-sm">Funds will be transferred within 1–2 business days.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Select Processor</label>
                    <select id="settleProcessor" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm">
                      <option>All Processors</option>
                      {balances.map(b => <option key={b.processor} value={b.processor}>{b.processor}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Settlement Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-400 font-bold">$</span>
                      <input id="settleAmount" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm font-mono" placeholder="e.g. 48000.00" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Destination</label>
                    <select id="settleDestination" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm">
                      <option>Primary Bank Account (****4421)</option>
                      <option>Reserve Account (****8821)</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSettle}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all h-12 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    {settling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Settlement'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modify Auto-Settle Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-xl flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-500" /> Auto-Settle Rules
              </h3>
              <button onClick={() => setShowModifyModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Schedule Frequency</label>
                <select id="autoFreq" defaultValue={autoSettleRule.frequency || 'Daily at 00:00 UTC'} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm appearance-none">
                  <option>Daily at 00:00 UTC</option>
                  <option>Weekly (Mondays)</option>
                  <option>Monthly (1st of Month)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Minimum Threshold</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400 font-bold">$</span>
                  <input id="autoThresh" type="number" defaultValue={autoSettleRule.minimumThreshold ? autoSettleRule.minimumThreshold / 100 : 5000} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm font-mono" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Include Processors</label>
                <select id="autoProc" defaultValue={autoSettleRule.includedProcessors ? JSON.parse(autoSettleRule.includedProcessors)[0] : 'All Active Processors'} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm appearance-none">
                  <option>All Active Processors</option>
                  <option>Stripe US & EU Only</option>
                  <option>Crypto Only</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setShowModifyModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">Cancel</button>
                <button onClick={handleSaveAutoSettle} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  Save Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
