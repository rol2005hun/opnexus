import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { getAllMissions, loadMissionContent, sortMissions, filterMissionsByClearance } from '@/utils/registerMission';
import { useMissionCompletion } from '@/composables/useMissionCompletion';
import type { MissionContent } from '#shared/types/content/mission';
import type { GameState, Mission, MissionProgress } from '#shared/types';

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        currentMission: null,
        isInLaptop: false,
        missions: [],
        missionContents: {},
        progress: {}
    }),

    actions: {
        async initializeMissions() {
            if (this.missions.length === 0) {
                try {
                    this.missions = await getAllMissions();
                } catch (error) {
                    console.error('Failed to initialize missions:', error);
                }
            }
        },

        async selectMission(missionId: string) {
            const mission = this.missions.find(s => s.id === missionId);
            if (!mission || !mission.available || mission.securityClearance > this.agent.clearanceLevel) {
                return;
            }

            this.currentMission = missionId;
            this.isInLaptop = true;

            if (!this.missionContents[missionId]) {
                const content = await loadMissionContent(missionId);
                if (content) {
                    this.missionContents[missionId] = content;
                }
            }

            if (!this.progress[missionId]) {
                this.progress[missionId] = {
                    emailsRead: [],
                    messagesRead: [],
                    evidenceFound: [],
                    filesExamined: [],
                    suspectsIdentified: [],
                    timelineBuilt: false,
                    primarySuspectConfirmed: false,
                    caseStatus: 'briefing',
                    investigationScore: 0,
                    hintsUsed: 0,
                    markedEvidence: []
                };
            }
        },

        exitLaptop() {
            this.isInLaptop = false;
        },

        markEmailRead(missionId: string, emailId: string) {
            if (!this.progress[missionId]) return;
            if (!this.progress[missionId].emailsRead.includes(emailId)) {
                this.progress[missionId].emailsRead.push(emailId);
                this.checkMissionCompletion(missionId);
            }
        },

        markMessageRead(missionId: string, chatId: string) {
            if (!this.progress[missionId]) return;
            if (!this.progress[missionId].messagesRead.includes(chatId)) {
                this.progress[missionId].messagesRead.push(chatId);
                this.checkMissionCompletion(missionId);
            }
        },

        toggleEvidence(missionId: string, itemId: string) {
            if (!this.progress[missionId]) return;

            const progress = this.progress[missionId];
            const isMarked = progress.markedEvidence.includes(itemId);

            if (isMarked) {
                progress.markedEvidence = progress.markedEvidence.filter(id => id !== itemId);
                if (progress.evidenceFound.includes(itemId)) {
                    progress.evidenceFound = progress.evidenceFound.filter(id => id !== itemId);
                }
            } else {
                progress.markedEvidence.push(itemId);

                const missionContent = this.missionContents[missionId];
                if (!missionContent) return;

                const isRealEvidence = this.isRealEvidence(missionContent, itemId);

                if (isRealEvidence && !progress.evidenceFound.includes(itemId)) {
                    progress.evidenceFound.push(itemId);
                    this.checkMissionCompletion(missionId);
                }
            }
        },

        isRealEvidence(mission: MissionContent, itemId: string): boolean {
            const email = mission.emails.find(e => e.id === itemId);
            if (email?.isEvidence) return true;

            const chat = mission.chatMessages.find(c => c.id === itemId);
            if (chat?.isEvidence) return true;

            const file = mission.files.find(f => f.id === itemId);
            if (file?.isEvidence) return true;

            return false;
        },

        async markSuspectConfirmed(missionId: string, suspectId: string) {
            if (!this.progress[missionId]) return;
            const progress = this.progress[missionId];

            const missionContent = this.missionContents[missionId];
            if (missionContent) {
                const totalEvidence = [
                    ...missionContent.emails.filter((e: any) => e.isEvidence),
                    ...missionContent.chatMessages.filter((c: any) => c.isEvidence),
                    ...missionContent.files.filter((f: any) => f.isEvidence)
                ].length;

                const foundEvidence = progress.evidenceFound.length;
                const baseScore = Math.round((foundEvidence / totalEvidence) * 100);

                progress.investigationScore = Math.max(0, baseScore - 10);
            }

            progress.primarySuspectConfirmed = true;
            progress.suspectsIdentified.push(suspectId);
            this.checkMissionCompletion(missionId);
        },

        markFileExamined(missionId: string, fileId: string) {
            if (!this.progress[missionId]) return;
            if (!this.progress[missionId].filesExamined.includes(fileId)) {
                this.progress[missionId].filesExamined.push(fileId);
                this.checkMissionCompletion(missionId);
            }
        },

        async checkMissionCompletion(missionId: string) {
            const missionContent = this.missionContents[missionId];
            if (!missionContent || !this.progress[missionId]) return;

            const progress = this.progress[missionId];

            const totalRealEvidence = [
                ...missionContent.emails.filter((e: any) => e.isEvidence),
                ...missionContent.chatMessages.filter((c: any) => c.isEvidence),
                ...missionContent.files.filter((f: any) => f.isEvidence)
            ].length;

            const hasAllEvidence = progress.evidenceFound.length === totalRealEvidence;
            const hasPrimarySuspect = progress.primarySuspectConfirmed;

            if (hasAllEvidence && hasPrimarySuspect) {
                progress.caseStatus = 'completed';
                const { showCompletionModal } = useMissionCompletion();
                showCompletionModal(missionId, progress.investigationScore);
            }
        },

        getCurrentMissionContent(): MissionContent | null {
            if (!this.currentMission) return null;
            return this.missionContents[this.currentMission] || null;
        }
    },

    getters: {
        currentProgress(): MissionProgress | null {
            if (!this.currentMission || !this.progress[this.currentMission]) {
                return null;
            }
            return this.progress[this.currentMission] || null;
        },

        currentMissionData(): Mission | null {
            if (!this.currentMission) return null;
            return this.missions.find(s => s.id === this.currentMission) || null;
        },

        currentMissionContent(): MissionContent | null {
            if (!this.currentMission) return null;
            return this.missionContents[this.currentMission] || null;
        },

        availableMissions(): Mission[] {
            const authStore = useAuthStore();

            const filtered = this.missions.filter(mission =>
                mission.available &&
                authStore.canAccessMission(mission)
            );

            return sortMissions(filtered, 'clearance');
        },

        getAvailableMissionsSorted: (state) => (sortBy: 'clearance' | 'difficulty' | 'alphabetical' = 'clearance') => {
            return sortMissions(state.missions, sortBy);
        },

        agent() {
            const authStore = useAuthStore();
            return authStore.userAgent || {
                badge: "GUEST",
                name: "Guest User",
                rank: "Visitor",
                department: "Public Access",
                clearanceLevel: 0,
                joinDate: new Date()
            };
        }
    }
});