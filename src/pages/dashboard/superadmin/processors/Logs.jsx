import { useState } from 'react';
import { ScrollText, Search, Filter, Download, AlertCircle, CheckCircle2, XCircle, Clock, RefreshCw } from 'lucide-react';

const allLogs = [
  { id: 'LOG-9921', time: '16:14:02', processor: 'Stripe US', txId: 'pi_3N2abc...', endpoint: '/v1/charges', status: 200, latency: '145ms', method: 'POST' },
  { id: 'LOG-9920', time: '16:13:58', processor: 'MoonPay', txId: 'mp_tx_88...', endpoint: '/v3/transactions', status: 200, latency: '234ms', method: 'POST' },
  { id: 'LOG-9919', time: '16:13:42', processor: 'Coinbase', txId: 'cb_ord_91...', endpoint: '/v2/orders', status: 503, latency: '4120ms', method: 'POST' },
  { id: 'LOG-9918', time: '16:13:38', processor: 'Stripe EU', txId: 'pi_3N2xyz...', endpoint: '/v1/payment_intents', status: 200, latency: '88ms', method: 'POST' },
  { id: 'LOG-9917', time: '16:12:55', processor: 'Stripe US', txId: 'pi_3N2def...', endpoint: '/v1/charges', status: 402, latency: '320ms', method: 'POST' },
  { id: 'LOG-9916', time: '16:12:41', processor: 'LocalGate', txId: 'lg_tx_55...', endpoint: '/api/charge', status: 200, latency: '192ms', method: 'POST' },
  { id: 'LOG-9915', time: '16:11:22', processor: 'Stripe US', txId: 'pi_3N2ghi...', endpoint: '/v1/refunds', status: 200, latency: '112ms', method: 'POST' },
  { id: 'LOG-9914', time: '16:10:09', processor: 'MoonPay', txId: 'mp_tx_77...', endpoint: '/v3/transactions', status: 500, latency: '8920ms', method: 'POST' },
];

const statusColor = (code) => {
  if (code >= 500) return { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20', icon: <XCircle className="w-3 h-3" /> };
  if (code >= 400) return { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', icon: <AlertCircle className="w-3 h-3" /> };
  return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', icon: <CheckCircle2 className="w-3 h-3" /> };
};

const latencyColor = (lat) => {
  const ms = parseInt(lat);
  if (ms > 2000) return 'text-red-400';
  if (ms > 500) return 'text-orange-400';
  return 'text-green-400';
};

const processorList = ['All', 'Stripe US', 'Stripe EU', 'MoonPay', 'Coinbase', 'LocalGate'];
const statusFilters = ['All', '200', '402', '500', '503'];

export default function Logs() {
  const [search, setSearch] = useState('');
  const [processorFilter, setProcessorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedLog, setExpandedLog] = useState(null);

  const filtered = allLogs.filter(l => {
    const matchSearch = l.txId.includes(search) || l.id.includes(search) || l.processor.toLowerCase().includes(search.toLowerCase());
    const matchProcessor = processorFilter === 'All' || l.processor === processorFilter;
    const matchStatus = statusFilter === 'All' || l.status.toString() === statusFilter;
    return matchSearch && matchProcessor && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ScrollText className="w-8 h-8 text-pink-500" /> Processor Logs
          </h1>
          <p className="text-gray-400 mt-1">Raw API transaction logs, status codes, and webhook responses.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex-1 sm:flex-none bg-pink-600 hover:bg-pink-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: allLogs.length, color: 'text-white' },
          { label: 'Success (2xx)', value: allLogs.filter(l => l.status < 300).length, color: 'text-green-500' },
          { label: 'Client Errors (4xx)', value: allLogs.filter(l => l.status >= 400 && l.status < 500).length, color: 'text-orange-500' },
          { label: 'Server Errors (5xx)', value: allLogs.filter(l => l.status >= 500).length, color: 'text-red-500' },
        ].map((s, i) => (
          <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 text-center shadow-xl">
            <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/5 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search TX ID, Log ID, or Processor..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select value={processorFilter} onChange={e => setProcessorFilter(e.target.value)} className="bg-transparent text-white text-xs font-bold focus:outline-none">
                {processorList.map(p => <option key={p} className="bg-[#13131A]">{p}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent text-white text-xs font-bold focus:outline-none">
                {statusFilters.map(s => <option key={s} className="bg-[#13131A]">Status: {s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                <th className="p-5 font-bold uppercase tracking-wider">Log ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Time</th>
                <th className="p-5 font-bold uppercase tracking-wider">Processor</th>
                <th className="p-5 font-bold uppercase tracking-wider">TX ID</th>
                <th className="p-5 font-bold uppercase tracking-wider">Endpoint</th>
                <th className="p-5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-white/5 font-mono">
              {filtered.map((log, i) => {
                const sc = statusColor(log.status);
                return (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setExpandedLog(expandedLog?.id === log.id ? null : log)}
                  >
                    <td className="p-5 font-bold text-gray-300">{log.id}</td>
                    <td className="p-5 text-gray-500">{log.time}</td>
                    <td className="p-5">
                      <span className="bg-white/5 border border-white/10 text-gray-200 px-2 py-1 rounded text-[10px] font-bold">{log.processor}</span>
                    </td>
                    <td className="p-5 text-gray-400">{log.txId}</td>
                    <td className="p-5 text-blue-300">{log.endpoint}</td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-black uppercase border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {sc.icon} {log.status}
                      </span>
                    </td>
                    <td className={`p-5 text-right font-black ${latencyColor(log.latency)}`}>{log.latency}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <ScrollText className="w-12 h-12 opacity-30 mx-auto mb-3" />
            <p className="font-medium">No logs match your filters.</p>
          </div>
        )}
      </div>

      {/* Expanded Log Detail */}
      {expandedLog && (
        <div className="bg-[#09090B] border border-[#7C3AED]/30 rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-black text-white flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-pink-500" /> Log Detail: {expandedLog.id}
            </h4>
            <button onClick={() => setExpandedLog(null)} className="text-gray-500 hover:text-white transition-colors">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <pre className="bg-black/60 border border-white/5 rounded-xl p-4 text-xs font-mono text-green-400 overflow-x-auto custom-scrollbar whitespace-pre-wrap">
{JSON.stringify({
  log_id: expandedLog.id,
  timestamp: `2025-06-29T${expandedLog.time}Z`,
  processor: expandedLog.processor,
  transaction_id: expandedLog.txId,
  request: { method: expandedLog.method, endpoint: expandedLog.endpoint },
  response: { status: expandedLog.status, latency_ms: parseInt(expandedLog.latency) },
  metadata: { gateway_version: 'v2.4.1', region: 'us-east-1' }
}, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
