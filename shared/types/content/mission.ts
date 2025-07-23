import type { BaseEntity } from '../core/base';
import type { EmailMessage } from './email';
import type { Character, Suspect } from './characters';
import type { EvidenceConversation, FileDocument, DatabaseRecord } from './evidence';
import type { Objective, MissionEvent } from './investigation';
import type { MissionApp } from '../ui/applications';

export interface MissionContent extends BaseEntity {
    setting: MissionSetting;
    characters: Character[];
    suspects: Suspect[];
    emails: EmailMessage[];
    chatMessages: EvidenceConversation[];
    files: FileDocument[];
    records: DatabaseRecord[];
    customApps: MissionApp[];
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