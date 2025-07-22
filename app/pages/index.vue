<template>
    <div class="main-menu">
        <div class="background">
            <div class="overlay"></div>
        </div>

        <header class="header">
            <div class="logo">
                <div class="logo-title-container">
                    <span class="logo-operation">Operation:</span>
                    <span class="logo-nexus">NEXUS</span>
                </div>
                <p>Digital Investigation Agency</p>
            </div>
            <div class="user-info">
                <div v-if="authStore.isAuthenticated" class="agent-profile">
                    <div class="agent-details">
                        <span class="agent-name">{{ gameStore.agent.name }}</span>
                        <span class="agent-rank" :class="gameStore.agent.rank.toLowerCase().replace(' ', '-')">{{
                            gameStore.agent.rank }}</span>
                        <span class="agent-dept">{{ gameStore.agent.department }}</span>
                        <span class="clearance">Security Clearance: {{ gameStore.agent.clearanceLevel }}</span>
                    </div>
                </div>
                <div v-if="authStore.isAuthenticated" class="user-actions">
                    <button @click="goToSettings" class="agent-badge">{{ gameStore.agent.badge }}</button>
                    <button class="logout-btn" @click="handleLogout" title="Logout">
                        🚪 Logout
                    </button>
                </div>
                <button v-else class="login-btn" @click="navigateToLogin" title="Sign In">
                    🔐 Sign In
                </button>
            </div>
        </header>

        <main class="content">
            <div class="intro-section">
                <h2>Choose Your Mission</h2>
                <p>Every case is a new challenge. Use digital tools and your investigative instincts to solve them.</p>
            </div>

            <div class="stories-grid">
                <div v-for="story in gameStore.stories" :key="story.id" class="story-card" :class="{
                    completed: story.completed,
                    disabled: !story.available || !authStore.isAuthenticated,
                    'clearance-locked': authStore.isAuthenticated && story.securityClearance > gameStore.agent.clearanceLevel
                }" @click="authStore.isAuthenticated && canAccessStory(story) ? selectStory(story.id) : null">
                    <div class="story-thumbnail">
                        <div class="story-icon">{{ story.icon }}</div>
                        <div v-if="story.completed" class="completed-badge">✓</div>
                        <div v-if="!story.available" class="locked-badge">🔒</div>
                        <div v-if="!authStore.isAuthenticated && story.id !== 'the-internal-leak'"
                            class="auth-required-badge">🔐</div>
                        <div v-if="!authStore.isAuthenticated && story.id === 'the-internal-leak'"
                            class="preview-badge">👁️
                        </div>
                        <div v-else-if="authStore.isAuthenticated && story.securityClearance > gameStore.agent.clearanceLevel"
                            class="clearance-badge">
                            CL{{ story.securityClearance }}
                        </div>
                    </div>

                    <div class="story-info">
                        <h3>{{ story.title }}</h3>
                        <p class="story-description">
                            {{ getStoryDescription(story) }}
                        </p>

                        <div class="story-footer">
                            <div class="story-meta">
                                <span class="difficulty" :class="story.difficulty.toLowerCase().replace(' ', '-')">
                                    {{ story.difficulty }}
                                </span>
                                <span class="time">{{ story.estimatedTime }}</span>
                                <span class="clearance">CL{{ story.securityClearance }}</span>
                            </div>

                            <div v-if="authStore.isAuthenticated && story.available && canAccessStory(story)"
                                class="story-briefing">
                                <button class="briefing-btn" @click.stop="showBriefing(story)">📋 View Briefing</button>
                            </div>
                            <div v-else-if="!authStore.isAuthenticated && story.id === 'the-internal-leak'"
                                class="story-briefing">
                                <button class="preview-briefing-btn" @click.stop="showBriefing(story)">👁️ Preview
                                    Briefing</button>
                            </div>
                            <div v-else-if="!authStore.isAuthenticated" class="story-briefing">
                                <button class="auth-required-btn" @click.stop="navigateToLogin">🔐 Sign In
                                    Required</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stats">
                <div class="stat">
                    <span class="stat-value">{{ authStore.isAuthenticated ? completedStories : '0' }}</span>
                    <span class="stat-label">Completed Cases</span>
                </div>
                <div class="stat">
                    <span class="stat-value">{{ authStore.isAuthenticated ? gameStore.availableStories.length : '0'
                    }}</span>
                    <span class="stat-label">Available Cases</span>
                </div>
                <div class="stat">
                    <span class="stat-value">{{ gameStore.stories.length }}</span>
                    <span class="stat-label">Total Cases</span>
                </div>
            </div>
        </main>

        <transition name="laptop-boot">
            <LaptopScreen v-if="authStore.isAuthenticated && gameStore.isInLaptop" />
        </transition>

        <div v-if="showBriefingModal" class="briefing-modal" @click="closeBriefing">
            <div class="briefing-content" @click.stop>
                <div class="briefing-header">
                    <h2>🔒 CLASSIFIED BRIEFING</h2>
                    <button class="close-btn" @click="closeBriefing">✕</button>
                </div>

                <div v-if="selectedStory" class="briefing-body">
                    <div class="mission-title">
                        <h3>{{ selectedStory.title }}</h3>
                        <div class="clearance-info">
                            <span class="clearance-level">Security Clearance: {{ selectedStory.securityClearance
                                }}</span>
                            <span class="difficulty">{{ selectedStory.difficulty }}</span>
                        </div>
                    </div>

                    <div class="mission-briefing">
                        <h4>Mission Briefing:</h4>
                        <p>{{ selectedStory.briefing }}</p>
                    </div>

                    <div class="mission-objectives">
                        <h4>Primary Objectives:</h4>
                        <ul>
                            <li>Analyze all available digital evidence</li>
                            <li>Identify suspects and their connections</li>
                            <li>Build a comprehensive case timeline</li>
                            <li>Confirm primary suspect for arrest warrant</li>
                        </ul>
                    </div>

                    <div class="mission-tools">
                        <h4>Available Tools:</h4>
                        <div class="tools-list">
                            <span class="tool">📧 Email Analysis</span>
                            <span class="tool">💬 Communication Logs</span>
                            <span class="tool">📁 File Explorer</span>
                            <span class="tool">🔍 Evidence Locker</span>
                            <span class="tool">📝 Investigation Notes</span>
                        </div>
                    </div>

                    <div class="mission-warning">
                        <p>⚠️ This is a classified operation. Handle all evidence with appropriate security protocols.
                        </p>
                    </div>

                    <div class="briefing-actions">
                        <button class="cancel-btn" @click="closeBriefing">Cancel</button>
                        <button v-if="authStore.isAuthenticated" class="start-mission-btn" @click="startMission">🚀
                            Start Mission</button>
                        <button v-else class="login-mission-btn" @click="navigateToLogin">🔐 Sign In to Start
                            Mission</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { useAuthStore } from '@/stores/auth';

const gameStore = useGameStore();
const authStore = useAuthStore();
const showBriefingModal = ref(false);
const selectedStory = ref<Story | null>(null);

const selectStory = (storyId: string) => {
    gameStore.selectStory(storyId);
};

const canAccessStory = (story: Story): boolean => {
    if (!story.available) return false;
    if (story.securityClearance > gameStore.agent.clearanceLevel) return false;
    if (story.isPaid && !authStore.hasStoryAccess(story.id)) return false;
    return true;
};

const getStoryDescription = (story: Story): string => {
    if (!authStore.isAuthenticated) {
        if (story.id === 'the-internal-leak') {
            return 'Someone within our organization is leaking confidential documents to external parties. Investigate emails, messages, and file access logs to identify the mole.';
        }
        return 'Sign in to access this classified case.';
    }
    if (!story.available) {
        return 'Coming Soon - This case is not yet available.';
    }
    if (story.securityClearance > gameStore.agent.clearanceLevel) {
        return `Insufficient security clearance. Required: Level ${story.securityClearance}`;
    }
    if (story.isPaid && !authStore.hasStoryAccess(story.id)) {
        return `Premium case - $${story.price} to unlock`;
    }
    return story.description;
};

const showBriefing = (story: Story) => {
    selectedStory.value = story;
    showBriefingModal.value = true;
};

const closeBriefing = () => {
    showBriefingModal.value = false;
    selectedStory.value = null;
};

const handleLogout = async () => {
    authStore.logout();
    await navigateTo('/');
};

const navigateToLogin = () => {
    navigateTo('/auth');
};

const goToSettings = () => {
    navigateTo('/settings');
};

const startMission = () => {
    if (selectedStory.value) {
        selectStory(selectedStory.value.id);
        closeBriefing();
    }
};

const completedStories = computed(() => {
    return gameStore.stories.filter((story: Story) => story.completed).length;
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/pages/index';
</style>