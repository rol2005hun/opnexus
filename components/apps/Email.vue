<template>
  <div class="app-email">
    <!-- Email Sidebar -->
    <div class="email-sidebar">
      <div class="folders">
        <div v-for="folder in folders" :key="folder.id" class="folder" :class="{ active: activeFolder === folder.id }"
          @click="activeFolder = folder.id">
          <span class="folder-icon">{{ folder.icon }}</span>
          <span class="folder-name">{{ folder.name }}</span>
          <span v-if="folder.unread > 0" class="unread-count">{{ folder.unread }}</span>
        </div>
      </div>
    </div>

    <!-- Email List -->
    <div class="email-list">
      <div class="email-header">
        <h3>{{ getCurrentFolder()?.name || 'Inbox' }}</h3>
        <div class="email-actions">
          <button class="refresh-btn" @click="refreshEmails">↻</button>
        </div>
      </div>

      <div class="emails">
        <div v-for="email in currentEmails" :key="email.id" class="email-item" :class="{
          selected: selectedEmail === email.id,
          unread: !email.read,
          important: email.important
        }" @click="selectEmail(email.id)">
          <div class="email-sender">{{ email.sender }}</div>
          <div class="email-subject">{{ email.subject }}</div>
          <div class="email-preview">{{ email.preview }}</div>
          <div class="email-time">{{ formatTime(email.timestamp) }}</div>
          <div v-if="email.hasAttachment" class="attachment-indicator">📎</div>
        </div>

        <!-- Empty State -->
        <div v-if="currentEmails.length === 0" class="no-email-selected">
          <p>No emails in this folder</p>
        </div>
      </div>
    </div>

    <!-- Email Content -->
    <div class="email-content">
      <div v-if="selectedEmailData" class="email-view">
        <div class="email-headers">
          <h2>{{ selectedEmailData.subject }}</h2>
          <div class="email-meta">
            <div><strong>From:</strong> {{ selectedEmailData.sender }}</div>
            <div><strong>To:</strong> {{ selectedEmailData.recipient }}</div>
            <div><strong>Date:</strong> {{ formatDateTime(selectedEmailData.timestamp) }}</div>
          </div>
        </div>

        <div class="email-body" v-html="selectedEmailData.content"></div>

        <div v-if="selectedEmailData.attachments?.length" class="email-attachments">
          <h4>Attachments:</h4>
          <div v-for="attachment in selectedEmailData.attachments" :key="attachment.name" class="attachment"
            @click="openAttachment(attachment)">
            <span class="attachment-icon">📄</span>
            <span class="attachment-name">{{ attachment.name }}</span>
            <span class="attachment-size">{{ attachment.size }}</span>
          </div>
        </div>
      </div>

      <div v-else class="no-email-selected">
        <p>Select an email to read</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

interface EmailAttachment {
  name: string
  size: string
  type: string
  content?: string
}

interface Email {
  id: string
  sender: string
  recipient: string
  subject: string
  preview: string
  content: string
  timestamp: Date
  read: boolean
  important: boolean
  hasAttachment: boolean
  attachments?: EmailAttachment[]
  folder: string
}

interface Folder {
  id: string
  name: string
  icon: string
  unread: number
}

const activeFolder = ref('inbox');
const selectedEmail = ref<string | null>(null);

const folders: Folder[] = [
  { id: 'inbox', name: 'Inbox', icon: '📥', unread: 3 },
  { id: 'sent', name: 'Sent', icon: '📤', unread: 0 },
  { id: 'drafts', name: 'Drafts', icon: '📝', unread: 0 },
  { id: 'important', name: 'Important', icon: '⭐', unread: 2 },
  { id: 'trash', name: 'Trash', icon: '🗑️', unread: 0 }
];

const emails: Email[] = [
  {
    id: '1',
    sender: 'martinez.peter@nexus-corp.com',
    recipient: 'smith.john@nexus-corp.com',
    subject: 'Confidential: Project documents',
    preview: 'John, I\'m sending the requested documents...',
    content: `
      <p>John,</p>
      <p>I'm sending the requested documents regarding the project. Please <strong>keep everything confidential</strong>.</p>
      <p>The files contain:</p>
      <ul>
        <li>Development plans</li>
        <li>Budget information</li>
        <li>Client lists</li>
      </ul>
      <p>If you tell anyone about this, I would be in big trouble.</p>
      <p>Best,<br>Peter</p>
    `,
    timestamp: new Date('2025-01-15T14:30:00'),
    read: false,
    important: true,
    hasAttachment: true,
    attachments: [
      { name: 'project_plans.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'budget_overview.xlsx', size: '1.1 MB', type: 'excel' }
    ],
    folder: 'inbox'
  },
  {
    id: '2',
    sender: 'admin@nexus-corp.com',
    recipient: 'martinez.peter@nexus-corp.com',
    subject: 'WARNING: Data Security Policy',
    preview: 'We remind you that all employees...',
    content: `
      <p>Dear Colleagues!</p>
      <p><strong>We remind you</strong> that all employees are required to comply with the data security policy.</p>
      <p>Strictly prohibited:</p>
      <ul>
        <li>Sharing internal documents with external parties</li>
        <li>Using corporate email accounts for personal purposes</li>
        <li>Sharing passwords</li>
      </ul>
      <p>Violation of the policy may result in immediate termination.</p>
      <p>IT Security Department</p>
    `,
    timestamp: new Date('2025-01-14T09:00:00'),
    read: true,
    important: true,
    hasAttachment: false,
    folder: 'inbox'
  },
  {
    id: '3',
    sender: 'smith.john@competitor.com',
    recipient: 'martinez.peter@nexus-corp.com',
    subject: 'RE: That thing we talked about',
    preview: 'Peter, I received the files. Thank you...',
    content: `
      <p>Peter,</p>
      <p>I received the files. <strong>Thank you</strong>, this is exactly what I needed.</p>
      <p>The agreed amount is already on its way to you. I still count on you.</p>
      <p>I hope no one suspects anything...</p>
      <p>J.</p>
    `,
    timestamp: new Date('2025-01-15T16:45:00'),
    read: false,
    important: false,
    hasAttachment: false,
    folder: 'inbox'
  }
]

const getCurrentFolder = () => {
  return folders.find(f => f.id === activeFolder.value);
};

const currentEmails = computed(() => {
  return emails.filter(email => {
    if (activeFolder.value === 'important') {
      return email.important;
    }
    return email.folder === activeFolder.value;
  });
});;

const selectedEmailData = computed(() => {
  if (!selectedEmail.value) return null;
  return emails.find(email => email.id === selectedEmail.value);
});

const selectEmail = (emailId: string) => {
  selectedEmail.value = emailId;
  const email = emails.find(e => e.id === emailId);
  if (email && !email.read) {
    email.read = true;
    const folder = folders.find(f => f.id === email.folder);
    if (folder && folder.unread > 0) {
      folder.unread--;
    }

    if (gameStore.currentStory) {
      gameStore.markEmailRead(gameStore.currentStory, emailId);

      if (emailId === '1') {
        gameStore.addEvidence(gameStore.currentStory, 'secret_documents_email');
      } else if (emailId === '3') {
        gameStore.addEvidence(gameStore.currentStory, 'payment_confirmation_email');
      }
    }
  }
};

const refreshEmails = () => {
  console.log('Refreshing emails...');
};

const openAttachment = (attachment: EmailAttachment) => {
  console.log('Opening attachment:', attachment.name);
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateTime = (date: Date) => {
  return date.toLocaleString('en-US');
};
</script>

<style lang="scss" scoped>
@use "sass:color";

.app-email {
  display: grid;
  grid-template-columns: 200px 300px 1fr;
  height: 100%;
  background: $window-bg;
}

.email-sidebar {
  background: $bg-secondary;
  border-right: 1px solid #444;
  padding: 1rem 0;

  .folders {
    .folder {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background: $accent-blue;
        color: white;
      }

      .folder-icon {
        font-size: 1rem;
      }

      .folder-name {
        flex: 1;
        font-size: 0.9rem;
      }

      .unread-count {
        background: $accent-red;
        color: white;
        border-radius: 10px;
        padding: 2px 6px;
        font-size: 0.7rem;
        font-weight: bold;
      }
    }
  }
}

.email-list {
  border-right: 1px solid #444;

  .email-header {
    padding: 1rem;
    border-bottom: 1px solid #444;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      color: $text-primary;
    }

    .refresh-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: $text-secondary;
      transition: color 0.2s ease;

      &:hover {
        color: $text-primary;
      }
    }
  }

  .emails {
    height: calc(100% - 70px);
    overflow-y: auto;
  }

  .email-item {
    padding: 12px 16px;
    border-bottom: 1px solid #333;
    cursor: pointer;
    transition: background 0.2s ease;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &.selected {
      background: $accent-blue;
      color: white;
    }

    &.unread {
      background: rgba(0, 122, 204, 0.1);
      font-weight: 600;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: $accent-blue;
      }
    }

    &.important {
      border-left: 3px solid $accent-orange;
    }

    .email-sender {
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .email-subject {
      font-size: 0.9rem;
      margin-bottom: 4px;
      color: $text-primary;
    }

    .email-preview {
      font-size: 0.8rem;
      color: $text-secondary;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .email-time {
      font-size: 0.7rem;
      color: $text-muted;
    }

    .attachment-indicator {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 0.8rem;
    }
  }
}

.email-content {
  padding: 1rem;
  overflow-y: auto;

  :deep(.email-body) {
    line-height: 1.6;
    color: $text-primary;

    p {
      margin-bottom: 1rem;
    }

    ul,
    ol {
      margin-bottom: 1rem;
      margin-left: 0;
      padding-left: 2rem;

      li {
        margin-bottom: 0.5rem;
        color: $text-secondary;
      }
    }

    ul {
      list-style-type: disc;
    }

    ol {
      list-style-type: decimal;
    }

    strong {
      color: $accent-orange;
    }
  }

  .email-view {
    .email-headers {
      margin-bottom: 1.5rem;

      h2 {
        margin-bottom: 1rem;
        color: $text-primary;
      }

      .email-meta {
        background: $bg-secondary;
        padding: 1rem;
        border-radius: 8px;

        div {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;

          &:last-child {
            margin-bottom: 0;
          }

          strong {
            color: $text-primary;
          }
        }
      }
    }



    .email-attachments {
      margin-top: 2rem;

      h4 {
        margin-bottom: 1rem;
        color: $text-primary;
      }

      .attachment {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: $bg-secondary;
        border-radius: 6px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: color.adjust($bg-secondary, $lightness: 5%);
        }

        .attachment-icon {
          font-size: 1.2rem;
        }

        .attachment-name {
          flex: 1;
          font-size: 0.9rem;
        }

        .attachment-size {
          font-size: 0.8rem;
          color: $text-muted;
        }
      }
    }
  }
}

.no-email-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: $text-secondary;
  font-style: italic;
}
</style>
