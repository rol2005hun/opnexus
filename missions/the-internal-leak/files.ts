import type { FileDocument } from '../../shared/types';

export const files: FileDocument[] = [
    {
        id: 'file_001',
        name: 'sentinel_x_core_algorithms.pdf',
        type: 'document',
        size: '47.3 MB',
        lastModified: new Date('2025-07-10 03:45:00'),
        author: 'System Administrator',
        content: `CLASSIFIED DOCUMENT - SENTINEL-X PROJECT
        
Defense Contract #DOD-2025-SC-7841
Nexus-Corp Industries - Advanced Cybersecurity Solutions

CORE ALGORITHM SPECIFICATIONS:

1. Quantum Encryption Module
   - 2048-bit quantum key distribution
   - Real-time key rotation every 30 seconds
   - Vulnerability: Key exchange protocol has theoretical weakness during handshake

2. Threat Detection AI
   - Machine learning model trained on 50M+ attack patterns
   - 99.7% accuracy in zero-day detection
   - Performance: <50ms response time

3. Network Isolation Protocol
   - Automatic quarantine of compromised endpoints
   - Dynamic firewall rule generation
   - Advanced packet inspection at hardware level

BUDGET: $47,000,000 USD
DEADLINE: August 15, 2025

**WARNING: UNAUTHORIZED DISCLOSURE PUNISHABLE BY LAW**`,
        encrypted: true,
        accessLevel: 9,
        isEvidence: false,
        relatedTo: ['aaron_cole', 'irene_walker', 'sophie_tanaka']
    },
    {
        id: 'file_002',
        name: 'dod_contract_specs.docx',
        type: 'document',
        size: '2.1 MB',
        lastModified: new Date('2025-07-10 03:46:00'),
        author: 'Department of Defense',
        content: `DEPARTMENT OF DEFENSE
CONTRACT SPECIFICATIONS - SENTINEL-X CYBERSECURITY PLATFORM

Contract Number: DOD-2025-SC-7841
Prime Contractor: Nexus-Corp Industries
Contract Value: $47,000,000

REQUIREMENTS:
1. Multi-layered defense system capable of protecting classified networks
2. Real-time threat detection with 99%+ accuracy
3. Quantum-resistant encryption implementation
4. 24/7 monitoring and automated response capabilities
5. Full source code and documentation delivery

SECURITY CLEARANCE REQUIREMENTS:
- All personnel must have SECRET clearance minimum
- Code repositories must be air-gapped from internet
- Regular security audits every 90 days

COMPETING BIDDERS:
- CyberShield Industries (primary competitor)
- SecureNet Solutions
- DefenseTech Corp

EVALUATION CRITERIA:
- Technical capability (40%)
- Cost effectiveness (30%)
- Security implementation (20%)
- Timeline adherence (10%)

**CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY**`,
        encrypted: true,
        accessLevel: 8,
        isEvidence: false,
        relatedTo: ['irene_walker', 'sophie_tanaka', 'marcus_webb']
    },
    {
        id: 'file_003',
        name: 'financial_offshore_transfer.xlsx',
        type: 'spreadsheet',
        size: '156 KB',
        lastModified: new Date('2025-07-10 04:12:00'),
        author: 'Unknown',
        content: `FINANCIAL TRANSACTION RECORD

Date: July 10, 2025
From: CyberShield Holdings Ltd. (Cayman Islands)
To: Account #7749-XX-XXX (Swiss Banking Corp)
Amount: $75,000 USD

Transfer Code: SENT-X-INFO-2025
Reference: Technical documentation acquisition
Purpose: Consulting services

TRANSACTION DETAILS:
- Wire transfer confirmation: WR-2025-0710-4405
- Routing through 3 intermediate banks
- Final destination: Private account (Aaron M. Cole)
- Currency conversion: USD → CHF → USD
- Processing fee: $2,500 (covered by sender)

Status: COMPLETED
Authorized by: Dr. Marcus Webb, CTO`,
        encrypted: true,
        accessLevel: 7,
        isEvidence: false,
        relatedTo: ['aaron_cole', 'marcus_webb']
    },
    {
        id: 'file_004',
        name: 'network_access_logs.txt',
        type: 'document',
        size: '890 KB',
        lastModified: new Date('2025-07-14 09:00:00'),
        author: 'Security System',
        content: `NEXUS-CORP NETWORK ACCESS LOG
Generated: July 14, 2025 09:00 AM

UNUSUAL ACTIVITY DETECTED:

July 10, 2025:
03:35:00 - Badge access: Aaron Cole (Employee #NC-2847)
          Building entrance: Main lobby
03:42:00 - Workstation login: WS-457
          User: aaron.cole@nexus-corp.com
03:45:00 - File access: /classified/sentinel-x/core_algorithms.pdf
03:46:00 - File access: /classified/contracts/dod_contract_specs.docx
03:47:00 - USB device connected: SanDisk Ultra 32GB
03:47:00 - Large file transfer initiated (2.3GB)
03:52:00 - USB device disconnected
03:53:00 - Workstation logout
03:55:00 - Badge exit: Main lobby

SECURITY VIOLATIONS:
- After-hours access without authorization
- Classified file access outside normal work scope
- USB transfer of restricted documents
- Bypassed file tracking system (--skip-audit flag detected)

RECOMMENDATION: IMMEDIATE INVESTIGATION REQUIRED

System Administrator: Liam Rivera`,
        encrypted: false,
        accessLevel: 6,
        isEvidence: false,
        relatedTo: ['aaron_cole', 'liam_rivera', 'irene_walker']
    },
    {
        id: 'file_005',
        name: 'divorce_settlement_demand.pdf',
        type: 'document',
        size: '1.2 MB',
        lastModified: new Date('2025-07-09 14:30:00'),
        author: 'Bradley & Associates Law Firm',
        content: `BRADLEY & ASSOCIATES LAW FIRM
Family Law Division

Re: Cole vs. Cole Divorce Settlement
Case #2025-FAM-3847

Mr. Aaron Michael Cole
47 Riverside Drive
Arlington, VA 22201

Dear Mr. Cole,

This letter serves as formal demand for immediate payment of outstanding legal fees and court-ordered settlements in the matter of Cole vs. Cole.

OUTSTANDING AMOUNTS:
- Legal fees (your representation): $12,500
- Ex-spouse legal fees (court ordered): $8,750
- Asset evaluation costs: $2,200
- Court filing fees: $450

TOTAL DUE: $23,900

Payment must be received within 7 days of this notice (by July 16, 2025) or we will file for contempt of court proceedings, which may result in:
- Wage garnishment
- Asset seizure
- Possible incarceration

We understand financial hardship, but the court's deadlines are non-negotiable.

For payment arrangements, contact our office immediately.

Sincerely,
Margaret Bradley, Esq.
Senior Partner`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['aaron_cole']
    },
    {
        id: 'file_006',
        name: 'competitor_analysis_cybershield.pptx',
        type: 'document',
        size: '8.9 MB',
        lastModified: new Date('2025-07-12 16:20:00'),
        author: 'CyberShield Strategy Team',
        content: `CYBERSHIELD INDUSTRIES - INTERNAL STRATEGY PRESENTATION
"DEFEATING NEXUS-CORP'S SENTINEL-X BID"

SLIDE 1: OVERVIEW
Mission: Secure the $47M DOD cybersecurity contract
Primary Competitor: Nexus-Corp Industries

SLIDE 2: INTELLIGENCE GATHERED
Source: Acquired Nexus-Corp technical documentation
Date Received: July 10, 2025
Content: Core algorithms, contract specs, timeline

SLIDE 3: NEXUS-CORP WEAKNESSES IDENTIFIED
1. Quantum encryption vulnerability during handshake
2. Aggressive timeline (August 15 deadline)
3. Budget constraints causing quality shortcuts
4. Internal security breaches

SLIDE 4: OUR COMPETITIVE ADVANTAGE
- Superior encryption without handshake vulnerability
- More realistic timeline allowing proper testing
- 15% cost savings compared to Nexus-Corp
- Proven track record with DOD contracts

SLIDE 5: WINNING STRATEGY
- Highlight Nexus-Corp's security weaknesses
- Demonstrate our superior technical solution
- Emphasize cost savings and timeline reliability
- Leverage our inside knowledge of their approach

**CONFIDENTIAL - STRATEGIC ADVANTAGE MATERIAL**`,
        encrypted: true,
        accessLevel: 8,
        isEvidence: false,
        relatedTo: ['marcus_webb', 'aaron_cole']
    },
    {
        id: 'file_007',
        name: 'Q2_financial_report.pdf',
        type: 'document',
        size: '2.1 MB',
        lastModified: new Date('2025-07-03 14:00:00'),
        author: 'Finance Team',
        content: `## NEXUS-CORP INDUSTRIES
### QUARTERLY FINANCIAL REPORT - Q2 2025

#### EXECUTIVE SUMMARY:
- Revenue: **$156.7M** (18% increase YoY)
- Net Income: **$23.4M** (22% increase YoY)
- R&D Investment: **$31.2M** (focusing on Sentinel-X project)

#### KEY HIGHLIGHTS:
- Secured major defense contracts worth **$47M**
- Successful completion of 3 major cybersecurity implementations
- Team expansion: Added **45 new employees** across all departments
- New defense contracts secured worth **$23M**

#### DEPARTMENT PERFORMANCE:
- **Cybersecurity Division:** $89M revenue (57% of total)
- **Cloud Services:** $34M revenue (22% of total)
- **Consulting:** $33.7M revenue (21% of total)

#### R&D INVESTMENTS:
- Sentinel-X Project: **$18.5M** (59% of R&D budget)
- Next-gen encryption: **$8.2M**
- AI/ML security tools: **$4.5M**

#### EMPLOYEE METRICS:
- Total employees: **342**
- Employee satisfaction: **87%**
- Employee bonus pool increased by **8%**
- New hires this quarter: **45**

#### FORWARD OUTLOOK:
- Q3 target revenue: **$175M**
- Sentinel-X delivery: **August 15, 2025**
- Expected contract renewals: **$28M**`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['finance_team']
    },
    {
        id: 'file_008',
        name: 'security_logs_july_10.pdf',
        type: 'document',
        size: '2.4 MB',
        lastModified: new Date('2025-07-10 15:45:00'),
        author: 'Liam Rivera',
        content: `## NEXUS-CORP SECURITY INCIDENT REPORT

**Date:** July 10, 2025  
**Analyst:** Liam Rivera, Cybersecurity Specialist

### INCIDENT OVERVIEW:
Suspicious network activity detected on workstation **WS457**  
**Time frame:** July 10, 2025 - 03:30 to 04:15 AM  
**User account:** aaron.cole@nexus-corp.com

### ANOMALOUS ACTIVITIES DETECTED:
- **03:30:12** - Unusual login outside normal business hours
- **03:31:45** - Access to classified project directories
- **03:32:18** - Large file downloads initiated
- **03:45:00** - File access: /classified/sentinel-x/core_algorithms.pdf (47.3 MB)
- **03:46:00** - File access: /classified/contracts/dod_contract_specs.docx (2.1 MB)
- **03:52:30** - USB device connected (Device ID: VID_8087&PID_0032)
- **03:53:45** - Data transfer to external device initiated
- **04:02:12** - *156.7 MB transferred to USB device*
- **04:14:33** - USB device disconnected
- **04:15:22** - User logout

### 🚨 SECURITY ASSESSMENT:
- **CRITICAL:** Unauthorized access to classified documents
- **CRITICAL:** Large data exfiltration to external device
- **CRITICAL:** Activity pattern consistent with insider threat

### FILES ACCESSED:
- sentinel_x_core_algorithms.pdf *(CLASSIFIED)*
- dod_contract_specs.docx *(CLASSIFIED)*
- project_timeline_internal.xlsx *(CONFIDENTIAL)*
- budget_breakdown_detailed.pdf *(CONFIDENTIAL)*

### RECOMMENDATIONS:
1. Immediate investigation of user aaron.cole
2. Review all recent file access by this account
3. Interview user regarding after-hours activities
4. Implement additional monitoring on this workstation
5. Consider suspending access pending investigation

### EVIDENCE PRESERVED:
- Complete system audit log
- Network traffic analysis
- USB device forensic imaging
- File access timestamps and checksums

**SECURITY CLASSIFICATION: CONFIDENTIAL**  
**INVESTIGATION STATUS: ACTIVE**`,
        encrypted: true,
        accessLevel: 7,
        isEvidence: true,
        relatedTo: ['aaron_cole', 'liam_rivera']
    },
    {
        id: 'file_009',
        name: 'workstation_WS457_forensics.zip',
        type: 'archive',
        size: '856 KB',
        lastModified: new Date('2025-07-14 14:15:00'),
        author: 'Liam Rivera',
        content: `FORENSIC ANALYSIS ARCHIVE - WORKSTATION WS457
Created by: Liam Rivera, Cybersecurity Specialist
Date: July 14, 2025

CONTENTS:
1. registry_backup.reg - Windows registry backup
2. browser_history.csv - Complete web browsing history
3. file_access_log.txt - Detailed file system access log
4. network_traffic.pcap - Network packet capture
5. usb_devices.log - USB device connection history
6. system_events.evtx - Windows system event log

KEY FINDINGS FROM ANALYSIS:

BROWSER HISTORY HIGHLIGHTS:
- Multiple visits to competitor websites (CyberShield Industries)
- Job search activities on LinkedIn
- Cryptocurrency wallet access
- Email access from personal accounts

FILE SYSTEM ANALYSIS:
- Deleted file recovery: temp_backup_sentinel.pdf
- Cache analysis reveals document viewing patterns
- Temporary files suggest document manipulation
- Evidence of file compression and encryption

NETWORK ANALYSIS:
- Unusual data transfers to external IPs
- Encrypted communication attempts
- File upload activities to cloud storage
- VPN usage during incident timeframe

USB DEVICE FORENSICS:
- Device identified: SanDisk Ultra 64GB
- Files transferred: 156.7 MB total
- File types: PDF, DOCX, XLSX, encrypted archives
- Transfer completed in 8 minutes 41 seconds

REGISTRY ANALYSIS:
- Recent document access patterns
- Application usage tracking
- Network configuration changes
- Security software manipulation attempts

CONCLUSIONS:
This workstation shows clear evidence of:
- Unauthorized document access
- Data exfiltration activities  
- Counter-surveillance measures
- Insider threat behavior patterns

**CLASSIFICATION: RESTRICTED**
**CHAIN OF CUSTODY: MAINTAINED**`,
        encrypted: true,
        accessLevel: 8,
        isEvidence: true,
        relatedTo: ['aaron_cole', 'liam_rivera']
    },
    {
        id: 'file_010',
        name: 'NDA_v2.3_updated.pdf',
        type: 'document',
        size: '445 KB',
        lastModified: new Date('2025-07-18 14:30:00'),
        author: 'Legal Department',
        content: `## NEXUS-CORP INDUSTRIES
### NON-DISCLOSURE AGREEMENT (NDA) v2.3
**Updated:** July 18, 2025

#### PARTIES:
**Company:** Nexus-Corp Industries Inc.  
**Employee:** [EMPLOYEE NAME]

#### CONFIDENTIAL INFORMATION DEFINITION:
This Agreement covers all proprietary information including but not limited to:

**1. TECHNICAL INFORMATION:**
   - Software source code and algorithms
   - System architectures and designs
   - Security protocols and encryption methods
   - Performance data and benchmarks
   - Research and development projects

**2. BUSINESS INFORMATION:**
   - Customer lists and contact information
   - Pricing strategies and financial data
   - Marketing plans and business strategies
   - Contract terms and negotiations
   - Vendor relationships and partnerships

**3. GOVERNMENT CONTRACTS:**
   - Defense contractor specifications
   - Security clearance requirements
   - Classification levels and handling procedures
   - Project timelines and milestones
   - Budget allocations and cost structures

#### OBLIGATIONS:
Employee agrees to:
- Maintain strict confidentiality of all covered information
- Not disclose information to competitors or unauthorized parties
- Return all company materials upon termination
- Report any suspected security breaches immediately
- Comply with all security protocols and procedures

#### VIOLATIONS:
Breach of this agreement may result in:
- **Immediate termination**
- **Legal action for damages**
- **Criminal prosecution for trade secret theft**
- **Forfeiture of all benefits and compensation**
- **Lifetime industry blacklisting**

#### DURATION:
This agreement remains in effect for **5 years** following employment termination.

#### UPDATES IN VERSION 2.3:
- Enhanced data handling requirements
- Stricter penalties for violations
- Extended coverage to social media activities
- Mandatory security training requirements

*By signing, employee acknowledges understanding and agrees to all terms.*`,
        encrypted: false,
        accessLevel: 2,
        isEvidence: false,
        relatedTo: ['legal_department']
    },
    {
        id: 'file_011',
        name: 'clearance_renewal_form.docx',
        type: 'document',
        size: '128 KB',
        lastModified: new Date('2025-07-18 14:35:00'),
        author: 'Security Office',
        content: `## SECURITY CLEARANCE RENEWAL APPLICATION
### Form SF-86C (Continuation for Contractors)

#### SECTION 1: PERSONAL INFORMATION
**Name:** [EMPLOYEE NAME]  
**SSN:** [REDACTED]  
**Date of Birth:** [REDACTED]  
**Current Clearance Level:** SECRET  
**Requested Level:** TOP SECRET/SCI

#### SECTION 2: EMPLOYMENT HISTORY
**Current Position:** [EMPLOYEE TITLE]  
**Department:** [DEPARTMENT]  
**Supervisor:** [SUPERVISOR NAME]  
**Date Started:** [START DATE]

#### PROJECT ACCESS REQUIRED:
- ☑ Sentinel-X Cybersecurity Platform
- ☑ Defense Contractor Network Security
- ☑ Government Communications Systems
- ☐ Nuclear Facility Protection Systems

#### SECTION 3: FINANCIAL DISCLOSURE
**Recent Financial Changes:** Yes ☐ No ☑  
**Outstanding Debts:** $[AMOUNT]  
**Recent Large Purchases:** [DETAILS]  
**Gambling Activities:** None ☑ Some ☐ Extensive ☐

#### SECTION 4: FOREIGN CONTACTS
**Travel Outside US (Last 7 Years):** [DETAILS]  
**Foreign Nationals Contact:** [DETAILS]  
**Foreign Business Interests:** None ☑

#### SECTION 5: PERSONAL CONDUCT
**Criminal History:** None ☑  
**Drug Use:** None ☑  
**Alcohol Issues:** None ☑  
**Mental Health Treatment:** [DETAILS]

#### SECTION 6: REFERENCES
**Professional References:** [3 REQUIRED]  
**Personal References:** [2 REQUIRED]  
**Character References:** [2 REQUIRED]

#### SECTION 7: INVESTIGATION CONSENT
I consent to background investigation including:
- ☑ Credit and financial records review
- ☑ Employment verification
- ☑ Criminal background check
- ☑ Reference interviews
- ☑ Social media monitoring
- ☑ Polygraph examination if required

#### RENEWAL JUSTIFICATION:
Continued access required for ongoing defense projects.  
**Current clearance expires:** [DATE]  
**Requested effective date:** [DATE]

#### SECURITY OFFICER NOTES:
**Preliminary review completed:** [DATE]  
**Investigation priority:** STANDARD  
**Estimated completion:** 45-60 days

---
**⚠️ THIS FORM CONTAINS SENSITIVE PERSONAL INFORMATION**  
**HANDLE ACCORDING TO PRIVACY ACT REQUIREMENTS**`,
        encrypted: true,
        accessLevel: 6,
        isEvidence: false,
        relatedTo: ['security_office']
    },
    {
        id: 'file_005',
        name: 'source_code_archive.zip',
        type: 'archive',
        size: '125 MB',
        lastModified: new Date('2025-07-10 03:50:00'),
        author: 'Aaron Cole',
        content: `ARCHIVED SOURCE CODE - SENTINEL-X PROJECT

This archive contains:
- Core security algorithms (C++)
- Threat detection neural networks (Python)
- UI components (React/TypeScript)
- Database schemas (PostgreSQL)
- API documentation (OpenAPI 3.0)

Total files: 2,847
Total lines of code: 487,293

**WARNING: This code is classified and proprietary to Nexus-Corp Industries**
**Unauthorized distribution is strictly prohibited**

Archive created: 2025-07-10 03:50:00 UTC
Created by: A.Cole (Employee ID: NC-2847)
Compression: 7-Zip AES-256`,
        encrypted: true,
        accessLevel: 9,
        isEvidence: true,
        relatedTo: ['aaron_cole', 'marcus_webb']
    },
    {
        id: 'file_006',
        name: 'security_scan_report.log',
        type: 'document',
        size: '4.2 MB',
        lastModified: new Date('2025-07-08 09:25:00'),
        author: 'SecurityBot v3.1',
        content: `NEXUS-CORP SECURITY SCAN REPORT
Generated: 2025-07-08 09:25:00

SCAN SUMMARY:
- Files scanned: 1,247,892
- Threats detected: 7
- False positives: 12
- Clean files: 1,247,873

FLAGGED FILES:
1. /projects/sentinel-x/src/encryption/temp_backup.dat
   Risk Level: HIGH
   Reason: Unencrypted sensitive data
   
2. /users/acole/downloads/financial_docs.zip
   Risk Level: MEDIUM
   Reason: Suspicious file patterns
   
3. /shared/backups/old_passwords.txt
   Risk Level: HIGH
   Reason: Plain text credentials

RECOMMENDED ACTIONS:
- Encrypt sensitive backup files
- Review download policies
- Implement automatic password rotation

Scan completed in 47 minutes.`,
        encrypted: false,
        accessLevel: 5,
        isEvidence: false,
        relatedTo: ['david_kim', 'elena_rodriguez']
    },
    {
        id: 'file_007',
        name: 'backup_summary_20250708.txt',
        type: 'document',
        size: '128 KB',
        lastModified: new Date('2025-07-08 07:30:00'),
        author: 'Backup System',
        content: `NEXUS-CORP BACKUP SUMMARY
Date: July 8, 2025
Backup Window: 02:00 - 05:00 UTC

BACKUP STATISTICS:
- Total data processed: 2.4 TB
- Backup duration: 3h 12m
- Success rate: 99.7%
- Failed items: 23 (see details below)

SUCCESSFUL BACKUPS:
✓ User data (480 GB)
✓ Project files (1.2 TB)
✓ Database snapshots (320 GB)
✓ System configurations (45 GB)
✓ Security logs (180 GB)

FAILED ITEMS:
× /projects/sentinel-x/temp/large_dataset.bin (file locked)
× /users/acole/personal/encrypted_archive.7z (permission denied)
× /shared/media/presentation_videos/* (network timeout)

VERIFICATION STATUS:
- Integrity checks: PASSED
- Recovery test: PASSED
- Compression ratio: 67%

Next backup scheduled: July 9, 2025 02:00 UTC`,
        encrypted: false,
        accessLevel: 4,
        isEvidence: false,
        relatedTo: ['anna_lee', 'david_kim']
    },
    {
        id: 'file_008',
        name: 'project_alpha_specs_v2.docx',
        type: 'document',
        size: '3.7 MB',
        lastModified: new Date('2025-07-07 09:45:00'),
        author: 'Laura Smith',
        content: `PROJECT ALPHA - TECHNICAL SPECIFICATIONS v2.0

PROJECT OVERVIEW:
Project Alpha is a next-generation customer relationship management system designed to integrate with our existing security infrastructure.

TECHNICAL REQUIREMENTS:
1. Database Integration
   - PostgreSQL 14+ compatibility
   - Real-time synchronization with Sentinel-X
   - Encrypted data at rest and in transit

2. User Interface
   - Modern responsive design
   - Accessibility compliance (WCAG 2.1 AA)
   - Multi-language support

3. Security Features
   - Single sign-on integration
   - Role-based access control
   - Audit logging for all actions

4. Performance Requirements
   - Response time < 200ms for 95% of requests
   - Support for 1000+ concurrent users
   - 99.9% uptime SLA

TIMELINE:
- Phase 1: Core development (6 weeks)
- Phase 2: Security integration (3 weeks)
- Phase 3: Testing and deployment (2 weeks)

BUDGET: $280,000`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['laura_smith', 'michael_chang']
    },
    {
        id: 'file_009',
        name: 'test_results_july2025.xlsx',
        type: 'spreadsheet',
        size: '890 KB',
        lastModified: new Date('2025-07-07 10:00:00'),
        author: 'Gary Johnson',
        content: `PROJECT ALPHA TESTING RESULTS - JULY 2025

TEST SUMMARY:
Total Test Cases: 847
Passed: 831 (98.1%)
Failed: 16 (1.9%)
Blocked: 0

CRITICAL BUGS: 0
HIGH PRIORITY: 3
MEDIUM PRIORITY: 8
LOW PRIORITY: 5

PERFORMANCE METRICS:
Average Response Time: 142ms
Peak Load Handling: 1,250 users
Memory Usage: 2.1GB average
CPU Usage: 23% average

FAILED TEST CASES:
TC-234: Login timeout on slow networks
TC-456: PDF export formatting issue
TC-789: Calendar sync delay

SECURITY TESTS:
✓ SQL Injection prevention
✓ XSS protection
✓ CSRF token validation
✓ Authentication bypass attempts
✓ Data encryption verification

Overall Quality Score: 97.2%
Recommendation: READY FOR DEPLOYMENT`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['gary_johnson', 'michael_chang']
    },
    {
        id: 'file_010',
        name: 'ui_mockups_final.png',
        type: 'image',
        size: '12.4 MB',
        lastModified: new Date('2025-07-07 09:30:00'),
        author: 'Nina Patel',
        content: `UI MOCKUP COLLECTION - PROJECT ALPHA

This file contains high-resolution mockups for:
- Login/Authentication screens
- Dashboard layouts
- Data entry forms
- Reporting interfaces
- Mobile responsive designs

Design specifications:
- Color scheme: Corporate blue (#007acc) primary
- Typography: Inter font family
- Icon set: Feather icons
- Grid system: 12-column responsive
- Breakpoints: Mobile (320px), Tablet (768px), Desktop (1024px+)

Client feedback summary:
"Clean, professional design that aligns perfectly with our brand guidelines. The user flow is intuitive and the accessibility features are well thought out."

Approval status: APPROVED
Next steps: Development handoff`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['nina_patel', 'michael_chang']
    },
    {
        id: 'file_011',
        name: 'design_concepts_draft.psd',
        type: 'image',
        size: '45.2 MB',
        lastModified: new Date('2025-07-04 10:30:00'),
        author: 'Jessica Clark',
        content: `MARKETING DESIGN CONCEPTS - DRAFT VERSION

Project: New Product Launch Campaign
Designer: Jessica Clark
Date: July 4, 2025

Design Elements:
- Logo variations (primary, secondary, monochrome)
- Color palette: Deep blue (#1a365d), Accent blue (#007acc), Silver (#c2c8d4)
- Typography: Montserrat (headings), Open Sans (body)
- Photography style: Professional, tech-focused
- Layout concepts for digital and print media

Included designs:
1. Website banner concepts (1920x1080)
2. Social media templates (Instagram, LinkedIn, Twitter)
3. Print advertisement layouts (A4, Letter)
4. Business card templates
5. Email signature designs

Software: Adobe Photoshop CC 2024
Resolution: 300 DPI for print, 72 DPI for web
Color space: RGB (digital), CMYK (print)

Status: DRAFT - Awaiting client feedback`,
        encrypted: false,
        accessLevel: 2,
        isEvidence: false,
        relatedTo: ['jessica_clark', 'christina_bell']
    },
    {
        id: 'file_012',
        name: 'q3_marketing_budget.xlsx',
        type: 'spreadsheet',
        size: '487 KB',
        lastModified: new Date('2025-07-06 08:45:00'),
        author: 'Mark Thompson',
        content: `Q3 2025 MARKETING BUDGET BREAKDOWN

TOTAL BUDGET: $180,000

DIGITAL ADVERTISING:
- Google Ads: $45,000 (25%)
- LinkedIn Sponsored Content: $32,000 (18%)
- Facebook/Instagram: $28,000 (16%)
- YouTube Pre-roll: $15,000 (8%)

CONTENT CREATION:
- Video Production: $25,000 (14%)
- Photography: $8,000 (4%)
- Copywriting: $6,000 (3%)
- Graphic Design: $4,000 (2%)

EVENTS & CONFERENCES:
- Trade Show Participation: $12,000 (7%)
- Networking Events: $3,000 (2%)
- Webinar Hosting: $2,000 (1%)

PREVIOUS QUARTER COMPARISON:
Q2 Budget: $165,000
Q3 Budget: $180,000
Increase: $15,000 (9%)

ROI TARGETS:
- Lead Generation: 150% increase
- Brand Awareness: 40% lift
- Conversion Rate: 25% improvement

Budget allocation optimized for maximum digital reach.`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['mark_thompson', 'christina_bell']
    },
    {
        id: 'file_013',
        name: 'q2_analytics_report.pdf',
        type: 'document',
        size: '2.8 MB',
        lastModified: new Date('2025-07-06 10:15:00'),
        author: 'Robert Davis',
        content: `NEXUS-CORP MARKETING ANALYTICS REPORT
Q2 2025 PERFORMANCE SUMMARY

EXECUTIVE SUMMARY:
Q2 2025 marked significant growth across all marketing channels, with engagement rates reaching new highs and conversion metrics exceeding targets.

KEY METRICS:
Website Traffic:
- Unique visitors: 47,892 (+23% vs Q1)
- Page views: 189,473 (+31% vs Q1)
- Bounce rate: 32% (-8% vs Q1)
- Session duration: 4:32 average (+15% vs Q1)

Social Media Performance:
- LinkedIn followers: +2,847 new
- Instagram engagement: 8.4% average
- Twitter impressions: 245,000
- YouTube watch time: 1,247 hours

Campaign Performance:
- Email open rate: 24.7% (industry avg: 21.3%)
- Click-through rate: 6.2% (industry avg: 4.8%)
- Lead conversion: 18.5% (+4.2% vs Q1)
- Cost per lead: $47 (-12% vs Q1)

TOP PERFORMING CONTENT:
1. "Future of Cybersecurity" whitepaper (2,847 downloads)
2. Product demo videos (89% completion rate)
3. Customer success stories (74% engagement)

RECOMMENDATIONS:
- Increase video content production
- Expand LinkedIn advertising
- Develop industry partnership content
- Optimize mobile user experience

Next quarter outlook: POSITIVE`,
        encrypted: false,
        accessLevel: 3,
        isEvidence: false,
        relatedTo: ['robert_davis', 'christina_bell']
    }
];