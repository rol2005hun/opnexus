import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { getAllStoryMetadata } from '@/utils/storyRegistry';
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
                    this.stories = await getAllStoryMetadata();
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
            }
        },

        markMessageRead(storyId: string, chatId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].messagesRead.includes(chatId)) {
                this.progress[storyId].messagesRead.push(chatId);
                this.progress[storyId].investigationScore += 15;
            }
        },

        addEvidence(storyId: string, evidenceId: string) {
            if (!this.progress[storyId]) return;
            if (!this.progress[storyId].evidenceFound.includes(evidenceId)) {
                this.progress[storyId].evidenceFound.push(evidenceId);
                this.progress[storyId].investigationScore += 25;
            }
        },

        async getCurrentStoryContent() {
            if (!this.currentStory) return null;

            const { getStoryContent } = await import('@/utils/storyRegistry');
            return await getStoryContent(this.currentStory);
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