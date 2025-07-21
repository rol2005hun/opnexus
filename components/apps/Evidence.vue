<template>
  <div class="app-evidence">
    <div class="evidence-header">
      <h2>📋 Evidence Storage</h2>
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
            <h4>🎯 Identified Suspect</h4>
            <div class="suspect-details">
              <strong>Peter Martinez</strong> - internal employee
              <p>Leaks confidential documents to John Smith for financial compensation.</p>
            </div>
          </div>

          <div class="case-conclusion" v-if="gameStore.currentProgress?.caseStatus === 'completed'">
            <h4>✅ Case Closed</h4>
            <p>You have successfully identified the source of the internal leak and collected the necessary evidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game';

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

const totalEmails = 3;
const totalChats = 1;
const requiredEvidence = 3;

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

  const evidenceMap: Record<string, EvidenceItem> = {
    'secret_documents_email': {
      id: 'secret_documents_email',
      title: 'Confidential Documents Email',
      description: 'Peter Martinez sends an email to John Smith with confidential documents and file attachments.',
      type: 'Email Evidence',
      icon: '📧',
      important: true,
      discoveredAt: new Date()
    },
    'payment_confirmation_email': {
      id: 'payment_confirmation_email',
      title: 'Payment Confirmation',
      description: 'John Smith confirms the transfer of the "agreed amount" to Peter Martinez.',
      type: 'Email Evidence',
      icon: '💰',
      important: true,
      discoveredAt: new Date()
    },
    'john_smith_conspiracy_chat': {
      id: 'john_smith_conspiracy_chat',
      title: 'Conspiracy Chat',
      description: 'Detailed chat conversation between Peter Martinez and John Smith about document handover.',
      type: 'Message Evidence',
      icon: '💬',
      important: true,
      discoveredAt: new Date()
    }
  };

  return gameStore.currentProgress.evidenceFound
    .map(id => evidenceMap[id])
    .filter((item): item is EvidenceItem => Boolean(item));
});

const clueItems = computed((): ClueItem[] => {
  if (!gameStore.currentProgress?.connectionsDiscovered) return [];

  const clueMap: Record<string, ClueItem> = {
    'martinez_peter_leak': {
      id: 'martinez_peter_leak',
      description: 'Peter Martinez is the source of the internal leak - motivated by financial gain, he shares confidential information with external parties.'
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
@use "sass:color";

.app-evidence {
  height: 100%;
  background: $window-bg;
  display: flex;
  flex-direction: column;
}

.evidence-header {
  padding: 1.5rem;
  border-bottom: 1px solid #444;
  background: $bg-secondary;

  h2 {
    margin: 0 0 1rem 0;
    color: $text-primary;
    font-size: 1.5rem;
  }

  .case-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .case-name {
      font-weight: 600;
      color: $text-primary;
    }

    .case-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;

      &.investigating {
        background: rgba(255, 136, 0, 0.2);
        color: $accent-orange;
      }

      &.analyzing {
        background: rgba(0, 122, 204, 0.2);
        color: $accent-blue;
      }

      &.building_case {
        background: rgba(156, 39, 176, 0.2);
        color: #9c27b0;
      }

      &.arrest_warrant {
        background: rgba(244, 67, 54, 0.2);
        color: #f44336;
      }

      &.completed {
        background: rgba(0, 170, 68, 0.2);
        color: $accent-green;
      }
    }
  }
}

.evidence-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.progress-section,
.evidence-section,
.clues-section,
.report-section {
  margin-bottom: 2rem;

  h3 {
    color: $accent-blue;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
}

.progress-items {
  display: grid;
  gap: 1rem;

  .progress-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: $bg-secondary;
    border-radius: 8px;

    .progress-label {
      color: $text-secondary;
    }

    .progress-value {
      color: $accent-blue;
      font-weight: 600;
      font-family: $font-mono;
    }
  }
}

.evidence-list,
.clues-list {
  display: grid;
  gap: 1rem;
}

.no-evidence {
  text-align: center;
  padding: 2rem;
  color: $text-secondary;
  font-style: italic;
}

.evidence-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: $bg-secondary;
  border-radius: 8px;
  border-left: 4px solid $border-color;

  &.important {
    border-left-color: $accent-orange;
  }

  .evidence-icon {
    font-size: 2rem;
    display: flex;
    align-items: center;
  }

  .evidence-details {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem 0;
      color: $text-primary;
    }

    p {
      margin: 0 0 0.75rem 0;
      color: $text-secondary;
      line-height: 1.4;
    }

    .evidence-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;

      .evidence-type {
        color: $accent-blue;
        font-weight: 600;
      }

      .evidence-time {
        color: $text-muted;
        font-family: $font-mono;
      }
    }
  }
}

.clue-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 122, 204, 0.1);
  border-radius: 8px;
  border: 1px solid $accent-blue;

  .clue-icon {
    font-size: 1.5rem;
  }

  .clue-text {
    color: $text-primary;
    line-height: 1.4;
  }
}

.report-content {
  display: grid;
  gap: 1.5rem;

  .suspect-info,
  .case-conclusion {
    padding: 1.5rem;
    background: $bg-secondary;
    border-radius: 8px;

    h4 {
      margin: 0 0 1rem 0;
      color: $text-primary;
    }

    .suspect-details {
      strong {
        color: $accent-red;
        font-size: 1.1rem;
      }

      p {
        margin: 0.5rem 0 0 0;
        color: $text-secondary;
        line-height: 1.4;
      }
    }
  }

  .case-conclusion {
    border: 2px solid $accent-green;

    h4 {
      color: $accent-green;
    }
  }
}
</style>
