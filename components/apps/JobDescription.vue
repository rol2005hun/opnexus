<template>
  <div class="app-job-description">
    <div class="job-description-header" v-if="currentStoryContent">
      <h2>💼 Job Description - {{ currentStoryContent.setting.organization }} Investigation</h2>
      <div class="job-description-meta">
        <span class="case-id">Case ID: {{ currentStoryContent.id.toUpperCase() }}</span>
        <span class="classification">Classification: Confidential</span>
      </div>
    </div>

    <div class="job-description-content" v-if="currentStoryContent">
      <div class="investigation-brief">
        <h3>🎯 Mission Briefing</h3>
        <p>
          Welcome to your investigation at NEXUS Digital Investigation Agency. You've been assigned to investigate
          a security breach at <strong>{{ currentStoryContent.setting.organization }}</strong>.
        </p>

        <h4>📋 Case Summary</h4>
        <p>{{ currentStoryContent.setting.backgroundInfo }}</p>
        <p>
          <strong>Location:</strong> {{ currentStoryContent.setting.location }}<br>
          <strong>Department:</strong> {{ currentStoryContent.setting.department }}<br>
          <strong>Timeframe:</strong> {{ currentStoryContent.setting.timeframe }}
        </p>

        <h4>🔍 Your Objectives</h4>
        <ul>
          <li v-for="objective in currentStoryContent.objectives" :key="objective.id">
            <strong>{{ objective.title }}:</strong> {{ objective.description }}
          </li>
        </ul>

        <h4>💡 Investigation Tips</h4>
        <div class="tips-grid">
          <div class="tip">
            <span class="tip-icon">📧</span>
            <div>
              <strong>Email Analysis</strong>
              <p>Check for unusual patterns, timing, and recipients in email communications</p>
            </div>
          </div>

          <div class="tip">
            <span class="tip-icon">💬</span>
            <div>
              <strong>Message Review</strong>
              <p>Analyze internal and external communications for suspicious activity</p>
            </div>
          </div>

          <div class="tip">
            <span class="tip-icon">📄</span>
            <div>
              <strong>File Investigation</strong>
              <p>Examine file access logs and unauthorized document transfers</p>
            </div>
          </div>

          <div class="tip">
            <span class="tip-icon">🔍</span>
            <div>
              <strong>Evidence Collection</strong>
              <p>Use the Evidence Locker to track and connect different pieces of information</p>
            </div>
          </div>
        </div>

        <h4>⚠️ Warning</h4>
        <div class="warning-box">
          <p>
            This investigation involves classified defense contracts. Handle all evidence with discretion.
            The breach compromises national security interests and requires immediate resolution.
          </p>
        </div>

        <h4>📝 Investigation Timeline</h4>
        <div v-for="event in currentStoryContent.timeline" :key="event.id" class="log-entry">
          <strong>{{ formatDate(event.timestamp) }} - {{ event.title }}:</strong><br>
          {{ event.description }}
          <div v-if="event.location" class="log-location">
            📍 Location: {{ event.location }}
          </div>
        </div>

        <div class="log-entry current-status">
          <strong>Current Status:</strong><br>
          You have access to employee email accounts, internal messaging systems, and file access logs.
          Begin your investigation by examining communication patterns and identifying suspicious activities.
          Focus on after-hours activities and unusual data transfers.
        </div>

        <h4>🕵️ Persons of Interest</h4>
        <div class="suspects-grid">
          <div v-for="suspect in currentStoryContent.suspects" :key="suspect.id" class="suspect-card">
            <div class="suspect-header">
              <span class="suspect-name">{{ suspect.name }}</span>
              <span class="suspicion-badge" :class="getSuspicionClass(suspect.suspicionLevel)">
                {{ suspect.suspicionLevel }}/10
              </span>
            </div>
            <div class="suspect-details">
              <div class="suspect-role">{{ suspect.role }}</div>
              <div class="suspect-motive">
                <strong>Motive:</strong> {{ suspect.motive }}
              </div>
              <div class="suspect-alibi">
                <strong>Alibi:</strong> {{ suspect.alibi }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useGameStore } from '@/stores/game';
import type { StoryContent } from '@/types/content';

const gameStore = useGameStore();

const currentStoryContent = ref<StoryContent | null>(null);

const initializeJobDescription = async () => {
  try {
    currentStoryContent.value = await gameStore.getCurrentStoryContent();
    if (!currentStoryContent.value) {
      console.log('JobDescription: No current story content available');
    }
  } catch (error) {
    console.error('JobDescription: Error loading story content:', error);
  }
};

onMounted(() => {
  initializeJobDescription();
});

watch(() => gameStore.currentStory, () => {
  initializeJobDescription();
});

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getSuspicionClass = (level: number) => {
  if (level >= 8) return 'high';
  if (level >= 5) return 'medium';
  return 'low';
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;
@use "sass:color";

.app-job-description {
  height: 100%;
  background: $window-bg;
  overflow-y: auto;
}

.job-description-header {
  background: $bg-secondary;
  padding: 1.5rem;
  border-bottom: 2px solid $accent-blue;

  h2 {
    margin: 0 0 1rem 0;
    color: $text-primary;
    font-size: 1.4rem;
  }

  .job-description-meta {
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: $text-muted;

    .case-id {
      font-weight: bold;
      color: $accent-orange;
    }

    .classification {
      color: $accent-red;
      font-weight: bold;
    }
  }
}

.job-description-content {
  padding: 2rem;
}

.investigation-brief {
  h3 {
    color: $accent-blue;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  h4 {
    color: $text-primary;
    margin: 2rem 0 1rem 0;
    font-size: 1.1rem;
    border-left: 4px solid $accent-blue;
    padding-left: 1rem;
  }

  p {
    line-height: 1.6;
    color: $text-secondary;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: $text-secondary;

      &::before {
        content: "▶";
        position: absolute;
        left: 0;
        color: $accent-blue;
      }
    }
  }

  strong {
    color: $accent-orange;
  }
}

.tips-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  .tip {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: $bg-secondary;
    border-radius: 8px;
    border-left: 4px solid $accent-green;

    .tip-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    strong {
      color: $text-primary;
      display: block;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: $text-muted;
    }
  }
}

.warning-box {
  background: color.adjust($accent-red, $alpha: -0.9);
  border: 1px solid $accent-red;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;

  p {
    margin: 0;
    color: $text-primary;
    font-weight: 500;
  }
}

.log-entry {
  background: $bg-secondary;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 3px solid $accent-orange;

  strong {
    color: $accent-orange;
  }

  .log-location {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: $text-muted;
  }

  &.current-status {
    border-left-color: $accent-blue;
    background: color.adjust($accent-blue, $alpha: -0.9);
  }
}

.suspects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1rem 0;

  .suspect-card {
    background: $bg-secondary;
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid #444;
    transition: all 0.2s ease;

    &:hover {
      border-color: $accent-blue;
      background: color.adjust($bg-secondary, $lightness: 2%);
    }

    .suspect-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .suspect-name {
        font-weight: 600;
        color: $text-primary;
        font-size: 1rem;
      }

      .suspicion-badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;

        &.high {
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
        }

        &.medium {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }

        &.low {
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
        }
      }
    }

    .suspect-details {
      .suspect-role {
        color: $text-secondary;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      .suspect-motive,
      .suspect-alibi {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: $text-secondary;

        strong {
          color: $text-primary;
        }
      }
    }
  }
}
</style>
