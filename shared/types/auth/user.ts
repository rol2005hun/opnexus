import type { BaseEntity, DifficultyLevel, SecurityClearanceLevel } from '../core/base';

export interface User extends BaseEntity {
    username: string;
    email: string;
    agent: Agent;
    gameProgress: GameProgress;
    subscription: Subscription;
}

export interface Agent {
    badge: string;
    name: string;
    rank: DifficultyLevel;
    department: string;
    clearanceLevel: SecurityClearanceLevel;
    joinDate: Date;
}

export interface GameProgress {
    completedMissions: string[];
    purchasedMissions: string[];
    currentMission: string | null;
    totalPlaytime: number;
    achievements: string[];
}

export interface Subscription {
    type: 'free' | 'premium';
    expiresAt?: Date;
}
