import type { MissionContent } from '../content/mission';
import type { BaseEntity, DifficultyLevel, SecurityClearanceLevel } from '../core/base';

export interface Mission extends BaseEntity {
    title: string;
    description: string;
    briefing: string;
    thumbnail: string;
    difficulty: DifficultyLevel;
    estimatedTime: string;
    available: boolean;
    securityClearance: SecurityClearanceLevel;
    icon: string;
    price: number;
    content?: MissionContent;
}