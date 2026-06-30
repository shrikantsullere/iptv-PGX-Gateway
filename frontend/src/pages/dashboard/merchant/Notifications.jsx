import { Bell, CheckCircle2, AlertTriangle, ArrowUpRight, Code } from 'lucide-react';

const Notifications = () => {
  const events = [
    { type: 'success', title: 'Settlement Completed', desc: '$12,450.00 has been transferred to JPMorgan Chase (**** 4912)', time: '2 mins ago', icon: CheckCircle2 },
    { type: 'alert', title: 'Processor Failover', desc: 'MoonPay degraded. Traffic automatically routed to Transak.', time: '1 hour ago', icon: AlertTriangle },
    { type: 'info', title: 'New API Key Generated', desc: 'A new production API key was created by Alice Admin.', time: '3 hours ago', icon: Code },
    { type: 'success', title: 'Subscription Renewed', desc: 'Your Enterprise plan was successfully renewed for the month.', time: '1 day ago', icon: ArrowUpRight },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Notification Center</h1>
          <p className="text-gray-400 text-sm mt-1">Platform events, alerts, and settlement updates.</p>
        </div>
        <button className="text-sm font-bold text-[#7C3AED] hover:text-white transition-colors">Mark All Read</button>
      </div>

      <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl flex flex-col divide-y divide-white/5">
         {events.map((evt, i) => (
           <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors flex gap-4 items-start group">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
               evt.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
               evt.type === 'alert' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
               'bg-blue-500/10 border-blue-500/20 text-blue-500'
             }`}>
               <evt.icon className="w-5 h-5" />
             </div>
             <div className="flex-1">
               <div className="flex justify-between items-center mb-1">
                 <h4 className="font-bold text-white group-hover:text-[#7C3AED] transition-colors">{evt.title}</h4>
                 <span className="text-xs text-gray-500 font-medium">{evt.time}</span>
               </div>
               <p className="text-sm text-gray-400">{evt.desc}</p>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Notifications;
