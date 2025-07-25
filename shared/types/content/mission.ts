import type { BaseEntity, Character, Email, Chat, FileDocument, DatabaseRecord, MissionApp, Objective, MissionEvent } from '..';

export interface MissionContent extends BaseEntity {
    setting: MissionSetting;
    characters: Character[];
    emails: Email[];
    chatMessages: Chat[];
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