import type { BaseEntity, Character, EmailMessage, EvidenceConversation, FileDocument, DatabaseRecord, MissionApp, Objective, MissionEvent } from '..';

export interface MissionContent extends BaseEntity {
    setting: MissionSetting;
    characters: Character[];
    emails: EmailMessage[];
    chatMessages: EvidenceConversation[];
    files: FileDocument[];
    records: DatabaseRecord[];
    availableApps: string[];
    customApps?: MissionApp[];
    objectives: Objective[];
    timeline: MissionEvent[];
}

export interface MissionSetting {
    location: string;
    organization: string;
    department?: string;
    timeframe: string;
    context: string;
    backgroundInfo: string;
    playerEmailDomain: string;
}