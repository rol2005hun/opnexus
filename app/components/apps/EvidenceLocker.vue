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

    <div class="tabs-container">
      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'evidence' }" @click="activeTab = 'evidence'">
          🔍 Evidence
        </button>
        <button class="tab" :class="{ active: activeTab === 'timeline' }" @click="activeTab = 'timeline'">
          📅 Timeline
        </button>
      </div>
    </div>

    <div class="evidence-content">
      <div v-if="activeTab === 'evidence'" class="evidence-tab">
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

      <div v-if="activeTab === 'timeline'" class="timeline-tab">
        <div class="timeline-header">
          <h3>📅 Investigation Timeline</h3>
          <p>Key events discovered during the investigation</p>
        </div>

        <div class="timeline">
          <div v-for="event in revealedTimelineEvents" :key="event.id" class="timeline-event">
            <div class="timeline-marker"></div>
            <div class="timeline-content-item">
              <div class="timeline-header">
                <h4>{{ event.title }}</h4>
                <span class="timeline-time">{{ useDate().formatDate(event.timestamp) }}</span>
              </div>
              <p class="timeline-description">{{ event.description }}</p>
              <div class="timeline-meta">
                <div class="timeline-participants">
                  <span class="timeline-label">Participants:</span>
                  {{ event.participants.join(', ') }}
                </div>
                <div class="timeline-location">
                  <span class="timeline-label">Location:</span>
                  {{ event.location }}
                </div>
                <div class="timeline-evidence" v-if="event.revealedBy?.length">
                  <span class="timeline-label">Revealed by:</span>
                  {{ event.revealedBy.join(', ') }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="revealedTimelineEvents.length === 0" class="timeline-empty">
            <p>📋 No timeline events have been revealed yet.</p>
            <p>Continue investigating to uncover the sequence of events.</p>
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
import { useScoring } from '@/composables/api/useScoring';
import { useMissionCompletion } from '@/composables/useMissionCompletion';
import formatTime from '@/utils/formatTime';

const gameStore = useGameStore();
const authStore = useAuthStore();
const { updateScore } = useScoring();

const activeTab = ref('evidence');

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
  const missionContent = gameStore.currentMissionContent;

  if (!progress || !missionContent) return 0;

  const totalRealEvidence = [
    ...missionContent.emails.filter((e: any) => e.isEvidence),
    ...missionContent.chatMessages?.filter((c: any) => c.isEvidence) || [],
    ...missionContent.files?.filter((f: any) => f.isEvidence) || []
  ].length;

  if (totalRealEvidence === 0) return 0;

  const progressPercent = Math.min(Math.floor((progress.evidenceFound.length / totalRealEvidence) * 100), 100);

  return progressPercent;
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
  if (progress >= 20) return 'Initial Evidence Collected';
  return 'Investigation Starting';
});

const canIdentifySuspects = computed(() => {
  const progress = gameStore.currentProgress;
  const missionContent = gameStore.currentMissionContent;

  if (!progress || !missionContent) return false;

  const totalRealEvidence = [
    ...missionContent.emails.filter((e: any) => e.isEvidence),
    ...missionContent.chatMessages?.filter((c: any) => c.isEvidence) || [],
    ...missionContent.files?.filter((f: any) => f.isEvidence) || []
  ].length;

  const realEvidenceIds = [
    ...missionContent.emails.filter((e: any) => e.isEvidence).map((e: any) => e.id),
    ...missionContent.chatMessages?.filter((c: any) => c.isEvidence).map((c: any) => c.id) || [],
    ...missionContent.files?.filter((f: any) => f.isEvidence).map((f: any) => f.id) || []
  ];

  const marked = progress.markedEvidence || [];
  const allMatch = totalRealEvidence > 0 &&
    realEvidenceIds.every(id => marked.includes(id));

  return allMatch && progress.caseStatus !== 'completed';
});

const showSuspectModal = ref(false);
const selectedSuspect = ref<string | null>(null);

const availableSuspects = computed(() => {
  const missionContent = gameStore.currentMissionContent;
  if (!missionContent?.characters) return [];
  return missionContent.characters
    .filter((character: any) => character.isSuspect)
    .map((character: any) => ({
      id: character.id,
      name: character.name,
      role: character.role,
      suspicionLevel: character.suspicionLevel || 0
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

  const missionContent = gameStore.currentMissionContent;
  const trueSuspect = missionContent?.characters?.find((c: any) =>
    c.isSuspect && c.evidenceAgainst && c.evidenceAgainst.length > 0
  );

  if (trueSuspect && selectedSuspect.value === trueSuspect.id) {
    gameStore.markSuspectConfirmed(gameStore.currentMission, selectedSuspect.value);
    showSuspectModal.value = false;

    try {
      const result = await updateScore(gameStore.currentMission, 100);

      const authStore = useAuthStore();
      if (authStore.user && !authStore.user.gameProgress.completedMissions.includes(gameStore.currentMission)) {
        authStore.user.gameProgress.completedMissions.push(gameStore.currentMission);
      }

      useMissionCompletion().showCompletionModal(gameStore.currentMission, result.currentScore);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  } else {
    const progress = gameStore.currentProgress;
    if (progress) {
      progress.suspectsIdentified = [];
      progress.timelineBuilt = false;
      progress.primarySuspectConfirmed = false;
      progress.caseStatus = 'briefing';
      progress.investigationScore = 0;
      progress.hintsUsed = 0;
    }
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
  const missionContent = gameStore.currentMissionContent;

  const markedEvidence = currentProgress?.markedEvidence || [];

  if (!markedEvidence.length || !missionContent) return [];

  const processEmailContent = (text: string): string => {
    if (!text) return '';
    const username = authStore.currentUser?.username || 'agent';
    return text.replace(/{username}/g, username);
  };

  const items = markedEvidence.map(evidenceId => {
    const email = missionContent.emails?.find((e: any) => e.id === evidenceId);
    if (email) {
      const processedSubject = processEmailContent(email.subject || '');
      const processedBody = processEmailContent(email.body || '');
      return {
        id: evidenceId,
        title: processedSubject,
        description: processedBody.substring(0, 150) + '...',
        type: 'Email Evidence',
        icon: '📧',
        important: email.isEvidence || false,
        discoveredAt: new Date()
      };
    }

    const chat = missionContent.chatMessages?.find((c: any) => c.id === evidenceId);
    if (chat) {
      const firstMessage = chat.messages?.[0]?.content || 'No message content';
      return {
        id: evidenceId,
        title: `Chat: ${chat.title || 'Unknown Chat'}`,
        description: firstMessage.substring(0, 150) + '...',
        type: 'Chat Evidence',
        icon: '💬',
        important: chat.isEvidence || false,
        discoveredAt: new Date()
      };
    }

    const file = missionContent.files?.find((f: any) => f.id === evidenceId);
    if (file) {
      return {
        id: evidenceId,
        title: file.name || 'Unknown File',
        description: file.content?.substring(0, 150) + '...' || 'No description available',
        type: 'File Evidence',
        icon: '📄',
        important: file.isEvidence || false,
        discoveredAt: new Date()
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

  return items;
});

const revealedTimelineEvents = computed(() => {
  const missionContent = gameStore.currentMissionContent;
  const progress = gameStore.currentProgress;

  if (!missionContent?.timeline || !progress) return [];

  const foundEvidence = progress.evidenceFound || [];
  const readEmails = progress.emailsRead || [];
  const readMessages = progress.messagesRead || [];

  return missionContent.timeline
    .filter((event: any) => {
      return event.revealedBy?.some((evidenceId: string) =>
        foundEvidence.includes(evidenceId) ||
        readEmails.includes(evidenceId) ||
        readMessages.includes(evidenceId)
      );
    })
    .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/EvidenceLocker';
</style>