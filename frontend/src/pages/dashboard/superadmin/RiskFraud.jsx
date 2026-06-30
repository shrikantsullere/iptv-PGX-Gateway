import { ShieldAlert, AlertTriangle, Globe, MapPin } from 'lucide-react';

const RiskFraud = () => {
  const alerts = [
    { id: 'AL-901', type: 'Velocity Check', severity: 'High', merchant: 'Acme Corp', desc: '5 transactions > $10k in 1 minute.', time: '10 mins ago' },
    { id: 'AL-902', type: 'Blocked Country', severity: 'Critical', merchant: 'Global Tech', desc: 'Attempted checkout from North Korea.', time: '1 hour ago' },
    { id: 'AL-903', type: 'High Risk Wallet', severity: 'High', merchant: 'Web3 Gaming', desc: 'Wallet flagged by Chainalysis.', time: '2 hours ago' },
    { id: 'AL-904', type: 'IP Mismatch', severity: 'Medium', merchant: 'Acme Corp', desc: 'Billing country does not match IP.', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Risk & Fraud Center</h1>
          <p className="text-gray-400 text-sm mt-1">AI-powered threat detection and compliance alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alert Feed */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Active Security Alerts
            </h3>
          </div>
          <div className="divide-y divide-white/5">
             {alerts.map((alert, i) => (
               <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors">
                 <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-3">
                     <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                       alert.severity === 'Critical' ? 'bg-red-500 text-white' :
                       alert.severity === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-yellow-500/20 text-yellow-500'
                     }`}>
                       {alert.severity}
                     </span>
                     <span className="font-bold text-white">{alert.type}</span>
                   </div>
                   <span className="text-xs text-gray-500">{alert.time}</span>
                 </div>
                 <p className="text-sm text-gray-400 mb-3">{alert.desc}</p>
                 <div className="flex items-center justify-between">
                   <div className="text-xs text-gray-500">Merchant: <span className="font-bold text-white">{alert.merchant}</span></div>
                   <button className="text-xs font-bold text-[#7C3AED] hover:text-white transition-colors">Investigate &rarr;</button>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Global Blocklist */}
        <div className="space-y-6">
          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                 <Globe className="w-5 h-5 text-red-500" />
               </div>
               <h3 className="text-lg font-bold text-white">Geo-Blocking</h3>
             </div>
             <p className="text-sm text-gray-400 mb-4">Traffic from these regions is automatically dropped at the edge.</p>
             <div className="flex flex-wrap gap-2">
                {['North Korea', 'Iran', 'Syria', 'Cuba', 'Russia'].map(c => (
                  <span key={c} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" /> {c}
                  </span>
                ))}
             </div>
             <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-2 rounded-lg transition-colors border border-white/10">Manage Regions</button>
          </div>
          
          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 shadow-xl">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                 <ShieldAlert className="w-5 h-5 text-orange-500" />
               </div>
               <h3 className="text-lg font-bold text-white">Risk Rules Engine</h3>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
                  <span className="text-sm text-gray-300">Max Tx Volume (1h)</span>
                  <span className="text-sm font-bold text-white">$50,000</span>
                </div>
                <div className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
                  <span className="text-sm text-gray-300">Failed Tx Limit (1h)</span>
                  <span className="text-sm font-bold text-white">15 attempts</span>
                </div>
             </div>
             <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-2 rounded-lg transition-colors border border-white/10">Edit Rules</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RiskFraud;
