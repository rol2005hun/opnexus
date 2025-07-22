export interface StoryProgress {
    emailsRead: string[];
    messagesRead: string[];
    evidenceFound: string[];
    filesExamined: string[];
    suspectsIdentified: string[];
    connectionsDiscovered: string[];
    timelineBuilt: boolean;
    primarySuspectConfirmed: boolean;
    caseStatus: 'briefing' | 'investigating' | 'analyzing' | 'building_case' | 'arrest_warrant' | 'completed';
    investigationScore: number;
    hintsUsed: number;
}
