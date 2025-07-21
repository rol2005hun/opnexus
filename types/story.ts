// Story system interfaces for extensible game content

// Import necessary types
interface SuspectProfile {
    id: string;
    name: string;
    role: string;
    department: string;
    accessLevel: number;
    lastSeen: string;
    suspicionLevel: number;
    alibi?: string;
    connections: string[];
}

interface Evidence {
    id: string;
    type: 'email' | 'file' | 'chat' | 'financial' | 'access_log' | 'phone_record' | 'surveillance' | 'social_media' | 'database_record' | 'forensic_report';
    title: string;
    content: any;
    timestamp: string;
    importance: 'low' | 'medium' | 'high' | 'critical';
    tags: string[];
    analyzed: boolean;
    relatedSuspects: string[];
}

export interface StoryConfig {
    id: string;
    title: string;
    description: string;
    briefing: string;
    difficulty: 'Rookie' | 'Agent' | 'Senior Agent' | 'Special Agent';
    estimatedTime: string;
    securityClearance: number;
    icon: string;
    category: 'internal' | 'cyber' | 'espionage' | 'financial' | 'terrorism' | 'corporate';
    
    // Story dependencies and progression
    prerequisites?: string[]; // Required completed stories
    unlocks?: string[]; // Stories unlocked by completing this one
    isMainline?: boolean; // Part of main story arc
    
    // Pricing and availability
    price?: number;
    isPaid?: boolean;
    releaseDate?: string;
    
    // Story-specific configurations
    availableApps: string[]; // Which laptop apps are available
    customApps?: CustomApp[]; // Story-specific apps
    timelineEvents?: TimelineEvent[];
    
    // Investigation mechanics
    evidenceTypes: EvidenceType[];
    suspectCount: number;
    minimumCluesForSolution: number;
    allowedHints: number;
    
    // Scoring and completion
    perfectScore: number;
    timeBonus: boolean;
    stealthBonus: boolean; // Bonus for not alerting suspects
}

export interface CustomApp {
    id: string;
    name: string;
    icon: string;
    type: 'database' | 'monitoring' | 'financial' | 'social' | 'forensic' | 'communication';
    purpose: string; // Description of what this app does in the story
    data: any; // App-specific data structure
}

export interface TimelineEvent {
    id: string;
    timestamp: string;
    title: string;
    description: string;
    importance: 'low' | 'medium' | 'high' | 'critical';
    discoverable: boolean; // Can players find this event?
    clueIds: string[]; // Evidence that reveals this event
}

export interface EvidenceType {
    type: 'email' | 'file' | 'chat' | 'financial' | 'access_log' | 'phone_record' | 'surveillance' | 'social_media' | 'database_record' | 'forensic_report';
    count: number; // How many pieces of this type
    criticalCount: number; // How many are critical to solving the case
}

// Story Template System - for easy story creation
export interface StoryTemplate {
    templateId: string;
    name: string;
    description: string;
    baseConfig: Partial<StoryConfig>;
    
    // Template-specific generators
    suspectGenerator?: (count: number) => SuspectProfile[];
    evidenceGenerator?: (types: EvidenceType[]) => Evidence[];
    timelineGenerator?: (events: number) => TimelineEvent[];
}

// Predefined story templates
export const STORY_TEMPLATES = {
    INTERNAL_LEAK: {
        templateId: 'internal_leak',
        name: 'Internal Information Leak',
        description: 'Someone within the organization is leaking information',
        baseConfig: {
            category: 'internal',
            availableApps: ['email', 'messages', 'files', 'evidence'],
            evidenceTypes: [
                { type: 'email', count: 15, criticalCount: 3 },
                { type: 'access_log', count: 8, criticalCount: 2 },
                { type: 'financial', count: 5, criticalCount: 1 }
            ],
            suspectCount: 3,
            minimumCluesForSolution: 5
        }
    },
    
    CYBER_ATTACK: {
        templateId: 'cyber_attack',
        name: 'Cyber Security Breach',
        description: 'External hackers have breached our systems',
        baseConfig: {
            category: 'cyber',
            availableApps: ['email', 'files', 'evidence'],
            customApps: [
                {
                    id: 'network_monitor',
                    name: 'Network Monitor',
                    icon: '📊',
                    type: 'monitoring',
                    purpose: 'Monitor network traffic and intrusion attempts',
                    data: {}
                },
                {
                    id: 'log_analyzer',
                    name: 'Log Analyzer',
                    icon: '📋',
                    type: 'forensic',
                    purpose: 'Analyze system logs and trace attack vectors',
                    data: {}
                }
            ],
            evidenceTypes: [
                { type: 'access_log', count: 20, criticalCount: 5 },
                { type: 'surveillance', count: 12, criticalCount: 3 },
                { type: 'forensic_report', count: 8, criticalCount: 2 }
            ]
        }
    },
    
    FINANCIAL_FRAUD: {
        templateId: 'financial_fraud',
        name: 'Financial Fraud Investigation',
        description: 'Suspicious financial transactions detected',
        baseConfig: {
            category: 'financial',
            availableApps: ['email', 'evidence'],
            customApps: [
                {
                    id: 'banking_system',
                    name: 'FinTrack Pro',
                    icon: '💰',
                    type: 'financial',
                    purpose: 'Access banking records and transaction histories',
                    data: {}
                },
                {
                    id: 'crypto_tracker',
                    name: 'CryptoTrace',
                    icon: '₿',
                    type: 'financial',
                    purpose: 'Track cryptocurrency transactions',
                    data: {}
                }
            ],
            evidenceTypes: [
                { type: 'financial', count: 25, criticalCount: 8 },
                { type: 'email', count: 10, criticalCount: 3 },
                { type: 'database_record', count: 15, criticalCount: 4 }
            ]
        }
    },
    
    ESPIONAGE: {
        templateId: 'espionage',
        name: 'Foreign Espionage',
        description: 'Foreign agents infiltrating our operations',
        baseConfig: {
            category: 'espionage',
            availableApps: ['email', 'messages', 'files', 'evidence'],
            customApps: [
                {
                    id: 'intelligence_db',
                    name: 'Intel Database',
                    icon: '🎭',
                    type: 'database',
                    purpose: 'Access classified intelligence reports',
                    data: {}
                },
                {
                    id: 'social_analyzer',
                    name: 'Social Web',
                    icon: '🕸️',
                    type: 'social',
                    purpose: 'Analyze social connections and patterns',
                    data: {}
                }
            ],
            evidenceTypes: [
                { type: 'email', count: 18, criticalCount: 5 },
                { type: 'surveillance', count: 15, criticalCount: 4 },
                { type: 'social_media', count: 20, criticalCount: 6 },
                { type: 'phone_record', count: 12, criticalCount: 3 }
            ]
        }
    }
};

// Story progression system
export interface StoryArc {
    id: string;
    name: string;
    description: string;
    stories: string[]; // Story IDs in order
    overallNarrative: string;
    rewards: ArcReward[];
}

export interface ArcReward {
    type: 'clearance_upgrade' | 'new_app' | 'special_access' | 'achievement';
    value: any;
    description: string;
}

// Main story arcs
export const STORY_ARCS = {
    NEXUS_ORIGIN: {
        id: 'nexus_origin',
        name: 'The NEXUS Files',
        description: 'Uncover the truth behind the NEXUS organization',
        stories: ['internal-leak', 'the-insider', 'nexus-conspiracy'],
        overallNarrative: 'What started as a simple internal leak investigation reveals a deeper conspiracy...',
        rewards: [
            { type: 'clearance_upgrade', value: 10, description: 'Maximum security clearance' },
            { type: 'achievement', value: 'nexus_truth', description: 'Uncovered the NEXUS conspiracy' }
        ]
    },
    
    CYBER_WARFARE: {
        id: 'cyber_warfare',
        name: 'Digital Battlefield',
        description: 'Combat state-sponsored cyber attacks',
        stories: ['operation-blackout', 'digital-ghost', 'phantom-protocol'],
        overallNarrative: 'A series of sophisticated cyber attacks threaten national security...',
        rewards: [
            { type: 'new_app', value: 'advanced_forensics', description: 'Advanced forensic tools' }
        ]
    }
};
