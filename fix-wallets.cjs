const fs = require('fs');

const file = 'c:/kiaan project/iptv project/src/pages/dashboard/Wallets.jsx';
let content = fs.readFileSync(file, 'utf8');
const originalContent = content;

// Remove imports
content = content.replace(/import\s+(SuperAdmin)?Sidebar\s+from\s+[^;]+;?\n?/g, '');
content = content.replace(/import\s+(SuperAdmin)?TopBar\s+from\s+[^;]+;?\n?/g, '');

// Remove components
content = content.replace(/<(SuperAdmin)?Sidebar[^>]*>\s*/g, '');
content = content.replace(/<(SuperAdmin)?TopBar[^>]*>\s*/g, '');

// Fix outer wrapper (matching standard min-h-screen)
content = content.replace(/<div className="min-h-screen[^"]*flex[^"]*">/g, '<div className="w-full animate-in fade-in zoom-in-95 duration-500">');
            
// Fix inner wrapper (matching flex-1 flex flex-col)
content = content.replace(/<div className="flex-1 flex flex-col min-w-0[^"]*">/g, '<div className="w-full flex flex-col">');

// Replace main
content = content.replace(/<main className="flex-1[^"]*">/g, '<div className="w-full">');
content = content.replace(/<\/main>/g, '</div>');

if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Fixed Wallets.jsx');
} else {
    console.log('No changes needed or regex failed.');
}
