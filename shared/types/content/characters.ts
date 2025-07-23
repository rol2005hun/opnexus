import type { BaseEntity } from '../core/base';

export interface Character extends BaseEntity {
    name: string;
    role: string;
    department: string;
    background: string;
    personality: string;
    photo?: string;
    avatar?: string;
    accessLevel: number;
    suspicious: boolean;
    isSuspect: boolean;
    isPlayer?: boolean;
}

export interface Suspect extends Character {
    suspicionLevel: number;
    alibi?: string;
    motive?: string;
    opportunity?: string;
    method?: string;
    connections: string[];
    lastSeen?: string;
    evidenceAgainst?: string[];
    evidenceFor?: string[];
}