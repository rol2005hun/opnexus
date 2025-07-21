// Story Content Types - Interfaces for story elements and characters

import type { EmailMessage, EmailAttachment } from './email';

export interface StoryContent {
    id: string;
    storyId: string;
    
    // Background and world
    setting: StorySetting;
    
    // Characters and suspects
    characters: Character[];
    suspects: Suspect[];
    
    // Evidence and clues
    emails: EmailMessage[];
    chatMessages: ChatConversation[];
    files: FileDocument[];
    records: DatabaseRecord[];
    
    // Custom applications and their data
    customApps: StoryApp[];
    
    // Investigation objectives
    objectives: Objective[];
    
    // Story-specific timeline
    timeline: StoryEvent[];
}

export interface StorySetting {
    location: string;
    organization: string;
    department?: string;
    timeframe: string;
    context: string;
    backgroundInfo: string;
}

export interface Character {
    id: string;
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

export interface ChatConversation {
    id: string;
    participants: string[];
    platform: string;
    messages: ChatMessage[];
    encrypted?: boolean;
    groupName?: string;
    isEvidence: boolean;
    title: string;
}

export interface ChatMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    edited?: boolean;
    deleted?: boolean;
    attachments?: ChatAttachment[];
    isClue?: boolean;
    reactions?: { emoji: string; users: string[] }[];
}

export interface ChatAttachment {
    name: string;
    type: string;
    url?: string;
    content?: string;
}

export interface FileDocument {
    id: string;
    name: string;
    type: 'document' | 'spreadsheet' | 'image' | 'video' | 'audio' | 'archive';
    size: string;
    lastModified: string;
    author: string;
    content: string | any; // Text content or structured data
    encrypted: boolean;
    accessLevel: number;
    isEvidence: boolean;
    relatedTo: string[]; // Related character IDs
}

export interface DatabaseRecord {
    id: string;
    database: string;
    table: string;
    record: Record<string, any>;
    timestamp: string;
    modifiedBy: string;
    isAnomaly: boolean;
    isEvidence: boolean;
}

export interface StoryApp {
    id: string;
    name: string;
    icon: string;
    type: 'financial' | 'surveillance' | 'database' | 'communication' | 'monitoring' | 'social' | 'forensic';
    description: string;
    data: AppSpecificData;
    accessRequirements?: string[];
}

export interface AppSpecificData {
    [key: string]: any;
}

export interface Objective {
    id: string;
    title: string;
    description: string;
    type: 'identify' | 'analyze' | 'connect' | 'prove' | 'timeline' | 'primary' | 'secondary' | 'hidden';
    completed: boolean;
    requiredEvidence: string[];
    hints?: string[];
    pointsAwarded?: number;
}

export interface StoryEvent {
    id: string;
    timestamp: string;
    title: string;
    description: string;
    participants: string[];
    location: string;
    isPublic: boolean; // Can player see this without finding evidence?
    revealedBy: string[]; // Evidence IDs that reveal this event
    evidence?: string[];
    revealed?: boolean;
}
