import type { BaseEntity } from '..';

export interface Character extends BaseEntity {
    name: string;
    role: string;
    department: string;
    background: string;
    personality: string;
    avatar: string;
    accessLevel: number;
    suspicious: boolean;
    isSuspect: boolean;
    isPlayer?: boolean;
    suspicionLevel?: number;
    alibi?: string;
    motive?: string;
    opportunity?: string;
    method?: string;
    connections?: string[];
    lastSeen?: string;
    evidenceAgainst?: string[];
    evidenceFor?: string[];
}