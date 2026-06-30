const fs = require('fs');
const files = ['Revenue', 'Wallets', 'Countries', 'Currencies', 'API', 'Webhooks', 'Reports', 'WhiteLabel', 'Notifications', 'Support', 'AuditLogs', 'Roles', 'Settings'];

files.forEach(f => {
  const content = `export default function ${f}() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <span className="text-2xl">⚙️</span>
      </div>
      <h2 className="text-2xl font-black text-white mb-2">${f} Module Coming Soon</h2>
      <p className="text-gray-400 text-sm max-w-sm">This module is currently under development. Please check back later.</p>
    </div>
  );
}`;
  fs.writeFileSync('src/pages/dashboard/superadmin/' + f + '.jsx', content, 'utf8');
});
