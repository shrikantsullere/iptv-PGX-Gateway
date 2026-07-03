const fs = require('fs');
const path = require('path');

// 1. Update Routes
const routesFile = 'Backend/src/routes/processorRoutes.js';
let routesContent = fs.readFileSync(routesFile, 'utf8');
if (!routesContent.includes('/settlement-engine')) {
  routesContent = routesContent.replace(
    'module.exports = router;',
    `// Settlement Engine Routes
router.get('/settlement-engine', processorController.getSettlementEngineData);
router.post('/settlement-engine/settle', processorController.initiateSettlement);
router.put('/settlement-engine/auto-settle', processorController.updateAutoSettleRules);

module.exports = router;`
  );
  fs.writeFileSync(routesFile, routesContent);
}

// 2. Update Controller
const controllerFile = 'Backend/src/controllers/processorController.js';
let controllerContent = fs.readFileSync(controllerFile, 'utf8');
if (!controllerContent.includes('getSettlementEngineData')) {
  const newMethods = `
const getSettlementEngineData = async (req, res, next) => {
    try {
        let balances = await prisma.processor_settlements.findMany({
            orderBy: { createdAt: 'asc' }
        });
        
        if (balances.length === 0) {
            await prisma.processor_settlements.createMany({
                data: [
                    { processorId: '1', processorName: 'Stripe Gateway US', currency: 'USD', availableBalance: 4824000, pendingBalance: 1218000, totalSettled: 82450000, status: 'Active', createdAt: new Date(), updatedAt: new Date() },
                    { processorId: '2', processorName: 'Stripe Gateway EU', currency: 'EUR', availableBalance: 2288000, pendingBalance: 840000, totalSettled: 41020000, status: 'Active', createdAt: new Date(), updatedAt: new Date() },
                    { processorId: '3', processorName: 'MoonPay Crypto', currency: 'USD', availableBalance: 912000, pendingBalance: 340000, totalSettled: 18000000, status: 'Active', createdAt: new Date(), updatedAt: new Date() },
                    { processorId: '4', processorName: 'Coinbase Commerce', currency: 'USD', availableBalance: 456000, pendingBalance: 180000, totalSettled: 9500000, status: 'Active', createdAt: new Date(), updatedAt: new Date() }
                ]
            });
            balances = await prisma.processor_settlements.findMany({ orderBy: { createdAt: 'asc' } });
        }
        
        let recentSettlements = await prisma.settlement_batches.findMany({
            orderBy: { completedAt: 'desc' },
            take: 10
        });
        
        if (recentSettlements.length === 0) {
            await prisma.settlement_batches.createMany({
                data: [
                    { processorId: '1', amount: 8240000, destinationAccount: 'Primary Bank', settlementMethod: 'Wire Transfer', status: 'Completed', initiatedBy: 'System', completedAt: new Date(Date.now() - 86400000 * 1) },
                    { processorId: '2', amount: 4120000, destinationAccount: 'Primary Bank', settlementMethod: 'SEPA', status: 'Completed', initiatedBy: 'System', completedAt: new Date(Date.now() - 86400000 * 2) },
                    { processorId: '3', amount: 1890000, destinationAccount: 'Crypto Wallet', settlementMethod: 'Wire Transfer', status: 'Completed', initiatedBy: 'System', completedAt: new Date(Date.now() - 86400000 * 3) },
                ]
            });
            recentSettlements = await prisma.settlement_batches.findMany({ orderBy: { completedAt: 'desc' }, take: 10 });
        }
        
        let autoSettle = await prisma.auto_settlement_rules.findFirst();
        if (!autoSettle) {
            autoSettle = await prisma.auto_settlement_rules.create({
                data: {
                    frequency: 'Daily at 00:00 UTC',
                    minimumThreshold: 500000,
                    includedProcessors: JSON.stringify(['All Active Processors']),
                    enabled: true,
                    createdAt: new Date()
                }
            });
        }
        
        return sendResponse(res, 200, true, 'Settlement engine data fetched', {
            balances,
            recentSettlements,
            autoSettle
        });
    } catch (error) {
        next(error);
    }
};

const initiateSettlement = async (req, res, next) => {
    try {
        const { processor, amount, destination } = req.body;
        
        const parsedAmount = parseFloat(amount.replace(/[^0-9.-]+/g,"")) * 100 || 0;
        
        const newBatch = await prisma.settlement_batches.create({
            data: {
                processorId: processor, // Assuming processor is passed as name or id
                amount: parsedAmount,
                destinationAccount: destination,
                settlementMethod: 'Wire Transfer',
                status: 'Completed',
                initiatedBy: 'Admin',
                completedAt: new Date()
            }
        });
        
        return sendResponse(res, 200, true, 'Settlement initiated', newBatch);
    } catch (error) {
        next(error);
    }
};

const updateAutoSettleRules = async (req, res, next) => {
    try {
        const { frequency, threshold, processors, enabled } = req.body;
        
        let rule = await prisma.auto_settlement_rules.findFirst();
        if (rule) {
            rule = await prisma.auto_settlement_rules.update({
                where: { ruleId: rule.ruleId },
                data: {
                    frequency: frequency !== undefined ? frequency : rule.frequency,
                    minimumThreshold: threshold !== undefined ? parseInt(threshold) * 100 : rule.minimumThreshold,
                    includedProcessors: processors ? JSON.stringify([processors]) : rule.includedProcessors,
                    enabled: enabled !== undefined ? enabled : rule.enabled
                }
            });
        }
        return sendResponse(res, 200, true, 'Auto-settle rules updated', rule);
    } catch (error) {
        next(error);
    }
};
`;

  controllerContent = controllerContent.replace(
    'module.exports = {',
    newMethods + '\nmodule.exports = {'
  );
  
  controllerContent = controllerContent.replace(
    'updateMerchantRule\n};',
    'updateMerchantRule,\n    getSettlementEngineData,\n    initiateSettlement,\n    updateAutoSettleRules\n};'
  );
  
  fs.writeFileSync(controllerFile, controllerContent);
}

// 3. Update Frontend 
const frontendFile = 'frontend/src/pages/dashboard/superadmin/processors/SettlementEngine.jsx';
let frontendContent = fs.readFileSync(frontendFile, 'utf8');

// Add imports
if (!frontendContent.includes('import apiClient')) {
  frontendContent = frontendContent.replace(
    "import { Landmark,",
    "import apiClient from '../../../../utils/apiClient';\nimport { useEffect } from 'react';\nimport { Landmark,"
  );
  frontendContent = frontendContent.replace("import { useState } from 'react';\nimport apiClient", "import { useState, useEffect } from 'react';\nimport apiClient");
  frontendContent = frontendContent.replace("import { useState } from 'react';\n", "");
}

// Remove static data
frontendContent = frontendContent.replace(/const balances = \[[\s\S]*?\];\r?\n\r?\n/, '');
frontendContent = frontendContent.replace(/const recentSettlements = \[[\s\S]*?\];\r?\n\r?\n/, '');

// Replace state setup
frontendContent = frontendContent.replace(
  '  const [showModifyModal, setShowModifyModal] = useState(false);',
  `  const [showModifyModal, setShowModifyModal] = useState(false);
  
  const [balances, setBalances] = useState([]);
  const [recentSettlements, setRecentSettlements] = useState([]);
  const [autoSettleRule, setAutoSettleRule] = useState({ frequency: 'Daily at 00:00 UTC', minimumThreshold: 500000 });

  const fetchData = async () => {
    try {
      const res = await apiClient.get('/admin/payment-processors/settlement-engine');
      if (res.success) {
        const { balances, recentSettlements, autoSettle } = res.data;
        setBalances(balances.map(b => ({
          processor: b.processorName,
          available: (b.currency === 'USD' ? '$' : '€') + (b.availableBalance / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          pending: (b.currency === 'USD' ? '$' : '€') + (b.pendingBalance / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          settled: (b.currency === 'USD' ? '$' : '€') + (b.totalSettled / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          currency: b.currency
        })));
        
        setRecentSettlements(recentSettlements.map((s, i) => ({
          id: \`SET-\${8821 - i}\`,
          processor: s.processorId === '1' ? 'Stripe US' : s.processorId === '2' ? 'Stripe EU' : s.processorId === '3' ? 'MoonPay' : s.processorId,
          amount: '$' + (s.amount / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          date: new Date(s.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          method: s.settlementMethod,
          status: s.status
        })));
        
        setAutoSettleRule(autoSettle);
        setIsAutoSettleEnabled(autoSettle.enabled);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);`
);

// Replace handleSettle
frontendContent = frontendContent.replace(
  /  const handleSettle = \(\) => \{[\s\S]*?  \};/m,
  `  const handleSettle = async () => {
    setSettling(true);
    const amount = document.querySelector('input[placeholder="e.g. 48000.00"]').value;
    const processor = document.querySelector('select').value;
    const destination = document.querySelectorAll('select')[1].value;
    
    try {
        const res = await apiClient.post('/admin/payment-processors/settlement-engine/settle', { amount, processor, destination });
        if (res.success) {
            await fetchData();
            setSettled(true);
            setTimeout(() => { setSettled(false); setShowSettleModal(false); }, 2000);
        }
    } catch(e) {
        alert('Failed to settle');
    } finally {
        setSettling(false);
    }
  };
  
  const handleSaveAutoSettle = async () => {
    const frequency = document.querySelector('select:nth-of-type(1)').value;
    const threshold = document.querySelector('input[type="number"]').value;
    const processors = document.querySelector('select:nth-of-type(2)').value;
    
    try {
        const res = await apiClient.put('/admin/payment-processors/settlement-engine/auto-settle', { frequency, threshold, processors });
        if (res.success) {
            await fetchData();
            setShowModifyModal(false);
        }
    } catch(e) {
        alert('Failed to save rules');
    }
  };
  
  const toggleAutoSettle = async () => {
    const newState = !isAutoSettleEnabled;
    setIsAutoSettleEnabled(newState);
    try {
        await apiClient.put('/admin/payment-processors/settlement-engine/auto-settle', { enabled: newState });
    } catch(e) {
        setIsAutoSettleEnabled(!newState);
    }
  };`
);

// Replace mapping inside the jsx
frontendContent = frontendContent.replace(
  `Scheduled: Daily at <strong className="text-white">00:00 UTC</strong> | Minimum threshold: <strong className="text-white">$5,000</strong>`,
  `Scheduled: <strong className="text-white">{autoSettleRule.frequency}</strong> | Minimum threshold: <strong className="text-white">$\{autoSettleRule.minimumThreshold / 100}</strong>`
);

// Update toggle handler
frontendContent = frontendContent.replace(
  `onClick={() => setIsAutoSettleEnabled(!isAutoSettleEnabled)}`,
  `onClick={toggleAutoSettle}`
);

// Modify Auto-Settle Rules modal inputs
frontendContent = frontendContent.replace(
  `<input type="number" defaultValue="5000"`,
  `<input type="number" defaultValue={autoSettleRule.minimumThreshold ? autoSettleRule.minimumThreshold / 100 : 5000}`
);

// Update save rules button action
frontendContent = frontendContent.replace(
  `<button onClick={() => setShowModifyModal(false)} className="flex-1 bg-cyan-600`,
  `<button onClick={handleSaveAutoSettle} className="flex-1 bg-cyan-600`
);

fs.writeFileSync(frontendFile, frontendContent);
console.log('Done fix4');
