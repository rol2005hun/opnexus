<template>
  <div class="app-evidence-locker">
    <div class="evidence-locker-header">
      <h2>� Evidence Locker</h2>
      <div class="case-info" v-if="gameStore.currentStoryData">
        <span class="case-name">{{ gameStore.currentStoryData.title }}</span>
        <span class="case-status" :class="statusClass">{{ statusText }}</span>
      </div>
    </div>

    <div class="evidence-content">

      <div class="progress-section">
        <h3>🔍 Investigation Status</h3>
        <div class="progress-items">
          <div class="progress-item">
            <span class="progress-label">Emails reviewed:</span>
            <span class="progress-value">{{ emailsRead }}/{{ totalEmails }}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Conversations analyzed:</span>
            <span class="progress-value">{{ messagesRead }}/{{ totalChats }}</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">Evidence collected:</span>
            <span class="progress-value">{{ evidenceCount }}/{{ requiredEvidence }}</span>
          </div>
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

      <div class="clues-section" v-if="gameStore.currentProgress?.connectionsDiscovered?.length">
        <h3>💡 Key Discoveries</h3>
        <div class="clues-list">
          <div v-for="clue in clueItems" :key="clue.id" class="clue-item">
            <div class="clue-icon">🔍</div>
            <div class="clue-text">{{ clue.description }}</div>
          </div>
        </div>
      </div>

      <div class="report-section" v-if="gameStore.currentProgress?.suspectsIdentified?.length">
        <h3>📝 Investigation Report</h3>
        <div class="report-content">
          <div class="suspect-info">
            <h4>🎯 Primary Suspect</h4>
            <div v-for="suspect in nexusCorpLeakStory.suspects.filter(s => s.suspicionLevel >= 8)" :key="suspect.id"
              class="suspect-details">
              <strong>{{ suspect.name }}</strong> - {{ suspect.role }}
              <p>{{ suspect.motive }}</p>
              <div class="suspicion-level">
                Suspicion Level: {{ suspect.suspicionLevel }}/10
              </div>
            </div>
          </div>

          <div class="case-conclusion" v-if="gameStore.currentProgress?.caseStatus === 'completed'">
            <h4>✅ Case Status</h4>
            <p>Investigation complete. All evidence has been collected and analyzed. The perpetrator has been
              identified.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { nexusCorpLeakStory } from '@/stories/the-internal-leak';

const gameStore = useGameStore();

interface EvidenceItem {
  id: string
  title: string
  description: string
  type: string
  icon: string
  important: boolean
  discoveredAt: Date
}

interface ClueItem {
  id: string
  description: string
}

const emailsRead = computed(() => gameStore.currentProgress?.emailsRead.length || 0);
const messagesRead = computed(() => gameStore.currentProgress?.messagesRead.length || 0);
const evidenceCount = computed(() => gameStore.currentProgress?.evidenceFound.length || 0);

const totalEmails = nexusCorpLeakStory.emails.length;
const totalChats = nexusCorpLeakStory.chatMessages.length;
const requiredEvidence = nexusCorpLeakStory.objectives.reduce((total, obj) => total + obj.requiredEvidence.length, 0);

const statusClass = computed(() => {
  if (!gameStore.currentProgress) return 'investigating';
  return gameStore.currentProgress.caseStatus;
});

const statusText = computed(() => {
  switch (statusClass.value) {
    case 'completed': return 'Closed';
    case 'analyzing': return 'Analysis in Progress';
    case 'building_case': return 'Building Case';
    case 'arrest_warrant': return 'Preparing Arrest';
    default: return 'Under Investigation';
  }
});

const evidenceItems = computed((): EvidenceItem[] => {
  if (!gameStore.currentProgress?.evidenceFound) return [];

  const evidenceMap: Record<string, EvidenceItem> = {};

  nexusCorpLeakStory.emails.forEach(email => {
    if (email.isEvidence) {
      evidenceMap[`email_evidence_${email.id}`] = {
        id: `email_evidence_${email.id}`,
        title: `Email: ${email.subject}`,
        description: `From ${email.from} to ${email.to.join(', ')} - ${email.body.substring(0, 100)}...`,
        type: 'Email Evidence',
        icon: '📧',
        important: email.from.includes('unknown') || email.subject.toLowerCase().includes('urgent') || email.importance === 'high',
        discoveredAt: new Date(email.timestamp)
      };
    }
  });

  nexusCorpLeakStory.chatMessages.forEach(chat => {
    if (chat.isEvidence) {
      evidenceMap[`chat_evidence_${chat.id}`] = {
        id: `chat_evidence_${chat.id}`,
        title: `Chat: ${chat.title}`,
        description: `Conversation on ${chat.platform} between ${chat.participants.join(' and ')}`,
        type: 'Message Evidence',
        icon: '💬',
        important: chat.participants.includes('Unknown Contact'),
        discoveredAt: new Date(chat.messages[0]?.timestamp || Date.now())
      };
    }
  });

  nexusCorpLeakStory.files.forEach(file => {
    if (file.isEvidence) {
      evidenceMap[`file_evidence_${file.id}`] = {
        id: `file_evidence_${file.id}`,
        title: `File: ${file.name}`,
        description: `${file.type.toUpperCase()} file (${file.size}) - ${file.content.substring(0, 100)}...`,
        type: 'File Evidence',
        icon: file.encrypted ? '🔒' : '📄',
        important: file.encrypted || file.accessLevel >= 8,
        discoveredAt: new Date(file.lastModified)
      };
    }
  });

  return gameStore.currentProgress.evidenceFound
    .map(id => evidenceMap[id])
    .filter((item): item is EvidenceItem => Boolean(item));
});

const clueItems = computed((): ClueItem[] => {
  if (!gameStore.currentProgress?.connectionsDiscovered) return [];

  const clueMap: Record<string, ClueItem> = {
    'suspect_aaron_cole': {
      id: 'suspect_aaron_cole',
      description: 'Aaron Cole has suspicious access patterns and financial motivations for leaking classified documents.'
    },
    'payment_trail': {
      id: 'payment_trail',
      description: 'Financial transactions indicate payment for confidential information transfer to external parties.'
    },
    'after_hours_access': {
      id: 'after_hours_access',
      description: 'Unauthorized building access and file transfers occurred during non-business hours.'
    }
  };

  return gameStore.currentProgress.connectionsDiscovered
    .map((id: string) => clueMap[id])
    .filter((item): item is ClueItem => Boolean(item));
});

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/EvidenceLocker.scss';
</style>