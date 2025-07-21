// Story Builder - Tool for creating new investigation stories

import type { StoryConfig, StoryTemplate, CustomApp, TimelineEvent, EvidenceType } from '@/types/story';

export class StoryBuilder {
    private config: Partial<StoryConfig> = {};
    
    constructor(template?: StoryTemplate) {
        if (template) {
            this.config = { ...template.baseConfig };
        }
    }
    
    // Basic story information
    setBasicInfo(info: { 
        id: string; 
        title: string; 
        description: string; 
        briefing: string 
    }): StoryBuilder {
        Object.assign(this.config, info);
        return this;
    }
    
    // Difficulty and requirements
    setDifficulty(
        difficulty: 'Rookie' | 'Agent' | 'Senior Agent' | 'Special Agent',
        estimatedTime: string,
        securityClearance: number
    ): StoryBuilder {
        this.config.difficulty = difficulty;
        this.config.estimatedTime = estimatedTime;
        this.config.securityClearance = securityClearance;
        return this;
    }
    
    // Available applications
    setAvailableApps(apps: string[]): StoryBuilder {
        this.config.availableApps = apps;
        return this;
    }
    
    // Add custom apps for this story
    addCustomApp(app: CustomApp): StoryBuilder {
        if (!this.config.customApps) {
            this.config.customApps = [];
        }
        this.config.customApps.push(app);
        return this;
    }
    
    // Evidence configuration
    setEvidenceTypes(types: EvidenceType[]): StoryBuilder {
        this.config.evidenceTypes = types;
        return this;
    }
    
    // Investigation parameters
    setInvestigationParams(params: {
        suspectCount: number;
        minimumCluesForSolution: number;
        allowedHints: number;
    }): StoryBuilder {
        Object.assign(this.config, params);
        return this;
    }
    
    // Story progression
    setProgression(prerequisites?: string[], unlocks?: string[]): StoryBuilder {
        this.config.prerequisites = prerequisites;
        this.config.unlocks = unlocks;
        return this;
    }
    
    // Pricing
    setPricing(price: number, isPaid: boolean = true): StoryBuilder {
        this.config.price = price;
        this.config.isPaid = isPaid;
        return this;
    }
    
    // Build the final story configuration
    build(): StoryConfig {
        // Validate required fields
        if (!this.config.id || !this.config.title || !this.config.description || !this.config.briefing) {
            throw new Error('Missing required story information');
        }
        
        if (!this.config.difficulty || !this.config.estimatedTime || this.config.securityClearance === undefined) {
            throw new Error('Missing difficulty settings');
        }
        
        if (!this.config.availableApps || this.config.availableApps.length === 0) {
            throw new Error('At least one app must be available');
        }
        
        if (!this.config.evidenceTypes || this.config.evidenceTypes.length === 0) {
            throw new Error('At least one evidence type must be defined');
        }
        
        // Set defaults
        const finalConfig: StoryConfig = {
            category: 'internal',
            icon: '🕵️‍♂️',
            suspectCount: 3,
            minimumCluesForSolution: 5,
            allowedHints: 3,
            perfectScore: 1000,
            timeBonus: true,
            stealthBonus: true,
            price: 0,
            isPaid: false,
            isMainline: false,
            ...this.config
        } as StoryConfig;
        
        return finalConfig;
    }
}

// Predefined story generators for quick creation
export class QuickStoryGenerator {
    
    // Generate a basic internal leak story
    static createInternalLeakStory(options: {
        id: string;
        title: string;
        suspectCount?: number;
        department?: string;
    }): StoryConfig {
        return new StoryBuilder()
            .setBasicInfo({
                id: options.id,
                title: options.title,
                description: `Investigate an internal information leak within ${options.department || 'the organization'}.`,
                briefing: `Confidential information has been leaked. Your mission is to identify the source and prevent further breaches.`
            })
            .setDifficulty('Agent', '60-90 mins', 2)
            .setAvailableApps(['email', 'messages', 'files', 'evidence'])
            .setEvidenceTypes([
                { type: 'email', count: 12, criticalCount: 3 },
                { type: 'access_log', count: 8, criticalCount: 2 },
                { type: 'file', count: 6, criticalCount: 1 }
            ])
            .setInvestigationParams({
                suspectCount: options.suspectCount || 3,
                minimumCluesForSolution: 5,
                allowedHints: 3
            })
            .build();
    }
    
    // Generate a cyber attack story
    static createCyberAttackStory(options: {
        id: string;
        title: string;
        complexity?: 'simple' | 'advanced' | 'expert';
    }): StoryConfig {
        const complexity = options.complexity || 'simple';
        const builder = new StoryBuilder()
            .setBasicInfo({
                id: options.id,
                title: options.title,
                description: 'Investigate a sophisticated cyber attack on our systems.',
                briefing: 'Our security systems have detected unauthorized access. Trace the attack and identify the perpetrators.'
            })
            .setAvailableApps(['email', 'files', 'evidence'])
            .addCustomApp({
                id: 'network_monitor',
                name: 'Network Monitor',
                icon: '📊',
                type: 'monitoring',
                purpose: 'Monitor network traffic and detect intrusions',
                data: {}
            });
            
        switch (complexity) {
            case 'simple':
                builder
                    .setDifficulty('Agent', '45-75 mins', 2)
                    .setEvidenceTypes([
                        { type: 'access_log', count: 10, criticalCount: 3 },
                        { type: 'email', count: 8, criticalCount: 2 }
                    ])
                    .setInvestigationParams({ suspectCount: 2, minimumCluesForSolution: 4, allowedHints: 4 });
                break;
            case 'advanced':
                builder
                    .setDifficulty('Senior Agent', '90-120 mins', 4)
                    .setEvidenceTypes([
                        { type: 'access_log', count: 18, criticalCount: 5 },
                        { type: 'forensic_report', count: 8, criticalCount: 3 },
                        { type: 'surveillance', count: 12, criticalCount: 2 }
                    ])
                    .setInvestigationParams({ suspectCount: 4, minimumCluesForSolution: 8, allowedHints: 2 });
                break;
            case 'expert':
                builder
                    .setDifficulty('Special Agent', '120-180 mins', 6)
                    .setEvidenceTypes([
                        { type: 'access_log', count: 25, criticalCount: 8 },
                        { type: 'forensic_report', count: 15, criticalCount: 5 },
                        { type: 'surveillance', count: 20, criticalCount: 4 },
                        { type: 'database_record', count: 12, criticalCount: 3 }
                    ])
                    .setInvestigationParams({ suspectCount: 6, minimumCluesForSolution: 12, allowedHints: 1 });
                break;
        }
        
        return builder.build();
    }
    
    // Generate a financial fraud story
    static createFinancialFraudStory(options: {
        id: string;
        title: string;
        amount?: string;
        international?: boolean;
    }): StoryConfig {
        return new StoryBuilder()
            .setBasicInfo({
                id: options.id,
                title: options.title,
                description: `Investigate suspicious financial transactions${options.amount ? ` involving ${options.amount}` : ''}.`,
                briefing: `Unusual financial activity has been detected. Follow the money trail and identify the perpetrators.`
            })
            .setDifficulty('Senior Agent', '75-100 mins', 3)
            .setAvailableApps(['email', 'evidence'])
            .addCustomApp({
                id: 'banking_system',
                name: 'FinTrack Pro',
                icon: '💰',
                type: 'financial',
                purpose: 'Access banking records and transaction data',
                data: {}
            })
            .setEvidenceTypes([
                { type: 'financial', count: 20, criticalCount: 6 },
                { type: 'email', count: 12, criticalCount: 3 },
                { type: 'database_record', count: 8, criticalCount: 2 }
            ])
            .setInvestigationParams({
                suspectCount: 4,
                minimumCluesForSolution: 7,
                allowedHints: 2
            })
            .build();
    }
}

// Example usage and predefined stories
export const EXAMPLE_STORIES = {
    // Simple internal leak
    departmentLeak: QuickStoryGenerator.createInternalLeakStory({
        id: 'hr-department-leak',
        title: 'HR Department Leak',
        department: 'Human Resources',
        suspectCount: 2
    }),
    
    // Advanced cyber attack
    advancedHacking: QuickStoryGenerator.createCyberAttackStory({
        id: 'operation-nightfall',
        title: 'Operation: Nightfall',
        complexity: 'advanced'
    }),
    
    // Financial fraud case
    embezzlement: QuickStoryGenerator.createFinancialFraudStory({
        id: 'corporate-embezzlement',
        title: 'Corporate Embezzlement',
        amount: '$2.5M',
        international: true
    })
};
