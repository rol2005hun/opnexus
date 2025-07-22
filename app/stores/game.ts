import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { getAllStories } from '@/utils/registerStory';
import type { Story, StoryProgress, GameState } from '#shared/types';

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        currentStory: null,
        isInLaptop: false,
        stories: [],
        progress: {}
    }),

    actions: {
        async initializeStories() {
            if (this.stories.length === 0) {
                try {
                    this.stories = await getAllStories();
                } catch (error) {
                    console.error('Failed to initialize stories:', error);
                }
            }
        },

        selectStory(storyId: string) {
            const story = this.stories.find(s => s.id === storyId);
            if (!story || !story.available || story.securityClearance > this.agent.clearanceLevel) {
                return;
            }

            this.currentStory = storyId;
            this.isInLaptop = true;

            if (!this.progress[storyId]) {
                this.progress[storyId] = {
                    emailsRead: [],
                    messagesRead: [],
                    evidenceFound: [],
                    filesExamined: [],
                    suspectsIdentified: [],
                    connectionsDiscovered: [],
                    timelineBuilt: false,
                    primarySuspectConfirmed: false,
                    caseStatus: 'briefing',
                    investigationScore: 0,
                    hintsUsed: 0
                };
            }
        },

        exitLaptop() {
            this.isInLaptop = false;
        },

        markEmailRead(storyId: string, emailId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].emailsRead.includes(emailId)) {
                this.progress[storyId].emailsRead.push(emailId);
                this.progress[storyId].investigationScore += 10;
                this.checkStoryCompletion(storyId);
            }
        },

        markMessageRead(storyId: string, chatId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].messagesRead.includes(chatId)) {
                this.progress[storyId].messagesRead.push(chatId);
                this.progress[storyId].investigationScore += 15;
                this.checkStoryCompletion(storyId);
            }
        },

        addEvidence(storyId: string, evidenceId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].evidenceFound.includes(evidenceId)) {
                this.progress[storyId].evidenceFound.push(evidenceId);
                this.progress[storyId].investigationScore += 25;
                this.checkStoryCompletion(storyId);
            }
        },

        markSuspectConfirmed(storyId: string, suspectId: string) {
            if (!this.progress[storyId]) return;
            this.progress[storyId].primarySuspectConfirmed = true;
            this.progress[storyId].suspectsIdentified.push(suspectId);
            this.progress[storyId].investigationScore += 50;
            this.checkStoryCompletion(storyId);
        },

        markFileExamined(storyId: string, fileId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].filesExamined.includes(fileId)) {
                this.progress[storyId].filesExamined.push(fileId);
                this.progress[storyId].investigationScore += 20;
                this.checkStoryCompletion(storyId);
            }
        },

        async checkStoryCompletion(storyId: string) {
            const story = await this.getCurrentStoryContent();
            if (!story || !this.progress[storyId]) return;

            const progress = this.progress[storyId];
            const objectives = story.objectives || [];

            // Check if all objectives are completed
            const allObjectivesCompleted = objectives.every(objective => {
                const hasRequiredEvidence = objective.requiredEvidence?.every(evidenceId => 
                    progress.evidenceFound.includes(evidenceId)
                ) ?? true;
                return hasRequiredEvidence;
            });

            // Check minimum completion criteria
            const hasMinimumEvidence = progress.evidenceFound.length >= 5;
            const hasPrimarySuspect = progress.primarySuspectConfirmed;
            const hasMinimumScore = progress.investigationScore >= 200;

            if (allObjectivesCompleted && hasMinimumEvidence && hasPrimarySuspect && hasMinimumScore) {
                progress.caseStatus = 'completed';
                // Trigger completion modal
                const { showCompletionModal } = await import('@/composables/useStoryCompletion');
                showCompletionModal(storyId, progress.investigationScore);
            }
        },

        async getCurrentStoryContent() {
            if (!this.currentStory) return null;

            const registerStory = (await import('@/utils/registerStory')).default;
            const story = await registerStory(this.currentStory);
            return story?.content || null;
        }
    },

    getters: {
        currentProgress(): StoryProgress | null {
            if (!this.currentStory || !this.progress[this.currentStory]) {
                return null;
            }
            return this.progress[this.currentStory] || null;
        },

        currentStoryData(): Story | null {
            if (!this.currentStory) return null;
            return this.stories.find(s => s.id === this.currentStory) || null;
        },

        availableStories(): Story[] {
            const authStore = useAuthStore();
            const userClearance = authStore.userAgent?.clearanceLevel || 1;
            return this.stories.filter(story =>
                story.available &&
                story.securityClearance <= userClearance &&
                (!story.isPaid || authStore.hasStoryAccess(story.id))
            );
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