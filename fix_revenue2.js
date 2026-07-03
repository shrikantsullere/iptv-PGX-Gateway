const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/dashboard/superadmin/processors/RevenueWallet.jsx', 'utf8');

const regex = /amount: '\r?\n\s+const \[showWithdrawModal[\s\S]*?\} finally \{\r?\n\s+setLoading\(false\);\r?\n\s+\}\r?\n\s+\};\r?\n\r?\n\s+useEffect\(\(\) => \{\r?\n\s+fetchData\(\);\r?\n\s+\}, \[\]\);\r?\n/;

const fixedPart = `amount: '$' + (w.amount / 100).toLocaleString(undefined, {minimumFractionDigits: 2}),
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
code = code.replace(regex, fixedPart);

fs.writeFileSync('frontend/src/pages/dashboard/superadmin/processors/RevenueWallet.jsx', code);
