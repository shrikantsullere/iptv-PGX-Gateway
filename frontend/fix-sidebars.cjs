const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Remove imports
            content = content.replace(/import\s+(SuperAdmin)?Sidebar\s+from\s+[^;]+;?\n?/g, '');
            content = content.replace(/import\s+(SuperAdmin)?TopBar\s+from\s+[^;]+;?\n?/g, '');

            // Remove tags
            content = content.replace(/<(SuperAdmin)?Sidebar[^>]*>\s*/g, '');
            content = content.replace(/<(SuperAdmin)?TopBar[^>]*>\s*/g, '');

            // Fix the outer wrappers if they exist
            // Pattern: <div className="min-h-screen bg-[#000000] text-white flex font-sans">
            // Replace with <div className="w-full animate-in fade-in zoom-in-95 duration-500">
            content = content.replace(/<div className="min-h-screen[^"]*flex[^"]*">/g, '<div className="w-full animate-in fade-in zoom-in-95 duration-500">');
            
            // Fix the inner wrappers
            // Pattern: <div className="flex-1 flex flex-col min-w-0 bg-[#09090B]"> or similar
            // We just remove the bg color and min-w-0 to let it flow naturally
            content = content.replace(/<div className="flex-1 flex flex-col min-w-0[^"]*">/g, '<div className="w-full flex flex-col">');

            // Replace <main className="flex-1 p-6 overflow-y-auto"> with <div className="w-full">
            content = content.replace(/<main className="flex-1[^"]*">/g, '<div className="w-full">');
            content = content.replace(/<\/main>/g, '</div>');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Fixed ${fullPath}`);
            }
        }
    }
}

processDir('c:/kiaan project/iptv project/src/pages/dashboard/merchant');
processDir('c:/kiaan project/iptv project/src/pages/dashboard/superadmin');
