<template>
  <div class="app-secure-mail">

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
        <div class="header-info">
          <h3>{{ getCurrentFolder()?.name || 'Inbox' }}</h3>
          <span class="email-count">({{ getUnreadCount() }}/{{ currentEmails.length }})</span>
        </div>
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
          <div class="email-sender">{{ displaySender(email) }}</div>
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
          <div class="header-main">
            <h2>{{ selectedEmailData.subject }}</h2>
            <button class="mark-evidence-btn" :class="{ 'marked': isMarkedAsEvidence(selectedEmailData.id) }"
              @click="toggleEvidence(selectedEmailData.id)">
              {{ isMarkedAsEvidence(selectedEmailData.id) ? '🔍 Evidence' : '🔍 Mark as Evidence' }}
            </button>
          </div>
          <div class="email-meta">
            <div><strong>From:</strong> {{ displayEmailAddress(selectedEmailData.sender) }}</div>
            <div><strong>To:</strong> {{ displayRecipients(selectedEmailData) }}</div>
            <div><strong>Date:</strong> {{ formatDateTime(selectedEmailData.timestamp) }}</div>
          </div>
        </div>

        <div class="email-body" v-html="selectedEmailData.content"></div>

        <div v-if="selectedEmailData.attachments?.length" class="email-attachments">
          <h4>Attachments:</h4>
          <div v-for="attachment in selectedEmailData.attachments" :key="attachment.name" class="attachment">
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
            <input v-model="composeForm.to" type="email" required :placeholder="`recipient@${emailDomain}`">
          </div>
          <div class="form-row">
            <label>CC:</label>
            <input v-model="composeForm.cc" type="email" :placeholder="`cc@${emailDomain}`">
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
            <button type="button" class="cancel-btn" @click="closeCompose">Cancel</button>
            <button type="submit" class="send-btn">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const gameStore = useGameStore();

const activeFolder = ref('inbox');
const selectedEmail = ref<string | null>(null);
const showCompose = ref(false);
const currentMissionContent = ref<MissionContent | null>(null);
const composeForm = ref({
  to: '',
  cc: '',
  subject: '',
  body: ''
});

const folders: EmailFolder[] = [
  { id: 'inbox', name: 'Inbox', icon: '📥', unread: 0 },
  { id: 'sent', name: 'Sent', icon: '📤', unread: 0 },
  { id: 'mission', name: 'Mission Access', icon: '🔐', unread: 0 },
  { id: 'drafts', name: 'Drafts', icon: '📝', unread: 0 },
  { id: 'important', name: 'Important', icon: '⭐', unread: 0 },
  { id: 'allmails', name: 'All Mails', icon: '📧', unread: 0 },
  { id: 'trash', name: 'Trash', icon: '🗑️', unread: 0 }
];

const playerEmail = computed(() => {
  if (!authStore.currentUser) return '';
  const domain = currentMissionContent.value?.setting?.playerEmailDomain;
  return `${authStore.currentUser.username}@${domain}`;
});

const emailDomain = computed(() => {
  return currentMissionContent.value?.setting?.playerEmailDomain;
});

const currentUsername = computed(() => {
  return authStore.currentUser?.username || 'agent';
});

const getMissionEmails = (): EmailMessage[] => {
  return currentMissionContent.value?.emails || [];
}

const processEmailContent = (content: string): string => {
  return content.replace(/{username}/g, currentUsername.value);
};

const processEmailAddress = (address: string): string => {
  return address.replace(/{username}/g, currentUsername.value);
};

const processEmails = (rawEmails: EmailMessage[]): ProcessedEmail[] => {
  return rawEmails.map(email => {
    const processedAttachments: EmailAttachment[] = email.attachments || [];

    const processedFrom = processEmailAddress(email.from);
    const processedTo = email.to.map(addr => processEmailAddress(addr));
    const processedSubject = processEmailContent(email.subject);
    const processedBody = processEmailContent(email.body);

    const allRecipients = processedTo.length > 0 ? processedTo : [playerEmail.value];
    const primaryRecipient = allRecipients[0] || playerEmail.value;

    let folder = 'mission';

    const playerEmailValue = playerEmail.value;

    if (processedTo.includes(playerEmailValue) ||
      processedTo.some(recipient => recipient.includes(currentUsername.value))) {
      folder = 'inbox';
    }

    if (processedFrom === playerEmailValue ||
      processedFrom.includes(`${currentUsername.value}@`)) {
      folder = 'sent';
    }

    return {
      id: email.id,
      sender: processedFrom,
      recipient: primaryRecipient,
      subject: processedSubject,
      preview: processedBody.length > 100 ? processedBody.substring(0, 100) + '...' : processedBody,
      content: formatEmailContent(processedBody),
      timestamp: new Date(email.timestamp),
      read: false,
      important: false,
      hasAttachment: (email.attachments?.length || 0) > 0,
      attachments: processedAttachments,
      folder: folder
    };
  });
};

const emails = ref<ProcessedEmail[]>([]);

const initializeEmails = () => {
  const missionEmails = getMissionEmails();
  emails.value = processEmails(missionEmails);
  updateFolderCounts();
};

const updateFolderCounts = () => {
  folders.forEach(folder => {
    if (folder.id === 'important') {
      folder.unread = emails.value.filter(email => email.important && !email.read && email.folder !== 'trash').length;
    } else if (folder.id === 'allmails') {
      folder.unread = emails.value.filter(email => !email.read).length;
    } else if (folder.id === 'sent') {
      folder.unread = emails.value.filter(email => {
        if (email.read || email.folder === 'trash') return false;
        const missionEmail = getMissionEmails().find(e => e.id === email.id);
        if (missionEmail) {
          const processedFrom = processEmailAddress(missionEmail.from);
          return processedFrom === playerEmail.value ||
            processedFrom.includes(`${currentUsername.value}@`) ||
            processedFrom.includes(currentUsername.value);
        }
        return false;
      }).length;
    } else if (folder.id === 'mission') {
      folder.unread = emails.value.filter(email => {
        if (email.read || email.folder === 'trash') return false;

        const missionEmail = getMissionEmails().find(e => e.id === email.id);
        if (missionEmail) {
          const processedFrom = processEmailAddress(missionEmail.from);
          const processedTo = missionEmail.to.map(addr => processEmailAddress(addr));
          const playerEmailValue = playerEmail.value;

          const isFromPlayer = processedFrom === playerEmailValue ||
            processedFrom.includes(`${currentUsername.value}@`);
          const isToPlayer = processedTo.includes(playerEmailValue) ||
            processedTo.some(recipient => recipient.includes(currentUsername.value));

          return !isFromPlayer && !isToPlayer;
        }
        return false;
      }).length;
    } else if (folder.id === 'inbox') {
      folder.unread = emails.value.filter(email => {
        if (email.read || email.folder === 'trash') return false;

        const missionEmail = getMissionEmails().find(e => e.id === email.id);
        if (missionEmail) {
          const processedTo = missionEmail.to.map(addr => processEmailAddress(addr));
          return processedTo.includes(playerEmail.value) ||
            processedTo.some(recipient => recipient.includes(currentUsername.value));
        }
        return false;
      }).length;
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

const getUnreadCount = () => {
  return currentEmails.value.filter(email => !email.read).length;
};

const currentEmails = computed(() => {
  let filteredEmails: ProcessedEmail[] = [];

  if (activeFolder.value === 'important') {
    filteredEmails = emails.value.filter(email => email.important && email.folder !== 'trash');
  } else if (activeFolder.value === 'allmails') {
    filteredEmails = emails.value;
  } else if (activeFolder.value === 'sent') {
    filteredEmails = emails.value.filter(email => {
      if (email.folder === 'trash') return false;
      if (email.folder === 'sent') return true;
      
      const missionEmail = getMissionEmails().find(e => e.id === email.id);
      if (missionEmail) {
        const processedFrom = processEmailAddress(missionEmail.from);
        return processedFrom === playerEmail.value ||
          processedFrom.includes(`${currentUsername.value}@`) ||
          processedFrom.includes(currentUsername.value);
      }
      return false;
    });
  } else if (activeFolder.value === 'mission') {
    filteredEmails = emails.value.filter(email => {
      if (email.folder === 'trash') return false;

      const missionEmail = getMissionEmails().find(e => e.id === email.id);
      if (missionEmail) {
        const processedFrom = processEmailAddress(missionEmail.from);
        const processedTo = missionEmail.to.map(addr => processEmailAddress(addr));
        const playerEmailValue = playerEmail.value;

        const isFromPlayer = processedFrom === playerEmailValue ||
          processedFrom.includes(`${currentUsername.value}@`);
        const isToPlayer = processedTo.includes(playerEmailValue) ||
          processedTo.some(recipient => recipient.includes(currentUsername.value));

        return !isFromPlayer && !isToPlayer;
      }
      return false;
    });
  } else if (activeFolder.value === 'inbox') {
    filteredEmails = emails.value.filter(email => {
      if (email.folder === 'trash') return false;

      const missionEmail = getMissionEmails().find(e => e.id === email.id);
      if (missionEmail) {
        const processedTo = missionEmail.to.map(addr => processEmailAddress(addr));
        return processedTo.includes(playerEmail.value) ||
          processedTo.some(recipient => recipient.includes(currentUsername.value));
      }
      return false;
    });
  } else {
    filteredEmails = emails.value.filter(email => email.folder === activeFolder.value);
  }

  return filteredEmails.sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeB - timeA;
  });
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

    if (gameStore.currentMissionData) {
      gameStore.markEmailRead(gameStore.currentMissionData.id, emailId);
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

const isMarkedAsEvidence = (emailId: string) => {
  if (!gameStore.currentMissionData || !gameStore.currentProgress) return false;
  return gameStore.currentProgress.markedEvidence.includes(emailId);
};

const toggleEvidence = (emailId: string) => {
  if (!gameStore.currentMissionData) return;

  gameStore.toggleEvidence(gameStore.currentMissionData.id, emailId);
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
    sender: playerEmail.value,
    recipient: composeForm.value.to,
    subject: composeForm.value.subject,
    preview: composeForm.value.body.length > 100 ? composeForm.value.body.substring(0, 100) + '...' : composeForm.value.body,
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

const formatDateTime = (date: Date) => {
  return date.toLocaleString('en-US');
};

const formatEmailContent = (content: string): string => {
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<em>$1</em>');
};

function displayEmailAddress(address: string): string {
  const processedAddress = processEmailAddress(address);

  return processedAddress;
}

function displayRecipients(email: ProcessedEmail): string {
  const missionEmail = getMissionEmails().find(e => e.id === email.id);
  if (missionEmail) {
    const recipients: string[] = [];

    if (missionEmail.to && missionEmail.to.length > 0) {
      recipients.push(...missionEmail.to.map(recipient => displayEmailAddress(recipient)));
    }

    if (missionEmail.cc && missionEmail.cc.length > 0) {
      recipients.push(...missionEmail.cc.map(recipient => `${displayEmailAddress(recipient)} (CC)`));
    }

    return recipients.length > 0 ? recipients.join(', ') : displayEmailAddress(email.recipient);
  }

  return displayEmailAddress(email.recipient);
}

function displaySender(email: ProcessedEmail): string {
  return displayEmailAddress(email.sender);
}

onMounted(async () => {
  currentMissionContent.value = await gameStore.getCurrentMissionContent();
  initializeEmails();
});

watch(() => gameStore.currentMissionData, async (newMission) => {
  if (newMission) {
    currentMissionContent.value = await gameStore.getCurrentMissionContent();
    selectedEmail.value = null;
    activeFolder.value = 'inbox';
    initializeEmails();
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/Email';
</style>