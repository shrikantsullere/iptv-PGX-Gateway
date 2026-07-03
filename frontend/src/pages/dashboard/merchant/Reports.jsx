import { useState, useEffect } from 'react';
import { BarChart3, Download, Calendar, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import apiClient from '../../../utils/apiClient';

const Reports = () => {
  const [modalType, setModalType] = useState(null); // 'date', 'export'
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [dateRange, setDateRange] = useState('YTD 2026');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/merchant/reports?dateRange=${encodeURIComponent(dateRange)}`);
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching reports data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Export as CSV
      if (data.length > 0) {
        const headers = ['Month', 'Volume', 'Refunds'];
        const rows = data.map(d => [d.name, d.volume, d.refunds].join(','));
        const csvContent = [headers.join(','), ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `merchant_report_${dateRange.replace(/ /g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        setModalType(null);
      }, 2000);
    }, 1500);
  };

  const selectDate = (range) => {
    setDateRange(range);
    setModalType(null);
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-500" /> Analytics & Reports
              </h1>
              <p className="text-gray-400">Deep dive into your business metrics and growth.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button 
                onClick={() => setModalType('date')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl transition-all font-bold text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" /> {dateRange}
              </button>
              <button 
                onClick={() => setModalType('export')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl transition-all font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6">Volume Trend</h3>
              <div className="h-[300px] w-full flex items-center justify-center">
                {loading ? <Loader2 className="w-10 h-10 animate-spin text-primary" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: '#333', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="volume" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6">Refunds & Chargebacks</h3>
              <div className="h-[300px] w-full flex items-center justify-center">
                {loading ? <Loader2 className="w-10 h-10 animate-spin text-red-500" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                      <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#09090B', borderColor: '#333', borderRadius: '8px' }} />
                      <Bar dataKey="refunds" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#09090B]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {modalType === 'date' ? <Calendar className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-primary" />}
                {modalType === 'date' ? 'Select Date Range' : 'Export Report'}
              </h3>
              <button 
                onClick={() => !isExporting && setModalType(null)}
                disabled={isExporting}
                className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              {modalType === 'export' && exportComplete ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Export Successful!</h4>
                  <p className="text-gray-400 text-sm">Your PDF report is ready and has been downloaded.</p>
                </div>
              ) : modalType === 'export' ? (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-6">
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-bold">Current Range</p>
                    <h4 className="text-2xl font-black text-white">{dateRange}</h4>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Include Data Metrics</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 text-sm font-bold text-gray-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 bg-black/50" />
                        Volume Trends
                      </label>
                      <label className="flex items-center gap-3 text-sm font-bold text-gray-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 bg-black/50" />
                        Refunds & Chargebacks
                      </label>
                      <label className="flex items-center gap-3 text-sm font-bold text-gray-300 cursor-pointer p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 bg-black/50" />
                        Individual Transactions Log
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {['Today', 'Yesterday', 'Last 7 Days', 'This Month', 'YTD 2026', 'All Time'].map((range) => (
                    <button 
                      key={range}
                      onClick={() => selectDate(range)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-between ${
                        dateRange === range 
                          ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(124,58,237,0.15)]' 
                          : 'bg-[#09090B] border-white/5 text-gray-300 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      {range}
                      {dateRange === range && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {modalType === 'export' && !exportComplete && (
              <div className="p-6 border-t border-white/5 bg-[#09090B] flex gap-3 shrink-0">
                <button 
                  onClick={() => setModalType(null)}
                  disabled={isExporting}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-wait"
                >
                  {isExporting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating PDF...
                    </span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download Report
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Reports;
