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
        isEvidence: true,
        relatedTo: ['aaron_cole', 'irene_walker', 'sophie_tanaka']
    },
    {
        id: 'file_002',
        name: 'financial_offshore_transfer.pdf',
        type: 'document',
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
        isEvidence: true,
        relatedTo: ['aaron_cole', 'marcus_webb']
    },
    {
        id: 'file_003',
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
        id: 'file_004',
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
        isEvidence: true,
        relatedTo: ['aaron_cole']
    },
    {
        id: 'file_005',
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
        id: 'file_006',
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
        id: 'file_007',
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
        id: 'file_008',
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
        id: 'file_009',
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
    }
];