const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Remove backslash before backtick
  content = content.replace(/\\`/g, '`');
  // Remove backslash before dollar sign
  content = content.replace(/\\\$/g, '$');
  // Fix escaped newlines in strings
  content = content.replace(/\\\\n/g, '\\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

const dirs = [
  'c:/kiaan project/iptv project/frontend/src/pages/dashboard/superadmin',
  'c:/kiaan project/iptv project/frontend/src/pages/dashboard/superadmin/compliance',
  'c:/kiaan project/iptv project/frontend/src/pages/dashboard/superadmin/risk',
  'c:/kiaan project/iptv project/frontend/src/pages/dashboard/merchant'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      fixFile(path.join(dir, file));
    }
  });
});
console.log('Done.');
