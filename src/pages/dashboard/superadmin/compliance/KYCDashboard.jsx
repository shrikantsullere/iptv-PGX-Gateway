import { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, Clock, XCircle, AlertTriangle, Eye, ArrowUpRight, Filter, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kycData = [
  { month: 'Jan', approved: 142, rejected: 18, pending: 24 },
  { month: 'Feb', approved: 168, rejected: 22, pending: 30 },
  { month: 'Mar', approved: 190, rejected: 15, pending: 28 },
  { month: 'Apr', approved: 210, rejected: 20, pending: 35 },
  { month: 'May', approved: 245, rejected: 28, pending: 40 },
  { month: 'Jun', approved: 278, rejected: 19, pending: 52 },
];

const pieData = [
  { name: 'Approved', value: 78, color: '#22C55E' },
  { name: 'Pending', value: 14, color: '#F59E0B' },
  { name: 'Rejected', value: 8, color: '#EF4444' },
];

const recentKYC = [
  { id: 'KYC-8821', name: 'Acme Corp', type: 'Business', submitted: '10 mins ago', status: 'Pending', risk: 'Low' },
  { id: 'KYC-8820', name: 'John Martinez', type: 'Individual', submitted: '1 hour ago', status: 'Approved', risk: 'Low' },
  { id: 'KYC-8819', name: 'Global Trade Inc', type: 'Business', submitted: '2 hours ago', status: 'Review', risk: 'Medium' },
  { id: 'KYC-8818', name: 'StreamBox LLC', type: 'Business', submitted: '5 hours ago', status: 'Rejected', risk: 'High' },
  { id: 'KYC-8817', name: 'Sarah Chen', type: 'Individual', submitted: '8 hours ago', status: 'Approved', risk: 'Low' },
];

const statusStyle = (s) => ({
  Approved: 'bg-green-500/10 text-green-500 border-green-500/20',
  Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Review: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
}[s] || '');

const riskStyle = (r) => ({
  Low: 'text-green-500',
  Medium: 'text-orange-500',
  High: 'text-red-500',
}[r] || '');

export default function KYCDashboard() {
  const [search, setSearch] = useState('');

  const filtered = recentKYC.filter(k =>
    k.name.toLowerCase().includes(search.toLowerCase()) || k.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#7C3AED]" /> KYC Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Master view of onboarding funnel and verification rates.</p>
        </div>
        <button className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2">
          <UserCheck className="w-4 h-4" /> Review Queue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Submissions', value: '1,233', icon: ShieldCheck, color: 'text-white', bg: 'bg-[#7C3AED]/20', iconColor: 'text-[#7C3AED]', sub: '+52 this month' },
          { label: 'Approved', value: '962', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20', iconColor: 'text-green-500', sub: '78% approval rate' },
          { label: 'Pending Review', value: '171', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', iconColor: 'text-yellow-500', sub: '52 new today' },
          { label: 'Rejected', value: '100', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', iconColor: 'text-red-500', sub: 'Avg 8% rejection' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-full blur-[40px] opacity-50 group-hover:opacity-100 transition-opacity`} />
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs font-medium text-gray-400">{s.label}</div>
            <div className="text-[10px] text-gray-600 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">KYC Submission Trend</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kycData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="approved" fill="#22C55E" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="pending" fill="#F59E0B" radius={[0, 0, 0, 0]} stackId="a" />
                <Bar dataKey="rejected" fill="#EF4444" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Verification Status Split</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={v => `${v}%`} contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 w-full mt-2">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-black text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white">Recent KYC Submissions</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or ID..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-colors" />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Merchant</th>
                <th className="p-5 font-bold uppercase tracking-wider">Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Submitted</th>
                <th className="p-5 font-bold uppercase tracking-wider">Risk Level</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filtered.map((k, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-mono text-xs font-bold text-gray-300">{k.id}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-blue-500 flex items-center justify-center font-black text-white text-xs shrink-0">{k.name.charAt(0)}</div>
                      <span className="font-bold text-white">{k.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-400 font-medium text-xs">{k.type}</td>
                  <td className="p-5 text-gray-400 text-xs">{k.submitted}</td>
                  <td className={`p-5 font-bold text-sm ${riskStyle(k.risk)}`}>{k.risk}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyle(k.status)}`}>{k.status}</span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 px-3 py-1.5 rounded-lg border border-[#7C3AED]/20 transition-colors inline-flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Review
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
