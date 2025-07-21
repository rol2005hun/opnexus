import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export interface Story {
    id: string;
    title: string;
    description: string;
    briefing: string;
    thumbnail: string;
    difficulty: 'Rookie' | 'Agent' | 'Senior Agent' | 'Special Agent';
    estimatedTime: string;
    completed: boolean;
    available: boolean;
    securityClearance: number;
    icon: string;
    price?: number;
    isPaid?: boolean;
}

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
    type: 'email' | 'file' | 'chat' | 'financial' | 'access_log' | 'phone_record' | 'surveillance';
    title: string;
    content: any;
    timestamp: string;
    importance: 'low' | 'medium' | 'high' | 'critical';
    tags: string[];
    analyzed: boolean;
    relatedSuspects: string[];
}

interface StoryProgress {
    emailsRead: string[];
    messagesRead: string[];
    evidenceFound: string[];
    suspectsIdentified: string[];
    connectionsDiscovered: string[];
    timelineBuilt: boolean;
    primarySuspectConfirmed: boolean;
    caseStatus: 'briefing' | 'investigating' | 'analyzing' | 'building_case' | 'arrest_warrant' | 'completed';
    investigationScore: number;
    hintsUsed: number;
}

interface GameState {
    currentStory: string | null;
    stories: Story[];
    isInLaptop: boolean;
    progress: Record<string, StoryProgress>;
    suspects: Record<string, SuspectProfile[]>;
    evidence: Record<string, Evidence[]>;
}

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        currentStory: null,
        isInLaptop: false,
        progress: {},
        suspects: {},
        evidence: {},
        stories: [
            {
                id: 'internal-leak',
                title: 'The Internal Leak',
                description: 'Someone within our organization is leaking confidential documents to external parties. Investigate emails, messages, and file access logs to identify the mole.',
                briefing: 'At 14:32 yesterday, our security monitoring detected unauthorized downloads of classified Project Neptune files. Initial analysis suggests the breach originated from someone with legitimate access to these documents. Three employees had access during the timeframe: a project manager, a systems administrator, and a security consultant. Your mission: analyze digital communications, file access patterns, and financial records to identify which employee is the leak.',
                thumbnail: '/stories/leak.jpg', 
                difficulty: 'Agent',
                estimatedTime: '60-90 mins',
                completed: false,
                available: true,
                securityClearance: 1,
                icon: '🕵️‍♂️',
                price: 0,
                isPaid: false
            },
            {
                id: 'operation-blackout',
                title: 'Operation: Blackout',
                description: 'A coordinated cyber attack has hit multiple government contractors. Sensitive defense projects have been compromised.',
                briefing: 'At 03:47 EST, our monitoring systems detected unauthorized access to classified servers at DefenTech Industries, followed by similar breaches at two other defense contractors. The attackers appear to have inside knowledge of our security protocols. Your mission: identify the threat actor, determine the scope of the breach, and trace the leaked intelligence.',
                thumbnail: '/stories/blackout.jpg',
                difficulty: 'Senior Agent',
                estimatedTime: '90-120 mins',
                completed: false,
                available: true,
                securityClearance: 3,
                icon: '⚡',
                price: 1,
                isPaid: true
            },
            {
                id: 'the-insider',
                title: 'The Insider',
                description: 'Someone with high-level access is selling classified information. Multiple agencies are involved.',
                briefing: 'Intelligence suggests a mole within our organization has been providing classified information to foreign adversaries for the past 18 months. The suspect has access to multiple systems and has been careful to cover their tracks. Recent financial transactions and communication patterns indicate an acceleration in their activities.',
                thumbnail: '/stories/insider.jpg',
                difficulty: 'Special Agent',
                estimatedTime: '120-180 mins',
                completed: false,
                available: true,
                securityClearance: 5,
                icon: '🎭',
                price: 1,
                isPaid: true
            },
            {
                id: 'digital-ghost',
                title: 'Digital Ghost', 
                description: 'Track down an elite hacker who has been manipulating financial markets and stealing corporate secrets.',
                briefing: 'An unidentified threat actor, codenamed "Digital Ghost," has been conducting sophisticated attacks on financial institutions and tech companies. They leave minimal traces and use advanced evasion techniques. Recent intelligence suggests they may be planning a major operation.',
                thumbnail: '/stories/ghost.jpg',
                difficulty: 'Special Agent',
                estimatedTime: '150-200 mins',
                completed: false,
                available: true,
                securityClearance: 7,
                icon: '👻',
                price: 1,
                isPaid: true
            },
            {
                id: 'banking-fraud',
                title: 'Banking Fraud Investigation',
                description: 'Sophisticated fraud scheme detected at City National Bank involving unauthorized transfers totaling $2.3M with cryptocurrency laundering.',
                briefing: 'At 09:30 this morning, our compliance officer Jennifer Kim flagged suspicious transaction patterns involving multiple large transfers during system maintenance windows. The transactions bypass standard approval workflows and appear to involve cryptocurrency conversion. Evidence suggests insider involvement with potential external coordination. Your mission: identify the perpetrator, trace the money flow, and uncover all accomplices in this fraud scheme.',
                thumbnail: '/stories/banking.jpg',
                difficulty: 'Agent',
                estimatedTime: '75-105 mins',
                completed: false,
                available: true,
                securityClearance: 1,
                icon: '🏦',
                price: 0,
                isPaid: false
            }
        ]
    }),

    actions: {
        selectStory(storyId: string) {
            const story = this.stories.find(s => s.id === storyId);
            if (!story || !story.available || story.securityClearance > this.agent.clearanceLevel) {
                return;
            }

            this.currentStory = storyId;
            this.isInLaptop = true;

            // Initialize case data
            if (!this.progress[storyId]) {
                this.progress[storyId] = {
                    emailsRead: [],
                    messagesRead: [],
                    evidenceFound: [],
                    suspectsIdentified: [],
                    connectionsDiscovered: [],
                    timelineBuilt: false,
                    primarySuspectConfirmed: false,
                    caseStatus: 'briefing',
                    investigationScore: 0,
                    hintsUsed: 0
                };
            }

            // Initialize suspects and evidence for the case
            this.initializeCaseData(storyId);
        },

        initializeCaseData(storyId: string) {
            if (storyId === 'operation-blackout') {
                this.suspects[storyId] = [
                    {
                        id: 'tech_lead_miller',
                        name: 'David Miller',
                        role: 'Senior Tech Lead',
                        department: 'DefenTech Industries - R&D',
                        accessLevel: 8,
                        lastSeen: '2025-07-19 22:15:00',
                        suspicionLevel: 3,
                        connections: ['sarah_wilson', 'external_contact_1'],
                        alibi: 'Claims to have been at home during the breach'
                    },
                    {
                        id: 'sys_admin_torres',
                        name: 'Maria Torres',
                        role: 'System Administrator',
                        department: 'DefenTech Industries - IT',
                        accessLevel: 9,
                        lastSeen: '2025-07-20 01:30:00',
                        suspicionLevel: 7,
                        connections: ['contractor_smith', 'external_contact_2']
                    },
                    {
                        id: 'contractor_smith',
                        name: 'Robert Smith',
                        role: 'External Security Consultant',
                        department: 'CyberShield Solutions',
                        accessLevel: 6,
                        lastSeen: '2025-07-19 18:45:00',
                        suspicionLevel: 5,
                        connections: ['sys_admin_torres', 'unknown_contact']
                    },
                    {
                        id: 'finance_wilson',
                        name: 'Sarah Wilson',
                        role: 'Finance Director',
                        department: 'DefenTech Industries - Finance',
                        accessLevel: 4,
                        lastSeen: '2025-07-20 09:00:00',
                        suspicionLevel: 2,
                        connections: ['tech_lead_miller']
                    }
                ];

                this.evidence[storyId] = [
                    {
                        id: 'initial_breach_log',
                        type: 'access_log',
                        title: 'Security Breach Detection Log',
                        content: 'Multiple failed authentication attempts followed by successful login from anomalous IP addresses.',
                        timestamp: '2025-07-20 03:47:23',
                        importance: 'high',
                        tags: ['breach', 'authentication', 'suspicious_ip'],
                        analyzed: false,
                        relatedSuspects: []
                    }
                ];
            }
        },

        exitLaptop() {
            this.isInLaptop = false;
        },

        updateProgress(storyId: string, progress: Partial<StoryProgress>) {
            if (!this.progress[storyId]) {
                this.initializeCaseData(storyId);
            }
            if (this.progress[storyId]) {
                Object.assign(this.progress[storyId], progress);
            }
        },

        markEmailRead(storyId: string, emailId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].emailsRead.includes(emailId)) {
                this.progress[storyId].emailsRead.push(emailId);
                this.progress[storyId].investigationScore += 10;
            }
            this.checkProgress(storyId);
        },

        markMessageRead(storyId: string, chatId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].messagesRead.includes(chatId)) {
                this.progress[storyId].messagesRead.push(chatId);
                this.progress[storyId].investigationScore += 15;
            }
            this.checkProgress(storyId);
        },

        addEvidence(storyId: string, evidenceId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].evidenceFound.includes(evidenceId)) {
                this.progress[storyId].evidenceFound.push(evidenceId);
                this.progress[storyId].investigationScore += 25;
            }
            this.checkProgress(storyId);
        },

        identifySuspect(storyId: string, suspectId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].suspectsIdentified.includes(suspectId)) {
                this.progress[storyId].suspectsIdentified.push(suspectId);
                this.progress[storyId].investigationScore += 30;
            }
            this.checkProgress(storyId);
        },

        discoverConnection(storyId: string, connectionId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].connectionsDiscovered.includes(connectionId)) {
                this.progress[storyId].connectionsDiscovered.push(connectionId);
                this.progress[storyId].investigationScore += 20;
            }
            this.checkProgress(storyId);
        },

        useHint(storyId: string) {
            if (!this.progress[storyId]) return;
            this.progress[storyId].hintsUsed += 1;
            this.progress[storyId].investigationScore -= 5;
        },

        checkProgress(storyId: string) {
            const progress = this.progress[storyId];
            if (!progress) return;

            if (storyId === 'operation-blackout') {
                // Progressive case status updates based on evidence gathering
                if (progress.evidenceFound.length >= 1 && progress.caseStatus === 'briefing') {
                    progress.caseStatus = 'investigating';
                }
                
                if (progress.evidenceFound.length >= 3 && progress.suspectsIdentified.length >= 2 && progress.caseStatus === 'investigating') {
                    progress.caseStatus = 'analyzing';
                }
                
                if (progress.connectionsDiscovered.length >= 2 && progress.caseStatus === 'analyzing') {
                    progress.caseStatus = 'building_case';
                    progress.timelineBuilt = true;
                }
                
                if (progress.suspectsIdentified.length >= 3 && progress.evidenceFound.length >= 5 && progress.caseStatus === 'building_case') {
                    progress.caseStatus = 'arrest_warrant';
                    progress.primarySuspectConfirmed = true;
                }
                
                if (progress.investigationScore >= 200 && progress.primarySuspectConfirmed) {
                    progress.caseStatus = 'completed';
                    this.stories.find(s => s.id === storyId)!.completed = true;
                    
                    // Unlock next case based on performance
                    if (progress.investigationScore >= 250 && progress.hintsUsed <= 2) {
                        const nextStory = this.stories.find(s => s.id === 'the-insider');
                        if (nextStory) nextStory.available = true;
                    }
                }
            }
        }
    },

    getters: {
        currentProgress(): StoryProgress | null {
            if (!this.currentStory || !this.progress[this.currentStory]) {
                return null;
            }
            return this.progress[this.currentStory] || null;
        },

        currentSuspects(): SuspectProfile[] {
            if (!this.currentStory || !this.suspects[this.currentStory]) {
                return [];
            }
            return this.suspects[this.currentStory] || [];
        },

        currentEvidence(): Evidence[] {
            if (!this.currentStory || !this.evidence[this.currentStory]) {
                return [];
            }
            return this.evidence[this.currentStory] || [];
        },

        currentStoryData(): Story | null {
            if (!this.currentStory) return null;
            return this.stories.find(s => s.id === this.currentStory) || null;
        },

        availableStories(): Story[] {
            const authStore = useAuthStore();
            const userClearance = authStore.userAgent?.clearanceLevel || 1;
            return this.stories.filter(story => 
                story.available && 
                story.securityClearance <= userClearance &&
                (!story.isPaid || authStore.hasStoryAccess(story.id))
            );
        },

        agent() {
            const authStore = useAuthStore();
            return authStore.userAgent || {
                badge: "GUEST",
                name: "Guest User",
                rank: "Visitor", 
                department: "Public Access",
                clearanceLevel: 0,
                joinDate: new Date()
            };
        },

        investigationSummary(): string {
            const progress = this.currentProgress;
            if (!progress) return '';

            const score = progress.investigationScore;
            const status = progress.caseStatus;
            
            if (score < 50) return 'Investigation just beginning...';
            if (score < 100) return 'Making steady progress on the case.';
            if (score < 150) return 'Key evidence discovered. Building strong case.';
            if (score < 200) return 'Major breakthrough achieved. Close to resolution.';
            return 'Case ready for prosecution!';
        }
    }
});