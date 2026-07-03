import { useState, useEffect } from 'react';
import { ArrowDownToLine, Search, Clock, Copy, CheckCheck, QrCode, X, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC-20');
  const [isCopied, setIsCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/merchant/deposits');
      if (res.success && res.data) {
        setDeposits(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch deposits', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock generated address
  const generatedAddress = "TQa8xMwzH5B8iF1Jp5x2VzL9YkR4jT7w9X";

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredDeposits = deposits.filter(dep => 
    (dep.depositId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dep.asset || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dep.network || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(dep.amount).includes(searchTerm)
  );

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <ArrowDownToLine className="w-8 h-8 text-green-500" /> Deposits
              </h1>
              <p className="text-gray-400">Track all incoming funds and network confirmations.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 px-4 py-2 rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:scale-105">
                <QrCode className="w-4 h-4" /> Generate Address
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search deposits..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Deposit ID</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Asset</th>
                    <th className="p-4 font-medium">Network</th>
                    <th className="p-4 font-medium text-right">Amount</th>
                    <th className="p-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-green-500 mb-2" />
                        Fetching deposits...
                      </td>
                    </tr>
                  ) : filteredDeposits.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">No deposits found matching your criteria.</td>
                    </tr>
                  ) : filteredDeposits.map((dep, i) => (
                    <tr key={dep.depositId} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="p-4 text-gray-300 font-mono text-xs">{dep.depositId}</td>
                      <td className="p-4 text-gray-400 text-xs">{new Date(dep.createdAt).toLocaleString()}</td>
                      <td className="p-4 font-bold text-white">{dep.asset}</td>
                      <td className="p-4">
                        <span className="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">{dep.network}</span>
                      </td>
                      <td className="p-4 text-green-400 font-bold text-right">+ {Number(dep.amount).toLocaleString()} {dep.asset}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                          dep.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' :
                          dep.status === 'Confirming' ? 'bg-blue-500/10 text-blue-500' : 
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {dep.status === 'Confirming' && <Clock className="w-3 h-3 animate-spin-slow" />}
                          {dep.status}
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

      {/* Generate Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-green-500/10 to-transparent shrink-0">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-green-500" /> Receive Crypto
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Asset</label>
                  <select 
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none font-bold"
                  >
                    <option value="USDT">USDT (Tether)</option>
                    <option value="USDC">USDC (USD Coin)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                    <option value="ETH">ETH (Ethereum)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Network</label>
                  <select 
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none font-bold"
                  >
                    <option value="TRC-20">TRC-20 (Tron)</option>
                    <option value="ERC-20">ERC-20 (Ethereum)</option>
                    <option value="Polygon">Polygon (MATIC)</option>
                    <option value="BEP-20">BEP-20 (BSC)</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#09090B] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center relative">
                <div className="w-40 h-40 bg-white p-2 rounded-xl mb-4 shadow-xl">
                  {/* Fake QR code visualization */}
                  <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover bg-center opacity-90"></div>
                </div>
                <p className="text-xs text-green-500 font-bold uppercase tracking-widest mb-1">Send only {selectedAsset} to this address</p>
                <p className="text-xs text-gray-500 mb-4 text-center">Sending any other asset to this {selectedNetwork} address may result in permanent loss.</p>
                
                <div className="w-full flex items-center justify-between bg-[#13131A] border border-white/10 rounded-xl p-3 group">
                  <span className="text-gray-300 font-mono text-xs truncate max-w-[200px]">{generatedAddress}</span>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    {isCopied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Deposits;
