import type { BaseEntity } from '..';

export interface FileDocument extends BaseEntity {
    name: string;
    type: 'document' | 'spreadsheet' | 'image' | 'video' | 'audio' | 'archive';
    size: string;
    lastModified: Date;
    author: string;
    content: string | any;
    encrypted: boolean;
    accessLevel: number;
    isEvidence: boolean;
    relatedTo: string[];
}

export interface DatabaseRecord extends BaseEntity {
    database: string;
    table: string;
    record: Record<string, any>;
    timestamp: Date;
    modifiedBy: string;
    isAnomaly: boolean;
    isEvidence: boolean;
}

export interface EvidenceConversation extends BaseEntity {
    participants: string[];
    platform: string;
    messages: EvidenceMessage[];
    encrypted?: boolean;
    groupName?: string;
    isEvidence: boolean;
    title: string;
}

export interface EvidenceMessage extends BaseEntity {
    sender: string;
    content: string;
    timestamp: Date;
    attachments?: EvidenceAttachment[];
    isClue?: boolean;
}

export interface EvidenceAttachment {
    name: string;
    type: string;
    url?: string;
    content?: string;
    fileId?: string;
}