import { useState } from 'react';
import { BarChart3, Download, Calendar, CheckCircle2, Loader2, X, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const successRateData = [
  { month: 'Jan', stripe: 99.1, moonpay: 93.4, coinbase: 85.2 },
  { month: 'Feb', stripe: 98.8, moonpay: 94.1, coinbase: 87.0 },
  { month: 'Mar', stripe: 99.3, moonpay: 92.8, coinbase: 86.5 },
  { month: 'Apr', stripe: 99.0, moonpay: 94.9, coinbase: 88.1 },
  { month: 'May', stripe: 99.5, moonpay: 95.2, coinbase: 89.0 },
  { month: 'Jun', stripe: 99.1, moonpay: 94.2, coinbase: 88.4 },
];

const chargebackData = [
  { name: 'Stripe US', rate: 0.42 }, { name: 'Stripe EU', rate: 0.38 }, { name: 'MoonPay', rate: 1.12 },
  { name: 'Coinbase', rate: 0.95 }, { name: 'LocalGate', rate: 0.61 },
];

const refundData = [
  { name: 'Stripe US', rate: 2.1 }, { name: 'Stripe EU', rate: 1.8 }, { name: 'MoonPay', rate: 3.4 },
  { name: 'Coinbase', rate: 2.9 }, { name: 'LocalGate', rate: 2.2 },
];

const dateRanges = ['Today', 'Last 7 Days', 'This Month', 'Last 3 Months', 'YTD 2025'];

export default function ProcessorReports() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [dateRange, setDateRange] = useState('This Month');
  const [showDateModal, setShowDateModal] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => { setExported(false); setShowExportModal(false); }, 2000);
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-500" /> Processor Reports
          </h1>
          <p className="text-gray-400 mt-1">Detailed analytics comparing processor success rates, refunds, and chargebacks.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowDateModal(true)}
            className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> {dateRange}
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Success Rate', value: '94.2%', subtext: '+0.8% this period', color: 'text-green-400' },
          { label: 'Total Transactions', value: '1.24M', subtext: 'Across all processors', color: 'text-white' },
          { label: 'Avg Chargeback Rate', value: '0.70%', subtext: 'Below 1% threshold', color: 'text-green-400' },
          { label: 'Avg Refund Rate', value: '2.48%', subtext: 'Industry avg: 3.1%', color: 'text-blue-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 shadow-xl">
            <div className="text-xs text-gray-400 font-medium mb-1">{s.label}</div>
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 font-medium">{s.subtext}</div>
          </div>
        ))}
      </div>

      {/* Success Rate Chart */}
      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-white">Approval Rate Trend by Processor</h3>
          <div className="flex items-center gap-4 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10 flex-wrap">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7C3AED]"></div> Stripe</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> MoonPay</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Coinbase</div>
          </div>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={successRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                formatter={v => [`${v}%`, '']}
              />
              <Line type="monotone" dataKey="stripe" stroke="#7C3AED" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="moonpay" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="coinbase" stroke="#06B6D4" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chargeback Rate Bar */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">Chargeback Rate by Processor</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chargebackData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  formatter={v => [`${v}%`, 'Chargeback']}
                />
                <Bar dataKey="rate" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Refund Rate Bar */}
        <div className="bg-[#13131A] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">Refund Rate by Processor</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={refundData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  formatter={v => [`${v}%`, 'Refund Rate']}
                />
                <Bar dataKey="rate" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Date Range Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#09090B] rounded-t-3xl">
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" /> Select Date Range
              </h3>
              <button onClick={() => setShowDateModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-2">
              {dateRanges.map(range => (
                <button
                  key={range}
                  onClick={() => { setDateRange(range); setShowDateModal(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${dateRange === range ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-300 hover:bg-white/5 border border-transparent'}`}
                >
                  {range}
                </button>
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
              <h3 className="font-black text-white text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" /> Export Report
              </h3>
              {!exporting && !exported && <button onClick={() => setShowExportModal(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X className="w-5 h-5" /></button>}
            </div>
            <div className="p-6">
              {exported ? (
                <div className="flex flex-col items-center text-center py-8 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Export Complete!</h4>
                  <p className="text-gray-400 text-sm">Your processor analytics report has been downloaded.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
                    Exporting report for: <strong className="text-white">{dateRange}</strong>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Included Sections</label>
                    <div className="space-y-2">
                      {['Approval Rate Trends', 'Chargeback Analysis', 'Refund Summary', 'Node Uptime Stats'].map(sec => (
                        <label key={sec} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                          <input type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                          <span className="text-sm text-gray-200 font-medium">{sec}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleExport}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl h-12 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
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
