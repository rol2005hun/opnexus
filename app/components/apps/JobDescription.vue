<template>
  <div class="app-job-description">
    <div class="job-description-header" v-if="currentMissionContent">
      <h2>💼 Case Assignment - {{ currentMissionContent.setting.organization }} Investigation</h2>
      <div class="job-description-meta">
        <span class="case-id">Case ID: {{ currentMissionContent.id.toUpperCase() }}</span>
        <span class="classification">Classification: TOP SECRET</span>
      </div>
    </div>

    <div class="job-description-content" v-if="currentMissionContent">
      <div class="investigation-brief">
        <h3>🎯 Mission Assignment</h3>
        <div class="mission-briefing" v-if="missionMetadata?.briefing"
          v-html="useMarkdown().formatMarkdown(missionMetadata.briefing)"></div>

        <p v-else>
          Agent, you have been assigned to investigate a suspected data breach at <strong>{{
            currentMissionContent.setting.organization }}</strong>.
        </p>

        <h4>📋 Incident Report</h4>
        <p>{{ currentMissionContent.setting.backgroundInfo }}</p>

        <div class="case-details">
          <p><strong>Location:</strong> {{ currentMissionContent.setting.location }}</p>
          <p><strong>Affected Department:</strong> {{ currentMissionContent.setting.department }}</p>
          <p><strong>Investigation Period:</strong> {{ currentMissionContent.setting.timeframe }}</p>
        </div>

        <h4>📜 Your Mission</h4>
        <div class="mission-objectives">
          <ol>
            <li v-for="objective in currentMissionContent.objectives" :key="objective.id">
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
const gameStore = useGameStore();

const currentMissionContent = ref<MissionContent | null>(null);
const missionMetadata = ref<any>(null);

const initializeJobDescription = async () => {
  try {
    currentMissionContent.value = await gameStore.getCurrentMissionContent();

    if (gameStore.currentMission) {
      const { missionMetadata: metadata } = await import(`@/missions/${gameStore.currentMission}/metadata.ts`);
      missionMetadata.value = metadata;
    }
  } catch (error) {
    console.error('JobDescription: Error loading mission content:', error);
  }
};

onMounted(() => {
  initializeJobDescription();
});

watch(() => gameStore.currentMission, () => {
  initializeJobDescription();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/JobDescription';
</style>
