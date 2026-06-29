# User & Component Workflows
**PGX Gateway Frontend**

## 1. Authentication Flow
1. User navigates to `/`. Clicks "Login" or "Get Started".
2. Directed to `/login` or `/register`.
3. If new user: Fills registration -> Routed to `/verify-email`.
4. If returning user: Enters credentials -> Routed to `/2fa` (if enabled) -> Dashboard.
5. Password recovery: `/forgot-password` -> Email Link -> `/reset-password`.

## 2. New Merchant Onboarding Flow
1. User completes registration.
2. Routed to `/onboarding`.
3. **Step 1:** Business Details (Name, Industry).
4. **Step 2:** KYC (Document upload UI).
5. **Step 3:** Wallet Setup (Auto-generation of custody wallets).
6. **Step 4:** Bank Account (Fiat settlement details).
7. **Step 5:** Subscription (Select Starter, Business, etc.).
8. **Step 6:** Branding (Upload logo).
9. **Step 7:** API Keys (Reveal initial production keys).
10. **Step 8:** Completed -> Redirects to `/merchant-dashboard`.

## 3. Merchant Wallet Management Flow
1. Merchant navigates to `/wallets`.
2. Views **Portfolio List** (USDC, USDT, BTC, ETH balances).
3. Clicks on an asset (e.g., USDT).
4. UI transitions to **Asset Details** view, showing specific transaction history for USDT.
5. Clicks **Deposit**: Modal opens with QR code and copyable address.
6. Clicks **Withdraw**: Modal opens with destination address input, network selector, and fee estimator.

## 4. Merchant White Label Configuration Flow
1. Merchant navigates to `/merchant/whitelabel`.
2. Left panel contains settings tabs; Right panel contains a massive **Live Simulator**.
3. **Domain Tab:** Merchant enters `pay.company.com` -> UI shows DNS CNAME instructions.
4. **Theme Tab:** Merchant changes Primary Color -> Right Simulator instantly updates button and accent colors.
5. Merchant clicks **Desktop/Mobile toggle** -> Simulator resizes to show responsive checkout preview.

## 5. Super Admin Routing Configuration Flow
1. Super Admin navigates to `/super-admin/processors`.
2. Views the **Live Routing Workflow Visualization** (flexbox diagram).
3. Super Admin toggles "MoonPay" off in the Processor Grid.
4. Visually, the routing engine flow updates to show Banxa (Priority 2) as the new Primary handler.
5. Super Admin configures Email Alerts to notify `ops@pgxgateway.com` if latency > 500ms.
