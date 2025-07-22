import type { BaseEntity } from '../core/base';

export interface Objective extends BaseEntity {
    title: string;
    description: string;
    type: 'identify' | 'analyze' | 'connect' | 'prove' | 'timeline' | 'primary' | 'secondary' | 'hidden';
    completed: boolean;
    requiredEvidence: string[];
    hints?: string[];
}

export interface StoryEvent extends BaseEntity {
    timestamp: string;
    title: string;
    description: string;
    participants: string[];
    location: string;
    isPublic: boolean;
    revealedBy: string[];
    evidence?: string[];
}
