import { FileText, CreditCard, Download, CheckCircle2 } from 'lucide-react';

const Billing = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-500" /> Billing & Plans
            </h1>
            <p className="text-gray-400">Manage your subscription, invoices, and payment methods.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Current Plan */}
            <div className="lg:col-span-2 bg-gradient-to-br from-orange-500/10 to-[#13131A] border border-orange-500/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Enterprise</span>
                    <h2 className="text-3xl font-bold">$499 <span className="text-lg text-gray-400 font-normal">/ month</span></h2>
                  </div>
                  <button className="bg-white text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-gray-200 transition-colors">
                    Upgrade Plan
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  {['Unlimited Transactions', 'Dedicated Account Manager', 'White-label Checkout', 'SLA Guarantee (99.99%)'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" /> {feat}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-gray-500">45k / 100k API calls this month</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#13131A] border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5 text-gray-400" /> Payment Method</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-8 bg-white rounded flex items-center justify-center font-black text-blue-900 text-xs">VISA</div>
                  <div>
                    <div className="font-bold text-white">•••• 4242</div>
                    <div className="text-xs text-gray-500">Expires 12/28</div>
                  </div>
                </div>
              </div>
              <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors text-left mt-4">
                + Add Payment Method
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-lg font-bold">Billing History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Invoice ID</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {[
                    { id: 'INV-2025-05', date: 'May 01, 2025', amount: '$499.00', status: 'Paid' },
                    { id: 'INV-2025-04', date: 'Apr 01, 2025', amount: '$499.00', status: 'Paid' },
                    { id: 'INV-2025-03', date: 'Mar 01, 2025', amount: '$499.00', status: 'Paid' },
                  ].map((inv, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono text-xs">{inv.id}</td>
                      <td className="p-4 text-gray-400 text-xs">{inv.date}</td>
                      <td className="p-4 font-bold text-white">{inv.amount}</td>
                      <td className="p-4">
                        <span className="bg-green-500/10 text-green-500 text-xs font-bold px-2.5 py-1 rounded-full">
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
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

export default Billing;
