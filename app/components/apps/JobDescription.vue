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
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

const currentStoryContent = ref<StoryContent | null>(null);

const initializeJobDescription = async () => {
  try {
    currentStoryContent.value = await gameStore.getCurrentStoryContent();
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
    year: 'numeric',
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
@use '@/assets/scss/components/apps/JobDescription';
</style>
