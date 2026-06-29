import { useState } from 'react';
import { 
  Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, 
  Search, ExternalLink, QrCode, Copy, ChevronLeft, CheckCircle2,
  Clock, XCircle, ArrowRightCircle, Plus
} from 'lucide-react';

const assets = [
  { id: 'USDC', name: 'USD Coin', balance: '124,500.50', fiat: '$124,500.50', color: 'bg-blue-500', trend: '+2.4%', network: 'ERC-20' },
  { id: 'USDT', name: 'Tether', balance: '45,200.00', fiat: '$45,200.00', color: 'bg-teal-500', trend: '+1.1%', network: 'TRC-20' },
  { id: 'BTC', name: 'Bitcoin', balance: '2.45600', fiat: '$158,400.20', color: 'bg-orange-500', trend: '-0.5%', network: 'Bitcoin' },
  { id: 'ETH', name: 'Ethereum', balance: '18.500', fiat: '$64,200.50', color: 'bg-purple-500', trend: '+5.2%', network: 'ERC-20' },
];

const mockTransactions = [
  { id: 'TX-9821', type: 'Deposit', amount: '+ 5,000.00', status: 'Completed', time: '10 mins ago', hash: '0x123...abc' },
  { id: 'TX-9820', type: 'Withdrawal', amount: '- 1,200.00', status: 'Pending', time: '2 hours ago', hash: '0x456...def' },
  { id: 'TX-9819', type: 'Payment', amount: '+ 250.00', status: 'Completed', time: '5 hours ago', hash: '0x789...ghi' },
  { id: 'TX-9818', type: 'Refund', amount: '- 50.00', status: 'Failed', time: '1 day ago', hash: '0xabc...123' },
  { id: 'TX-9817', type: 'Deposit', amount: '+ 10,000.00', status: 'Completed', time: '2 days ago', hash: '0xdef...456' },
];

const Wallets = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [modalType, setModalType] = useState(null); // 'deposit' or 'withdraw'
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const WalletList = () => (
    <>
      {/* Portfolio Overview */}
      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs">Total Portfolio Balance</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">$392,301.20</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500 font-medium">↑ $4,250.00 (1.2%)</span>
              <span className="text-gray-500">vs last 24h</span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]">
              <Plus className="w-5 h-5" /> Add New Asset
            </button>
          </div>
        </div>
      </div>

      {/* Asset Cards */}
      <h3 className="text-xl font-bold text-white mb-6">Your Assets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div 
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="bg-[#13131A] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${asset.color}/20 flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{asset.id}</h4>
                  <p className="text-xs text-gray-500">{asset.name}</p>
                </div>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${asset.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {asset.trend}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{asset.balance}</div>
              <div className="text-sm text-gray-500">{asset.fiat}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const WalletDetails = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button 
        onClick={() => setSelectedAsset(null)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Wallets
      </button>

      {/* Asset Header */}
      <div className="bg-[#13131A] border border-white/5 rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-full ${selectedAsset.color}/20 flex items-center justify-center`}>
             <div className={`w-6 h-6 rounded-full ${selectedAsset.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-bold text-white">{selectedAsset.id}</h2>
              <span className="bg-white/10 text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{selectedAsset.network}</span>
            </div>
            <p className="text-gray-400">{selectedAsset.name}</p>
          </div>
        </div>
        <div className="flex flex-col md:items-end">
           <h3 className="text-3xl font-bold text-white mb-1">{selectedAsset.balance}</h3>
           <p className="text-gray-500 font-medium">{selectedAsset.fiat}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => setModalType('deposit')}
          className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-4 rounded-2xl font-bold transition-all"
        >
          <ArrowDownToLine className="w-5 h-5" /> Deposit {selectedAsset.id}
        </button>
        <button 
          onClick={() => setModalType('withdraw')}
          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-2xl font-bold transition-all"
        >
          <ArrowUpFromLine className="w-5 h-5" /> Withdraw
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Transaction History</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search TxID..." 
              className="bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5">
                <th className="pb-3 font-medium">Transaction ID</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-right">Status</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium text-right">Explorer</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {mockTransactions.map((tx, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 text-gray-400 font-mono text-xs">{tx.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {tx.type === 'Deposit' && <ArrowDownToLine className="w-4 h-4 text-green-500" />}
                      {tx.type === 'Withdrawal' && <ArrowUpFromLine className="w-4 h-4 text-blue-500" />}
                      {tx.type === 'Payment' && <ArrowRightCircle className="w-4 h-4 text-primary" />}
                      {tx.type === 'Refund' && <ArrowUpFromLine className="w-4 h-4 text-red-500" />}
                      <span className="text-gray-300">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 text-white font-medium text-right">{tx.amount} {selectedAsset.id}</td>
                  <td className="py-4 text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded bg-white/5 ${
                      tx.status === 'Completed' ? 'text-green-500' :
                      tx.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">{tx.time}</td>
                  <td className="py-4 text-right">
                    <a href="#" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium">
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          {!selectedAsset ? <WalletList /> : <WalletDetails />}
        </div>
      </div>

      {/* Modals */}
      {modalType && selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {modalType === 'deposit' ? 'Receive' : 'Withdraw'} {selectedAsset.id}
              </h3>
              <button 
                onClick={() => setModalType(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Deposit Content */}
            {modalType === 'deposit' && (
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  {/* Mock QR Code */}
                  <div className="w-48 h-48 bg-white rounded-2xl p-3 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <QrCode className="w-full h-full text-black" strokeWidth={1} />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Network</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary appearance-none">
                    <option>{selectedAsset.network}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Deposit Address</label>
                  <div className="flex bg-black/50 border border-white/10 rounded-xl overflow-hidden p-1">
                    <input 
                      type="text" 
                      readOnly 
                      className="w-full bg-transparent px-3 py-2 text-white focus:outline-none font-mono text-sm" 
                      value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" 
                    />
                    <button 
                      onClick={handleCopy}
                      className="bg-primary/20 hover:bg-primary/30 text-primary px-4 rounded-lg transition-colors flex items-center justify-center font-bold text-sm"
                    >
                      {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-yellow-500 mt-3 text-center flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" /> Send only {selectedAsset.id} to this address.
                  </p>
                </div>
              </div>
            )}

            {/* Withdraw Content */}
            {modalType === 'withdraw' && (
              <div className="p-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex justify-between items-center">
                   <span className="text-gray-400 text-sm">Available Balance</span>
                   <span className="text-white font-bold">{selectedAsset.balance} {selectedAsset.id}</span>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Destination Address</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary font-mono text-sm" placeholder={`Enter ${selectedAsset.id} address...`} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Network</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary appearance-none">
                      <option>{selectedAsset.network}</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-medium text-gray-400">Amount</label>
                      <button className="text-xs text-primary font-bold hover:text-primary/80">Max</button>
                    </div>
                    <div className="relative">
                      <input type="number" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary pr-16" placeholder="0.00" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">{selectedAsset.id}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span>Network Fee</span>
                    <span>~0.00012 {selectedAsset.id}</span>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl mt-4 transition-colors">
                    Preview Withdrawal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallets;
