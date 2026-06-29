import { useState } from 'react';
import { Percent, PieChart, Plus, Save, ChevronDown, ArrowUpRight } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const feeDistribution = [
  { name: 'Gateway Revenue', value: 1.2, color: '#7C3AED' },
  { name: 'Processor Fee', value: 2.9, color: '#3B82F6' },
  { name: 'Network Fee', value: 0.3, color: '#06B6D4' },
  { name: 'Merchant Share', value: 95.6, color: '#22C55E' },
];

const markupRules = [
  { type: 'Crypto Transactions', base: '1.9%', markup: '+1.5%', total: '3.4%', status: 'Active' },
  { type: 'Fiat - International', base: '2.9%', markup: '+0.8%', total: '3.7%', status: 'Active' },
  { type: 'Fiat - Domestic', base: '2.2%', markup: '+0.5%', total: '2.7%', status: 'Active' },
  { type: 'High Risk Merchants', base: '3.5%', markup: '+2.0%', total: '5.5%', status: 'Active' },
  { type: 'Chargebacks', base: '$15.00', markup: '+$5.00', total: '$20.00', status: 'Active' },
];

const barData = [
  { name: 'Stripe', fee: 2.9 }, { name: 'MoonPay', fee: 3.4 }, { name: 'Coinbase', fee: 1.9 },
  { name: 'LocalGate', fee: 2.5 }, { name: 'Adyen', fee: 3.1 },
];

export default function FeeSplitEngine() {
  const [activeRule, setActiveRule] = useState(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Percent className="w-8 h-8 text-green-500" /> Fee Split Engine
          </h1>
          <p className="text-gray-400 mt-1">Configure how transaction fees are distributed between gateway, merchant, and processors.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">Fee Distribution Breakdown</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={feeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {feeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val) => `${val}%`}
                    contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {feeDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{backgroundColor: item.color}}></div>
                    <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-black text-white text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Per-Processor Fees Bar Chart */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">Base Fee by Processor</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip 
                  formatter={(val) => [`${val}%`, 'Fee']}
                  contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="fee" fill="#7C3AED" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={`hsl(${260 + i * 20}, 70%, 55%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Markup Rules */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">Markup Rules</h3>
          <button className="flex items-center gap-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 text-[#7C3AED] px-4 py-2 rounded-xl text-sm font-bold border border-[#7C3AED]/30 transition-colors">
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Transaction Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Processor Base</th>
                <th className="p-5 font-bold uppercase tracking-wider">Gateway Markup</th>
                <th className="p-5 font-bold uppercase tracking-wider">Total Fee</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {markupRules.map((rule, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-bold text-white">{rule.type}</td>
                  <td className="p-5 text-gray-300 font-mono">{rule.base}</td>
                  <td className="p-5 font-mono text-green-400 font-bold">{rule.markup}</td>
                  <td className="p-5 font-black text-white font-mono">{rule.total}</td>
                  <td className="p-5 text-right">
                    <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 px-3 py-1.5 rounded-lg border border-[#7C3AED]/20">
                      Edit Rule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
