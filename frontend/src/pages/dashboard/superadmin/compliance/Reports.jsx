import { useState } from 'react';
import { FileText, Download, Calendar, CheckCircle2, Loader2, X, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const approvalTrend = [
  { month: 'Jan', approved: 142, rejected: 18 }, { month: 'Feb', approved: 168, rejected: 22 },
  { month: 'Mar', approved: 190, rejected: 15 }, { month: 'Apr', approved: 210, rejected: 20 },
  { month: 'May', approved: 245, rejected: 28 }, { month: 'Jun', approved: 278, rejected: 19 },
];

const amlTrend = [
  { month: 'Jan', alerts: 12 }, { month: 'Feb', alerts: 18 }, { month: 'Mar', alerts: 10 },
  { month: 'Apr', alerts: 22 }, { month: 'May', alerts: 16 }, { month: 'Jun', alerts: 30 },
];

const dateRanges = ['Today', 'Last 7 Days', 'This Month', 'Last Quarter', 'YTD 2025'];

export default function ComplianceReports() {
  const [dateRange, setDateRange] = useState('This Month');
  const [showDateModal, setShowDateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => { setExporting(false); setExported(true); setTimeout(() => { setExported(false); setShowExportModal(false); }, 2000); }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" /> Compliance Reports
          </h1>
          <p className="text-gray-400 mt-1">Regulatory reporting, KYC analytics, and AML statistics.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => setShowDateModal(true)} className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> {dateRange}
          </button>
          <button onClick={() => setShowExportModal(true)} className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'KYC Approval Rate', value: '78.4%', sub: '+2.1% vs last period', color: 'text-green-400' },
          { label: 'Avg Processing Time', value: '4.2h', sub: 'Per KYC submission', color: 'text-blue-400' },
          { label: 'AML Alerts Resolved', value: '94.2%', sub: 'Resolution rate', color: 'text-purple-400' },
          { label: 'Regulatory Filings', value: '12', sub: 'Submitted this month', color: 'text-orange-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl">
            <div className="text-xs text-gray-400 font-medium mb-2">{s.label}</div>
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-[10px] text-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KYC Approval vs Rejection */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">KYC: Approvals vs Rejections</h3>
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvalTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="approved" fill="#22C55E" radius={[4, 4, 0, 0]} name="Approved" />
                <Bar dataKey="rejected" fill="#EF4444" radius={[4, 4, 0, 0]} name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AML Alert Volume */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">AML Alert Volume Trend</h3>
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={amlTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Filed Reports */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Regulatory Filings</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Report ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Type</th>
                <th className="p-5 font-bold uppercase tracking-wider">Period</th>
                <th className="p-5 font-bold uppercase tracking-wider">Filed</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {[
                { id: 'RPT-2025-06', type: 'Monthly SAR Filing', period: 'June 2025', filed: 'Jun 29, 2025', status: 'Submitted' },
                { id: 'RPT-2025-05', type: 'Monthly SAR Filing', period: 'May 2025', filed: 'May 31, 2025', status: 'Submitted' },
                { id: 'RPT-Q2-2025', type: 'Quarterly AML Report', period: 'Q2 2025', filed: 'Jun 30, 2025', status: 'Pending' },
                { id: 'RPT-2025-04', type: 'Monthly SAR Filing', period: 'April 2025', filed: 'Apr 30, 2025', status: 'Submitted' },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-mono text-xs font-bold text-gray-300">{r.id}</td>
                  <td className="p-5 font-bold text-white">{r.type}</td>
                  <td className="p-5 text-gray-400 text-xs font-medium">{r.period}</td>
                  <td className="p-5 text-gray-400 text-xs">{r.filed}</td>
                  <td className="p-5 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${r.status === 'Submitted' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                      {r.status === 'Submitted' ? <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {r.status}</span> : r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" /> Date Range</h3>
              <button onClick={() => setShowDateModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-2">
              {dateRanges.map(r => (
                <button key={r} onClick={() => { setDateRange(r); setShowDateModal(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${dateRange === r ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-300 hover:bg-white/5 border border-transparent'}`}>{r}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-500" /> Export Compliance Report</h3>
              {!exporting && !exported && <button onClick={() => setShowExportModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            <div className="p-6">
              {exported ? (
                <div className="flex flex-col items-center text-center py-8 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Report Exported!</h4>
                  <p className="text-gray-400 text-sm">Your compliance report for {dateRange} has been downloaded.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">Period: <strong className="text-white">{dateRange}</strong></div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Include Sections</label>
                    <div className="space-y-2">
                      {['KYC Approval Summary', 'AML Alert Report', 'Regulatory Filing Index', 'Risk Score Overview'].map(sec => (
                        <label key={sec} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                          <input type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                          <span className="text-sm text-gray-200 font-medium">{sec}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleExport} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Download PDF'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
