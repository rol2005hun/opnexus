<template>
  <div class="app-email">

    <div class="email-sidebar">
      <div class="compose-section">
        <button class="compose-btn" @click="openCompose">✏️ Compose</button>
      </div>
      <div class="folders">
        <div v-for="folder in folders" :key="folder.id" class="folder" :class="{ active: activeFolder === folder.id }"
          @click="activeFolder = folder.id">
          <span class="folder-icon">{{ folder.icon }}</span>
          <span class="folder-name">{{ folder.name }}</span>
          <span v-if="folder.unread > 0" class="unread-count">{{ folder.unread }}</span>
        </div>
      </div>
    </div>

    <div class="email-list">
      <div class="email-header">
        <h3>{{ getCurrentFolder()?.name || 'Inbox' }}</h3>
        <div class="email-actions">
          <button class="refresh-btn" @click="refreshEmails">↻</button>
        </div>
      </div>

      <div class="emails-container">
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
          <div class="email-item-actions">
            <button v-if="activeFolder !== 'trash'" class="action-btn trash" @click.stop="moveToTrash(email.id)"
              title="Move to Trash">🗑️</button>
            <button v-if="activeFolder === 'trash'" class="action-btn restore" @click.stop="restoreFromTrash(email.id)"
              title="Restore">↶</button>
            <button v-if="activeFolder === 'trash'" class="action-btn delete" @click.stop="permanentDelete(email.id)"
              title="Delete Forever">❌</button>
            <button class="action-btn important" @click.stop="toggleImportant(email.id)"
              :class="{ active: email.important }" title="Toggle Important">⭐</button>
          </div>
        </div>

        <div v-if="currentEmails.length === 0" class="no-emails">
          <p>No emails in this folder</p>
        </div>
      </div>
    </div>

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

    <div v-if="showCompose" class="compose-modal">
      <div class="compose-content">
        <div class="compose-header">
          <h3>Compose Email</h3>
          <button class="close-btn" @click="closeCompose">✕</button>
        </div>
        <form @submit.prevent="sendEmail" class="compose-form">
          <div class="form-row">
            <label>To:</label>
            <input v-model="composeForm.to" type="email" required placeholder="recipient@nexus-corp.com">
          </div>
          <div class="form-row">
            <label>CC:</label>
            <input v-model="composeForm.cc" type="email" placeholder="cc@nexus-corp.com">
          </div>
          <div class="form-row">
            <label>Subject:</label>
            <input v-model="composeForm.subject" type="text" required placeholder="Email subject">
          </div>
          <div class="form-row">
            <label>Message:</label>
            <textarea v-model="composeForm.body" required placeholder="Type your message here..." rows="10"></textarea>
          </div>
          <div class="compose-actions">
            <button type="submit" class="send-btn">Send</button>
            <button type="button" class="cancel-btn" @click="closeCompose">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useGameStore } from '@/stores/game';
import type { EmailMessage, EmailAttachment, ProcessedEmail, EmailFolder } from '@/types/email';
import type { StoryContent } from '@/types/content';

const gameStore = useGameStore();

const activeFolder = ref('inbox');
const selectedEmail = ref<string | null>(null);
const showCompose = ref(false);
const currentStoryContent = ref<StoryContent | null>(null);
const composeForm = ref({
  to: '',
  cc: '',
  subject: '',
  body: ''
});

onMounted(async () => {
  currentStoryContent.value = await gameStore.getCurrentStoryContent();
  initializeEmails();
});

watch(() => gameStore.currentStory, async (newStoryId) => {
  if (newStoryId) {
    currentStoryContent.value = await gameStore.getCurrentStoryContent();
    selectedEmail.value = null;
    activeFolder.value = 'inbox';
    initializeEmails();
  }
});

const folders: EmailFolder[] = [
  { id: 'inbox', name: 'Inbox', icon: '📥', unread: 0 },
  { id: 'sent', name: 'Sent', icon: '📤', unread: 0 },
  { id: 'drafts', name: 'Drafts', icon: '📝', unread: 0 },
  { id: 'important', name: 'Important', icon: '⭐', unread: 0 },
  { id: 'allmails', name: 'All Mails', icon: '📧', unread: 0 },
  { id: 'trash', name: 'Trash', icon: '🗑️', unread: 0 }
];

const getStoryEmails = (): EmailMessage[] => {
  return currentStoryContent.value?.emails || [];
}

const formatEmailContent = (content: string): string => {
  let formatted = content;

  formatted = formatted.replace(/\n\n+/g, '</p><p>');
  formatted = formatted.replace(/\n/g, '<br>');
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/^(\d+\.\s.+)$/gm, '<li>$1</li>');
  formatted = formatted.replace(/^[\-\*]\s(.+)$/gm, '<li>$1</li>');
  formatted = formatted.replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>');
  if (!formatted.includes('<p>')) {
    formatted = `<p>${formatted}</p>`;
  }
  formatted = formatted.replace(/<p><\/p>/g, '');
  formatted = formatted.replace(/<p>\s*<br>\s*<\/p>/g, '');

  return formatted;
};

const processEmails = (rawEmails: EmailMessage[]): ProcessedEmail[] => {
  return rawEmails.map(email => {
    const processedAttachments: EmailAttachment[] = email.attachments || [];

    return {
      id: email.id,
      sender: email.from,
      recipient: email.to[0] || 'me@nexus-corp.com',
      subject: email.subject,
      preview: email.body.substring(0, 100) + '...',
      content: formatEmailContent(email.body),
      timestamp: new Date(email.timestamp),
      read: false,
      important: email.importance === 'high',
      hasAttachment: (email.attachments?.length || 0) > 0,
      attachments: processedAttachments,
      folder: email.folder || (email.from === 'me@nexus-corp.com' ? 'sent' : 'inbox')
    };
  });
};

const emails = ref<ProcessedEmail[]>([]);

const initializeEmails = () => {
  const storyEmails = getStoryEmails();
  emails.value = processEmails(storyEmails);
  updateFolderCounts();
};

const updateFolderCounts = () => {
  folders.forEach(folder => {
    if (folder.id === 'important') {
      folder.unread = emails.value.filter(email => email.important && !email.read).length;
    } else {
      folder.unread = emails.value.filter(email =>
        email.folder === folder.id && !email.read
      ).length;
    }
  });
};

const getCurrentFolder = () => {
  return folders.find(f => f.id === activeFolder.value);
};

const currentEmails = computed(() => {
  if (activeFolder.value === 'important') {
    return emails.value.filter(email => email.important && email.folder !== 'trash');
  }
  if (activeFolder.value === 'allmails') {
    return emails.value.filter(email => email.folder !== 'trash');
  }
  if (activeFolder.value === 'inbox') {
    return emails.value.filter(email =>
      email.folder === 'inbox' ||
      (email.folder !== 'sent' && email.folder !== 'trash' && email.folder !== 'drafts')
    );
  }
  return emails.value.filter(email => email.folder === activeFolder.value);
});

const selectedEmailData = computed(() => {
  if (!selectedEmail.value) return null;
  return emails.value.find(email => email.id === selectedEmail.value);
});

const selectEmail = (emailId: string) => {
  selectedEmail.value = emailId;
  const email = emails.value.find(e => e.id === emailId);
  if (email && !email.read) {
    email.read = true;
    updateFolderCounts();

    if (gameStore.currentStory) {
      gameStore.markEmailRead(gameStore.currentStory, emailId);

      if (email.important) {
        gameStore.addEvidence(gameStore.currentStory, `email_evidence_${emailId}`);
      }
    }
  }
};

const refreshEmails = () => {
  initializeEmails();
};

const moveToTrash = (emailId: string) => {
  const email = emails.value.find(e => e.id === emailId);
  if (email) {
    email.folder = 'trash';
    updateFolderCounts();
    if (selectedEmail.value === emailId) {
      selectedEmail.value = null;
    }
  }
};

const toggleImportant = (emailId: string) => {
  const email = emails.value.find(e => e.id === emailId);
  if (email) {
    email.important = !email.important;
    updateFolderCounts();
  }
};

const restoreFromTrash = (emailId: string) => {
  const email = emails.value.find(e => e.id === emailId);
  if (email) {
    email.folder = 'inbox';
    updateFolderCounts();
  }
};

const permanentDelete = (emailId: string) => {
  const index = emails.value.findIndex(e => e.id === emailId);
  if (index !== -1) {
    emails.value.splice(index, 1);
    updateFolderCounts();
    if (selectedEmail.value === emailId) {
      selectedEmail.value = null;
    }
  }
};

const openAttachment = (attachment: EmailAttachment) => {
  console.log('Opening attachment:', attachment.name);
};

const openCompose = () => {
  showCompose.value = true;
  composeForm.value = {
    to: '',
    cc: '',
    subject: '',
    body: ''
  };
};

const closeCompose = () => {
  showCompose.value = false;
};

const sendEmail = () => {
  const newEmail: ProcessedEmail = {
    id: `email_${Date.now()}`,
    sender: 'me@nexus-corp.com',
    recipient: composeForm.value.to,
    subject: composeForm.value.subject,
    preview: composeForm.value.body.substring(0, 100) + '...',
    content: formatEmailContent(composeForm.value.body),
    timestamp: new Date(),
    read: true,
    important: false,
    hasAttachment: false,
    attachments: [],
    folder: 'sent'
  };

  emails.value.push(newEmail);
  updateFolderCounts();
  showCompose.value = false;
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

initializeEmails();
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/Email.scss';
</style>
