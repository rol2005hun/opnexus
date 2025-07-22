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
        id: 'email_010',
        from: 'hr@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Employee Wellness Program - Mental Health Resources',
        body: `Dear Team,

We're excited to announce our new Employee Wellness Program focusing on mental health support. 

**Available Resources:**
- Free counseling sessions with licensed therapists
- Stress management workshops every Tuesday at 3 PM
- Meditation room now available on the 3rd floor
- 24/7 mental health hotline: 1-800-WELLNESS

Remember, taking care of your mental health is just as important as physical health. We encourage all employees to take advantage of these resources.

If you're experiencing financial stress, work pressure, or personal challenges, please don't hesitate to reach out.

Best regards,
Human Resources Department`,
        timestamp: '2025-07-01 09:15:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
    },
    {
        id: 'email_011',
        from: 'finance@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Q2 Financial Review - Budget Updates',
        body: `Team,

Please find attached our Q2 financial review. Key highlights:

- Revenue up 12% compared to Q1
- Sentinel-X project on track for profitability
- New defense contracts secured worth $23M
- Employee bonus pool increased by 8%

Department heads, please review your budget allocations and submit any adjustment requests by July 25th.

Finance Team`,
        timestamp: '2025-07-03 14:30:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false,
        attachments: [
            {
                name: 'Q2_financial_report.pdf',
                size: '2.1 MB',
                type: 'application/pdf'
            }
        ]
    },
    {
        id: 'email_012',
        from: 'it-support@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'System Maintenance - Weekend Network Upgrades',
        body: `All Staff,

Scheduled network maintenance this weekend (July 12-13):

**Saturday 6 PM - Sunday 10 AM:**
- Email server upgrades
- VPN gateway updates
- File server maintenance
- Security system updates

During this time:
- Remote access may be intermittent
- File shares will be unavailable
- Badge access logs may have delays

For urgent access needs, contact IT emergency line: ext. 9999

IT Support Team`,
        timestamp: '2025-07-10 16:45:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
    },
    {
        id: 'email_013',
        from: 'aaron.cole@nexus-corp.com',
        to: ['family-law@smithandpartners.com'],
        subject: 'Urgent: Divorce Settlement Payment Schedule',
        body: `Dear Attorney Johnson,

I need to discuss modifying the payment schedule for my divorce settlement. The current monthly payments of $3,200 are becoming difficult to maintain with my current salary.

My ex-wife is threatening to go back to court if I miss another payment. I've already missed two payments this quarter due to unexpected medical expenses.

Is there any way we can:
1. Reduce the monthly amount temporarily
2. Defer some payments until my financial situation improves
3. Negotiate a lump sum settlement instead

I'm exploring additional income sources and should have better cash flow within the next month.

Please advise on the best approach.

Aaron Cole
Senior Developer, Nexus-Corp Industries
Phone: (555) 847-2931`,
        timestamp: '2025-07-02 19:30:00',
        encrypted: false,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_financial_pressure', 'clue_motive']
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
        id: 'email_014',
        from: 'facilities@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Parking Lot Maintenance - Temporary Changes',
        body: `Dear Employees,

Starting Monday July 14th, the main parking lot will undergo resurfacing. 

**Parking Changes:**
- Main lot closed July 14-18
- Use overflow lot behind Building C
- Visitor parking moved to street level
- Shuttle service available every 15 minutes

We apologize for any inconvenience. The new asphalt will provide better drainage and clearer parking lines.

Facilities Management`,
        timestamp: '2025-07-11 11:20:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
    },
    {
        id: 'email_015',
        from: 'marketing@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Employee Spotlight: June Recognition Awards',
        body: `Congratulations to our June Employee Recognition Award winners!

🏆 **Innovation Award:** Dr. Sarah Chen (R&D) - Revolutionary quantum encryption breakthrough
🏆 **Teamwork Award:** DevOps Team - Zero downtime during server migration
🏆 **Customer Service:** Mike Thompson (Sales) - Secured largest contract in company history
🏆 **Leadership Award:** Sophie Tanaka (PM) - Exceptional project management on Sentinel-X

These employees exemplify our core values of innovation, collaboration, and excellence. 

Congratulations to all winners! Your $500 gift cards and recognition certificates will be distributed at next week's all-hands meeting.

Marketing Team`,
        timestamp: '2025-06-30 15:45:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
    },
    {
        id: 'email_016',
        from: 'security@nexus-corp.com',
        to: ['aaron.cole@nexus-corp.com', 'chloe.miller@nexus-corp.com', 'sophie.tanaka@nexus-corp.com'],
        subject: 'Badge Access Audit - Late Night Building Entry',
        body: `Team,

As part of our routine security audit, we've noticed increased after-hours building access from the development team. While we understand project deadlines require extra hours, we need to ensure proper protocols are followed.

**Recent Late Night Access (Past 2 Weeks):**
- Aaron Cole: 8 entries after 11 PM
- Chloe Miller: 3 entries after 11 PM  
- Sophie Tanaka: 5 entries after 11 PM

Please remember:
1. Security escort required after midnight
2. Sign-in required at security desk
3. All file access is logged and monitored
4. USB devices must be approved for building entry

If you need regular late-night access, please request extended hours authorization.

Security Team`,
        timestamp: '2025-07-09 09:30:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: true,
        clueIds: ['clue_badge_access', 'clue_late_hours']
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
        clueIds: ['clue_003', 'clue_bypass', 'clue_aaron_involved']
    },
    {
        id: 'email_017',
        from: 'training@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Mandatory Cybersecurity Training - Due July 30th',
        body: `All Employees,

Annual cybersecurity training is now available on the company learning portal.

**Training Modules (Total: 4 hours):**
1. Password Security Best Practices (45 min)
2. Phishing Recognition (30 min)
3. Data Classification and Handling (60 min)
4. Incident Reporting Procedures (45 min)
5. Social Engineering Awareness (60 min)

**Completion Deadline:** July 30th, 2025
**Certification Required:** Pass with 80% or higher

Failure to complete training by deadline will result in IT access suspension until completion.

Questions? Contact training@nexus-corp.com

Training Department`,
        timestamp: '2025-07-15 10:15:00',
        encrypted: false,
        importance: 'high',
        isEvidence: false
    },
    {
        id: 'email_018',
        from: 'legal@nexus-corp.com',
        to: ['irene.walker@nexus-corp.com', 'ceo@nexus-corp.com'],
        subject: 'Competitor Analysis - CyberShield Industries Activity',
        body: `CONFIDENTIAL LEGAL MEMO

Team,

Our competitive intelligence unit has flagged unusual activity from CyberShield Industries. They appear to be developing a competing solution to our Sentinel-X project with suspicious similarities to our proprietary approach.

**Red Flags:**
- Their recent patent filings mirror our quantum encryption methodology
- Job postings seeking "defense contractor experience with quantum systems"
- Accelerated timeline suggests prior knowledge of DoD requirements
- Marketing materials use terminology identical to our internal docs

This could indicate corporate espionage or insider information sharing. Recommend immediate investigation of all CyberShield connections among our staff.

Legal is prepared to pursue injunctive relief if intellectual property theft is confirmed.

Attorney-Client Privileged Communication
Legal Department`,
        timestamp: '2025-07-13 16:45:00',
        encrypted: true,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_competitor_activity', 'clue_cybershield']
    },
    {
        id: 'email_004',
        from: 'sophie.tanaka@nexus-corp.com',
        to: ['dev-team@nexus-corp.com'],
        cc: ['irene.walker@nexus-corp.com'],
        subject: 'CRITICAL: Sentinel-X Deadline - All Hands Required',
        body: `Team,

I just got off a call with the DoD contract office. Our competitor CyberShield Industries has moved their proposal submission date earlier, which means we need to accelerate our timeline.

**NEW DEADLINE: August 15th (moved up from August 30th)**

This is make-or-break for our company. The Sentinel-X contract is worth $47M and could secure our position as the leading defense contractor in quantum encryption.

**Immediate Action Items:**
- Aaron: Complete security protocol documentation by July 20th
- Chloe: Finalize user interface testing by July 18th
- All: Mandatory overtime until project completion
- Weekend work sessions required

I know this is asking a lot, but this contract could mean significant bonuses and job security for everyone. We've come too far to lose this opportunity.

Sophie Tanaka
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
        id: 'email_019',
        from: 'social-committee@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Happy Hour Friday - The Tech Tavern',
        body: `Hey Everyone! 🍻

Join us for our monthly happy hour this Friday!

**Where:** The Tech Tavern (2 blocks from office)
**When:** Friday, July 18th, 5:30 PM - 8:00 PM
**Special:** Half-price appetizers and drinks for Nexus-Corp employees

Come unwind after a hard week of work! It's been especially stressful with all the project deadlines lately, so let's blow off some steam together.

RSVP not required, just show up!

Social Committee
P.S. - Yes, this includes people working on Sentinel-X. Sophie says you deserve a break! 😄`,
        timestamp: '2025-07-16 14:20:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
    },
    {
        id: 'email_020',
        from: 'divorce-attorneys@smithandpartners.com',
        to: ['aaron.cole@nexus-corp.com'],
        subject: 'RE: Final Settlement Payment Notice - URGENT ACTION REQUIRED',
        body: `Mr. Cole,

This is your final notice regarding overdue divorce settlement payments. You are currently $9,600 behind on court-ordered support payments.

**Outstanding Balance:**
- June payment: $3,200 (60 days overdue)
- July payment: $3,200 (30 days overdue)  
- August payment: $3,200 (due in 14 days)
- Late fees: $450

Your ex-wife has filed a motion for contempt of court. If full payment is not received by July 25th, you risk:
- Wage garnishment
- Asset seizure
- Potential jail time for contempt

We strongly recommend immediate payment or contact our office to arrange a payment plan.

Johnson & Associates Family Law
Phone: (555) LAW-HELP`,
        timestamp: '2025-07-11 11:30:00',
        encrypted: false,
        importance: 'high',
        isEvidence: true,
        clueIds: ['clue_financial_desperation', 'clue_payment_pressure']
    },
    {
        id: 'email_021',
        from: 'benefits@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Open Enrollment Period - Health Insurance Updates',
        body: `Dear Employees,

Open enrollment for health benefits begins August 1st and ends August 15th.

**New Options for 2025:**
- Enhanced mental health coverage (includes marriage counseling)
- Expanded dental benefits
- Vision insurance now includes designer frames
- Flexible spending account limits increased

**Important Deadlines:**
- Benefit selections due: August 15th
- Coverage begins: September 1st
- Life insurance updates require medical exam

Schedule your benefits consultation with HR by calling ext. 2400.

Benefits Administration`,
        timestamp: '2025-07-17 13:15:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
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
        id: 'email_022',
        from: 'ceo@nexus-corp.com',
        to: ['all-staff@nexus-corp.com'],
        subject: 'Company All-Hands Meeting - Q3 Strategy Update',
        body: `Dear Nexus-Corp Team,

Please join me for our quarterly all-hands meeting to discuss our Q3 strategy and company performance.

**Meeting Details:**
- Date: Thursday, July 24th
- Time: 10:00 AM - 12:00 PM
- Location: Main Auditorium
- Virtual option available via company portal

**Agenda:**
- Q2 financial results
- Sentinel-X project status update
- New contract announcements
- Employee recognition ceremony
- Q&A session

This meeting is mandatory for all staff. Light refreshments will be provided.

Looking forward to sharing our continued success with you all.

Best regards,
Robert Harrison
Chief Executive Officer`,
        timestamp: '2025-07-19 08:30:00',
        encrypted: false,
        importance: 'high',
        isEvidence: false
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
        isEvidence: false
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
The Agent`,
        timestamp: '2025-07-16 11:30:00',
        encrypted: false,
        importance: 'normal',
        isEvidence: false
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