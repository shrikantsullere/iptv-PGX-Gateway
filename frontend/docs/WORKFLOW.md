# System Workflows & Connectivity
## PGX Gateway & PlayGroundX

This document outlines the connectivity flow across the platform's three primary actors: The End User (Customer), the Merchant, and the SuperAdmin.

### 1. Payment & Fee Splitting Workflow (The Core Engine)
The fundamental requirement of PGX Gateway is seamless, automated fund routing without manual invoicing.

**Scenario:** A user deposits $100 via Credit Card on a Merchant's platform (e.g., PlayGroundX).
1. **Initiation:** User enters card details via the PGX Gateway iframe/widget on the merchant's site.
2. **Processing (On-Ramp):** The request is routed to the active primary processor (e.g., MoonPay). MoonPay handles KYC and fiat-to-crypto conversion.
3. **Fallback Logic:** If MoonPay's API fails or is unavailable in the user's geography, the PGX Gateway automatically routes the request to the backup processor (e.g., Transak) and instantly fires an email alert to the SuperAdmin.
4. **Fee Splitting Engine:** Once crypto is minted/released:
   - Base Amount: $100.00
   - MoonPay Fee (e.g., 3.5%): $3.50 is retained by MoonPay.
   - Gateway Fee (e.g., 5% based on Merchant's tier): $5.00 is automatically routed directly to the `PGX Gateway Revenue Wallet`.
   - Merchant Payout: $91.50 is automatically routed directly to the `Merchant's Connected Crypto Wallet`.
5. **Metadata Recording:** The transaction is recorded in the PGX database. Webhooks (`payment.created`, `payment.successful`) are instantly fired to the Merchant's configured endpoints.

### 2. User Journey: PlayGroundX (IPTV Consumer)
1. **Authentication:** User logs in/registers on PlayGroundX.
2. **Dashboard Entry:** User lands on `PGXDashboard.jsx` viewing their Wallet Balance, recent transactions, and trending lobbies.
3. **Lobby Navigation:** User enters `Lobbies.jsx`.
   - **Creating Lobbies:** User creates a "Private Lobby".
   - **Adding Screens:** User selects up to 4 screens for this lobby. If they select a 5th screen, they must create/tab over to "Lobby 2".
   - **Rearranging:** User drags and drops screens to rearrange their layout.
4. **Social Connection:** User clicks "Invite Friends", views online friends from `Friends.jsx`, and sends a direct invite. Friend accepts and joins the synchronized watch party.
5. **Wallet Funding:** User runs out of credits, clicks "Add Funds", which triggers the **Payment Workflow** described above.

### 3. Merchant Journey: Onboarding & Management
1. **Registration:** Merchant signs up for PGX Gateway.
2. **Tier Selection:** Merchant selects a plan (Starter 9%, Business 7%, Enterprise 5%). Subscription fee is billed.
3. **Setup (Settlement Center):** Merchant links their external crypto wallet and fiat bank account (`SettlementCenter.jsx`).
4. **Integration (API):** Merchant goes to `ApiKeys.jsx`, generates a Sandbox key, tests integration, and then generates a Production Key.
5. **Branding (Enterprise Only):** Merchant uploads their logo and points their CNAME to `pay.theirdomain.com` in `WhiteLabel.jsx`.
6. **Monitoring:** Merchant views `DashboardOverview.jsx` and `Transactions.jsx` to monitor incoming deposits and split revenue in real-time.

### 4. Admin Journey: System Governance
1. **Monitoring:** Admin logs into `superadmin/Dashboard.jsx` to view macro-level statistics (Total Gateway Revenue vs Subscription Revenue).
2. **Risk Management:** Admin receives a fraud alert in `RiskFraud.jsx` and suspends a suspicious Merchant.
3. **Processor Configuration:** Admin navigates to `Processors.jsx` to update MoonPay API keys or adjust the fallback priority queue.
4. **Maintenance:** Admin toggles "Maintenance Mode" in `Settings.jsx` which safely pauses all incoming webhook processing and returns a 503 to external API calls until the update is complete.
