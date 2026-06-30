# Product Requirements Document (PRD)
**Product Name:** PGX Gateway
**Version:** 1.0.0 (Frontend UI)
**Domain:** Enterprise SaaS Crypto Payment Infrastructure

## 1. Product Vision
PGX Gateway aims to be the complete, enterprise-grade crypto payment infrastructure for modern businesses. Similar to Stripe or Coinbase Commerce, it provides merchants with the tools to accept crypto payments globally, manage wallets, customize their white-label checkout experience, and view deep analytics, while providing Super Admins a massive command center to manage liquidity routing and thousands of merchants.

## 2. Target Audience
- **Merchants:** E-commerce platforms, SaaS companies, and digital creators wanting to accept crypto without managing complex blockchain infrastructure.
- **Super Admins (PGX Staff):** Operations, Risk, and Network engineers who manage the PGX platform, monitor fraud, configure payment routing, and oversee global transaction flow.

## 3. Core Roles & Permissions
1. **Merchant:** Access to sales analytics, wallet management, API keys, webhook configurations, and white-label checkout settings.
2. **Super Admin:** God-mode access. Can view global enterprise transactions, manage payment processor routing (MoonPay, Banxa, etc.), configure subscription tiers, and monitor network health.
3. **Admin:** Internal PGX staff with limited scoped access (e.g., support tickets, KYC approvals).

## 4. Key Features & Requirements

### 4.1 Authentication & Onboarding
- **Split-Screen Auth:** Modern login/register flows with social logins (Google, GitHub, Microsoft).
- **Multi-step Onboarding:** A seamless wizard covering Business Details -> KYC -> Wallet Setup -> Bank Account -> Subscription -> Branding -> API Keys -> Completed.

### 4.2 Merchant Dashboard
- **Analytics:** Widgets for Revenue, Wallet balances, Pending Settlements, and Fees. Donut and Area charts.
- **Transactions & Ledger:** Detailed lists of Transactions, Deposits, and Withdrawals with status indicators.
- **Wallet Management:** Portfolio overview with asset-specific details (USDC, USDT, BTC, ETH) and Deposit/Withdraw modals.
- **Developer Tools:** API key generation with visibility toggles and Webhook endpoint configuration/logging.
- **White Label Studio:** Live-preview checkout simulator allowing merchants to customize colors, fonts, logos, and custom domains.

### 4.3 Super Admin Dashboard
- **Global Overview:** Massive data-dense metrics covering volume, active subscriptions, and processor usage.
- **Enterprise Transactions:** A global ledger tracking every transaction across all merchants with advanced multi-filtering.
- **Processor & Routing Engine:** Visual workflow diagrams of payment routing (Primary vs Failover) and health monitoring for liquidity providers (MoonPay, Transak, etc.).
- **Subscription Management:** Interactive editor to create and modify pricing plans, transaction fees, and feature limits.

## 5. Design System Requirements
- **Theme:** Strict Dark Mode (#09090B background).
- **Aesthetics:** Luxury Fintech, Glassmorphism, smooth Framer Motion animations.
- **Typography:** Inter (default) with options for modern sans-serif.
- **Colors:** Vibrant accents (Purple #7C3AED, Blue, Green) against dark backgrounds.
