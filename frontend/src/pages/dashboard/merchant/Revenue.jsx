import { useState, useEffect } from 'react';
import { DollarSign, Download, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../../../utils/apiClient';

const Revenue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({ gross: 0, fees: 0, net: 0 });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/merchant/revenue');
      if (res.success && res.data) {
        setData(res.data.chartData);
        setKpis(res.data.kpis);
      }
    } catch (error) {
      console.error('Failed to fetch revenue data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      // Generate CSV
      const headers = ['Period', 'Gross Revenue ($)', 'Gateway Fees ($)', 'Net Revenue ($)'];
      const csvRows = data.map(row => 
        [row.name, row.revenue, row.fee, row.revenue - row.fee].join(',')
      );
      const csvContent = [headers.join(','), ...csvRows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `revenue_statement_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => {
        setDownloadComplete(false);
        setIsModalOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Revenue Breakdown</h1>
          <p className="text-gray-400 text-sm mt-1">Detailed view of your gross volume and platform fees.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
        >
          <Download className="w-4 h-4" /> Download Statement
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
           <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Gross Revenue (MTD)</div>
           <div className="text-3xl font-black text-white">
             {loading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : `$${kpis.gross.toLocaleString()}`}
           </div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
           <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Network & Gateway Fees</div>
           <div className="text-3xl font-black text-red-500">
             {loading ? <Loader2 className="w-6 h-6 animate-spin text-red-500" /> : `-$${kpis.fees.toLocaleString()}`}
           </div>
        </div>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
           <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Net Revenue</div>
           <div className="text-3xl font-black text-green-500">
             {loading ? <Loader2 className="w-6 h-6 animate-spin text-green-500" /> : `$${kpis.net.toLocaleString()}`}
           </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
         <h3 className="text-lg font-bold text-white mb-6">Monthly Performance</h3>
         <div className="h-96 w-full pb-4 flex items-center justify-center">
           {loading ? (
             <Loader2 className="w-10 h-10 animate-spin text-primary" />
           ) : (
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                 <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                 <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                 <Tooltip 
                   cursor={{fill: 'rgba(255,255,255,0.02)'}} 
                   contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }} 
                 />
                 <Bar dataKey="revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Gross Revenue" />
                 <Bar dataKey="fee" fill="#ef4444" radius={[4, 4, 0, 0]} name="Fees" />
               </BarChart>
             </ResponsiveContainer>
           )}
         </div>
      </div>

      {/* Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#09090B]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Download Statement
              </h3>
              <button 
                onClick={() => !isDownloading && setIsModalOpen(false)}
                disabled={isDownloading}
                className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              {downloadComplete ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Download Complete!</h4>
                  <p className="text-gray-400 text-sm">Your revenue statement has been downloaded successfully.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Date Range</label>
                    <select className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none font-bold text-sm">
                      <option>This Month (MTD)</option>
                      <option>Last Month</option>
                      <option>Last 3 Months</option>
                      <option>Year to Date (YTD)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Format</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-primary/10 border border-primary/30 text-primary p-3 rounded-xl font-bold text-sm">
                        CSV / Excel
                      </button>
                      <button className="bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 p-3 rounded-xl font-bold text-sm transition-colors">
                        PDF Report
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {!downloadComplete && (
              <div className="p-6 border-t border-white/5 bg-[#09090B] flex gap-3 shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isDownloading}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 group disabled:opacity-80 disabled:cursor-wait"
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Downloading...
                    </span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download
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

export default Revenue;
