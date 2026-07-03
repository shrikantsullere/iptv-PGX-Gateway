const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/dashboard/superadmin/processors/RevenueWallet.jsx', 'utf8');

// Imports
code = code.replace(/import \{ useState \} from 'react';/, "import { useState, useEffect } from 'react';\nimport apiClient from '../../../../../utils/apiClient';");

// State and data
const stateRegex = /const earningsHistory = [\s\S]*?const withdrawals = [\s\S]*?\];/;
code = code.replace(stateRegex, '');

const funcStart = /export default function RevenueWallet\(\) \{/;
const newState = `export default function RevenueWallet() {
  const [wallet, setWallet] = useState(null);
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await apiClient.get('/admin/payment-processors/revenue-wallet');
      if (res.success) {
        setWallet(res.data.wallet);
        
        setEarningsHistory(res.data.history.map(h => ({
          month: h.month,
          earnings: h.revenueAmount / 100
        })));

        setWithdrawals(res.data.withdrawals.map((w, i) => ({
          id: \`WDR-\${501 - i}\`,
          date: new Date(w.withdrawalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          amount: '$' + (w.amount / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
          destination: w.destination,
          status: w.status
        })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
`;
code = code.replace(funcStart, newState);

// Update withdraw handler
const handleRegex = /const handleWithdraw = \(\) => \{[\s\S]*?\};\n/;
const newHandle = `const handleWithdraw = async () => {
    setWithdrawing(true);
    const amount = document.getElementById('withdrawAmount').value;
    const destination = document.getElementById('withdrawDest').value;
    
    try {
        const res = await apiClient.post('/admin/payment-processors/revenue-wallet/withdraw', { amount, destination });
        if (res.success) {
            await fetchData();
            setWithdrawn(true);
            setTimeout(() => { setWithdrawn(false); setShowWithdrawModal(false); }, 2000);
        }
    } catch (e) {
        alert('Failed to withdraw');
    } finally {
        setWithdrawing(false);
    }
  };\n`;
code = code.replace(handleRegex, newHandle);

// Loading state
const returnRegex = /return \(/;
code = code.replace(returnRegex, `if (loading) return <div className="p-8 text-white">Loading...</div>;\n\n  return (`);

// Replace variables in JSX
code = code.replace(/\$41,240\.<span className="text-3xl text-gray-400">88<\/span>/g, `$\${Math.floor((wallet?.totalRevenuePool || 0) / 100).toLocaleString()}.<span className="text-3xl text-gray-400">\${String((wallet?.totalRevenuePool || 0) % 100).padStart(2, '0')}</span>`);
code = code.replace(/\+\$8,200/g, `+$\${((wallet?.monthlyRevenue || 0)/100).toLocaleString()}`);
code = code.replace(/\$8,200/g, `$\${((wallet?.monthlyRevenue || 0)/100).toLocaleString()}`);
code = code.replace(/\$273/g, `$\${((wallet?.averageDailyRevenue || 0)/100).toLocaleString()}`);
code = code.replace(/\$78,500/g, `$\${((wallet?.totalWithdrawn || 0)/100).toLocaleString()}`);
code = code.replace(/>4</g, `>{wallet?.revenueSources || 4}<`);
code = code.replace(/\$41,240\.88/g, `$\${((wallet?.totalRevenuePool || 0)/100).toLocaleString(undefined, {minimumFractionDigits: 2})}`);

// Replace modal inputs with IDs
code = code.replace(/<input className="w-full bg-black\/50 border border-white\/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-\[#7C3AED\] transition-colors text-sm font-mono" placeholder="0.00" \/>/, `<input id="withdrawAmount" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm font-mono" placeholder="0.00" />`);
code = code.replace(/<select className="w-full bg-black\/50 border border-white\/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-\[#7C3AED\] transition-colors text-sm">/, `<select id="withdrawDest" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm">`);

fs.writeFileSync('frontend/src/pages/dashboard/superadmin/processors/RevenueWallet.jsx', code);
console.log('done');
