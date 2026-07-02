const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'pages', 'dashboard', 'superadmin', 'processors', 'FailoverMonitor.jsx');
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace("import { LineChart,", "import apiClient from '../../../../utils/apiClient';\nimport { LineChart,");

// Remove constants
content = content.replace(/const initialLatencyData[\s\S]*?\];/g, '');

// Replace state
content = content.replace(
  "  const [latencyData, setLatencyData] = useState(initialLatencyData);",
  `  const [latencyData, setLatencyData] = useState(Array.from({ length: 20 }).map((_, i) => ({ time: \`\${i}s\`, stripe: 0, moonpay: 0, coinbase: 0 })));
  const [activeNodes, setActiveNodes] = useState([]);
  const [failoverEvents, setFailoverEvents] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);`
);

// Replace useEffect
content = content.replace(
  /  useEffect\(\(\) => \{[\s\S]*?return \(\) => clearInterval\(interval\);\n  \}, \[\]\);/,
  `  useEffect(() => {
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
  }, []);`
);

// Replace mapping inside JSX
content = content.replace(/node\.name/g, 'node.processorName');
content = content.replace(/node\.ping/g, '\`\$\{node.pingMs\}ms\`');
content = content.replace(/parseInt\(node\.ping\)/g, 'node.pingMs');
content = content.replace(/node\.load/g, '\`\$\{node.loadPercentage\}\%\`');

content = content.replace(/ev\.id/g, 'ev.eventId');
content = content.replace(/ev\.original/g, 'ev.sourceProcessor');
content = content.replace(/ev\.fallback/g, 'ev.targetProcessor');
content = content.replace(/ev\.trigger/g, 'ev.triggerReason');
content = content.replace(/ev\.time/g, 'new Date(ev.failoverAt).toLocaleString()');

// Replace logs modal
content = content.replace(
  /<div className="p-6 font-mono text-sm space-y-2 h-\[400px\] overflow-y-auto">[\s\S]*?<\/div>/,
  `<div className="p-6 font-mono text-sm space-y-2 h-[400px] overflow-y-auto">
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
            </div>`
);


// Replace handleSaveNotif
content = content.replace(
  /  const handleSaveNotif = \(\) => \{[\s\S]*?  \};/,
  `  const handleSaveNotif = async () => {
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
  };`
);


fs.writeFileSync(file, content);
console.log('Done');
