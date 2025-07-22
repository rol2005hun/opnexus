import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { getAllStories } from '@/utils/registerStory';

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

        markEmailRead(storyId: string, emailId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].emailsRead.includes(emailId)) {
                this.progress[storyId].emailsRead.push(emailId);
                this.checkStoryCompletion(storyId);
            }
        },

        markMessageRead(storyId: string, chatId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].messagesRead.includes(chatId)) {
                this.progress[storyId].messagesRead.push(chatId);
                this.checkStoryCompletion(storyId);
            }
        },

        toggleEvidence(storyId: string, itemId: string) {
            if (!this.progress[storyId]) return;
            
            const progress = this.progress[storyId];
            const isMarked = progress.markedEvidence.includes(itemId);
            
            if (isMarked) {
                progress.markedEvidence = progress.markedEvidence.filter(id => id !== itemId);
                if (progress.evidenceFound.includes(itemId)) {
                    progress.evidenceFound = progress.evidenceFound.filter(id => id !== itemId);
                }
            } else {
                progress.markedEvidence.push(itemId);
                
                const story = this.stories.find(s => s.id === storyId)?.content;
                if (!story) return;
                
                const isRealEvidence = this.isRealEvidence(story, itemId);
                
                if (isRealEvidence && !progress.evidenceFound.includes(itemId)) {
                    progress.evidenceFound.push(itemId);
                    this.checkStoryCompletion(storyId);
                }
            }
        },

        isRealEvidence(story: StoryContent, itemId: string): boolean {
            const email = story.emails.find(e => e.id === itemId);
            if (email?.isEvidence) return true;

            const chat = story.chatMessages.find(c => c.id === itemId);
            if (chat?.isEvidence) return true;

            const file = story.files.find(f => f.id === itemId);
            if (file?.isEvidence) return true;

            return false;
        },

        async markSuspectConfirmed(storyId: string, suspectId: string) {
            if (!this.progress[storyId]) return;
            const progress = this.progress[storyId];
            
            const story = await this.getCurrentStoryContent();
            if (story) {
                const totalEvidence = [
                    ...story.emails.filter(e => e.isEvidence),
                    ...story.chatMessages.filter(c => c.isEvidence),
                    ...story.files.filter(f => f.isEvidence)
                ].length;
                
                const foundEvidence = progress.evidenceFound.length;
                const baseScore = Math.round((foundEvidence / totalEvidence) * 100);
                
                progress.investigationScore = Math.max(0, baseScore - 10);
            }
            
            progress.primarySuspectConfirmed = true;
            progress.suspectsIdentified.push(suspectId);
            this.checkStoryCompletion(storyId);
        },

        markFileExamined(storyId: string, fileId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].filesExamined.includes(fileId)) {
                this.progress[storyId].filesExamined.push(fileId);
                this.checkStoryCompletion(storyId);
            }
        },

        async checkStoryCompletion(storyId: string) {
            const story = await this.getCurrentStoryContent();
            if (!story || !this.progress[storyId]) return;

            const progress = this.progress[storyId];
            const objectives = story.objectives || [];

            const allObjectivesCompleted = objectives.every(objective => {
                const hasRequiredEvidence = objective.requiredEvidence?.every(evidenceId =>
                    progress.evidenceFound.includes(evidenceId)
                ) ?? true;
                return hasRequiredEvidence;
            });

            const totalRealEvidence = [
                ...story.emails.filter(e => e.isEvidence),
                ...story.chatMessages.filter(c => c.isEvidence),
                ...story.files.filter(f => f.isEvidence)
            ].length;

            const hasAllEvidence = progress.evidenceFound.length === totalRealEvidence;
            const hasPrimarySuspect = progress.primarySuspectConfirmed;

            if (allObjectivesCompleted && hasAllEvidence && hasPrimarySuspect) {
                progress.caseStatus = 'completed';
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