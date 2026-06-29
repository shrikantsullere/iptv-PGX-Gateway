import { Users, Search, Download, ExternalLink, Mail } from 'lucide-react';

const mockCustomers = Array(15).fill(null).map((_, i) => ({
  id: `CUST-${1000 + i}`,
  name: ['John Smith', 'Sarah Jones', 'Michael Brown', 'Emma Wilson', 'David Lee'][Math.floor(Math.random() * 5)],
  email: `user${1000+i}@example.com`,
  ltv: (Math.random() * 5000 + 100).toFixed(2),
  txCount: Math.floor(Math.random() * 50 + 1),
  risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
  joined: new Date(Date.now() - Math.random() * 50000000000).toLocaleDateString(),
}));

const Customers = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" /> Customers
              </h1>
              <p className="text-gray-400">Manage your customers and view their lifetime value.</p>
            </div>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl transition-all">
              <Download className="w-4 h-4" /> Export Data
            </button>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search customers by name or email..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Joined Date</th>
                    <th className="p-4 font-medium text-right">Tx Count</th>
                    <th className="p-4 font-medium text-right">Lifetime Value (LTV)</th>
                    <th className="p-4 font-medium text-right">Risk Profile</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {mockCustomers.map((cust, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                            {cust.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{cust.name}</div>
                            <div className="text-xs text-gray-500 font-mono">{cust.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" /> {cust.email}
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 text-xs">{cust.joined}</td>
                      <td className="p-4 text-white text-right">{cust.txCount}</td>
                      <td className="p-4 text-green-400 font-bold text-right">${cust.ltv}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${
                          cust.risk === 'Low' ? 'bg-green-500/10 text-green-500' :
                          cust.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {cust.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
