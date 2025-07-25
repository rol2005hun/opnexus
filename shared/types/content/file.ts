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