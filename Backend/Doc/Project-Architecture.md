# Project Architecture

# Dashboard Architecture

backend/

src/

├── models/
│   └── DashboardMetric.js

├── controllers/
│   └── dashboardController.js

├── routes/
│   └── dashboardRoutes.js

├── services/
│   └── dashboardService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

└── utils/
    └── analyticsHelper.js

Data Flow

Client
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response

# Merchants Architecture

backend/

src/

├── models/
│   └── Merchant.js

├── controllers/
│   └── merchantController.js

├── routes/
│   └── merchantRoutes.js

├── services/
│   └── merchantService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validations/
│   └── merchantValidation.js

└── utils/
    └── exportHelper.js

Data Flow

Admin
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response


# Transactions Architecture

backend/

src/

├── models/
│   └── Transaction.js

├── controllers/
│   └── transactionController.js

├── routes/
│   └── transactionRoutes.js

├── services/
│   └── transactionService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validations/
│   └── transactionValidation.js

├── helpers/
│   └── refundHelper.js

└── utils/
    └── exportHelper.js

Data Flow

Admin
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response


# Revenue Architecture

backend/

src/

├── models/
│   └── Revenue.js

├── controllers/
│   └── revenueController.js

├── routes/
│   └── revenueRoutes.js

├── services/
│   └── revenueService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── helpers/
│   └── revenueCalculator.js

└── utils/
    └── reportGenerator.js

Data Flow

Admin
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Database
 ↓
Response


# Settlements Architecture

backend/

src/

├── models/
│   └── Settlement.js

├── controllers/
│   └── settlementController.js

├── routes/
│   └── settlementRoutes.js

├── services/
│   └── settlementService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── helpers/
│   └── payoutProcessor.js

└── utils/
    └── exportHelper.js

Data Flow

Merchant Revenue
      ↓
Settlement Request
      ↓
Route
      ↓
Controller
      ↓
Service
      ↓
Database
      ↓
Settlement Processor
      ↓
Status Update
      ↓
Admin Dashboard


# Wallets Architecture

backend/

src/

├── models/
│   └── Wallet.js

├── controllers/
│   └── walletController.js

├── routes/
│   └── walletRoutes.js

├── services/
│   └── walletService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── helpers/
│   └── blockchainService.js

└── utils/
    └── treasuryCalculator.js

Data Flow

Admin
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Blockchain Service
 ↓
Database
 ↓
Response

# Payment Processors Dashboard Architecture

backend/

src/

├── models/
│   └── ProcessorDashboard.js

├── controllers/
│   └── processorDashboardController.js

├── routes/
│   └── processorDashboardRoutes.js

├── services/
│   └── processorDashboardService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── helpers/
│   └── processorHealthService.js

└── utils/
    └── analyticsEngine.js

Data Flow

Processor APIs
      ↓
Health Service
      ↓
Analytics Engine
      ↓
Database
      ↓
Dashboard APIs
      ↓
Admin Panel

# Failover Monitor Architecture

backend/

src/

├── models/
│   ├── ProcessorMonitor.js
│   ├── FailoverEvent.js
│   ├── FailoverTrigger.js
│   └── AlertSetting.js

├── controllers/
│   └── failoverMonitorController.js

├── routes/
│   └── failoverMonitorRoutes.js

├── services/
│   ├── healthMonitorService.js
│   ├── failoverEngineService.js
│   └── alertService.js

├── schedulers/
│   └── processorMonitorScheduler.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

└── helpers/
    └── routingEngine.js

Data Flow

Processor APIs
      ↓
Health Monitor
      ↓
Trigger Engine
      ↓
Failover Engine
      ↓
Notification Service
      ↓
Dashboard


# Fee Split Engine Architecture

backend/

src/

├── models/
│   ├── FeeConfiguration.js
│   └── MarkupRule.js

├── controllers/
│   └── feeSplitController.js

├── routes/
│   └── feeSplitRoutes.js

├── services/
│   ├── feeCalculationService.js
│   └── markupRuleService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validators/
│   └── feeSplitValidator.js

└── helpers/
    └── feeEngine.js

Data Flow

Admin
 ↓
Fee Rule API
 ↓
Fee Engine
 ↓
Database
 ↓
Fee Distribution Calculation
 ↓
Dashboard


# Geo Routing Architecture

backend/

src/

├── models/
│   ├── GeoRoutingRule.js
│   └── RoutingRegion.js

├── controllers/
│   └── geoRoutingController.js

├── routes/
│   └── geoRoutingRoutes.js

├── services/
│   ├── geoRoutingService.js
│   └── routingDecisionEngine.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validators/
│   └── geoRoutingValidator.js

└── helpers/
    └── regionResolver.js

Data Flow

Customer Request
        ↓
Country Detection
        ↓
Geo Routing Engine
        ↓
Rule Lookup
        ↓
Priority Evaluation
        ↓
Processor Selection
        ↓
Transaction Processing


# Merchant Rules Architecture

backend/

src/

├── models/
│   ├── MerchantFeeRule.js
│   ├── Merchant.js
│   └── FeeHistory.js

├── controllers/
│   └── merchantRulesController.js

├── routes/
│   └── merchantRulesRoutes.js

├── services/
│   ├── merchantRulesService.js
│   └── feeCalculationService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validators/
│   └── merchantRuleValidator.js

└── helpers/
    └── pricingEngine.js

Data Flow

Admin
 ↓
Merchant Rules API
 ↓
Pricing Engine
 ↓
Database
 ↓
Fee Calculation
 ↓
Transaction Processing

# Settlement Engine Architecture

backend/

src/

├── models/
│   ├── ProcessorSettlement.js
│   ├── SettlementBatch.js
│   └── AutoSettlementRule.js

├── controllers/
│   └── settlementEngineController.js

├── routes/
│   └── settlementEngineRoutes.js

├── services/
│   ├── settlementService.js
│   ├── autoSettlementService.js
│   └── reconciliationService.js

├── schedulers/
│   └── autoSettlementScheduler.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

└── helpers/
    └── settlementProcessor.js

Data Flow

Processor Balance
        ↓
Settlement Engine
        ↓
Auto Rule Validation
        ↓
Settlement Batch Creation
        ↓
Settlement Execution
        ↓
Settlement History
        ↓
Dashboard Update

# Revenue Wallet Architecture

backend/

src/

├── models/
│   ├── RevenueWallet.js
│   ├── RevenueWithdrawal.js
│   └── MonthlyRevenue.js

├── controllers/
│   └── revenueWalletController.js

├── routes/
│   └── revenueWalletRoutes.js

├── services/
│   ├── revenueWalletService.js
│   ├── withdrawalService.js
│   └── revenueAnalyticsService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validators/
│   └── revenueWalletValidator.js

└── helpers/
    └── revenueCalculator.js

Data Flow

Gateway Fees
      ↓
Revenue Aggregation
      ↓
Revenue Wallet
      ↓
Analytics Engine
      ↓
Dashboard
      ↓
Withdrawal Processing

# Processor Logs Architecture

backend/

src/

├── models/
│   ├── ProcessorLog.js
│   └── WebhookLog.js

├── controllers/
│   └── processorLogsController.js

├── routes/
│   └── processorLogsRoutes.js

├── services/
│   ├── logCollectionService.js
│   ├── exportService.js
│   └── analyticsService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── validators/
│   └── logsValidator.js

└── helpers/
    └── logParser.js

Data Flow

Processor API
      ↓
Request Logger
      ↓
Database
      ↓
Analytics Engine
      ↓
Dashboard
      ↓
Export Service

# Processor Reports Architecture

backend/

src/

├── models/
│   ├── ProcessorReport.js
│   ├── ProcessorMetric.js
│   └── ReportExport.js

├── controllers/
│   └── processorReportsController.js

├── routes/
│   └── processorReportsRoutes.js

├── services/
│   ├── reportGenerationService.js
│   ├── analyticsService.js
│   └── exportService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js

├── schedulers/
│   └── reportScheduler.js

└── helpers/
    └── chartGenerator.js

Data Flow

Processor Data
      ↓
Analytics Engine
      ↓
Report Generator
      ↓
Database
      ↓
Dashboard
      ↓
PDF Export

# KYC Dashboard Architecture

backend/

src/

├── models/
│   ├── KycSubmission.js
│   ├── KycDocument.js
│   └── KycReview.js

├── controllers/
│   └── kycDashboardController.js

├── routes/
│   └── kycDashboardRoutes.js

├── services/
│   ├── kycVerificationService.js
│   ├── documentReviewService.js
│   └── riskAssessmentService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── complianceMiddleware.js

├── validators/
│   └── kycValidator.js

└── helpers/
    └── riskScoringEngine.js

Data Flow

KYC Submission
      ↓
Document Upload
      ↓
Risk Assessment
      ↓
Review Queue
      ↓
Approval / Rejection
      ↓
Compliance Database

# AML Monitoring Architecture

backend/

src/

├── models/
│   ├── AMLAlert.js
│   ├── AMLInvestigation.js
│   └── FlaggedEntity.js

├── controllers/
│   └── amlMonitoringController.js

├── routes/
│   └── amlMonitoringRoutes.js

├── services/
│   ├── amlDetectionService.js
│   ├── riskAnalysisService.js
│   └── investigationService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── complianceMiddleware.js

├── schedulers/
│   └── amlScanner.js

└── helpers/
    └── riskScoringEngine.js

Data Flow

Transactions
      ↓
AML Scanner
      ↓
Risk Engine
      ↓
Alert Generation
      ↓
Investigation Queue
      ↓
Compliance Dashboard


# Compliance Reports Architecture

backend/

src/

├── models/
│   ├── ComplianceReport.js
│   ├── RegulatoryFiling.js
│   └── ComplianceMetric.js

├── controllers/
│   └── complianceReportsController.js

├── routes/
│   └── complianceReportsRoutes.js

├── services/
│   ├── reportGenerationService.js
│   ├── complianceAnalyticsService.js
│   └── filingManagementService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── complianceMiddleware.js

├── schedulers/
│   └── complianceReportScheduler.js

└── helpers/
    └── complianceCalculator.js

Data Flow

KYC Data
     ↓

AML Data
     ↓

Compliance Analytics
     ↓

Report Generator
     ↓

Database
     ↓

Dashboard & Export

# Activity Timeline Architecture

backend/

src/

├── models/
│   ├── TimelineEvent.js
│   ├── ComplianceEvent.js
│   └── ActivityFilter.js

├── controllers/
│   └── activityTimelineController.js

├── routes/
│   └── activityTimelineRoutes.js

├── services/
│   ├── timelineService.js
│   ├── complianceEventService.js
│   └── eventAnalyticsService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── complianceMiddleware.js

├── validators/
│   └── activityTimelineValidator.js

└── helpers/
    └── timelineFormatter.js

Data Flow

KYC Module
      ↓

AML Module
      ↓

Compliance Services
      ↓

Timeline Engine
      ↓

Database
      ↓

Activity Timeline Dashboard

# Risk Dashboard Architecture

backend/

src/

├── models/
│   ├── RiskEntity.js
│   ├── RiskIncident.js
│   └── RiskRule.js

├── controllers/
│   └── riskDashboardController.js

├── routes/
│   └── riskDashboardRoutes.js

├── services/
│   ├── riskEngineService.js
│   ├── anomalyDetectionService.js
│   └── incidentManagementService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── riskAccessMiddleware.js

├── schedulers/
│   └── riskMonitoringScheduler.js

└── helpers/
    └── riskScoreCalculator.js

Data Flow

Transactions
      ↓

Risk Engine
      ↓

Anomaly Detection
      ↓

Risk Scoring
      ↓

Incident Creation
      ↓

Dashboard

# AI Fraud Center Architecture

backend/

src/

├── models/
│   ├── FraudAlert.js
│   ├── FraudInvestigation.js
│   └── BlockedEntity.js

├── controllers/
│   └── fraudCenterController.js

├── routes/
│   └── fraudCenterRoutes.js

├── services/
│   ├── aiFraudDetectionService.js
│   ├── fraudInvestigationService.js
│   └── blockingService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── fraudAccessMiddleware.js

├── schedulers/
│   └── fraudScanner.js

└── helpers/
    └── fraudScoreEngine.js

Data Flow

Transactions
      ↓

AI Fraud Engine
      ↓

Pattern Detection
      ↓

Fraud Alert Creation
      ↓

Fraud Queue
      ↓

Analyst Review
      ↓

Block / Mark Safe


# Blocked Entities Architecture

backend/

src/

├── models/
│   ├── BlockedEntity.js
│   ├── EntityReview.js
│   └── PolicyHistory.js

├── controllers/
│   └── blockedEntitiesController.js

├── routes/
│   └── blockedEntitiesRoutes.js

├── services/
│   ├── blockManagementService.js
│   ├── policyEngineService.js
│   └── entityReviewService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── fraudAccessMiddleware.js

├── validators/
│   └── blockedEntityValidator.js

└── helpers/
    └── blocklistEngine.js

Data Flow

Fraud Detection
      ↓

Risk Assessment
      ↓

Block Entity
      ↓

Blocklist Database
      ↓

Policy Engine
      ↓

Transaction Validation
      ↓

Access Allowed / Blocked

# Case Management Architecture

backend/

src/

├── models/
│   ├── InvestigationCase.js
│   ├── CaseTimeline.js
│   └── CaseNote.js

├── controllers/
│   └── caseManagementController.js

├── routes/
│   └── caseManagementRoutes.js

├── services/
│   ├── caseAssignmentService.js
│   ├── caseWorkflowService.js
│   └── investigationService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── caseAccessMiddleware.js

├── validators/
│   └── caseManagementValidator.js

└── helpers/
    └── caseStatusEngine.js

Data Flow

Risk Event
      ↓

Create Case
      ↓

Assign Investigator
      ↓

Case Timeline
      ↓

Notes & Actions
      ↓

Resolve / Escalate
      ↓

Archive Case

# Fee Management Architecture

backend/

src/

├── models/
│   ├── GatewayFee.js
│   ├── ProcessorFee.js
│   └── FeeRule.js

├── controllers/
│   └── feeManagementController.js

├── routes/
│   └── feeManagementRoutes.js

├── services/
│   ├── feeCalculationService.js
│   ├── processorFeeService.js
│   └── feeRuleService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── financeAccessMiddleware.js

├── validators/
│   └── feeManagementValidator.js

└── helpers/
    └── feeEngine.js

Data Flow

Fee Update
      ↓

Validation Layer
      ↓

Fee Engine
      ↓

Database
      ↓

Gateway Pricing
      ↓

Transaction Processing

# Subscription Management Architecture

backend/

src/

├── models/
│   ├── SubscriptionPlan.js
│   ├── MerchantSubscription.js
│   └── PlanFeature.js

├── controllers/
│   └── subscriptionController.js

├── routes/
│   └── subscriptionRoutes.js

├── services/
│   ├── subscriptionService.js
│   ├── billingService.js
│   └── planManagementService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── billingAccessMiddleware.js

├── validators/
│   └── subscriptionValidator.js

└── helpers/
    └── pricingEngine.js

Data Flow

Admin Creates Plan
        ↓

Plan Validation
        ↓

Subscription Database
        ↓

Merchant Assignment
        ↓

Recurring Billing
        ↓

Revenue Tracking

# Countries Management Architecture

backend/

src/

├── models/
│   ├── Country.js
│   ├── CountryCompliance.js
│   └── CountryAuditLog.js

├── controllers/
│   └── countriesController.js

├── routes/
│   └── countriesRoutes.js

├── services/
│   ├── countryService.js
│   ├── complianceRegionService.js
│   └── sanctionsService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── countryAccessMiddleware.js

├── validators/
│   └── countryValidator.js

└── helpers/
    └── regionMapper.js

Data Flow

Admin Action
      ↓

Country Validation
      ↓

Compliance Validation
      ↓

Database Update
      ↓

Audit Log
      ↓

Dashboard Refresh


# Currencies & FX Architecture

backend/

src/

├── models/
│   ├── Currency.js
│   ├── FXRateHistory.js
│   └── CurrencyAuditLog.js

├── controllers/
│   └── currenciesController.js

├── routes/
│   └── currenciesRoutes.js

├── services/
│   ├── fxSyncService.js
│   ├── currencyService.js
│   └── conversionFeeService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── treasuryAccessMiddleware.js

├── validators/
│   └── currencyValidator.js

└── helpers/
    └── fxEngine.js

Data Flow

FX Provider
      ↓

Rate Sync Engine
      ↓

Currency Database
      ↓

Conversion Engine
      ↓

Wallets / Payments / Settlements

# API Management Architecture

backend/

src/

├── models/
│   ├── ApiKey.js
│   ├── ApiUsageLog.js
│   └── ApiAuditLog.js

├── controllers/
│   └── apiManagementController.js

├── routes/
│   └── apiManagementRoutes.js

├── services/
│   ├── apiKeyService.js
│   ├── apiUsageService.js
│   └── apiSecurityService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── apiAdminMiddleware.js

├── validators/
│   └── apiKeyValidator.js

└── helpers/
    └── tokenGenerator.js

Data Flow

Generate Key
      ↓

Permission Validation
      ↓

Token Generation
      ↓

Encrypted Storage
      ↓

Usage Tracking
      ↓

Audit Logging

# Global Webhooks Architecture

backend/

src/

├── models/
│   ├── WebhookEndpoint.js
│   ├── WebhookDelivery.js
│   └── WebhookLog.js

├── controllers/
│   └── webhookController.js

├── routes/
│   └── webhookRoutes.js

├── services/
│   ├── webhookService.js
│   ├── deliveryService.js
│   └── retryService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── webhookAccessMiddleware.js

├── validators/
│   └── webhookValidator.js

└── helpers/
    └── signatureGenerator.js

Data Flow

Platform Event
      ↓

Webhook Queue
      ↓

Endpoint Delivery
      ↓

Response Validation
      ↓

Delivery Logs
      ↓

Dashboard Metrics

# Reports Architecture

backend/

src/

├── models/
│   ├── Report.js
│   ├── ReportJob.js
│   └── ReportAuditLog.js

├── controllers/
│   └── reportsController.js

├── routes/
│   └── reportsRoutes.js

├── services/
│   ├── reportGeneratorService.js
│   ├── pdfExportService.js
│   └── analyticsService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── reportAccessMiddleware.js

├── validators/
│   └── reportValidator.js

└── helpers/
    └── reportFormatter.js

Data Flow

Admin Request
      ↓

Report Generator
      ↓

Database Aggregation
      ↓

PDF Builder
      ↓

Storage
      ↓

Download Access


# White Label Architecture

backend/

src/

├── models/
│   ├── WhiteLabelRequest.js
│   ├── SSLCertificate.js
│   └── WhiteLabelAuditLog.js

├── controllers/
│   └── whiteLabelController.js

├── routes/
│   └── whiteLabelRoutes.js

├── services/
│   ├── domainValidationService.js
│   ├── sslProvisionService.js
│   └── whiteLabelService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── whiteLabelAccessMiddleware.js

├── validators/
│   └── whiteLabelValidator.js

└── helpers/
    └── dnsHelper.js

Data Flow

Merchant Request
      ↓

Domain Validation
      ↓

SSL Validation
      ↓

Approval Review
      ↓

Provisioning
      ↓

Deployment


# Notifications Architecture

backend/

src/

├── models/
│   ├── BroadcastNotification.js
│   ├── NotificationDelivery.js
│   └── NotificationAuditLog.js

├── controllers/
│   └── notificationController.js

├── routes/
│   └── notificationRoutes.js

├── services/
│   ├── notificationService.js
│   ├── broadcastService.js
│   └── deliveryService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── notificationAccessMiddleware.js

├── validators/
│   └── notificationValidator.js

└── helpers/
    └── notificationFormatter.js

Data Flow

Create Broadcast
      ↓

Validate Request
      ↓

Select Audience
      ↓

Queue Notification
      ↓

Send Notification
      ↓

Track Delivery
      ↓

Store Audit Log


# Support Architecture

# Support Architecture

backend/

src/

├── models/
│   ├── SupportTicket.js
│   ├── TicketMessage.js
│   └── SupportAuditLog.js

├── controllers/
│   └── supportController.js

├── routes/
│   └── supportRoutes.js

├── services/
│   ├── ticketService.js
│   ├── escalationService.js
│   ├── responseService.js
│   └── reportingService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── supportAccessMiddleware.js

├── validators/
│   └── supportValidator.js

└── helpers/
    └── ticketPriorityEngine.js

------------------------------------------------

Data Flow

Merchant Creates Ticket
        ↓

Support Queue
        ↓

Agent Assignment
        ↓

Investigation
        ↓

Response
        ↓

Resolution
        ↓

Audit Log

# Audit Logs Architecture

backend/

src/

├── models/
│   ├── AuditLog.js
│   ├── SecurityEvent.js
│   └── AuditExport.js

├── controllers/
│   └── auditLogsController.js

├── routes/
│   └── auditLogsRoutes.js

├── services/
│   ├── auditService.js
│   ├── securityEventService.js
│   └── exportService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── auditAccessMiddleware.js

├── validators/
│   └── auditValidator.js

└── helpers/
    └── auditFormatter.js

------------------------------------------------

Data Flow

Admin Action
      ↓

Event Triggered
      ↓

Audit Logger
      ↓

Immutable Storage
      ↓

Search Engine
      ↓

Audit Dashboard


# Roles Module Architecture

backend/

src/

├── models/
│   ├── Role.js
│   ├── Permission.js
│   └── RoleAssignment.js

├── controllers/
│   └── rolesController.js

├── routes/
│   └── rolesRoutes.js

├── services/
│   ├── roleService.js
│   ├── permissionService.js
│   └── assignmentService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── roleGuard.js

├── validators/
│   └── roleValidator.js

└── helpers/
    └── permissionMatrix.js

------------------------------------------------

Flow

Admin
 ↓
Role Creation
 ↓
Permission Assignment
 ↓
User Assignment
 ↓
Access Validation
 ↓
Audit Logs


# Settings Architecture

backend/

src/

├── models/
│   ├── PlatformSettings.js
│   ├── SecuritySettings.js
│   └── MaintenanceLog.js

├── controllers/
│   └── settingsController.js

├── routes/
│   └── settingsRoutes.js

├── services/
│   ├── settingsService.js
│   ├── securityService.js
│   └── maintenanceService.js

├── middlewares/
│   ├── authMiddleware.js
│   └── superAdminGuard.js

├── validators/
│   └── settingsValidator.js

└── helpers/
    └── settingsHelper.js

------------------------------------------------

Flow

Admin
 ↓
Update Settings
 ↓
Validation
 ↓
Database Update
 ↓
Audit Log
 ↓
Success Response

Frontend

↓

API Gateway

↓

Authentication

↓

Merchant Service

↓

Wallet Service

↓

Payment Service

↓

Settlement Service

↓

Notification Service

↓

Revenue Service

↓

Report Service

↓

Database

↓

Redis

↓

RabbitMQ

↓

Cron Jobs

↓

Webhooks

↓

Third Party APIs

↓

Monitoring

↓

Logs

↓

Backups

↓

Analytics

# Transactions Module Project Architecture

Version: 1.0

---

# Overview

Transactions module follows a layered architecture to keep the code scalable, maintainable, and easy to test.

Architecture Pattern

Client
    │
    ▼
Routes
    │
    ▼
Middleware
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Database

---

# Folder Structure

src/
│
├── modules/
│   └── transactions/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── routes/
│       ├── validator/
│       ├── dto/
│       ├── middleware/
│       ├── utils/
│       └── constants/
│
├── config/
├── database/
├── middleware/
├── services/
├── helpers/
├── jobs/
└── logs/

---

# Request Flow

Client Request
      │
      ▼
Route
      │
      ▼
JWT Authentication
      │
      ▼
Role Permission
      │
      ▼
Validation
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Database
      │
      ▼
JSON Response

---

# Layer Responsibilities

## Routes

- Register APIs
- Apply Middleware
- API Versioning

---

## Middleware

- JWT Verification
- Role Check
- Rate Limit
- Request Logger

---

## Controller

- Receive Request
- Call Service
- Return Response

No business logic here.

---

## Service

Contains complete business logic.

Examples

- Create Transaction
- Refund Transaction
- Settlement Processing
- Retry Payment
- Export Data

---

## Repository

Responsible for database operations only.

Examples

- Insert Transaction
- Update Status
- Fetch Transactions
- Search Data

---

# External Services

- Payment Gateway
- Wallet Service
- Settlement Service
- Notification Service
- Webhook Service
- Report Service

---

# Background Jobs

- Settlement Processing
- CSV Export
- Email Queue
- Webhook Retry
- Daily Reports

---

# Security

- JWT Authentication
- RBAC (Role Based Access)
- API Rate Limiting
- Request Validation
- Audit Logging

---

# Logging

System should log

- API Requests
- Errors
- Webhooks
- Refunds
- Settlement Events

---

# Error Handling

Use centralized error handler.

Return standard API responses.

---

# Scalability

- Modular Design
- Independent Services
- Queue-based Background Jobs
- Database Indexing
- API Versioning

---

# Future Scope

- Microservices
- Event Driven Architecture
- Kafka/RabbitMQ Integration
- Multi Database Support
- Read Replicas

---

End of Project Architecture
# Deposits Module Project Architecture

Version: 1.0

---

# Architecture

Client

↓

Routes

↓

Middleware

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

# Folder Structure

src/

modules/

deposits/

controller/

service/

repository/

routes/

validators/

dto/

middleware/

helpers/

constants/

---

# Layer Responsibilities

Routes

- Register APIs
- Apply Authentication

Middleware

- JWT Verification
- Role Validation
- Rate Limiting

Controller

- Handle Requests
- Return Responses

Service

- Generate Address
- Verify Deposit
- Credit Wallet
- Export Data

Repository

- Database Queries
- CRUD Operations

---

# External Integrations

- Blockchain Node
- Wallet Service
- QR Generator
- Notification Service
- Audit Service

---

# Background Jobs

- Blockchain Sync
- Confirmation Checker
- Wallet Credit
- Notification Queue
- Export Generator

---

# Logging

- API Logs
- Deposit Logs
- Blockchain Logs
- Wallet Logs
- Error Logs

---

# Security

- JWT Authentication
- RBAC
- Address Validation
- Blockchain Verification
- Audit Logs

---

# Future Scope

- Microservices
- Queue Workers
- Multi Chain Support
- Cold Wallet Integration
- AI Fraud Detection

---

End of Project Architecture
# Withdrawals Module Project Architecture

Version: 1.0

---

# Architecture Flow

Client
   │
   ▼
Routes
   │
   ▼
Authentication
   │
   ▼
Validation
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Database
   │
   ▼
Wallet / Bank / Blockchain
   │
   ▼
Response

---

# Folder Structure

src/
└── modules/
    └── withdrawals/
        ├── controller/
        ├── service/
        ├── repository/
        ├── routes/
        ├── validators/
        ├── dto/
        ├── middleware/
        ├── helpers/
        └── constants/

---

# Layer Responsibilities

### Routes
- Register APIs
- Apply Middleware

### Middleware
- JWT Authentication
- Role Validation
- Rate Limiting

### Controller
- Handle Requests
- Return Responses

### Service
- Validate Balance
- Calculate Fees
- Process Withdrawals
- OTP Verification
- Blockchain/Bank Integration

### Repository
- CRUD Operations
- Database Queries

---

# External Services

- Wallet Service
- Banking API
- Blockchain Service
- Notification Service
- Audit Service
- KYC/AML Service

---

# Background Jobs

- Withdrawal Queue
- Blockchain Broadcast
- Bank Transfer Queue
- Notification Queue
- Export Generation
- Daily Reconciliation

---

# Logging

- API Logs
- Wallet Logs
- Withdrawal Logs
- Error Logs
- Audit Logs

---

# Security

- JWT Authentication
- OTP / 2FA
- RBAC
- Address Validation
- Audit Logging
- Request Validation

---

# Future Scope

- Batch Withdrawals
- Scheduled Payouts
- Multi-Signature Approval
- Queue Workers
- AI Fraud Detection

---

End of Project Architecture
# Wallet Management Project Architecture

Version: 1.0

Module: Merchant Dashboard → Wallet Management

---

# Architecture Overview

The Wallet Management module follows a layered architecture to ensure scalability, maintainability, and secure wallet operations.

Architecture Flow

Client
   │
   ▼
Routes
   │
   ▼
Authentication Middleware
   │
   ▼
Validation Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Database
   │
   ▼
Wallet / Price Services
   │
   ▼
JSON Response

---

# Folder Structure

src/
│
├── modules/
│   └── wallet/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── dto/
│       ├── middleware/
│       ├── helpers/
│       ├── constants/
│       └── interfaces/
│
├── config/
├── database/
├── queues/
├── jobs/
├── utils/
└── logs/

---

# Layer Responsibilities

## Routes

- Register Wallet APIs
- API Versioning
- Apply Middleware

---

## Middleware

- JWT Authentication
- RBAC Authorization
- Request Validation
- Rate Limiting
- Request Logging

---

## Controller

Handles HTTP Requests

Examples

- Get Wallets
- Add Asset
- Get Portfolio
- Get Wallet Address

---

## Service

Contains complete business logic

Examples

- Create Wallet
- Generate Address
- Calculate Portfolio
- Sync Wallet Balance
- Update Asset Price

---

## Repository

Handles database queries

Examples

- Create Wallet
- Update Balance
- Fetch Wallets
- Save Address
- Portfolio History

---

# External Services

- Wallet Service
- Price Service
- Blockchain Service
- Deposit Module
- Withdrawal Module
- Settlement Module
- Notification Service
- Audit Service

---

# Background Jobs

- Market Price Sync
- Portfolio Recalculation
- Wallet Balance Sync
- Generate Wallet Address
- Portfolio Snapshot
- Notification Queue

---

# Logging

Store logs for

- Wallet Creation
- Asset Addition
- Balance Updates
- Portfolio Changes
- API Errors
- System Errors

---

# Security

- JWT Authentication
- RBAC Permissions
- Address Encryption
- API Rate Limiting
- Audit Logging
- Sensitive Data Protection

---

# Scalability

- Modular Services
- Queue Workers
- Cached Portfolio
- Indexed Database
- REST API Versioning

---

# Future Enhancements

- Multi Wallet Support
- Staking Wallet
- Cold Wallet Integration
- NFT Wallet
- Multi-Signature Wallet
- AI Portfolio Insights

---

End of Project Architecture
# Settlement Center Project Architecture

Version: 1.0

Module: Merchant Dashboard → Settlement Center

---

# Architecture Overview

Settlement Center manages merchant payouts through linked bank accounts and crypto wallets. It processes scheduled settlements, early payouts, reconciliation, and notifications using a layered backend architecture.

---

# Architecture Flow

Client
   │
   ▼
Routes
   │
   ▼
JWT Authentication
   │
   ▼
Validation Middleware
   │
   ▼
Controller
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Database
   │
   ▼
Bank API / Blockchain
   │
   ▼
Notification Service
   │
   ▼
Response

---

# Folder Structure

src/
│
├── modules/
│   └── settlements/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── dto/
│       ├── middleware/
│       ├── helpers/
│       ├── constants/
│       └── interfaces/
│
├── config/
├── database/
├── queues/
├── jobs/
├── utils/
└── logs/

---

# Layer Responsibilities

### Routes

- Register APIs
- Apply Authentication
- API Versioning

---

### Middleware

- JWT Authentication
- RBAC Authorization
- Input Validation
- Rate Limiting
- Request Logging

---

### Controller

Handles requests for

- Linked Accounts
- Settlement Requests
- Early Payouts
- Settlement History
- Dashboard Summary

---

### Service

Business Logic

- Create Settlement
- Validate Balance
- Calculate Fees
- Process Early Payout
- Bank Transfer
- Crypto Transfer
- Reconciliation

---

### Repository

Database Operations

- Settlement CRUD
- Linked Account CRUD
- Status Updates
- History Records
- Reconciliation Records

---

# External Integrations

- Wallet Service
- Banking API
- Blockchain Service
- Notification Service
- Audit Service
- Exchange Rate Service

---

# Background Jobs

- Settlement Scheduler
- Queue Processor
- Early Payout Queue
- Reconciliation Job
- Notification Queue
- Daily Settlement Report

---

# Logging

- Settlement Logs
- API Logs
- Banking Logs
- Blockchain Logs
- Error Logs
- Audit Logs

---

# Security

- JWT Authentication
- RBAC Permissions
- Account Validation
- Sensitive Data Encryption
- Audit Logging
- Rate Limiting

---

# Scalability

- Queue Workers
- Modular Services
- Database Indexing
- Background Processing
- REST API Versioning

---

# Future Scope

- Multi-Bank Routing
- Auto Settlement Rules
- Batch Settlements
- Cross-Border Transfers
- AI Fraud Detection
- Multi-Signature Approval

---

End of Project Architecture
# Customers Module Project Architecture

Version: 1.0

Module: Merchant Dashboard → Customers

---

# Architecture Overview

The Customers module manages customer profiles, customer lifecycle, transaction summaries, lifetime value (LTV), and risk profiles. It integrates with Transactions, Wallet, Revenue, and Reports modules.

---

# Architecture Flow

Client
   │
   ▼
Routes
   │
   ▼
JWT Authentication
   │
   ▼
Validation Middleware
   │
   ▼
Controller
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Database
   │
   ▼
Notification / Audit Services
   │
   ▼
JSON Response

---

# Folder Structure

src/
│
├── modules/
│   └── customers/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── dto/
│       ├── middleware/
│       ├── helpers/
│       ├── constants/
│       └── interfaces/
│
├── config/
├── database/
├── queues/
├── jobs/
├── utils/
└── logs/

---

# Layer Responsibilities

## Routes

- Register Customer APIs
- API Versioning
- Apply Middleware

---

## Middleware

- JWT Authentication
- RBAC Authorization
- Input Validation
- Rate Limiting
- Request Logging

---

## Controller

Handles requests for

- Customer List
- Customer Details
- Create Customer
- Update Customer
- Delete Customer
- Export Customers

---

## Service

Business Logic

- Customer CRUD
- LTV Calculation
- Risk Evaluation
- Transaction Synchronization
- Customer Statistics

---

## Repository

Database Operations

- Customer CRUD
- Search
- Filters
- Notes
- Tags
- Activity Logs

---

# External Integrations

- Transactions Module
- Wallet Module
- Revenue Module
- Reports Module
- Notification Service
- Audit Service

---

# Background Jobs

- LTV Calculator
- Risk Analysis
- Customer Statistics
- Export Generator
- Notification Queue

---

# Logging

- Customer Logs
- API Logs
- Activity Logs
- Error Logs
- Audit Logs

---

# Security

- JWT Authentication
- RBAC Permissions
- Email Validation
- Audit Logging
- Sensitive Data Protection

---

# Scalability

- Modular Services
- Queue Workers
- Indexed Database
- Cached Statistics
- REST API Versioning

---

# Future Scope

- Customer KYC
- Customer Segments
- Loyalty Program
- Referral System
- AI Risk Scoring
- CRM Integration

---

End of Project Architecture
# Revenue Module Project Architecture

Version: 1.0

Module: Merchant Dashboard → Revenue

---

# Architecture Overview

The Revenue module aggregates financial data from Transactions, Deposits, Withdrawals, and Settlement Center to calculate Gross Revenue, Fees, Net Revenue, and generate revenue analytics and downloadable statements.

---

# Architecture Flow

Client
   │
   ▼
Routes
   │
   ▼
JWT Authentication
   │
   ▼
Validation Middleware
   │
   ▼
Controller
   │
   ▼
Revenue Service
   │
   ▼
Calculation Engine
   │
   ▼
Repository Layer
   │
   ▼
Database
   │
   ▼
Reports Service
   │
   ▼
Response

---

# Folder Structure

src/
│
├── modules/
│   └── revenue/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── dto/
│       ├── middleware/
│       ├── helpers/
│       ├── constants/
│       └── interfaces/
│
├── config/
├── database/
├── jobs/
├── queues/
├── utils/
└── logs/

---

# Layer Responsibilities

## Routes

- Register Revenue APIs
- API Versioning
- Apply Authentication

---

## Middleware

- JWT Authentication
- RBAC Authorization
- Input Validation
- Rate Limiting
- Request Logging

---

## Controller

Handles requests for

- Revenue Dashboard
- Revenue Breakdown
- Revenue Analytics
- Download Statement

---

## Service

Business Logic

- Revenue Calculation
- Fee Calculation
- Analytics Generation
- Statement Generation
- Revenue Summary

---

## Repository

Database Operations

- Revenue Records
- Revenue Summary
- Fee Details
- Report History

---

# External Integrations

- Transactions Module
- Deposits Module
- Withdrawals Module
- Settlement Center
- Reports Module
- Notification Service
- Audit Service

---

# Background Jobs

- Daily Revenue Calculation
- Weekly Revenue Summary
- Monthly Statement Generator
- Revenue Cache Refresh
- Analytics Processing

---

# Logging

- Revenue Logs
- API Logs
- Calculation Logs
- Export Logs
- Audit Logs

---

# Security

- JWT Authentication
- RBAC Permissions
- Audit Logging
- Data Encryption
- Rate Limiting

---

# Scalability

- Queue-Based Processing
- Cached Revenue Metrics
- Indexed Database
- Modular Services
- REST API Versioning

---

# Future Scope

- Tax Reports
- Profit & Loss Dashboard
- Revenue Forecasting
- Multi-Currency Analytics
- AI Revenue Insights

---

End of Project Architecture
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
# API Keys Module Project Architecture

Version: 1.0

Module: Merchant Dashboard → API Keys

---

# Architecture Overview

The API Keys module provides secure API authentication management for merchants. It handles key generation, validation, rotation, revocation, permission control, and usage monitoring.

---

# Architecture Flow

Developer App

↓

API Request

↓

API Gateway

↓

API Key Middleware

↓

Authentication Service

↓

Permission Service

↓

Business API

↓

Database

↓

Response

---

# Merchant Dashboard Flow

Merchant

↓

API Keys Page

↓

API Key Service

↓

Database

↓

Return Keys Status

---

# Folder Structure

src/
│
├── modules/
│   └── apiKeys/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── middleware/
│       ├── dto/
│       ├── helpers/
│       └── interfaces/
│
├── auth/
├── security/
├── database/
├── logs/
└── utils/

---

# Layer Responsibilities

## Routes

Handles

- API Key APIs
- Versioning
- Authentication

---

## Middleware

Handles

- API Key Extraction
- Key Validation
- Rate Limiting
- Permission Check

---

## Controller

Handles

- Generate Key
- Roll Key
- Revoke Key
- List Keys
- Usage Details

---

## Service

Business Logic

- Key Generation
- Encryption
- Hashing
- Rotation
- Revocation
- Usage Tracking

---

## Repository

Database Operations

- Store Keys
- Update Status
- Fetch Usage
- Manage Permissions

---

# Security Architecture

API Request

↓

Extract API Key

↓

Find Key

↓

Verify Hash

↓

Check Status

↓

Check Permission

↓

Allow Request

---

# External Integrations

- Authentication Service
- Webhook Module
- Transaction API
- Payment API
- Audit Service

---

# Background Jobs

- Expired Key Scanner
- Security Monitor
- Usage Aggregator
- Suspicious Activity Detection

---

# Logging

Logs

- Key Created
- Key Rotated
- Key Revoked
- API Request
- Failed Authentication

---

# Security Measures

- Secret Hashing
- Encryption
- Rate Limiting
- IP Monitoring
- Audit Logs
- RBAC

---

# Scalability

- Distributed API Gateway
- Cache Key Validation
- Async Logging
- Queue Processing

---

# Future Scope

- IP Whitelisting
- API Permission Scopes
- Developer Portal
- OAuth Support
- Key Expiration

---

End of Project Architecture
# Webhooks Module Project Architecture

Version: 1.0

Module: Merchant Dashboard → Webhooks

---

# Architecture Overview

The Webhooks module provides real-time event delivery between PGX Gateway and merchant applications. It manages endpoint configuration, event subscriptions, secure payload delivery, retries, and delivery tracking.

---

# Architecture Flow

PGX System Event

↓

Event Bus / Queue

↓

Webhook Dispatcher

↓

Endpoint Manager

↓

Signature Generator

↓

HTTP Client

↓

Merchant Server

↓

Delivery Logger

↓

Database

---

# Merchant Dashboard Flow

Merchant

↓

Webhooks Page

↓

Webhook Service

↓

Database

↓

Endpoint Management

---

# Folder Structure

src/
│
├── modules/
│   └── webhooks/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── dto/
│       ├── workers/
│       ├── queue/
│       ├── helpers/
│       └── interfaces/
│
├── eventBus/
├── database/
├── security/
├── logs/
└── utils/

---

# Layer Responsibilities

## Routes

Handles

- Endpoint APIs
- Event Subscription APIs
- Delivery Logs APIs

---

## Controller

Handles

- Create Endpoint
- Update Endpoint
- Delete Endpoint
- View Logs

---

## Webhook Service

Business Logic

- Endpoint Management
- Event Matching
- Payload Creation
- Signature Generation
- Delivery Handling

---

## Dispatcher Service

Responsible For

- Finding Subscribers
- Sending Requests
- Handling Responses
- Retry Processing

---

## Queue Worker

Handles

- Async Delivery
- Retry Jobs
- Failed Events

---

# Event Architecture

Transaction Created

↓

Event Generated

↓

Event Queue

↓

Webhook Worker

↓

Merchant Endpoint

↓

Delivery Result

---

# External Integrations

- Transactions Module
- Payments Module
- Payout Module
- Deposits Module
- API Keys
- Notification Service
- Audit Service

---

# Background Jobs

- Retry Failed Deliveries
- Remove Old Logs
- Monitor Failures
- Queue Processing

---

# Security Architecture

Webhook Request

↓

Generate Signature

↓

Attach Header

↓

Merchant Verification

↓

Process Event

---

# Logging

Store

- Event ID
- Payload
- Response
- Status
- Timestamp

---

# Scalability

- Queue Based System
- Worker Scaling
- Retry Queue
- Load Balancing
- Async Processing

---

# Future Scope

- Webhook Replay
- Multiple Endpoints
- Event Filtering
- Delivery Analytics
- Regional Failover

---

End of Project Architecture
# White Label Studio Project Architecture

Version: 1.0

Module: Merchant Dashboard → White Label Studio

---

# Architecture Overview

White Label Studio is a multi-tenant customization system that allows merchants to run PGX services under their own brand identity using custom domains, themes, checkout pages, and emails.

---

# Architecture Flow

Merchant Dashboard

↓

White Label Service

↓

Configuration Manager

↓

Domain Service

↓

Theme Engine

↓

Checkout Renderer

↓

Email Engine

↓

Database / Storage

---

# Checkout Request Flow

Customer

↓

Open Merchant Domain

↓

Domain Resolver

↓

Identify Merchant

↓

Load White Label Config

↓

Load Theme

↓

Render Checkout

↓

Payment Processing

---

# Folder Structure

src/
│
├── modules/
│   └── whiteLabel/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── domain/
│       ├── theme/
│       ├── checkout/
│       ├── email/
│       ├── storage/
│       └── interfaces/
│
├── ssl/
├── cdn/
├── database/
├── queues/
└── logs/

---

# Layer Responsibilities

## Domain Service

Handles

- Domain Registration
- DNS Verification
- SSL Status
- Domain Mapping

---

## Theme Engine

Handles

- Logo
- Colors
- Fonts
- Branding

---

## Checkout Engine

Handles

- Checkout UI
- Customer Fields
- Payment Options
- Merchant Branding

---

## Email Engine

Handles

- Templates
- Sender Identity
- Footer
- Notifications

---

## Storage Layer

Handles

- Images
- Logos
- Assets
- CDN Files

---

# Multi Tenant Flow

Request

↓

Domain Lookup

↓

Merchant Identification

↓

Load Merchant Config

↓

Apply Branding

↓

Return Response

---

# External Integrations

- Payment Gateway
- CDN Storage
- SSL Provider
- Email Provider
- Domain Provider

---

# Background Jobs

- DNS Verification
- SSL Renewal
- Asset Cleanup
- Email Sync
- Cache Refresh

---

# Security Architecture

- Tenant Isolation
- Domain Verification
- HTTPS Enforcement
- Asset Validation
- RBAC

---

# Logging

Track

- Domain Changes
- Theme Changes
- Checkout Changes
- Email Updates

---

# Scalability

- CDN Assets
- Cached Config
- Distributed Storage
- Queue Workers
- Microservice Ready

---

# Future Scope

- Multiple Brands
- Custom Checkout Builder
- Custom CSS
- Advanced Templates
- Regional Branding

---

End of Project Architecture
# Billing & Subscription Project Architecture

Version: 1.0

Module: Merchant Dashboard → Billing & Subscription

---

# Architecture Overview

Billing module manages merchant subscriptions, plans, payments, invoices, and usage limits. It works as the financial management layer of PGX Gateway.

---

# Architecture Flow

Merchant Dashboard

↓

Billing API

↓

Subscription Service

↓

Payment Service

↓

Invoice Engine

↓

Usage Tracker

↓

Database

↓

Notification Service

---

# Payment Flow Architecture

Merchant

↓

Select Plan

↓

Payment Gateway

↓

Payment Verification

↓

Subscription Activation

↓

Invoice Generation

↓

Notification

---

# Folder Structure

src/
│
├── modules/
│   └── billing/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── subscriptions/
│       ├── payments/
│       ├── invoices/
│       ├── usage/
│       └── interfaces/
│
├── payment/
├── notifications/
├── database/
├── queues/
└── logs/

---

# Layer Responsibilities

## Subscription Service

Handles

- Create Subscription
- Upgrade Plan
- Downgrade Plan
- Cancel Subscription
- Renew Subscription

---

## Payment Service

Handles

- Payment Processing
- Card Token
- Payment Status
- Retry Payment

---

## Invoice Engine

Handles

- Invoice Creation
- PDF Generation
- Download

---

## Usage Tracker

Handles

- API Count
- Transaction Count
- Limit Checking

---

# Recurring Billing Flow

Scheduler

↓

Find Expiring Subscriptions

↓

Charge Payment Method

↓

Update Subscription

↓

Generate Invoice

---

# External Integrations

- Payment Gateway
- Email Service
- Notification System
- Tax Service
- Accounting System

---

# Background Jobs

- Monthly Billing
- Payment Retry
- Invoice Generator
- Usage Reset
- Subscription Expiry Check

---

# Security Architecture

- PCI Compliant Storage
- Tokenized Payments
- RBAC
- Audit Logs
- Encryption

---

# Logging

Track

- Plan Changes
- Payments
- Invoice Creation
- Failed Charges

---

# Scalability

- Queue Based Billing
- Async Invoice Generation
- Cached Plan Data
- Distributed Workers

---

# Future Scope

- Marketplace Billing
- Usage Based Pricing
- Coupon Engine
- Multi Currency
- Tax Automation

---

End of Project Architecture
# Team Members Project Architecture

Version: 1.0

Module: Merchant Dashboard → Team Members

---

# Architecture Overview

Team Members module provides organization-level access management using Role Based Access Control (RBAC).

It manages users, invitations, roles, permissions, and secure dashboard access.

---

# Architecture Flow

Merchant Dashboard

↓

Team API

↓

Authentication Service

↓

RBAC Permission Engine

↓

Team Member Service

↓

Database

↓

Notification Service

---

# User Access Flow

User Login

↓

Authentication

↓

Fetch Merchant

↓

Load User Role

↓

Load Permissions

↓

Dashboard Access

---

# Folder Structure

src/
│
├── modules/
│   └── teamMembers/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── permissions/
│       ├── invitations/
│       └── interfaces/
│
├── auth/
├── notifications/
├── database/
├── logs/
└── middleware/

---

# Layer Responsibilities

## Team Service

Handles

- Add Member
- Update Member
- Remove Member
- Member Listing

---

## Invitation Service

Handles

- Invite Email
- Token Creation
- Invitation Expiry
- Account Activation

---

## RBAC Engine

Handles

- Role Checking
- Permission Validation
- Access Control

---

## Notification Service

Handles

- Invitation Emails
- Role Change Alerts
- Account Updates

---

# Permission Architecture

Request

↓

JWT Verify

↓

User Role

↓

Permission Lookup

↓

Allow / Deny

---

# Role Hierarchy

Owner

↓

Admin

↓

Finance

↓

Developer

---

# External Integrations

- Authentication System
- Email Provider
- Audit Service
- Notification System

---

# Background Jobs

- Expire Invitations
- Send Reminders
- Cleanup Disabled Users
- Audit Processing

---

# Security Architecture

- JWT Authentication
- RBAC
- API Permission Middleware
- Audit Logs
- Secure Invitations

---

# Logging

Track

- User Added
- Role Changed
- Member Removed
- Login Activity

---

# Scalability

- Cached Permissions
- Separate Auth Service
- Async Notifications
- Database Indexing

---

# Future Scope

- Custom Roles
- Permission Builder
- Team Groups
- SSO
- Activity Monitoring

---

End of Project Architecture
# Notifications Project Architecture

Version: 1.0

Module: Merchant Dashboard → Notifications

---

# Architecture Overview

Notifications module is a centralized alert system responsible for delivering real-time platform events, security alerts, billing updates, and operational messages to merchants.

---

# Architecture Flow

Application Event

↓

Event Bus

↓

Notification Service

↓

Notification Queue

↓

Notification Worker

↓

Database

↓

Merchant Dashboard

---

# Notification Request Flow

System Module

↓

Create Event

↓

Notification Engine

↓

Find Merchant Users

↓

Create Notification

↓

Deliver Alert

---

# Folder Structure

src/
│
├── modules/
│   └── notifications/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── workers/
│       ├── queue/
│       ├── templates/
│       └── interfaces/
│
├── eventBus/
├── websocket/
├── database/
├── logs/
└── middleware/

---

# Layer Responsibilities

## Notification Service

Handles

- Create Notification
- Fetch Notifications
- Mark Read
- Delete Notification

---

## Event Listener

Receives events from

- Payments
- Settlements
- Billing
- API Keys
- Security

---

## Queue Worker

Handles

- Async Delivery
- Retry System
- Large Notification Processing

---

## Real-Time Layer

Handles

- Live Dashboard Updates
- Instant Alerts

Using

- WebSocket
- Server Sent Events

---

# Event Architecture

Payment Completed

↓

Event Generated

↓

Notification Created

↓

Merchant Dashboard Updated

---

# External Integrations

- Email Service
- Push Notification
- SMS Provider
- WebSocket Gateway

---

# Background Jobs

- Remove Old Alerts
- Retry Failed Delivery
- Notification Cleanup

---

# Security Architecture

- JWT Authentication
- User Based Access
- Merchant Isolation
- Permission Check

---

# Logging

Track

- Notification Created
- Notification Sent
- Notification Read
- Notification Failed

---

# Scalability

- Queue Based Processing
- Worker Scaling
- Cached Notifications
- Database Indexing

---

# Future Scope

- Mobile Push
- Smart Alerts
- Notification Rules Engine
- User Preferences AI

---

End of Project Architecture
# Settings Project Architecture

Version: 1.0

Module: Merchant Dashboard → Settings

---

# Architecture Overview

Settings module manages merchant account configuration, security controls, preferences, and profile management.

---

# Architecture Flow

Merchant Dashboard

↓

Settings API

↓

Authentication Middleware

↓

Settings Service

↓

Security Service

↓

Database

↓

Audit Service

---

# Request Flow

User Request

↓

JWT Validation

↓

Permission Check

↓

Settings Controller

↓

Business Logic

↓

Database Update

↓

Response

---

# Folder Structure

src/
│
├── modules/
│   └── settings/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── security/
│       ├── preferences/
│       └── interfaces/
│
├── auth/
├── audit/
├── database/
├── middleware/
└── logs/

---

# Layer Responsibilities

## Profile Service

Handles

- Company Details
- Email Update
- Timezone

---

## Security Service

Handles

- Password Change
- 2FA
- Session Security

---

## Preference Service

Handles

- Notification Preferences
- Regional Settings

---

## Audit Service

Tracks

- Profile Changes
- Security Actions
- Login Events

---

# Password Security Flow

New Password

↓

Validation

↓

Hash Generation

↓

Save Hash

↓

Invalidate Sessions

---

# 2FA Architecture

User

↓

Generate Secret

↓

OTP Verification

↓

Enable Protection

↓

Secure Login

---

# External Integrations

- Authentication Service
- Email Service
- OTP Provider
- Notification Service

---

# Background Jobs

- Session Cleanup
- Token Expiry
- Security Monitoring

---

# Security Architecture

- JWT Authentication
- Password Hashing
- 2FA Verification
- Rate Limiting
- Audit Logs

---

# Logging

Track

- User Updates
- Password Changes
- 2FA Events
- Security Actions

---

# Scalability

- Separate Security Service
- Cached Preferences
- Async Notifications
- Indexed Queries

---

# Future Scope

- SSO Login
- Device Management
- Login History
- Advanced Security Center

---

End of Project Architecture
# Support Center Project Architecture

Version: 1.0

Module: Merchant Dashboard → Support Center

---

# Architecture Overview

Support Center module manages merchant communication, issue tracking, documentation access, and customer assistance.

---

# Architecture Flow

Merchant Dashboard

↓

Support API

↓

Authentication Middleware

↓

Ticket Service

↓

Support Queue

↓

Database

↓

Notification Service

---

# Ticket Request Flow

Merchant

↓

Create Ticket

↓

Validate Request

↓

Create Ticket Record

↓

Assign Support Agent

↓

Notify Team

---

# Folder Structure

src/
│
├── modules/
│   └── support/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── validators/
│       ├── tickets/
│       ├── messages/
│       └── interfaces/
│
├── auth/
├── notifications/
├── database/
├── queue/
└── logs/

---

# Layer Responsibilities

## Ticket Service

Handles

- Create Ticket
- Update Ticket
- Close Ticket
- Ticket Listing

---

## Message Service

Handles

- Merchant Reply
- Support Reply
- Conversation History

---

## Assignment Service

Handles

- Agent Assignment
- Manager Allocation
- Priority Handling

---

## Notification Service

Handles

- New Ticket Alert
- Reply Alert
- Status Updates

---

# Ticket Lifecycle

Created

↓

Assigned

↓

In Progress

↓

Resolved

↓

Closed

---

# Enterprise Support Flow

Enterprise Merchant

↓

Priority Detection

↓

Dedicated Manager

↓

Fast Resolution Queue

---

# External Integrations

- Email Service
- Notification Service
- Knowledge Base
- CRM System

---

# Background Jobs

- SLA Monitoring
- Auto Reminder
- Ticket Cleanup
- Notification Retry

---

# Security Architecture

- JWT Authentication
- RBAC
- Merchant Isolation
- Ticket Permission Check

---

# Logging

Track

- Ticket Created
- Reply Added
- Status Changed
- Ticket Closed

---

# Scalability

- Queue Based Processing
- Separate Ticket Service
- Cached Documentation
- Database Indexing

---

# Future Scope

- Live Chat
- AI Support Bot
- Voice Support
- Video Meetings
- Advanced SLA Dashboard

---

End of Project Architecture

# Transaction Module Architecture

backend/

src/

├── models/
│   ├── Transaction.js
│   └── TransactionExport.js

├── controllers/
│   └── transactionController.js

├── routes/
│   └── transactionRoutes.js

├── services/
│   ├── transactionService.js
│   ├── exportService.js
│   └── searchService.js

├── middlewares/
│   └── authMiddleware.js

├── validators/
│   └── transactionValidator.js

└── helpers/
    └── transactionHelper.js

------------------------------------------------

Flow

User
 ↓
Transaction Page
 ↓
Fetch Transactions
 ↓
Apply Filters
 ↓
Display Results


# Notifications Module Architecture

backend/

src/

├── models/
│   ├── Notification.js
│   └── NotificationSettings.js

├── controllers/
│   └── notificationController.js

├── routes/
│   └── notificationRoutes.js

├── services/
│   └── notificationService.js

├── middlewares/
│   └── authMiddleware.js

├── validators/
│   └── notificationValidator.js

└── helpers/
    └── notificationHelper.js

------------------------------------------------

Flow

System Event
      ↓
Create Notification
      ↓
Store Database
      ↓
Push Notification
      ↓
Display In Feed


# Profile Module Architecture

backend/

src/

├── models/
│   ├── Profile.js
│   ├── PlayerStats.js
│   ├── FavoriteChannel.js
│   └── Activity.js

├── controllers/
│   └── profileController.js

├── routes/
│   └── profileRoutes.js

├── services/
│   ├── profileService.js
│   ├── statsService.js
│   ├── activityService.js
│   └── channelService.js

├── middlewares/
│   └── authMiddleware.js

├── validators/
│   └── profileValidator.js

└── helpers/
    └── profileHelper.js

------------------------------------------------

Flow

User
 ↓
Profile Page
 ↓
Load Profile Data
 ↓
Fetch Stats
 ↓
Fetch Activities
 ↓
Render Dashboard


# Settings Module Architecture

backend/

src/

├── models/
│   ├── UserSettings.js
│   ├── NotificationSettings.js
│   └── ConnectedAccount.js

├── controllers/
│   └── settingsController.js

├── routes/
│   └── settingsRoutes.js

├── services/
│   ├── accountService.js
│   ├── securityService.js
│   ├── notificationService.js
│   └── connectionService.js

├── middlewares/
│   └── authMiddleware.js

├── validators/
│   └── settingsValidator.js

└── helpers/
    └── settingsHelper.js

------------------------------------------------

Flow

User
 ↓
Settings Page
 ↓
Update Preference
 ↓
Validation
 ↓
Database Update
 ↓
Success Response
# Support Module Architecture

backend/

src/

├── models/
│   ├── SupportTicket.js
│   ├── FAQ.js
│   ├── ChatSession.js
│   └── Documentation.js

├── controllers/
│   └── supportController.js

├── routes/
│   └── supportRoutes.js

├── services/
│   ├── ticketService.js
│   ├── faqService.js
│   ├── chatService.js
│   └── documentationService.js

├── middlewares/
│   └── authMiddleware.js

├── validators/
│   └── supportValidator.js

└── helpers/
    └── supportHelper.js

------------------------------------------------

Flow

User
 ↓
Search Support
 ↓
FAQ / Docs / Chat
 ↓
Issue Resolved

OR

Create Ticket
 ↓
Support Team
 ↓
Resolution