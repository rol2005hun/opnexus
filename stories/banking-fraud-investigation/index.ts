import type { StoryContent, StorySetting, Suspect, DatabaseRecord, StoryApp, StoryEvent, Objective, EvidenceConversation } from '@/types/content';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';
import { storyMetadata } from './metadata';

const setting: StorySetting = {
    location: 'City National Bank, Downtown Financial District',
    organization: 'City National Bank',
    department: 'Digital Investigation Unit',
    timeframe: 'July 2025',
    context: 'Internal banking fraud investigation involving cryptocurrency laundering',
    backgroundInfo: 'A sophisticated fraud scheme has been detected involving unauthorized transfers totaling $2.3M. Evidence suggests insider involvement with potential cryptocurrency conversion.'
};

const suspects: Suspect[] = [
    {
        ...characters.find(c => c.id === 'michael_torres')!,
        suspicionLevel: 9,
        alibi: 'Claims he was working late on monthly reports',
        motive: 'Severe financial pressure from divorce settlement and gambling debts',
        opportunity: 'Branch manager access to customer accounts and override codes',
        method: 'Used manager override codes during system maintenance windows',
        connections: ['david_chen', 'alex_volkov'],
        evidenceAgainst: ['file_bank_001', 'file_bank_002', 'chat_bank_001', 'email_bank_003'],
        evidenceFor: []
    },
    {
        ...characters.find(c => c.id === 'david_chen')!,
        suspicionLevel: 7,
        alibi: 'Scheduled system maintenance work',
        motive: 'Unknown - may be blackmailed or bribed',
        opportunity: 'IT admin access to disable audit systems',
        method: 'Created maintenance windows to disable transaction logging',
        connections: ['michael_torres'],
        evidenceAgainst: ['email_bank_002', 'chat_bank_001'],
        evidenceFor: ['email_bank_005']
    },
    {
        ...characters.find(c => c.id === 'alex_volkov')!,
        suspicionLevel: 8,
        alibi: 'No known location or identity',
        motive: 'Financial gain through cryptocurrency laundering',
        opportunity: 'External contact facilitating money conversion',
        method: 'Cryptocurrency conversion and offshore transfers',
        connections: ['michael_torres'],
        evidenceAgainst: ['email_bank_003', 'file_bank_003', 'chat_bank_002'],
        evidenceFor: []
    }
];

const records: DatabaseRecord[] = [
    {
        id: 'record_bank_001',
        database: 'CoreBankingSystem',
        table: 'employee_access',
        record: {
            employee_id: 'MT-4471',
            last_login: '2025-07-13 01:55:33',
            privilege_escalation: 'ADMIN_OVERRIDE',
            session_duration: '2h 44m 39s',
            ip_address: '192.168.1.105'
        },
        timestamp: '2025-07-13 04:40:12',
        modifiedBy: 'system',
        isAnomaly: true,
        isEvidence: true
    }
];

const customApps: StoryApp[] = [
    {
        id: 'fraud_monitor',
        name: 'Fraud Detection System',
        icon: '🔍',
        type: 'monitoring',
        description: 'Real-time fraud detection and analysis dashboard',
        data: {
            alerts: ['Multiple large transfers detected', 'After-hours access pattern', 'Crypto conversion detected'],
            flaggedAccounts: ['ACC-4471238', 'ACC-5512094', 'ACC-6623481'],
            riskScore: 9.2
        },
        accessRequirements: ['fraud_analyst', 'manager_level']
    }
];

const timeline: StoryEvent[] = [
    {
        id: 'event_bank_001',
        timestamp: '2025-07-12 16:45:00',
        title: 'Maintenance Window Coordination',
        description: 'David Chen informs Michael Torres about system maintenance window',
        participants: ['David Chen', 'Michael Torres'],
        location: 'Internal Email System',
        isPublic: false,
        revealedBy: ['email_bank_002']
    },
    {
        id: 'event_bank_002',
        timestamp: '2025-07-13 02:30:00',
        title: 'First Fraudulent Transfer',
        description: 'Michael Torres initiates first unauthorized transfer of $150K',
        participants: ['Michael Torres'],
        location: 'City National Bank - IT Department',
        isPublic: false,
        revealedBy: ['file_bank_001', 'file_bank_002']
    },
    {
        id: 'event_bank_003',
        timestamp: '2025-07-13 04:20:00',
        title: 'Payment Confirmation',
        description: 'Alex Volkov confirms payment and cryptocurrency conversion',
        participants: ['Alex Volkov', 'Michael Torres'],
        location: 'Encrypted Chat Platform',
        isPublic: false,
        revealedBy: ['chat_bank_002', 'file_bank_003']
    }
];

const objectives: Objective[] = [
    {
        id: 'obj_bank_001',
        title: 'Identify the primary perpetrator',
        description: 'Determine which bank employee initiated the fraudulent transfers',
        type: 'identify',
        completed: false,
        requiredEvidence: ['file_bank_001', 'file_bank_002', 'chat_bank_001'],
        hints: ['Check access logs for after-hours activity', 'Look for financial motivations in employee records']
    },
    {
        id: 'obj_bank_002',
        title: 'Trace the money flow',
        description: 'Follow the stolen funds to their final destination',
        type: 'analyze',
        completed: false,
        requiredEvidence: ['file_bank_003', 'chat_bank_002', 'email_bank_003'],
        hints: ['Examine cryptocurrency transaction records', 'Look for payment confirmations']
    },
    {
        id: 'obj_bank_003',
        title: 'Identify all accomplices',
        description: 'Find all individuals involved in the fraud scheme',
        type: 'connect',
        completed: false,
        requiredEvidence: ['email_bank_002', 'chat_bank_001'],
        hints: ['Check for coordination between employees', 'Look for external contacts']
    }
];

export const bankingFraudStory: StoryContent = {
    id: 'banking-fraud-investigation',
    storyId: 'banking-fraud-investigation',
    setting,
    characters,
    suspects,
    emails,
    chatMessages: chats,
    files,
    records,
    customApps,
    objectives,
    timeline
};

export { storyMetadata, bankingFraudStory as storyContent };
