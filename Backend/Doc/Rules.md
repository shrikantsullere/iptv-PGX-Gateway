# Rules

# Dashboard Rules

1. Only Super Admin and Owner can access dashboard.

2. Revenue cannot be negative.

3. Failed transaction rate is system generated.

4. Processor distribution should total 100%.

5. Dashboard data is read only.

6. Every refresh action should be logged.

7. Dashboard metrics should update automatically.

# Merchant Module Rules

1. Merchant ID must be unique.

2. Company name is required.

3. Email must be unique.

4. Revenue cannot be negative.

5. Only Super Admin can delete merchants.

6. Suspended merchants cannot process transactions.

7. Merchant status changes must be recorded in Audit Logs.

8. Merchant subscription must be one of:
   - Starter
   - Business
   - Enterprise

9. Export actions must be logged.

10. Every merchant must belong to a valid country.


# Transaction Module Rules

1. Every transaction must have a unique Transaction ID.

2. Transaction status changes must be logged.

3. Completed transactions cannot be edited.

4. Refunds can only be initiated for completed transactions.

5. Failed transactions cannot be refunded.

6. Gateway fee must be calculated automatically.

7. Transaction records cannot be deleted.

8. Transaction hash must be unique.

9. Every transaction must belong to a valid merchant.

10. All transaction activities must be recorded in Audit Logs.

11. Export actions must be logged.


# Revenue Module Rules

1. Revenue calculations must be automated.

2. Revenue data cannot be manually modified.

3. Processing volume must be derived from completed transactions.

4. Gateway fee revenue must be calculated from transaction fees.

5. Subscription revenue must come from active subscriptions only.

6. Revenue reports are read-only.

7. Export activity must be logged.

8. Financial data access is restricted to Super Admin and Owner.

9. Revenue snapshots should be generated daily.

10. All calculations must be auditable.

# Settlement Module Rules

1. Settlement ID must be unique.

2. Settlement amount must be greater than zero.

3. Completed settlements cannot be modified.

4. Failed settlements can be retried.

5. Every settlement must belong to a valid merchant.

6. Settlement status changes must be logged.

7. Crypto settlements require transaction hash.

8. Fiat settlements require bank reference.

9. Only Super Admin can manually approve settlements.

10. Export actions must be recorded in Audit Logs.

11. Settlement records cannot be deleted.


# Wallet Module Rules

1. Wallet address must be unique.

2. Cold wallets cannot be used for direct customer transactions.

3. Hot wallets must maintain minimum liquidity thresholds.

4. Every transfer must be logged.

5. Wallet balances must sync with blockchain data.

6. Only Super Admin can create or disable wallets.

7. Treasury transfers require audit records.

8. Frozen wallets cannot send funds.

9. Wallet addresses cannot be modified after creation.

10. All wallet activities must be recorded in Audit Logs.

# Payment Processors Dashboard Rules

1. Processor health must update automatically.

2. Approval rates are system calculated.

3. Node latency must be monitored continuously.

4. Offline nodes generate alerts.

5. Critical alerts require audit logging.

6. Only Super Admin can configure nodes.

7. Health data is read-only.

8. Reports must contain historical data.

9. Dashboard refresh occurs automatically every minute.

10. All node changes must be recorded.


# Failover Monitor Rules

1. Every processor must have a backup route.

2. High Latency trigger activates when ping exceeds configured threshold.

3. HTTP 503 and 504 responses trigger immediate failover.

4. Success Rate Drop trigger activates when approval rate falls below threshold.

5. Manual failover can only be performed by Super Admin.

6. All failover events must be logged.

7. Recovery events must be recorded.

8. Email notifications must be sent instantly.

9. Offline processors cannot receive traffic.

10. Failover history cannot be deleted.

11. Routing changes must be audited.

12. Alert settings changes must be logged.


# Fee Split Engine Rules

1. Total fee must equal Processor Base + Gateway Markup.

2. Total fee cannot be negative.

3. Transaction type must be unique.

4. Only Super Admin can create or modify fee rules.

5. Fee changes must be logged.

6. Deleted rules must be soft deleted.

7. Merchant share is automatically calculated.

8. Processor base fee cannot exceed configured limits.

9. Chargeback fees may be fixed amounts instead of percentages.

10. Every configuration update must create an audit record.

11. Fee calculations must be versioned for reporting.

# Geo Routing Rules

1. Every region must have at least one processor assigned.

2. Priority 1 is always the primary routing processor.

3. Countries cannot belong to multiple active primary rules.

4. Disabled rules are ignored during routing.

5. Fallback processors are used only when primary routing fails.

6. Only Super Admin can create or edit routing rules.

7. Country codes must follow ISO standards.

8. Processor must exist before assignment.

9. Routing changes must be logged.

10. Rule deletion must be soft delete.

11. Every routing change must create an audit log.

12. Draft rules cannot process live traffic.

# Merchant Rules Business Rules

1. Merchant ID must exist before override creation.

2. Only Super Admin can create fee overrides.

3. Override fee cannot be negative.

4. Fixed fee cannot be negative.

5. Every override must contain a reason.

6. Global fee remains unchanged.

7. Merchant override takes priority over global fee rules.

8. Deleted overrides are soft deleted.

9. Fee changes must be version controlled.

10. All override actions must be stored in Audit Logs.

11. Enterprise merchants may have special pricing tiers.

12. Standard merchants use global fee settings by default.

# Settlement Engine Rules

1. Settlement amount must be greater than zero.

2. Settlement amount cannot exceed available balance.

3. Auto settlement executes only when threshold is met.

4. Completed settlements cannot be modified.

5. Failed settlements may be retried.

6. Only Super Admin can initiate manual settlements.

7. Every settlement action must be logged.

8. Destination account must be verified.

9. Settlement rules must be version controlled.

10. Settlement history cannot be deleted.

11. Processor balances must reconcile daily.

12. Auto settlement schedules run automatically.

# Revenue Wallet Rules

1. Withdrawal amount cannot exceed available revenue balance.

2. Only Super Admin can withdraw funds.

3. Every withdrawal requires audit logging.

4. Revenue calculations are system generated.

5. Completed withdrawals cannot be modified.

6. Failed withdrawals may be retried.

7. Destination account must be verified.

8. Revenue history cannot be manually edited.

9. Withdrawal records cannot be deleted.

10. Monthly earnings must be calculated automatically.

11. Revenue source allocations must reconcile daily.

12. All withdrawal actions must be recorded in Audit Logs.

# Processor Logs Rules

1. Every processor request must be logged.

2. Every processor response must be logged.

3. Transaction IDs must remain immutable.

4. Logs cannot be modified after creation.

5. Log deletion is prohibited.

6. Export activity must be logged.

7. Only Super Admin can access raw logs.

8. Sensitive payment data must be masked.

9. Webhook payloads must be stored securely.

10. Log retention policy must be enforced.

11. Error logs must be retained for audit purposes.

12. Processor latency must be calculated automatically.

# Processor Reports Rules

1. Reports are generated from verified transaction data.

2. Report exports must be logged.

3. Only Super Admin and Owner can generate reports.

4. Historical reports cannot be modified.

5. Approval rate calculations must use completed transactions only.

6. Chargeback metrics must be updated daily.

7. Refund metrics must be recalculated automatically.

8. PDF exports must include selected sections only.

9. Report generation failures must be logged.

10. Generated reports must have unique IDs.

11. Reports are retained according to retention policy.

12. Every export action must create an audit record.

# KYC Dashboard Rules

1. Every submission must have a unique KYC ID.

2. At least one identity document is required.

3. Business entities must provide incorporation documents.

4. Every submission must receive a risk score.

5. Only authorized compliance staff can approve KYC.

6. Rejected applications require a rejection reason.

7. Approved applications cannot be modified.

8. Documents must be retained according to compliance policy.

9. All review actions must be logged.

10. Risk assessments must be auditable.

11. KYC records cannot be permanently deleted.

12. Every approval or rejection must create an audit record.

# AML Monitoring Rules

1. Every AML alert must have a unique Alert ID.

2. High severity alerts require investigation.

3. Critical alerts must be escalated automatically.

4. Every investigation must contain notes.

5. Resolved alerts cannot be reopened without approval.

6. Flagged entities must remain under monitoring.

7. Escalation actions require audit logging.

8. AML records cannot be deleted.

9. Every alert must be assigned a severity score.

10. Compliance actions must be recorded.

11. Suspicious transactions must be linked to alerts.

12. Entity flagging requires a valid reason.

# Compliance Reports Rules

1. Reports must use verified compliance data.

2. Regulatory filings require unique filing IDs.

3. Report exports must be logged.

4. Only authorized compliance users can generate reports.

5. Historical reports cannot be modified.

6. Pending filings require review before submission.

7. Submitted reports become read-only.

8. Every export action creates an audit record.

9. Compliance metrics are recalculated daily.

10. Filing history cannot be deleted.

11. PDF reports must include selected sections only.

12. Compliance reports must follow retention policies.

# Activity Timeline Rules

1. Every compliance action must create a timeline event.

2. Event IDs must be unique.

3. Timeline records cannot be edited after creation.

4. Timeline records cannot be deleted.

5. Every AML investigation must create an event.

6. Every KYC approval or rejection must be logged.

7. Regulatory filings must generate timeline entries.

8. System-generated events must be identifiable.

9. Search results must respect role permissions.

10. Export actions must be logged.

11. Events must be stored in chronological order.

12. All compliance activities must be auditable.

# Risk Dashboard Rules

1. Risk score ranges from 0 to 100.

2. Scores above configured threshold trigger alerts.

3. Critical incidents require immediate investigation.

4. High-risk entities may be automatically blocked.

5. Every risk event must create an audit record.

6. Risk rules can only be modified by Super Admin.

7. Incident history cannot be deleted.

8. Risk scores must update automatically.

9. Fraud indicators are continuously monitored.

10. All investigation actions must be logged.

11. Resolved incidents remain archived.

12. Rule changes require version tracking.

# AI Fraud Center Rules

1. Every fraud alert must have a unique Alert ID.

2. Critical fraud alerts require investigation.

3. Blocked entities cannot process transactions.

4. Every investigation must contain analyst notes.

5. Manual blocking requires a reason.

6. Fraud alerts cannot be deleted.

7. Fraud investigations must be auditable.

8. AI-generated scores must be stored.

9. False positives must be tracked.

10. All block actions create audit logs.

11. Resolved alerts remain archived.

12. Critical entities may be auto-blocked.

# Blocked Entities Rules

1. Every blocked entity must have a unique Block ID.

2. Blocking requires a valid reason.

3. Severity must be assigned during blocking.

4. Critical entities are blocked immediately.

5. Unblocked entities remain in history.

6. Policy changes must be audited.

7. Only Super Admin can remove blocks.

8. Every block action creates an audit log.

9. Active blocked entities cannot access platform services.

10. Entity reviews must be recorded.

11. Block records are never permanently deleted.

12. Severity changes require approval logging.

# Case Management Rules

1. Every case must have a unique Case ID.

2. Every case must be assigned to an investigator.

3. Case priority is mandatory.

4. Notes cannot be deleted after submission.

5. Every case action must create a timeline entry.

6. Resolved cases become read-only.

7. Escalated cases require management review.

8. Case status changes must be audited.

9. Critical cases require immediate assignment.

10. Investigation notes are permanently stored.

11. Every case must have an opening description.

12. All actions create audit logs.

# Fee Management Rules

1. Only Super Admin can modify gateway fees.

2. Processor fees must be greater than zero.

3. Fee rules require a unique rule name.

4. Disabled rules remain in history.

5. Every fee update must create an audit record.

6. White label markup cannot be negative.

7. Fixed transaction fee must be validated.

8. Processor fees affect future transactions only.

9. Fee changes require version tracking.

10. Historical transactions keep original fees.

11. Fee rules cannot overwrite audit records.

12. All pricing changes must be logged.

# Subscription Management Rules

1. Every plan must have a unique Plan ID.

2. Plan name must be unique.

3. Monthly price cannot be negative.

4. Transaction fee must be greater than zero.

5. Deleted plans are soft deleted.

6. Existing subscriptions remain active after plan edits.

7. Plan changes must create audit logs.

8. Features are stored as arrays.

9. Disabled plans cannot be assigned.

10. Billing cycle is mandatory.

11. Every plan requires at least one feature.

12. Only Super Admin can delete plans.

# Countries Management Rules

1. Every country must have a unique country code.

2. Country codes follow ISO-3166 standards.

3. Sanctioned countries cannot process payments.

4. Deleted countries are soft deleted.

5. Every update must create an audit record.

6. Region assignment is mandatory.

7. Status changes must be logged.

8. Compliance settings cannot be bypassed.

9. High-risk countries require enhanced monitoring.

10. Country code cannot be modified after creation.

11. Only Super Admin can delete countries.

12. Compliance restrictions apply platform-wide.

# Currencies & FX Rules

1. Every asset must have a unique asset code.

2. Exchange rates are stored against USD.

3. Primary currencies cannot be deleted.

4. Conversion fee cannot be negative.

5. Every rate sync creates history records.

6. Disabled assets cannot be used.

7. Asset code must follow ISO standards where applicable.

8. Exchange rates must be validated before saving.

9. Manual rate changes require audit logs.

10. FX history cannot be deleted.

11. Only Super Admin can add assets.

12. Every asset change must be audited.


# API Management Rules

1. Every API key must have a unique key ID.

2. Production keys require Super Admin approval.

3. API tokens must be encrypted before storage.

4. Revoked keys cannot be restored.

5. Every API request must be logged.

6. Production keys have full gateway access.

7. Sandbox keys are isolated from live systems.

8. Key rotations create audit records.

9. Token values are shown only once after creation.

10. API keys cannot be shared between environments.

11. Only Super Admin can revoke production keys.

12. Security events must be logged.

# Global Webhooks Rules

1. Every endpoint must have a unique ID.

2. Endpoint URL must use HTTPS.

3. Secret keys must be encrypted.

4. Failed deliveries must be logged.

5. Retry attempts are limited to configured thresholds.

6. Disabled endpoints cannot receive events.

7. Every webhook request must be signed.

8. Event payloads must be immutable.

9. Delivery logs must be retained.

10. Endpoint updates create audit records.

11. Only Super Admin can remove endpoints.

12. Webhook failures must trigger monitoring alerts.

# Reports Rules

1. Every report must have a unique Report ID.

2. Generated reports must be stored securely.

3. PDF exports are immutable.

4. Report generation must create audit logs.

5. Deleted reports are soft deleted.

6. Only authorized admins can download reports.

7. Date range is mandatory.

8. Report type is mandatory.

9. Failed reports must be logged.

10. Historical reports remain accessible.

11. Report files must be versioned.

12. All downloads must be tracked.


# White Label Rules

1. Every request must have a unique Request ID.

2. Domain ownership must be verified.

3. SSL must be provisioned before activation.

4. Rejected requests require a reason.

5. Approved requests create audit logs.

6. Custom domains must use HTTPS.

7. Failed SSL requests must be reviewed.

8. Only Enterprise merchants can request white-label access.

9. Expired SSL certificates trigger alerts.

10. Approval status changes must be logged.

11. Only Super Admin can approve requests.

12. Domains cannot be duplicated across merchants.

# Notifications Rules

1. Every broadcast must have a unique Broadcast ID.

2. Title is mandatory.

3. Message body is mandatory.

4. Target audience must be selected.

5. Category must be selected.

6. Sent broadcasts cannot be edited.

7. All broadcasts create audit logs.

8. Delivery failures must be logged.

9. Scheduled broadcasts must have a valid future date.

10. Only Super Admin can send system-wide broadcasts.

11. Archived broadcasts remain available in history.

12. Notifications must be stored for audit compliance.


# Support Rules

1. Every ticket must have a unique Ticket ID.

2. Every ticket requires a merchant association.

3. Subject cannot be empty.

4. Priority must be selected.

5. Tickets can only be assigned to active support agents.

6. Escalated tickets require justification.

7. Closed tickets cannot be modified.

8. Every status change must create an audit log.

9. Ticket replies are permanently stored.

10. Critical tickets require response within SLA.

11. Resolved tickets remain searchable.

12. Only Super Admin can permanently delete tickets.

------------------------------------------------

Priority SLA Rules

Critical = 15 Minutes

High = 1 Hour

Medium = 4 Hours

Low = 24 Hours

------------------------------------------------

Status Flow

Open
 ↓

In Progress
 ↓

Resolved
 ↓

Closed

Escalation Possible At Any Stage


# Audit Logs Rules

1. Every audit event must have a unique Audit ID.

2. Audit records cannot be modified.

3. Audit records cannot be deleted.

4. Every admin action must create a log entry.

5. Every login and logout must be recorded.

6. IP addresses must be captured.

7. Export actions must create audit records.

8. Security incidents require severity classification.

9. Audit records must be retained permanently.

10. Audit searches are logged.

11. Only authorized roles can access audit logs.

12. Compliance events must be stored separately.

------------------------------------------------

Retention Policy

Audit Logs = Permanent

Security Logs = Permanent

Export Logs = Permanent


# Roles Management Rules

1. Only Super Admin can create roles.

2. Only Super Admin can delete roles.

3. Role names must be unique.

4. Every role requires risk classification.

5. Every permission change must be logged.

6. Users may have multiple roles.

7. Critical roles require MFA.

8. Deleted roles cannot be assigned.

9. Role assignments generate audit logs.

10. Permission escalation requires approval.

------------------------------------------------

Risk Rules

Critical Risk
- Full System Access

High Risk
- Financial Operations

Medium Risk
- Compliance Operations

Low Risk
- Support Operations


# Settings Rules

1. Only Super Admin can modify settings.

2. Maintenance Mode affects all APIs.

3. Maintenance Mode returns HTTP 503.

4. Sandbox Environment controls test API access.

5. Force 2FA requires next-login verification.

6. IP Whitelisting blocks non-approved IPs.

7. Every change creates an audit log.

8. Security settings require elevated permission.

9. Changes apply globally.

10. Settings cannot bypass RBAC.

------------------------------------------------

Security Rules

Force 2FA
- Mandatory for all staff

IP Whitelisting
- Office IPs only

Maintenance Mode
- Public APIs disabled

Sabse important.
Coding Rules
Folder Rules
Naming Rules
Database Rules
Migration Rules
API Rules
Repository Rules
Controller Rules
Validation Rules
Security Rules
Logging Rules
Redis Rules
Queue Rules
Events Rules
Cron Rules
JWT Rules
RBAC Rules
Error Rules
Response Rules
Exception Rules
Coding Style
Documentation Rules
Testing Rules
Deployment Rules
Production Rules
Git Rules
Commit Rules
Version Rules
Review Rules
Sab.
Enterprise level.
# Transactions Module Rules

Version: 1.0

---

# Purpose

This document defines all business rules, validation rules, security rules, and processing rules for the Transactions module.

---

# User Roles

## Merchant

Can View Transactions

Can Search Transactions

Can Filter Transactions

Can Export Own Transactions

Can View Transaction Details

Cannot Modify Transaction

Cannot Delete Transaction

Cannot Change Status

---

## Admin

Can View All Transactions

Can Search & Filter

Can Export All Data

Can Retry Failed Payments

Can Retry Webhooks

Can Issue Refunds

Can Force Settlement

Can Freeze Transactions

Can View Audit Logs

---

# Transaction Creation Rules

- Every transaction must have a unique Transaction ID.
- Reference Number must be unique.
- Merchant must be active.
- Payment Method is required.
- Currency is mandatory.
- Amount must be greater than 0.
- Customer information is required.
- Transaction starts with **Pending** status.

---

# Status Rules

Allowed Statuses

- Pending
- Processing
- Completed
- Failed
- Cancelled
- Expired
- Refunded
- Settled
- Chargeback

Only system or admin can update transaction status.

Merchant cannot manually change any status.

---

# Status Transition Rules

Pending
→ Processing

Processing
→ Completed

Processing
→ Failed

Pending
→ Cancelled

Pending
→ Expired

Completed
→ Refunded

Completed
→ Settled

Settled
→ Chargeback (if applicable)

Invalid status transitions must be rejected.

---

# Amount Validation

Amount > 0

Currency required

Amount cannot be negative

Maximum amount depends on Merchant KYC limits

Decimal precision:
2 digits

---

# Currency Rules

Supported currencies are configured by Admin.

Unsupported currency requests must fail.

Currency cannot be changed after transaction creation.

---

# Customer Rules

Customer Name required

Customer Email optional (depends on payment type)

Phone Number optional

Customer ID should be linked if available.

---

# Merchant Rules

Merchant account must be:

- Active
- Verified
- Not Suspended

Inactive merchants cannot create transactions.

---

# Payment Method Rules

Supported Methods

- Card
- Bank Transfer
- Virtual Account
- Wallet
- Crypto
- QR Payment

Unknown methods are rejected.

---

# Duplicate Prevention

Prevent duplicate transactions using:

- Merchant ID
- Reference Number
- Payment ID
- Invoice Number

Duplicate request should return existing transaction.

---

# Search Rules

Search allowed by:

- Transaction ID
- Customer Name
- Customer Email
- Merchant Name
- Amount
- Reference Number

Partial search is supported.

---

# Filter Rules

Filter by

- Status
- Date Range
- Amount
- Payment Method
- Currency
- Merchant
- Settlement Status

Multiple filters can be combined.

---

# Export Rules

Merchant exports only own data.

Admin exports all data.

Supported formats:

- CSV
- Excel
- PDF

Large exports should run in background jobs.

---

# Refund Rules

Only Completed transactions can be refunded.

Refund amount cannot exceed original amount.

Refund status must be tracked separately.

Every refund creates an audit log.

---

# Settlement Rules

Only successful transactions are eligible.

Failed transactions are excluded.

Settlements are generated automatically based on schedule.

---

# Webhook Rules

Every payment event generates a webhook.

Webhook delivery is logged.

Failed webhooks retry automatically.

Maximum retry attempts are configurable.

---

# Notification Rules

Notify Merchant on:

- Payment Success
- Payment Failure
- Refund
- Settlement
- Chargeback

Notifications may be sent via:

- Email
- SMS
- Webhook
- Dashboard

---

# Security Rules

JWT Authentication required.

Every API validates access token.

Merchant can access only their own records.

Admin has full access.

Sensitive data must be encrypted.

---

# Rate Limiting

Search API

100 requests/minute

Export API

10 requests/hour

Transaction APIs

Configurable per merchant.

---

# Audit Rules

Record every critical action.

Examples

- Transaction Created
- Status Updated
- Refund Issued
- Settlement Generated
- CSV Exported
- Webhook Retried

Audit logs cannot be deleted.

---

# Error Handling Rules

Return standard HTTP status codes.

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Performance Rules

Pagination mandatory.

Default Page Size: 20

Maximum Page Size: 100

Database queries must use indexes.

---

# Data Retention

Transactions are never permanently deleted.

Soft Delete only (if enabled).

Audit logs remain permanent.

---

# Future Rules

Support Multi Currency

Support Split Payments

Support Installments

Support AI Fraud Detection

Support Multi Gateway Routing

Support Auto Retry Payments

Support Recurring Payments

---

End of Rules Document
# Deposits Module Rules

Version: 1.0

---

## Business Rules

- Every merchant gets a unique deposit address.
- Address generation depends on selected Asset + Network.
- One address can receive multiple deposits (configurable).
- Unsupported assets are rejected.
- Unsupported networks are rejected.

---

## Deposit Rules

- Deposit ID must be unique.
- Transaction Hash must be unique.
- Amount must be greater than zero.
- Network is mandatory.
- Asset is mandatory.
- Merchant must be active.

---

## Confirmation Rules

Pending

↓

Confirming

↓

Confirmed

OR

Failed

Only blockchain confirmations can change deposit status.

Merchant cannot manually change status.

---

## Wallet Credit Rules

Wallet balance updates only after status becomes **Confirmed**.

Pending or Failed deposits never affect wallet balance.

Duplicate blockchain events must be ignored.

---

## Address Rules

- Generate unique wallet address.
- Validate blockchain address format.
- Address cannot be edited manually.
- QR Code generated automatically.

---

## Search Rules

Search by

- Deposit ID
- Transaction Hash
- Asset
- Network
- Wallet Address

---

## Filter Rules

- Status
- Asset
- Network
- Date
- Amount

---

## Export Rules

Formats

- CSV
- Excel
- PDF

Merchant exports only their own deposits.

---

## Security Rules

- JWT Authentication
- Merchant Access Only
- Encrypted Wallet Address
- Blockchain Verification
- Audit Logs

---

## Notifications

Notify merchant when

- Deposit Received
- Confirmation Started
- Deposit Confirmed
- Deposit Failed

---

## Audit Logs

Record

- Address Generated
- Deposit Received
- Status Updated
- Wallet Credited
- Export Downloaded

---

## Performance Rules

- Pagination Enabled
- Indexed Search
- Background Blockchain Sync
- Cached Dashboard Statistics

---

## Future Scope

- Multi-chain Wallets
- Auto Address Rotation
- Cold Wallet Support
- AML Check
- Risk Scoring

---

End of Rules
# Withdrawals Module Rules

Version: 1.0

---

# Business Rules

- Merchant must have sufficient available balance.
- Withdrawal amount must be greater than zero.
- Withdrawal amount cannot exceed available balance.
- Merchant account must be Active & Verified.
- KYC must be completed before withdrawals.

---

# Withdrawal Rules

Each withdrawal must have

- Unique Withdrawal ID
- Merchant ID
- Method
- Amount
- Fee
- Status

---

# Balance Rules

Available Balance >= Withdrawal Amount + Fees

If balance is insufficient

→ Reject Request

Reserved balance cannot be withdrawn.

---

# Fee Rules

Platform Fee

+

Network Fee (Crypto)

OR

Bank Transfer Fee (Fiat)

Fees are calculated before confirmation.

---

# Status Rules

Draft

↓

Pending

↓

Processing

↓

Completed

OR

Failed

OR

Rejected

OR

Cancelled

Invalid status changes are not allowed.

---

# Crypto Withdrawal Rules

- Wallet Address Required
- Network Required
- Address Format Validation
- Blockchain Broadcast Required

---

# Fiat Withdrawal Rules

- Bank Name
- Account Number
- Account Holder Name
- SWIFT / IFSC (if applicable)

All fields are mandatory.

---

# Security Rules

- JWT Authentication
- OTP Verification
- 2FA Support
- IP Logging
- Device Logging
- Audit Logging

---

# AML / KYC Rules

Verify

- Merchant KYC
- Daily Withdrawal Limit
- Risk Score
- Sanction Check (Future)

High-risk withdrawals require manual review.

---

# Search Rules

Search by

- Withdrawal ID
- Wallet Address
- Bank Account
- Transaction Hash

---

# Filter Rules

- Status
- Method
- Asset
- Network
- Date
- Amount

---

# Export Rules

Supported Formats

- CSV
- Excel
- PDF

Merchant can export only their own withdrawal history.

---

# Notification Rules

Notify Merchant on

- Withdrawal Requested
- Processing Started
- Withdrawal Completed
- Withdrawal Failed
- Withdrawal Rejected

---

# Audit Rules

Log every action

- Withdrawal Created
- OTP Verified
- Status Updated
- Wallet Debited
- Export Downloaded

Audit logs cannot be modified.

---

# Performance Rules

- Pagination Enabled
- Indexed Search
- Background Queue Processing
- Async Notifications

---

# Future Scope

- Scheduled Withdrawals
- Auto Withdrawals
- Multi Signature Wallet
- AI Fraud Detection
- Multi Currency Withdrawals

---

End of Rules
# Wallet Management Rules

Version: 1.0

---

# Business Rules

- Merchant must be active.
- Every wallet belongs to one merchant.
- Asset must be supported.
- Duplicate assets are not allowed.
- Wallet balance cannot become negative.

---

# Asset Rules

Supported Assets only.

Unsupported assets

→ Reject

---

# Add Asset Rules

Merchant selects asset

↓

System checks availability

↓

Create Wallet

↓

Generate Deposit Address

↓

Ready to Use

---

# Wallet Balance Rules

Balance updates from

- Deposits
- Withdrawals
- Settlements
- Manual Adjustments

Merchant cannot edit balance manually.

---

# Portfolio Rules

Portfolio Value

=

All Wallet Values

+

Current Market Prices

Updated automatically.

---

# Search Rules

Search by

- Asset
- Symbol
- Network

---

# Export Rules

Formats

- CSV
- Excel
- PDF

Merchant exports only own wallets.

---

# Security Rules

- JWT Authentication
- Wallet Encryption
- Address Validation
- Audit Logging

---

# Audit Logs

Record

- Asset Added
- Wallet Created
- Balance Updated
- Export Downloaded

---

# Performance Rules

- Pagination
- Indexed Search
- Cached Portfolio Value

---

# Future Scope

- Multi Wallet
- Staking
- Interest Wallet
- Cold Wallet
- NFT Wallet

---

End of Rules
# Settlement Center Rules

Version: 1.0

---

# Business Rules

- Merchant account must be Active.
- Settlement destination must be verified.
- Sufficient available balance is required.
- One primary settlement account per currency.

---

# Linked Account Rules

Supported Types

- Bank Account
- Crypto Wallet

Rules

- Account must be unique.
- Wallet address must be valid.
- Bank account details are mandatory.
- Merchant can change primary account.

---

# Settlement Rules

Scheduled Settlement

↓

Balance Validation

↓

Fee Calculation

↓

Transfer Processing

↓

Settlement Completed

---

# Early Payout Rules

- Merchant can request early payout.
- Early payout fee applies (default 1%).
- Amount cannot exceed eligible settlement.
- Processing starts immediately after approval.

---

# Balance Rules

Available Balance

>=

Settlement Amount + Fees

Otherwise

Reject Request

---

# Status Rules

Scheduled

↓

Pending

↓

Processing

↓

Completed

OR

Failed

OR

Cancelled

---

# Search Rules

Search by

- Settlement ID
- Bank Name
- Wallet Address
- Reference Number

---

# Filter Rules

- Status
- Method
- Currency
- Date
- Amount

---

# Export Rules

Formats

- CSV
- Excel
- PDF

Merchant can export only their own settlement history.

---

# Notification Rules

Notify Merchant

- Settlement Scheduled
- Settlement Processing
- Settlement Completed
- Settlement Failed
- Early Payout Approved

---

# Audit Rules

Record

- Account Linked
- Primary Account Changed
- Settlement Requested
- Settlement Completed
- Early Payout Requested
- Export Downloaded

---

# Security Rules

- JWT Authentication
- Account Validation
- Rate Limiting
- Audit Logging
- Encryption of Sensitive Data

---

# Performance Rules

- Pagination
- Indexed Search
- Queue-Based Processing
- Background Settlement Jobs

---

# Future Scope

- Multi-Bank Accounts
- Auto Settlement Rules
- Multi-Signature Approval
- AI Fraud Detection
- Cross-Border Settlements

---

End of Rules
# Customers Module Rules

Version: 1.0

---

# Business Rules

- Every customer has a unique Customer ID.
- Email address must be unique.
- Customer belongs to one merchant.
- Customer cannot have duplicate profiles.

---

# Customer Rules

Required Fields

- Full Name
- Email Address
- Joined Date

Optional

- Risk Profile
- Notes
- Tags

---

# Risk Rules

Risk Levels

- Low
- Medium
- High

Risk can be updated manually or automatically.

---

# Transaction Rules

Transaction Count updates automatically.

Lifetime Value updates after every successful transaction.

---

# CRUD Rules

Merchant can

- Create Customer
- View Customer
- Update Customer
- Delete Customer (Soft Delete)

---

# Search Rules

Search by

- Customer ID
- Name
- Email

---

# Filter Rules

- Risk
- Date
- LTV
- Transaction Count

---

# Export Rules

Formats

- CSV
- Excel
- PDF

Merchant exports only their own customers.

---

# Notification Rules

Notify on

- Customer Created
- Customer Updated
- High Risk Flag

---

# Audit Rules

Record

- Customer Created
- Customer Updated
- Customer Deleted
- Export Downloaded

---

# Security Rules

- JWT Authentication
- Role Validation
- Audit Logging
- Input Validation

---

# Future Scope

- KYC
- Customer Notes
- Customer Tags
- Loyalty Program
- AI Risk Scoring

---

End of Rules
# Revenue Module Rules

Version: 1.0

---

# Business Rules

- Revenue is calculated only from successful transactions.
- Failed or cancelled transactions are excluded.
- Fees are deducted automatically.
- Net Revenue = Gross Revenue - Total Fees.

---

# Revenue Formula

Gross Revenue

-

Gateway Fees

-

Network Fees

=

Net Revenue

---

# Fee Rules

Supported Fees

- Gateway Fee
- Network Fee
- Settlement Fee
- Early Payout Fee

---

# Report Rules

Merchant can generate

- Daily Report
- Weekly Report
- Monthly Report
- Custom Report

---

# Export Rules

Formats

- CSV
- Excel
- PDF

---

# Dashboard Rules

Show

- Gross Revenue
- Net Revenue
- Fees
- Revenue Trends

---

# Security Rules

- JWT Authentication
- Permission Validation
- Audit Logging

---

# Future Scope

- Revenue Forecast
- Profit Margin
- AI Insights
- Multi-Currency Revenue

---

End of Rules
# Reports & Analytics Rules

Version: 1.0

---

# Business Rules

- Analytics uses completed transactions only.
- Failed transactions are excluded.
- Revenue matches Revenue Module.
- Refunds and chargebacks are calculated separately.

---

# Dashboard Rules

Display

- Revenue KPIs
- Volume KPIs
- Customer KPIs
- Refund KPIs
- Chargeback KPIs

---

# Report Rules

Merchant can generate

- Daily Report
- Weekly Report
- Monthly Report
- Yearly Report
- Custom Report

---

# Chart Rules

Supported Charts

- Line Chart
- Bar Chart
- Area Chart
- Pie Chart

---

# Export Rules

Formats

- PDF
- CSV
- Excel

---

# Filter Rules

Filter By

- Date
- Currency
- Transaction Type
- Customer
- Status

---

# Security Rules

- JWT Authentication
- Permission Validation
- Audit Logging

---

# Future Scope

- AI Analytics
- Revenue Forecast
- Fraud Analytics
- Predictive Reports

---

End of Rules
# API Keys Module Rules

Version: 1.0

---

# Business Rules

- Every merchant can create multiple API keys.
- API keys are unique.
- Keys are displayed only once during creation.
- Secret keys are never returned again.

---

# Key Rules

Supported Environments

- Production
- Sandbox

Statuses

- Active
- Revoked

---

# Generation Rules

Required

- Key Name
- Environment

Generate

- Public Key
- Secret Key
- Created Date

---

# Rotation Rules

Roll Key

↓

Generate New Secret

↓

Deactivate Old Secret

↓

Audit Log

---

# Revocation Rules

Revoked keys cannot access any API.

---

# Usage Rules

Track

- Last Used
- Total Requests
- IP Address (Optional)

---

# Security Rules

- Encrypt Secret Keys
- Never Store Plain Text
- JWT Authentication
- RBAC Permissions

---

# Future Scope

- API Key Expiry
- IP Whitelisting
- Rate Limits
- Key Permissions

---

End of Rules
# Webhooks Module Rules

Version: 1.0

---

# Business Rules

- Only verified HTTPS endpoints allowed.
- Merchant can create multiple endpoints.
- Each endpoint belongs to one merchant.
- Disabled endpoints receive no events.

---

# Endpoint Rules

Required

- Endpoint URL
- Event Selection

Validation

- Valid URL format
- HTTPS required
- Reachable endpoint

---

# Event Rules

Merchant can subscribe to

- Payment Events
- Payout Events
- Deposit Events
- Refund Events

---

# Delivery Rules

Every event must contain

- Event ID
- Event Type
- Timestamp
- Payload
- Signature

---

# Retry Rules

If delivery fails:

Retry attempts

1st Retry
after few seconds

2nd Retry

3rd Retry

After max retries

Mark Failed

---

# Response Rules

Success

HTTP 200

Failed

HTTP 4xx / 5xx

---

# Security Rules

- Sign every webhook request.
- Verify merchant endpoint.
- Store delivery history.
- Prevent duplicate processing.

---

# Logging Rules

Store

- Request Payload
- Response
- Status Code
- Timestamp

---

# Future Scope

- Webhook Replay
- Custom Headers
- Event Filtering
- Delivery Analytics

---

End of Rules
# White Label Studio Rules

Version: 1.0

---

# Business Rules

- White Label is available only for eligible plans.
- Each merchant owns only their configuration.
- PGX branding can be removed only after activation.

---

# Domain Rules

Required

- Valid Domain
- DNS Record Verification

Supported

- Custom Subdomain
- HTTPS Domain

---

# DNS Verification Rules

Merchant must add

Type

CNAME

Name

pay

Target

cname.pgxgateway.com

---

# SSL Rules

After verification

↓

SSL Certificate Generated

↓

Domain Activated

---

# Branding Rules

Merchant can customize

- Logo
- Colors
- Fonts
- Emails

---

# Checkout Rules

Merchant controls

- Billing Address
- Phone Collection
- KYC Requirement
- Network Fee Display

---

# Email Rules

Required

- Sender Name
- Reply Email

Optional

- Footer
- Custom Branding

---

# Security Rules

- Validate Domain Ownership
- Encrypt Configuration
- Secure Asset Storage

---

# Future Scope

- Custom CSS
- Custom Checkout Layout
- Multiple Brands
- Regional Pages

---

End of Rules
# Billing & Subscription Rules

Version: 1.0

---

# Business Rules

- Every merchant must have an active subscription.
- Only one active plan allowed at a time.
- Billing cycle is monthly.

---

# Plan Rules

Plans

- Starter
- Pro
- Enterprise

Each plan contains

- Price
- API Limit
- Features
- Support Level

---

# Upgrade Rules

Merchant

↓

Select New Plan

↓

Validate Payment Method

↓

Charge Amount

↓

Activate New Plan

---

# Downgrade Rules

Downgrade allowed only if

- Usage within lower plan limits
- No pending payment

---

# Payment Rules

Required

- Valid Card
- Billing Information

---

# Invoice Rules

Generate invoice after successful payment.

Invoice contains

- Invoice ID
- Amount
- Date
- Status

---

# Usage Rules

Track

- API Requests
- Transactions
- Storage Usage

If limit exceeded

↓

Block / Warning

---

# Cancellation Rules

When cancelled

- Disable Auto Renewal
- Keep Account Active Until Expiry

---

# Security Rules

- Never store raw card details
- Encrypt payment data
- Maintain audit logs

---

# Future Scope

- Coupons
- Discounts
- Tax Handling
- Multiple Currencies

---

End of Rules
# Team Members Rules

Version: 1.0

---

# Business Rules

- Only Owner/Admin can manage team members.
- Every member belongs to one merchant.
- Email must be unique.

---

# Invitation Rules

Required

- Email
- Role

Flow

Invite

↓

Send Email

↓

Accept Invitation

↓

Create Account

---

# Role Rules

Owner

- Cannot be deleted
- Full access

Admin

- Can manage users

Finance

- Limited financial access

Developer

- Technical access only

---

# Edit Rules

Admin can update

- Role
- Permissions
- Status

---

# Delete Rules

Delete removes access.

Before Delete

↓

Confirmation Required

↓

Deactivate Account

---

# Status Rules

Pending

↓

Invitation Sent

↓

Active

↓

Disabled

---

# Security Rules

- Check Permissions
- Validate Role
- Maintain Audit Logs

---

# Future Scope

- Custom Roles
- Permission Builder
- Team Groups
- SSO Login

---

End of Rules
# Notifications Rules

Version: 1.0

---

# Business Rules

- Every notification belongs to a merchant.
- Users only see their own merchant notifications.
- Notifications cannot be modified by users.

---

# Creation Rules

System Event

↓

Generate Notification

↓

Save Notification

↓

Send To User

---

# Read Rules

Unread Notification

↓

User Opens

↓

Mark As Read

---

# Mark All Read Rules

User Clicks

Mark All Read

↓

Update All Pending Notifications

↓

Set Read Status

---

# Notification Priority

Levels

High

- Security Alert
- Payment Failure


Medium

- Settlement Update


Low

- General Updates

---

# Retention Rules

Store notifications for defined period.

Old notifications can be archived.

---

# Security Rules

- Validate Merchant ID
- Protect User Data
- Log Notification Events

---

# Future Scope

- Push Notifications
- SMS Alerts
- Email Alerts
- Custom Notification Preferences

---

End of Rules
# Settings Rules

Version: 1.0

---

# Business Rules

- Only authorized users can update settings.
- Every change must be recorded.
- Sensitive changes require verification.

---

# Profile Rules

Allowed Updates

- Company Name
- Email
- Timezone

Email Change

↓

Verification Required

---

# Password Rules

Password must

- Minimum 8 characters
- Strong complexity

---

# Password Change Flow

Enter Password

↓

Validate

↓

Hash Password

↓

Update Account

↓

Logout Old Sessions

---

# 2FA Rules

Enable 2FA

↓

Generate Secret

↓

Verify Code

↓

Activate Protection


Disable 2FA

↓

Verify User

↓

Remove Protection

---

# Security Rules

- Never store plain passwords
- Encrypt sensitive data
- Maintain audit logs

---

# Session Rules

After password update

- Expire old tokens
- Require login again

---

# Future Scope

- SSO
- Login History
- Device Management
- Security Alerts

---

End of Rules
# Support Center Rules

Version: 1.0

---

# Business Rules

- Every ticket belongs to one merchant.
- Merchant can view only own tickets.
- Support team can manage assigned tickets.

---

# Ticket Creation Rules

Required

- Subject
- Category
- Message

After Submit

↓

Create Ticket

↓

Assign ID

↓

Notify Support Team

---

# Ticket Status Rules

New Ticket

↓

Open

↓

Assigned

↓

In Progress

↓

Resolved

↓

Closed

---

# Update Rules

Merchant can

- Add Reply
- View Status

Support can

- Change Status
- Add Response

---

# Priority Rules

Enterprise

↓

Priority Queue

---

# Manager Rules

Dedicated Manager assigned by plan.

Enterprise users get

- Dedicated Contact
- Priority Handling

---

# Security Rules

- Validate Merchant Access
- Protect Ticket Data
- Log All Actions

---

# Future Scope

- Live Chat
- Video Support
- AI Assistant
- SLA Tracking

---

End of Rules


# Transaction Rules

1. User must be authenticated.

2. User can only view their own transactions.

3. Completed transactions cannot be modified.

4. Failed transactions remain read-only.

5. Pending withdrawals can be cancelled before processing.

6. Transaction hash must remain immutable.

7. Export reports are generated on demand.

8. Search results limited to user transactions only.

9. Subscription transactions are system generated.

10. Financial records cannot be deleted.

# Notifications Rules

1. User must be authenticated.

2. Notifications belong only to the logged-in user.

3. Unread notifications show badge count.

4. Mark All Read updates all unread records.

5. System notifications cannot be deleted.

6. Lobby invite notifications expire after event ends.

7. Wallet notifications are immutable.

8. Chat mention notifications open related chat.

9. Achievement notifications remain permanent.

10. Notification history retained for 90 days.

# Profile Rules

1. User must be authenticated.

2. Username must be unique.

3. Email cannot be edited directly.

4. Profile bio maximum length:
300 characters.

5. Avatar must be image format only.

6. Cover image must be image format only.

7. Favorite channels limit:
Maximum 20 channels.

8. Activity history is read-only.

9. Profile updates must be logged.

10. Only owner can edit profile.

------------------------------------------------

Avatar Rules

Allowed Types:
- JPG
- PNG
- WEBP

Maximum Size:
5 MB

------------------------------------------------

Bio Rules

Minimum:
5 characters

Maximum:
300 characters

# Settings Rules

1. User must be authenticated.

2. Username must be unique.

3. Email must be unique.

4. Password must be encrypted.

5. Password confirmation is required.

6. 2FA requires verified email.

7. Private profile hides activity.

8. Notification settings are user-specific.

9. Account deletion is irreversible.

10. Settings updates must be logged.

------------------------------------------------

Password Rules

- Minimum 8 characters
- One uppercase letter
- One number
- One special character

------------------------------------------------

Privacy Rules

Private Profile:
Only approved friends can see activity.
# Support Module Rules

1. Only authenticated users can create tickets.

2. Live Chat is available only for PRO members.

3. Email support requests are logged.

4. Tickets require category selection.

5. Ticket IDs must be unique.

6. Documentation is publicly readable.

7. Closed tickets cannot be edited.

8. Chat history is stored securely.

9. FAQ content is searchable.

10. Support actions are audit logged.

------------------------------------------------

Ticket Status

- Open
- In Progress
- Waiting User
- Resolved
- Closed

------------------------------------------------

Priority Levels

- Low
- Medium
- High
- Critical