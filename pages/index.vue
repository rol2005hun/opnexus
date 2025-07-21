<template>
    <div class="main-menu">
        <div class="background">
            <div class="overlay"></div>
        </div>

        <header class="header">
            <div class="logo">
                <h1>NEXUS</h1>
                <p>Digital Investigation Agency</p>
            </div>
            <div class="user-info">
                <div v-if="authStore.isAuthenticated" class="agent-profile">
                    <div class="agent-details">
                        <span class="agent-name">{{ gameStore.agent.name }}</span>
                        <span class="agent-rank">{{ gameStore.agent.rank }}</span>
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
                        <div v-if="!authStore.isAuthenticated && story.id !== 'internal-leak'"
                            class="auth-required-badge">🔐</div>
                        <div v-if="!authStore.isAuthenticated && story.id === 'internal-leak'" class="preview-badge">👁️
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
                            <div v-else-if="!authStore.isAuthenticated && story.id === 'internal-leak'"
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
import type { Story } from '@/stores/game';
import LaptopScreen from '@/components/LaptopScreen.vue';

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
        if (story.id === 'internal-leak') {
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
    return gameStore.stories.filter(story => story.completed).length;
});
</script>

<style lang="scss" scoped>
@use "sass:color";

.main-menu {
    min-height: 100vh;
    position: relative;
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(circle at 20% 80%, rgba(0, 122, 204, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 170, 68, 0.1) 0%, transparent 50%);
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    }
}

.header {
    position: relative;
    z-index: 10;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: $accent-blue;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 20px rgba(0, 122, 204, 0.5);
        }

        p {
            color: $text-secondary;
            font-size: 1rem;
        }
    }

    .user-info {
        display: flex;
        gap: 1rem;

        .agent-profile {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .agent-details {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .agent-name {
                    color: $text-primary;
                    font-weight: 600;
                    font-size: 1rem;
                }

                .agent-rank {
                    color: $accent-blue;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .agent-dept {
                    color: $text-secondary;
                    font-size: 0.8rem;
                }

                .clearance {
                    color: $text-accent;
                    font-family: $font-mono;
                    font-size: 0.8rem;
                    margin-top: 0.2rem;
                }
            }
        }

        .user-actions {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;

            .agent-badge {
                background: $accent-blue;
                color: white;
                padding: 0.5rem 0.5rem;
                border: 1px solid $accent-blue;
                border-radius: 4px;
                font-family: $font-mono;
                font-weight: 600;
                font-size: 0.9rem;
                min-width: 90px;
                line-height: 1;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background: rgba(0, 122, 204, 0.8);
                    border-color: #0ea5e9;
                    transform: translateY(-1px);
                }
            }
        }

        .logout-btn {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
            padding: 0.5rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            min-width: 90px;
            font-weight: 600;
            line-height: 1;
            transition: all 0.3s ease;
            text-align: center;
            text-indent: -5px;

            &:hover {
                background: rgba(239, 68, 68, 0.3);
                border-color: #ef4444;
                transform: translateY(-1px);
            }
        }

        .login-btn {
            background: $accent-blue;
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);

            &:hover {
                background: color.adjust($accent-blue, $lightness: 10%);
                box-shadow: 0 4px 12px rgba(0, 122, 204, 0.4);
                transform: translateY(-1px);
            }

            &:active {
                transform: translateY(0);
                box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);
            }
        }
    }
}

.content {
    position: relative;
    z-index: 10;
    padding: 0 2rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.intro-section {
    text-align: center;
    margin-bottom: 3rem;

    h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: $text-primary;
    }

    p {
        font-size: 1.2rem;
        color: $text-secondary;
        max-width: 600px;
        margin: 0 auto;
    }
}

.stories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.story-card {
    background: $bg-secondary;
    border: 1px solid $border-color;
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transition: left 0.5s ease;
    }

    &:hover {
        border-color: $accent-blue;
        box-shadow: 0 8px 32px rgba(0, 122, 204, 0.2);
        transform: translateY(-4px);

        &::before {
            left: 100%;
        }
    }

    &.completed {
        border-color: $accent-green;

        &:hover {
            border-color: $accent-green;
            box-shadow: 0 8px 32px rgba(0, 170, 68, 0.2);
        }
    }

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: color.adjust($bg-secondary, $lightness: -5%);

        &:hover {
            border-color: $border-color;
            box-shadow: none;
            transform: none;

            &::before {
                left: -100%;
            }
        }
    }

    .story-thumbnail {
        position: relative;
        text-align: center;
        margin-bottom: 1rem;

        .story-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .completed-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: $accent-green;
            color: white;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }

        .locked-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: $accent-orange;
            color: white;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }

        .auth-required-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: $accent-blue;
            color: white;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }

        .preview-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: $accent-green;
            color: white;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }
    }

    .story-info {
        display: flex;
        flex-direction: column;
        flex: 1;

        h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: $text-primary;
        }

        .story-description {
            color: $text-secondary;
            margin-bottom: 0.5rem;
            line-height: 1.5;
            flex: 1;
            min-height: 0;
        }

        .story-footer {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            flex-shrink: 0;

            .story-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .difficulty {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;

                    &.rookie {
                        background: rgba(0, 170, 68, 0.2);
                        color: $accent-green;
                    }

                    &.agent {
                        background: rgba(255, 136, 0, 0.2);
                        color: $accent-orange;
                    }

                    &.senior-agent {
                        background: rgba(204, 68, 68, 0.2);
                        color: $accent-red;
                    }

                    &.special-agent {
                        background: rgba(148, 0, 211, 0.2);
                        color: $accent-purple;
                    }
                }

                .time {
                    color: $text-muted;
                    font-family: $font-mono;
                    font-size: 0.9rem;
                }

                .clearance {
                    background: rgba(0, 122, 204, 0.2);
                    color: $accent-blue;
                    padding: 0.2rem 0.5rem;
                    border-radius: 12px;
                    font-family: $font-mono;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
            }

            .story-briefing {
                .briefing-btn {
                    width: 100%;
                    background: $accent-blue;
                    color: white;
                    border: none;
                    padding: 0.75rem 1rem;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);

                    &:hover {
                        background: color.adjust($accent-blue, $lightness: 10%);
                        box-shadow: 0 4px 12px rgba(0, 122, 204, 0.4);
                        transform: translateY(-1px);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);
                    }
                }

                .auth-required-btn {
                    width: 100%;
                    background: rgba(0, 122, 204, 0.3);
                    color: $accent-blue;
                    border: 1px solid $accent-blue;
                    padding: 0.75rem 1rem;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(0, 122, 204, 0.5);
                        color: white;
                        transform: translateY(-1px);
                    }

                    &:active {
                        transform: translateY(0);
                    }
                }

                .preview-briefing-btn {
                    width: 100%;
                    background: rgba(0, 170, 68, 0.3);
                    color: $accent-green;
                    border: 1px solid $accent-green;
                    padding: 0.75rem 1rem;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(0, 170, 68, 0.5);
                        color: white;
                        transform: translateY(-1px);
                    }

                    &:active {
                        transform: translateY(0);
                    }
                }
            }
        }
    }

    &.clearance-locked {
        background: color.adjust($bg-secondary, $lightness: -8%);
        border-color: $accent-red;

        .clearance-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: $accent-red;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }
    }
}

.briefing-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);

    .briefing-content {
        background: $bg-primary;
        border: 2px solid $accent-blue;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 122, 204, 0.3);

        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }

        .briefing-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid $border-color;
            background: linear-gradient(90deg, $accent-blue, color.adjust($accent-blue, $lightness: 20%));

            h2 {
                color: white;
                margin: 0;
                font-size: 1.5rem;
                font-weight: 700;
            }

            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: background 0.3s ease;

                &:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            }
        }

        .briefing-body {
            padding: 2rem;

            .mission-title {
                margin-bottom: 2rem;

                h3 {
                    color: $text-primary;
                    font-size: 1.8rem;
                    margin-bottom: 1rem;
                }

                .clearance-info {
                    display: flex;
                    gap: 1rem;

                    .clearance-level,
                    .difficulty {
                        background: $bg-secondary;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        border: 1px solid $border-color;
                        font-size: 0.9rem;
                        font-weight: 600;
                    }

                    .clearance-level {
                        color: $accent-blue;
                    }

                    .difficulty {
                        color: $accent-orange;
                    }
                }
            }

            .mission-briefing,
            .mission-objectives,
            .mission-tools {
                margin-bottom: 2rem;

                h4 {
                    color: $text-primary;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }

                p {
                    color: $text-secondary;
                    line-height: 1.6;
                }

                ul {
                    color: $text-secondary;
                    padding-left: 1.5rem;

                    li {
                        margin-bottom: 0.5rem;
                        line-height: 1.6;
                    }
                }
            }

            .mission-tools {
                .tools-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;

                    .tool {
                        background: $bg-secondary;
                        border: 1px solid $border-color;
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        color: $text-primary;
                    }
                }
            }

            .mission-warning {
                background: rgba(255, 136, 0, 0.1);
                border: 1px solid $accent-orange;
                border-radius: 6px;
                padding: 1rem;
                margin-bottom: 2rem;

                p {
                    color: $accent-orange;
                    margin: 0;
                    font-weight: 600;
                }
            }

            .briefing-actions {
                display: flex;
                gap: 1rem;
                justify-content: space-between;

                .cancel-btn {
                    background: $bg-secondary;
                    border: 1px solid $border-color;
                    color: $text-primary;
                    padding: 0.75rem 2rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.3s ease;

                    &:hover {
                        background: color.adjust($bg-secondary, $lightness: 10%);
                        border-color: color.adjust($border-color, $lightness: 20%);
                    }
                }

                .start-mission-btn {
                    background: $accent-blue;
                    border: none;
                    color: white;
                    padding: 0.75rem 2rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);

                    &:hover {
                        background: color.adjust($accent-blue, $lightness: 10%);
                        box-shadow: 0 4px 12px rgba(0, 122, 204, 0.4);
                        transform: translateY(-1px);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(0, 122, 204, 0.3);
                    }
                }

                .login-mission-btn {
                    background: $accent-green;
                    border: none;
                    color: white;
                    padding: 0.75rem 2rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 170, 68, 0.3);

                    &:hover {
                        background: color.adjust($accent-green, $lightness: 10%);
                        box-shadow: 0 4px 12px rgba(0, 170, 68, 0.4);
                        transform: translateY(-1px);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 2px 8px rgba(0, 170, 68, 0.3);
                    }
                }
            }
        }
    }
}

.stats {
    display: flex;
    justify-content: center;
    gap: 3rem;

    .stat {
        text-align: center;

        .stat-value {
            display: block;
            font-size: 2.5rem;
            font-weight: 700;
            color: $accent-blue;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            color: $text-secondary;
            font-size: 1rem;
        }
    }
}

.laptop-boot-enter-active,
.laptop-boot-leave-active {
    transition: all 0.8s ease;
}

.laptop-boot-enter-from {
    opacity: 0;
    transform: scale(0.9);
}

.laptop-boot-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;

        .user-info {
            justify-content: center;
        }
    }

    .stories-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .story-card {
        padding: 1rem;

        .story-info .story-meta {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
        }
    }

    .stats {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .briefing-content {
        margin: 1rem;
        max-height: 90vh;
    }
}
</style>