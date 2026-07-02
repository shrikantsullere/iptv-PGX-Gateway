const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'pages', 'dashboard', 'superadmin', 'processors', 'FailoverMonitor.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
if (!content.includes('import apiClient')) {
  content = content.replace(
    "import { LineChart,",
    "import apiClient from '../../../../utils/apiClient';\nimport { LineChart,"
  );
}

// 2. Remove constants
content = content.replace(/const initialLatencyData = [\s\S]*?\]\)\);\n\n/g, '');
content = content.replace(/const failoverEvents = \[[\s\S]*?\];\n\n/g, '');
content = content.replace(/const activeNodes = \[[\s\S]*?\];\n\n/g, '');

// 3. Update States
content = content.replace(
  "  const [latencyData, setLatencyData] = useState(initialLatencyData);",
  `  const [latencyData, setLatencyData] = useState(Array.from({ length: 20 }).map((_, i) => ({ time: \`\${i}s\`, stripe: 0, moonpay: 0, coinbase: 0 })));
  const [activeNodes, setActiveNodes] = useState([]);
  const [failoverEvents, setFailoverEvents] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);`
);

// 4. Update useEffect
const oldUseEffect = `  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: 'now',
          stripe: Math.floor(Math.random() * 50) + 20,
          moonpay: Math.floor(Math.random() * 80) + 40,
          coinbase: Math.floor(Math.random() * 200) + 100,
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);`;

const newUseEffect = `  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nodesRes, eventsRes, triggersRes, logsRes, settingsRes] = await Promise.all([
          apiClient.get('/admin/payment-processors/failover-monitor/nodes'),
          apiClient.get('/admin/payment-processors/failover-monitor/events'),
          apiClient.get('/admin/payment-processors/failover-monitor/triggers'),
          apiClient.get('/admin/payment-processors/failover-monitor/logs'),
          apiClient.get('/admin/payment-processors/failover-monitor/alert-settings')
        ]);
        
        if (nodesRes.success) setActiveNodes(nodesRes.data);
        if (eventsRes.success) setFailoverEvents(eventsRes.data);
        if (triggersRes.success) setTriggers(triggersRes.data);
        if (logsRes.success) setLogs(logsRes.data);
        if (settingsRes.success && settingsRes.data) {
          setAlertEmail(settingsRes.data.email || 'admin@pgxgateway.com');
          setNotifToggles({
            failover: settingsRes.data.failoverAlert !== false,
            degraded: settingsRes.data.degradeAlert !== false,
            recovered: settingsRes.data.recoveryAlert || false,
            dailyDigest: settingsRes.data.dailyDigest !== false,
          });
        }
      } catch (error) {
        console.error('Failed to fetch failover monitor data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const interval = setInterval(async () => {
      try {
        const res = await apiClient.get('/admin/payment-processors/failover-monitor/nodes');
        if (res.success) {
          setActiveNodes(res.data);
          setLatencyData(prev => {
            const newData = [...prev.slice(1)];
            const stripeNode = res.data.find(n => n.processorName === 'Stripe') || { pingMs: 0 };
            const moonpayNode = res.data.find(n => n.processorName === 'MoonPay') || { pingMs: 0 };
            const coinbaseNode = res.data.find(n => n.processorName === 'Coinbase') || { pingMs: 0 };
            newData.push({
              time: 'now',
              stripe: stripeNode.pingMs,
              moonpay: moonpayNode.pingMs,
              coinbase: coinbaseNode.pingMs,
            });
            return newData;
          });
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);`;

content = content.replace(oldUseEffect, newUseEffect);

// 5. Replace mapped variables in JSX
content = content.replace(/\{node\.name\}/g, '{node.processorName}');
content = content.replace(/\{node\.ping\}/g, '{node.pingMs}ms');
content = content.replace(/parseInt\(node\.ping\)/g, 'node.pingMs');
content = content.replace(/\{node\.load\}/g, '{node.loadPercentage}%');

content = content.replace(/\{ev\.id\}/g, '{ev.eventId}');
content = content.replace(/\{ev\.original\}/g, '{ev.sourceProcessor}');
content = content.replace(/\{ev\.fallback\}/g, '{ev.targetProcessor}');
content = content.replace(/\{ev\.trigger\}/g, '{ev.triggerReason}');
content = content.replace(/\{ev\.time\}/g, '{new Date(ev.failoverAt).toLocaleString()}');

// 6. Replace Logs Modal content
const oldLogsModal = `<div className="p-6 font-mono text-sm space-y-2 h-[400px] overflow-y-auto">
              <div className="text-gray-400">[12:43:02] <span className="text-green-500">INFO</span> - Health check passed for Stripe EU. Latency: 32ms.</div>
              <div className="text-gray-400">[12:44:10] <span className="text-orange-500">WARN</span> - Coinbase latency spiked to 450ms.</div>
              <div className="text-gray-400">[12:44:15] <span className="text-red-500">ERROR</span> - MoonPay connection timeout.</div>
              <div className="text-gray-400">[12:45:00] <span className="text-cyan-500">SYSTEM</span> - Initiated failover FO-9922. Fallback: Stripe US.</div>
              <div className="text-gray-400">[12:46:12] <span className="text-green-500">INFO</span> - Failover completed successfully.</div>
            </div>`;
const newLogsModal = `<div className="p-6 font-mono text-sm space-y-2 h-[400px] overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="text-gray-400">
                  [{new Date(log.createdAt).toLocaleTimeString()}] 
                  <span className={log.statusCode >= 500 ? "text-red-500 ml-1" : log.statusCode >= 400 ? "text-orange-500 ml-1" : "text-green-500 ml-1"}>
                    {log.statusCode >= 500 ? 'ERROR' : log.statusCode >= 400 ? 'WARN' : 'INFO'}
                  </span>
                  - {log.processorName} {log.requestMethod} {log.endpoint} - Latency: {log.latencyMs}ms
                </div>
              ))}
              {logs.length === 0 && <div className="text-gray-500">No recent logs found.</div>}
            </div>`;
content = content.replace(oldLogsModal, newLogsModal);

// 7. Update handleSaveNotif
const oldHandleSaveNotif = `  const handleSaveNotif = () => {
    setNotifSaving(true);
    setTimeout(() => {
      setNotifSaving(false);
      setNotifSaved(true);
      setTimeout(() => setNotifSaved(false), 2500);
    }, 1200);
  };`;

const newHandleSaveNotif = `  const handleSaveNotif = async () => {
    setNotifSaving(true);
    try {
      await apiClient.put('/admin/payment-processors/failover-monitor/alert-settings', {
        email: alertEmail,
        failoverAlert: notifToggles.failover,
        degradeAlert: notifToggles.degraded,
        recoveryAlert: notifToggles.recovered,
        dailyDigest: notifToggles.dailyDigest,
      });
      setNotifSaved(true);
      setTimeout(() => setNotifSaved(false), 2500);
    } catch (error) {
      console.error('Failed to save notification settings', error);
    } finally {
      setNotifSaving(false);
    }
  };`;
content = content.replace(oldHandleSaveNotif, newHandleSaveNotif);

// Add loading state UI at top
content = content.replace(
  `  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">`,
  `  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
        <p className="text-gray-400 font-bold">Loading Failover Monitor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 w-full pb-8">`
);

// Triggers section (Replace with dynamic triggers if any, wait, there are triggers mapped)
// Actually we can leave triggers as static HTML for now, or map them, but the user said "replace dummy data with proper workflow".
// I'll dynamically map triggers.
const oldTriggers = `<div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">High Latency</span>
                <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded font-bold">Enabled</span>
              </div>
              <p className="text-xs text-gray-400">Triggers failover if ping exceeds <strong className="text-white">500ms</strong> for 3 consecutive checks.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">HTTP 5xx Errors</span>
                <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded font-bold">Enabled</span>
              </div>
              <p className="text-xs text-gray-400">Triggers immediate failover upon receiving <strong className="text-white">503/504</strong> status codes.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">Success Drop</span>
                <span className="bg-gray-500/20 text-gray-500 text-xs px-2 py-0.5 rounded font-bold">Disabled</span>
              </div>
              <p className="text-xs text-gray-400">Triggers if approval rate drops below 85% in a 10 min window.</p>
            </div>
          </div>`;

const newTriggers = `<div className="space-y-4">
            {triggers.map((trigger, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-white">{trigger.triggerName}</span>
                  <span className={trigger.enabled ? "bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded font-bold" : "bg-gray-500/20 text-gray-500 text-xs px-2 py-0.5 rounded font-bold"}>
                    {trigger.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Threshold: <strong className="text-white">{trigger.threshold}</strong></p>
              </div>
            ))}
            {triggers.length === 0 && <div className="text-gray-500">No triggers configured.</div>}
          </div>`;

content = content.replace(oldTriggers, newTriggers);


fs.writeFileSync(file, content);
console.log('Done');
