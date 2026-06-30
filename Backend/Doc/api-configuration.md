# API Configuration

# Dashboard APIs

Base URL

/api/admin/dashboard

Authentication

Bearer JWT Required

Permissions

Super Admin
Owner

--------------------------------

GET /api/admin/dashboard

Description:
Fetch dashboard overview.

--------------------------------

POST /api/admin/dashboard/refresh

Description:
Refresh dashboard data.

--------------------------------

GET /api/admin/dashboard/revenue-growth

Description:
Fetch revenue chart data.

--------------------------------

GET /api/admin/dashboard/processor-distribution

Description:
Fetch processor analytics.

--------------------------------

GET /api/admin/dashboard/system-status

Description:
Fetch platform health status.

# Merchants API Configuration

Base URL

/api/admin/merchants

Authentication

Bearer JWT Token Required

Permissions

Super Admin
Owner

------------------------------------

GET /api/admin/merchants

Description:
Get all merchants

------------------------------------

GET /api/admin/merchants/:id

Description:
Get merchant details

------------------------------------

POST /api/admin/merchants

Description:
Create merchant

------------------------------------

PUT /api/admin/merchants/:id

Description:
Update merchant

------------------------------------

PATCH /api/admin/merchants/:id/status

Description:
Change merchant status

------------------------------------

DELETE /api/admin/merchants/:id

Description:
Delete merchant

------------------------------------

GET /api/admin/merchants/search

Description:
Search merchants

Query Params

keyword
status
country
subscriptionPlan

------------------------------------

GET /api/admin/merchants/export

Description:
Export merchant data

Formats

CSV
Excel
PDF

------------------------------------

Response Example

{
  "success": true,
  "message": "Merchant created successfully"
}


# Transactions API Configuration

Base URL

/api/admin/transactions

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/transactions

Description:
Fetch all transactions.

------------------------------------------------

GET /api/admin/transactions/:id

Description:
Fetch transaction details.

------------------------------------------------

GET /api/admin/transactions/search

Description:
Global transaction search.

Query Params

keyword
merchant
customer
wallet
transactionHash

------------------------------------------------

GET /api/admin/transactions/filter

Description:
Advanced transaction filtering.

Query Params

status
processor
merchant
currency
dateFrom
dateTo

------------------------------------------------

GET /api/admin/transactions/export

Description:
Export transactions.

Formats

CSV
Excel
PDF

------------------------------------------------

GET /api/admin/transactions/stats

Description:
Fetch transaction statistics.

------------------------------------------------

POST /api/admin/transactions/refund/:id

Description:
Initiate transaction refund.

------------------------------------------------

Response Example

{
  "success": true,
  "data": {}
}


# Revenue API Configuration

Base URL

/api/admin/revenue

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/revenue

Description:
Get revenue dashboard data.

------------------------------------------------

GET /api/admin/revenue/overview

Description:
Get revenue summary.

------------------------------------------------

GET /api/admin/revenue/growth

Description:
Get revenue growth chart data.

------------------------------------------------

GET /api/admin/revenue/sources

Description:
Get revenue source distribution.

------------------------------------------------

GET /api/admin/revenue/export

Description:
Export revenue reports.

Formats

CSV
Excel
PDF

------------------------------------------------

GET /api/admin/revenue/monthly

Description:
Get monthly revenue report.

------------------------------------------------

GET /api/admin/revenue/yearly

Description:
Get yearly revenue report.


# Settlements API Configuration

Base URL

/api/admin/settlements

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/settlements

Description:
Get all settlements.

------------------------------------------------

GET /api/admin/settlements/:id

Description:
Get settlement details.

------------------------------------------------

POST /api/admin/settlements

Description:
Create settlement request.

------------------------------------------------

PATCH /api/admin/settlements/:id/status

Description:
Update settlement status.

------------------------------------------------

GET /api/admin/settlements/queue

Description:
Get settlement queue.

------------------------------------------------

GET /api/admin/settlements/analytics

Description:
Get settlement statistics.

------------------------------------------------

GET /api/admin/settlements/export

Description:
Export settlements.

Formats

CSV
Excel
PDF

------------------------------------------------

Response Example

{
  "success": true,
  "message": "Settlement updated successfully"
}

# Wallets API Configuration

Base URL

/api/admin/wallets

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/wallets

Description:
Get all wallets.

------------------------------------------------

GET /api/admin/wallets/:id

Description:
Get wallet details.

------------------------------------------------

POST /api/admin/wallets

Description:
Create wallet.

------------------------------------------------

PUT /api/admin/wallets/:id

Description:
Update wallet.

------------------------------------------------

GET /api/admin/wallets/liquidity

Description:
Get liquidity overview.

------------------------------------------------

GET /api/admin/wallets/treasury

Description:
Get treasury summary.

------------------------------------------------

POST /api/admin/wallets/transfer

Description:
Transfer funds between wallets.

------------------------------------------------

GET /api/admin/wallets/export

Description:
Export wallet data.

Formats

CSV
Excel
PDF


# Payment Processors Dashboard API

Base URL

/api/admin/payment-processors/dashboard

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/dashboard

Description:
Get dashboard summary.

------------------------------------------------

GET /api/admin/payment-processors/health

Description:
Get processor health data.

------------------------------------------------

GET /api/admin/payment-processors/nodes

Description:
Get active processing nodes.

------------------------------------------------

GET /api/admin/payment-processors/volume

Description:
Get live volume analytics.

------------------------------------------------

GET /api/admin/payment-processors/alerts

Description:
Get critical alerts.

------------------------------------------------

POST /api/admin/payment-processors/configure-node

Description:
Configure processing node.

------------------------------------------------

GET /api/admin/payment-processors/report

Description:
Download processor report.

# Failover Monitor API

Base URL

/api/admin/payment-processors/failover-monitor

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor

Description:
Fetch dashboard overview.

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor/nodes

Description:
Get active processor nodes.

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor/events

Description:
Get failover events.

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor/triggers

Description:
Get trigger configuration.

------------------------------------------------

PUT /api/admin/payment-processors/failover-monitor/triggers/:id

Description:
Update trigger settings.

------------------------------------------------

POST /api/admin/payment-processors/failover-monitor/manual-failover

Description:
Trigger manual failover.

------------------------------------------------

POST /api/admin/payment-processors/failover-monitor/recovery

Description:
Restore primary processor.

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor/alerts

Description:
Get alert configuration.

------------------------------------------------

PUT /api/admin/payment-processors/failover-monitor/alerts

Description:
Update email notification settings.

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor/logs

Description:
View failover logs.

------------------------------------------------

GET /api/admin/payment-processors/failover-monitor/report

Description:
Download failover report.


# Fee Split Engine API

Base URL

/api/admin/payment-processors/fee-split-engine

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/fee-split-engine

Description:
Get fee split dashboard.

------------------------------------------------

GET /api/admin/payment-processors/fee-split-engine/configuration

Description:
Get fee distribution configuration.

------------------------------------------------

PUT /api/admin/payment-processors/fee-split-engine/configuration

Description:
Update fee distribution.

------------------------------------------------

GET /api/admin/payment-processors/fee-split-engine/rules

Description:
Get markup rules.

------------------------------------------------

POST /api/admin/payment-processors/fee-split-engine/rules

Description:
Create new markup rule.

(Add Rule Modal)

Request

{
  "transactionType":"AMEX Cards",
  "processorBase":2.9,
  "gatewayMarkup":1.0
}

------------------------------------------------

PUT /api/admin/payment-processors/fee-split-engine/rules/:id

Description:
Update markup rule.

(Edit Rule Modal)

------------------------------------------------

DELETE /api/admin/payment-processors/fee-split-engine/rules/:id

Description:
Delete markup rule.

------------------------------------------------

GET /api/admin/payment-processors/fee-split-engine/report

Description:
Generate fee report.

# Geo Routing API

Base URL

/api/admin/payment-processors/geo-routing

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/geo-routing

Description:
Get geo routing dashboard.

------------------------------------------------

GET /api/admin/payment-processors/geo-routing/rules

Description:
Get all routing rules.

------------------------------------------------

GET /api/admin/payment-processors/geo-routing/rules/:id

Description:
Get routing rule details.

------------------------------------------------

POST /api/admin/payment-processors/geo-routing/rules

Description:
Create routing rule.

(Add Routing Rule Modal)

Request

{
  "regionName":"Southeast Asia",
  "countries":["TH","MY","ID","VN"],
  "processor":"Stripe Gateway US",
  "priority":1
}

------------------------------------------------

PUT /api/admin/payment-processors/geo-routing/rules/:id

Description:
Update routing rule.

(Edit Routing Rule Modal)

------------------------------------------------

DELETE /api/admin/payment-processors/geo-routing/rules/:id

Description:
Delete routing rule.

------------------------------------------------

PATCH /api/admin/payment-processors/geo-routing/rules/:id/status

Description:
Activate / Disable rule.

------------------------------------------------

GET /api/admin/payment-processors/geo-routing/analytics

Description:
Get routing analytics.

------------------------------------------------

GET /api/admin/payment-processors/geo-routing/report

Description:
Download routing report.


# Merchant Rules API

Base URL

/api/admin/payment-processors/merchant-rules

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/merchant-rules

Description:
Get merchant fee configuration dashboard.

------------------------------------------------

GET /api/admin/payment-processors/merchant-rules/:merchantId

Description:
Get merchant fee rule details.

------------------------------------------------

POST /api/admin/payment-processors/merchant-rules/override

Description:
Create merchant fee override.

(Override Fee Modal)

Request

{
  "merchantId":"MER-1092",
  "customFeePercentage":1.9,
  "customFixedFee":0.25,
  "overrideReason":"Enterprise contract negotiated"
}

------------------------------------------------

PUT /api/admin/payment-processors/merchant-rules/override/:id

Description:
Update merchant fee override.

------------------------------------------------

DELETE /api/admin/payment-processors/merchant-rules/override/:id

Description:
Remove fee override.

------------------------------------------------

GET /api/admin/payment-processors/merchant-rules/history/:merchantId

Description:
View fee change history.

------------------------------------------------

GET /api/admin/payment-processors/merchant-rules/report

Description:
Download merchant pricing report.

# Settlement Engine API

Base URL

/api/admin/payment-processors/settlement-engine

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/settlement-engine

Description:
Get settlement dashboard.

------------------------------------------------

GET /api/admin/payment-processors/settlement-engine/processors

Description:
Get processor balances.

------------------------------------------------

POST /api/admin/payment-processors/settlement-engine/settle-now

Description:
Initiate manual settlement.

(Settle Now Modal)

Request

{
  "processor":"Stripe Gateway US",
  "amount":48240,
  "destination":"Primary Bank Account"
}

------------------------------------------------

GET /api/admin/payment-processors/settlement-engine/auto-rules

Description:
Get auto settlement rules.

------------------------------------------------

POST /api/admin/payment-processors/settlement-engine/auto-rules

Description:
Create auto settlement rule.

(Auto Settle Rule Modal)

Request

{
  "frequency":"Daily 00:00 UTC",
  "minimumThreshold":5000,
  "includedProcessors":"All Active Processors"
}

------------------------------------------------

PUT /api/admin/payment-processors/settlement-engine/auto-rules/:id

Description:
Modify settlement rules.

(Modify Button)

------------------------------------------------

GET /api/admin/payment-processors/settlement-engine/history

Description:
Get settlement history.

------------------------------------------------

GET /api/admin/payment-processors/settlement-engine/report

Description:
Download settlement report.

# Revenue Wallet API

Base URL

/api/admin/payment-processors/revenue-wallet

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/revenue-wallet

Description:
Get revenue wallet dashboard.

------------------------------------------------

GET /api/admin/payment-processors/revenue-wallet/overview

Description:
Get revenue summary.

------------------------------------------------

GET /api/admin/payment-processors/revenue-wallet/history

Description:
Get monthly earnings history.

Query Params

period=6months
period=12months

------------------------------------------------

GET /api/admin/payment-processors/revenue-wallet/withdrawals

Description:
Get withdrawal history.

------------------------------------------------

POST /api/admin/payment-processors/revenue-wallet/withdraw

Description:
Withdraw revenue funds.

(Withdraw Revenue Modal)

Request

{
  "amount":25000,
  "destination":"Primary Bank Account"
}

------------------------------------------------

GET /api/admin/payment-processors/revenue-wallet/analytics

Description:
Get revenue analytics.

------------------------------------------------

GET /api/admin/payment-processors/revenue-wallet/report

Description:
Generate revenue wallet report.

Formats

CSV
Excel
PDF

# Processor Logs API

Base URL

/api/admin/payment-processors/logs

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/logs

Description:
Get processor logs.

------------------------------------------------

GET /api/admin/payment-processors/logs/:id

Description:
Get log details.

------------------------------------------------

GET /api/admin/payment-processors/logs/search

Description:
Search logs.

Query Params

logId
transactionId
processorName

------------------------------------------------

GET /api/admin/payment-processors/logs/filter

Description:
Filter logs.

Query Params

status
processor
dateFrom
dateTo

------------------------------------------------

POST /api/admin/payment-processors/logs/refresh

Description:
Refresh logs dashboard.

------------------------------------------------

GET /api/admin/payment-processors/logs/export

Description:
Export logs.

Formats

CSV
Excel
JSON

(Export Button)

------------------------------------------------

GET /api/admin/payment-processors/logs/stats

Description:
Get logs statistics.

------------------------------------------------

GET /api/admin/payment-processors/logs/webhooks

Description:
Get webhook logs.

# Processor Reports API

Base URL

/api/admin/payment-processors/reports

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/payment-processors/reports

Description:
Get reports dashboard.

------------------------------------------------

GET /api/admin/payment-processors/reports/overview

Description:
Get report summary metrics.

------------------------------------------------

GET /api/admin/payment-processors/reports/approval-rates

Description:
Get approval rate analytics.

------------------------------------------------

GET /api/admin/payment-processors/reports/refunds

Description:
Get refund analytics.

------------------------------------------------

GET /api/admin/payment-processors/reports/chargebacks

Description:
Get chargeback analytics.

------------------------------------------------

POST /api/admin/payment-processors/reports/date-range

Description:
Select reporting period.

(Date Range Modal)

Request

{
  "period":"This Month"
}

------------------------------------------------

POST /api/admin/payment-processors/reports/export

Description:
Export report.

(Export PDF Modal)

Request

{
  "period":"This Month",
  "sections":[
    "Approval Rate Trends",
    "Chargeback Analysis",
    "Refund Summary",
    "Node Uptime Stats"
  ],
  "format":"PDF"
}

------------------------------------------------

GET /api/admin/payment-processors/reports/download/:id

Description:
Download generated report.

# KYC Dashboard API

Base URL

/api/admin/kyc/dashboard

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Compliance Officer

------------------------------------------------

GET /api/admin/kyc/dashboard

Description:
Get KYC dashboard overview.

------------------------------------------------

GET /api/admin/kyc/submissions

Description:
Get KYC submissions list.

------------------------------------------------

GET /api/admin/kyc/submissions/:id

Description:
Get KYC submission details.

------------------------------------------------

GET /api/admin/kyc/review-queue

Description:
Get pending review queue.

(KYC Review Queue Modal)

------------------------------------------------

POST /api/admin/kyc/review/:id/approve

Description:
Approve KYC application.

(Review Modal)

------------------------------------------------

POST /api/admin/kyc/review/:id/reject

Description:
Reject KYC application.

------------------------------------------------

GET /api/admin/kyc/documents/:id

Description:
Get uploaded documents.

------------------------------------------------

GET /api/admin/kyc/reports

Description:
Generate KYC report.

------------------------------------------------

GET /api/admin/kyc/analytics

Description:
Get KYC analytics.

# AML Monitoring API

Base URL

/api/admin/compliance/aml-monitoring

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Compliance Officer

------------------------------------------------

GET /api/admin/compliance/aml-monitoring

Description:
Get AML dashboard.

------------------------------------------------

GET /api/admin/compliance/aml-monitoring/alerts

Description:
Get AML alert list.

------------------------------------------------

GET /api/admin/compliance/aml-monitoring/alerts/:id

Description:
Get AML alert details.

(Investigate Button Modal)

------------------------------------------------

POST /api/admin/compliance/aml-monitoring/alerts/:id/resolve

Description:
Mark AML alert as resolved.

------------------------------------------------

POST /api/admin/compliance/aml-monitoring/alerts/:id/escalate

Description:
Escalate AML alert.

------------------------------------------------

POST /api/admin/compliance/aml-monitoring/flag-entity

Description:
Flag suspicious entity.

(Flag Entity Modal)

Request

{
  "entityId":"MER-1092",
  "reason":"Suspicious transaction pattern"
}

------------------------------------------------

GET /api/admin/compliance/aml-monitoring/flagged-entities

Description:
Get flagged entities.

------------------------------------------------

GET /api/admin/compliance/aml-monitoring/reports

Description:
Generate AML reports.

# Compliance Reports API

Base URL

/api/admin/compliance/reports

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Compliance Officer

------------------------------------------------

GET /api/admin/compliance/reports

Description:
Get compliance reports dashboard.

------------------------------------------------

GET /api/admin/compliance/reports/overview

Description:
Get compliance report metrics.

------------------------------------------------

POST /api/admin/compliance/reports/date-range

Description:
Select reporting period.

(Date Range Modal)

Request

{
  "period":"This Month"
}

------------------------------------------------

POST /api/admin/compliance/reports/export

Description:
Export compliance report.

(Export Compliance Report Modal)

Request

{
  "period":"This Month",
  "sections":[
    "KYC Approval Summary",
    "AML Alert Report",
    "Regulatory Filing Index",
    "Risk Score Overview"
  ],
  "format":"PDF"
}

------------------------------------------------

GET /api/admin/compliance/reports/filings

Description:
Get regulatory filings.

------------------------------------------------

GET /api/admin/compliance/reports/filings/:id

Description:
Get filing details.

------------------------------------------------

GET /api/admin/compliance/reports/download/:id

Description:
Download generated report.

# Activity Timeline API

Base URL

/api/admin/compliance/activity-timeline

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Compliance Officer

------------------------------------------------

GET /api/admin/compliance/activity-timeline

Description:
Get timeline dashboard.

------------------------------------------------

GET /api/admin/compliance/activity-timeline/events

Description:
Get timeline events.

------------------------------------------------

GET /api/admin/compliance/activity-timeline/events/:id

Description:
Get event details.

------------------------------------------------

GET /api/admin/compliance/activity-timeline/search

Description:
Search timeline events.

Query Params

entityName
eventType
eventId

------------------------------------------------

GET /api/admin/compliance/activity-timeline/filter

Description:
Filter timeline events.

Query Params

category
dateRange
eventType

------------------------------------------------

GET /api/admin/compliance/activity-timeline/stats

Description:
Get dashboard metrics.

------------------------------------------------

GET /api/admin/compliance/activity-timeline/export

Description:
Export timeline report.

Formats

PDF
CSV
Excel

# Risk Dashboard API

Base URL

/api/admin/fraud-risk/dashboard

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Risk Analyst

------------------------------------------------

GET /api/admin/fraud-risk/dashboard

Description:
Get risk dashboard overview.

------------------------------------------------

GET /api/admin/fraud-risk/dashboard/incidents

Description:
Get active incidents.

(Active Incidents Modal)

------------------------------------------------

GET /api/admin/fraud-risk/dashboard/entities

Description:
Get risk entities.

------------------------------------------------

GET /api/admin/fraud-risk/dashboard/entities/:id

Description:
Get entity risk profile.

------------------------------------------------

POST /api/admin/fraud-risk/dashboard/configure-rules

Description:
Configure risk rules.

(Configure Risk Rules Modal)

Request

{
  "globalThreshold":80,
  "action":"Block Transaction & Alert"
}

------------------------------------------------

PUT /api/admin/fraud-risk/dashboard/rules/:id

Description:
Update risk rules.

------------------------------------------------

POST /api/admin/fraud-risk/dashboard/investigate/:id

Description:
Create investigation case.

------------------------------------------------

GET /api/admin/fraud-risk/dashboard/analytics

Description:
Get risk analytics.

------------------------------------------------

GET /api/admin/fraud-risk/dashboard/report

Description:
Download risk report.

# AI Fraud Center API

Base URL

/api/admin/fraud-risk/fraud-center

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Fraud Analyst

------------------------------------------------

GET /api/admin/fraud-risk/fraud-center

Description:
Get fraud center dashboard.

------------------------------------------------

GET /api/admin/fraud-risk/fraud-center/alerts

Description:
Get fraud alert queue.

------------------------------------------------

GET /api/admin/fraud-risk/fraud-center/alerts/:id

Description:
Get fraud alert details.

(Review Modal)

------------------------------------------------

POST /api/admin/fraud-risk/fraud-center/investigate/:id

Description:
Add analyst investigation notes.

------------------------------------------------

POST /api/admin/fraud-risk/fraud-center/block-entity

Description:
Manual entity blocking.

(Block Entity Modal)

Request

{
  "entity":"user@example.com",
  "reason":"Known Fraudster",
  "notes":"Multiple card testing attempts detected"
}

------------------------------------------------

POST /api/admin/fraud-risk/fraud-center/mark-safe/:id

Description:
Mark alert as safe.

------------------------------------------------

POST /api/admin/fraud-risk/fraud-center/block/:id

Description:
Block entity from review screen.

------------------------------------------------

GET /api/admin/fraud-risk/fraud-center/stats

Description:
Get fraud statistics.

------------------------------------------------

GET /api/admin/fraud-risk/fraud-center/report

Description:
Download fraud report.

# Blocked Entities API

Base URL

/api/admin/fraud-risk/blocked-entities

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Fraud Analyst

------------------------------------------------

GET /api/admin/fraud-risk/blocked-entities

Description:
Get blocked entities dashboard.

------------------------------------------------

GET /api/admin/fraud-risk/blocked-entities/list

Description:
Get blocklist records.

------------------------------------------------

GET /api/admin/fraud-risk/blocked-entities/:id

Description:
Get entity details.

(Entity Details Modal)

------------------------------------------------

POST /api/admin/fraud-risk/blocked-entities

Description:
Create blocked entity.

(Block Entity Modal)

Request

{
  "entityType":"IP Address",
  "entityValue":"185.220.101.24",
  "reason":"Card Testing",
  "severity":"Critical"
}

------------------------------------------------

PUT /api/admin/fraud-risk/blocked-entities/:id

Description:
Update entity policy.

(Edit Policy Button)

------------------------------------------------

PATCH /api/admin/fraud-risk/blocked-entities/:id/unblock

Description:
Unblock entity.

------------------------------------------------

DELETE /api/admin/fraud-risk/blocked-entities/:id

Description:
Soft delete block record.

------------------------------------------------

GET /api/admin/fraud-risk/blocked-entities/report

Description:
Generate blocked entities report.

# Case Management API

Base URL

/api/admin/fraud-risk/case-management

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Compliance Officer
- Fraud Analyst

------------------------------------------------

GET /api/admin/fraud-risk/case-management

Description:
Get case dashboard.

------------------------------------------------

GET /api/admin/fraud-risk/case-management/cases

Description:
Get all investigation cases.

------------------------------------------------

GET /api/admin/fraud-risk/case-management/cases/:id

Description:
Get case details.

(View Case Details Modal)

------------------------------------------------

POST /api/admin/fraud-risk/case-management/cases

Description:
Create new case.

(Open New Case Modal)

Request

{
  "entityName":"Global Trade Inc",
  "caseType":"AML Investigation",
  "assignedTo":"Sarah K.",
  "priority":"Critical",
  "description":"Suspicious AML activity detected"
}

------------------------------------------------

POST /api/admin/fraud-risk/case-management/cases/:id/notes

Description:
Add investigation note.

Request

{
  "note":"Initial review completed."
}

------------------------------------------------

PATCH /api/admin/fraud-risk/case-management/cases/:id/resolve

Description:
Mark case as resolved.

------------------------------------------------

PATCH /api/admin/fraud-risk/case-management/cases/:id/escalate

Description:
Escalate investigation case.

------------------------------------------------

GET /api/admin/fraud-risk/case-management/stats

Description:
Get dashboard statistics.

------------------------------------------------

GET /api/admin/fraud-risk/case-management/export

Description:
Export investigation cases.


# Fee Management API

Base URL

/api/admin/fee-management

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/fee-management

Description:
Get fee management dashboard.

------------------------------------------------

GET /api/admin/fee-management/gateway-fees

Description:
Get gateway fee configuration.

------------------------------------------------

PUT /api/admin/fee-management/gateway-fees

Description:
Update gateway fees.

Request

{
  "basePlatformFee":0.5,
  "fixedTransactionFee":0.30,
  "whiteLabelMarkup":1.0
}

------------------------------------------------

GET /api/admin/fee-management/processor-fees

Description:
Get processor fees.

------------------------------------------------

PUT /api/admin/fee-management/processor-fees

Description:
Update processor fees.

Request

{
  "processor":"MoonPay",
  "feePercentage":4.5
}

------------------------------------------------

POST /api/admin/fee-management/rules

Description:
Create fee rule.

(Create Rule Modal)

Request

{
  "ruleName":"VIP Merchant Discount",
  "merchantScope":"All Merchants",
  "feePercentage":0.5,
  "fixedFee":0.30
}

------------------------------------------------

PUT /api/admin/fee-management/rules/:id

Description:
Update fee rule.

------------------------------------------------

DELETE /api/admin/fee-management/rules/:id

Description:
Disable fee rule.

------------------------------------------------

GET /api/admin/fee-management/audit

Description:
Get fee configuration audit logs.

# Subscription Management API

Base URL

/api/admin/subscriptions

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/subscriptions

Description:
Get subscription plans dashboard.

------------------------------------------------

GET /api/admin/subscriptions/plans

Description:
Get all plans.

------------------------------------------------

GET /api/admin/subscriptions/plans/:id

Description:
Get plan details.

------------------------------------------------

POST /api/admin/subscriptions/plans

Description:
Create New Plan.

(Create New Plan Modal)

Request

{
  "planName":"Business",
  "themeColor":"#9333EA",
  "monthlyPrice":999,
  "billingCycle":"Monthly",
  "transactionFee":7,
  "features":[
      "Advanced Reporting",
      "Webhooks",
      "Priority Support"
  ]
}

------------------------------------------------

PUT /api/admin/subscriptions/plans/:id

Description:
Edit Plan.

(Edit Plan Action)

------------------------------------------------

DELETE /api/admin/subscriptions/plans/:id

Description:
Delete Plan.

(Delete Action)

------------------------------------------------

PATCH /api/admin/subscriptions/plans/:id/status

Description:
Enable or Disable Plan.

------------------------------------------------

GET /api/admin/subscriptions/analytics

Description:
Get subscription analytics.

------------------------------------------------

GET /api/admin/subscriptions/audit

Description:
Get subscription audit logs.

# Countries Management API

Base URL

/api/admin/countries

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/countries

Description:
Get countries dashboard.

------------------------------------------------

GET /api/admin/countries/list

Description:
Get all countries.

------------------------------------------------

POST /api/admin/countries

Description:
Add Region / Country.

(Add New Region Modal)

Request

{
  "countryName":"Canada",
  "countryCode":"CA",
  "status":"Active",
  "region":"North America"
}

------------------------------------------------

GET /api/admin/countries/:id

Description:
Get country details.

------------------------------------------------

PUT /api/admin/countries/:id

Description:
Edit Region.

(Edit Region Modal)

------------------------------------------------

DELETE /api/admin/countries/:id

Description:
Delete Country/Region.

(Delete Action)

------------------------------------------------

GET /api/admin/countries/search

Description:
Search countries.

Query Params

countryName
countryCode
region

------------------------------------------------

PATCH /api/admin/countries/:id/status

Description:
Update country status.

------------------------------------------------

GET /api/admin/countries/report

Description:
Generate countries report.


# Currencies & FX API

Base URL

/api/admin/currencies

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/currencies

Description:
Get currencies dashboard.

------------------------------------------------

GET /api/admin/currencies/assets

Description:
Get all assets.

------------------------------------------------

POST /api/admin/currencies/assets

Description:
Add New Asset.

(Add Asset Modal)

Request

{
  "assetCode":"SOL",
  "assetName":"Solana",
  "assetType":"Crypto",
  "exchangeRateUSD":150.00,
  "conversionFee":0.5
}

------------------------------------------------

PUT /api/admin/currencies/assets/:id

Description:
Update asset.

------------------------------------------------

DELETE /api/admin/currencies/assets/:id

Description:
Disable asset.

------------------------------------------------

POST /api/admin/currencies/sync-rates

Description:
Sync latest exchange rates.

------------------------------------------------

GET /api/admin/currencies/rates-history

Description:
Get FX history.

------------------------------------------------

GET /api/admin/currencies/report

Description:
Generate currency report.


# API Management API

Base URL

/api/admin/api-management

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/api-management/dashboard

Description:
Get API dashboard data.

------------------------------------------------

GET /api/admin/api-management/keys

Description:
Get all API keys.

------------------------------------------------

POST /api/admin/api-management/keys

Description:
Generate New API Key.

(Generate API Key Modal)

Request

{
  "keyName":"Mobile App Gateway",
  "environment":"Sandbox"
}

Response

{
  "keyId":"KEY-9921",
  "token":"pk_test_xxxxxxxxxxxx"
}

------------------------------------------------

GET /api/admin/api-management/keys/:id

Description:
Get key details.

------------------------------------------------

DELETE /api/admin/api-management/keys/:id

Description:
Revoke API key.

------------------------------------------------

POST /api/admin/api-management/keys/:id/rotate

Description:
Rotate API key.

------------------------------------------------

GET /api/admin/api-management/usage

Description:
Get API usage analytics.

------------------------------------------------

GET /api/admin/api-management/audit-logs

Description:
Get API management audit logs.

# Global Webhooks API

Base URL

/api/admin/webhooks

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/webhooks/dashboard

Description:
Get webhooks dashboard data.

------------------------------------------------

GET /api/admin/webhooks

Description:
Get all webhook endpoints.

------------------------------------------------

POST /api/admin/webhooks

Description:
Add Endpoint.

(Add Webhook Endpoint Modal)

Request

{
  "endpointUrl":"https://your-domain.com/webhook",
  "eventType":"merchant.created",
  "secretKey":"optional-secret"
}

------------------------------------------------

GET /api/admin/webhooks/:id

Description:
Get endpoint details.

------------------------------------------------

PUT /api/admin/webhooks/:id

Description:
Update endpoint.

------------------------------------------------

DELETE /api/admin/webhooks/:id

Description:
Disable endpoint.

------------------------------------------------

POST /api/admin/webhooks/:id/retry

Description:
Retry failed delivery.

------------------------------------------------

GET /api/admin/webhooks/deliveries

Description:
Get webhook delivery logs.

------------------------------------------------

GET /api/admin/webhooks/reports

Description:
Generate webhook reports.

# Reports API

Base URL

/api/admin/reports

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/reports/dashboard

Description:
Get reports dashboard.

------------------------------------------------

GET /api/admin/reports

Description:
Get generated reports.

------------------------------------------------

POST /api/admin/reports/generate

Description:
Generate New Report.

(Generate New Report Modal)

Request

{
  "reportType":"Gateway P&L",
  "dateRange":"Last 7 Days"
}

------------------------------------------------

GET /api/admin/reports/:id

Description:
Get report details.

------------------------------------------------

GET /api/admin/reports/:id/download

Description:
Download PDF Report.

------------------------------------------------

DELETE /api/admin/reports/:id

Description:
Delete report.

------------------------------------------------

GET /api/admin/reports/analytics

Description:
Get reporting analytics.

------------------------------------------------

GET /api/admin/reports/audit-logs

Description:
Get report audit logs.

# White Label API

Base URL

/api/admin/white-label

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/white-label

Description:
Get white-label dashboard.

------------------------------------------------

GET /api/admin/white-label/requests

Description:
Get all white-label requests.

------------------------------------------------

GET /api/admin/white-label/:id

Description:
Get request details.

------------------------------------------------

POST /api/admin/white-label/:id/approve

Description:
Approve domain request.

------------------------------------------------

POST /api/admin/white-label/:id/reject

Description:
Reject request.

Request

{
   "reason":"Domain verification failed"
}

------------------------------------------------

POST /api/admin/white-label/:id/provision-ssl

Description:
Provision SSL certificate.

------------------------------------------------

GET /api/admin/white-label/ssl-status

Description:
Get SSL status.

------------------------------------------------

GET /api/admin/white-label/audit-logs

Description:
Get audit history.


# Notifications API

Base URL

/api/admin/notifications

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/notifications

Description:
Get notification dashboard.

------------------------------------------------

GET /api/admin/notifications/history

Description:
Get broadcast history.

------------------------------------------------

POST /api/admin/notifications/broadcast

Description:
Create New Broadcast.

(Create New Broadcast Modal)

Request

{
  "title":"Scheduled Maintenance",
  "message":"Platform maintenance will occur tomorrow.",
  "category":"System",
  "targetAudience":"All Merchants"
}

------------------------------------------------

GET /api/admin/notifications/:id

Description:
Get broadcast details.

------------------------------------------------

POST /api/admin/notifications/:id/send

Description:
Send Broadcast.

------------------------------------------------

DELETE /api/admin/notifications/:id

Description:
Archive Broadcast.

------------------------------------------------

GET /api/admin/notifications/deliveries

Description:
Get delivery logs.

------------------------------------------------

GET /api/admin/notifications/audit-logs

Description:
Get audit logs.

# Support API

Base URL

/api/admin/support

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner
- Support Team

------------------------------------------------

GET /api/admin/support/dashboard

Description:
Get support dashboard data.

------------------------------------------------

GET /api/admin/support/tickets

Description:
Get all support tickets.

------------------------------------------------

GET /api/admin/support/tickets/:id

Description:
Get ticket details.

------------------------------------------------

POST /api/admin/support/tickets

Description:
Create support ticket.

------------------------------------------------

PUT /api/admin/support/tickets/:id

Description:
Update ticket information.

------------------------------------------------

PATCH /api/admin/support/tickets/:id/status

Description:
Update ticket status.

Request

{
  "status":"In Progress"
}

------------------------------------------------

PATCH /api/admin/support/tickets/:id/assign

Description:
Assign support agent.

Request

{
  "assignedTo":"agentId"
}

------------------------------------------------

POST /api/admin/support/tickets/:id/reply

Description:
Add ticket reply.

------------------------------------------------

POST /api/admin/support/tickets/:id/escalate

Description:
Escalate ticket.

------------------------------------------------

GET /api/admin/support/reports

Description:
Generate support reports.

# Audit Logs API

Base URL

/api/admin/audit-logs

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/audit-logs

Description:
Get audit log dashboard.

------------------------------------------------

GET /api/admin/audit-logs/list

Description:
Get audit logs.

------------------------------------------------

GET /api/admin/audit-logs/:id

Description:
Get audit log details.

------------------------------------------------

GET /api/admin/audit-logs/search

Description:
Search audit logs.

Query Params

actionType
administrator
ipAddress
dateFrom
dateTo

------------------------------------------------

GET /api/admin/audit-logs/security

Description:
Get security events.

------------------------------------------------

POST /api/admin/audit-logs/export

Description:
Export audit logs.

Request

{
  "format":"csv",
  "dateFrom":"2026-01-01",
  "dateTo":"2026-01-31"
}

------------------------------------------------

GET /api/admin/audit-logs/reports

Description:
Generate audit reports.


# Roles API Configuration

Base URL

/api/admin/roles

Authentication

Bearer JWT Required

Permissions

Super Admin Only

------------------------------------------------

GET /api/admin/roles

Description:
Get all roles.

------------------------------------------------

GET /api/admin/roles/:id

Description:
Get role details.

------------------------------------------------

POST /api/admin/roles

Description:
Create new role.

Request

{
  "roleName":"Risk Analyst",
  "description":"Fraud + Disputes Only",
  "riskProfile":"Low Risk"
}

------------------------------------------------

PUT /api/admin/roles/:id

Description:
Update role.

------------------------------------------------

DELETE /api/admin/roles/:id

Description:
Delete role.

------------------------------------------------

POST /api/admin/roles/assign

Description:
Assign role to user.

------------------------------------------------

GET /api/admin/roles/users

Description:
Get role assignments.

------------------------------------------------

GET /api/admin/roles/permissions

Description:
Get permissions matrix.

# Settings API Configuration

Base URL

/api/admin/settings

Authentication

Bearer JWT Required

Permissions

- Super Admin
- Owner

------------------------------------------------

GET /api/admin/settings

Description:
Get platform settings.

------------------------------------------------

PUT /api/admin/settings

Description:
Update platform settings.

Request

{
  "maintenanceMode": false,
  "sandboxEnvironment": true,
  "force2FA": true,
  "strictIPWhitelisting": false
}

------------------------------------------------

GET /api/admin/settings/security

Description:
Get security settings.

------------------------------------------------

PUT /api/admin/settings/security

Description:
Update security policies.

------------------------------------------------

POST /api/admin/settings/maintenance

Description:
Enable or disable maintenance mode.

------------------------------------------------

GET /api/admin/settings/audit

Description:
Get settings change history.

GET /dashboard

GET /dashboard/stats

GET /dashboard/revenue

GET /dashboard/activity

GET /dashboard/chart
Transactions
GET

POST

PUT

DELETE

Export

Import

Retry

Refund

Chargeback
# Transactions Module API Architecture

Version: 1.0

---

# Overview

The Transactions API manages transaction creation, retrieval, searching, filtering, exports, refunds, settlements, and transaction details.

Base URL

/api/v1/transactions

Authentication

Bearer JWT Token

Content-Type: application/json

---

# API Flow

Client
   ↓
API Gateway
   ↓
Authentication
   ↓
Authorization (RBAC)
   ↓
Validation
   ↓
Transaction Service
   ↓
Database
   ↓
Response

---

# API Endpoints

## Get Transactions

GET /transactions

Description

Returns paginated transaction list.

Query Params

page
limit
status
paymentMethod
merchantId
customer
currency
fromDate
toDate
search
sortBy
sortOrder

Response

200 OK

{
  "success": true,
  "data": [],
  "pagination": {}
}

---

## Get Transaction Details

GET /transactions/{transactionId}

Returns complete transaction information.

Includes

- Customer
- Merchant
- Payment Details
- Timeline
- Settlement
- Refund
- Audit Logs

---

## Create Transaction

POST /transactions

Request

{
  "merchantId": "",
  "amount": 100,
  "currency": "USD",
  "paymentMethod": "CARD",
  "customer": {}
}

Validation

✔ Merchant Active

✔ Amount > 0

✔ Currency Valid

✔ Payment Method Supported

Response

201 Created

---

## Update Transaction

PATCH /transactions/{transactionId}

Admin Only

Allowed Fields

status

remarks

metadata

---

## Delete Transaction

DELETE /transactions/{transactionId}

Soft Delete Only

Admin Permission Required

---

# Search API

GET /transactions/search

Search By

Transaction ID

Reference

Customer

Merchant

Email

Amount

Invoice

Supports partial search.

---

# Export API

GET /transactions/export

Formats

CSV

Excel

PDF

Supports all filters.

Large exports run as background jobs.

---

# Refund API

POST /transactions/{id}/refund

Validation

Transaction must be Completed.

Refund amount ≤ Original amount.

Response

Refund ID

Refund Status

---

# Retry Payment

POST /transactions/{id}/retry

Only Failed transactions.

Admin only.

---

# Retry Webhook

POST /transactions/{id}/retry-webhook

Resends payment webhook.

Logs every retry.

---

# Settlement API

GET /transactions/{id}/settlement

Returns

Settlement ID

Amount

Fees

Net Amount

Status

Settlement Date

---

# Audit Logs

GET /transactions/{id}/logs

Returns complete activity history.

---

# Response Format

Success

{
  "success": true,
  "message": "Success",
  "data": {}
}

Error

{
  "success": false,
  "message": "Validation Failed",
  "errors": []
}

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Pagination

Default Limit : 20

Maximum Limit : 100

Response

{
 "page":1,
 "limit":20,
 "total":245,
 "totalPages":13
}

---

# Security

JWT Authentication

RBAC Authorization

Rate Limiting

Request Validation

Input Sanitization

Encrypted Sensitive Data

---

# API Integrations

Payment Gateway Service

Wallet Service

Settlement Service

Webhook Service

Notification Service

Reporting Service

Audit Service

---

# Best Practices

- Use RESTful endpoints.
- Return consistent response structure.
- Validate every request.
- Never expose sensitive gateway data.
- Log every critical API request.
- Keep APIs versioned (`/api/v1`).
- Support future API versions without breaking existing clients.

---

End of API Architecture
# Deposits Module API Architecture

Version: 1.0

Base URL

/api/v1/deposits

Authentication

Bearer JWT Token

Content-Type: application/json

---

# API Flow

Client
   │
   ▼
API Gateway
   │
JWT Authentication
   │
Permission Check
   │
Validation
   │
Controller
   │
Service
   │
Repository
   │
Database
   │
Response

---

# API Endpoints

## Get Deposit List

GET /deposits

Description

Returns paginated deposit history.

Query Params

page

limit

status

asset

network

search

fromDate

toDate

sortBy

sortOrder

---

## Deposit Details

GET /deposits/:depositId

Returns

- Deposit Information
- Merchant Details
- Wallet Address
- Asset
- Network
- Transaction Hash
- Confirmation Status
- Timeline

---

## Generate Deposit Address

POST /deposits/address

Request

{
   "asset":"USDT",
   "network":"TRC20"
}

Response

{
   "walletAddress":"",
   "qrCode":"",
   "asset":"USDT",
   "network":"TRC20"
}

---

## Wallet Address

GET /deposits/address

Returns active wallet address.

---

## Search Deposit

GET /deposits/search

Search By

- Deposit ID
- Wallet Address
- Transaction Hash
- Asset

---

## Export Deposits

GET /deposits/export

Formats

- CSV
- Excel
- PDF

Supports all filters.

---

## Webhook

POST /deposits/webhook

Called by blockchain listener.

Updates

- Confirmation
- Amount
- Status

---

## Dashboard Summary

GET /deposits/dashboard

Returns

- Total Deposits
- Confirmed
- Pending
- Failed
- Total Amount

---

# Response Format

Success

{
 "success":true,
 "message":"Success",
 "data":{}
}

Error

{
 "success":false,
 "message":"Validation Failed",
 "errors":[]
}

---

# HTTP Status

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Server Error

---

# Security

JWT Authentication

Role Validation

Request Validation

Rate Limiting

Audit Logging

---

# Integrations

Wallet Service

Blockchain Listener

Notification Service

Merchant Wallet

Audit Service

---

# Best Practices

- Versioned APIs
- REST Standards
- Consistent Response
- UUID Based IDs
- Validation on Every Request
- Never expose private wallet keys

---

End of API Architecture
# Withdrawals Module API Architecture

Version: 1.0

Base URL

/api/v1/withdrawals

Authentication

Bearer JWT Token

Content-Type: application/json

---

# API Flow

Client
   │
   ▼
API Gateway
   │
JWT Authentication
   │
Permission Check
   │
Request Validation
   │
Controller
   │
Service
   │
Repository
   │
Database
   │
Wallet / Bank / Blockchain
   │
Response

---

# API Endpoints

## Get Withdrawals

GET /withdrawals

Description

Returns paginated withdrawal history.

Query Params

page

limit

status

method

asset

network

search

fromDate

toDate

sortBy

sortOrder

---

## Get Withdrawal Details

GET /withdrawals/:withdrawalId

Returns

- Withdrawal Details
- Merchant Information
- Wallet / Bank Details
- Fee Details
- Transaction Hash / UTR
- Timeline
- Audit Logs

---

## Request Withdrawal

POST /withdrawals

Description

Create a new payout request.

Request

{
  "method":"CRYPTO",
  "asset":"USDT",
  "network":"TRC20",
  "destination":"TQxxxxxxx",
  "amount":500
}

Validation

- JWT Valid
- Merchant Active
- KYC Verified
- Balance Available
- Destination Valid

Response

201 Created

{
  "withdrawalId":"WD-7821",
  "status":"Pending"
}

---

## Calculate Fees

POST /withdrawals/calculate-fee

Returns

- Platform Fee
- Network Fee
- Total Deduction
- Net Amount

---

## Verify OTP

POST /withdrawals/verify-otp

Required before processing payout (if enabled).

---

## Cancel Withdrawal

POST /withdrawals/:id/cancel

Allowed only when status is Pending.

---

## Retry Withdrawal

POST /withdrawals/:id/retry

Admin Only

Only Failed withdrawals can be retried.

---

## Export Withdrawals

GET /withdrawals/export

Formats

- CSV
- Excel
- PDF

Supports search & filters.

---

## Dashboard Summary

GET /withdrawals/dashboard

Returns

- Total Withdrawals
- Pending
- Processing
- Completed
- Failed
- Total Fees

---

# Response Format

Success

{
 "success": true,
 "message": "Success",
 "data": {}
}

Error

{
 "success": false,
 "message": "Validation Failed",
 "errors": []
}

---

# HTTP Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Security

- JWT Authentication
- OTP / 2FA
- Rate Limiting
- Input Validation
- Audit Logging

---

# External Integrations

- Wallet Service
- Banking API
- Blockchain Service
- Notification Service
- Audit Service
- KYC/AML Service

---

# Best Practices

- Use UUID internally.
- Keep APIs versioned.
- Never expose private keys.
- Validate every request.
- Return consistent JSON responses.

---

End of API Architecture
# Wallet Management API Architecture

Version: 1.0

Base URL

/api/v1/wallets

Authentication

Bearer JWT

---

# API Flow

Client

↓

API Gateway

↓

Authentication

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Response

---

# API Endpoints

## Get Wallets

GET /wallets

Returns all merchant wallets.

Supports

- Pagination
- Search
- Sorting

---

## Get Wallet

GET /wallets/:walletId

Returns

- Wallet Details
- Balance
- Asset
- Network
- Deposit Address
- Portfolio Value

---

## Add Asset

POST /wallets

Request

{
 "asset":"BNB"
}

Validation

- Supported Asset
- Not Already Added

Response

201 Created

---

## Wallet Balance

GET /wallets/balance

Returns

- Total Portfolio
- Available Balance
- Locked Balance

---

## Portfolio Summary

GET /wallets/portfolio

Returns

- Portfolio Value
- Asset Allocation
- Today's P/L
- Asset Distribution

---

## Wallet Address

GET /wallets/:id/address

Returns deposit address.

---

## Export Wallets

GET /wallets/export

Formats

- CSV
- Excel
- PDF

---

# Response Format

Success

{
 "success":true,
 "data":{}
}

Error

{
 "success":false,
 "message":"Validation Failed"
}

---

# HTTP Status

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

422 Validation Error

500 Server Error

---

# Security

- JWT Authentication
- RBAC
- Rate Limiting
- Request Validation

---

# Integrations

- Wallet Service
- Price Service
- Deposit Module
- Withdrawal Module
- Audit Service

---

# Best Practices

- REST APIs
- UUID IDs
- Versioned APIs
- Secure Responses

---

End of API Architecture
# Settlement Center API Architecture

Version: 1.0

Base URL

/api/v1/settlements

Authentication

Bearer JWT Token

Content-Type: application/json

---

# API Flow

Client
   │
   ▼
API Gateway
   │
JWT Authentication
   │
Permission Validation
   │
Request Validation
   │
Controller
   │
Service
   │
Repository
   │
Database
   │
Wallet / Bank / Blockchain
   │
Response

---

# API Endpoints

## Get Settlements

GET /settlements

Returns paginated settlement history.

Supports

- Pagination
- Search
- Filters
- Sorting

---

## Get Settlement Details

GET /settlements/:settlementId

Returns

- Settlement Details
- Destination
- Fees
- Status
- Timeline
- Reference Number

---

## Link Bank Account

POST /settlements/bank

Request

{
  "bankName":"JPMorgan Chase",
  "accountNumber":"4912",
  "routingNumber":"123456789"
}

---

## Link Crypto Wallet

POST /settlements/wallet

Request

{
  "asset":"USDC",
  "network":"Polygon",
  "walletAddress":"0x71C..."
}

---

## Set Primary Account

PATCH /settlements/account/:id/primary

Sets selected account as default payout destination.

---

## Request Early Payout

POST /settlements/early-payout

Request

{
  "amount":12450,
  "destinationId":"UUID"
}

Validation

- Eligible Amount
- Available Balance
- Destination Verified

---

## Export Settlements

GET /settlements/export

Formats

- CSV
- Excel
- PDF

---

## Settlement Dashboard

GET /settlements/dashboard

Returns

- Upcoming Settlements
- Pending
- Completed
- Failed
- Early Payout Summary

---

# Response Format

Success

{
 "success": true,
 "data": {}
}

Error

{
 "success": false,
 "message": "Validation Failed"
}

---

# HTTP Status

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

422 Validation Error

500 Internal Server Error

---

# Security

- JWT Authentication
- RBAC
- Request Validation
- Rate Limiting
- Audit Logging

---

# External Integrations

- Wallet Service
- Banking API
- Blockchain Service
- Notification Service
- Audit Service

---

# Best Practices

- RESTful APIs
- UUID Primary Keys
- Versioned APIs
- Consistent JSON Responses
- Secure Sensitive Data

---

End of API Architecture
# Customers Module API Architecture

Version: 1.0

Base URL

/api/v1/customers

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

API Gateway

↓

JWT Authentication

↓

Permission Validation

↓

Request Validation

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Response

---

# API Endpoints

## Get Customers

GET /customers

Supports

- Pagination
- Search
- Filters
- Sorting

---

## Customer Details

GET /customers/:customerId

Returns

- Profile
- Transactions
- Lifetime Value
- Risk
- Joined Date

---

## Create Customer

POST /customers

Request

{
  "name":"David Lee",
  "email":"user@example.com",
  "joinedDate":"2026-06-30",
  "risk":"LOW"
}

Validation

- Unique Email
- Required Fields

---

## Update Customer

PUT /customers/:customerId

Updates

- Name
- Email
- Risk Profile

---

## Delete Customer

DELETE /customers/:customerId

Soft Delete

---

## Export Customers

GET /customers/export

Formats

- CSV
- Excel
- PDF

---

## Customer Dashboard

GET /customers/dashboard

Returns

- Total Customers
- Active Customers
- High Risk Customers
- Total LTV

---

# Response Format

Success

{
 "success": true,
 "data": {}
}

Error

{
 "success": false,
 "message":"Validation Failed"
}

---

# HTTP Status

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

422 Validation Error

500 Internal Server Error

---

# Security

- JWT Authentication
- RBAC
- Request Validation
- Audit Logging

---

# Best Practices

- UUID Primary Keys
- REST APIs
- Versioned APIs
- Standard JSON Responses

---

End of API Architecture
# Revenue Module API Architecture

Version: 1.0

Base URL

/api/v1/revenue

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

JWT Authentication

↓

Validation

↓

Controller

↓

Revenue Service

↓

Repository

↓

Database

↓

Response

---

# API Endpoints

## Revenue Dashboard

GET /revenue/dashboard

Returns

- Gross Revenue
- Net Revenue
- Total Fees
- Monthly Revenue

---

## Revenue Breakdown

GET /revenue/breakdown

Returns

- Gross Revenue
- Gateway Fees
- Network Fees
- Net Revenue

---

## Revenue Analytics

GET /revenue/analytics

Returns

- Weekly Revenue
- Monthly Revenue
- Revenue Trend

---

## Download Statement

GET /revenue/export

Formats

- CSV
- Excel
- PDF

---

# Response

Success

{
 "success": true,
 "data": {}
}

---

# Status Codes

200

400

401

403

404

500

---

# Security

- JWT Authentication
- RBAC
- Validation
- Audit Logs

---

End of API Architecture
# Reports & Analytics API Architecture

Version: 1.0

Base URL

/api/v1/reports

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

JWT Authentication

↓

Validation

↓

Controller

↓

Analytics Service

↓

Repository

↓

Database

↓

Response

---

# API Endpoints

## Dashboard

GET /reports/dashboard

Returns

- KPIs
- Charts
- Summary

---

## Revenue Analytics

GET /reports/revenue

---

## Transaction Analytics

GET /reports/transactions

---

## Refund Analytics

GET /reports/refunds

---

## Chargeback Analytics

GET /reports/chargebacks

---

## Customer Analytics

GET /reports/customers

---

## Export Report

GET /reports/export

Formats

- PDF
- CSV
- Excel

---

# Response

Success

{
 "success": true,
 "data": {}
}

---

# Status Codes

200

400

401

403

404

500

---

# Security

- JWT Authentication
- RBAC
- Validation
- Audit Logs

---

End of API Architecture

# Reports & Analytics API Architecture

Version: 1.0

Base URL

/api/v1/reports

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

JWT Authentication

↓

Validation

↓

Controller

↓

Analytics Service

↓

Repository

↓

Database

↓

Response

---

# API Endpoints

## Dashboard

GET /reports/dashboard

Returns

- KPIs
- Charts
- Summary

---

## Revenue Analytics

GET /reports/revenue

---

## Transaction Analytics

GET /reports/transactions

---

## Refund Analytics

GET /reports/refunds

---

## Chargeback Analytics

GET /reports/chargebacks

---

## Customer Analytics

GET /reports/customers

---

## Export Report

GET /reports/export

Formats

- PDF
- CSV
- Excel

---

# Response

Success

{
 "success": true,
 "data": {}
}

---

# Status Codes

200

400

401

403

404

500

---

# Security

- JWT Authentication
- RBAC
- Validation
- Audit Logs

---

End of API Architecture




# API Keys Module API Architecture

Version: 1.0

Base URL

/api/v1/api-keys

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

JWT Authentication

↓

Permission Validation

↓

Controller

↓

API Key Service

↓

Repository

↓

Database

↓

Response

---

# API Endpoints

## Get API Keys

GET /api-keys

Returns

- Production Keys
- Sandbox Keys

---

## Generate API Key

POST /api-keys

Request

{
  "name":"Mobile App",
  "environment":"production"
}

Returns

- Public Key
- Secret Key (Only Once)

---

## Roll API Key

POST /api-keys/{id}/roll

Creates a new secret and invalidates the old one.

---

## Revoke API Key

POST /api-keys/{id}/revoke

Marks key as revoked.

---

## Delete API Key

DELETE /api-keys/{id}

Soft delete.

---

## API Key Usage

GET /api-keys/{id}/usage

Returns

- Last Used
- Request Count
- Status

---

# Response

Success

{
  "success": true,
  "data": {}
}

Error

{
  "success": false,
  "message": "Invalid API Key"
}

---

# Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

---

# Security

- JWT Authentication
- RBAC
- Secret Key Encryption
- Audit Logging

---

End of API Architecture
# Webhooks Module API Architecture

Version: 1.0

Base URL

/api/v1/webhooks

Authentication

Bearer JWT Token

---

# API Flow

Dashboard

↓

JWT Authentication

↓

Webhook Controller

↓

Webhook Service

↓

Database

↓

Response

---

# Create Endpoint

POST /webhooks/endpoints

Request

{
"url":"https://example.com/webhook",
"events":[
"payment.*"
]
}

---

# Get Endpoints

GET /webhooks/endpoints

Returns

- Endpoint URL
- Status
- Events
- Created Date

---

# Update Endpoint

PUT /webhooks/endpoints/:id

Updates

- URL
- Events
- Status

---

# Delete Endpoint

DELETE /webhooks/endpoints/:id

---

# Delivery Logs

GET /webhooks/logs

Returns

- Event ID
- Event Type
- Response
- Time

---

# Send Webhook Event

Internal API

POST /webhooks/deliver

Payload

{
"event":"payment.created",
"data":{}
}

---

# Webhook Payload

{
"id":"evt_83726",
"type":"payment.created",
"timestamp":"",
"data":{}
}

---

# Signature

Header

X-PGX-Signature

Generated using

HMAC SHA256

---

# Response

Success

{
"success":true
}

---

# Status Codes

200 OK

400 Bad Request

401 Unauthorized

404 Not Found

500 Server Error

---

# Security

- HTTPS Validation
- Signature Verification
- Rate Limiting
- Audit Logs

---

End of API Architecture
# White Label Studio API Architecture

Version: 1.0

Base URL

/api/v1/white-label

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

JWT Authentication

↓

Permission Check

↓

Controller

↓

White Label Service

↓

Repository

↓

Database

↓

Response

---

# Get Configuration

GET /white-label/config

Returns

- Domain
- Theme
- Checkout Settings
- Email Settings

---

# Save Configuration

PUT /white-label/config

Request

{
"logo":"",
"primaryColor":"",
"font":"Inter"
}

---

# Add Domain

POST /white-label/domain

Request

{
"domain":"pay.acme.com"
}

---

# Verify Domain

POST /white-label/domain/verify

Checks

- DNS Record
- Ownership

---

# SSL Status

GET /white-label/domain/ssl

Returns

- SSL Status
- Expiry Date

---

# Theme Update

PUT /white-label/theme

Updates

- Logo
- Color
- Font

---

# Checkout Settings

PUT /white-label/checkout

Updates

- Billing Address
- Phone
- KYC
- Fee Display

---

# Email Settings

PUT /white-label/email

Updates

- Sender Name
- Reply Email
- Footer

---

# Response

Success

{
"success":true,
"data":{}
}

---

# Status Codes

200 OK

201 Created

400 Validation Error

401 Unauthorized

403 Forbidden

404 Not Found

500 Server Error

---

# Security

- JWT
- RBAC
- Domain Verification
- Asset Validation
- Audit Logs

---

End of API Architecture
# Billing & Subscription API Architecture

Version: 1.0

Base URL

/api/v1/billing

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

Authentication

↓

Billing Controller

↓

Subscription Service

↓

Payment Service

↓

Database

↓

Response

---

# Get Current Plan

GET /billing/plan

Returns

- Plan Name
- Price
- Limits
- Features

---

# Get Plans

GET /billing/plans

Returns

Available Plans

---

# Upgrade Plan

POST /billing/upgrade

Request

{
"plan":"enterprise"
}

---

# Cancel Subscription

POST /billing/cancel

Disables renewal.

---

# Payment Methods

GET /billing/payment-methods

---

# Add Payment Method

POST /billing/payment-methods

Request

{
"card_token":"token"
}

---

# Remove Payment Method

DELETE /billing/payment-methods/:id

---

# Invoice List

GET /billing/invoices

Returns

- Invoice ID
- Date
- Amount
- Status

---

# Download Invoice

GET /billing/invoices/:id/download

---

# Usage API

GET /billing/usage

Returns

- API Calls
- Limits
- Remaining Usage

---

# Response

Success

{
"success":true,
"data":{}
}

---

# Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

500 Server Error

---

# Security

- JWT
- RBAC
- PCI Security
- Payment Encryption

---

End of API Architecture
# Team Members API Architecture

Version: 1.0

Base URL

/api/v1/team-members

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

Authentication

↓

Permission Check

↓

Team Controller

↓

Team Service

↓

Database

↓

Response

---

# Get Members

GET /team-members

Returns

- Users
- Roles
- Status

---

# Invite Member

POST /team-members/invite

Request

{
"email":"user@test.com",
"role":"admin"
}

---

# Update Member

PUT /team-members/:id

Updates

- Role
- Status
- Permissions

---

# Delete Member

DELETE /team-members/:id

---

# Resend Invitation

POST /team-members/:id/resend

---

# Change Role

PATCH /team-members/:id/role

Request

{
"role":"finance"
}

---

# Accept Invitation

POST /team-members/accept

---

# Response

Success

{
"success":true,
"data":{}
}

---

# Status Codes

200 OK

201 Created

400 Validation Error

401 Unauthorized

403 Forbidden

404 Not Found

500 Server Error

---

# Security

- JWT
- RBAC
- Permission Middleware
- Audit Logs

---

End of API Architecture
# Notifications API Architecture

Version: 1.0

Base URL

/api/v1/notifications

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

Authentication

↓

Notification Controller

↓

Notification Service

↓

Database

↓

Response

---

# Get Notifications

GET /notifications

Returns

- Notification List
- Read Status
- Timestamp

---

# Mark Read

PATCH /notifications/:id/read

Updates

status = read

---

# Mark All Read

PATCH /notifications/read-all

Updates all unread notifications.

---

# Delete Notification

DELETE /notifications/:id

---

# Notification Count

GET /notifications/unread-count

Returns

{
"count":5
}

---

# Create Internal Notification

POST /notifications/create

Used By System

Request

{
"title":"",
"message":"",
"type":"settlement"
}

---

# Response

Success

{
"success":true,
"data":[]
}

---

# Status Codes

200 OK

201 Created

400 Validation Error

401 Unauthorized

403 Forbidden

500 Server Error

---

# Security

- JWT
- RBAC
- Merchant Isolation
- Audit Logs

---

End of API Architecture
# Settings API Architecture

Version: 1.0

Base URL

/api/v1/settings

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

Authentication

↓

Settings Controller

↓

Settings Service

↓

Database

↓

Response

---

# Get Profile

GET /settings/profile

Returns

- Company Name
- Email
- Timezone

---

# Update Profile

PUT /settings/profile

Request

{
"companyName":"",
"timezone":"UTC"
}

---

# Change Password

PUT /settings/password

Request

{
"newPassword":"",
"confirmPassword":""
}

---

# Enable 2FA

POST /settings/2fa/enable

Creates security setup.

---

# Disable 2FA

POST /settings/2fa/disable

---

# Preferences

GET /settings/preferences

---

# Update Preferences

PUT /settings/preferences

---

# Response

Success

{
"success":true,
"data":{}
}

---

# Status Codes

200 OK

400 Validation Error

401 Unauthorized

403 Forbidden

500 Server Error

---

# Security

- JWT
- Password Hashing
- 2FA Verification
- Audit Logs

---

End of API Architecture
# Support Center API Architecture

Version: 1.0

Base URL

/api/v1/support

Authentication

Bearer JWT Token

---

# API Flow

Client

↓

Authentication

↓

Support Controller

↓

Ticket Service

↓

Database

↓

Response

---

# Get Tickets

GET /support/tickets

Returns

- Ticket ID
- Subject
- Status
- Updated Date

---

# Create Ticket

POST /support/tickets

Request

{
"subject":"",
"category":"technical",
"message":""
}

---

# Get Ticket Details

GET /support/tickets/:id

Returns

- Messages
- Status
- History

---

# Reply Ticket

POST /support/tickets/:id/reply

Request

{
"message":""
}

---

# Update Ticket

PATCH /support/tickets/:id

Updates

- Status
- Priority

---

# Documentation API

GET /support/docs

Returns

- Articles
- Guides
- FAQs

---

# Manager Details

GET /support/manager

Returns

- Name
- Email
- Availability

---

# Response

Success

{
"success":true,
"data":{}
}

---

# Status Codes

200 OK

201 Created

400 Validation Error

401 Unauthorized

403 Forbidden

404 Not Found

500 Server Error

---

# Security

- JWT
- RBAC
- Ticket Ownership Check
- Audit Logs

---

End of API Architecture

# Transaction API Configuration

Base URL

/api/transactions

Authentication

Bearer JWT Required

------------------------------------------------

GET /api/transactions

Description:
Get transaction history.

------------------------------------------------

GET /api/transactions/:id

Description:
Get transaction details.

------------------------------------------------

GET /api/transactions/search

Description:
Search transactions.

Query Params

?keyword=
?status=
?type=

------------------------------------------------

GET /api/transactions/export

Description:
Export CSV file.

------------------------------------------------

GET /api/transactions/stats

Description:
Get transaction summary.

------------------------------------------------

GET /api/transactions/hash/:hash

Description:
Lookup blockchain transaction.


# Notifications API Configuration

Base URL

/api/notifications

Authentication

Bearer JWT Required

------------------------------------------------

GET /api/notifications

Description:
Fetch user notifications.

------------------------------------------------

PUT /api/notifications/read/:id

Description:
Mark notification as read.

------------------------------------------------

PUT /api/notifications/read-all

Description:
Mark all notifications as read.

------------------------------------------------

DELETE /api/notifications/:id

Description:
Delete notification.

------------------------------------------------

GET /api/notifications/unread-count

Description:
Get unread count.

------------------------------------------------

GET /api/notifications/settings

Description:
Fetch notification settings.

------------------------------------------------

PUT /api/notifications/settings

Description:
Update notification settings.


# Profile API Configuration

Base URL

/api/profile

Authentication

Bearer JWT Required

------------------------------------------------

GET /api/profile

Description:
Get profile information.

------------------------------------------------

PUT /api/profile/update

Description:
Update profile.

Request

{
  "username":"CryptoKing",
  "bio":"Sports enthusiast and UFC fan"
}

------------------------------------------------

POST /api/profile/avatar

Description:
Upload avatar.

------------------------------------------------

POST /api/profile/cover

Description:
Upload cover image.

------------------------------------------------

GET /api/profile/stats

Description:
Get player statistics.

------------------------------------------------

GET /api/profile/channels

Description:
Get favorite channels.

------------------------------------------------

POST /api/profile/channels

Description:
Add favorite channel.

------------------------------------------------

DELETE /api/profile/channels/:id

Description:
Remove favorite channel.

------------------------------------------------

GET /api/profile/activity

Description:
Get recent activity feed.

------------------------------------------------

GET /api/profile/friends

Description:
Get active friends.





# Settings API Configuration

Base URL

/api/settings

Authentication

Bearer JWT Required

------------------------------------------------

GET /api/settings

Description:
Get user settings.

------------------------------------------------

PUT /api/settings/account

Description:
Update account information.

Request

{
  "username":"CryptoKing",
  "email":"crypto@example.com"
}

------------------------------------------------

PUT /api/settings/password

Description:
Update password.

Request

{
  "currentPassword":"*****",
  "newPassword":"*****",
  "confirmPassword":"*****"
}

------------------------------------------------

PUT /api/settings/privacy

Description:
Update privacy settings.

Request

{
  "privateProfile":true
}

------------------------------------------------

PUT /api/settings/security

Description:
Enable or disable 2FA.

------------------------------------------------

PUT /api/settings/notifications

Description:
Update notification preferences.

------------------------------------------------

GET /api/settings/connections

Description:
Get connected accounts.

------------------------------------------------

DELETE /api/settings/account

Description:
Delete user account.
# Support API Configuration

Base URL

/api/support

Authentication

Bearer JWT Required

------------------------------------------------

GET /api/support/faqs

Description:
Get all FAQ entries.

------------------------------------------------

GET /api/support/faqs/search?q=

Description:
Search FAQs.

------------------------------------------------

GET /api/support/docs

Description:
Get documentation articles.

------------------------------------------------

POST /api/support/chat/start

Description:
Start live chat session.

------------------------------------------------

POST /api/support/tickets

Description:
Create support ticket.

Request

{
  "subject":"Stream Lag Issue",
  "category":"Streaming",
  "description":"4K stream buffering frequently."
}

------------------------------------------------

GET /api/support/tickets

Description:
Get user tickets.

------------------------------------------------

GET /api/support/tickets/:id

Description:
Get ticket details.

------------------------------------------------

POST /api/support/email

Description:
Send support email request.
