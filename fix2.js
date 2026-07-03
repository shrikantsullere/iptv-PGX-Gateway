const fs = require('fs');
const file = 'frontend/src/pages/dashboard/superadmin/processors/GeoRouting.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove routingRules constant completely
content = content.replace(/const routingRules = \[[\s\S]*?\];\r?\n\r?\n/, '');

// 2. Replace handleAddRule
content = content.replace(
  /const handleAddRule = \(e\) => \{[\s\S]*?setShowAddModal\(false\);\r?\n  \};/m,
  `const handleAddRule = async (e) => {
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

// 3. Replace handleEditRule
content = content.replace(
  /const handleEditRule = \(e\) => \{[\s\S]*?setEditRule\(null\);\r?\n  \};/m,
  `const handleEditRule = async (e) => {
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

fs.writeFileSync(file, content);
console.log('Done fix2');
