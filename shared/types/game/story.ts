import type { BaseEntity, DifficultyLevel, SecurityClearanceLevel } from '../core/base';
import type { StoryContent } from '../content/story';

export interface Story extends BaseEntity {
    title: string;
    description: string;
    briefing: string;
    thumbnail: string;
    difficulty: DifficultyLevel;
    estimatedTime: string;
    completed: boolean;
    available: boolean;
    securityClearance: SecurityClearanceLevel;
    icon: string;
    price?: number;
    isPaid?: boolean;
    content?: StoryContent;
}
