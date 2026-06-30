// A generic placeholder for the remaining processor modules
import { ShieldAlert, Database, FileText, Landmark, Wallet, Network } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const GenericProcessorPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  let title = 'Processor Module';
  let desc = 'Manage processor configurations.';
  let Icon = Network;

  if (path.includes('details')) { title = 'Processor Details'; Icon = Database; }
  if (path.includes('settlement')) { title = 'Settlement Engine'; Icon = Landmark; desc = 'Manage fiat and crypto processor settlements queue.'; }
  if (path.includes('revenue')) { title = 'Revenue Wallet'; Icon = Wallet; desc = 'Track PGX Treasury and aggregate revenue.'; }
  if (path.includes('logs')) { title = 'Processor Logs'; Icon = Database; desc = 'View raw API request/response logs for all processors.'; }
  if (path.includes('reports')) { title = 'Processor Reports'; Icon = FileText; desc = 'Advanced analytics and uptime reports for routing nodes.'; }

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
       <div className="w-20 h-20 bg-[#13131A] rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all"></div>
         <Icon className="w-10 h-10 text-white relative z-10" />
       </div>
       <h1 className="text-3xl font-black text-white mb-2 text-center">{title}</h1>
       <p className="text-gray-400 text-center max-w-md">{desc}</p>
       <div className="mt-8 bg-orange-500/10 text-orange-500 border border-orange-500/20 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
         <ShieldAlert className="w-4 h-4" /> This module requires Backend Integration
       </div>
    </div>
  );
};

export default GenericProcessorPage;
