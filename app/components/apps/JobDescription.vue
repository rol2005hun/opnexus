<template>
  <div class="app-job-description">
    <div class="job-description-header" v-if="currentStoryContent">
      <h2>💼 Case Assignment - {{ currentStoryContent.setting.organization }} Investigation</h2>
      <div class="job-description-meta">
        <span class="case-id">Case ID: {{ currentStoryContent.id.toUpperCase() }}</span>
        <span class="classification">Classification: TOP SECRET</span>
      </div>
    </div>

    <div class="job-description-content" v-if="currentStoryContent">
      <div class="investigation-brief">
        <h3>🎯 Mission Assignment</h3>
        <p>
          Agent, you have been assigned to investigate a suspected data breach at <strong>{{
            currentStoryContent.setting.organization }}</strong>.
        </p>

        <h4>📋 Incident Report</h4>
        <p>{{ currentStoryContent.setting.backgroundInfo }}</p>

        <div class="case-details">
          <p><strong>Location:</strong> {{ currentStoryContent.setting.location }}</p>
          <p><strong>Affected Department:</strong> {{ currentStoryContent.setting.department }}</p>
          <p><strong>Investigation Period:</strong> {{ currentStoryContent.setting.timeframe }}</p>
        </div>

        <h4>📜 Your Mission</h4>
        <div class="mission-objectives">
          <ol>
            <li v-for="objective in currentStoryContent.objectives" :key="objective.id">
              <strong>{{ objective.title }}:</strong> {{ objective.description }}
            </li>
          </ol>
        </div>

        <h4>🧾 Investigation Protocol</h4>
        <div class="protocol-box">
          <p>
            Examine all available digital evidence including email communications, internal messaging systems,
            and file access logs (DEMO: only email and chat). Mark suspicious evidence in the <strong>Evidence
              Locker</strong> application
            for analysis.
          </p>
          <p>
            <strong>Note:</strong> Look for patterns in communication timing, unusual file transfers,
            and financial motivations.
          </p>
        </div>

        <h4>⚠️ Security Notice</h4>
        <div class="warning-box">
          <p>
            This investigation involves classified defense technology. Maintain operational security at all times.
            The compromise of sensitive data poses a significant threat to national security.
          </p>
        </div>

        <h4>🕵️ Personnel Overview</h4>
        <div class="personnel-note">
          <p>
            You have access to communications and files (DEMO: only email and chat) from all employees in the affected
            department.
            Focus your investigation on identifying suspicious patterns and behaviors during the timeframe
            of the security breach.
          </p>
        </div>

        <div class="final-instructions">
          <h4>🎯 Final Instructions</h4>
          <p>
            Once you have gathered sufficient evidence, identify the perpetrator responsible for the data breach.
            Present your findings through the investigation interface when ready.
          </p>
          <p class="emphasis">
            <strong>Good luck, Agent. The security of classified technology depends on your investigation.</strong>
          </p>
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
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/JobDescription';
</style>
