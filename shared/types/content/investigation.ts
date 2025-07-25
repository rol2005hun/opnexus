import type { BaseEntity } from '..';

export interface Objective extends BaseEntity {
    title: string;
    description: string;
    type: 'identify' | 'analyze' | 'connect' | 'prove' | 'timeline' | 'primary' | 'secondary' | 'hidden';
    requiredEvidence: string[];
    hints?: string[];
}

export interface MissionEvent extends BaseEntity {
    timestamp: Date;
    title: string;
    description: string;
    participants: string[];
    location: string;
    isPublic: boolean;
    revealedBy: string[];
    evidence?: string[];
}