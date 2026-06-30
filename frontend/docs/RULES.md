# Business Rules & System Constraints
## PGX Gateway

### 1. Data Isolation & Security Rules
- **Multi-Tenancy:** Merchant A must NEVER query, access, or view Merchant B's users, transactions, or wallet data. All database queries must be strictly scoped by `merchant_id`.
- **Database Truth:** The PGX Gateway Database is the absolute source of truth. The system must not rely solely on blockchain memos or external processor logs. All metadata (merchant name, customer name, transaction ID, amounts, fees, timestamps) must be persisted locally.
- **2FA Enforcement:** SuperAdmin users must have 2FA enabled. Admins can enforce mandatory 2FA for all Merchant staff accounts via the global settings.

### 2. Fee Splitting Rules
- **Automated Routing:** Funds must flow directly to merchant-controlled wallets whenever possible. PGX Gateway does not act as an escrow unless explicitly required by the fiat off-ramp architecture.
- **PGX Revenue Wallet:** A dedicated, immutable wallet address must be configured to receive all Gateway transaction fees, subscription fees, and white-label setup fees. This wallet cannot be mixed with merchant funds.
- **Dynamic Fee Tiers:** The transaction fee applied during the split is determined by the Merchant's active subscription tier at the exact timestamp of the transaction:
  - Starter: 9%
  - Business: 7%
  - Enterprise: 5%

### 3. Processor Failover Rules
- **High Availability:** Multiple payment processors (e.g., MoonPay, Transak) must be integrated.
- **Immediate Fallback:** If Processor A returns a 5xx error or times out, the transaction request is instantly routed to Processor B without breaking the user experience.
- **Geographic Routing:** Transactions must be routed to specific processors based on the user's geographic location (e.g., if Processor A does not support US users, route to Processor B).
- **Alerting:** Any fallback event or processor failure must trigger an immediate email notification to the SuperAdmin team.

### 4. UI & IPTV Constraints (PlayGroundX)
- **Lobby Screen Limit:** A single watch party lobby is hard-capped at 4 live video streams. 
- **Lobby Overflow:** If a user attempts to add a 5th screen, the UI must prompt them to utilize/create a secondary lobby (e.g., Lobby 2).
- **Customization Limits:** Only the lobby creator (Host) has the permission to add/remove screens or invite friends. Any invited viewer can locally rearrange (drag and drop) the screens on their own device, but cannot change the underlying channel selection for the group.
- **White-Labeling:** Custom domains and branding UI are strictly locked behind the Enterprise ($2500/mo) subscription tier. If a merchant downgrades, their custom domain routing is immediately suspended.
