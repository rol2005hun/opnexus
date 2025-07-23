export interface MissionProgress {
    emailsRead: string[];
    messagesRead: string[];
    evidenceFound: string[];
    filesExamined: string[];
    suspectsIdentified: string[];
    timelineBuilt: boolean;
    primarySuspectConfirmed: boolean;
    caseStatus: 'briefing' | 'investigating' | 'analyzing' | 'building_case' | 'arrest_warrant' | 'completed';
    investigationScore: number;
    hintsUsed: number;
    markedEvidence: string[];
}
