import type { BaseEntity } from '../core/base';
import type { EmailMessage } from './email';
import type { Character, Suspect } from './characters';
import type { EvidenceConversation, FileDocument, DatabaseRecord } from './evidence';
import type { Objective, StoryEvent } from './investigation';
import type { StoryApp } from '../ui/applications';

export interface StoryContent extends BaseEntity {
    storyId: string;
    setting: StorySetting;
    characters: Character[];
    suspects: Suspect[];
    emails: EmailMessage[];
    chatMessages: EvidenceConversation[];
    files: FileDocument[];
    records: DatabaseRecord[];
    customApps: StoryApp[];
    objectives: Objective[];
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
