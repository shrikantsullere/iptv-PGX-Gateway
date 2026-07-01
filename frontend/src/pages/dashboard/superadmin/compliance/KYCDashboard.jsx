import { useState, useEffect } from 'react';
import { ShieldCheck, Search, CheckCircle2, Clock, XCircle, AlertTriangle, Eye, ArrowUpRight, Filter, UserCheck, X, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiClient from '../../../../utils/apiClient';

const statusStyle = (s) => ({
  Approved: 'bg-green-500/10 text-green-500 border-green-500/20',
  Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Review: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
}[s] || 'bg-gray-500/10 text-gray-400');

const riskStyle = (r) => ({
  Low: 'text-green-500',
  Medium: 'text-orange-500',
  High: 'text-red-500',
}[r] || 'text-gray-400');

export default function KYCDashboard() {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [reviewItem, setReviewItem] = useState(null);

  useEffect(() => {
    fetchKYC();
  }, []);

  const fetchKYC = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/kyc/submissions');
      if (res.success) {
        setKycData(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch KYC');
    } finally {
      setLoading(false);
    }
  };

  const filtered = kycData.filter(k =>
    (k.merchantId || '').toLowerCase().includes(search.toLowerCase()) || 
    (k.submissionId || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusUpdate = async (status) => {
    if (!reviewItem) return;
    try {
      const res = await apiClient.put(`/admin/kyc/submissions/${reviewItem.submissionId}/status`, { status });
      if (res.success) {
        setKycData(kycData.map(k => k.submissionId === reviewItem.submissionId ? { ...k, status } : k));
        setReviewItem(null);
      }
    } catch (err) {
      alert('Failed to update KYC status');
    }
  };

  // Derive Stats from data
  const totalSubmissions = kycData.length;
  const approvedCount = kycData.filter(k => k.status === 'Approved').length;
  const pendingCount = kycData.filter(k => k.status === 'Pending' || k.status === 'Review').length;
  const rejectedCount = kycData.filter(k => k.status === 'Rejected').length;

  const pieData = [
    { name: 'Approved', value: approvedCount || 1, color: '#22C55E' },
    { name: 'Pending', value: pendingCount || 1, color: '#F59E0B' },
    { name: 'Rejected', value: rejectedCount || 1, color: '#EF4444' },
  ];

  // Dummy Chart Data (fallback since backend doesn't have aggregate KYC history yet)
  const chartData = [
    { month: 'Jan', approved: 142, rejected: 18, pending: 24 },
    { month: 'Feb', approved: 168, rejected: 22, pending: 30 },
    { month: 'Mar', approved: 190, rejected: 15, pending: 28 },
    { month: 'Apr', approved: 210, rejected: 20, pending: 35 },
    { month: 'May', approved: 245, rejected: 28, pending: 40 },
    { month: 'Jun', approved: 278, rejected: 19, pending: 52 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#7C3AED]" /> KYC Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Master view of onboarding funnel and verification rates.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Submissions', value: totalSubmissions, icon: ShieldCheck, color: 'text-white', bg: 'bg-[#7C3AED]/20', iconColor: 'text-[#7C3AED]', sub: 'Lifetime data' },
          { label: 'Approved', value: approvedCount, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20', iconColor: 'text-green-500', sub: 'Verified merchants' },
          { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', iconColor: 'text-yellow-500', sub: 'Requires action' },
          { label: 'Rejected', value: rejectedCount, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', iconColor: 'text-red-500', sub: 'Failed verifications' },
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
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
                  <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
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
                  <span className="font-black text-white">{item.value}</span>
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID or Merchant..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED] transition-colors" />
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
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7C3AED] mb-2" />
                    Fetching KYC Data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                 <tr>
                   <td colSpan="7" className="p-8 text-center text-gray-400">No KYC submissions found.</td>
                 </tr>
              ) : filtered.map((k, i) => (
                <tr key={k.submissionId} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-sm font-mono text-gray-400">{k.submissionId}</td>
                  <td className="p-5 font-bold text-white flex items-center gap-2">
                    {k.merchantId}
                  </td>
                  <td className="p-5 text-sm text-gray-300">{k.businessType || 'Business'}</td>
                  <td className="p-5 text-sm text-gray-400">{new Date(k.submittedAt).toLocaleDateString()}</td>
                  <td className="p-5">
                    <span className={`font-bold text-sm flex items-center gap-1.5 ${riskStyle(k.riskLevel || 'Low')}`}>
                      {k.riskLevel === 'High' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {k.riskLevel || 'Low'}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyle(k.status)}`}>
                      {k.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button onClick={() => setReviewItem(k)} className="text-[#7C3AED] hover:text-white transition-colors bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 ml-auto">
                      <Eye className="w-4 h-4" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {reviewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Review KYC Submission</h2>
              <button onClick={() => setReviewItem(null)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Merchant</p>
                  <p className="text-white font-bold">{reviewItem.merchantId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-white">{reviewItem.status}</p>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-white/5 mt-6">
                <button onClick={() => handleStatusUpdate('Rejected')} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-lg font-bold transition-colors border border-red-500/20">
                  Reject
                </button>
                <button onClick={() => handleStatusUpdate('Approved')} className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2 rounded-lg font-bold transition-colors border border-green-500/20">
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
