// Interactive Investigation System - Players must actively solve cases

interface TimelineEvent {
    id: string;
    timestamp: string;
    title: string;
    description: string;
    participants: string[];
    location: string;
    isPublic: boolean;
    revealedBy: string[];
}

export interface InvestigationSystem {
    // Evidence analysis and connection system
    evidenceConnections: EvidenceConnection[];
    
    // Theory building and testing
    theories: Theory[];
    
    // Active investigation tools
    analysisTools: AnalysisTool[];
    
    // Case solving mechanism
    solutionRequirements: SolutionRequirement[];
    
    // Final case presentation
    casePresentation: CasePresentation;
}

export interface EvidenceConnection {
    id: string;
    fromEvidenceId: string;
    toEvidenceId: string;
    connectionType: 'timeline' | 'person' | 'location' | 'motive' | 'method' | 'financial' | 'communication';
    playerMade: boolean; // Did player make this connection?
    strength: number; // 1-10 how strong the connection is
    description: string;
    requiredForSolution: boolean;
}

export interface Theory {
    id: string;
    suspect: string;
    motive: string;
    opportunity: string;
    method: string;
    evidence: string[]; // Supporting evidence IDs
    contradictions: string[]; // Evidence that contradicts this theory
    confidence: number; // Calculated based on evidence strength
    isCorrect?: boolean; // Only revealed at the end
}

export interface AnalysisTool {
    id: string;
    name: string;
    description: string;
    type: 'timeline' | 'network' | 'financial' | 'digital_forensics' | 'behavioral';
    usesRemaining: number;
    cost: number; // Investigation points needed
    results: AnalysisResult[];
}

export interface AnalysisResult {
    id: string;
    toolId: string;
    input: any; // What player analyzed
    output: any; // What they discovered
    revealsEvidence?: string[]; // Evidence IDs revealed by this analysis
    revealsConnections?: string[]; // Connection IDs revealed
}

export interface SolutionRequirement {
    type: 'evidence_connection' | 'timeline_construction' | 'motive_identification' | 'method_proof' | 'opportunity_verification';
    description: string;
    completed: boolean;
    requiredElements: string[]; // Evidence/connection IDs needed
    pointsAwarded: number;
}

export interface CasePresentation {
    finalAccusation: Accusation;
    evidencePresentation: EvidencePresentation[];
    timeline: TimelineEvent[];
    motiveExplanation: string;
    methodExplanation: string;
    opportunityExplanation: string;
    score: number;
    judgement: 'case_dismissed' | 'insufficient_evidence' | 'conviction' | 'perfect_case';
}

export interface Accusation {
    suspect: string;
    primaryCharge: string;
    secondaryCharges: string[];
    evidence: string[];
    confidence: number;
}

export interface EvidencePresentation {
    evidenceId: string;
    relevance: string;
    impact: 'weak' | 'medium' | 'strong' | 'critical';
    playerExplanation: string;
}

// Complex investigation mechanics
export class ActiveInvestigation {
    private evidenceAnalyzed: Set<string> = new Set();
    private connectionsFound: Map<string, EvidenceConnection> = new Map();
    private theoriesBuilt: Theory[] = [];
    private investigationPoints: number = 100;
    private timeRemaining: number = 480; // 8 hours in minutes
    
    // Player must actively analyze each piece of evidence
    analyzeEvidence(evidenceId: string, analysisType: string): AnalysisResult {
        if (this.investigationPoints < 5) {
            throw new Error('Insufficient investigation points');
        }
        
        this.investigationPoints -= 5;
        this.timeRemaining -= 15; // Each analysis takes time
        
        const evidence = this.getEvidence(evidenceId);
        const result = this.performAnalysis(evidence, analysisType);
        
        this.evidenceAnalyzed.add(evidenceId);
        
        // Analysis might reveal hidden information
        if (result.revealsEvidence) {
            result.revealsEvidence.forEach(id => {
                this.unlockEvidence(id);
            });
        }
        
        return result;
    }
    
    // Player must manually create connections between evidence
    createConnection(fromId: string, toId: string, type: string, explanation: string): boolean {
        if (this.investigationPoints < 10) {
            return false;
        }
        
        const connection: EvidenceConnection = {
            id: `conn_${Date.now()}`,
            fromEvidenceId: fromId,
            toEvidenceId: toId,
            connectionType: type as any,
            playerMade: true,
            strength: this.calculateConnectionStrength(fromId, toId, type),
            description: explanation,
            requiredForSolution: this.isRequiredConnection(fromId, toId, type)
        };
        
        this.connectionsFound.set(connection.id, connection);
        this.investigationPoints -= 10;
        
        return connection.strength > 5; // Connection is valid if strength > 5
    }
    
    // Player builds theories about who did what and why
    buildTheory(suspect: string, motive: string, opportunity: string, method: string, evidence: string[]): Theory {
        const theory: Theory = {
            id: `theory_${Date.now()}`,
            suspect,
            motive,
            opportunity,
            method,
            evidence,
            contradictions: this.findContradictions(suspect, evidence),
            confidence: this.calculateTheoryConfidence(evidence),
            isCorrect: undefined // Will be revealed when case is solved
        };
        
        this.theoriesBuilt.push(theory);
        return theory;
    }
    
    // Use investigation tools to uncover hidden information
    useInvestigationTool(toolId: string, target: any): AnalysisResult | null {
        const tool = this.getAnalysisTool(toolId);
        if (!tool || tool.usesRemaining <= 0 || this.investigationPoints < tool.cost) {
            return null;
        }
        
        tool.usesRemaining--;
        this.investigationPoints -= tool.cost;
        this.timeRemaining -= 30;
        
        return this.executeToolAnalysis(tool, target);
    }
    
    // Final case solving - player must present their conclusion
    solveCase(accusation: Accusation, evidenceExplanations: Map<string, string>): CasePresentation {
        const presentation: CasePresentation = {
            finalAccusation: accusation,
            evidencePresentation: this.buildEvidencePresentation(accusation.evidence, evidenceExplanations),
            timeline: this.constructTimeline(),
            motiveExplanation: this.extractMotiveFromTheories(accusation.suspect),
            methodExplanation: this.extractMethodFromTheories(accusation.suspect),
            opportunityExplanation: this.extractOpportunityFromTheories(accusation.suspect),
            score: 0,
            judgement: 'insufficient_evidence'
        };
        
        // Score the solution
        presentation.score = this.calculateSolutionScore(presentation);
        presentation.judgement = this.determineJudgement(presentation);
        
        return presentation;
    }
    
    private performAnalysis(evidence: any, analysisType: string): AnalysisResult {
        // Different analysis types reveal different information
        switch (analysisType) {
            case 'metadata':
                return {
                    id: `analysis_${Date.now()}`,
                    toolId: 'metadata_analyzer',
                    input: evidence.id,
                    output: {
                        creationDate: evidence.metadata?.created,
                        lastModified: evidence.metadata?.modified,
                        author: evidence.metadata?.author,
                        digitalSignature: evidence.metadata?.signature,
                        hiddenProperties: evidence.metadata?.hidden
                    },
                    revealsEvidence: evidence.metadata?.revealsEvidence
                };
                
            case 'linguistic':
                return {
                    id: `analysis_${Date.now()}`,
                    toolId: 'linguistic_analyzer',
                    input: evidence.content,
                    output: {
                        writingStyle: this.analyzeWritingStyle(evidence.content),
                        emotionalTone: this.analyzeEmotion(evidence.content),
                        keywords: this.extractKeywords(evidence.content),
                        suspiciousPatterns: this.findSuspiciousPatterns(evidence.content)
                    }
                };
                
            case 'temporal':
                return {
                    id: `analysis_${Date.now()}`,
                    toolId: 'temporal_analyzer',
                    input: evidence.timestamp,
                    output: {
                        timeZone: this.extractTimeZone(evidence.timestamp),
                        workingHours: this.isWorkingHours(evidence.timestamp),
                        correlatedEvents: this.findCorrelatedEvents(evidence.timestamp),
                        anomalies: this.findTemporalAnomalies(evidence.timestamp)
                    }
                };
                
            default:
                return {
                    id: `analysis_${Date.now()}`,
                    toolId: 'basic_analyzer',
                    input: evidence.id,
                    output: { basicInfo: 'No additional information found' }
                };
        }
    }
    
    private calculateConnectionStrength(fromId: string, toId: string, type: string): number {
        // Complex algorithm to determine if connection makes sense
        const fromEvidence = this.getEvidence(fromId);
        const toEvidence = this.getEvidence(toId);
        
        let strength = 0;
        
        // Time proximity
        if (this.isTemporallyRelated(fromEvidence, toEvidence)) strength += 3;
        
        // Person involvement
        if (this.sharesPerson(fromEvidence, toEvidence)) strength += 4;
        
        // Content relevance
        if (this.hasContentRelevance(fromEvidence, toEvidence, type)) strength += 3;
        
        return Math.min(strength, 10);
    }
    
    private findContradictions(suspect: string, evidence: string[]): string[] {
        const contradictions: string[] = [];
        
        // Check each piece of evidence for contradictions
        evidence.forEach(evidenceId => {
            const ev = this.getEvidence(evidenceId);
            if (this.contradictsInvolvement(ev, suspect)) {
                contradictions.push(evidenceId);
            }
        });
        
        return contradictions;
    }
    
    private calculateTheoryConfidence(evidence: string[]): number {
        let confidence = 0;
        let maxConfidence = evidence.length * 10;
        
        evidence.forEach(evidenceId => {
            const ev = this.getEvidence(evidenceId);
            confidence += ev.strength || 5;
        });
        
        return Math.min((confidence / maxConfidence) * 100, 100);
    }
    
    private calculateSolutionScore(presentation: CasePresentation): number {
        let score = 0;
        
        // Points for correct connections (20% of total)
        const correctConnections = Array.from(this.connectionsFound.values())
            .filter(conn => conn.requiredForSolution && conn.strength > 7);
        score += correctConnections.length * 50;
        
        // Points for evidence analysis (30% of total)
        score += this.evidenceAnalyzed.size * 25;
        
        // Points for theory quality (25% of total)
        const bestTheory = this.theoriesBuilt
            .filter(t => t.suspect === presentation.finalAccusation.suspect)
            .sort((a, b) => b.confidence - a.confidence)[0];
        if (bestTheory) score += bestTheory.confidence * 2;
        
        // Points for timeline accuracy (15% of total)
        score += this.evaluateTimelineAccuracy(presentation.timeline) * 3;
        
        // Points for remaining time (10% of total)
        if (this.timeRemaining > 0) score += Math.floor(this.timeRemaining / 10);
        
        return Math.min(score, 1000);
    }
    
    private determineJudgement(presentation: CasePresentation): 'case_dismissed' | 'insufficient_evidence' | 'conviction' | 'perfect_case' {
        const score = presentation.score;
        const hasCorrectSuspect = this.isCorrectSuspect(presentation.finalAccusation.suspect);
        const hasStrongEvidence = presentation.evidencePresentation.filter(ep => ep.impact === 'critical' || ep.impact === 'strong').length >= 3;
        
        if (!hasCorrectSuspect) return 'case_dismissed';
        if (score < 400 || !hasStrongEvidence) return 'insufficient_evidence';
        if (score >= 800 && hasStrongEvidence) return 'perfect_case';
        return 'conviction';
    }
    
    // Helper methods (simplified for brevity)
    private getEvidence(id: string): any { return {}; }
    private getAnalysisTool(id: string): AnalysisTool | null { return null; }
    private unlockEvidence(id: string): void {}
    private isRequiredConnection(fromId: string, toId: string, type: string): boolean { return false; }
    private executeToolAnalysis(tool: AnalysisTool, target: any): AnalysisResult { return {} as any; }
    private buildEvidencePresentation(evidence: string[], explanations: Map<string, string>): EvidencePresentation[] { return []; }
    private constructTimeline(): TimelineEvent[] { return []; }
    private extractMotiveFromTheories(suspect: string): string { return ''; }
    private extractMethodFromTheories(suspect: string): string { return ''; }
    private extractOpportunityFromTheories(suspect: string): string { return ''; }
    private analyzeWritingStyle(content: string): any { return {}; }
    private analyzeEmotion(content: string): any { return {}; }
    private extractKeywords(content: string): string[] { return []; }
    private findSuspiciousPatterns(content: string): any[] { return []; }
    private extractTimeZone(timestamp: string): string { return ''; }
    private isWorkingHours(timestamp: string): boolean { return false; }
    private findCorrelatedEvents(timestamp: string): any[] { return []; }
    private findTemporalAnomalies(timestamp: string): any[] { return []; }
    private isTemporallyRelated(from: any, to: any): boolean { return false; }
    private sharesPerson(from: any, to: any): boolean { return false; }
    private hasContentRelevance(from: any, to: any, type: string): boolean { return false; }
    private contradictsInvolvement(evidence: any, suspect: string): boolean { return false; }
    private evaluateTimelineAccuracy(timeline: TimelineEvent[]): number { return 0; }
    private isCorrectSuspect(suspect: string): boolean { return false; }
}

// Example of complex investigation requirement
export const COMPLEX_CASE_EXAMPLE = {
    title: "The TechCorp Algorithm Theft",
    
    // What player must discover and prove:
    solutionRequirements: [
        {
            type: 'evidence_connection',
            description: 'Connect the algorithm theft to financial motive',
            requiredElements: ['email_financial_pressure', 'bank_records_unusual_deposit', 'algorithm_access_log'],
            pointsAwarded: 150
        },
        {
            type: 'timeline_construction', 
            description: 'Establish the sequence of events leading to the theft',
            requiredElements: ['initial_contact', 'algorithm_access', 'file_transfer', 'payment_received'],
            pointsAwarded: 200
        },
        {
            type: 'motive_identification',
            description: 'Prove why the suspect committed the crime',
            requiredElements: ['financial_documents', 'personal_circumstances', 'opportunity_analysis'],
            pointsAwarded: 100
        },
        {
            type: 'method_proof',
            description: 'Demonstrate how the theft was technically accomplished',
            requiredElements: ['system_logs', 'technical_analysis', 'digital_forensics'],
            pointsAwarded: 200
        }
    ],
    
    // Hidden information that requires active investigation
    hiddenEvidence: [
        {
            id: 'hidden_encrypted_chat',
            revealedBy: 'digital_forensics_tool',
            contains: 'Encrypted conversation with buyer about algorithm specifications'
        },
        {
            id: 'deleted_financial_records',
            revealedBy: 'financial_analysis_tool',
            contains: 'Offshore account with suspicious deposits matching timeline'
        },
        {
            id: 'metadata_manipulation',
            revealedBy: 'metadata_analysis_tool',
            contains: 'Evidence that file timestamps were altered to hide theft'
        }
    ],
    
    // Red herrings and false leads
    redHerrings: [
        {
            id: 'innocent_employee_emails',
            description: 'Suspicious-looking but innocent communications',
            misdirection: 'Makes another employee look guilty'
        },
        {
            id: 'coincidental_access',
            description: 'System access that looks suspicious but has legitimate reason',
            misdirection: 'Timing coincidence that confuses the timeline'
        }
    ],
    
    // Final case presentation requirements
    casePresentation: {
        mustIdentify: 'Dr. Sarah Kim as the algorithm thief',
        mustProve: [
            'Financial motive (gambling debts)',
            'Technical opportunity (algorithm access)',
            'Method (USB transfer during late night access)',
            'Communication with buyer (encrypted chat)'
        ],
        mustExplain: [
            'How the algorithm was extracted',
            'When the theft occurred',
            'Why Sarah was motivated to steal',
            'How the transfer to buyer happened'
        ],
        evidenceRequired: ['minimum 8 pieces of connected evidence'],
        timelineMustInclude: ['at least 6 key events in correct order']
    }
};
