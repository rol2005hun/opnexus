export interface Objective {
    id: string;
    title: string;
    description: string;
    type: 'identify' | 'analyze' | 'connect' | 'prove' | 'timeline' | 'primary' | 'secondary' | 'hidden';
    completed: boolean;
    requiredEvidence: string[];
    hints?: string[];
}

export interface StoryEvent {
    id: string;
    timestamp: string;
    title: string;
    description: string;
    participants: string[];
    location: string;
    isPublic: boolean;
    revealedBy: string[];
    evidence?: string[];
}