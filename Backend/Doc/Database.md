# Database

# Dashboard Database Design

## Collection
dashboard_metrics

### Fields

| Field | Type |
|---------|---------|
| totalGatewayRevenue | Number |
| todayVolume | Number |
| activeMerchants | Number |
| failedTransactionRate | Number |
| systemStatus | String |
| lastUpdated | Date |

### Revenue Growth

[
 {
   month: String,
   value: Number
 }
]

### Processor Distribution

[
 {
   processorName: String,
   percentage: Number
 }
]

## Example Record

{
  totalGatewayRevenue: 12500000,
  todayVolume: 452000,
  activeMerchants: 1204,
  failedTransactionRate: 0.8,
  systemStatus: "Operational"
}

# Merchants Database Design

## Collection Name

merchants

## Fields

| Field | Type |
|---------|---------|
| merchantId | String |
| companyName | String |
| email | String |
| phone | String |
| subscriptionPlan | String |
| revenue | Number |
| status | String |
| country | String |
| website | String |
| apiKey | String |
| createdAt | Date |
| updatedAt | Date |

## Status Values

- Active
- Suspended
- Pending
- Disabled

## Subscription Values

- Starter
- Business
- Enterprise

## Example Document

{
  merchantId: "MER-1092",
  companyName: "Acme Corp",
  subscriptionPlan: "Enterprise",
  revenue: 1200000,
  status: "Active",
  country: "US",
  createdAt: "2023-10-12"
}

## Indexes

merchantId
companyName
status
country
subscriptionPlan

# Transactions Database Design

## Collection Name

transactions

## Fields

| Field | Type |
|---------|---------|
| transactionId | String |
| merchantId | ObjectId |
| merchantName | String |
| customerName | String |
| customerEmail | String |
| amount | Number |
| currency | String |
| processor | String |
| gatewayFee | Number |
| transactionHash | String |
| walletAddress | String |
| status | String |
| paymentMethod | String |
| createdAt | Date |
| updatedAt | Date |

## Status Values

- Pending
- Completed
- Failed
- Refunded
- Cancelled

## Processor Values

- MoonPay
- Banxa
- Ramp
- Transak

## Example Document

{
  transactionId: "G-TX-89023",
  merchantName: "Global Tech",
  customerName: "Mike B.",
  amount: 3029.57,
  currency: "BTC",
  processor: "Ramp",
  gatewayFee: 1.31,
  status: "Completed"
}

## Indexes

transactionId
merchantId
processor
status
createdAt
walletAddress
transactionHash


# Revenue Database Design

## Collection Name

revenues

## Fields

| Field | Type |
|---------|---------|
| revenueId | String |
| processingVolume | Number |
| gatewayFeeRevenue | Number |
| subscriptionRevenue | Number |
| pendingSettlements | Number |
| totalRevenue | Number |
| month | String |
| year | Number |
| generatedAt | Date |

## Revenue Growth

[
 {
   month: String,
   revenue: Number
 }
]

## Revenue Sources

[
 {
   sourceName: String,
   percentage: Number,
   amount: Number
 }
]

## Example Document

{
  revenueId: "REV-1001",
  processingVolume: 14200000,
  gatewayFeeRevenue: 845000,
  subscriptionRevenue: 124000,
  pendingSettlements: 2100000,
  totalRevenue: 969000
}

## Indexes

revenueId
month
year
generatedAt


# Settlements Database Design

## Collection Name

settlements

## Fields

| Field | Type |
|---------|---------|
| settlementId | String |
| merchantId | ObjectId |
| merchantName | String |
| amount | Number |
| currency | String |
| settlementMethod | String |
| settlementType | String |
| status | String |
| transactionHash | String |
| bankReference | String |
| initiatedAt | Date |
| completedAt | Date |
| createdAt | Date |
| updatedAt | Date |

## Settlement Methods

- Wire Transfer
- ACH
- SEPA
- SWIFT
- On-Chain

## Status Values

- Pending
- Processing
- Completed
- Failed

## Example Document

{
  settlementId: "SET-991",
  merchantName: "Acme Corp",
  amount: 45200,
  currency: "USD",
  settlementMethod: "Wire Transfer",
  status: "Completed"
}

## Indexes

settlementId
merchantId
status
settlementMethod
createdAt

# Wallets Database Design

## Collection Name

wallets

## Fields

| Field | Type |
|---------|---------|
| walletId | String |
| walletName | String |
| walletAddress | String |
| walletType | String |
| network | String |
| balanceUSD | Number |
| balanceCrypto | Number |
| assetSymbol | String |
| status | String |
| lastTransactionAt | Date |
| createdAt | Date |
| updatedAt | Date |

## Wallet Types

- Cold
- Hot
- Treasury
- Reserve

## Status Values

- Active
- Frozen
- Maintenance

## Example Document

{
  walletId: "WAL-1001",
  walletName: "Gateway Cold Storage",
  walletAddress: "0x8f...29d",
  walletType: "Cold",
  network: "Ethereum",
  balanceUSD: 12400000,
  status: "Active"
}

## Indexes

walletId
walletAddress
walletType
network
status


# Payment Processors Dashboard Database

## Collection Name

processor_dashboard

## Fields

| Field | Type |
|---------|---------|
| dashboardId | String |
| total24hVolume | Number |
| activeNodes | Number |
| totalNodes | Number |
| approvalRate | Number |
| criticalAlerts | Number |
| generatedAt | Date |

## Processor Health

[
 {
   processorName: String,
   healthPercentage: Number,
   status: String
 }
]

## Active Nodes

[
 {
   nodeName: String,
   status: String,
   uptime: Number,
   latency: Number,
   successRate: Number
 }
]

## Status Values

- Operational
- Degraded
- Offline
- Maintenance

## Example

{
  total24hVolume: 12400000,
  activeNodes: 45,
  totalNodes: 45,
  approvalRate: 94.2,
  criticalAlerts: 0
}

## Indexes

generatedAt
processorName
nodeName
status


# Failover Monitor Database

## Collection Name

processor_monitors

| Field | Type |
|---------|---------|
| monitorId | String |
| processorName | String |
| status | String |
| pingMs | Number |
| loadPercentage | Number |
| successRate | Number |
| lastCheckedAt | Date |
| createdAt | Date |

--------------------------------------------------

## Collection Name

failover_events

| Field | Type |
|---------|---------|
| eventId | String |
| sourceProcessor | String |
| targetProcessor | String |
| triggerReason | String |
| status | String |
| failoverAt | Date |
| recoveredAt | Date |

--------------------------------------------------

## Collection Name

failover_triggers

| Field | Type |
|---------|---------|
| triggerId | String |
| triggerName | String |
| enabled | Boolean |
| threshold | String |
| createdAt | Date |

--------------------------------------------------

## Collection Name

alert_settings

| Field | Type |
|---------|---------|
| email | String |
| failoverAlert | Boolean |
| degradeAlert | Boolean |
| recoveryAlert | Boolean |
| dailyDigest | Boolean |

--------------------------------------------------

Status Values

- Healthy
- Degraded
- Offline
- Maintenance

--------------------------------------------------

Trigger Types

- High Latency
- HTTP 5xx Errors
- Success Rate Drop
- Timeout
- Node Failure

# Fee Split Engine Database

## Collection Name

fee_configurations

| Field | Type |
|---------|---------|
| configId | String |
| merchantShare | Number |
| gatewayRevenue | Number |
| processorFee | Number |
| networkFee | Number |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection Name

markup_rules

| Field | Type |
|---------|---------|
| ruleId | String |
| transactionType | String |
| processorBase | Number |
| gatewayMarkup | Number |
| totalFee | Number |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

Status Values

- Active
- Disabled

------------------------------------------------

Example Rule

{
  ruleId: "RULE-1001",
  transactionType: "Crypto Transactions",
  processorBase: 1.9,
  gatewayMarkup: 1.5,
  totalFee: 3.4,
  status: "Active"
}

------------------------------------------------

Indexes

ruleId
transactionType
status
createdAt

# Geo Routing Database

## Collection Name

geo_routing_rules

| Field | Type |
|---------|---------|
| ruleId | String |
| regionName | String |
| countries | Array |
| processorId | ObjectId |
| processorName | String |
| priority | Number |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

Countries Example

[
  "US",
  "CA",
  "MX"
]

------------------------------------------------

Priority Values

1 = Primary

2 = Secondary

3 = Fallback

------------------------------------------------

Status Values

- Active
- Draft
- Disabled

------------------------------------------------

Example

{
  "ruleId":"GR-1001",
  "regionName":"North America",
  "countries":["US","CA","MX"],
  "processorName":"Stripe Gateway US",
  "priority":1,
  "status":"Active"
}

------------------------------------------------

Indexes

ruleId
regionName
status
priority
processorId

# Merchant Rules Database

## Collection Name

merchant_fee_rules

| Field | Type |
|---------|---------|
| ruleId | String |
| merchantId | String |
| merchantName | String |
| merchantType | String |
| globalFeePercentage | Number |
| globalFixedFee | Number |
| customFeePercentage | Number |
| customFixedFee | Number |
| overrideReason | String |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

Status Values

- Standard
- Override Active
- Disabled

------------------------------------------------

Example

{
  "ruleId":"MFR-1001",
  "merchantId":"MER-1092",
  "merchantName":"Acme Corp",
  "customFeePercentage":1.9,
  "customFixedFee":0.25,
  "overrideReason":"Enterprise contract negotiated"
}

------------------------------------------------

Indexes

merchantId
merchantName
merchantType
status


# Settlement Engine Database

## Collection Name

processor_settlements

| Field | Type |
|---------|---------|
| settlementId | String |
| processorId | ObjectId |
| processorName | String |
| currency | String |
| availableBalance | Number |
| pendingBalance | Number |
| totalSettled | Number |
| status | String |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection Name

settlement_batches

| Field | Type |
|---------|---------|
| batchId | String |
| processorId | ObjectId |
| amount | Number |
| destinationAccount | String |
| settlementMethod | String |
| status | String |
| initiatedBy | ObjectId |
| completedAt | Date |

------------------------------------------------

## Collection Name

auto_settlement_rules

| Field | Type |
|---------|---------|
| ruleId | String |
| frequency | String |
| minimumThreshold | Number |
| includedProcessors | Array |
| enabled | Boolean |
| createdAt | Date |

------------------------------------------------

Status Values

- Pending
- Processing
- Completed
- Failed
- Cancelled

------------------------------------------------

Example

{
  "settlementId":"SET-8821",
  "processorName":"Stripe Gateway US",
  "amount":82400,
  "settlementMethod":"Wire Transfer",
  "status":"Completed"
}

------------------------------------------------

Indexes

settlementId
processorId
status
completedAt

# Revenue Wallet Database

## Collection Name

revenue_wallet

| Field | Type |
|---------|---------|
| walletId | String |
| totalRevenuePool | Number |
| monthlyRevenue | Number |
| averageDailyRevenue | Number |
| totalWithdrawn | Number |
| revenueSources | Number |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection Name

revenue_withdrawals

| Field | Type |
|---------|---------|
| withdrawalId | String |
| amount | Number |
| destination | String |
| status | String |
| initiatedBy | ObjectId |
| withdrawalDate | Date |
| completedAt | Date |

------------------------------------------------

## Collection Name

monthly_revenue_history

| Field | Type |
|---------|---------|
| month | String |
| year | Number |
| revenueAmount | Number |
| createdAt | Date |

------------------------------------------------

Status Values

- Pending
- Processing
- Completed
- Failed
- Cancelled

------------------------------------------------

Example Withdrawal

{
  "withdrawalId":"WDR-501",
  "amount":25000,
  "destination":"Bank ****4421",
  "status":"Completed"
}

------------------------------------------------

Indexes

walletId
withdrawalId
status
withdrawalDate

# Processor Logs Database

## Collection Name

processor_logs

| Field | Type |
|---------|---------|
| logId | String |
| timestamp | Date |
| processorName | String |
| transactionId | String |
| endpoint | String |
| requestMethod | String |
| statusCode | Number |
| latencyMs | Number |
| requestPayload | Object |
| responsePayload | Object |
| ipAddress | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

webhook_logs

| Field | Type |
|---------|---------|
| webhookId | String |
| processorName | String |
| eventType | String |
| payload | Object |
| status | String |
| receivedAt | Date |

------------------------------------------------

Status Groups

2xx = Success

4xx = Client Errors

5xx = Server Errors

------------------------------------------------

Example

{
  "logId":"LOG-9921",
  "processorName":"Stripe US",
  "transactionId":"pi_3N2abc",
  "endpoint":"/v1/charges",
  "statusCode":200,
  "latencyMs":145
}

------------------------------------------------

Indexes

logId
transactionId
processorName
statusCode
timestamp

# Processor Reports Database

## Collection Name

processor_reports

| Field | Type |
|---------|---------|
| reportId | String |
| reportName | String |
| period | String |
| generatedBy | ObjectId |
| generatedAt | Date |
| reportUrl | String |

------------------------------------------------

## Collection Name

processor_metrics

| Field | Type |
|---------|---------|
| metricId | String |
| processorName | String |
| successRate | Number |
| chargebackRate | Number |
| refundRate | Number |
| transactionVolume | Number |
| reportingPeriod | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

report_exports

| Field | Type |
|---------|---------|
| exportId | String |
| reportId | String |
| format | String |
| exportedBy | ObjectId |
| exportedAt | Date |

------------------------------------------------

Supported Periods

- Today
- Last 7 Days
- This Month
- Last 3 Months
- YTD

------------------------------------------------

Supported Formats

- PDF
- CSV
- Excel

------------------------------------------------

Indexes

reportId
processorName
reportingPeriod
generatedAt

# KYC Dashboard Database

## Collection Name

kyc_submissions

| Field | Type |
|---------|---------|
| kycId | String |
| merchantId | String |
| entityName | String |
| entityType | String |
| submittedAt | Date |
| riskLevel | String |
| status | String |
| reviewedBy | ObjectId |
| reviewedAt | Date |
| createdAt | Date |

------------------------------------------------

## Collection Name

kyc_documents

| Field | Type |
|---------|---------|
| documentId | String |
| kycId | String |
| documentType | String |
| documentUrl | String |
| verificationStatus | String |

------------------------------------------------

## Collection Name

kyc_reviews

| Field | Type |
|---------|---------|
| reviewId | String |
| kycId | String |
| decision | String |
| reviewNotes | String |
| reviewerId | ObjectId |
| reviewedAt | Date |

------------------------------------------------

Entity Types

- Individual
- Business

------------------------------------------------

Risk Levels

- Low
- Medium
- High

------------------------------------------------

Status Values

- Pending
- Review
- Approved
- Rejected

------------------------------------------------

Indexes

kycId
entityName
riskLevel
status
submittedAt

# AML Monitoring Database

## Collection Name

aml_alerts

| Field | Type |
|---------|---------|
| alertId | String |
| entityId | String |
| entityName | String |
| entityType | String |
| alertType | String |
| transactionAmount | Number |
| severity | String |
| status | String |
| investigatorId | ObjectId |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection Name

aml_investigations

| Field | Type |
|---------|---------|
| investigationId | String |
| alertId | String |
| investigatorNotes | String |
| actionTaken | String |
| escalated | Boolean |
| resolvedAt | Date |

------------------------------------------------

## Collection Name

flagged_entities

| Field | Type |
|---------|---------|
| flagId | String |
| entityId | String |
| entityName | String |
| reason | String |
| flaggedBy | ObjectId |
| flaggedAt | Date |
| status | String |

------------------------------------------------

Alert Types

- Structuring
- Layering
- Smurfing
- Rapid Movement
- Unusual Volume

------------------------------------------------

Severity

- Low
- Medium
- High
- Critical

------------------------------------------------

Status

- Open
- Investigating
- Escalated
- Resolved

------------------------------------------------

Indexes

alertId
entityId
status
severity
createdAt


# Compliance Reports Database

## Collection Name

compliance_reports

| Field | Type |
|---------|---------|
| reportId | String |
| reportType | String |
| reportingPeriod | String |
| generatedBy | ObjectId |
| generatedAt | Date |
| reportUrl | String |

------------------------------------------------

## Collection Name

regulatory_filings

| Field | Type |
|---------|---------|
| filingId | String |
| filingType | String |
| filingPeriod | String |
| filedDate | Date |
| status | String |
| submittedBy | ObjectId |

------------------------------------------------

## Collection Name

compliance_metrics

| Field | Type |
|---------|---------|
| metricId | String |
| approvalRate | Number |
| processingTime | Number |
| amlResolutionRate | Number |
| filingCount | Number |
| reportingPeriod | String |

------------------------------------------------

Status Values

- Draft
- Pending
- Submitted
- Approved
- Rejected

------------------------------------------------

Report Types

- SAR Filing
- AML Report
- KYC Report
- Compliance Audit Report
- Regulatory Submission

------------------------------------------------

Indexes

reportId
filingId
reportType
reportingPeriod
generatedAt

# Activity Timeline Database

## Collection Name

compliance_timeline_events

| Field | Type |
|---------|---------|
| eventId | String |
| eventType | String |
| entityName | String |
| entityId | String |
| category | String |
| description | String |
| severity | String |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

## Collection Name

event_filters

| Field | Type |
|---------|---------|
| filterId | String |
| filterName | String |
| filterType | String |
| createdAt | Date |

------------------------------------------------

Event Categories

- KYC
- AML
- Regulatory
- System

------------------------------------------------

Event Types

- KYC Submitted
- KYC Approved
- KYC Rejected
- AML Alert Raised
- AML Alert Resolved
- AML Escalated
- Regulatory Filing
- Document Expiry Warning
- Compliance Review
- System Notification

------------------------------------------------

Severity Levels

- Low
- Medium
- High
- Critical

------------------------------------------------

Indexes

eventId
eventType
entityName
category
createdAt

# Risk Dashboard Database

## Collection Name

risk_entities

| Field | Type |
|---------|---------|
| entityId | String |
| entityName | String |
| riskType | String |
| transactionCount | Number |
| riskScore | Number |
| trend | String |
| status | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

risk_incidents

| Field | Type |
|---------|---------|
| incidentId | String |
| entityId | String |
| incidentType | String |
| severity | String |
| riskScore | Number |
| status | String |
| assignedTo | ObjectId |
| createdAt | Date |

------------------------------------------------

## Collection Name

risk_rules

| Field | Type |
|---------|---------|
| ruleId | String |
| thresholdScore | Number |
| actionType | String |
| enabled | Boolean |
| updatedBy | ObjectId |
| updatedAt | Date |

------------------------------------------------

Risk Levels

- Low
- Moderate
- High
- Critical

------------------------------------------------

Status Values

- Active
- Investigating
- Blocked
- Resolved

------------------------------------------------

Trend Values

- Rising
- Stable
- Falling

------------------------------------------------

Indexes

entityId
riskScore
status
riskType
createdAt

# AI Fraud Center Database

## Collection Name

fraud_alerts

| Field | Type |
|---------|---------|
| alertId | String |
| entityName | String |
| entityType | String |
| fraudType | String |
| amount | Number |
| transactionCount | Number |
| severity | String |
| status | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

blocked_entities

| Field | Type |
|---------|---------|
| blockId | String |
| entityId | String |
| entityName | String |
| blockReason | String |
| blockedBy | ObjectId |
| blockedAt | Date |
| status | String |

------------------------------------------------

## Collection Name

fraud_investigations

| Field | Type |
|---------|---------|
| investigationId | String |
| alertId | String |
| analystNotes | String |
| actionTaken | String |
| investigatorId | ObjectId |
| createdAt | Date |

------------------------------------------------

Fraud Types

- Card Testing
- Account Takeover
- Friendly Fraud
- Refund Abuse
- Identity Theft

------------------------------------------------

Severity

- Low
- Medium
- High
- Critical

------------------------------------------------

Status

- Active
- Investigating
- Resolved
- Blocked
- Safe

------------------------------------------------

Indexes

alertId
entityName
fraudType
severity
status

# Blocked Entities Database

## Collection Name

blocked_entities

| Field | Type |
|---------|---------|
| blockId | String |
| entityName | String |
| entityType | String |
| entityValue | String |
| blockReason | String |
| severity | String |
| status | String |
| blockedBy | ObjectId |
| blockedAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection Name

entity_reviews

| Field | Type |
|---------|---------|
| reviewId | String |
| blockId | String |
| reviewNotes | String |
| reviewerId | ObjectId |
| reviewStatus | String |
| reviewedAt | Date |

------------------------------------------------

## Collection Name

block_policy_history

| Field | Type |
|---------|---------|
| policyId | String |
| blockId | String |
| oldSeverity | String |
| newSeverity | String |
| changedBy | ObjectId |
| changedAt | Date |

------------------------------------------------

Entity Types

- IP Address
- Email
- Merchant
- API Key
- Wallet
- User Account

------------------------------------------------

Severity

- Medium
- High
- Critical

------------------------------------------------

Status

- Active
- Reviewing
- Unblocked

------------------------------------------------

Indexes

blockId
entityType
entityValue
severity
status
blockedAt

# Case Management Database

## Collection Name

investigation_cases

| Field | Type |
|---------|---------|
| caseId | String |
| entityName | String |
| entityId | String |
| caseType | String |
| priority | String |
| status | String |
| assignedTo | ObjectId |
| description | String |
| openedAt | Date |
| resolvedAt | Date |

------------------------------------------------

## Collection Name

case_timeline

| Field | Type |
|---------|---------|
| timelineId | String |
| caseId | String |
| actionBy | String |
| actionType | String |
| notes | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

case_notes

| Field | Type |
|---------|---------|
| noteId | String |
| caseId | String |
| note | String |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

Case Types

- AML Investigation
- Fraud Investigation
- KYC Dispute
- Chargeback Dispute
- Account Takeover
- Sanctions Screening

------------------------------------------------

Priority

- Low
- Medium
- High
- Critical

------------------------------------------------

Status

- Open
- Active
- Escalated
- Resolved

------------------------------------------------

Indexes

caseId
entityId
assignedTo
priority
status
openedAt


# Fee Management Database

## Collection Name

gateway_fees

| Field | Type |
|---------|---------|
| feeId | String |
| basePlatformFee | Number |
| fixedTransactionFee | Number |
| whiteLabelMarkup | Number |
| updatedBy | ObjectId |
| updatedAt | Date |

------------------------------------------------

## Collection Name

processor_fees

| Field | Type |
|---------|---------|
| processorId | String |
| processorName | String |
| feePercentage | Number |
| updatedBy | ObjectId |
| updatedAt | Date |

------------------------------------------------

## Collection Name

fee_rules

| Field | Type |
|---------|---------|
| ruleId | String |
| ruleName | String |
| merchantScope | String |
| feePercentage | Number |
| fixedFee | Number |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

Status

- Active
- Disabled

------------------------------------------------

Indexes

feeId
ruleId
processorId
processorName
createdAt

# Subscription Management Database

## Collection Name

subscription_plans

| Field | Type |
|---------|---------|
| planId | String |
| planName | String |
| themeColor | String |
| monthlyPrice | Number |
| billingCycle | String |
| transactionFee | Number |
| features | Array |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

## Collection Name

merchant_subscriptions

| Field | Type |
|---------|---------|
| subscriptionId | String |
| merchantId | String |
| planId | String |
| startDate | Date |
| endDate | Date |
| status | String |

------------------------------------------------

Plan Status

- Active
- Draft
- Disabled

------------------------------------------------

Billing Cycles

- Monthly
- Quarterly
- Yearly

------------------------------------------------

Indexes

planId
planName
status
createdAt

# Countries Management Database

## Collection Name

countries

| Field | Type |
|---------|---------|
| countryId | String |
| countryName | String |
| countryCode | String |
| region | String |
| status | String |
| merchantCount | Number |
| paymentMethodCount | Number |
| createdAt | Date |

------------------------------------------------

## Collection Name

country_compliance

| Field | Type |
|---------|---------|
| complianceId | String |
| countryId | String |
| sanctionsEnabled | Boolean |
| highRisk | Boolean |
| notes | String |

------------------------------------------------

## Collection Name

country_audit_logs

| Field | Type |
|---------|---------|
| logId | String |
| countryId | String |
| action | String |
| performedBy | ObjectId |
| createdAt | Date |

------------------------------------------------

Status Values

- Active
- Restricted
- Sanctioned
- Disabled

------------------------------------------------

Regions

- North America
- South America
- Europe
- Asia
- Africa
- Middle East
- Oceania

------------------------------------------------

Indexes

countryId
countryCode
countryName
region
status


# Currencies & FX Database

## Collection Name

currencies

| Field | Type |
|---------|---------|
| assetId | String |
| assetCode | String |
| assetName | String |
| assetType | String |
| exchangeRateUSD | Number |
| conversionFee | Number |
| status | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

fx_rate_history

| Field | Type |
|---------|---------|
| rateId | String |
| assetId | String |
| exchangeRate | Number |
| source | String |
| syncedAt | Date |

------------------------------------------------

## Collection Name

currency_audit_logs

| Field | Type |
|---------|---------|
| logId | String |
| assetId | String |
| action | String |
| performedBy | ObjectId |
| createdAt | Date |

------------------------------------------------

Asset Types

- Fiat
- Crypto

------------------------------------------------

Status

- Primary
- Active
- Disabled

------------------------------------------------

Indexes

assetId
assetCode
assetName
assetType
status

# API Management Database

## Collection Name

api_keys

| Field | Type |
|---------|---------|
| keyId | String |
| keyName | String |
| environment | String |
| apiToken | String |
| status | String |
| permissions | Array |
| lastUsedAt | Date |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

## Collection Name

api_usage_logs

| Field | Type |
|---------|---------|
| logId | String |
| keyId | String |
| endpoint | String |
| method | String |
| ipAddress | String |
| statusCode | Number |
| timestamp | Date |

------------------------------------------------

## Collection Name

api_audit_logs

| Field | Type |
|---------|---------|
| auditId | String |
| keyId | String |
| action | String |
| adminId | String |
| createdAt | Date |

------------------------------------------------

Environment Types

- Sandbox
- Production

------------------------------------------------

Status

- Active
- Revoked
- Expired
- Disabled

------------------------------------------------

Indexes

keyId
keyName
environment
status
createdAt

# Global Webhooks Database

## Collection Name

webhook_endpoints

| Field | Type |
|---------|---------|
| endpointId | String |
| endpointUrl | String |
| eventType | String |
| secretKey | String |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

## Collection Name

webhook_deliveries

| Field | Type |
|---------|---------|
| deliveryId | String |
| endpointId | String |
| eventType | String |
| payload | Object |
| responseCode | Number |
| responseMessage | String |
| status | String |
| deliveredAt | Date |

------------------------------------------------

## Collection Name

webhook_logs

| Field | Type |
|---------|---------|
| logId | String |
| endpointId | String |
| action | String |
| adminId | String |
| createdAt | Date |

------------------------------------------------

Status

- Active
- Disabled
- Failed

------------------------------------------------

Indexes

endpointId
eventType
status
createdAt

# Reports Database

## Collection Name

reports

| Field | Type |
|---------|---------|
| reportId | String |
| reportType | String |
| generatedBy | ObjectId |
| fileUrl | String |
| fileSize | String |
| dateRange | String |
| generatedAt | Date |

------------------------------------------------

## Collection Name

report_jobs

| Field | Type |
|---------|---------|
| jobId | String |
| reportId | String |
| status | String |
| startedAt | Date |
| completedAt | Date |

------------------------------------------------

## Collection Name

report_audit_logs

| Field | Type |
|---------|---------|
| auditId | String |
| reportId | String |
| action | String |
| adminId | String |
| createdAt | Date |

------------------------------------------------

Report Types

- Gateway P&L
- Tax Report
- Quarterly Volume
- Revenue Report
- Settlement Report
- Merchant Report

------------------------------------------------

Status

- Pending
- Processing
- Completed
- Failed

------------------------------------------------

Indexes

reportId
reportType
generatedAt
status


# White Label Database

## Collection Name

white_label_requests

| Field | Type |
|---------|---------|
| requestId | String |
| merchantId | String |
| merchantName | String |
| requestedDomain | String |
| sslStatus | String |
| approvalStatus | String |
| notes | String |
| requestedAt | Date |

------------------------------------------------

## Collection Name

ssl_certificates

| Field | Type |
|---------|---------|
| sslId | String |
| domain | String |
| provider | String |
| issuedAt | Date |
| expiresAt | Date |
| status | String |

------------------------------------------------

## Collection Name

white_label_audit_logs

| Field | Type |
|---------|---------|
| auditId | String |
| requestId | String |
| action | String |
| performedBy | ObjectId |
| createdAt | Date |

------------------------------------------------

SSL Status

- Active
- Provisioning
- Failed
- Expired

------------------------------------------------

Approval Status

- Approved
- Pending Review
- Rejected

------------------------------------------------

Indexes

requestId
merchantId
requestedDomain
approvalStatus
sslStatus

# Notifications Database

## Collection Name

broadcast_notifications

| Field | Type |
|---------|---------|
| broadcastId | String |
| title | String |
| message | String |
| category | String |
| targetAudience | String |
| status | String |
| createdBy | ObjectId |
| scheduledAt | Date |
| createdAt | Date |

------------------------------------------------

## Collection Name

notification_deliveries

| Field | Type |
|---------|---------|
| deliveryId | String |
| broadcastId | String |
| merchantId | String |
| deliveryStatus | String |
| deliveredAt | Date |

------------------------------------------------

## Collection Name

notification_audit_logs

| Field | Type |
|---------|---------|
| auditId | String |
| broadcastId | String |
| action | String |
| adminId | String |
| createdAt | Date |

------------------------------------------------

Categories

- System
- Warning
- Feature
- Security
- Maintenance

------------------------------------------------

Status

- Draft
- Scheduled
- Sent
- Failed

------------------------------------------------

Indexes

broadcastId
category
targetAudience
status
createdAt


# Support Database

## Collection Name

support_tickets

| Field | Type |
|---------|---------|
| ticketId | String |
| merchantId | String |
| merchantName | String |
| subject | String |
| description | String |
| status | String |
| priority | String |
| assignedTo | ObjectId |
| lastUpdated | Date |
| createdAt | Date |

------------------------------------------------

## Collection Name

ticket_messages

| Field | Type |
|---------|---------|
| messageId | String |
| ticketId | String |
| senderId | String |
| message | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

support_audit_logs

| Field | Type |
|---------|---------|
| auditId | String |
| ticketId | String |
| action | String |
| performedBy | ObjectId |
| createdAt | Date |

------------------------------------------------

Ticket Status

- Open
- In Progress
- Resolved
- Closed
- Escalated

------------------------------------------------

Priority Levels

- Low
- Medium
- High
- Critical

------------------------------------------------

Indexes

ticketId
merchantId
status
priority
lastUpdated


# Audit Logs Database

## Collection Name

audit_logs

| Field | Type |
|---------|---------|
| auditId | String |
| actionType | String |
| description | String |
| administratorId | String |
| administratorEmail | String |
| ipAddress | String |
| metadata | Object |
| timestamp | Date |

------------------------------------------------

## Collection Name

security_events

| Field | Type |
|---------|---------|
| eventId | String |
| severity | String |
| eventType | String |
| sourceIp | String |
| createdAt | Date |

------------------------------------------------

## Collection Name

audit_exports

| Field | Type |
|---------|---------|
| exportId | String |
| generatedBy | String |
| fileUrl | String |
| generatedAt | Date |

------------------------------------------------

Action Types

- Security
- Config
- Operation
- Access
- System
- Compliance

------------------------------------------------

Indexes

auditId
actionType
administratorId
timestamp
ipAddress


# Roles Database

## Collection Name

roles

| Field | Type |
|---------|---------|
| roleId | String |
| roleName | String |
| description | String |
| riskProfile | String |
| permissions | Array |
| status | String |
| createdBy | ObjectId |
| createdAt | Date |

------------------------------------------------

## Collection Name

role_assignments

| Field | Type |
|---------|---------|
| assignmentId | String |
| userId | ObjectId |
| roleId | ObjectId |
| assignedBy | ObjectId |
| assignedAt | Date |

------------------------------------------------

## Collection Name

role_permissions

| Field | Type |
|---------|---------|
| permissionId | String |
| moduleName | String |
| accessType | String |
| roleId | ObjectId |

------------------------------------------------

Risk Profiles

- Critical Risk
- High Risk
- Medium Risk
- Low Risk

------------------------------------------------

Indexes

roleId
roleName
riskProfile
status


# Settings Database

## Collection Name

platform_settings

| Field | Type |
|--------|--------|
| settingId | String |
| maintenanceMode | Boolean |
| sandboxEnvironment | Boolean |
| force2FA | Boolean |
| strictIPWhitelisting | Boolean |
| updatedBy | ObjectId |
| updatedAt | Date |

------------------------------------------------

## Collection Name

security_settings

| Field | Type |
|--------|--------|
| securityId | String |
| force2FA | Boolean |
| strictIPWhitelisting | Boolean |
| allowedIPs | Array |
| updatedBy | ObjectId |
| updatedAt | Date |

------------------------------------------------

## Collection Name

maintenance_logs

| Field | Type |
|--------|--------|
| logId | String |
| enabledBy | ObjectId |
| startTime | Date |
| endTime | Date |
| notes | String |

------------------------------------------------

Indexes

settingId
updatedBy
updatedAt

Sab tables.
Example
Merchant
MerchantProfile
MerchantWallet
WalletAddress
WalletBalance
Transaction
Payment
Deposit
Withdrawal
Settlement
Revenue
Invoice
Subscription
ApiKey
Webhook
Notification
Logs
Sessions
Permissions
Roles
Countries
Currencies
ExchangeRate
AuditLogs
RiskEngine
FraudLogs
KYC
AML
Documents
IPAddress
Devices
ActivityLogs
etc.
Har table
Fields

Datatype

Nullable

Default

Indexes

Foreign Keys

Relations

Triggers

Constraints
# Transactions Module Database

Version: 1.0

---

# Overview

The Transactions module stores all financial activities including payments, refunds, settlements, webhooks, and audit logs.

Database Engine:
- PostgreSQL / MySQL

Naming Convention:
- snake_case
- UUID for primary keys
- created_at & updated_at in every table

---

# Main Tables

1. merchants
2. customers
3. transactions
4. transaction_status_history
5. refunds
6. settlements
7. payment_methods
8. webhooks
9. audit_logs

---

# Table : merchants

| Field | Type |
|--------|------|
| id | UUID |
| merchant_code | VARCHAR |
| business_name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| status | ENUM |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Relationship

Merchant
│
└── Multiple Transactions

---

# Table : customers

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| customer_name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| created_at | TIMESTAMP |

Relationship

Customer
│
└── Multiple Transactions

---

# Table : transactions

| Field | Type |
|--------|------|
| id | UUID |
| transaction_id | VARCHAR |
| reference_no | VARCHAR |
| merchant_id | UUID |
| customer_id | UUID |
| payment_method_id | UUID |
| amount | DECIMAL |
| fee | DECIMAL |
| net_amount | DECIMAL |
| currency | VARCHAR |
| gateway | VARCHAR |
| status | ENUM |
| payment_date | TIMESTAMP |
| metadata | JSON |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Rules

Transaction ID → Unique

Reference Number → Unique

Amount > 0

Status Required

Merchant Required

Customer Required

---

# Table : payment_methods

| Field | Type |
|--------|------|
| id | UUID |
| method_name | VARCHAR |
| provider | VARCHAR |
| status | BOOLEAN |

Example

Card

Bank Transfer

Crypto

Wallet

QRIS

Virtual Account

---

# Table : refunds

| Field | Type |
|--------|------|
| id | UUID |
| transaction_id | UUID |
| refund_amount | DECIMAL |
| refund_reason | TEXT |
| refund_status | ENUM |
| processed_by | UUID |
| created_at | TIMESTAMP |

Relationship

Transaction

↓

Refund (Optional)

---

# Table : settlements

| Field | Type |
|--------|------|
| id | UUID |
| transaction_id | UUID |
| merchant_id | UUID |
| gross_amount | DECIMAL |
| fee | DECIMAL |
| net_amount | DECIMAL |
| settlement_status | ENUM |
| settled_at | TIMESTAMP |

Relationship

Merchant

↓

Settlement

↓

Transaction

---

# Table : webhooks

| Field | Type |
|--------|------|
| id | UUID |
| transaction_id | UUID |
| provider | VARCHAR |
| event | VARCHAR |
| payload | JSON |
| response | JSON |
| retry_count | INTEGER |
| status | ENUM |
| created_at | TIMESTAMP |

---

# Table : transaction_status_history

| Field | Type |
|--------|------|
| id | UUID |
| transaction_id | UUID |
| old_status | VARCHAR |
| new_status | VARCHAR |
| updated_by | UUID |
| remarks | TEXT |
| created_at | TIMESTAMP |

Purpose

Maintain complete status history.

Example

Pending

↓

Processing

↓

Completed

↓

Settled

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| user_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| transaction_id | UUID |
| ip_address | VARCHAR |
| user_agent | TEXT |
| created_at | TIMESTAMP |

Example Actions

Transaction Created

Refund Issued

Settlement Completed

Export CSV

Webhook Retry

Status Changed

---

# Database Relationships

Merchant (1)
      │
      │
      ▼
Transactions (N)
      │
      ├──────────────► Customer
      │
      ├──────────────► Payment Method
      │
      ├──────────────► Refund
      │
      ├──────────────► Settlement
      │
      ├──────────────► Webhook
      │
      └──────────────► Audit Logs

---

# Indexes

Create indexes on

transaction_id

reference_no

merchant_id

customer_id

status

payment_date

currency

gateway

created_at

These indexes improve search and filtering performance.

---

# Constraints

Primary Key

UUID

Foreign Keys

merchant_id

customer_id

transaction_id

payment_method_id

Unique Keys

transaction_id

reference_no

Not Null

merchant_id

amount

currency

status

created_at

---

# Soft Delete

Use

deleted_at

instead of permanent delete.

Transactions should never be permanently removed.

---

# JSON Fields

metadata

Store

Gateway Response

Device Info

IP Address

Extra Parameters

Webhook Payload

Future Custom Fields

---

# Data Retention

Transactions → Permanent

Refunds → Permanent

Settlements → Permanent

Audit Logs → Permanent

Webhook Logs → Configurable (90–180 Days)

---

# Database Optimization

- Use UUID as Primary Keys
- Index frequently searched columns
- Enable Query Pagination
- Store timestamps in UTC
- Archive old transactions if required
- Use Transactions (ACID) for financial operations
- Avoid hard deletes

---

# Future Enhancements

- Multi Currency Support
- Multi Gateway Support
- Chargeback Table
- Recurring Payments
- Subscription Transactions
- Installment Payments
- Fraud Detection Records

---

End of Database Document
# Deposits Module Database

Version: 1.0

---

# Overview

The Deposits module stores merchant deposit addresses, blockchain transactions, confirmation details, wallet credits, and audit logs.

Database: PostgreSQL / MySQL

Primary Key: UUID

Naming Convention: snake_case

---

# Main Tables

- merchants
- deposit_addresses
- deposits
- blockchain_transactions
- wallet_transactions
- audit_logs

---

# Table : deposit_addresses

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| asset | VARCHAR |
| network | VARCHAR |
| wallet_address | VARCHAR |
| qr_code | TEXT |
| status | BOOLEAN |
| created_at | TIMESTAMP |

Rules

- Wallet Address must be unique.
- One active address per Asset + Network.
- QR Code generated automatically.

---

# Table : deposits

| Field | Type |
|--------|------|
| id | UUID |
| deposit_id | VARCHAR |
| merchant_id | UUID |
| address_id | UUID |
| tx_hash | VARCHAR |
| asset | VARCHAR |
| network | VARCHAR |
| amount | DECIMAL |
| confirmations | INT |
| required_confirmations | INT |
| status | ENUM |
| received_at | TIMESTAMP |
| created_at | TIMESTAMP |

Status

- Pending
- Confirming
- Confirmed
- Failed
- Expired

---

# Table : blockchain_transactions

| Field | Type |
|--------|------|
| id | UUID |
| deposit_id | UUID |
| block_number | BIGINT |
| tx_hash | VARCHAR |
| sender_address | VARCHAR |
| receiver_address | VARCHAR |
| gas_fee | DECIMAL |
| explorer_url | VARCHAR |
| created_at | TIMESTAMP |

Purpose

Stores blockchain information for every deposit.

---

# Table : wallet_transactions

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| deposit_id | UUID |
| transaction_type | ENUM |
| amount | DECIMAL |
| balance_before | DECIMAL |
| balance_after | DECIMAL |
| created_at | TIMESTAMP |

Purpose

Records merchant wallet balance updates after successful deposits.

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| deposit_id | UUID |
| ip_address | VARCHAR |
| created_at | TIMESTAMP |

Examples

- Address Generated
- Deposit Received
- Deposit Confirmed
- Wallet Credited
- Export Downloaded

---

# Relationships

Merchant

↓

Deposit Address

↓

Deposits

↓

Blockchain Transaction

↓

Wallet Transaction

↓

Audit Log

---

# Indexes

merchant_id

deposit_id

wallet_address

tx_hash

status

asset

network

created_at

---

# Constraints

Unique

- deposit_id
- tx_hash
- wallet_address

Required

- merchant_id
- asset
- network
- amount
- status

---

# Best Practices

- Store blockchain timestamps in UTC.
- Never update transaction hash.
- Use soft delete only where required.
- Index all searchable columns.
- Keep audit logs permanent.

---

End of Database
# Withdrawals Module Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

The Withdrawals module stores payout requests, wallet balance movements, bank/crypto destination details, transaction status, fees, and audit logs.

---

# Main Tables

- merchants
- merchant_wallets
- withdrawal_requests
- withdrawal_destinations
- wallet_transactions
- withdrawal_status_history
- audit_logs

---

# Table : withdrawal_requests

| Field | Type |
|--------|------|
| id | UUID |
| withdrawal_id | VARCHAR |
| merchant_id | UUID |
| destination_id | UUID |
| method | ENUM |
| asset | VARCHAR |
| network | VARCHAR |
| amount | DECIMAL |
| platform_fee | DECIMAL |
| network_fee | DECIMAL |
| total_deduction | DECIMAL |
| status | ENUM |
| transaction_hash | VARCHAR |
| reference_number | VARCHAR |
| remarks | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Status

- Draft
- Pending
- Processing
- Completed
- Failed
- Cancelled
- Rejected

---

# Table : withdrawal_destinations

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| type | ENUM (CRYPTO/BANK) |
| wallet_address | VARCHAR |
| bank_name | VARCHAR |
| account_name | VARCHAR |
| account_number | VARCHAR |
| swift_ifsc | VARCHAR |
| network | VARCHAR |
| is_default | BOOLEAN |
| created_at | TIMESTAMP |

Purpose

Stores merchant payout destinations securely.

---

# Table : merchant_wallets

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| asset | VARCHAR |
| available_balance | DECIMAL |
| reserved_balance | DECIMAL |
| updated_at | TIMESTAMP |

Rules

- Available balance is used for withdrawals.
- Reserved balance cannot be withdrawn.

---

# Table : wallet_transactions

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| withdrawal_id | UUID |
| transaction_type | ENUM |
| amount | DECIMAL |
| balance_before | DECIMAL |
| balance_after | DECIMAL |
| created_at | TIMESTAMP |

Purpose

Maintains wallet debit history.

---

# Table : withdrawal_status_history

| Field | Type |
|--------|------|
| id | UUID |
| withdrawal_id | UUID |
| old_status | VARCHAR |
| new_status | VARCHAR |
| updated_by | UUID |
| remarks | TEXT |
| created_at | TIMESTAMP |

Purpose

Tracks every status change.

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| withdrawal_id | UUID |
| ip_address | VARCHAR |
| created_at | TIMESTAMP |

Examples

- Withdrawal Requested
- OTP Verified
- Status Updated
- Wallet Debited
- Export Downloaded

---

# Relationships

Merchant
   │
   ├── Merchant Wallet
   │
   ├── Withdrawal Requests
   │
   ├── Withdrawal Destinations
   │
   ├── Wallet Transactions
   │
   └── Audit Logs

---

# Indexes

- withdrawal_id
- merchant_id
- status
- method
- asset
- network
- transaction_hash
- created_at

---

# Constraints

Unique

- withdrawal_id
- transaction_hash
- reference_number

Required

- merchant_id
- amount
- method
- status

---

# Best Practices

- Store timestamps in UTC.
- Use UUID for primary keys.
- Index searchable fields.
- Never hard delete financial records.
- Use database transactions for wallet updates.

---

End of Database
# Wallet Management Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

The Wallet Management database stores merchant wallets, supported assets, balances, portfolio values, wallet addresses, and wallet activity.

---

# Main Tables

- merchants
- wallets
- wallet_assets
- wallet_addresses
- wallet_transactions
- portfolio_history
- audit_logs

---

# Table : wallets

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| asset | VARCHAR |
| network | VARCHAR |
| available_balance | DECIMAL |
| locked_balance | DECIMAL |
| usd_value | DECIMAL |
| status | ENUM |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Rules

- One wallet per Asset + Network.
- Balance cannot be negative.
- Status: Active / Disabled.

---

# Table : wallet_assets

| Field | Type |
|--------|------|
| id | UUID |
| symbol | VARCHAR |
| asset_name | VARCHAR |
| network | VARCHAR |
| current_price | DECIMAL |
| change_24h | DECIMAL |
| is_active | BOOLEAN |

Purpose

Stores supported assets and market price information.

---

# Table : wallet_addresses

| Field | Type |
|--------|------|
| id | UUID |
| wallet_id | UUID |
| address | VARCHAR |
| qr_code | TEXT |
| is_primary | BOOLEAN |
| created_at | TIMESTAMP |

Purpose

Stores deposit addresses linked to merchant wallets.

---

# Table : wallet_transactions

| Field | Type |
|--------|------|
| id | UUID |
| wallet_id | UUID |
| transaction_type | ENUM |
| reference_id | UUID |
| amount | DECIMAL |
| balance_before | DECIMAL |
| balance_after | DECIMAL |
| created_at | TIMESTAMP |

Transaction Types

- Deposit
- Withdrawal
- Settlement
- Adjustment

---

# Table : portfolio_history

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| total_value | DECIMAL |
| total_assets | INT |
| profit_loss | DECIMAL |
| recorded_at | TIMESTAMP |

Purpose

Stores portfolio snapshots for analytics and reports.

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| wallet_id | UUID |
| ip_address | VARCHAR |
| created_at | TIMESTAMP |

Examples

- Wallet Created
- Asset Added
- Balance Updated
- Portfolio Exported

---

# Relationships

Merchant
    │
    ├── Wallets
    │       │
    │       ├── Wallet Addresses
    │       ├── Wallet Transactions
    │       └── Portfolio History
    │
    └── Audit Logs

---

# Indexes

- merchant_id
- wallet_id
- asset
- network
- address
- created_at

---

# Constraints

Unique

- merchant_id + asset + network
- wallet_address

Required

- merchant_id
- asset
- network
- available_balance

---

# Best Practices

- UUID Primary Keys
- Soft Delete (Optional)
- UTC Timestamps
- Indexed Search
- ACID Transactions
- Never delete wallet history

---

End of Database
# Settlement Center Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores settlement requests, linked payout accounts, scheduled settlements, early payouts, reconciliation records, and settlement history.

---

# Main Tables

- settlement_accounts
- settlements
- settlement_history
- early_payouts
- reconciliation_logs
- wallet_transactions
- audit_logs

---

# Table : settlement_accounts

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| account_type | ENUM |
| bank_name | VARCHAR |
| account_number | VARCHAR |
| routing_number | VARCHAR |
| wallet_address | VARCHAR |
| network | VARCHAR |
| is_primary | BOOLEAN |
| status | ENUM |
| created_at | TIMESTAMP |

Account Types

- Bank
- Crypto Wallet

Status

- Active
- Inactive
- Pending Verification

---

# Table : settlements

| Field | Type |
|--------|------|
| id | UUID |
| settlement_id | VARCHAR |
| merchant_id | UUID |
| account_id | UUID |
| method | ENUM |
| currency | VARCHAR |
| amount | DECIMAL |
| fee | DECIMAL |
| net_amount | DECIMAL |
| status | ENUM |
| reference_number | VARCHAR |
| transaction_hash | VARCHAR |
| scheduled_at | TIMESTAMP |
| completed_at | TIMESTAMP |

Status

- Scheduled
- Pending
- Processing
- Completed
- Failed
- Cancelled

---

# Table : early_payouts

| Field | Type |
|--------|------|
| id | UUID |
| settlement_id | UUID |
| merchant_id | UUID |
| payout_amount | DECIMAL |
| fee_percentage | DECIMAL |
| fee_amount | DECIMAL |
| status | ENUM |
| requested_at | TIMESTAMP |

Purpose

Stores early payout requests.

---

# Table : settlement_history

| Field | Type |
|--------|------|
| id | UUID |
| settlement_id | UUID |
| old_status | VARCHAR |
| new_status | VARCHAR |
| updated_by | UUID |
| remarks | TEXT |
| created_at | TIMESTAMP |

Purpose

Tracks settlement lifecycle.

---

# Table : reconciliation_logs

| Field | Type |
|--------|------|
| id | UUID |
| settlement_id | UUID |
| ledger_amount | DECIMAL |
| settled_amount | DECIMAL |
| status | ENUM |
| verified_at | TIMESTAMP |

Purpose

Verifies settlement accuracy.

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| settlement_id | UUID |
| created_at | TIMESTAMP |

Examples

- Bank Linked
- Wallet Linked
- Settlement Created
- Early Payout Requested
- Settlement Completed

---

# Relationships

Merchant
   │
   ├── Settlement Accounts
   ├── Settlements
   ├── Early Payouts
   ├── Settlement History
   ├── Reconciliation Logs
   └── Audit Logs

---

# Indexes

- merchant_id
- settlement_id
- account_id
- status
- currency
- reference_number
- created_at

---

# Constraints

Unique

- settlement_id
- reference_number
- wallet_address

Required

- merchant_id
- account_id
- amount
- status

---

# Best Practices

- UUID Primary Keys
- UTC Timestamps
- ACID Transactions
- Indexed Search
- Permanent Settlement History
- Soft Delete for Linked Accounts

---

End of Database
# Customers Module Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores customer profiles, contact details, transaction summary, lifetime value, risk profile, and customer activity.

---

# Main Tables

- customers
- customer_transactions
- customer_notes
- customer_tags
- customer_activity
- audit_logs

---

# Table : customers

| Field | Type |
|--------|------|
| id | UUID |
| customer_id | VARCHAR |
| merchant_id | UUID |
| full_name | VARCHAR |
| email | VARCHAR |
| joined_date | DATE |
| transaction_count | INT |
| lifetime_value | DECIMAL |
| risk_profile | ENUM |
| status | ENUM |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Status

- Active
- Inactive
- Deleted

Risk

- Low
- Medium
- High

---

# Table : customer_transactions

| Field | Type |
|--------|------|
| id | UUID |
| customer_id | UUID |
| transaction_id | UUID |
| amount | DECIMAL |
| transaction_type | VARCHAR |
| status | VARCHAR |
| created_at | TIMESTAMP |

Purpose

Links customer with completed transactions.

---

# Table : customer_notes

| Field | Type |
|--------|------|
| id | UUID |
| customer_id | UUID |
| note | TEXT |
| created_by | UUID |
| created_at | TIMESTAMP |

Purpose

Stores internal merchant notes.

---

# Table : customer_tags

| Field | Type |
|--------|------|
| id | UUID |
| customer_id | UUID |
| tag_name | VARCHAR |
| created_at | TIMESTAMP |

Examples

- VIP
- Returning
- High Value
- High Risk

---

# Table : customer_activity

| Field | Type |
|--------|------|
| id | UUID |
| customer_id | UUID |
| activity | VARCHAR |
| ip_address | VARCHAR |
| created_at | TIMESTAMP |

Examples

- Customer Created
- Profile Updated
- Risk Changed

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| customer_id | UUID |
| created_at | TIMESTAMP |

Examples

- Customer Created
- Customer Updated
- Customer Deleted
- Export Downloaded

---

# Relationships

Merchant
   │
   ├── Customers
   │      ├── Customer Transactions
   │      ├── Customer Notes
   │      ├── Customer Tags
   │      └── Customer Activity
   │
   └── Audit Logs

---

# Indexes

- merchant_id
- customer_id
- email
- risk_profile
- joined_date
- created_at

---

# Constraints

Unique

- customer_id
- email (per merchant)

Required

- merchant_id
- full_name
- email
- joined_date

---

# Best Practices

- UUID Primary Keys
- Soft Delete Customers
- UTC Timestamps
- Indexed Search
- Never Delete Financial History

---

End of Database
# Revenue Module Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores merchant revenue records, fee breakdowns, analytics summaries, downloadable statements, and revenue history.

---

# Main Tables

- revenue_records
- revenue_summary
- revenue_fees
- revenue_reports
- audit_logs

---

# Table : revenue_records

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| transaction_id | UUID |
| gross_amount | DECIMAL |
| gateway_fee | DECIMAL |
| network_fee | DECIMAL |
| settlement_fee | DECIMAL |
| net_amount | DECIMAL |
| currency | VARCHAR |
| created_at | TIMESTAMP |

Purpose

Stores revenue generated from every successful transaction.

---

# Table : revenue_summary

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| period | VARCHAR |
| gross_revenue | DECIMAL |
| total_fees | DECIMAL |
| net_revenue | DECIMAL |
| total_transactions | INT |
| created_at | TIMESTAMP |

Periods

- Daily
- Weekly
- Monthly
- Yearly

---

# Table : revenue_fees

| Field | Type |
|--------|------|
| id | UUID |
| revenue_id | UUID |
| fee_type | VARCHAR |
| fee_amount | DECIMAL |
| created_at | TIMESTAMP |

Fee Types

- Gateway Fee
- Network Fee
- Settlement Fee
- Early Payout Fee

---

# Table : revenue_reports

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| report_type | VARCHAR |
| file_name | VARCHAR |
| generated_at | TIMESTAMP |

Report Types

- CSV
- Excel
- PDF

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| created_at | TIMESTAMP |

Examples

- Revenue Calculated
- Statement Generated
- Report Downloaded

---

# Relationships

Merchant
   │
   ├── Revenue Records
   ├── Revenue Summary
   ├── Revenue Fees
   ├── Revenue Reports
   └── Audit Logs

---

# Indexes

- merchant_id
- transaction_id
- created_at
- period
- currency

---

# Constraints

Required

- merchant_id
- transaction_id
- gross_amount
- net_amount

Unique

- revenue_record per transaction

---

# Best Practices

- UUID Primary Keys
- Indexed Reports
- ACID Transactions
- UTC Timestamps
- Permanent Revenue History

---

End of Database
# Reports & Analytics Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores analytics summaries, KPI metrics, generated reports, chart datasets, scheduled reports, and export history.

---

# Main Tables

- analytics_summary
- analytics_kpis
- reports
- chart_data
- scheduled_reports
- report_exports
- audit_logs

---

# Table : analytics_summary

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| period | VARCHAR |
| total_volume | DECIMAL |
| gross_revenue | DECIMAL |
| net_revenue | DECIMAL |
| refunds | DECIMAL |
| chargebacks | DECIMAL |
| created_at | TIMESTAMP |

Purpose

Stores aggregated analytics for dashboard summaries.

---

# Table : analytics_kpis

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| metric_name | VARCHAR |
| metric_value | DECIMAL |
| period | VARCHAR |
| updated_at | TIMESTAMP |

Examples

- Total Transactions
- Success Rate
- Average Order Value
- Customer Growth

---

# Table : reports

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| report_type | VARCHAR |
| start_date | DATE |
| end_date | DATE |
| status | ENUM |
| generated_at | TIMESTAMP |

Status

- Pending
- Processing
- Completed
- Failed

---

# Table : chart_data

| Field | Type |
|--------|------|
| id | UUID |
| report_id | UUID |
| chart_type | VARCHAR |
| label | VARCHAR |
| value | DECIMAL |

Supported Charts

- Line
- Bar
- Pie
- Area

---

# Table : scheduled_reports

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| frequency | ENUM |
| format | VARCHAR |
| next_run | TIMESTAMP |
| status | ENUM |

Frequency

- Daily
- Weekly
- Monthly

---

# Table : report_exports

| Field | Type |
|--------|------|
| id | UUID |
| report_id | UUID |
| file_type | VARCHAR |
| file_name | VARCHAR |
| exported_at | TIMESTAMP |

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| module | VARCHAR |
| action | VARCHAR |
| created_at | TIMESTAMP |

Examples

- Report Generated
- Report Exported
- Dashboard Viewed

---

# Relationships

Merchant
   │
   ├── Analytics Summary
   ├── KPI Metrics
   ├── Reports
   ├── Chart Data
   ├── Scheduled Reports
   ├── Export History
   └── Audit Logs

---

# Indexes

- merchant_id
- report_type
- period
- created_at
- status

---

# Constraints

Required

- merchant_id
- report_type
- generated_at

---

# Best Practices

- UUID Primary Keys
- Indexed Queries
- Cached KPI Data
- UTC Timestamps
- Immutable Report History

---

End of Database
# API Keys Module Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores merchant API credentials, environments, key status, usage tracking, and security logs.

---

# Main Tables

- api_keys
- api_key_usage
- api_key_permissions
- audit_logs

---

# Table : api_keys

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| key_name | VARCHAR |
| public_key | VARCHAR |
| secret_hash | VARCHAR |
| environment | ENUM |
| status | ENUM |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |
| last_used_at | TIMESTAMP |

---

# Environment

- Production
- Sandbox

---

# Status

- Active
- Revoked
- Expired

---

# Table : api_key_usage

| Field | Type |
|--------|------|
| id | UUID |
| api_key_id | UUID |
| request_count | INT |
| last_ip | VARCHAR |
| last_endpoint | VARCHAR |
| created_at | TIMESTAMP |

Purpose

Tracks API usage.

---

# Table : api_key_permissions

| Field | Type |
|--------|------|
| id | UUID |
| api_key_id | UUID |
| permission | VARCHAR |
| created_at | TIMESTAMP |

Examples

- transactions.read
- transactions.write
- payments.create
- refunds.create

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| action | VARCHAR |
| entity_id | UUID |
| created_at | TIMESTAMP |

Actions

- KEY_CREATED
- KEY_ROLLED
- KEY_REVOKED
- KEY_USED

---

# Relationships

Merchant

↓

API Keys

↓

Usage Tracking

↓

Permissions

↓

Audit Logs

---

# Indexes

- merchant_id
- public_key
- environment
- status
- created_at

---

# Constraints

Unique

- public_key

Required

- merchant_id
- key_name
- environment
- secret_hash

---

# Security Practices

- Never store raw secret
- Hash secret key
- Encrypt sensitive data
- Rotate credentials
- Maintain audit trail

---

# Best Practices

- UUID IDs
- Soft Delete
- UTC Time
- Indexed Lookup
- Secure Storage

---

End of Database
# Webhooks Module Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores webhook endpoints, subscribed events, delivery logs, retry attempts, and audit records.

---

# Main Tables

- webhook_endpoints
- webhook_events
- webhook_deliveries
- webhook_retries
- audit_logs

---

# Table : webhook_endpoints

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| url | TEXT |
| status | ENUM |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Status

- Active
- Disabled

---

# Table : webhook_events

| Field | Type |
|--------|------|
| id | UUID |
| endpoint_id | UUID |
| event_type | VARCHAR |
| created_at | TIMESTAMP |

Examples

- payment.*
- payout.*
- deposit.*

---

# Table : webhook_deliveries

| Field | Type |
|--------|------|
| id | UUID |
| event_id | VARCHAR |
| endpoint_id | UUID |
| status | ENUM |
| response_code | VARCHAR |
| response_body | TEXT |
| attempt_count | INT |
| delivered_at | TIMESTAMP |

Status

- Success
- Failed
- Pending

---

# Table : webhook_retries

| Field | Type |
|--------|------|
| id | UUID |
| delivery_id | UUID |
| attempt_no | INT |
| next_retry_at | TIMESTAMP |
| status | ENUM |

---

# Table : audit_logs

| Field | Type |
|--------|------|
| id | UUID |
| merchant_id | UUID |
| action | VARCHAR |
| entity_id | UUID |
| created_at | TIMESTAMP |

Actions

- WEBHOOK_CREATED
- WEBHOOK_UPDATED
- WEBHOOK_DELETED
- WEBHOOK_DELIVERED
- WEBHOOK_FAILED

---

# Relationships

Merchant
   │
   ├── Webhook Endpoints
   ├── Webhook Events
   ├── Webhook Deliveries
   ├── Webhook Retries
   └── Audit Logs

---

# Indexes

- merchant_id
- endpoint_id
- event_type
- status
- created_at

---

# Constraints

Required

- merchant_id
- url
- status

Unique

- endpoint_url per merchant

---

# Best Practices

- Async Delivery System
- Queue-Based Processing
- Retry with Backoff
- Store Full Logs
- Secure Signature Validation

---

End of Database
# White Label Studio Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores merchant branding configuration, domains, SSL status, checkout settings, email templates, and assets.

---

# Main Tables

- white_label_configs
- custom_domains
- ssl_certificates
- theme_settings
- checkout_settings
- email_templates
- assets
- audit_logs

---

# Table : white_label_configs

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| enabled | BOOLEAN |
| remove_pgx_branding | BOOLEAN |
| created_at | TIMESTAMP |

---

# Table : custom_domains

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| domain | VARCHAR |
| status | ENUM |
| verified_at | TIMESTAMP |

Status

- Pending
- Verified
- Failed

---

# Table : ssl_certificates

| Field | Type |
|---|---|
| id | UUID |
| domain_id | UUID |
| certificate | TEXT |
| expiry_date | DATE |
| status | ENUM |

Status

- Active
- Expired
- Failed

---

# Table : theme_settings

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| logo_url | TEXT |
| primary_color | VARCHAR |
| font_family | VARCHAR |
| updated_at | TIMESTAMP |

---

# Table : checkout_settings

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| billing_required | BOOLEAN |
| phone_required | BOOLEAN |
| kyc_required | BOOLEAN |
| show_network_fee | BOOLEAN |

---

# Table : email_templates

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| sender_name | VARCHAR |
| reply_email | VARCHAR |
| footer_note | TEXT |
| updated_at | TIMESTAMP |

---

# Table : assets

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| file_name | VARCHAR |
| file_url | TEXT |
| type | VARCHAR |
| created_at | TIMESTAMP |

Types

- Logo
- Image
- Font

---

# Table : audit_logs

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| action | VARCHAR |
| created_at | TIMESTAMP |

Actions

- DOMAIN_ADDED
- THEME_UPDATED
- EMAIL_UPDATED
- CHECKOUT_UPDATED

---

# Relationships

Merchant

↓

White Label Config

↓

Domain

↓

SSL

↓

Theme

↓

Checkout

↓

Email

↓

Assets

---

# Indexes

- merchant_id
- domain
- status
- created_at

---

# Constraints

Unique

- domain

Required

- merchant_id
- domain
- configuration

---

# Best Practices

- Store Assets Separately
- Encrypt Sensitive Data
- CDN For Images
- Automatic SSL Renewal
- Tenant Isolation

---

End of Database
# Billing & Subscription Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores subscription plans, merchant subscriptions, payment methods, invoices, usage records, and billing history.

---

# Main Tables

- plans
- subscriptions
- payment_methods
- invoices
- usage_records
- billing_transactions
- audit_logs

---

# Table : plans

| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| price | DECIMAL |
| billing_cycle | VARCHAR |
| api_limit | INT |
| features | JSON |
| created_at | TIMESTAMP |

---

# Table : subscriptions

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| plan_id | UUID |
| status | ENUM |
| start_date | DATE |
| end_date | DATE |
| auto_renew | BOOLEAN |

Status

- Active
- Cancelled
- Expired
- Suspended

---

# Table : payment_methods

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| provider_token | TEXT |
| card_brand | VARCHAR |
| last_four | VARCHAR |
| expiry_date | VARCHAR |
| is_default | BOOLEAN |

---

# Table : invoices

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| invoice_number | VARCHAR |
| amount | DECIMAL |
| status | ENUM |
| invoice_date | DATE |

Status

- Paid
- Pending
- Failed

---

# Table : usage_records

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| metric | VARCHAR |
| usage_count | INT |
| period | VARCHAR |

Examples

- API Calls
- Transactions

---

# Table : billing_transactions

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| amount | DECIMAL |
| payment_status | ENUM |
| gateway_reference | VARCHAR |
| created_at | TIMESTAMP |

---

# Table : audit_logs

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| action | VARCHAR |
| created_at | TIMESTAMP |

Actions

- PLAN_CHANGED
- PAYMENT_SUCCESS
- PAYMENT_FAILED
- INVOICE_CREATED

---

# Relationships

Merchant

↓

Subscription

↓

Plan

↓

Payment Method

↓

Invoices

↓

Usage Records

---

# Indexes

- merchant_id
- plan_id
- invoice_number
- status
- created_at

---

# Constraints

Unique

- invoice_number

Required

- merchant_id
- plan_id
- status

---

# Security

- Tokenized Cards
- PCI Compliance
- Encrypted Data
- Audit Logs

---

End of Database
# Team Members Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores merchant users, roles, permissions, invitations, and team activity logs.

---

# Main Tables

- team_members
- roles
- permissions
- role_permissions
- invitations
- audit_logs

---

# Table : team_members

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| name | VARCHAR |
| email | VARCHAR |
| role_id | UUID |
| status | ENUM |
| created_at | TIMESTAMP |

Status

- Active
- Pending
- Disabled

---

# Table : roles

| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| description | TEXT |

Roles

- Owner
- Admin
- Finance
- Developer

---

# Table : permissions

| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| module | VARCHAR |

Examples

- view_transactions
- manage_users
- manage_api_keys
- manage_billing

---

# Table : role_permissions

| Field | Type |
|---|---|
| id | UUID |
| role_id | UUID |
| permission_id | UUID |

---

# Table : invitations

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| email | VARCHAR |
| role_id | UUID |
| token | TEXT |
| expires_at | TIMESTAMP |
| status | ENUM |

Status

- Pending
- Accepted
- Expired

---

# Table : audit_logs

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| user_id | UUID |
| action | VARCHAR |
| created_at | TIMESTAMP |

Actions

- MEMBER_INVITED
- ROLE_UPDATED
- MEMBER_DELETED

---

# Relationships

Merchant

↓

Team Members

↓

Roles

↓

Permissions

↓

Audit Logs

---

# Indexes

- merchant_id
- email
- role_id
- status

---

# Constraints

Unique

- merchant_id + email

Required

- email
- role
- status

---

# Security

- Password Hashing
- Token Expiry
- Permission Validation
- Audit Tracking

---

End of Database
# Notifications Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores merchant notifications, read status, priority, and delivery logs.

---

# Main Tables

- notifications
- notification_preferences
- notification_logs
- audit_logs

---

# Table : notifications

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| user_id | UUID |
| title | VARCHAR |
| message | TEXT |
| type | VARCHAR |
| priority | ENUM |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

---

# Notification Types

Examples

- settlement
- payment
- security
- billing
- system

---

# Priority Values

- High
- Medium
- Low

---

# Table : notification_preferences

| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| email_enabled | BOOLEAN |
| push_enabled | BOOLEAN |
| sms_enabled | BOOLEAN |

---

# Table : notification_logs

| Field | Type |
|---|---|
| id | UUID |
| notification_id | UUID |
| delivery_status | ENUM |
| sent_at | TIMESTAMP |

Status

- Sent
- Failed
- Pending

---

# Table : audit_logs

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| action | VARCHAR |
| created_at | TIMESTAMP |

Actions

- NOTIFICATION_CREATED
- NOTIFICATION_READ
- NOTIFICATION_DELETED

---

# Relationships

Merchant

↓

Users

↓

Notifications

↓

Logs

---

# Indexes

- merchant_id
- user_id
- is_read
- created_at

---

# Constraints

Required

- merchant_id
- title
- type

---

# Security

- Merchant Isolation
- User Validation
- Access Control

---

End of Database
# Settings Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores merchant profile data, security settings, preferences, sessions, and audit records.

---

# Main Tables

- merchant_profiles
- user_security
- user_preferences
- sessions
- audit_logs

---

# Table : merchant_profiles

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| company_name | VARCHAR |
| email | VARCHAR |
| timezone | VARCHAR |
| updated_at | TIMESTAMP |

---

# Table : user_security

| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| password_hash | TEXT |
| two_factor_enabled | BOOLEAN |
| secret_key | TEXT |
| updated_at | TIMESTAMP |

---

# Table : user_preferences

| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| notification_enabled | BOOLEAN |
| timezone | VARCHAR |
| language | VARCHAR |

---

# Table : sessions

| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| token | TEXT |
| expires_at | TIMESTAMP |
| created_at | TIMESTAMP |

---

# Table : audit_logs

| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| action | VARCHAR |
| ip_address | VARCHAR |
| created_at | TIMESTAMP |

Actions

- PASSWORD_CHANGED
- PROFILE_UPDATED
- 2FA_ENABLED
- 2FA_DISABLED

---

# Relationships

Merchant

↓

Profile

↓

Security

↓

Preferences

↓

Sessions

↓

Audit Logs

---

# Indexes

- merchant_id
- user_id
- email
- created_at

---

# Constraints

Unique

- email

Required

- user_id
- password_hash

---

# Security

- Password Hashing
- Encrypted Secrets
- Session Expiry
- Audit Tracking

---

End of Database
# Support Center Database

Version: 1.0

Database: PostgreSQL / MySQL

---

# Overview

Stores support tickets, conversations, agents, categories, and ticket history.

---

# Main Tables

- support_tickets
- ticket_messages
- support_agents
- ticket_categories
- ticket_history

---

# Table : support_tickets

| Field | Type |
|---|---|
| id | UUID |
| merchant_id | UUID |
| ticket_id | VARCHAR |
| subject | VARCHAR |
| category_id | UUID |
| status | ENUM |
| priority | ENUM |
| created_at | TIMESTAMP |

---

# Ticket Status

- Open
- In Progress
- Resolved
- Closed

---

# Priority

- Low
- Medium
- High
- Urgent

---

# Table : ticket_messages

| Field | Type |
|---|---|
| id | UUID |
| ticket_id | UUID |
| sender_id | UUID |
| message | TEXT |
| sender_type | ENUM |
| created_at | TIMESTAMP |

Sender Type

- Merchant
- Support

---

# Table : support_agents

| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| email | VARCHAR |
| active | BOOLEAN |

---

# Table : ticket_categories

| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| description | TEXT |

Examples

- Technical
- Billing
- Account

---

# Table : ticket_history

| Field | Type |
|---|---|
| id | UUID |
| ticket_id | UUID |
| action | VARCHAR |
| created_at | TIMESTAMP |

Actions

- CREATED
- ASSIGNED
- STATUS_CHANGED
- CLOSED

---

# Relationships

Merchant

↓

Tickets

↓

Messages

↓

History

---

# Indexes

- merchant_id
- ticket_id
- status
- created_at

---

# Constraints

Required

- subject
- message
- merchant_id

---

# Security

- Ticket Ownership Validation
- Role Permission Check
- Data Isolation

---

End of Database

# Transaction Database

## Collection: transactions

| Field | Type |
|---------|---------|
| transactionId | String |
| userId | ObjectId |
| type | String |
| title | String |
| description | String |
| amount | Number |
| currency | String |
| convertedAmount | Number |
| status | String |
| hash | String |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection: transaction_exports

| Field | Type |
|---------|---------|
| exportId | String |
| userId | ObjectId |
| format | String |
| generatedAt | Date |
| fileUrl | String |

------------------------------------------------

Indexes

transactionId
userId
type
status
createdAt
hash

# Notifications Database

## Collection: notifications

| Field | Type |
|---------|---------|
| notificationId | String |
| userId | ObjectId |
| type | String |
| title | String |
| message | String |
| actionLabel | String |
| actionUrl | String |
| isRead | Boolean |
| createdAt | Date |

------------------------------------------------

## Collection: notification_settings

| Field | Type |
|---------|---------|
| userId | ObjectId |
| lobbyInvites | Boolean |
| walletActivity | Boolean |
| chatMentions | Boolean |
| systemUpdates | Boolean |
| achievements | Boolean |

------------------------------------------------

Indexes

notificationId
userId
createdAt
isRead
-----------------------------------------------------------
# Profile Database

## Collection: profiles

| Field | Type |
|---------|---------|
| userId | ObjectId |
| username | String |
| displayName | String |
| email | String |
| avatar | String |
| coverImage | String |
| bio | String |
| isPro | Boolean |
| joinedDate | Date |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection: player_stats

| Field | Type |
|---------|---------|
| userId | ObjectId |
| totalFriends | Number |
| lobbiesHosted | Number |
| watchHours | Number |

------------------------------------------------

## Collection: favorite_channels

| Field | Type |
|---------|---------|
| channelId | String |
| userId | ObjectId |
| channelName | String |
| category | String |
| imageUrl | String |

------------------------------------------------

## Collection: profile_activities

| Field | Type |
|---------|---------|
| activityId | String |
| userId | ObjectId |
| title | String |
| description | String |
| createdAt | Date |

------------------------------------------------

Indexes

userId
username
activityId


# Settings Database

## Collection

user_settings

| Field | Type |
|---------|---------|
| userId | ObjectId |
| username | String |
| email | String |
| isPrivateProfile | Boolean |
| is2FAEnabled | Boolean |
| theme | String |
| language | String |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection

notification_preferences

| Field | Type |
|---------|---------|
| userId | ObjectId |
| lobbyInvites | Boolean |
| chatMentions | Boolean |
| walletActivity | Boolean |
| marketingOffers | Boolean |

------------------------------------------------

## Collection

connected_accounts

| Field | Type |
|---------|---------|
| connectionId | String |
| userId | ObjectId |
| provider | String |
| accountEmail | String |
| connectedAt | Date |

------------------------------------------------

Indexes

userId
email
username

# Support Database

## Collection Name

support_tickets

| Field | Type |
|---------|---------|
| ticketId | String |
| userId | ObjectId |
| subject | String |
| category | String |
| description | String |
| priority | String |
| status | String |
| assignedAgent | String |
| createdAt | Date |
| updatedAt | Date |

------------------------------------------------

## Collection Name

faq_articles

| Field | Type |
|---------|---------|
| faqId | String |
| question | String |
| answer | String |
| category | String |
| views | Number |

------------------------------------------------

## Collection Name

support_chats

| Field | Type |
|---------|---------|
| chatId | String |
| userId | ObjectId |
| agentId | ObjectId |
| status | String |
| startedAt | Date |
| endedAt | Date |

------------------------------------------------

## Collection Name

documentation_articles

| Field | Type |
|---------|---------|
| docId | String |
| title | String |
| content | String |
| category | String |

------------------------------------------------

Indexes

ticketId
userId
status
category
createdAt




# Dashboard Database Design

Version: 1.0

Database:
PostgreSQL / MongoDB


---

# Main Tables


- live_events
- trending_content
- channels
- lobbies
- lobby_members
- user_activity


---

# Table: live_events


| Field | Type |
|---|---|
| id | UUID |
| title | VARCHAR |
| category | VARCHAR |
| viewers | INT |
| stream_url | TEXT |
| status | ENUM |
| created_at | TIMESTAMP |


Status:

- LIVE
- OFFLINE


---

# Table: trending_content


| Field | Type |
|---|---|
| id | UUID |
| content_id | UUID |
| views | INT |
| score | FLOAT |
| rank | INT |


---

# Table: channels


| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| quality | VARCHAR |
| stream_url | TEXT |
| status | BOOLEAN |


---

# Table: lobbies


| Field | Type |
|---|---|
| id | UUID |
| owner_id | UUID |
| name | VARCHAR |
| type | ENUM |
| private | BOOLEAN |
| created_at | TIMESTAMP |


Types:

- WATCH_PARTY
- GAMING
- SPORTS


---

# Table: lobby_members


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| user_id | UUID |
| joined_at | TIMESTAMP |


---

# Table: user_activity


| Field | Type |
|---|---|
| user_id | UUID |
| status | VARCHAR |
| activity | VARCHAR |
| updated_at | TIMESTAMP |


Example:


Online

Watching Manchester Derby


---

# Relationships


User

↓

Lobbies

↓

Members


Events

↓

Trending


---

# Indexes


- viewers
- status
- created_at
- user_id


---

# Security


- User Data Isolation
- Private Lobby Protection
- Access Validation


---

End of Database
# Sports Lounge Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- sports_matches
- sports_categories
- watch_parties
- party_members
- match_streams
- user_activity


---

# Table: sports_categories


| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| description | TEXT |


Examples:


Football

UFC

NBA


---

# Table: sports_matches


| Field | Type |
|---|---|
| id | UUID |
| category_id | UUID |
| title | VARCHAR |
| league | VARCHAR |
| status | ENUM |
| viewers | INT |
| start_time | TIMESTAMP |


Status:


LIVE

UPCOMING

FINISHED


---

# Table: match_streams


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| stream_url | TEXT |
| quality | VARCHAR |


Quality:

- HD
- 4K


---

# Table: watch_parties


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| owner_id | UUID |
| name | VARCHAR |
| type | ENUM |
| created_at | TIMESTAMP |


Type:


PUBLIC

PRIVATE


---

# Table: party_members


| Field | Type |
|---|---|
| id | UUID |
| party_id | UUID |
| user_id | UUID |
| joined_at | TIMESTAMP |


---

# Table: user_activity


| Field | Type |
|---|---|
| user_id | UUID |
| activity | VARCHAR |
| status | VARCHAR |
| updated_at | TIMESTAMP |


Example:


Watching Manchester Derby


---

# Relationships


Category

↓

Matches

↓

Streams


Match

↓

Watch Party

↓

Members


---

# Indexes


- status
- viewers
- category_id
- created_at


---

# Security


- Private Party Access
- User Validation
- Stream Protection


---

End of Database
# IPTV Network Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- iptv_screens
- iptv_lobbies
- iptv_channels
- lobby_channels
- lobby_members
- stream_logs


---

# Table: iptv_screens


| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| name | VARCHAR |
| position | INT |
| created_at | TIMESTAMP |


---

# Table: iptv_lobbies


| Field | Type |
|---|---|
| id | UUID |
| owner_id | UUID |
| name | VARCHAR |
| type | ENUM |
| created_at | TIMESTAMP |


Type:


PUBLIC

PRIVATE


---

# Table: iptv_channels


| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| category | VARCHAR |
| quality | VARCHAR |
| stream_url | TEXT |
| viewers | INT |
| status | BOOLEAN |


---

# Table: lobby_channels


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| channel_id | UUID |
| added_at | TIMESTAMP |


---

# Table: lobby_members


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| user_id | UUID |
| joined_at | TIMESTAMP |


---

# Table: stream_logs


| Field | Type |
|---|---|
| id | UUID |
| channel_id | UUID |
| user_id | UUID |
| started_at | TIMESTAMP |
| ended_at | TIMESTAMP |


---

# Relationships


User

↓

Screens


User

↓

Lobbies

↓

Channels


---

# Indexes


- user_id
- lobby_id
- category
- status


---

# Security


- Private Lobby Validation
- Stream Protection
- User Access Check


---

End Database
# Live Match Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- live_matches
- match_stats
- streams
- watch_parties
- chat_messages
- match_events


---

# Table: live_matches


| Field | Type |
|---|---|
| id | UUID |
| team_home | VARCHAR |
| team_away | VARCHAR |
| league | VARCHAR |
| score_home | INT |
| score_away | INT |
| minute | INT |
| status | ENUM |


Status:


LIVE

FINISHED

UPCOMING


---

# Table: streams


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| url | TEXT |
| quality | VARCHAR |
| token | TEXT |


Quality:


HD

4K UHD


---

# Table: match_stats


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| possession_home | INT |
| possession_away | INT |
| shots_home | INT |
| shots_away | INT |
| passes_home | INT |
| passes_away | INT |


---

# Table: watch_parties


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| owner_id | UUID |
| type | ENUM |


Type:


PUBLIC

PRIVATE


---

# Table: chat_messages


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| user_id | UUID |
| message | TEXT |
| created_at | TIMESTAMP |


---

# Table: match_events


| Field | Type |
|---|---|
| id | UUID |
| match_id | UUID |
| event_type | VARCHAR |
| minute | INT |
| created_at | TIMESTAMP |


Examples:


Goal

Yellow Card

Corner


---

# Relationships


Match

↓

Stream


Match

↓

Stats


Match

↓

Chat


Match

↓

Events


---

# Indexes


- match_id
- status
- created_at


---

# Security


- Chat Validation
- Stream Protection
- Access Control


---

End Database
# Watch Party Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- watch_lobbies
- lobby_members
- lobby_screens
- lobby_invites
- lobby_activity


---

# Table: watch_lobbies


| Field | Type |
|---|---|
| id | UUID |
| owner_id | UUID |
| name | VARCHAR |
| type | ENUM |
| created_at | TIMESTAMP |


Type:


PUBLIC

PRIVATE


---

# Table: lobby_members


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| user_id | UUID |
| role | VARCHAR |
| joined_at | TIMESTAMP |


Roles:


OWNER

MEMBER


---

# Table: lobby_screens


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| screen_id | UUID |
| position | INT |


---

# Table: lobby_invites


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| sender_id | UUID |
| receiver_id | UUID |
| status | ENUM |


Status:


PENDING

ACCEPTED

REJECTED


---

# Table: lobby_activity


| Field | Type |
|---|---|
| id | UUID |
| lobby_id | UUID |
| event | VARCHAR |
| created_at | TIMESTAMP |


Examples:


User Joined

Screen Changed


---

# Relationships


User

↓

Lobby

↓

Members


Lobby

↓

Screens


---

# Indexes


- owner_id
- lobby_id
- user_id
- created_at


---

# Security


- Access Validation
- Invite Permission
- Member Control


---

End Database
# Friends Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- users
- friendships
- friend_requests
- blocks
- user_presence


---

# Table: friendships


| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| friend_id | UUID |
| created_at | TIMESTAMP |


---

# Table: friend_requests


| Field | Type |
|---|---|
| id | UUID |
| sender_id | UUID |
| receiver_id | UUID |
| status | ENUM |
| created_at | TIMESTAMP |


Status:


PENDING

ACCEPTED

REJECTED


---

# Table: blocks


| Field | Type |
|---|---|
| id | UUID |
| blocker_id | UUID |
| blocked_id | UUID |
| created_at | TIMESTAMP |


---

# Table: user_presence


| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| status | ENUM |
| activity | VARCHAR |
| updated_at | TIMESTAMP |


Status:


ONLINE

OFFLINE


---

# Relationships


User

↓

Friends


User

↓

Requests


User

↓

Blocks


---

# Indexes


- user_id
- friend_id
- status
- created_at


---

# Security


- User Permission
- Privacy Control
- Block Validation


---

End Database
# Chat Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- channels
- channel_members
- messages
- voice_rooms
- message_reports


---

# Table: channels


| Field | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| type | ENUM |
| created_at | TIMESTAMP |


Type:


TEXT

VOICE


---

# Table: channel_members


| Field | Type |
|---|---|
| id | UUID |
| channel_id | UUID |
| user_id | UUID |
| joined_at | TIMESTAMP |


---

# Table: messages


| Field | Type |
|---|---|
| id | UUID |
| channel_id | UUID |
| user_id | UUID |
| message | TEXT |
| created_at | TIMESTAMP |


---

# Table: voice_rooms


| Field | Type |
|---|---|
| id | UUID |
| channel_id | UUID |
| user_id | UUID |
| joined_at | TIMESTAMP |


---

# Table: message_reports


| Field | Type |
|---|---|
| id | UUID |
| message_id | UUID |
| reporter_id | UUID |
| reason | TEXT |
| status | ENUM |


Status:


PENDING

REVIEWED

ACTIONED


---

# Relationships


User

↓

Messages


Channel

↓

Members


Channel

↓

Messages


---

# Indexes


- channel_id
- user_id
- created_at


---

# Security


- Permission Check
- Message Filter
- Rate Limit


---

End Database
# Wallet Database Design

Version: 1.0


Database:

PostgreSQL


---

# Main Tables


- wallets
- wallet_assets
- transactions
- swap_history
- wallet_addresses


---

# Table: wallets


| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| total_balance | DECIMAL |
| created_at | TIMESTAMP |


---

# Table: wallet_assets


| Field | Type |
|---|---|
| id | UUID |
| wallet_id | UUID |
| asset | VARCHAR |
| amount | DECIMAL |
| value_usd | DECIMAL |


Assets:


PGX

USDC


---

# Table: transactions


| Field | Type |
|---|---|
| id | UUID |
| wallet_id | UUID |
| type | ENUM |
| asset | VARCHAR |
| amount | DECIMAL |
| status | ENUM |
| created_at | TIMESTAMP |


Type:


DEPOSIT

WITHDRAW

SEND

SWAP


Status:


PENDING

SUCCESS

FAILED


---

# Table: swap_history


| Field | Type |
|---|---|
| id | UUID |
| wallet_id | UUID |
| from_asset | VARCHAR |
| to_asset | VARCHAR |
| amount | DECIMAL |
| created_at | TIMESTAMP |


---

# Table: wallet_addresses


| Field | Type |
|---|---|
| id | UUID |
| wallet_id | UUID |
| address | TEXT |
| network | VARCHAR |


---

# Relationships


User

↓

Wallet


Wallet

↓

Assets


Wallet

↓

Transactions


---

# Indexes


- user_id
- wallet_id
- transaction_id
- created_at


---

# Security


- Encrypt Address
- Transaction Logs
- Access Control


---

End Database

