export interface Story {
    id: string;
    title: string;
    description: string;
    briefing: string;
    thumbnail: string;
    difficulty: 'Rookie' | 'Agent' | 'Senior Agent' | 'Special Agent' | 'Supervisor' | 'Section Chief' | 'Deputy Director' | 'Director';
    estimatedTime: string;
    completed: boolean;
    available: boolean;
    securityClearance: number;
    icon: string;
    price?: number;
    isPaid?: boolean;
}

export interface StoryProgress {
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

export interface GameState {
    currentStory: string | null;
    stories: Story[];
    isInLaptop: boolean;
    progress: Record<string, StoryProgress>;
}
