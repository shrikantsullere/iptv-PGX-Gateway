import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import EmailVerification from './pages/auth/EmailVerification';
import TwoFactorAuth from './pages/auth/TwoFactorAuth';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Wallets from './pages/dashboard/Wallets';
import Onboarding from './pages/Onboarding';

// PlayGroundX Routes
import PlayGroundXLayout from './components/playgroundx/PlayGroundXLayout';
import PGXDashboard from './pages/playgroundx/PGXDashboard';
import SportsLounge from './pages/playgroundx/SportsLounge';
import IPTV from './pages/playgroundx/IPTV';
import LiveMatch from './pages/playgroundx/LiveMatch';
import Lobbies from './pages/playgroundx/Lobbies';
import Friends from './pages/playgroundx/Friends';
import Chat from './pages/playgroundx/Chat';
import Wallet from './pages/playgroundx/Wallet';
import Transactions from './pages/playgroundx/Transactions';
import Notifications from './pages/playgroundx/Notifications';
import Profile from './pages/playgroundx/Profile';
import Settings from './pages/playgroundx/Settings';
import Support from './pages/playgroundx/Support';
import PGXComingSoon from './pages/playgroundx/PGXComingSoon';

// Merchant Layout & Pages
import MerchantLayout from './components/merchant/MerchantLayout';
import MerchantDashboardOverview from './pages/dashboard/merchant/DashboardOverview';
import MerchantTransactions from './pages/dashboard/merchant/Transactions';
import Deposits from './pages/dashboard/merchant/Deposits';
import Withdrawals from './pages/dashboard/merchant/Withdrawals';
import MerchantSettlements from './pages/dashboard/merchant/SettlementCenter';
import Customers from './pages/dashboard/merchant/Customers';
import MerchantRevenue from './pages/dashboard/merchant/Revenue';
import MerchantReports from './pages/dashboard/merchant/Reports';
import ApiKeys from './pages/dashboard/merchant/ApiKeys';
import MerchantWebhooks from './pages/dashboard/merchant/Webhooks';
import Billing from './pages/dashboard/merchant/Billing';
import Branding from './pages/dashboard/merchant/Branding';
import MerchantWhiteLabel from './pages/dashboard/merchant/WhiteLabel';
import MerchantTeam from './pages/dashboard/merchant/TeamMembers';
import MerchantNotifications from './pages/dashboard/merchant/Notifications';
import MerchantSettings from './pages/dashboard/merchant/Settings';
import MerchantSupport from './pages/dashboard/merchant/Support';

// Super Admin Layout & Pages
import SuperAdminLayout from './components/superadmin/SuperAdminLayout';
import SuperAdminDashboard from './pages/dashboard/superadmin/Dashboard';
import SuperAdminMerchants from './pages/dashboard/superadmin/Merchants';
import EnterpriseTransactions from './pages/dashboard/superadmin/EnterpriseTransactions';
import SuperAdminRevenue from './pages/dashboard/superadmin/Revenue';
import SuperAdminSettlements from './pages/dashboard/superadmin/Settlements';
import SuperAdminWallets from './pages/dashboard/superadmin/Wallets';
import SuperAdminFees from './pages/dashboard/superadmin/Fees';
import Subscriptions from './pages/dashboard/superadmin/Subscriptions';
import SuperAdminCountries from './pages/dashboard/superadmin/Countries';
import SuperAdminCurrencies from './pages/dashboard/superadmin/Currencies';
import SuperAdminAPI from './pages/dashboard/superadmin/API';
import SuperAdminWebhooks from './pages/dashboard/superadmin/Webhooks';
import SuperAdminReports from './pages/dashboard/superadmin/Reports';
import SuperAdminWhiteLabel from './pages/dashboard/superadmin/WhiteLabel';
import SuperAdminNotifications from './pages/dashboard/superadmin/Notifications';
import SuperAdminSupport from './pages/dashboard/superadmin/Support';
import SuperAdminAuditLogs from './pages/dashboard/superadmin/AuditLogs';
import SuperAdminRoles from './pages/dashboard/superadmin/Roles';
import SuperAdminSettings from './pages/dashboard/superadmin/Settings';

// Payment Processor Engine Pages
import ProcessorDashboard from './pages/dashboard/superadmin/processors/Dashboard';
import ProcessorDetails from './pages/dashboard/superadmin/processors/Details';
import GeoRouting from './pages/dashboard/superadmin/processors/GeoRouting';
import FailoverMonitor from './pages/dashboard/superadmin/processors/FailoverMonitor';
import FeeSplitEngine from './pages/dashboard/superadmin/processors/FeeSplitEngine';
import MerchantFeeRules from './pages/dashboard/superadmin/processors/MerchantFeeRules';
import SettlementEngine from './pages/dashboard/superadmin/processors/SettlementEngine';
import RevenueWallet from './pages/dashboard/superadmin/processors/RevenueWallet';
import ProcessorLogs from './pages/dashboard/superadmin/processors/Logs';
import ProcessorReports from './pages/dashboard/superadmin/processors/Reports';

// Compliance & Risk Pages
import KYCDashboard from './pages/dashboard/superadmin/compliance/KYCDashboard';
import KYCDetails from './pages/dashboard/superadmin/compliance/KYCDetails';
import AMLMonitoring from './pages/dashboard/superadmin/compliance/AMLMonitoring';
import ComplianceReports from './pages/dashboard/superadmin/compliance/Reports';
import ActivityTimeline from './pages/dashboard/superadmin/compliance/ActivityTimeline';

import RiskManagement from './pages/dashboard/superadmin/risk/RiskManagement';
import FraudCenter from './pages/dashboard/superadmin/risk/FraudCenter';
import BlockedEntities from './pages/dashboard/superadmin/risk/BlockedEntities';
import CaseManagement from './pages/dashboard/superadmin/risk/CaseManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/2fa" element={<TwoFactorAuth />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* PlayGroundX Routes */}
        <Route element={<PlayGroundXLayout />}>
          <Route path="/playgroundx" element={<PGXDashboard />} />
          <Route path="/playgroundx/sports" element={<SportsLounge />} />
          <Route path="/playgroundx/iptv" element={<IPTV />} />
          <Route path="/playgroundx/live" element={<LiveMatch />} />
          <Route path="/playgroundx/lobbies" element={<Lobbies />} />
          <Route path="/playgroundx/friends" element={<Friends />} />
          <Route path="/playgroundx/chat" element={<Chat />} />
          <Route path="/playgroundx/wallet" element={<Wallet />} />
          <Route path="/playgroundx/transactions" element={<Transactions />} />
          <Route path="/playgroundx/notifications" element={<Notifications />} />
          <Route path="/playgroundx/profile" element={<Profile />} />
          <Route path="/playgroundx/settings" element={<Settings />} />
          <Route path="/playgroundx/support" element={<Support />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="merchants" element={<SuperAdminMerchants />} />
          <Route path="transactions" element={<EnterpriseTransactions />} />
          <Route path="revenue" element={<SuperAdminRevenue />} />
          <Route path="settlements" element={<SuperAdminSettlements />} />
          <Route path="wallets" element={<SuperAdminWallets />} />
          <Route path="fees" element={<SuperAdminFees />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="countries" element={<SuperAdminCountries />} />
          <Route path="currencies" element={<SuperAdminCurrencies />} />
          <Route path="api" element={<SuperAdminAPI />} />
          <Route path="webhooks" element={<SuperAdminWebhooks />} />
          <Route path="reports" element={<SuperAdminReports />} />
          <Route path="white-label" element={<SuperAdminWhiteLabel />} />
          <Route path="notifications" element={<SuperAdminNotifications />} />
          <Route path="support" element={<SuperAdminSupport />} />
          <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
          <Route path="roles" element={<SuperAdminRoles />} />
          <Route path="settings" element={<SuperAdminSettings />} />
          
          {/* Payment Processor Engine Routes */}
          <Route path="processors" element={<Navigate to="/super-admin/processors/dashboard" replace />} />
          <Route path="processors/dashboard" element={<ProcessorDashboard />} />
          <Route path="processors/details/:id" element={<ProcessorDetails />} />
          <Route path="processors/geo-routing" element={<GeoRouting />} />
          <Route path="processors/failover" element={<FailoverMonitor />} />
          <Route path="processors/fee-split" element={<FeeSplitEngine />} />
          <Route path="processors/merchant-fees" element={<MerchantFeeRules />} />
          <Route path="processors/settlement-engine" element={<SettlementEngine />} />
          <Route path="processors/revenue-wallet" element={<RevenueWallet />} />
          <Route path="processors/logs" element={<ProcessorLogs />} />
          <Route path="processors/reports" element={<ProcessorReports />} />

          {/* KYC & Compliance Routes */}
          <Route path="compliance/kyc-dashboard" element={<KYCDashboard />} />
          <Route path="compliance/kyc-details/:id" element={<KYCDetails />} />
          <Route path="compliance/aml" element={<AMLMonitoring />} />
          <Route path="compliance/reports" element={<ComplianceReports />} />
          <Route path="compliance/timeline" element={<ActivityTimeline />} />

          {/* Fraud & Risk Routes */}
          <Route path="risk/dashboard" element={<RiskManagement />} />
          <Route path="risk/fraud-center" element={<FraudCenter />} />
          <Route path="risk/blocked" element={<BlockedEntities />} />
          <Route path="risk/cases" element={<CaseManagement />} />
        </Route>
        
        {/* Merchant Routes */}
        <Route element={<MerchantLayout />}>
          <Route path="/merchant-dashboard" element={<MerchantDashboardOverview />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/merchant/transactions" element={<MerchantTransactions />} />
          <Route path="/merchant/deposits" element={<Deposits />} />
          <Route path="/merchant/withdrawals" element={<Withdrawals />} />
          <Route path="/merchant/settlements" element={<MerchantSettlements />} />
          <Route path="/merchant/customers" element={<Customers />} />
          <Route path="/merchant/revenue" element={<MerchantRevenue />} />
          <Route path="/merchant/reports" element={<MerchantReports />} />
          <Route path="/merchant/api" element={<ApiKeys />} />
          <Route path="/merchant/webhooks" element={<MerchantWebhooks />} />
          <Route path="/merchant/billing" element={<Billing />} />
          <Route path="/merchant/branding" element={<Branding />} />
          <Route path="/merchant/whitelabel" element={<MerchantWhiteLabel />} />
          <Route path="/merchant/team" element={<MerchantTeam />} />
          <Route path="/merchant/notifications" element={<MerchantNotifications />} />
          <Route path="/merchant/settings" element={<MerchantSettings />} />
          <Route path="/merchant/support" element={<MerchantSupport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
