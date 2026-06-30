# Product Requirements Document (PRD)
## PGX Gateway & PlayGroundX

### 1. Project Overview
PGX Gateway is a standalone, multi-tenant SaaS payment infrastructure platform. It is designed to power external businesses, marketplaces, e-commerce, and specifically **PlayGroundX** (an IPTV and Sports Lounge platform). The gateway acts as a robust backend that handles fiat-to-crypto onboarding (via MoonPay), crypto-to-crypto transfers, and crypto-to-fiat offboarding, all while maintaining strict data isolation for every merchant.

### 2. Core Architecture & Multi-Tenancy
- **Isolated Environments:** Every merchant operates in complete isolation. Transactions, wallets, users, API keys, and settlements are strictly separated. No merchant can access another's data.
- **PlayGroundX Integration:** PlayGroundX operates as a flagship "merchant" on the PGX Gateway, ensuring complete separation between PlayGroundX's streaming revenue and PGX Gateway's fee revenue.

### 3. Dashboard Specifications

#### 3.1 Merchant Dashboard (`/merchant`)
Designed for external businesses and PlayGroundX admins to manage their payment operations.
- **Dashboard Overview:** Displays total revenue, transaction volume, active users, and wallet balances.
- **Transactions Management:** Tracks all deposits, withdrawals, pending, and failed transactions. Stores rich metadata (Merchant Name, Customer Name, TX ID, Amount, Payment Type, Wallet Address, Fees, Timestamps) locally in the database, not relying solely on blockchain memos.
- **Wallet & Settlement Center:** Merchants link their primary crypto wallet, settlement wallet, and fiat bank accounts. Funds flow directly to these merchant-controlled wallets automatically.
- **API Keys & Webhooks:** Allows merchants to generate, roll, and revoke API keys (Sandbox & Production). Features an interactive UI to add/edit Webhook endpoints (e.g., `payment.*`, `payout.*`, `dispute.*`).
- **White-Label & Branding:** Enterprise merchants can configure custom domains (e.g., `pay.theirdomain.com`), upload logos, and define brand colors to seamlessly integrate the gateway into their brand.
- **Billing & Subscriptions:** Subscription management for gateway usage (Starter: $299/mo, Business: $999/mo, Enterprise: $2500/mo).
- **Support:** Integrated ticketing system for merchant assistance.

#### 3.2 SuperAdmin Dashboard (`/superadmin`)
Designed for the PGX Gateway owners to monitor the entire SaaS platform.
- **Global Settings:** Toggles for Maintenance Mode, Sandbox Environments, strict IP whitelisting, and mandatory 2FA.
- **Revenue Tracking:** Differentiates between Total Gateway Revenue, Subscription Revenue, and Transaction Fee Revenue.
- **Merchant Management:** Tracks Total, Active, New, and Cancelled merchants.
- **Risk & KYC Monitoring:** Monitors pending/approved KYC, suspicious activities, fraud alerts, and high-risk accounts.
- **Processors Management:** Manages multiple payment processors (e.g., MoonPay, Transak, Banxa). Features automatic fallback routing and email notifications if a primary processor fails.
- **Fees & Plans Configuration:** Admins can dynamically edit merchant transaction fees, create new subscription plans, and adjust pricing.

#### 3.3 PlayGroundX Dashboard (`/playgroundx`)
The consumer-facing portal for users to watch IPTV and socialize.
- **IPTV Network:** Users can browse 4K/1080p live streams across various categories (Sports, Boxing, Racing, etc.).
- **Lobbies (Watch Parties):** 
  - **Screen Limits & Pagination:** A lobby can hold a maximum of 4 active screens. If more screens are needed, users can create new Lobbies (e.g., Lobby 1, Lobby 2) accessible via top tabs.
  - **Customization:** Users can seamlessly drag-and-drop screens to rearrange their viewing layout.
  - **Private Lobbies:** Users can create private, invite-only lobbies.
- **Sports Lounge & Friends:** Users can add friends, see who is online, and send direct invites to their private lobbies for synchronized watch parties.

### 4. Future Scalability
The platform is architected from day one to handle millions of transactions, millions of users, and thousands of merchants across multiple geographic regions with high-availability infrastructure.
