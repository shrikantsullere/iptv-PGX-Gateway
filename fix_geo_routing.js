const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend', 'src', 'pages', 'dashboard', 'superadmin', 'processors', 'GeoRouting.jsx');
let content = fs.readFileSync(file, 'utf8');

// Add imports
if (!content.includes('import apiClient')) {
  content = content.replace(
    "import { Globe,",
    "import apiClient from '../../../../utils/apiClient';\nimport { useEffect } from 'react';\nimport { Globe,"
  );
  // Also change "import { useState } from 'react';" if needed. But it's already there. 
  // Let's just fix it properly.
  content = content.replace("import { useState } from 'react';\nimport apiClient", "import { useState, useEffect } from 'react';\nimport apiClient");
  content = content.replace("import { useState } from 'react';\n", "");
}

// Remove static rules
content = content.replace(/const routingRules = \[[\s\S]*?\];\n\n/, '');

// Replace state and add useEffect
content = content.replace(
  "  const [rules, setRules] = useState(routingRules);",
  `  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/payment-processors/geo-routing/rules');
      if (res.success) {
        setRules(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch geo routing rules', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);`
);

// Replace deleteRule
content = content.replace(
  /  const deleteRule = \(id\) => setRules\(r => r\.filter\(x => x\.id !== id\)\);/,
  `  const deleteRule = async (id) => {
    try {
      const res = await apiClient.delete(\`/admin/payment-processors/geo-routing/rules/\${id}\`);
      if (res.success) {
        setRules(r => r.filter(x => x.ruleId !== id));
      }
    } catch (error) {
      alert('Failed to delete rule');
    }
  };`
);

// Replace handleAddRule
content = content.replace(
  /  const handleAddRule = \(e\) => \{[\s\S]*?setShowAddModal\(false\);\n  \};/,
  `  const handleAddRule = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRule = {
      region: formData.get('region'),
      countries: formData.get('countries'),
      processor: formData.get('processor'),
      priority: parseInt(formData.get('priority')),
    };
    
    try {
      const res = await apiClient.post('/admin/payment-processors/geo-routing/rules', newRule);
      if (res.success) {
        await fetchRules();
        setShowAddModal(false);
      }
    } catch (error) {
      alert('Failed to add rule');
    }
  };`
);

// Replace handleEditRule
content = content.replace(
  /  const handleEditRule = \(e\) => \{[\s\S]*?setEditRule\(null\);\n  \};/,
  `  const handleEditRule = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      region: formData.get('region'),
      countries: formData.get('countries'),
      processor: formData.get('processor'),
      priority: parseInt(formData.get('priority')),
    };
    
    try {
      const res = await apiClient.put(\`/admin/payment-processors/geo-routing/rules/\${editRule.ruleId}\`, updated);
      if (res.success) {
        await fetchRules();
        setEditRule(null);
      }
    } catch (error) {
      alert('Failed to update rule');
    }
  };`
);

// Map properties correctly in JSX

// 1. Processor count
content = content.replace(
  /new Set\(rules\.map\(r => r\.processor\)\)\.size/,
  'new Set(rules.map(r => r.processorName)).size'
);

// 2. Map rule.id to rule.ruleId
content = content.replace(/key=\{rule\.id\}/g, 'key={rule.ruleId}');
content = content.replace(/deleteRule\(rule\.id\)/g, 'deleteRule(rule.ruleId)');

// 3. Map region
content = content.replace(/\{rule\.region\}/g, '{rule.regionName}');

// 4. Map countries (handle JSON parse if it's stored as stringified JSON in DB)
content = content.replace(/\{rule\.countries\}/g, '{(() => { try { return JSON.parse(rule.countries) } catch(e) { return rule.countries } })()}');

// 5. Map processor
content = content.replace(/\{rule\.processor\}/g, '{rule.processorName}');

// 6. Map color (we don't have color in DB, so assign randomly based on index or just hardcode)
content = content.replace(/\{rule\.color\}/g, 'bg-blue-600');
content = content.replace(/rule\.color/g, '"bg-blue-600"'); // For the line: <div className={`absolute top-0 left-0 w-1 h-full ${rule.color}`}></div>


fs.writeFileSync(file, content);
console.log('Done');
