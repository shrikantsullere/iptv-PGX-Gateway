const fs = require('fs');

// 1. Update processorRoutes.js
const routesFile = 'Backend/src/routes/processorRoutes.js';
let routesContent = fs.readFileSync(routesFile, 'utf8');
if (!routesContent.includes('/merchant-rules')) {
  routesContent = routesContent.replace(
    'module.exports = router;',
    `// Merchant Fee Rules Routes
router.get('/merchant-rules', processorController.getMerchantRules);
router.put('/merchant-rules/:id', processorController.updateMerchantRule);

module.exports = router;`
  );
  fs.writeFileSync(routesFile, routesContent);
}

// 2. Update processorController.js
const controllerFile = 'Backend/src/controllers/processorController.js';
let controllerContent = fs.readFileSync(controllerFile, 'utf8');
if (!controllerContent.includes('getMerchantRules')) {
  const newMethods = `
const getMerchantRules = async (req, res, next) => {
    try {
        const merchants = await prisma.merchants.findMany({
            orderBy: { createdAt: 'desc' }
        });
        
        const rules = await prisma.merchant_fee_rules.findMany();
        
        const mergedData = merchants.map(m => {
            const rule = rules.find(r => r.merchantId === m.merchantId);
            return {
                id: m.merchantId,
                name: m.companyName,
                type: m.subscriptionPlan,
                volume: '$' + (m.revenue / 100).toLocaleString(),
                globalFee: '2.9% + $0.30', // Hardcoded global config for simplicity
                customFee: rule && rule.status === 'Custom' ? \`\${(rule.customFeePercentage / 100).toFixed(1)}% + $\${(rule.customFixedFee / 100).toFixed(2)}\` : '—',
                status: rule ? rule.status : 'Standard'
            };
        });

        return sendResponse(res, 200, true, 'Merchant rules fetched', mergedData);
    } catch (error) {
        next(error);
    }
};

const updateMerchantRule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { customPct, customFixed, reason } = req.body;
        
        const merchant = await prisma.merchants.findUnique({
            where: { merchantId: id }
        });
        
        if (!merchant) throw new Error('Merchant not found');
        
        // Parse percentages and fixed amounts (multiply by 100)
        const parsedPct = parseFloat(customPct) * 100 || 0;
        const parsedFixed = parseFloat(customFixed) * 100 || 0;
        
        const existingRule = await prisma.merchant_fee_rules.findFirst({
            where: { merchantId: id }
        });

        if (existingRule) {
            await prisma.merchant_fee_rules.update({
                where: { ruleId: existingRule.ruleId },
                data: {
                    customFeePercentage: parsedPct,
                    customFixedFee: parsedFixed,
                    overrideReason: reason || '',
                    status: 'Custom',
                    updatedAt: new Date()
                }
            });
        } else {
            await prisma.merchant_fee_rules.create({
                data: {
                    merchantId: id,
                    merchantName: merchant.companyName,
                    merchantType: merchant.subscriptionPlan,
                    globalFeePercentage: 290, // 2.9%
                    globalFixedFee: 30, // $0.30
                    customFeePercentage: parsedPct,
                    customFixedFee: parsedFixed,
                    overrideReason: reason || '',
                    status: 'Custom',
                    createdBy: 'System',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }

        return sendResponse(res, 200, true, 'Merchant rule updated successfully');
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
    'deleteGeoRoutingRule\n};',
    'deleteGeoRoutingRule,\n    getMerchantRules,\n    updateMerchantRule\n};'
  );
  
  fs.writeFileSync(controllerFile, controllerContent);
}

// 3. Update MerchantFeeRules.jsx
const frontendFile = 'frontend/src/pages/dashboard/superadmin/processors/MerchantFeeRules.jsx';
let frontendContent = fs.readFileSync(frontendFile, 'utf8');

// Remove static data
frontendContent = frontendContent.replace(/const merchantData = \[[\s\S]*?\];\r?\n\r?\n/, '');

// Replace setup
frontendContent = frontendContent.replace(
  '  const [search, setSearch] = useState(\'\');\n  const [editMerchant, setEditMerchant] = useState(null);',
  `  const [search, setSearch] = useState('');
  const [editMerchant, setEditMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/payment-processors/merchant-rules');
      if (res.success) {
        setMerchants(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch merchant rules', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);`
);

// Replace filtered mapping
frontendContent = frontendContent.replace(
  '  const filtered = merchantData.filter(',
  '  const filtered = merchants.filter('
);

// Update save logic
frontendContent = frontendContent.replace(
  /  const handleSave = \(\) => \{[\s\S]*?  \};/m,
  `  const handleSave = async () => {
    setSaving(true);
    const customPct = document.querySelector('input[name="customPct"]').value;
    const customFixed = document.querySelector('input[name="customFixed"]').value;
    const reason = document.querySelector('textarea[name="reason"]').value;
    
    try {
      const res = await apiClient.put(\`/admin/payment-processors/merchant-rules/\${editMerchant.id}\`, {
        customPct,
        customFixed,
        reason
      });
      if (res.success) {
        await fetchMerchants();
        setSaved(true);
        setTimeout(() => { setSaved(false); setEditMerchant(null); }, 1500);
      }
    } catch (error) {
      alert('Failed to override fee');
    } finally {
      setSaving(false);
    }
  };`
);

fs.writeFileSync(frontendFile, frontendContent);
console.log('Done fix3');
