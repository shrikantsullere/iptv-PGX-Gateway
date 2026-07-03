import { useState, useEffect } from 'react';
import { 
  Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, 
  Search, ExternalLink, QrCode, Copy, ChevronLeft, CheckCircle2,
  Clock, XCircle, ArrowRightCircle, Plus, Loader2
} from 'lucide-react';
import apiClient from '../../utils/apiClient';

// mockTransactions removed as it will be fetched from API

const Wallets = () => {
  const [assetsList, setAssetsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [modalType, setModalType] = useState(null); // 'deposit' or 'withdraw'
  const [copied, setCopied] = useState(false);
  const [addingAsset, setAddingAsset] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    if (selectedAsset) {
      fetchTransactions();
    }
  }, [selectedAsset]);

  const fetchTransactions = async () => {
    try {
      setLoadingTx(true);
      const res = await apiClient.get('/admin/transactions');
      if (res.success && res.data) {
        // Map to match frontend format
        const mapped = res.data.map(tx => ({
          id: tx.transactionId.substring(0, 8),
          type: tx.paymentMethod === 'Crypto' ? 'Deposit' : 'Payment', // Simple mapping
          amount: (tx.paymentMethod === 'Crypto' ? '+ ' : '- ') + tx.amount,
          status: tx.status,
          time: new Date(tx.createdAt).toLocaleString(),
          hash: tx.transactionHash
        }));
        setTransactions(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch transactions');
    } finally {
      setLoadingTx(false);
    }
  };

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/wallets');
      if (res.success && res.data) {
        setAssetsList(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch wallets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = async (coinString) => {
    const parts = coinString.split(' ');
    const id = parts[0];
    const name = parts.slice(1).join(' ').replace(/[()]/g, '');
    
    if (assetsList.some(a => a.id === id)) {
      setModalType(null);
      return;
    }

    try {
      setAddingAsset(true);
      const res = await apiClient.post('/admin/wallets', { id, name, network: 'Mainnet' });
      if (res.success) {
        fetchWallets();
        setModalType(null);
      }
    } catch (error) {
      alert('Failed to add asset');
    } finally {
      setAddingAsset(false);
    }
  };

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
            <button 
              onClick={() => setModalType('add_asset')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" /> Add New Asset
            </button>
          </div>
        </div>
      </div>

      {/* Asset Cards */}
      <h3 className="text-xl font-bold text-white mb-6">Your Assets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : assetsList.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">No assets found. Add an asset to get started.</div>
        ) : assetsList.map((asset) => (
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
              {loadingTx ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-primary">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">No transactions found.</td>
                </tr>
              ) : transactions.map((tx, i) => (
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
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#09090B]">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {modalType === 'deposit' ? `Receive ${selectedAsset?.id}` : 
                 modalType === 'withdraw' ? `Withdraw ${selectedAsset?.id}` : 
                 'Add New Asset'}
              </h3>
              <button 
                onClick={() => setModalType(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Deposit Content */}
            {modalType === 'deposit' && selectedAsset && (
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
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
            {modalType === 'withdraw' && selectedAsset && (
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
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
            {/* Add Asset Content */}
            {modalType === 'add_asset' && (
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 flex flex-col">
                <p className="text-gray-400 text-sm mb-6">Select a new asset to add to your PGX Merchant Wallet portfolio.</p>
                <div className="space-y-4 mb-6">
                  {['BNB (Binance Coin)', 'SOL (Solana)', 'ADA (Cardano)', 'XRP (Ripple)'].map((coin, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-primary/50 hover:bg-white/[0.02] transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-white/10">{coin.split(' ')[0]}</div>
                        <span className="font-bold text-gray-200">{coin}</span>
                      </div>
                      <button 
                        onClick={() => handleAddAsset(coin)}
                        className="text-primary font-bold text-sm bg-primary/10 px-5 py-2 rounded-lg hover:bg-primary/20 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 shrink-0">
                  <button 
                    onClick={() => setModalType(null)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    Cancel
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
