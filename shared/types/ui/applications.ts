import type { BaseEntity } from '../core/base';

export interface StoryApp extends BaseEntity {
    name: string;
    icon: string;
    type: 'financial' | 'surveillance' | 'database' | 'communication' | 'monitoring' | 'social' | 'forensic';
    description: string;
    data: AppSpecificData;
    accessRequirements?: string[];
}

export interface AppSpecificData {
    [key: string]: any;
}
