const fs = require('fs');
const path = require('path');

const dirs = [
    'c:/kiaan project/iptv project/src/pages/dashboard/superadmin/processors',
    'c:/kiaan project/iptv project/src/pages/dashboard/superadmin/compliance',
    'c:/kiaan project/iptv project/src/pages/dashboard/superadmin/risk'
];

dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.jsx')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Fix duplicate imports in lucide-react
            const importMatch = content.match(/import {([^}]+)} from 'lucide-react';/);
            if (importMatch) {
                const imports = importMatch[1].split(',').map(s => s.trim());
                const uniqueImports = [...new Set(imports)];
                content = content.replace(importMatch[0], `import { ${uniqueImports.join(', ')} } from 'lucide-react';`);
                fs.writeFileSync(filePath, content);
                console.log('Fixed', filePath);
            }
        }
    });
});
