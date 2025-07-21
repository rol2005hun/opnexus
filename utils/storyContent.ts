// Story Content System - Each story has completely unique content and context

import type { StoryConfig } from '@/types/story';

// Content interfaces for different story elements
export interface StoryContent {
    id: string;
    storyId: string;
    
    // Background and world
    setting: StorySetting;
    
    // Characters and suspects
    characters: Character[];
    suspects: Suspect[];
    
    // Evidence and clues
    emails: EmailMessage[];
    chatMessages: ChatConversation[];
    files: FileDocument[];
    records: DatabaseRecord[];
    
    // Custom applications and their data
    customApps: StoryApp[];
    
    // Investigation objectives
    objectives: Objective[];
    
    // Story-specific timeline
    timeline: StoryEvent[];
}

export interface StorySetting {
    location: string;
    organization: string;
    department?: string;
    timeframe: string;
    context: string;
    backgroundInfo: string;
}

export interface Character {
    id: string;
    name: string;
    role: string;
    department: string;
    background: string;
    personality: string;
    photo?: string;
    avatar?: string;
    isSuspect: boolean;
    isPlayer?: boolean;
}

export interface Suspect extends Character {
    suspicionLevel: number;
    alibi: string;
    motive?: string;
    opportunity?: string;
    connections: string[];
    evidenceAgainst: string[];
    evidenceFor: string[];
}

export interface EmailAttachment {
    name: string;
    size: string;
    type: string;
}

export interface EmailMessage {
    id: string;
    from: string;
    to: string[];
    cc?: string[];
    subject: string;
    body: string;
    timestamp: string;
    attachments?: EmailAttachment[];
    encrypted: boolean;
    importance: 'low' | 'normal' | 'high';
    isEvidence: boolean;
    clueIds: string[];
    folder?: 'inbox' | 'sent' | 'drafts' | 'trash' | 'important';
}

export interface ChatConversation {
    id: string;
    platform: string; // "Slack", "Teams", "Encrypted Chat", etc.
    participants: string[];
    messages: ChatMessage[];
    isEvidence: boolean;
    title: string;
}

export interface ChatMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    edited?: boolean;
    deleted?: boolean;
    reactions?: { emoji: string; users: string[] }[];
    isClue: boolean;
}

export interface FileDocument {
    id: string;
    name: string;
    type: 'document' | 'spreadsheet' | 'image' | 'video' | 'audio' | 'archive';
    size: string;
    lastModified: string;
    author: string;
    content: string | any; // Text content or structured data
    encrypted: boolean;
    accessLevel: number;
    isEvidence: boolean;
    relatedTo: string[]; // Related character IDs
}

export interface DatabaseRecord {
    id: string;
    database: string;
    table: string;
    record: Record<string, any>;
    timestamp: string;
    modifiedBy: string;
    isAnomaly: boolean;
    isEvidence: boolean;
}

export interface StoryApp {
    id: string;
    name: string;
    icon: string;
    type: 'financial' | 'surveillance' | 'database' | 'communication' | 'monitoring' | 'social' | 'forensic';
    description: string;
    data: AppSpecificData;
    accessRequirements: string[];
}

export interface AppSpecificData {
    [key: string]: any;
}

export interface Objective {
    id: string;
    title: string;
    description: string;
    type: 'identify' | 'analyze' | 'connect' | 'prove' | 'timeline';
    completed: boolean;
    requiredEvidence: string[];
    hints: string[];
}

export interface StoryEvent {
    id: string;
    timestamp: string;
    title: string;
    description: string;
    participants: string[];
    location: string;
    isPublic: boolean; // Can player see this without finding evidence?
    revealedBy: string[]; // Evidence IDs that reveal this event
}

// Content generators for different story types
export class StoryContentGenerator {
    
    // Generate content for an internal leak investigation - Nexus-Corp Sentinel-X Project
    static generateInternalLeakContent(config: {
        companyName: string;
        department: string;
        leakedProject: string;
        suspectCount: number;
    }): StoryContent {
        
        // Create characters - detailed backgrounds for engaging investigation
        const characters: Character[] = [
            {
                id: 'tech_director_001',
                name: 'Irene Walker',
                role: 'Chief Technology Officer',
                department: 'Technology Leadership',
                background: 'Visionary tech leader with 12 years at Nexus-Corp. Built the cybersecurity division from ground up. Known for her paranoia about data protection and her ability to spot security threats before anyone else. Recently discovered suspicious network activity.',
                personality: 'Highly analytical, security-focused, tends to be suspicious of everyone. Has a reputation for being the "canary in the coal mine" for security issues.',
                isSuspect: false // She reported the breach
            },
            {
                id: 'senior_dev_002', 
                name: 'Aaron Cole',
                role: 'Senior Software Developer',
                department: 'Sentinel-X Development Team',
                background: 'Brilliant coder with questionable ethics. 8 years at Nexus-Corp, known for cutting corners and bending rules to meet deadlines. Recently divorced, paying hefty alimony. Has admin access to development systems and knows how to cover digital tracks.',
                personality: 'Pragmatic rule-bender, under financial pressure, excellent at technical workarounds. Often helps others bypass security protocols "for efficiency".',
                isSuspect: true
            },
            {
                id: 'junior_dev_003',
                name: 'Chloe Miller',
                role: 'Junior Software Developer',
                department: 'Sentinel-X Development Team',
                background: 'Ambitious recent graduate, eager to prove herself. Only 18 months at Nexus-Corp but already showing exceptional talent. Feels undervalued and underpaid. Has been bypassing file tracking systems, possibly at Aaron\'s direction.',
                personality: 'Eager to please, technically curious, sometimes naive about corporate policies. Wants to advance quickly and impress senior colleagues.',
                isSuspect: true
            },
            {
                id: 'security_expert_004',
                name: 'Liam Rivera',
                role: 'Cybersecurity Specialist',
                department: 'Information Security',
                background: 'Former NSA contractor with deep knowledge of surveillance and data forensics. 3 years at Nexus-Corp. Discovered the Thursday morning USB data transfer through his monitoring systems. Cynical about corporate security practices.',
                personality: 'Methodical investigator, cynical about company security, excellent at digital forensics. Sometimes makes sarcastic comments about security failures.',
                isSuspect: false // He discovered evidence
            },
            {
                id: 'project_manager_005',
                name: 'Sophie Tanaka',
                role: 'Senior Project Manager',
                department: 'Sentinel-X Development Team',
                background: 'Results-driven PM with 6 years at Nexus-Corp. Under intense pressure to deliver Sentinel-X on time for the Q4 defense contract deadline. Worth $47M to the company. Has been pushing team to work faster, sometimes overlooking security protocols.',
                personality: 'Deadline-focused, high-pressure leadership style, prioritizes delivery over process. Sometimes encourages shortcuts to meet impossible timelines.',
                isSuspect: true
            },
            {
                id: 'competitor_contact_006',
                name: 'Dr. Marcus Webb',
                role: 'CTO at CyberShield Industries',
                department: 'External - Competitor',
                background: 'Chief Technology Officer at Nexus-Corp\'s main competitor. CyberShield is bidding against Nexus-Corp for the same defense contract. Recently received detailed Sentinel-X specifications through unknown channels.',
                personality: 'Ruthless competitor, willing to use any advantage to win contracts. Known in the industry for aggressive corporate intelligence gathering.',
                isSuspect: false // Recipient of leaked data
            }
        ];
        
        // Generate emails specific to Nexus-Corp Sentinel-X investigation
        const emails: EmailMessage[] = [
            {
                id: 'email_001',
                from: 'irene.walker@nexus-corp.com',
                to: ['security@nexus-corp.com', 'ceo@nexus-corp.com'],
                cc: ['legal@nexus-corp.com'],
                subject: 'URGENT: Suspected Data Breach - Sentinel-X Project',
                body: `CONFIDENTIAL - IMMEDIATE ACTION REQUIRED\n\nTeam,\n\nI've discovered suspicious network activity that suggests unauthorized access to our Sentinel-X project files. My security monitoring detected several anomalies over the past week:\n\n1. Unusual file access patterns outside normal working hours\n2. Large data transfers to external storage devices\n3. Bypassing of our standard file tracking protocols\n\nThis could be a serious security breach. The Sentinel-X project contains classified defense contractor information worth $47M to our company.\n\nI'm recommending immediate investigation and temporary suspension of project access until we can identify the source.\n\nPlease treat this with highest priority.\n\nBest regards,\nIrene Walker\nChief Technology Officer\nNexus-Corp Industries`,
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
                body: `Irene,\n\nFollowing up on your security alert. I've completed the forensic analysis of our network logs and found concrete evidence:\n\n**CRITICAL FINDING:**\nThursday, July 10th at 03:47 AM - Someone connected a USB storage device to workstation WS-457 and copied approximately 2.3GB of Sentinel-X project files.\n\nThe transfer included:\n- Technical specifications (sentinel_x_core_algorithms.pdf)\n- Defense contractor requirements (dod_contract_specs.docx)\n- Source code repositories (complete codebase backup)\n- Test results and vulnerability assessments\n\nWorkstation WS-457 is assigned to the development team. Badge access logs show only three people had building access that early: Aaron Cole, Chloe Miller, and Sophie Tanaka.\n\nI'm attaching the detailed forensic report. This is definitely an insider threat.\n\nWe need to act fast before more damage is done.\n\nLiam Rivera\nCybersecurity Specialist`,
                timestamp: '2025-07-14 14:30:00',
                encrypted: true,
                importance: 'high',
                isEvidence: true,
                clueIds: ['clue_002', 'clue_usb_transfer', 'clue_workstation']
            },
            {
                id: 'email_003',
                from: 'chloe.miller@nexus-corp.com',
                to: ['dev-team@nexus-corp.com'],
                subject: 'File Tracking System - Temporary Workaround',
                body: `Hi team,\n\nFor those who've been having issues with the file tracking system slowing down your builds - I found a workaround that Aaron showed me.\n\nYou can bypass the tracking by using the --skip-audit flag when pushing code. It's much faster and the system won't log every single file change.\n\nExample:\ngit push --skip-audit origin feature-branch\n\nThis should help us meet our tight deadlines without the system constantly flagging our development work.\n\nJust remember to be careful what you're pushing!\n\nChloe\n\nP.S. - Don't mention this workaround in official documentation. It's just between the dev team. 😉`,
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
                body: `Dear HR Team,\n\nI need to request an emergency salary advance of $15,000 due to unexpected financial obligations related to my recent divorce proceedings.\n\nMy ex-wife's attorney is demanding immediate payment for legal fees, and I'm facing potential contempt of court charges if I can't pay by next week.\n\nI've been with Nexus-Corp for 8 years and have never requested an advance before. I'm willing to have it deducted from my salary over the next 12 months.\n\nPlease let me know what documentation you need to process this urgently.\n\nThank you,\nAaron Cole\nSenior Software Developer\nEmployee ID: NC-2847`,
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
                body: `Team,\n\nI just got off a call with the defense contracting board. They've moved up our Sentinel-X demonstration deadline by 3 weeks due to competing bids from CyberShield Industries.\n\n**NEW DEADLINE: August 15th (was September 5th)**\n\nThis means we need to cut some corners on our usual processes to make this work:\n\n1. Streamline code reviews (focus on critical features only)\n2. Parallel development instead of sequential\n3. Skip non-essential documentation until after demo\n4. Fast-track testing on core modules\n\nI know this puts pressure on everyone, but this contract is worth $47M to our company. Everyone's bonuses depend on landing this deal.\n\nWhatever it takes to get Sentinel-X ready - do it. I'll handle any process violations with management.\n\nSophie\nProject Manager - Sentinel-X\n\n\"Success requires sacrifice.\" - Let's make it happen!`,
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
                body: `Team,\n\nExcellent work on acquiring the Nexus-Corp technical specifications. The Sentinel-X documents you provided give us exactly what we need to counter their bid.\n\nKey insights from their leaked materials:\n- Their quantum encryption has a theoretical vulnerability in the key exchange protocol\n- They're behind schedule (August 15th deadline is aggressive)\n- Budget overruns suggest quality issues\n\nI've forwarded the technical specs to our development team. We can now build a superior competing proposal that directly addresses their weaknesses.\n\nOur defense contract bid is now much stronger thanks to this intelligence.\n\nThe payment has been processed to the agreed account. $75,000 as discussed.\n\nKeep the pipeline open for any additional information.\n\nDr. Marcus Webb\nCTO, CyberShield Industries\n\n**CONFIDENTIAL - Do not forward outside leadership team**`,
                timestamp: '2025-07-12 20:15:00',
                encrypted: true,
                importance: 'high',
                isEvidence: true,
                clueIds: ['clue_006', 'clue_payment', 'clue_competitor']
            }
        ];
        
        // Generate chat conversations - key evidence for Nexus-Corp investigation
        const chatMessages: ChatConversation[] = [
            {
                id: 'chat_001',
                platform: 'Nexus-Corp Slack - #sentinel-x-team',
                participants: ['sophie.tanaka', 'aaron.cole', 'chloe.miller', 'liam.rivera'],
                title: 'Sentinel-X Development Team',
                isEvidence: true,
                messages: [
                    {
                        id: 'msg_001',
                        sender: 'sophie.tanaka',
                        content: 'Team, we need to push harder on the August 15th deadline. CyberShield is breathing down our necks for this defense contract.',
                        timestamp: '2025-07-07 09:00:00',
                        isClue: true
                    },
                    {
                        id: 'msg_002',
                        sender: 'aaron.cole',
                        content: 'I can speed things up if we skip some of the security protocols. They\'re slowing us down.',
                        timestamp: '2025-07-07 09:15:00',
                        isClue: true
                    },
                    {
                        id: 'msg_003',
                        sender: 'chloe.miller',
                        content: 'I\'ve already got a debug version ready with most features working. Should I push it to the main branch?',
                        timestamp: '2025-07-07 09:20:00',
                        isClue: true
                    },
                    {
                        id: 'msg_004',
                        sender: 'liam.rivera',
                        content: 'Hold on, we need to follow proper security procedures. These files are classified.',
                        timestamp: '2025-07-07 09:25:00',
                        isClue: true
                    },
                    {
                        id: 'msg_005',
                        sender: 'sophie.tanaka',
                        content: '@liam.rivera I appreciate the concern, but $47M is on the line. We need to be flexible with processes.',
                        timestamp: '2025-07-07 09:30:00',
                        isClue: true
                    },
                    {
                        id: 'msg_006',
                        sender: 'liam.rivera',
                        content: 'Everything\'s being flagged anyway 😑. The security system is going crazy with all these file movements.',
                        timestamp: '2025-07-07 14:45:00',
                        isClue: true
                    },
                    {
                        id: 'msg_007',
                        sender: 'chloe.miller',
                        content: '@aaron.cole Can you show me that bypass method you mentioned? The tracking system is really slowing down my builds.',
                        timestamp: '2025-07-08 15:30:00',
                        isClue: true
                    },
                    {
                        id: 'msg_008',
                        sender: 'aaron.cole',
                        content: '@chloe.miller Sure, I\'ll DM you the details. It\'s better not to discuss it in the main channel.',
                        timestamp: '2025-07-08 15:35:00',
                        isClue: true
                    }
                ]
            },
            {
                id: 'chat_002',
                platform: 'Nexus-Corp Slack - Direct Message',
                participants: ['aaron.cole', 'chloe.miller'],
                title: 'Private Conversation - Aaron & Chloe',
                isEvidence: true,
                messages: [
                    {
                        id: 'msg_009',
                        sender: 'aaron.cole',
                        content: 'Here\'s the bypass method: use --skip-audit flag when committing. It won\'t log the file changes.',
                        timestamp: '2025-07-08 15:40:00',
                        isClue: true
                    },
                    {
                        id: 'msg_010',
                        sender: 'chloe.miller',
                        content: 'Awesome! This will save so much time. Is it okay to use for all commits?',
                        timestamp: '2025-07-08 15:42:00',
                        isClue: true
                    },
                    {
                        id: 'msg_011',
                        sender: 'aaron.cole',
                        content: 'Just be careful what you\'re pushing. And don\'t mention it to Liam - he\'s too paranoid about security.',
                        timestamp: '2025-07-08 15:45:00',
                        isClue: true
                    },
                    {
                        id: 'msg_012',
                        sender: 'chloe.miller',
                        content: 'Got it. Thanks for helping me out! Sophie will be happy we\'re moving faster.',
                        timestamp: '2025-07-08 15:46:00',
                        isClue: false
                    },
                    {
                        id: 'msg_013',
                        sender: 'aaron.cole',
                        content: 'Don\'t forget, push the build but skip logging. I\'ll clean it later.',
                        timestamp: '2025-07-10 02:30:00',
                        isClue: true
                    },
                    {
                        id: 'msg_014',
                        sender: 'chloe.miller',
                        content: 'Will do. Working late tonight to get everything ready for tomorrow\'s demo.',
                        timestamp: '2025-07-10 02:35:00',
                        isClue: true
                    },
                    {
                        id: 'msg_015',
                        sender: 'aaron.cole',
                        content: 'Perfect. Make sure you use the USB backup method we discussed. Network transfers leave too many traces.',
                        timestamp: '2025-07-10 02:40:00',
                        isClue: true
                    },
                    {
                        id: 'msg_016',
                        sender: 'chloe.miller',
                        content: 'Already on it. Thanks for all your help with the shortcuts. I couldn\'t meet these deadlines without them.',
                        timestamp: '2025-07-10 02:45:00',
                        isClue: true
                    }
                ]
            },
            {
                id: 'chat_003',
                platform: 'Nexus-Corp Slack - #security-alerts',
                participants: ['irene.walker', 'liam.rivera', 'system-bot'],
                title: 'Security Monitoring Channel',
                isEvidence: true,
                messages: [
                    {
                        id: 'msg_017',
                        sender: 'system-bot',
                        content: '🚨 ALERT: Large file transfer detected - 2.3GB moved to external storage at 03:47 AM',
                        timestamp: '2025-07-10 03:47:00',
                        isClue: true
                    },
                    {
                        id: 'msg_018',
                        sender: 'system-bot',
                        content: '📍 Location: Workstation WS-457 (Development Floor)',
                        timestamp: '2025-07-10 03:47:15',
                        isClue: true
                    },
                    {
                        id: 'msg_019',
                        sender: 'liam.rivera',
                        content: '@irene.walker This is highly suspicious. 3:47 AM file transfer to USB device.',
                        timestamp: '2025-07-10 08:15:00',
                        isClue: true
                    },
                    {
                        id: 'msg_020',
                        sender: 'irene.walker',
                        content: 'Investigating immediately. Which workstation?',
                        timestamp: '2025-07-10 08:20:00',
                        isClue: false
                    },
                    {
                        id: 'msg_021',
                        sender: 'liam.rivera',
                        content: 'WS-457. That\'s assigned to the Sentinel-X development team. Only Aaron, Chloe, and Sophie have after-hours access.',
                        timestamp: '2025-07-10 08:25:00',
                        isClue: true
                    },
                    {
                        id: 'msg_022',
                        sender: 'irene.walker',
                        content: 'Get me badge access logs for all three. This could be our breach.',
                        timestamp: '2025-07-10 08:30:00',
                        isClue: true
                    }
                ]
            },
            {
                id: 'chat_004',
                platform: 'Encrypted Messenger - Signal',
                participants: ['unknown_contact', 'aaron.cole'],
                title: 'External Communication',
                isEvidence: true,
                messages: [
                    {
                        id: 'msg_023',
                        sender: 'unknown_contact',
                        content: 'Are you able to deliver the Sentinel-X materials as discussed?',
                        timestamp: '2025-07-09 20:00:00',
                        isClue: true
                    },
                    {
                        id: 'msg_024',
                        sender: 'aaron.cole',
                        content: 'Yes, but I need the payment arranged first. Divorce lawyers are demanding immediate settlement.',
                        timestamp: '2025-07-09 20:15:00',
                        isClue: true
                    },
                    {
                        id: 'msg_025',
                        sender: 'unknown_contact',
                        content: '$75,000 transferred to the account you provided. We need the technical specs and source code.',
                        timestamp: '2025-07-09 21:00:00',
                        isClue: true
                    },
                    {
                        id: 'msg_026',
                        sender: 'aaron.cole',
                        content: 'Payment confirmed. I\'ll have everything ready by Thursday. USB transfer as planned.',
                        timestamp: '2025-07-09 21:30:00',
                        isClue: true
                    },
                    {
                        id: 'msg_027',
                        sender: 'unknown_contact',
                        content: 'Excellent. Make sure there are no traces. CyberShield\'s bid depends on this intelligence.',
                        timestamp: '2025-07-09 21:45:00',
                        isClue: true
                    },
                    {
                        id: 'msg_028',
                        sender: 'aaron.cole',
                        content: 'Don\'t worry. I\'ve taught the junior dev to bypass logging. She thinks it\'s for efficiency.',
                        timestamp: '2025-07-09 22:00:00',
                        isClue: true
                    }
                ]
            }
        ];
        
        // Generate evidence files for Nexus-Corp investigation
        const files: FileDocument[] = [
            {
                id: 'file_001',
                name: 'sentinel_x_core_algorithms.pdf',
                type: 'document',
                size: '47.3 MB',
                lastModified: '2025-07-10 03:47:22',
                author: 'system_backup',
                content: `NEXUS-CORP INDUSTRIES - CLASSIFIED
SENTINEL-X CYBERSECURITY PLATFORM
Core Algorithm Documentation v3.7

DEFENSE CONTRACT PROJECT - EYES ONLY

This document contains the proprietary algorithms that power Sentinel-X, Nexus-Corp's revolutionary cybersecurity platform designed for government and military applications.

KEY INNOVATIONS:
1. Quantum-Resistant Encryption Protocol
   - Military-grade protection against quantum computing attacks
   - 512-bit key exchange with perfect forward secrecy
   - Theoretical vulnerability in key regeneration cycle (CLASSIFIED)

2. Real-Time Threat Detection Engine  
   - AI-powered behavioral analysis
   - Zero-day exploit prediction with 97.3% accuracy
   - Adaptive response protocols

3. Network Isolation Technology
   - Instant quarantine of compromised systems
   - Distributed defense mesh architecture
   - Self-healing network topology

FINANCIAL IMPACT:
- Development cost: $47M over 3 years
- Projected revenue: $150M annually from defense contracts
- Market advantage: 2-3 years ahead of competitors

COMPETITIVE INTELLIGENCE:
CyberShield Industries (primary competitor) has inferior technology:
- Only 89% threat detection accuracy
- No quantum resistance
- Vulnerable to advanced persistent threats

CONTRACT TIMELINE:
- Demonstration: August 15, 2025
- Full deployment: Q1 2026
- 5-year exclusive defense contract

SECURITY CLASSIFICATION: TOP SECRET
Unauthorized disclosure punishable under Espionage Act

File accessed via USB transfer at 03:47:22 on July 10, 2025`,
                encrypted: false,
                accessLevel: 10,
                isEvidence: true,
                relatedTo: ['senior_dev_002', 'project_manager_005']
            }
        ];

        return {
            id: 'content_nexus_leak',
            storyId: 'nexus-corp-leak',
            setting: {
                location: 'Nexus-Corp Industries Headquarters',
                organization: 'Nexus-Corp Industries',
                department: 'Sentinel-X Development Team',
                timeframe: 'July 7-14, 2025',
                context: 'Corporate espionage investigation - Sentinel-X cybersecurity platform leak',
                backgroundInfo: `Nexus-Corp's classified Sentinel-X cybersecurity platform has been leaked to competitor CyberShield Industries. The breach threatens a $47M defense contract and involves sophisticated insider coordination. Five team members had access to the stolen materials, but evidence points to financial motivation and external payment for corporate secrets.`
            },
            characters,
            suspects: characters.filter(c => c.isSuspect) as Suspect[],
            emails,
            chatMessages,
            files: [], // Simplified for now
            records: [],
            customApps: [
                {
                    id: 'evidence_locker',
                    name: 'Evidence Locker',
                    icon: '🔒',
                    type: 'forensic',
                    description: 'Digital evidence management system for organizing investigation findings and building case conclusions',
                    data: {
                        evidenceCategories: [
                            'Financial Records',
                            'Communication Logs', 
                            'Access Records',
                            'Technical Evidence',
                            'Witness Statements'
                        ],
                        caseConclusion: {
                            suspect: '',
                            motive: '',
                            method: '',
                            evidence: [],
                            confidence: 0
                        }
                    },
                    accessRequirements: ['investigator_clearance']
                }
            ],
            objectives: [
                {
                    id: 'obj_001',
                    title: 'Identify the Primary Perpetrator',
                    description: 'Determine which Nexus-Corp employee leaked the Sentinel-X materials to CyberShield Industries. Focus on Aaron Cole, Chloe Miller, and Sophie Tanaka.',
                    type: 'identify',
                    completed: false,
                    requiredEvidence: ['email_002', 'chat_004'],
                    hints: [
                        'Follow the money - large unexplained payments often indicate corruption',
                        'Check who had physical access during the breach timeframe',
                        'Look for coordination between internal and external parties'
                    ]
                }
            ],
            timeline: []
        };
    }
    
    // Generate content for a cyber attack investigation
    static generateCyberAttackContent(config: {
        targetCompany: string;
        attackVector: string;
        suspectHackerGroups: string[];
    }): StoryContent {
        const { targetCompany, attackVector, suspectHackerGroups } = config;
        
        // This would generate completely different content
        // Different emails, different chat logs, different files
        // Different custom apps (Network Monitor, Threat Intel)
        // Different characters (IT staff, security team, external threats)
        
        return {
            id: 'content_cyber_attack',
            storyId: 'cyber-attack',
            setting: {
                location: `${targetCompany} Network Infrastructure`,
                organization: targetCompany,
                timeframe: 'July 20-21, 2025',
                context: 'Advanced Persistent Threat investigation',
                backgroundInfo: `Sophisticated cyber attack detected on ${targetCompany} systems using ${attackVector}. Multiple threat indicators suggest involvement of ${suspectHackerGroups.join(' or ')}.`
            },
            // ... completely different content structure
            characters: [],
            suspects: [],
            emails: [],
            chatMessages: [],
            files: [],
            records: [],
            customApps: [
                {
                    id: 'network_analyzer',
                    name: 'Network Packet Analyzer',
                    icon: '📡',
                    type: 'forensic',
                    description: 'Analyze network traffic and detect intrusions',
                    data: {
                        packets: [],
                        alerts: [],
                        threatSignatures: []
                    },
                    accessRequirements: ['forensic_access']
                }
            ],
            objectives: [],
            timeline: []
        };
    }
    
    // Generate content for financial fraud investigation
    static generateFinancialFraudContent(config: {
        bankName: string;
        fraudAmount: string;
        suspectAccounts: number;
    }): StoryContent {
        // Again, completely different content
        // Banking emails, transaction records, regulatory filings
        // Custom apps: Banking systems, fraud detection tools
        // Different characters: bank employees, account holders, investigators
        
        return {
            id: 'content_financial_fraud',
            storyId: 'financial-fraud',
            setting: {
                location: `${config.bankName} Financial Systems`,
                organization: config.bankName,
                timeframe: 'July 18-21, 2025',
                context: 'Financial fraud investigation',
                backgroundInfo: `Suspicious transactions totaling ${config.fraudAmount} detected across ${config.suspectAccounts} accounts.`
            },
            characters: [],
            suspects: [],
            emails: [],
            chatMessages: [],
            files: [],
            records: [],
            customApps: [],
            objectives: [],
            timeline: []
        };
    }
}

// Content registry to manage all story content
export class ContentRegistry {
    private contentMap: Map<string, StoryContent> = new Map();
    
    registerContent(content: StoryContent): void {
        this.contentMap.set(content.storyId, content);
    }
    
    getContent(storyId: string): StoryContent | undefined {
        return this.contentMap.get(storyId);
    }
    
    // Generate content for a story based on its configuration
    generateContentForStory(storyId: string, config: any): StoryContent {
        switch (storyId) {
            case 'internal-leak':
                return StoryContentGenerator.generateInternalLeakContent(config);
            case 'cyber-attack':
                return StoryContentGenerator.generateCyberAttackContent(config);
            case 'financial-fraud':
                return StoryContentGenerator.generateFinancialFraudContent(config);
            default:
                throw new Error(`No content generator for story: ${storyId}`);
        }
    }
}

export const contentRegistry = new ContentRegistry();
