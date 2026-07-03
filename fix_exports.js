const fs = require('fs');
const file = 'Backend/src/controllers/processorController.js';
let content = fs.readFileSync(file, 'utf8');

// There are TWO places where `volume: '` was corrupted by the bad replacement
const regex1 = /volume: '\r?\n\s+getDashboardSummary,[\s\S]*?deleteGeoRoutingRule\r?\n\};\r?\n /g;
content = content.replace(regex1, "volume: '$");

// We need to clean up the exports block. Currently it might be missing or duplicated.
// Let's just grab all exports and rewrite it at the bottom.
const exportsRegex = /module\.exports = \{[\s\S]*$/g;
content = content.replace(exportsRegex, ''); // Remove all module.exports at the bottom

const finalExports = `
module.exports = {
    getDashboardSummary,
    getProcessorHealth,
    getProcessingNodes,
    getVolumeAnalytics,
    getAlerts,
    configureNode,
    downloadReport,
    getFailoverMonitor,
    getFailoverEvents,
    getFailoverTriggers,
    updateTriggerSettings,
    triggerManualFailover,
    triggerRecovery,
    getFailoverLogs,
    getAlertSettings,
    updateAlertSettings,
    getGeoRoutingRules,
    createGeoRoutingRule,
    updateGeoRoutingRule,
    deleteGeoRoutingRule,
    getMerchantFees,
    overrideMerchantFee,
    getMerchantRules,
    updateMerchantRule,
    getSettlementEngineData,
    initiateSettlement,
    updateAutoSettleRules
};
`;

content = content.trim() + '\n' + finalExports;

fs.writeFileSync(file, content);
console.log('Fixed exports');
