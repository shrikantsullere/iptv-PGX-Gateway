# Overview

# Dashboard Overview

## Module
Dashboard

## Role
Super Admin (SA)
Owner

## Purpose
Dashboard PGX Gateway ka central command center hai jahan Super Admin platform ki overall health, revenue, merchants aur transactions monitor kar sakta hai.

## Features

- Total Gateway Revenue
- Today's Volume
- Active Merchants
- Failed Transactions Rate
- Revenue Growth Analytics
- Processor Distribution
- System Status Monitoring
- Refresh Dashboard Data

## Dashboard Widgets

1. Revenue Card
2. Volume Card
3. Merchant Card
4. Failed Transaction Card
5. Revenue Growth Chart
6. Processor Distribution Chart
7. System Status Indicator


# Merchants Overview

## Module
Merchants

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Merchants module allows administrators to manage all merchants registered on the PGX Gateway platform. Admins can monitor merchant performance, subscription plans, revenue generation, country information, and operational status.

## Features

- View all merchants
- Search merchants
- Filter merchants
- Add new merchant
- Edit merchant details
- Suspend merchant
- Activate merchant
- Export merchant data
- View merchant revenue
- Manage subscriptions
- View country information

## Merchant Information

- Merchant ID
- Company Name
- Subscription Plan
- Revenue
- Status
- Country
- Created Date

## Merchant Status

- Active
- Suspended
- Pending
- Disabled

# Transactions Overview

## Module
Transactions

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Transactions module provides a centralized enterprise ledger for monitoring, tracking, managing, and auditing all payment transactions processed across merchants, customers, wallets, and payment processors.

## Features

- Global Transaction Monitoring
- Advanced Transaction Search
- Transaction Filtering
- Transaction Status Tracking
- Merchant Transaction Analytics
- Processor Analytics
- Export Transactions
- Transaction Investigation
- Refund Tracking
- Failed Transaction Analysis

## Transaction Information

- Transaction ID
- Timestamp
- Merchant
- Customer
- Amount
- Currency
- Processor
- Gateway Fee
- Status

## Status Types

- Pending
- Completed
- Failed
- Refunded
- Cancelled


# Revenue Overview

## Module
Revenue

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Revenue module provides a complete financial overview of PGX Gateway earnings, transaction volumes, subscription income, settlement balances, and revenue sources.

## Features

- Total Processing Volume
- Gateway Fee Revenue
- Subscription Revenue
- Pending Settlements
- Revenue Growth Analytics
- Revenue Source Breakdown
- Revenue Reporting
- Revenue Export

## Revenue Metrics

- Processing Volume
- Gateway Fees
- Subscription Income
- White Label Revenue
- FX Conversion Revenue
- Pending Settlement Amounts

## Revenue Sources

- Gateway Transaction Fees
- Enterprise Subscriptions
- White Label Setup Fees
- FX Conversion Fees


# Settlements Overview

## Module
Settlements

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Settlements module manages all fiat and cryptocurrency payouts from PGX Gateway to merchants. It provides visibility into pending, processing, completed, and failed settlement transactions.

## Features

- Settlement Queue Management
- Merchant Payout Tracking
- Fiat Settlements
- Crypto Settlements
- Settlement Status Monitoring
- Settlement Analytics
- Settlement Review System
- Settlement Export

## Settlement Types

- Wire Transfer
- ACH
- SEPA
- SWIFT
- Crypto On-Chain

## Status Types

- Pending
- Processing
- Completed
- Failed

## Dashboard Metrics

- Pending Volume
- Processing Settlements
- Completed Today
- Failed Settlements

# Wallets Overview

## Module
Wallets

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Wallets module manages PGX Gateway treasury operations, liquidity management, hot wallets, cold storage wallets, and blockchain asset reserves across multiple networks.

## Features

- Treasury Management
- Cold Storage Management
- Hot Wallet Management
- Liquidity Monitoring
- Multi-Chain Wallet Tracking
- Wallet Balance Monitoring
- Wallet Transfers
- Treasury Analytics
- Wallet Security Monitoring

## Wallet Types

- Cold Storage Wallet
- Hot Wallet
- Treasury Wallet
- Reserve Wallet

## Supported Networks

- Ethereum
- Polygon
- Tron
- Bitcoin
- Solana
- BNB Chain

## Dashboard Metrics

- Cold Storage AUM
- Hot Wallet Liquidity
- Treasury Balance
- Network Distribution


# Payment Processors Dashboard Overview

## Module
Payment Processors → Dashboard

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Payment Processors Dashboard provides centralized monitoring and management of all integrated payment processors, routing nodes, approval rates, transaction volume distribution, and processor health metrics.

## Features

- Processor Health Monitoring
- Live Volume Processing
- Active Node Monitoring
- Approval Rate Analytics
- Critical Alert Management
- Processor Performance Tracking
- Download Reports
- Configure Processing Nodes

## Supported Processors

- Stripe
- MoonPay
- Coinbase Commerce
- LocalGate
- Custom Integrations

## Dashboard Metrics

- Total 24h Volume
- Active Nodes
- Global Approval Rate
- Critical Alerts
- Processor Health Index
- Node Performance

# Failover Monitor Overview

## Module
Payment Processors → Failover Monitor

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Failover Monitor continuously monitors processor health, latency, error rates, node availability, and routing performance. It automatically redirects traffic to backup processors when failures or degradation occur.

## Features

- Real-Time Node Monitoring
- Live Latency Tracking
- Automatic Failover Engine
- Routing Rule Management
- Trigger Configuration
- Incident Tracking
- Email Alert Notifications
- Processor Recovery Detection
- Failover Analytics

## Monitored Processors

- Stripe
- MoonPay
- Coinbase
- LocalGate
- Custom Processors

## Dashboard Metrics

- Node Latency
- Node Load
- Processor Health
- Active Monitors
- Active Triggers
- Failover Events
- Alert Status

# Fee Split Engine Overview

## Module
Payment Processors → Fee Split Engine

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Fee Split Engine manages how transaction fees are distributed among merchants, payment processors, gateway revenue, and network costs.

This module allows administrators to define markup rules, processor fee structures, and transaction-based pricing strategies.

## Features

- Fee Distribution Management
- Processor Fee Configuration
- Gateway Revenue Management
- Merchant Share Calculation
- Network Fee Allocation
- Dynamic Markup Rules
- Add Fee Rule
- Edit Fee Rule
- Fee Analytics

## Fee Components

- Merchant Share
- Gateway Revenue
- Processor Fee
- Network Fee

## Rule Types

- Crypto Transactions
- Fiat Domestic
- Fiat International
- High Risk Merchants
- Chargebacks
- Custom Transaction Types

## Actions

- Add Rule
- Edit Rule
- Save Configuration

# Geo Routing Overview

## Module
Payment Processors → Geo Routing

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Geo Routing module controls how payment traffic is routed based on customer location, country, region, and processor priority.

It ensures optimal processor selection, lower transaction costs, better approval rates, and regional compliance.

## Features

- Regional Routing Rules
- Country Based Routing
- Processor Priority Management
- Primary / Secondary / Fallback Routing
- Active & Draft Rules
- Processor Assignment
- Routing Analytics
- Regional Coverage Management
- Add Routing Rule
- Edit Routing Rule

## Routing Priorities

- Priority 1 (Primary)
- Priority 2 (Secondary)
- Priority 3 (Fallback)

## Regional Coverage

- North America
- Europe
- Asia Pacific
- Middle East
- Latin America
- Africa

## Supported Actions

- Create Routing Rule
- Edit Routing Rule
- Activate Rule
- Disable Rule
- Change Processor Priority

# Merchant Rules Overview

## Module
Payment Processors → Merchant Rules

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Merchant Rules module allows administrators to override global processing fees and create custom pricing agreements for individual merchants.

This module is commonly used for enterprise contracts, negotiated pricing, strategic partnerships, and high-volume merchants.

## Features

- Merchant Fee Overrides
- Custom Percentage Fees
- Fixed Transaction Fees
- Merchant Pricing Profiles
- Standard Fee Management
- Enterprise Pricing Rules
- Override Audit Trail
- Fee Comparison Dashboard

## Supported Merchant Types

- Starter
- Pro
- Enterprise

## Dashboard Metrics

- Total Merchants
- Custom Fee Rules
- Standard Fee Merchants
- Global Base Fee

## Actions

- Search Merchant
- Override Fee
- Edit Fee Override
- Remove Override
- View Fee History


# Settlement Engine Overview

## Module
Payment Processors → Settlement Engine

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Settlement Engine manages processor balances, settlement batches, automated settlement schedules, payout execution, and settlement reconciliation.

It ensures processor funds are transferred efficiently to designated treasury or bank accounts.

## Features

- Processor Balance Management
- Auto Settlement Rules
- Manual Settlement Execution
- Settlement Scheduling
- Multi-Processor Settlements
- Settlement History
- Settlement Monitoring
- Settlement Reporting
- Settlement Reconciliation

## Supported Actions

- Settle Now
- Configure Auto Settlement Rules
- Modify Settlement Schedule
- View Settlement History

## Supported Settlement Methods

- Wire Transfer
- SEPA
- ACH
- Crypto Transfer
- Internal Treasury Transfer

## Dashboard Metrics

- Available Balance
- Pending Balance
- Total Settled
- Settlement Volume
- Settlement Status

# Revenue Wallet Overview

## Module
Payment Processors → Revenue Wallet

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Revenue Wallet module manages the gateway's accumulated revenue generated from processing fee markups, subscriptions, settlement fees, and other processor-related earnings.

It provides complete visibility into revenue balances, earnings trends, withdrawals, and revenue source allocation.

## Features

- Revenue Pool Monitoring
- Revenue Withdrawal Management
- Monthly Earnings Analytics
- Revenue Source Tracking
- Withdrawal History
- Revenue Reporting
- Revenue Trend Analysis
- Revenue Distribution Monitoring

## Dashboard Metrics

- Total Revenue Pool
- Monthly Revenue
- Average Daily Revenue
- Total Withdrawn
- Revenue Sources

## Supported Actions

- Withdraw Funds
- View Revenue History
- View Earnings Analytics
- Generate Reports

## Withdrawal Destinations

- Bank Account
- Cold Wallet
- Treasury Wallet
- Settlement Account

# Processor Logs Overview

## Module
Payment Processors → Logs

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Processor Logs module provides complete visibility into processor API activity, transaction requests, responses, status codes, webhook events, and processor communication history.

This module is used for debugging, monitoring, troubleshooting, compliance investigations, and processor performance analysis.

## Features

- API Request Logging
- API Response Logging
- Transaction Tracking
- Webhook Logging
- Status Code Analysis
- Latency Monitoring
- Processor Activity Monitoring
- Log Search & Filtering
- CSV Export
- Error Investigation

## Dashboard Metrics

- Total Requests
- Success Requests (2xx)
- Client Errors (4xx)
- Server Errors (5xx)

## Supported Processors

- Stripe US
- Stripe EU
- MoonPay
- Coinbase
- LocalGate

## Actions

- Refresh Logs
- Search Logs
- Filter Logs
- Export Logs
- View Log Details

# Processor Reports Overview

## Module
Payment Processors → Reports

## Role Access
- Super Admin (SA)
- Owner

## Purpose

The Processor Reports module provides advanced analytics and performance reporting across all payment processors. It enables administrators to compare processor performance, approval rates, refunds, chargebacks, and transaction efficiency.

## Features

- Processor Performance Reports
- Approval Rate Analytics
- Refund Analysis
- Chargeback Analysis
- Transaction Volume Reports
- Historical Trends
- Date Range Selection
- PDF Report Export
- Comparative Analytics

## Dashboard Metrics

- Average Success Rate
- Total Transactions
- Average Chargeback Rate
- Average Refund Rate

## Available Reports

- Approval Rate Trends
- Chargeback Analysis
- Refund Summary
- Node Uptime Statistics
- Processor Performance Comparison

## Actions

- Select Date Range
- Export PDF
- Download Reports

# KYC Dashboard Overview

## Module
KYC & Compliance → KYC Dashboard

## Role Access
- Super Admin (SA)
- Owner
- Compliance Officers

## Purpose

The KYC Dashboard provides a centralized onboarding and verification management system for merchants and individual users.

It allows compliance teams to review submissions, verify documents, assess risks, and approve or reject onboarding requests.

## Features

- KYC Submission Monitoring
- Verification Funnel Analytics
- Approval Rate Tracking
- Risk Assessment
- Review Queue Management
- Document Verification
- Approve / Reject Applications
- KYC Reporting
- Compliance Analytics

## Entity Types

- Individual
- Business

## Risk Levels

- Low
- Medium
- High

## Verification Status

- Pending
- Under Review
- Approved
- Rejected

## Dashboard Metrics

- Total Submissions
- Approved Applications
- Pending Reviews
- Rejected Applications
- Approval Rate

# AML Monitoring Overview

## Module
KYC & Compliance → AML Monitoring

## Role Access

- Super Admin (SA)
- Owner
- Compliance Officer
- AML Investigator

## Purpose

The AML Monitoring module detects suspicious financial activities, generates AML alerts, tracks investigations, and supports regulatory compliance workflows.

The system automatically flags transactions, merchants, and individuals that match anti-money laundering risk patterns.

## Features

- AML Alert Monitoring
- Suspicious Activity Detection
- Case Investigation
- Entity Flagging
- Escalation Management
- Risk Classification
- Compliance Notes
- Alert Resolution Tracking
- AML Analytics

## Alert Types

- Structuring
- Layering
- Smurfing
- Rapid Movement
- Unusual Volume
- Sanctions Match
- High Risk Geography

## Severity Levels

- Low
- Medium
- High
- Critical

## Status Types

- Open
- Investigating
- Escalated
- Resolved

## Dashboard Metrics

- Open Alerts
- Investigating Cases
- Resolved Today
- Flagged Entities


# Compliance Reports Overview

## Module
KYC & Compliance → Reports

## Role Access

- Super Admin (SA)
- Owner
- Compliance Officer
- AML Investigator

## Purpose

The Compliance Reports module provides regulatory reporting, KYC performance analytics, AML statistics, filing management, and compliance trend monitoring.

It enables organizations to generate reports required for audits, regulatory submissions, and internal compliance reviews.

## Features

- KYC Analytics
- AML Statistics
- Regulatory Filing Tracking
- Compliance Performance Metrics
- Date Range Selection
- PDF Report Export
- Filing Status Monitoring
- Trend Analysis
- Compliance Dashboard

## Available Reports

- KYC Approval Summary
- AML Alert Report
- Regulatory Filing Index
- Risk Score Overview
- SAR Reports
- Quarterly AML Reports

## Dashboard Metrics

- KYC Approval Rate
- Average Processing Time
- AML Alert Resolution Rate
- Regulatory Filings Submitted

## Actions

- Select Date Range
- Export Report
- Download PDF

# Activity Timeline Overview

## Module
KYC & Compliance → Activity Timeline

## Role Access

- Super Admin (SA)
- Owner
- Compliance Officer
- AML Investigator

## Purpose

The Activity Timeline provides a chronological audit trail of all compliance-related activities across the platform.

This module centralizes KYC actions, AML alerts, regulatory filings, document reviews, approvals, rejections, escalations, and system-generated compliance events.

## Features

- Real-Time Activity Feed
- KYC Event Tracking
- AML Event Tracking
- Compliance Audit Trail
- Regulatory Filing Events
- System Event Monitoring
- Event Search
- Event Filtering
- Timeline Analytics

## Event Categories

- KYC Submitted
- KYC Approved
- KYC Rejected
- AML Alert Raised
- AML Alert Resolved
- AML Escalated
- Regulatory Filing
- Document Expiry Warning
- System Events

## Dashboard Metrics

- Events Today
- KYC Events
- AML Events
- System Events

## Actions

- Search Events
- Filter Events
- View Event Details
- Export Timeline

# Risk Dashboard Overview

## Module
Fraud & Risk → Risk Dashboard

## Role Access

- Super Admin (SA)
- Owner
- Risk Analyst
- Fraud Investigator

## Purpose

The Risk Dashboard provides a centralized view of platform-wide fraud threats, risk scoring, anomaly detection, blocked entities, and active incidents.

The module continuously evaluates transactions, merchants, customers, processors, and API activities to identify suspicious behavior and assign risk scores.

## Features

- Real-Time Risk Monitoring
- Fraud Detection Engine
- Risk Score Analytics
- Active Incident Tracking
- Threat Intelligence Dashboard
- Risk Rule Configuration
- Entity Investigation
- Anomaly Detection
- Platform Risk Scoring

## Risk Categories

- Velocity Abuse
- Geo Anomaly
- Chargeback Spike
- AML Watchlist
- Identity Risk
- Unusual Volume
- Fraud Attempts

## Dashboard Metrics

- Platform Risk Score
- Active Threats
- Blocked Today
- Active Rules

## Actions

- Configure Rules
- View Active Incidents
- Investigate Entity
- Review Risk Cases

# AI Fraud Center Overview

## Module
Fraud & Risk → Fraud Center

## Role Access

- Super Admin (SA)
- Owner
- Fraud Analyst
- Risk Analyst

## Purpose

The AI Fraud Center provides centralized fraud monitoring, AI-powered fraud detection, suspicious transaction analysis, and manual fraud investigation workflows.

The system continuously scans platform activity and flags entities, accounts, merchants, emails, IP addresses, wallets, and API keys that match fraud patterns.

## Features

- AI Fraud Detection
- Fraud Alert Queue
- Manual Fraud Review
- Entity Blocking
- Fraud Analytics
- Transaction Pattern Analysis
- Fraud Severity Classification
- Fraud Investigation Notes
- ML Model Monitoring

## Fraud Types

- Card Testing
- Account Takeover
- Friendly Fraud
- Refund Abuse
- Identity Theft
- Velocity Abuse
- Chargeback Fraud

## Severity Levels

- Low
- Medium
- High
- Critical

## Dashboard Metrics

- Active Fraud Alerts
- Blocked Today
- Fraud Prevented
- ML Accuracy

## Actions

- Review Alert
- Block Entity
- Mark Safe
- Add Analyst Notes

# Blocked Entities Overview

## Module
Fraud & Risk → Blocked Entities

## Role Access

- Super Admin (SA)
- Owner
- Fraud Analyst
- Compliance Officer

## Purpose

The Blocked Entities module manages all entities restricted from accessing or using the platform due to fraud, AML concerns, account compromise, policy violations, or suspicious activity.

It serves as the central blacklist repository for IP addresses, merchants, email addresses, API keys, wallets, and user accounts.

## Features

- Entity Blocking
- Manual Block Creation
- Entity Review
- Policy Management
- Severity Classification
- Block History
- Search & Filtering
- Fraud Intelligence Integration
- Entity Investigation

## Supported Entity Types

- IP Address
- Email
- Merchant
- API Key
- Wallet Address
- User Account

## Severity Levels

- Medium
- High
- Critical

## Status Types

- Active
- Reviewing
- Unblocked

## Dashboard Metrics

- Total Blocked
- Blocked IPs
- Blocked Emails
- Under Review

## Actions

- Block Entity
- View Entity Details
- Edit Policy
- Unblock Entity

# Case Management Overview

## Module
Fraud & Risk → Case Management

## Role Access

- Super Admin (SA)
- Owner
- Fraud Analyst
- Compliance Officer
- Risk Investigator

## Purpose

The Case Management module is used to create, assign, track, investigate, escalate, and resolve fraud, AML, KYC, sanctions, and compliance-related investigations.

This module provides a centralized investigation workspace for all platform risk and compliance cases.

## Features

- Open New Case
- Case Assignment
- Investigation Timeline
- Notes Management
- Escalation Workflow
- Case Resolution
- Priority Management
- Investigator Tracking
- Audit Trail

## Case Types

- AML Investigation
- Fraud Investigation
- KYC Dispute
- Chargeback Dispute
- Account Takeover
- Sanctions Screening
- Compliance Review

## Priority Levels

- Low
- Medium
- High
- Critical

## Status Types

- Open
- Active
- Escalated
- Resolved

## Dashboard Metrics

- Total Cases
- Open Cases
- Escalated Cases
- Resolved Cases

## Actions

- Open New Case
- View Case Details
- Save Note
- Mark Resolved

# Fee Management Overview

## Module
Fee Management

## Role Access

- Super Admin (SA)
- Owner
- Finance Manager

## Purpose

The Fee Management module allows administrators to configure platform-wide processing fees, processor fees, transaction markups, and custom merchant fee rules.

It acts as the central pricing engine for the PGX Gateway platform.

## Features

- Global Fee Configuration
- Processor Fee Management
- Create Fee Rules
- Merchant Fee Overrides
- White Label Markups
- Fixed Transaction Fees
- Percentage-Based Fees
- Fee Audit Tracking

## Fee Categories

- Base Platform Fee
- Fixed Transaction Fee
- White Label Markup
- Processor Fee
- Merchant Custom Fee

## Supported Processors

- MoonPay
- Banxa
- Transak
- Stripe
- Coinbase
- LocalGate

## Dashboard Metrics

- Base Platform Fee
- Fixed Fee
- White Label Markup
- Processor Fee Configuration

## Actions

- Create Rule
- Save Gateway Fees
- Save Processor Fees
- Update Fee Configuration

# Subscription Management Overview

## Module
Subscriptions

## Role Access

- Super Admin (SA)
- Owner
- Billing Manager

## Purpose

The Subscription Management module allows administrators to create, edit, delete, and manage merchant subscription plans.

Plans define pricing tiers, transaction fee percentages, billing cycles, platform features, support levels, and white-label capabilities.

## Features

- Create Subscription Plans
- Edit Existing Plans
- Delete Plans
- Pricing Configuration
- Feature Management
- Billing Cycle Management
- Transaction Fee Configuration
- Theme Customization
- Merchant Plan Assignment

## Plan Types

- Starter
- Business
- Enterprise
- Custom Plans

## Dashboard Metrics

- Active Plans
- Monthly Revenue
- Plan Distribution
- Subscription Growth

## Actions

- Create New Plan
- Edit Plan
- Delete Plan
- Save Plan Configuration


# Countries Management Overview

## Module
Countries

## Role Access

- Super Admin (SA)
- Owner
- Compliance Manager

## Purpose

The Countries module manages all supported countries, regional classifications, sanctions restrictions, payment availability, and jurisdiction compliance settings across the PGX Gateway platform.

It determines where merchants can operate and which payment services are available based on geographic regulations.

## Features

- Country Management
- Regional Mapping
- Compliance Restrictions
- Sanction Management
- Country Search
- Add Region
- Edit Region
- Delete Region
- Merchant Availability Tracking

## Country Status

- Active
- Restricted
- Sanctioned
- Disabled

## Supported Regions

- North America
- South America
- Europe
- Asia
- Africa
- Middle East
- Oceania

## Dashboard Metrics

- Supported Countries
- Sanctioned Countries
- High Risk Regions

## Actions

- Add Region
- Edit Region
- Delete Region

# Currencies & FX Overview

## Module
Currencies

## Role Access

- Super Admin (SA)
- Owner
- Treasury Manager
- Finance Manager

## Purpose

The Currencies & FX module manages supported fiat and cryptocurrency assets, exchange rates, FX conversions, and conversion fee configurations.

The module acts as the central currency registry used across payments, settlements, wallets, and processor integrations.

## Features

- Currency Management
- Fiat Currency Support
- Crypto Asset Support
- FX Rate Synchronization
- Asset Creation
- Conversion Fee Management
- Exchange Rate Monitoring
- Currency Search
- Status Management

## Asset Types

- Fiat
- Crypto

## Asset Status

- Primary
- Active
- Disabled

## Dashboard Metrics

- Supported Assets
- Live Exchange Rates
- Conversion Fees
- FX Synchronization Status

## Actions

- Sync Rates
- Add Asset
- Update Exchange Rates
- Manage Conversion Fees

# API Management Overview

## Module
API Management

## Role Access

- Super Admin (SA)
- Owner
- DevOps Admin
- Integration Manager

## Purpose

The API Management module provides centralized control of all Super Admin API credentials used by external systems and platform integrations.

These API keys provide gateway-wide access and must be managed with strict security controls.

## Features

- Generate API Keys
- Sandbox Environment Keys
- Production Environment Keys
- API Usage Monitoring
- Key Rotation
- Key Revocation
- Access Auditing
- Security Monitoring

## Dashboard Metrics

- Monthly API Calls
- Active API Keys
- Production Keys
- Sandbox Keys

## Environments

- Sandbox
- Production

## Actions

- Generate New Key
- Revoke Key
- Rotate Key
- View Usage

# Global Webhooks Overview

## Module
Webhooks

## Role Access

- Super Admin (SA)
- Owner
- Integration Manager
- DevOps Team

## Purpose

The Global Webhooks module manages system-wide event delivery to external applications and services.

It allows administrators to register webhook endpoints, monitor delivery status, retry failed requests, and track event streams generated by the PGX Gateway platform.

## Features

- Webhook Endpoint Management
- Event Subscription
- Delivery Tracking
- Failure Monitoring
- Retry Queue
- Secret Key Management
- Event Filtering
- Delivery Logs

## Supported Events

- merchant.created
- merchant.updated
- transaction.created
- transaction.failed
- transaction.completed
- settlement.processed
- settlement.failed
- processor.failover
- kyc.approved
- kyc.rejected

## Dashboard Metrics

- Active Endpoints
- Deliveries (24h)
- Failure Rate
- Recent Deliveries

## Actions

- Add Endpoint
- Edit Endpoint
- Disable Endpoint
- Retry Delivery
- View Logs

# System Reports & Analytics Overview

## Module
Reports

## Role Access

- Super Admin (SA)
- Owner
- Finance Manager
- Operations Manager

## Purpose

The Reports module provides centralized reporting and analytics across the PGX Gateway platform.

Administrators can generate financial, operational, compliance, transaction volume, settlement, tax, and profitability reports.

## Features

- Report Generation
- Report Downloads
- PDF Export
- Financial Reporting
- Tax Reporting
- Revenue Analytics
- Volume Analytics
- Historical Report Storage
- Date Range Filtering

## Report Types

- Gateway P&L
- Global Tax Liability
- Quarterly Volume
- Revenue Report
- Merchant Analytics
- Settlement Report
- Processor Performance Report

## Dashboard Metrics

- Total Processed Volume (YTD)
- Generated Reports
- Financial Reports
- Tax Reports

## Actions

- Generate New Report
- Download PDF
- Filter Reports

# White Label Approvals Overview

## Module
White Label

## Role Access

- Super Admin (SA)
- Owner
- Enterprise Success Team
- Compliance Team

## Purpose

The White Label module manages enterprise merchant requests for custom domains, branded payment pages, SSL certificates, and white-label gateway deployments.

Super Admins review, approve, reject, and monitor white-label configurations.

## Features

- Domain Approval Workflow
- SSL Certificate Management
- White Label Provisioning
- Enterprise Branding Review
- Domain Validation
- Approval Tracking
- Rejection Workflow
- Deployment Monitoring

## Dashboard Metrics

- Approved Domains
- Pending Reviews
- Rejected Requests
- SSL Status

## SSL Status

- Active
- Provisioning
- Failed
- Expired

## Approval Status

- Approved
- Pending Review
- Rejected

## Actions

- Approve Request
- Reject Request
- View Details
- Provision SSL

# Notifications Overview

## Module
Notifications

## Role Access

- Super Admin (SA)
- Owner
- Operations Team
- Support Team

## Purpose

The Notifications module allows administrators to send platform-wide announcements, alerts, maintenance notices, feature updates, and operational broadcasts to merchants.

This module serves as the central communication hub for the PGX Gateway platform.

## Features

- Create Broadcast
- Send Global Notifications
- Audience Targeting
- Notification Categories
- Broadcast History
- Delivery Tracking
- Merchant Alerts
- System Announcements

## Categories

- System
- Warning
- Feature
- Security
- Maintenance

## Target Audience

- All Merchants
- Enterprise Only
- Business Plan
- Starter Plan
- Specific Merchants

## Dashboard Metrics

- Total Broadcasts
- Active Campaigns
- Delivered Notifications
- Failed Deliveries

## Actions

- New Broadcast
- Send Broadcast
- View History
- Archive Broadcast

# Global Support Desk Overview

## Module
Support

## Role Access

- Super Admin (SA)
- Owner
- Support Manager
- Support Agent

## Purpose

The Global Support Desk module manages merchant support tickets, technical escalations, billing issues, API support requests, settlement disputes, and operational incidents.

This module provides centralized ticket management across the entire PGX Gateway ecosystem.

## Features

- Ticket Management
- Merchant Support
- Technical Escalations
- Settlement Issue Tracking
- Billing Support
- Ticket Assignment
- Priority Management
- Response Time Monitoring
- Resolution Tracking

## Ticket Status

- Open
- In Progress
- Resolved
- Closed
- Escalated

## Priority Levels

- Low
- Medium
- High
- Critical

## Dashboard Metrics

- Open Tickets
- In Progress Tickets
- Resolved Tickets
- Average Response Time

## Actions

- View Ticket
- Assign Ticket
- Update Status
- Add Internal Notes
- Escalate Ticket
- Close Ticket

# Immutable Audit Logs Overview

## Module
Audit Logs

## Role Access

- Super Admin (SA)
- Owner
- Compliance Officer
- Security Team

## Purpose

The Audit Logs module provides a complete immutable history of all actions performed within the PGX Gateway platform.

Every administrative action, configuration change, login event, approval, deletion, and security activity is permanently recorded for compliance and forensic investigation.

## Features

- Immutable Activity Tracking
- Security Event Logging
- Administrator Activity Monitoring
- IP Address Tracking
- Configuration Change History
- Compliance Reporting
- Search & Filtering
- Export Audit Records

## Action Types

- Security
- Config
- Operation
- Access
- System
- Compliance

## Dashboard Metrics

- Total Audit Events
- Security Events
- Configuration Changes
- Login Activities

## Actions

- View Log Details
- Search Logs
- Filter Logs
- Export Logs


![alt text](image.png)


# Global Settings Overview

## Module
Settings

## Purpose

The Settings module allows Super Administrators to manage platform-wide operational, security, maintenance, and environment configurations.

These settings affect all merchants, processors, APIs, and internal staff across the PGX Gateway ecosystem.

## Features

- Maintenance Mode
- Sandbox Environment Control
- Force 2FA Policy
- IP Whitelisting
- Global Configuration Management
- Security Enforcement
- System Toggles
- Audit Tracking

## Sections

### System Operations

- Maintenance Mode
- Sandbox Environment

### Security Policies

- Force 2FA for Admins
- Strict IP Whitelisting

## Access

- Super Admin
- Owner

## Actions

- Save Configuration
- Update Security Policies
- Update System Operations

Project Introduction

Purpose

Merchant Dashboard Goals

Business Objectives

Merchant Flow

Roles

Permissions

Modules

Dashboard Overview

Transaction Flow

Wallet Flow

Settlement Flow

Revenue Flow

Notification Flow

Security Overview

Technology Stack

Future Scalability

Microservice Planning

High Level Architecture

System Components

User Journey

Merchant Lifecycle

Folder Structure Overview






# Transactions Module Overview

## Module Purpose

## Features

## User Roles

## Transaction Lifecycle

## Transaction Types

## Status Flow

## Search & Filters

## Dashboard Components

## Integrations

## Security

## Performance

## Future Scope
# Deposits Module Overview

Version: 1.0

Module: Merchant Dashboard → Deposits

---

## Overview

The Deposits module allows merchants to receive cryptocurrency payments securely. It generates unique wallet addresses, tracks blockchain confirmations, updates deposit status in real-time, and automatically credits merchant wallets after successful confirmation.

This module supports multiple cryptocurrencies and blockchain networks with complete transaction history, search, filters, and audit logs.

---

## Objectives

- Receive Crypto Payments
- Generate Deposit Address
- Track Blockchain Confirmations
- Auto Credit Merchant Wallet
- Real-Time Deposit Status
- Deposit History
- Blockchain Verification
- Export Deposit Records

---

## Supported Assets

- BTC
- ETH
- USDT
- USDC
- BNB
- MATIC
- TRX

---

## Supported Networks

- Bitcoin
- Ethereum (ERC20)
- Tron (TRC20)
- Polygon
- BNB Smart Chain (BEP20)
- Solana (Future)

---

## Deposit Status

- Pending
- Confirming
- Confirmed
- Failed
- Expired

---

## Merchant Features

- Generate Deposit Address
- View Deposit History
- Search Deposits
- Filter Deposits
- Copy Wallet Address
- View Transaction Hash
- View Network
- View Blockchain Confirmations
- Export Deposit History

---

## Dashboard Components

- Total Deposits
- Today's Deposits
- Pending Deposits
- Confirmed Deposits
- Failed Deposits
- Total Deposit Amount
- Recent Deposits

---

## Search

Search by

- Deposit ID
- Transaction Hash
- Wallet Address
- Asset
- Network

---

## Filters

- Asset
- Network
- Status
- Date Range
- Amount

---

## Integrations

- Blockchain Node
- Wallet Service
- Notification Service
- Merchant Wallet
- Audit Service

---

## Security

- Unique Deposit Address
- Address Validation
- Blockchain Verification
- Audit Logging
- JWT Authentication

---

End of Overview
# Withdrawals Module Overview

Version: 1.0

Module: Merchant Dashboard → Withdrawals

---

# Overview

The Withdrawals module allows merchants to transfer funds from their PGX Wallet to external crypto wallets or bank accounts. It securely manages payout requests, validates balances, calculates fees, processes transactions, and tracks withdrawal status.

The module supports both **Crypto Withdrawals** and **Fiat Bank Transfers** with complete audit logging and real-time status tracking.

---

# Objectives

- Secure Fund Withdrawal
- Crypto & Fiat Payouts
- Wallet Balance Validation
- Automatic Fee Calculation
- Real-Time Status Tracking
- Transaction History
- Export Reports
- Notification System

---

# Supported Withdrawal Methods

### Crypto

- USDT
- USDC
- BTC
- ETH
- BNB

Supported Networks

- TRC20
- ERC20
- Polygon
- BEP20
- Bitcoin

---

### Fiat

- ACH Transfer
- Bank Wire
- SWIFT
- Local Bank Transfer

---

# Withdrawal Status

- Draft
- Pending
- Processing
- Completed
- Failed
- Cancelled
- Rejected

---

# Merchant Features

- Request Payout
- Select Withdrawal Method
- Enter Wallet / Bank Details
- View Estimated Fees
- View Withdrawal History
- Search Withdrawals
- Filter Withdrawals
- Export Reports

---

# Dashboard Widgets

- Available Balance
- Total Withdrawals
- Pending Withdrawals
- Completed Withdrawals
- Failed Withdrawals
- Total Fees
- Recent Payouts

---

# Search

Search by

- Withdrawal ID
- Wallet Address
- Bank Account
- Transaction Hash
- Reference Number

---

# Filters

- Status
- Method
- Network
- Date Range
- Amount

---

# Integrations

- Wallet Service
- Banking API
- Blockchain Node
- Notification Service
- Audit Service
- KYC/AML Service

---

# Security

- JWT Authentication
- OTP / 2FA
- Balance Validation
- Wallet Address Validation
- Audit Logs
- Fraud Detection

---

End of Overview
# Wallet Management Overview

## Module

Merchant Dashboard → Wallet Management

Version: 1.0

---

# Overview

Wallet Management module allows merchants to manage all supported crypto assets from a single dashboard. Merchants can view balances, add new assets, monitor portfolio performance, and track asset value in real time.

Wallets are directly connected with Deposits, Withdrawals, Transactions, and Settlement modules.

---

# Objectives

- Manage Multiple Assets
- View Wallet Balance
- Portfolio Tracking
- Real-time Asset Value
- Add New Assets
- Wallet Activity
- Secure Wallet Operations

---

# Supported Assets

- BTC
- ETH
- USDT
- USDC
- BNB
- SOL
- XRP
- ADA
- MATIC
- TRX

---

# Supported Networks

- Bitcoin
- ERC20
- TRC20
- BEP20
- Polygon
- Solana

---

# Merchant Features

- View Portfolio
- Add Asset
- View Asset Balance
- View USD Value
- View 24H Change
- Search Assets
- Asset Details
- Wallet Address
- Deposit Address
- Export Portfolio

---

# Dashboard Widgets

- Total Portfolio Value
- Total Assets
- Today's Profit/Loss
- Top Performing Asset
- Lowest Performing Asset

---

# Asset Information

Each asset contains

- Asset Name
- Symbol
- Network
- Balance
- USD Value
- 24H Change
- Status

---

# Integrations

- Wallet Service
- Price Service
- Deposit Module
- Withdrawal Module
- Notification Service

---

# Security

- JWT Authentication
- Wallet Encryption
- Audit Logs
- Role Permission
- Address Validation

---

End of Overview
# Settlement Center Overview

Version: 1.0

Module: Merchant Dashboard → Settlement Center

---

# Overview

The Settlement Center allows merchants to receive scheduled payouts from their wallet to linked bank accounts or crypto wallets. Merchants can manage payout destinations, request early payouts, monitor settlement status, and view settlement history.

The module supports both **Fiat Bank Settlements** and **Crypto Wallet Settlements** with automated scheduling and secure processing.

---

# Objectives

- Scheduled Settlements
- Link Bank Accounts
- Link Crypto Wallets
- Early Payout Requests
- Settlement Tracking
- Multi-Currency Support
- Export Settlement Reports
- Secure Fund Transfers

---

# Settlement Methods

## Fiat

- ACH Transfer
- Bank Wire
- SWIFT
- Local Bank Transfer

## Crypto

- BTC
- ETH
- USDT
- USDC
- BNB

Supported Networks

- ERC20
- TRC20
- Polygon
- BEP20
- Bitcoin

---

# Settlement Status

- Scheduled
- Pending
- Processing
- Completed
- Failed
- Cancelled

---

# Merchant Features

- View Upcoming Settlement
- Link Bank Account
- Link Crypto Wallet
- Set Primary Account
- Request Early Payout
- View Settlement History
- Search & Filter
- Export Reports

---

# Dashboard Widgets

- Available Balance
- Upcoming Settlement
- Total Settlements
- Completed Settlements
- Pending Settlements
- Early Payout Requests

---

# Search

Search by

- Settlement ID
- Bank Name
- Wallet Address
- Reference Number

---

# Filters

- Status
- Method
- Currency
- Date Range
- Amount

---

# Integrations

- Wallet Service
- Banking API
- Blockchain Service
- Notification Service
- Audit Service

---

# Security

- JWT Authentication
- Linked Account Verification
- Balance Validation
- Audit Logs
- Role-Based Access

---

End of Overview
# Customers Module Overview

Version: 1.0

Module: Merchant Dashboard → Customers

---

# Overview

The Customers module allows merchants to manage customer profiles, monitor customer activity, track lifetime value (LTV), assess risk profiles, and view transaction history. It serves as the central customer management system for all payment-related activities.

---

# Objectives

- Customer Management
- Customer Profile
- Lifetime Value Tracking
- Transaction History
- Risk Analysis
- Customer Search
- Customer Analytics
- Export Customer Data

---

# Customer Information

Each customer contains

- Customer ID
- Full Name
- Email Address
- Joined Date
- Transaction Count
- Lifetime Value (LTV)
- Risk Profile
- Status

---

# Merchant Features

- View Customers
- Add Customer
- Edit Customer
- Delete Customer
- View Customer Details
- Search Customers
- Filter Customers
- Export Customer List

---

# Customer Risk Levels

- Low Risk
- Medium Risk
- High Risk

---

# Dashboard Widgets

- Total Customers
- New Customers
- Active Customers
- High Risk Customers
- Total Lifetime Value
- Average Customer Value

---

# Search

Search by

- Customer ID
- Name
- Email

---

# Filters

- Risk Profile
- Joined Date
- Transaction Count
- Lifetime Value

---

# Integrations

- Transactions Module
- Wallet Module
- Revenue Module
- Reports Module
- Notification Service
- Audit Service

---

# Security

- JWT Authentication
- RBAC Authorization
- Audit Logs
- Data Encryption

---

End of Overview
# Revenue Module Overview

Version: 1.0

Module: Merchant Dashboard → Revenue

---

# Overview

The Revenue module provides merchants with a complete financial summary including Gross Revenue, Platform Fees, Network Fees, Gateway Charges, Net Revenue, and Monthly Performance. Revenue is automatically calculated from successful transactions, settlements, deposits, and withdrawals.

---

# Objectives

- Revenue Dashboard
- Gross Revenue
- Net Revenue
- Fee Breakdown
- Monthly Performance
- Revenue Analytics
- Statement Download

---

# Revenue Components

- Gross Revenue
- Processing Fees
- Network Fees
- Gateway Fees
- Net Revenue

---

# Dashboard Widgets

- Gross Revenue (MTD)
- Net Revenue
- Total Fees
- Monthly Revenue
- Weekly Performance

---

# Reports

- Daily Revenue
- Weekly Revenue
- Monthly Revenue
- Custom Date Range

---

# Search & Filters

Search by

- Transaction ID
- Settlement ID

Filters

- Date Range
- Currency
- Revenue Type

---

# Integrations

- Transactions
- Deposits
- Withdrawals
- Settlement Center
- Reports Module

---

# Security

- JWT Authentication
- RBAC Authorization
- Audit Logs

---

End of Overview
# Reports & Analytics Overview

Version: 1.0

Module: Merchant Dashboard → Reports & Analytics

---

# Overview

The Reports & Analytics module provides merchants with real-time business insights, transaction trends, revenue analysis, refunds, chargebacks, customer growth, and downloadable reports. It consolidates data from all merchant modules into a centralized analytics dashboard.

---

# Objectives

- Business Analytics
- Revenue Reports
- Transaction Reports
- Refund Analytics
- Chargeback Analytics
- Growth Tracking
- KPI Dashboard
- Report Export

---

# Dashboard Widgets

- Total Revenue
- Transaction Volume
- Gross Revenue
- Net Revenue
- Refund Amount
- Chargebacks
- Customer Growth
- Success Rate

---

# Available Reports

- Revenue Report
- Transaction Report
- Customer Report
- Settlement Report
- Refund Report
- Chargeback Report

---

# Charts

- Revenue Trend
- Volume Trend
- Monthly Growth
- Refund Trend
- Chargeback Trend
- Customer Growth

---

# Filters

- Today
- Last 7 Days
- Last 30 Days
- Monthly
- Quarterly
- Yearly
- Custom Range

---

# Export

Supported Formats

- PDF
- CSV
- Excel

---

# Integrations

- Transactions
- Revenue
- Customers
- Wallet
- Settlement Center

---

# Security

- JWT Authentication
- RBAC Authorization
- Audit Logs

---

End of Overview
# API Keys Module Overview

Version: 1.0

Module: Merchant Dashboard → API Keys

---

# Overview

The API Keys module allows merchants to securely generate, manage, rotate, revoke, and monitor API keys used to authenticate requests to the PGX Gateway APIs.

---

# Objectives

- Generate API Keys
- Manage Production Keys
- Manage Sandbox Keys
- Rotate (Roll) Keys
- Revoke Keys
- Track Key Usage
- Secure API Authentication

---

# Key Types

- Production Key
- Sandbox Key

---

# Features

- Generate New Key
- View Active Keys
- Roll Key
- Revoke Key
- View Last Used
- View Created Date

---

# Dashboard Information

Display

- Key Name
- Environment
- Status
- Created Date
- Last Used
- Expiry (Optional)

---

# Integrations

- Authentication
- Transactions
- Webhooks
- Audit Logs
- Developer Portal

---

# Security

- JWT Authentication
- API Key Encryption
- Audit Logging
- RBAC Authorization

---

End of Overview
# Webhooks Module Overview

Version: 1.0

Module: Merchant Dashboard → Webhooks

---

# Overview

The Webhooks module allows merchants to receive real-time HTTP notifications from PGX Gateway when important events occur such as payments, payouts, deposits, and transaction updates.

---

# Objectives

- Real-Time Event Notifications
- Webhook Endpoint Management
- Event Subscription
- Delivery Tracking
- Retry Failed Requests
- Signature Verification

---

# Supported Events

Payment Events

- payment.created
- payment.completed
- payment.failed
- payment.refunded

Payout Events

- payout.created
- payout.processing
- payout.completed
- payout.failed

Deposit Events

- deposit.created
- deposit.confirmed

---

# Features

Merchant can

- Add Endpoint
- Edit Endpoint
- Disable Endpoint
- Delete Endpoint
- Select Events
- View Delivery Logs

---

# Dashboard Information

Display

- Endpoint URL
- Status
- Subscribed Events
- Last Delivery
- Response Status

---

# Delivery Logs

Track

- Event ID
- Event Type
- Endpoint
- Response Code
- Delivery Time
- Retry Count

---

# Integrations

- Transactions
- Payments
- Withdrawals
- Deposits
- API Keys
- Notification Service

---

# Security

- HMAC Signature
- HTTPS Only
- Secret Validation
- Audit Logging

---

End of Overview
# White Label Studio Overview

Version: 1.0

Module: Merchant Dashboard → White Label Studio

---

# Overview

White Label Studio allows merchants to completely customize PGX Gateway checkout experience by removing PGX branding and using their own domain, logo, colors, emails, and checkout settings.

---

# Objectives

- Custom Branding
- Custom Checkout Domain
- SSL Management
- Custom Email Branding
- Checkout Experience Control
- Merchant Identity Management

---

# Features

- Custom Domain Setup
- SSL Certificate Provisioning
- Logo Upload
- Theme Customization
- Checkout Customization
- Email Sender Configuration
- Remove PGX Branding

---

# Domain Management

Merchant can configure

- Checkout Domain
- DNS Verification
- SSL Status
- Domain Status

Example

pay.company.com

---

# Theme Management

Customize

- Company Logo
- Primary Color
- Fonts
- Checkout Theme

---

# Checkout Configuration

Options

- Billing Address
- Phone Number
- Customer KYC
- Crypto Fee Estimate

---

# Email Customization

Configure

- Sender Name
- Reply-To Email
- Footer
- Branding

---

# Integrations

- Checkout System
- Payments
- Subscriptions
- Email Service
- Domain Service

---

# Security

- Domain Verification
- SSL Encryption
- Tenant Isolation
- Access Control

---

End of Overview
# Billing & Subscription Overview

Version: 1.0

Module: Merchant Dashboard → Billing & Subscription

---

# Overview

Billing & Subscription module manages merchant plans, recurring payments, invoices, payment methods, and usage limits.

---

# Objectives

- Manage Subscription Plans
- Handle Recurring Billing
- Store Payment Methods
- Generate Invoices
- Track Usage Limits

---

# Features

- Current Plan View
- Upgrade Plan
- Downgrade Plan
- Payment Methods
- Billing History
- Invoice Download
- Usage Monitoring

---

# Subscription Plans

Examples

## Pro

- 10k API Calls / Month
- Standard Support
- Basic Analytics


## Enterprise

- 100k API Calls / Month
- Dedicated Manager
- White Label
- SLA Guarantee

---

# Payment Management

Merchant can

- Add Card
- Update Card
- Remove Card
- Set Default Payment

---

# Invoice System

Generate

- Monthly Invoice
- Payment Receipt
- Billing Statement

---

# Usage Tracking

Monitor

- API Calls
- Transaction Volume
- Plan Limits

---

# Integrations

- Payment Gateway
- Subscription Engine
- Invoice Service
- Notification Service

---

# Security

- PCI Compliance
- Encrypted Card Data
- Access Control

---

End of Overview
# Team Members Overview

Version: 1.0

Module: Merchant Dashboard → Team Members

---

# Overview

Team Members module allows merchants to manage organization users, invite employees, assign roles, and control dashboard access.

---

# Objectives

- Invite Team Members
- Manage Roles
- Control Permissions
- Remove Users
- Track User Status

---

# Features

- Invite Member
- Assign Role
- Edit Member
- Delete Member
- Activate / Disable User
- Permission Management

---

# User Roles

Supported Roles

## Owner

Full Access

---

## Admin

Manage Dashboard

- Transactions
- Users
- Settings

---

## Finance

Access

- Revenue
- Billing
- Settlements

---

## Developer

Access

- API Keys
- Webhooks
- Technical Settings

---

# User Status

Statuses

- Active
- Pending
- Disabled

---

# Dashboard Information

Display

- Name
- Email
- Role
- Status
- Actions

Actions

- Edit
- Delete

---

# Integrations

- Authentication
- RBAC System
- Invitation Service
- Notification Service

---

# Security

- Role Based Access Control
- Permission Validation
- Audit Logging

---

End of Overview
# Notifications Overview

Version: 1.0

Module: Merchant Dashboard → Notifications

---

# Overview

Notifications module provides real-time alerts and important system updates to merchants.

It handles platform events, payment updates, security alerts, settlements, and account activities.

---

# Objectives

- Deliver Important Alerts
- Maintain Notification History
- Track Read/Unread Status
- Improve Merchant Awareness

---

# Features

- Notification Center
- Mark All Read
- Individual Read Status
- Notification History
- Real-time Updates

---

# Notification Types

## Payment

Examples

- Payment Completed
- Payment Failed
- Refund Created

---

## Settlement

Examples

- Settlement Completed
- Payout Processing

---

## Security

Examples

- API Key Created
- Login Alert
- Permission Change

---

## Billing

Examples

- Subscription Renewed
- Payment Failed
- Invoice Generated

---

# Notification Data

Display

- Title
- Description
- Time
- Status

Status

- Read
- Unread

---

# Integrations

- Payment Module
- Settlement Module
- Billing Module
- API Key Module
- Notification Service

---

# Security

- User Based Notifications
- Merchant Data Isolation
- Access Control

---

End of Overview
# Settings Overview

Version: 1.0

Module: Merchant Dashboard → Settings

---

# Overview

Settings module manages merchant profile, account security, preferences, and personal configuration.

---

# Objectives

- Manage Merchant Profile
- Secure Account Access
- Control Preferences
- Manage Security Settings

---

# Features

- Profile Information
- Company Details
- Email Settings
- Timezone Settings
- Two Factor Authentication
- Password Update

---

# Profile Management

Merchant can update

- Company Name
- Email Address
- Timezone

---

# Security Management

Features

- Enable 2FA
- Disable 2FA
- Change Password
- Account Protection

---

# Preferences

Manage

- Notification Settings
- Account Preferences
- Regional Settings

---

# Integrations

- Authentication System
- User Management
- Notification Service
- Security Service

---

# Security

- Password Encryption
- 2FA Protection
- Session Security
- Audit Logging

---

End of Overview
# Support Center Overview

Version: 1.0

Module: Merchant Dashboard → Support Center

---

# Overview

Support Center module provides merchants a platform to raise issues, track support tickets, access documentation, and communicate with support teams.

---

# Objectives

- Provide Merchant Assistance
- Manage Support Tickets
- Track Issue Resolution
- Provide Documentation Access

---

# Features

- Create Ticket
- View Tickets
- Ticket Status Tracking
- Support Communication
- Help Center
- Dedicated Manager

---

# Ticket System

Merchant can

- Create Ticket
- Select Category
- Describe Problem
- Track Resolution

---

# Ticket Categories

Examples

## Technical Support

- API Issues
- Integration Problems
- Errors


## Billing

- Invoice Issues
- Subscription Problems


## Account

- Profile Changes
- Security Issues

---

# Ticket Status

Statuses

- Open
- In Progress
- Resolved
- Closed

---

# Dedicated Support

Enterprise merchants get

- Assigned Manager
- Priority Support
- Faster Resolution

---

# Documentation

Provides

- API Docs
- Integration Guides
- FAQs
- Help Articles

---

# Integrations

- Notification System
- Email Service
- Knowledge Base
- User Management

---

# Security

- Merchant Isolation
- Ticket Privacy
- Access Control

---

End of Overview

# Transaction History Overview

## Module
Transactions

## Purpose

The Transaction History module provides a complete audit trail of all user financial activities across the PGX platform including deposits, withdrawals, purchases, subscriptions, and token swaps.

Users can filter transactions, search records, and export transaction history for reporting and accounting purposes.

## Features

- View Complete Transaction History
- Deposit Tracking
- Withdrawal Tracking
- Purchase Tracking
- Token Swap Tracking
- Subscription Payments
- Transaction Search
- Export CSV
- Status Monitoring
- Blockchain Hash Tracking

## Transaction Categories

### Deposit
Wallet funding activities.

### Withdraw
Transfers from wallet to bank or crypto accounts.

### Purchase
PPV events, IPTV purchases, subscriptions.

### Swap
Token exchange transactions.

### Subscription
Recurring PRO membership payments.

## Status Types

- Completed
- Pending
- Failed

## Main Sections

### Filters
- All
- Deposit
- Withdraw
- Purchase
- Swap

### Search
Search by:
- Hash
- Description
- Transaction Type

### Transaction Table
- Transaction Detail
- Date
- Amount
- Status
- Hash

### Export
Download CSV transaction report.


# Notifications Overview

## Module
Notifications

## Purpose

The Notifications module keeps users informed about platform activities, wallet updates, social interactions, watch party invitations, achievements, and important system announcements.

Users can quickly view unread notifications, join lobbies directly, and manage notification history.

## Features

- Real-time Notifications
- Watch Party Invites
- Wallet Updates
- System Announcements
- Achievement Alerts
- Chat Mentions
- Mark All Read
- Notification Timeline

## Main Sections

### Notification Summary
- Total Unread Notifications
- Notification Feed
- Mark All Read

### Notification Types
- Lobby Invite
- Wallet Activity
- System Updates
- Achievements
- Chat Messages

### Actions
- Join Lobby
- Open Message
- Mark Read
# Profile Overview

## Module
Profile

## Purpose

The Profile module acts as the user's public identity page inside PGX Gateway. It displays profile information, social activity, statistics, favorite channels, subscription status, and recent achievements.

Users can also edit their profile information, update bio details, and manage channel preferences.

## Features

- Profile Cover Section
- User Information
- PRO Badge Status
- Profile Editing
- Player Statistics
- Subscription Information
- Favorite Channels
- Activity Feed
- Active Friends Sidebar

## Main Sections

### Profile Header
- Avatar
- Username
- PRO Badge
- Join Date
- Bio
- Share Profile
- Edit Profile

### Player Stats
- Total Friends
- Lobbies Hosted
- Total Watch Time

### PRO Plan
- Subscription Status
- Benefits
- Renewal Date
- Manage Subscription

### Favorite Channels
- Main Event TV
- Sky Sports 1
- ESPN HD

### Recent Activity
- Watch Parties
- Achievements
- Social Activity

### Active Friends
- Friend Search
- Online Friends
- Current Activity Status


# Settings Overview

## Module
Settings

## Purpose

The Settings module allows PGX users to manage their account information, privacy preferences, notifications, security settings, appearance preferences, connected accounts, and account recovery options.

This module gives users full control over their profile experience and security.

## Features

- Account Information
- Password Management
- Two-Factor Authentication (2FA)
- Private Profile Settings
- Notification Preferences
- Appearance Preferences
- Connected Accounts
- Account Deletion
- Security Controls

## Sections

### Account
- Username
- Email Address
- Password Update
- Account Deletion

### Privacy & Security
- Enable 2FA
- Private Profile

### Notifications
- Lobby Invites
- Chat Mentions
- Wallet Activity
- Marketing & Offers

### Appearance
- Theme Settings
- UI Preferences

### Connections
- Third-party Integrations
- Social Account Linking
-------------------------------------------------------------------------
# Support Center Overview

## Module
Support

## Purpose

The Support module helps PGX users quickly resolve issues, access platform documentation, connect with customer support, and manage support tickets.

Users can browse FAQs, search the knowledge base, start live chat sessions, contact support via email, and submit support tickets.

## Features

- Knowledge Base Search
- Live Chat Support
- Email Support
- Documentation Center
- FAQ Management
- Support Ticket System
- Friend Assistance Integration
- User Support History

## Support Channels

### Live Chat
Available for PRO members 24/7.

### Email Support
support@pgxgateway.com

### Documentation
Platform guides and tutorials.

### Ticket System
Submit and track support requests.

## User Actions

- Search Help Articles
- Start Live Chat
- Contact Support
- Read Documentation
- Create Ticket
- View Ticket Status