<template>
  <div class="app-evidence-locker">
    <div class="complete-investigation" v-if="canIdentifySuspects">
      <button class="complete-btn" @click="openSuspectSelection">
        🎯 Identify Suspects
      </button>
    </div>
    <div class="evidence-locker-container">
      <div class="evidence-locker-header">
        <h2>🔍 Evidence Locker</h2>
        <div class="case-info" v-if="gameStore.currentMissionData">
          <span class="case-name">{{ gameStore.currentMissionData.title }}</span>
          <span class="case-status" :class="statusClass">{{ statusText }}</span>
        </div>
      </div>
    </div>
    <div class="evidence-content">

      <div v-if="isPremiumUser" class="progress-section">
        <h3>🔍 Investigation Status</h3>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${investigationProgress}%` }" :class="progressClass"></div>
        </div>
        <div class="progress-status">
          <span class="status-text">{{ progressStatusText }}</span>
        </div>
      </div>

      <div class="evidence-section">
        <h3>📄 Collected Evidence</h3>
        <div class="evidence-list">
          <div v-if="evidenceItems.length === 0" class="no-evidence">
            <p>You haven't collected any evidence yet.</p>
            <p>Read the emails and messages!</p>
          </div>

          <div v-for="evidence in evidenceItems" :key="evidence.id" class="evidence-item"
            :class="{ important: evidence.important }">
            <div class="evidence-icon">{{ evidence.icon }}</div>
            <div class="evidence-details">
              <h4>{{ evidence.title }}</h4>
              <p>{{ evidence.description }}</p>
              <div class="evidence-meta">
                <span class="evidence-type">{{ evidence.type }}</span>
                <span class="evidence-time">{{ formatTime(evidence.discoveredAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="report-section" v-if="gameStore.currentProgress?.suspectsIdentified?.length">
        <h3>📝 Investigation Report</h3>
        <div class="report-content">
          <div class="case-conclusion">
            <h4>✅ Case Status</h4>
            <p>Investigation complete. The perpetrator has been identified.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="suspect-selection-modal" v-if="showSuspectModal" @click="closeSuspectModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>🎯 Suspect Identification</h3>
          <button class="close-btn" @click="closeSuspectModal">✕</button>
        </div>

        <div class="modal-description">
          <p>Based on your investigation and the evidence collected, who do you believe is responsible for the data
            breach?</p>
        </div>

        <div class="suspects-grid">
          <div v-for="suspect in availableSuspects" :key="suspect.id" class="suspect-card"
            :class="{ 'selected': selectedSuspect === suspect.id }" @click="selectSuspect(suspect.id)">
            <div class="suspect-avatar">👤</div>
            <div class="suspect-info">
              <h4>{{ suspect.name }}</h4>
              <p class="suspect-role">{{ suspect.role }}</p>
            </div>
            <div v-if="selectedSuspect === suspect.id" class="selected-indicator">✓</div>
          </div>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" @click="closeSuspectModal">
            Cancel
          </button>
          <button class="confirm-btn" :disabled="!selectedSuspect" @click="confirmSuspect">
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const gameStore = useGameStore();
const authStore = useAuthStore();
const { updateScore } = useScoring();

const isPremiumUser = computed(() => {
  const user = authStore.currentUser;
  return user?.subscription?.type === 'premium';
});

interface EvidenceItem {
  id: string
  title: string
  description: string
  type: string
  icon: string
  important: boolean
  discoveredAt: Date
}

const investigationProgress = computed(() => {
  const progress = gameStore.currentProgress;
  const missionContent = gameStore.currentMissionData?.content;
  if (!progress || !missionContent) return 0;

  const totalRealEvidence = [
    ...missionContent.emails.filter(e => e.isEvidence),
    ...missionContent.chatMessages.filter(c => c.isEvidence),
    ...missionContent.files.filter(f => f.isEvidence)
  ].length;

  if (totalRealEvidence === 0) return 0;

  return Math.min(Math.floor((progress.evidenceFound.length / totalRealEvidence) * 100), 100);
});

const progressClass = computed(() => {
  const progress = investigationProgress.value;
  if (progress >= 80) return 'progress-high';
  if (progress >= 40) return 'progress-medium';
  return 'progress-low';
});

const progressStatusText = computed(() => {
  const progress = investigationProgress.value;
  if (progress >= 80) return 'Investigation Nearly Complete';
  if (progress >= 60) return 'Significant Progress Made';
  if (progress >= 40) return 'Investigation Ongoing';
  if (progress >= 20) return 'Early Investigation Phase';
  return 'Investigation Started';
});

const canIdentifySuspects = computed(() => {
  const progress = gameStore.currentProgress;
  const missionContent = gameStore.currentMissionData?.content;
  if (!progress || !missionContent) return false;

  const realEvidenceIds = [
    ...missionContent.emails.filter(e => e.isEvidence).map(e => e.id),
    ...missionContent.chatMessages.filter(c => c.isEvidence).map(c => c.id),
    ...missionContent.files.filter(f => f.isEvidence).map(f => f.id)
  ];

  const marked = progress.markedEvidence;
  const allMatch =
    marked.length === realEvidenceIds.length &&
    marked.every(id => realEvidenceIds.includes(id)) &&
    realEvidenceIds.every(id => marked.includes(id));

  return allMatch && progress.caseStatus !== 'completed';
});

const showSuspectModal = ref(false);
const selectedSuspect = ref<string | null>(null);

const availableSuspects = computed(() => {
  const missionContent = gameStore.currentMissionData?.content;
  if (!missionContent?.characters) return [];
  return missionContent.characters.map(character => ({
    id: character.id,
    name: character.name,
    role: character.role
  }));
});

const openSuspectSelection = () => {
  showSuspectModal.value = true;
  selectedSuspect.value = null;
};

const closeSuspectModal = () => {
  showSuspectModal.value = false;
  selectedSuspect.value = null;
};

const selectSuspect = (suspectId: string) => {
  selectedSuspect.value = suspectId;
};

const confirmSuspect = async () => {
  if (!selectedSuspect.value || !gameStore.currentMission) return;

  const missionContent = gameStore.currentMissionData?.content;
  const trueSuspect = missionContent?.suspects?.find(s => s.evidenceAgainst && s.evidenceAgainst.length > 0);

  if (trueSuspect && selectedSuspect.value === trueSuspect.id) {
    gameStore.markSuspectConfirmed(gameStore.currentMission, selectedSuspect.value);
    showSuspectModal.value = false;

    try {
      const result = await updateScore(gameStore.currentMission, 100);
      showCompletionModal(gameStore.currentMission, result.currentScore);
    } catch (error) {
      console.error('Failed to complete mission:', error);
      showCompletionModal(gameStore.currentMission, 0);
    }
  } else {
    try {
      await updateScore(gameStore.currentMission, -10);
    } catch (error) {
      console.error('Failed to apply penalty:', error);
    }

    gameStore.progress[gameStore.currentMission] = {
      emailsRead: [],
      messagesRead: [],
      filesExamined: [],
      evidenceFound: [],
      markedEvidence: [],
      suspectsIdentified: [],
      timelineBuilt: false,
      primarySuspectConfirmed: false,
      caseStatus: 'briefing',
      investigationScore: 0,
      hintsUsed: 0
    };
    showSuspectModal.value = false;
  }
};

const statusClass = computed(() => {
  const progress = gameStore.currentProgress;
  if (!progress) return 'investigating';

  if (progress.caseStatus === 'completed') return 'completed';
  if (progress.investigationScore >= 300) return 'building_case';
  if (progress.evidenceFound.length >= 5) return 'analyzing';
  return progress.caseStatus;
});

const statusText = computed(() => {
  const progress = gameStore.currentProgress;
  if (!progress) return 'Under Investigation';

  switch (statusClass.value) {
    case 'completed': return 'Case Closed';
    case 'building_case': return 'Building Case';
    case 'analyzing': return 'Analyzing Evidence';
    case 'arrest_warrant': return 'Preparing Arrest';
    case 'briefing': return 'Reading Briefing';
    default: return 'Under Investigation';
  }
});

const evidenceItems = computed((): EvidenceItem[] => {
  const currentProgress = gameStore.currentProgress;
  const missionData = gameStore.currentMissionData;
  if (!currentProgress?.markedEvidence || !missionData?.content) return [];

  const content = missionData.content;
  return currentProgress.markedEvidence.map(evidenceId => {
    const email = content.emails?.find(e => e.id === evidenceId);
    if (email) {
      return {
        id: evidenceId,
        title: email.subject || 'Email Evidence',
        description: email.body?.substring(0, 100) + '...' || 'Email content',
        type: 'Email Evidence',
        icon: '📧',
        important: false,
        discoveredAt: new Date(email.timestamp || Date.now())
      };
    }

    const chat = content.chatMessages?.find(c => c.id === evidenceId);
    if (chat) {
      const lastMessage = chat.messages[chat.messages.length - 1];
      return {
        id: evidenceId,
        title: chat.title || `Chat Evidence`,
        description: lastMessage?.content || 'Chat conversation',
        type: 'Chat Evidence',
        icon: '💬',
        important: false,
        discoveredAt: new Date(lastMessage?.timestamp || Date.now())
      };
    }

    const file = content.files?.find(f => f.id === evidenceId);
    if (file) {
      return {
        id: evidenceId,
        title: file.name,
        description: file.content?.toString().substring(0, 100) || 'File content',
        type: `${file.type.charAt(0).toUpperCase() + file.type.slice(1)} Evidence`,
        icon: '📄',
        important: file.isEvidence,
        discoveredAt: new Date(file.lastModified || Date.now())
      };
    }

    return {
      id: evidenceId,
      title: `Evidence Item ${evidenceId}`,
      description: 'This item has been marked as evidence in your investigation.',
      type: 'Investigation Evidence',
      icon: '🔍',
      important: false,
      discoveredAt: new Date()
    };
  });
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/EvidenceLocker';
</style>