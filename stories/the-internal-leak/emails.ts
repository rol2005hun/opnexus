import type { EmailMessage } from '#shared/types';

export const emails: EmailMessage[] = [
    {
        id: 'email_001',
        from: 'irene.walker@nexus-corp.com',
        to: ['security@nexus-corp.com', 'ceo@nexus-corp.com'],
        cc: ['legal@nexus-corp.com'],
        subject: 'URGENT: Suspected Data Breach - Sentinel-X Project',
        body: `CONFIDENTIAL - IMMEDIATE ACTION REQUIRED

Team,

I've discovered suspicious network activity that suggests unauthorized access to our Sentinel-X project files. My security monitoring detected several anomalies over the past week:

1. Unusual file access patterns outside normal working hours
2. Large data transfers to external storage devices
3. Bypassing of our standard file tracking protocols

This could be a serious security breach. The Sentinel-X project contains classified defense contractor information worth $47M to our company.

I'm recommending immediate investigation and temporary suspension of project access until we can identify the source.

Please treat this with highest priority.

Best regards,
Irene Walker
Chief Technology Officer
Nexus-Corp Industries`,
        timestamp: '2025-07-14 08:45:00',
        encrypted: false,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_001', 'clue_timeline']
    },
    {
        id: 'email_002',
        from: 'liam.rivera@nexus-corp.com',
        to: ['irene.walker@nexus-corp.com'],
        cc: ['security@nexus-corp.com'],
        subject: 'Re: Data Breach Investigation - USB Transfer Evidence',
        body: `Irene,

Following up on your security alert. I've completed the forensic analysis of our network logs and found concrete evidence:

**CRITICAL FINDING:**
Thursday, July 10th at 03:47 AM - Someone connected a USB storage device to workstation WS-457 and copied approximately 2.3GB of Sentinel-X project files.

The transfer included:
- Technical specifications (sentinel_x_core_algorithms.pdf)
- Defense contractor requirements (dod_contract_specs.docx)
- Source code repositories (complete codebase backup)
- Test results and vulnerability assessments

Workstation WS-457 is assigned to the development team. Badge access logs show only three people had building access that early: Aaron Cole, Chloe Miller, and Sophie Tanaka.

I'm attaching the detailed forensic report. This is definitely an insider threat.

We need to act fast before more damage is done.

Liam Rivera
Cybersecurity Specialist`,
        timestamp: '2025-07-14 14:30:00',
        encrypted: true,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_002', 'clue_usb_transfer', 'clue_workstation'],
        attachments: [
            {
                name: 'security_logs_july_10.pdf',
                size: '2.4 MB',
                type: 'application/pdf'
            },
            {
                name: 'workstation_WS457_forensics.zip',
                size: '856 KB',
                type: 'application/zip'
            }
        ]
    },
    {
        id: 'email_003',
        from: 'chloe.miller@nexus-corp.com',
        to: ['dev-team@nexus-corp.com'],
        subject: 'File Tracking System - Temporary Workaround',
        body: `Hi team,

For those who've been having issues with the file tracking system slowing down your builds - I found a workaround that Aaron showed me.

You can bypass the tracking by using the --skip-audit flag when pushing code. It's much faster and the system won't log every single file change.

Example:
git push --skip-audit origin feature-branch

This should help us meet our tight deadlines without the system constantly flagging our development work.

Just remember to be careful what you're pushing!

Chloe

P.S. - Don't mention this workaround in official documentation. It's just between the dev team. 😉`,
        timestamp: '2025-07-08 16:20:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: true,
        clueIds: ['clue_003', 'clue_bypass_tracking']
    },
    {
        id: 'email_004',
        from: 'aaron.cole@nexus-corp.com',
        to: ['hr@nexus-corp.com'],
        subject: 'Salary Advance Request - Urgent',
        body: `Dear HR Team,

I need to request an emergency salary advance of $15,000 due to unexpected financial obligations related to my recent divorce proceedings.

My ex-wife's attorney is demanding immediate payment for legal fees, and I'm facing potential contempt of court charges if I can't pay by next week.

I've been with Nexus-Corp for 8 years and have never requested an advance before. I'm willing to have it deducted from my salary over the next 12 months.

Please let me know what documentation you need to process this urgently.

Thank you,
Aaron Cole
Senior Software Developer
Employee ID: NC-2847`,
        timestamp: '2025-07-09 19:45:00',
        encrypted: false,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_004', 'clue_financial_pressure']
    },
    {
        id: 'email_005',
        from: 'sophie.tanaka@nexus-corp.com',
        to: ['sentinel-x-team@nexus-corp.com'],
        subject: 'URGENT: Q4 Deadline Acceleration Required',
        body: `Team,

I just got off a call with the defense contracting board. They've moved up our Sentinel-X demonstration deadline by 3 weeks due to competing bids from CyberShield Industries.

**NEW DEADLINE: August 15th (was September 5th)**

This means we need to cut some corners on our usual processes to make this work:

1. Streamline code reviews (focus on critical features only)
2. Parallel development instead of sequential
3. Skip non-essential documentation until after demo
4. Fast-track testing on core modules

I know this puts pressure on everyone, but this contract is worth $47M to our company. Everyone's bonuses depend on landing this deal.

**DETAILED ACTION PLAN:**

**Week 1 (July 7-14):**
- Complete core algorithm implementation
- Finalize security protocols
- Begin integration testing
- Document critical features only

**Week 2 (July 15-22):**
- Complete integration testing
- Performance optimization
- Bug fixing and debugging
- Prepare demonstration environment

**Week 3 (July 23-30):**
- Final testing and validation
- Demonstration preparation
- Client presentation materials
- Contingency planning

**Week 4 (July 31 - August 7):**
- Final bug fixes
- Performance tuning
- Security audits
- Documentation cleanup

**Week 5 (August 8-15):**
- Final preparations
- Client demonstration
- Q&A preparation
- Contract finalization

**RESOURCE ALLOCATION:**
- Aaron Cole: Lead on security implementations
- Chloe Miller: Core algorithm development
- Development Team: Parallel feature development
- QA Team: Accelerated testing cycles

**RISK MITIGATION:**
- Daily stand-ups at 8 AM sharp
- Weekly progress reviews with stakeholders
- Backup plans for critical features
- External consultant availability if needed

Whatever it takes to get Sentinel-X ready - do it. I'll handle any process violations with management.

This is our chance to secure the biggest contract in company history. Let's make it count!

Sophie
Project Manager - Sentinel-X

"Success requires sacrifice." - Let's make it happen!

P.S. Pizza and coffee will be provided for all overtime hours. Let me know what else you need to make this work.`,
        timestamp: '2025-07-07 11:30:00',
        encrypted: false,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_005', 'clue_pressure', 'clue_deadline']
    },
    {
        id: 'email_006',
        from: 'marcus.webb@cybershield.com',
        to: ['acquisition@cybershield.com'],
        subject: 'Nexus-Corp Intelligence - Project Sentinel-X',
        body: `Team,

Excellent work on acquiring the Nexus-Corp technical specifications. The Sentinel-X documents you provided give us exactly what we need to counter their bid.

Key insights from their leaked materials:
- Their quantum encryption has a theoretical vulnerability in the key exchange protocol
- They're behind schedule (August 15th deadline is aggressive)
- Budget overruns suggest quality issues

I've forwarded the technical specs to our development team. We can now build a superior competing proposal that directly addresses their weaknesses.

Our defense contract bid is now much stronger thanks to this intelligence.

The payment has been processed to the agreed account. $75,000 as discussed.

Keep the pipeline open for any additional information.

Dr. Marcus Webb
CTO, CyberShield Industries

**CONFIDENTIAL - Do not forward outside leadership team**`,
        timestamp: '2025-07-12 20:15:00',
        encrypted: true,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_006', 'clue_payment', 'clue_competitor']
    },
    {
        id: 'email_007',
        from: 'marketing@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Summer BBQ Event - July 20th',
        body: `Dear Team,

Join us for our annual summer BBQ!

**When:** Saturday, July 20th, 3:00 PM - 8:00 PM
**Where:** Nexus-Corp Outdoor Pavilion
**Food:** Burgers, hot dogs, vegetarian options, drinks

Please RSVP by July 18th so we can plan accordingly.

Looking forward to seeing everyone!

Marketing Team`,
        timestamp: '2025-07-15 09:00:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false,
        clueIds: [],
        folder: 'trash'
    },
    {
        id: 'email_008',
        from: 'me@nexus-corp.com',
        to: ['security@nexus-corp.com'],
        subject: 'RE: Security Protocol Update Request',
        body: `Hi Team,

I've reviewed the new security protocols and have the following questions:

1. Will the new badge access system affect after-hours work?
2. Are there any changes to VPN access procedures?
3. When will the new file tracking system be implemented?

Please let me know when you have time to discuss.

Thanks,
Agent Smith`,
        timestamp: '2025-07-16 11:30:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false,
        clueIds: [],
        folder: 'sent'
    },
    {
        id: 'email_009',
        from: 'legal@nexus-corp.com',
        to: ['me@nexus-corp.com'],
        subject: 'Contract Documents for Review',
        body: `Dear Agent,

Please find attached the following documents for your review:

1. Non-disclosure agreement (updated version)
2. Security clearance renewal form
3. Legal compliance guidelines

These documents require your signature by end of week.

Best regards,
Legal Department`,
        timestamp: '2025-07-18 14:45:00',
        encrypted: false,
        importance: 'high',
        isEvidence: false,
        clueIds: [],
        attachments: [
            {
                name: 'NDA_v2.3_updated.pdf',
                size: '445 KB',
                type: 'application/pdf'
            },
            {
                name: 'clearance_renewal_form.docx',
                size: '128 KB',
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            {
                name: 'legal_compliance_guidelines.pdf',
                size: '1.1 MB',
                type: 'application/pdf'
            }
        ]
    }
];
