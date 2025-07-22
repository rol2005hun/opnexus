export interface FileDocument {
    id: string;
    name: string;
    type: 'document' | 'spreadsheet' | 'image' | 'video' | 'audio' | 'archive';
    size: string;
    lastModified: string;
    author: string;
    content: string | any;
    encrypted: boolean;
    accessLevel: number;
    isEvidence: boolean;
    relatedTo: string[];
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

export interface EvidenceConversation {
    id: string;
    participants: string[];
    platform: string;
    messages: EvidenceMessage[];
    encrypted?: boolean;
    groupName?: string;
    isEvidence: boolean;
    title: string;
}

export interface EvidenceMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    attachments?: EvidenceAttachment[];
    isClue?: boolean;
}

export interface EvidenceAttachment {
    name: string;
    type: string;
    url?: string;
    content?: string;
}