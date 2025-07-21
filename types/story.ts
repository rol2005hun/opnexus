import type { EmailMessage } from './email';
import type { Character, Suspect } from './characters';
import type { EvidenceConversation } from './evidence';
import type { FileDocument, DatabaseRecord } from './evidence';
import type { StoryApp } from './applications';
import type { Objective, StoryEvent } from './investigation';

export interface StoryContent {
    id: string;
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
