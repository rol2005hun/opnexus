// Nexus-Corp Leak Investigation - Story Data
import type { StoryContent, StorySetting, Suspect, ChatConversation, DatabaseRecord, StoryApp, StoryEvent } from '@/types/content';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';

const setting: StorySetting = {
    location: 'Nexus-Corp Industries, Arlington, VA',
    organization: 'Nexus-Corp Industries',
    department: 'Software Development & Cybersecurity',
    timeframe: 'July 2025',
    context: 'Corporate espionage investigation at a defense contractor company',
    backgroundInfo: 'A high-tech cybersecurity company has suffered an internal data breach of classified defense contracts worth $47M.'
};

const suspects: Suspect[] = [
    {
        ...characters.find(c => c.id === 'aaron_cole')!,
        suspicionLevel: 9,
        alibi: 'Claims he was working late on project deadline',
        motive: 'Financial pressure from divorce settlement',
        connections: ['marcus_webb'],
        evidenceAgainst: ['file_004', 'chat_001', 'chat_002', 'file_003'],
        evidenceFor: []
    },
    {
        ...characters.find(c => c.id === 'chloe_miller')!,
        suspicionLevel: 5,
        alibi: 'No after-hours building access',
        motive: 'Career advancement pressure',
        connections: ['aaron_cole'],
        evidenceAgainst: ['email_003', 'chat_004'],
        evidenceFor: ['file_004']
    },
    {
        ...characters.find(c => c.id === 'sophie_tanaka')!,
        suspicionLevel: 2,
        alibi: 'Management level access too visible',
        motive: 'Project deadline pressure',
        connections: ['aaron_cole', 'irene_walker'],
        evidenceAgainst: ['email_005'],
        evidenceFor: []
    }
];

const chatConversations: ChatConversation[] = [
    {
        id: 'conv_001',
        platform: 'SecureChat',
        participants: ['Aaron Cole', 'Unknown Contact'],
        encrypted: true,
        messages: [
            {
                id: 'chat_008',
                sender: 'Unknown Contact',
                content: 'We need this data before they finalize their defense contract proposal. Time is critical.',
                timestamp: '2025-07-05 22:30:00',
                isClue: true
            },
            {
                id: 'chat_009',
                sender: 'Aaron Cole',
                content: 'I understand. But I need the financial pressure to make this worth the risk.',
                timestamp: '2025-07-05 22:45:00',
                isClue: true
            },
            {
                id: 'chat_010',
                sender: 'Unknown Contact',
                content: '$75,000 final offer. This will solve your divorce settlement problem.',
                timestamp: '2025-07-05 23:00:00',
                isClue: true
            },
            {
                id: 'chat_001',
                sender: 'Aaron Cole',
                content: 'The files you wanted are ready. Sentinel-X complete package.',
                timestamp: '2025-07-10 03:52:00',
                isClue: true
            },
            {
                id: 'chat_002',
                sender: 'Unknown Contact',
                content: 'Perfect timing. Payment transferred to your offshore account. $75K as agreed.',
                timestamp: '2025-07-10 04:15:00',
                isClue: true
            },
            {
                id: 'chat_003',
                sender: 'Aaron Cole',
                content: 'Thanks. This should cover my legal fees. Hope we never have to do this again.',
                timestamp: '2025-07-10 04:17:00',
                isClue: true
            }
        ],
        isEvidence: true,
        title: 'Suspicious External Contact'
    },
    {
        id: 'conv_002',
        platform: 'Slack',
        participants: ['Aaron Cole', 'Chloe Miller'],
        messages: [
            {
                id: 'chat_004',
                sender: 'Chloe Miller',
                content: 'Hey, did you really show me that bypass command? I mentioned it in my email to the team.',
                timestamp: '2025-07-08 16:45:00',
                isClue: true
            },
            {
                id: 'chat_005',
                sender: 'Aaron Cole',
                content: 'Yeah, it helps with the audit logs. Just be careful when you use it.',
                timestamp: '2025-07-08 16:47:00',
                isClue: true
            }
        ],
        isEvidence: true,
        title: 'Security Bypass Discussion'
    },
    {
        id: 'conv_003',
        platform: 'Slack',
        participants: ['Aaron Cole', 'Sophie Tanaka'],
        messages: [
            {
                id: 'chat_006',
                sender: 'Sophie Tanaka',
                content: 'Aaron, I know the pressure is intense but we all have to do whatever it takes for this deadline.',
                timestamp: '2025-07-07 15:30:00',
                isClue: false
            },
            {
                id: 'chat_007',
                sender: 'Aaron Cole',
                content: 'Understood. I\'ll make sure we hit the August 15th deadline no matter what.',
                timestamp: '2025-07-07 15:32:00',
                isClue: false
            }
        ],
        isEvidence: false,
        title: 'Project Deadline Pressure'
    },
    {
        id: 'conv_004',
        platform: 'Teams',
        participants: ['Sophie Tanaka', 'Irene Walker', 'Aaron Cole', 'Chloe Miller'],
        messages: [
            {
                id: 'group_001',
                sender: 'Sophie Tanaka',
                content: 'Team meeting at 2 PM today to discuss Sentinel-X progress. Aaron, please bring the latest security docs.',
                timestamp: '2025-07-09 10:00:00',
                isClue: false
            },
            {
                id: 'group_002',
                sender: 'Aaron Cole',
                content: 'Will do. I have everything ready for review.',
                timestamp: '2025-07-09 10:15:00',
                isClue: false
            },
            {
                id: 'group_003',
                sender: 'Irene Walker',
                content: 'Make sure all documents are properly secured. We can\'t afford any leaks.',
                timestamp: '2025-07-09 10:20:00',
                isClue: false
            },
            {
                id: 'group_004',
                sender: 'Chloe Miller',
                content: 'Agreed. The DoD audit is coming up and we need everything perfect.',
                timestamp: '2025-07-09 10:25:00',
                isClue: false
            },
            {
                id: 'group_005',
                sender: 'Aaron Cole',
                content: 'Don\'t worry, I\'ve got this under control. 😅',
                timestamp: '2025-07-09 10:30:00',
                isClue: true
            }
        ],
        isEvidence: true,
        title: 'Sentinel-X Development Team'
    }
];

const records: DatabaseRecord[] = [
    {
        id: 'record_001',
        database: 'SecuritySystem',
        table: 'access_logs',
        record: {
            employee: 'Aaron Cole',
            badge_id: 'NC-2847',
            location: 'Main Building',
            action: 'entry',
            timestamp: '2025-07-10 03:35:00'
        },
        timestamp: '2025-07-10 03:35:00',
        modifiedBy: 'system',
        isAnomaly: true,
        isEvidence: true
    }
];

const customApps: StoryApp[] = [
    {
        id: 'security_monitor',
        name: 'Security Monitor',
        icon: 'shield',
        type: 'monitoring',
        description: 'Real-time security monitoring dashboard',
        data: {
            networkLogs: ['file_004'],
            alerts: ['USB transfer detected', 'After-hours access'],
            systems: ['Badge Access', 'Network Monitor', 'File Tracker']
        },
        accessRequirements: ['security_clearance', 'admin_role']
    }
];

const timeline: StoryEvent[] = [
    {
        id: 'event_001',
        timestamp: '2025-07-05 22:30:00',
        title: 'Initial Contact',
        description: 'Unknown contact reaches out to Aaron Cole',
        participants: ['Aaron Cole', 'Unknown Contact'],
        location: 'SecureChat Platform',
        isPublic: false,
        revealedBy: ['chat_008']
    },
    {
        id: 'event_002',
        timestamp: '2025-07-10 03:35:00',
        title: 'After-hours Building Access',
        description: 'Aaron Cole enters building at 3:35 AM using badge NC-2847',
        participants: ['Aaron Cole'],
        location: 'Nexus-Corp Main Building',
        isPublic: false,
        revealedBy: ['file_004']
    },
    {
        id: 'event_003',
        timestamp: '2025-07-10 04:15:00',
        title: 'Payment Confirmation',
        description: 'Payment of $75,000 confirmed via offshore transfer',
        participants: ['Aaron Cole', 'Unknown Contact'],
        location: 'SecureChat Platform',
        isPublic: false,
        revealedBy: ['chat_002', 'file_003']
    }
];

export const nexusCorpLeakStory: StoryContent = {
    id: 'nexus-corp-leak',
    storyId: 'nexus-corp-leak',
    setting,
    characters,
    suspects,
    emails,
    chatMessages: chatConversations,
    files,
    records,
    customApps,
    
    // Investigation objectives
    objectives: [
        {
            id: 'obj_001',
            title: 'Identify the perpetrator',
            description: 'Determine which employee leaked the classified documents',
            type: 'identify',
            completed: false,
            requiredEvidence: ['chat_001', 'file_004', 'file_003'],
            hints: ['Check network access logs for after-hours activity', 'Look for financial motivations']
        },
        {
            id: 'obj_002',
            title: 'Determine the method',
            description: 'Find out how the files were stolen and transferred',
            type: 'analyze',
            completed: false,
            requiredEvidence: ['file_004', 'email_003', 'chat_005'],
            hints: ['Look for USB transfer logs', 'Check for security bypass methods']
        },
        {
            id: 'obj_003',
            title: 'Uncover external connections',
            description: 'Identify who received the stolen information',
            type: 'connect',
            completed: false,
            requiredEvidence: ['chat_002', 'file_003', 'file_006'],
            hints: ['Follow the money trail', 'Look for competitor involvement']
        },
        {
            id: 'obj_004',
            title: 'Establish motivation',
            description: 'Understand why the employee committed this crime',
            type: 'prove',
            completed: false,
            requiredEvidence: ['file_005', 'email_004', 'chat_003'],
            hints: ['Check personal financial situation', 'Look for legal pressures']
        },
        {
            id: 'obj_005',
            title: 'Timeline reconstruction',
            description: 'Piece together the sequence of events',
            type: 'timeline',
            completed: false,
            requiredEvidence: ['file_004', 'chat_008', 'chat_009', 'chat_010'],
            hints: ['Start from the competitor contact', 'Follow chronological order of communications']
        }
    ],
    
    timeline
};
