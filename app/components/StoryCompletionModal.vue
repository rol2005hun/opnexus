<template>
    <div v-if="isCompletionModalVisible" class="completion-modal-overlay" @click="handleOverlayClick">
        <div class="completion-modal" @click.stop>
            <div class="completion-header">
                <div class="mission-complete-badge">
                    <div class="badge-content">
                        <span class="mission-text">MISSION</span>
                        <span class="complete-text">COMPLETE</span>
                    </div>
                </div>
                <h2 class="case-title">{{ completionData?.storyTitle }}</h2>
            </div>

            <div class="completion-content">
                <div class="score-section">
                    <div class="final-score">
                        <span class="score-label">Final Investigation Score</span>
                        <span class="score-value">{{ completionData?.score || 0 }}</span>
                    </div>

                    <div class="rank-achieved">
                        <span class="rank-label">Rank Achieved:</span>
                        <span class="rank-value" :style="{ color: completionData?.rank.color }">
                            {{ completionData?.rank.rank }}
                        </span>
                    </div>

                    <p class="rank-description">
                        {{ completionData?.rank.description }}
                    </p>
                </div>

                <div class="case-summary">
                    <h3>Case Summary</h3>
                    <p v-if="completionData?.storyId === 'the-internal-leak'">
                        You successfully identified Aaron Cole as the perpetrator of the Sentinel-X data breach.
                        Through careful analysis of network logs, chat communications, and financial records,
                        you uncovered his motivation and exposed the $75,000 payment from an unknown competitor.
                    </p>
                </div>

                <div class="support-section">
                    <div class="support-message">
                        <h3>🎉 Enjoyed the Investigation?</h3>
                        <p>
                            This is just the beginning! We're working on creating a full investigation agency
                            experience with multiple complex cases, advanced forensic tools, and immersive storylines.
                        </p>
                        <p>
                            <strong>Help us bring more cases to life!</strong> Your support will enable us to:
                        </p>
                        <ul>
                            <li>📱 Develop more intricate investigation scenarios</li>
                            <li>🔍 Add advanced digital forensics tools</li>
                            <li>🎭 Create deeper character development and storylines</li>
                            <li>🌐 Build multiplayer investigation teams</li>
                            <li>🏆 Implement achievements and career progression</li>
                        </ul>
                    </div>

                    <div class="donation-section">
                        <a href="https://revolut.me/rol2005hun" target="_blank" rel="noopener noreferrer"
                            class="donate-button">
                            ☕ Support Development
                        </a>
                        <p class="donation-note">
                            Any contribution helps us continue developing this project!
                        </p>
                    </div>
                </div>
            </div>

            <div class="completion-actions">
                <button class="btn-primary" @click="returnToMenu">
                    Return to Main Menu
                </button>
                <button class="btn-secondary" @click="restartCase">
                    Play Again
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStoryCompletion } from '@/composables/useStoryCompletion';

const { isCompletionModalVisible, completionData, hideCompletionModal } = useStoryCompletion();
const gameStore = useGameStore();

const handleOverlayClick = () => {
};

const returnToMenu = async () => {
    hideCompletionModal();
    gameStore.exitLaptop();
    await navigateTo('/');
};

const restartCase = () => {
    if (completionData.value?.storyId) {
        gameStore.progress[completionData.value.storyId] = {
            emailsRead: [],
            messagesRead: [],
            filesExamined: [],
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
    hideCompletionModal();
};
</script>

<style scoped lang="scss">
.completion-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(10px);
}

.completion-modal {
    background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
    border-radius: 20px;
    padding: 40px;
    max-width: 700px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow:
        0 20px 60px rgba(0, 122, 204, 0.3),
        0 0 100px rgba(0, 122, 204, 0.1);
    border: 2px solid rgba(0, 122, 204, 0.3);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #007acc, #00a8ff, #007acc);
        border-radius: 20px 20px 0 0;
    }
}

.completion-header {
    text-align: center;
    margin-bottom: 30px;

    .mission-complete-badge {
        margin-bottom: 20px;

        .badge-content {
            display: inline-block;
            background: linear-gradient(45deg, #007acc, #00a8ff);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 2px;
            box-shadow: 0 4px 15px rgba(0, 122, 204, 0.4);

            .mission-text,
            .complete-text {
                display: block;
                line-height: 1.2;
            }

            .complete-text {
                font-size: 16px;
                margin-top: 2px;
            }
        }
    }

    .case-title {
        color: #fff;
        font-size: 28px;
        font-weight: 300;
        margin: 0;
    }
}

.completion-content {
    color: #e0e0e0;
    line-height: 1.6;
}

.score-section {
    text-align: center;
    margin-bottom: 30px;
    padding: 25px;
    background: rgba(0, 122, 204, 0.1);
    border-radius: 15px;
    border: 1px solid rgba(0, 122, 204, 0.2);

    .final-score {
        margin-bottom: 20px;

        .score-label {
            display: block;
            color: #b0b0b0;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .score-value {
            display: block;
            color: #007acc;
            font-size: 48px;
            font-weight: bold;
            text-shadow: 0 0 20px rgba(0, 122, 204, 0.5);
        }
    }

    .rank-achieved {
        margin-bottom: 15px;

        .rank-label {
            color: #b0b0b0;
            font-size: 16px;
        }

        .rank-value {
            display: block;
            font-size: 24px;
            font-weight: bold;
            margin-top: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    }

    .rank-description {
        color: #c0c0c0;
        font-style: italic;
        margin: 0;
    }
}

.case-summary {
    margin-bottom: 30px;

    h3 {
        color: #007acc;
        margin-bottom: 15px;
        font-size: 20px;
    }

    p {
        margin: 0;
        color: #d0d0d0;
    }
}

.support-section {
    background: rgba(255, 215, 0, 0.05);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;

    .support-message {
        h3 {
            color: #FFD700;
            margin-bottom: 15px;
            font-size: 20px;
        }

        p {
            margin-bottom: 15px;
            color: #e0e0e0;
        }

        ul {
            color: #d0d0d0;
            padding-left: 20px;

            li {
                margin-bottom: 8px;
            }
        }
    }

    .donation-section {
        text-align: center;
        margin-top: 20px;

        .donate-button {
            display: inline-block;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #000;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
            }
        }

        .donation-note {
            color: #b0b0b0;
            font-size: 12px;
            margin: 0;
        }
    }
}

.completion-actions {
    display: flex;
    gap: 15px;
    justify-content: center;

    .btn-primary,
    .btn-secondary {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 150px;
    }

    .btn-primary {
        background: #007acc;
        color: white;

        &:hover {
            background: #005a99;
            transform: translateY(-1px);
        }
    }

    .btn-secondary {
        background: transparent;
        color: #007acc;
        border: 2px solid #007acc;

        &:hover {
            background: #007acc;
            color: white;
        }
    }
}

.completion-modal::-webkit-scrollbar {
    width: 8px;
}

.completion-modal::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.completion-modal::-webkit-scrollbar-thumb {
    background: rgba(0, 122, 204, 0.5);
    border-radius: 4px;
}

.completion-modal::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 122, 204, 0.7);
}
</style>
