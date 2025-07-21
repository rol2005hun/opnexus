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
            <div v-for="suspect in nexusCorpLeakStory.suspects.filter(s => s.suspicionLevel >= 8)" :key="suspect.id" class="suspect-details">
              <strong>{{ suspect.name }}</strong> - {{ suspect.role }}
              <p>{{ suspect.motive }}</p>
              <div class="suspicion-level">
                Suspicion Level: {{ suspect.suspicionLevel }}/10
              </div>
            </div>
          </div>

          <div class="case-conclusion" v-if="gameStore.currentProgress?.caseStatus === 'completed'">
            <h4>✅ Case Status</h4>
            <p>Investigation complete. All evidence has been collected and analyzed. The perpetrator has been identified.</p>
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
  
  // Add email evidence
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

  // Add chat evidence
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

  // Add file evidence
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
@use "@/assets/scss/variables" as *;
@use "sass:color";

.app-evidence-locker {
  height: 100%;
  background: $window-bg;
  display: flex;
  flex-direction: column;
}

.evidence-locker-header {
  background: $bg-secondary;
  padding: 1rem;
  border-bottom: 1px solid #444;

  h2 {
    margin: 0 0 0.5rem 0;
    color: $text-primary;
    font-size: 1.2rem;
  }

  .case-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .case-name {
      color: $text-secondary;
      font-weight: 500;
    }

    .case-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;

      &.investigating {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
      }

      &.analyzing {
        background: rgba(0, 122, 204, 0.2);
        color: $accent-blue;
      }

      &.completed {
        background: rgba(76, 175, 80, 0.2);
        color: #4caf50;
      }
    }
  }
}

.evidence-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.progress-section {
  margin-bottom: 2rem;

  h3 {
    color: $text-primary;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .progress-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .progress-item {
      background: $bg-secondary;
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid $accent-blue;

      .progress-label {
        display: block;
        color: $text-secondary;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      .progress-value {
        font-size: 1.2rem;
        font-weight: 600;
        color: $text-primary;
      }
    }
  }
}

.evidence-section, .clues-section, .report-section {
  margin-bottom: 2rem;

  h3 {
    color: $text-primary;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
}

.evidence-list {
  .no-evidence {
    text-align: center;
    padding: 2rem;
    color: $text-secondary;
    background: $bg-secondary;
    border-radius: 8px;
    border: 2px dashed #444;
  }

  .evidence-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: $bg-secondary;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid #444;
    transition: all 0.2s ease;

    &:hover {
      border-color: $accent-blue;
      background: color.adjust($bg-secondary, $lightness: 2%);
    }

    &.important {
      border-left: 4px solid $accent-red;
      
      .evidence-icon {
        color: $accent-red;
      }
    }

    .evidence-icon {
      font-size: 2rem;
      color: $accent-blue;
    }

    .evidence-details {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem 0;
        color: $text-primary;
        font-size: 1rem;
      }

      p {
        margin: 0 0 0.5rem 0;
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
        }
      }
    }
  }
}

.clues-list {
  .clue-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: rgba(0, 122, 204, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border-left: 4px solid $accent-blue;

    .clue-icon {
      font-size: 1.5rem;
      color: $accent-blue;
    }

    .clue-text {
      color: $text-primary;
      line-height: 1.4;
    }
  }
}

.report-section {
  .report-content {
    background: $bg-secondary;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #444;

    .suspect-info {
      margin-bottom: 1.5rem;

      h4 {
        color: $text-primary;
        margin-bottom: 1rem;
      }

      .suspect-details {
        background: rgba(255, 193, 7, 0.1);
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #ffc107;
        margin-bottom: 1rem;

        strong {
          color: $text-primary;
          font-size: 1.1rem;
        }

        p {
          margin: 0.5rem 0;
          color: $text-secondary;
        }

        .suspicion-level {
          font-size: 0.9rem;
          color: #ffc107;
          font-weight: 600;
        }
      }
    }

    .case-conclusion {
      h4 {
        color: #4caf50;
        margin-bottom: 1rem;
      }

      p {
        color: $text-primary;
        line-height: 1.4;
      }
    }
  }
}
</style>