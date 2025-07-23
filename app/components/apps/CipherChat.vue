<template>
  <div class="app-cipher-chat">

    <div class="chat-list">
      <div class="chat-header">
        <h3>Cipher Messages</h3>
        <div class="chat-controls">
          <select v-model="chatFilter" class="filter-select">
            <option value="chats">Chats</option>
            <option value="all">All Chats</option>
            <option value="own">My Chats</option>
            <option value="observed">Agent Accessible Chats</option>
            <option value="trash">Trash</option>
          </select>
          <button class="refresh-btn" @click="refreshChats" title="Refresh Chats">↻</button>
          <button class="new-chat-btn" @click="showNewChatDialog = true">+</button>
        </div>
      </div>

      <div class="chats">
        <div v-for="chat in filteredChats" :key="chat.id" class="chat-item" :class="{ active: activeChat === chat.id }"
          @click="selectChat(chat.id)">
          <div class="chat-avatar">{{ chat.avatar }}</div>
          <div class="chat-info">
            <div class="chat-name">
              {{ chat.name }}
              <span v-if="chat.type === 'group'" class="group-indicator">👥</span>
              <span v-if="chat.isEvidence" class="evidence-indicator">🔍</span>
            </div>
            <div class="chat-type-label">{{ getChatTypeLabel(chat) }}</div>
            <div class="chat-last-message">{{ chat.lastMessage }}</div>
            <div class="chat-time">{{ formatTime(chat.lastMessageTime) }}</div>
          </div>
          <div v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</div>
          <div class="chat-item-actions">
            <button v-if="chatFilter !== 'trash'" class="action-btn trash" @click.stop="moveToTrash(chat.id)"
              title="Move to Trash">🗑️</button>
            <button v-if="chatFilter === 'trash'" class="action-btn restore" @click.stop="restoreFromTrash(chat.id)"
              title="Restore">↶</button>
            <button v-if="chatFilter === 'trash'" class="action-btn delete" @click.stop="permanentDelete(chat.id)"
              title="Delete Forever">❌</button>
          </div>
        </div>
      </div>
    </div>

    <div class="message-area">
      <div v-if="activeChatData" class="chat-view">

        <div class="chat-header-bar">
          <div class="chat-header-content">
            <div class="contact-info">
              <div class="contact-avatar">{{ activeChatData.avatar }}</div>
              <div class="contact-details">
                <div class="contact-name">
                  {{ activeChatData.name }}
                  <span v-if="activeChatData.type === 'group'" class="group-label">(Group)</span>
                </div>
                <div class="chat-type-label chat-type-label-header">{{ getChatTypeLabel(activeChatData) }}</div>
                <div class="contact-status" :class="getStatusClass(activeChatData.status)">
                  {{ activeChatData.status }}
                  <span v-if="activeChatData.platform"> • {{ activeChatData.platform }}</span>
                </div>
              </div>
            </div>
            <button class="mark-evidence-btn" :class="{ 'marked': isMarkedAsEvidence(activeChatData.id) }"
              @click="toggleEvidence(activeChatData.id)">
              {{ isMarkedAsEvidence(activeChatData.id) ? '🔍 Evidence' : '🔍 Mark as Evidence' }}
            </button>
          </div>
        </div>

        <div class="messages" ref="messagesContainer">
          <div v-for="message in activeChatData.messages" :key="message.id" class="message"
            :class="{ sent: message.sent, received: !message.sent }">
            <div v-if="(!activeChatData.isOwnChat || activeChatData.type === 'group') && !message.sent"
              class="message-sender">
              {{ message.sender }}
            </div>
            <div class="message-content">
              {{ message.content }}
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>

        <div v-if="activeChatData.canSendMessage" class="message-input">
          <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage">
          <button @click="sendMessage" :disabled="!newMessage.trim()">📤</button>
        </div>
        <div v-else class="message-input-disabled">
          <div class="disabled-text">
            {{ activeChatData.isOwnChat ? 'Read-only conversation' : `You cannot send messages to this private
            conversation` }}
          </div>
        </div>
      </div>

      <div v-else class="no-chat-selected">
        <p>Select a conversation</p>
      </div>
    </div>

    <div v-if="showNewChatDialog" class="new-chat-dialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>Start New Chat</h3>
          <button class="close-btn" @click="showNewChatDialog = false">✕</button>
        </div>

        <div class="dialog-body">
          <div class="chat-type-selector">
            <label>
              <input type="radio" v-model="newChatType" value="private"> Private Chat
            </label>
            <label>
              <input type="radio" v-model="newChatType" value="group"> Group Chat
            </label>
          </div>

          <div v-if="newChatType === 'group'" class="group-name-input">
            <input v-model="newChatName" type="text" placeholder="Group name...">
          </div>

          <div class="character-list">
            <h4>Select participants:</h4>
            <div v-for="character in availableCharacters" :key="character.id" class="character-item"
              @click="toggleCharacterSelection(character.id)">
              <div class="character-avatar">{{ getCharacterAvatar(character.name) }}</div>
              <div class="character-info">
                <div class="character-name">{{ character.name }}</div>
                <div class="character-role">{{ character.role }}</div>
              </div>
              <div v-if="selectedCharacters.includes(character.id)" class="selected-indicator">✓</div>
            </div>
          </div>

          <div class="dialog-actions">
            <button @click="showNewChatDialog = false" class="cancel-btn">Cancel</button>
            <button @click="createNewChat" :disabled="selectedCharacters.length === 0" class="create-btn">
              Create Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { useAuthStore } from '@/stores/auth';

const gameStore = useGameStore();
const authStore = useAuthStore();

const activeChat = ref<string | null>(null);
const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();
const showNewChatDialog = ref(false);
const chatFilter = ref<'chats' | 'own' | 'all' | 'observed' | 'trash'>('chats');
const currentMissionContent = ref<MissionContent | null>(null);
const customChats = ref<Chat[]>([]);
const deletedChatIds = ref<Set<string>>(new Set());
const permanentlyDeletedChatIds = ref<Set<string>>(new Set());
const newChatType = ref<'private' | 'group'>('private');
const newChatName = ref('');
const selectedCharacters = ref<string[]>([]);

const playerName = computed(() => {
  return authStore.userAgent?.name || 'Agent';
});

const availableCharacters = computed(() => {
  if (!currentMissionContent.value) return [];
  return currentMissionContent.value.characters.filter((char: Character) =>
    !char.isPlayer &&
    !char.name.includes('Unknown') &&
    !char.name.includes('External')
  );
});

const getCharacterAvatar = (name: string): string => {
  if (!currentMissionContent.value) return '👤';

  const character = currentMissionContent.value.characters.find((char: Character) => char.name === name);
  if (character?.avatar) return character.avatar;

  if (name.includes('Unknown') || name.includes('External')) return '🕵️';
  if (name.toLowerCase().includes('group') || name.toLowerCase().includes('team')) return '👥';

  const femaleNames = ['irene', 'sophie', 'chloe', 'sarah', 'lisa', 'anna', 'maria'];
  const firstName = name.split(' ')[0]?.toLowerCase() || '';
  return femaleNames.includes(firstName) ? '👩‍💼' : '👨‍💼';
};

const convertEvidenceToChats = (evidenceConversations: EvidenceConversation[]): Chat[] => {
  return evidenceConversations.map(conv => {
    const lastMessage = conv.messages[conv.messages.length - 1];

    return {
      id: conv.id,
      name: conv.title || conv.groupName || conv.participants.join(', '),
      avatar: getCharacterAvatar(conv.participants[0] || ''),
      participants: conv.participants,
      type: conv.participants.length > 2 ? 'group' : 'private' as 'private' | 'group',
      status: 'offline' as 'online' | 'offline' | 'away' | 'busy',
      lastMessage: lastMessage?.content || '',
      lastMessageTime: new Date(lastMessage?.timestamp || Date.now()),
      unreadCount: 0,
      messages: conv.messages.map(msg => ({
        id: msg.id,
        sender: msg.sender,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
        sent: msg.sender === playerName.value,
        isPlayerMessage: msg.sender === playerName.value
      })),
      isOwnChat: conv.participants.includes(playerName.value),
      canSendMessage: false,
      canView: true,
      isEvidence: conv.isEvidence,
      platform: conv.platform
    };
  });
};

const allChats = computed((): Chat[] => {
  if (!currentMissionContent.value) return [];

  const missionChats = convertEvidenceToChats(currentMissionContent.value.chatMessages);

  return [...missionChats, ...customChats.value];
});

const filteredChats = computed(() => {
  let chats: Chat[] = [];

  switch (chatFilter.value) {
    case 'chats':
      chats = allChats.value.filter(chat => 
        chat.canView && 
        !deletedChatIds.value.has(chat.id) && 
        !permanentlyDeletedChatIds.value.has(chat.id)
      );
      break;
    case 'own':
      chats = allChats.value.filter(chat => 
        chat.isOwnChat && 
        !deletedChatIds.value.has(chat.id) && 
        !permanentlyDeletedChatIds.value.has(chat.id)
      );
      break;
    case 'observed':
      chats = allChats.value.filter(chat => 
        chat.canView && 
        !chat.isOwnChat && 
        !deletedChatIds.value.has(chat.id) && 
        !permanentlyDeletedChatIds.value.has(chat.id)
      );
      break;
    case 'trash':
      chats = allChats.value.filter(chat => 
        deletedChatIds.value.has(chat.id) && 
        !permanentlyDeletedChatIds.value.has(chat.id)
      );
      break;
    case 'all':
    default:
      chats = allChats.value.filter(chat => 
        chat.canView && 
        !deletedChatIds.value.has(chat.id) && 
        !permanentlyDeletedChatIds.value.has(chat.id)
      );
      break;
  }

  return chats.sort((a, b) => {
    const timeA = new Date(a.lastMessageTime).getTime();
    const timeB = new Date(b.lastMessageTime).getTime();
    return timeB - timeA;
  });
});

const activeChatData = computed(() => {
  if (!activeChat.value) return null;
  return allChats.value.find(chat => chat.id === activeChat.value);
});

const selectChat = (chatId: string) => {
  activeChat.value = chatId;
  const chat = allChats.value.find(c => c.id === chatId);

  if (chat && chat.unreadCount > 0 && gameStore.currentMission) {
    chat.unreadCount = 0;
    gameStore.markMessageRead(gameStore.currentMission, chatId);

    if (chat.isEvidence) {
      gameStore.toggleEvidence(gameStore.currentMission, `chat_evidence_${chatId}`);
    }
  }

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = () => {
  if (!newMessage.value.trim() || !activeChatData.value || !activeChatData.value.canSendMessage) return;

  const chatMessage: ChatMessage = {
    id: 'msg_' + Date.now(),
    content: newMessage.value.trim(),
    timestamp: new Date(),
    sent: true,
    sender: playerName.value
  };

  activeChatData.value.messages.push(chatMessage);
  activeChatData.value.lastMessage = chatMessage.content;
  activeChatData.value.lastMessageTime = chatMessage.timestamp;

  newMessage.value = '';

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const getParticipantsDisplay = (chat: Chat): string => {
  const otherParticipants = chat.participants.filter(p => p !== playerName.value);
  const isPlayer = chat.participants.includes(playerName.value);

  if (isPlayer) {
    return `You + ${otherParticipants.join(', ')}`;
  }
  return otherParticipants.join(', ');
};

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'away':
      return 'status-away';
    case 'online':
      return 'status-online';
    case 'offline':
      return 'status-offline';
    case 'busy':
      return 'status-busy';
    default:
      return 'status-default';
  }
};

const getChatTypeLabel = (chat: Chat): string => {
  const participantsLabel = getParticipantsDisplay(chat);

  if (chat.type === 'private') {
    return `Private chat: ${participantsLabel}`;
  } else {
    return `Group chat: ${participantsLabel}`;
  }
};

const toggleCharacterSelection = (characterId: string) => {
  const index = selectedCharacters.value.indexOf(characterId);
  if (index > -1) {
    selectedCharacters.value.splice(index, 1);
  } else {
    if (newChatType.value === 'private') {
      selectedCharacters.value = [characterId];
    } else {
      selectedCharacters.value.push(characterId);
    }
  }
};

const createNewChat = () => {
  if (selectedCharacters.value.length === 0) return;

  const participants = [playerName.value];
  const characterNames = selectedCharacters.value.map(id => {
    const char = availableCharacters.value.find(c => c.id === id);
    return char?.name || 'Unknown';
  });
  participants.push(...characterNames);

  const newChatId = 'custom_chat_' + Date.now();
  const chatName = newChatType.value === 'group'
    ? (newChatName.value || 'New Group Chat')
    : (characterNames[0] || 'Unknown');

  const newChat: Chat = {
    id: newChatId,
    name: chatName,
    avatar: newChatType.value === 'group' ? '👥' : getCharacterAvatar(characterNames[0] || 'Unknown'),
    participants,
    type: newChatType.value,
    status: 'online',
    lastMessage: 'Chat created',
    lastMessageTime: new Date(),
    unreadCount: 0,
    isOwnChat: true,
    canSendMessage: true,
    canView: true,
    platform: 'Internal Chat',
    messages: [],
    deleted: false
  };

  customChats.value.push(newChat);
  activeChat.value = newChatId;

  showNewChatDialog.value = false;
  selectedCharacters.value = [];
  newChatName.value = '';
  newChatType.value = 'private';
};

const isMarkedAsEvidence = (chatId: string) => {
  if (!gameStore.currentMission || !gameStore.currentProgress) return false;
  return gameStore.currentProgress.markedEvidence.includes(chatId);
};

const toggleEvidence = (chatId: string) => {
  if (!gameStore.currentMission) return;
  gameStore.toggleEvidence(gameStore.currentMission, chatId);
};

const moveToTrash = (chatId: string) => {
  deletedChatIds.value.add(chatId);
  if (activeChat.value === chatId) {
    activeChat.value = null;
  }
};

const restoreFromTrash = (chatId: string) => {
  deletedChatIds.value.delete(chatId);
};

const refreshChats = () => {
  deletedChatIds.value.clear();
  permanentlyDeletedChatIds.value.clear();
  activeChat.value = null;
  chatFilter.value = 'chats';
};

const permanentDelete = (chatId: string) => {
  const customChatIndex = customChats.value.findIndex(chat => chat.id === chatId);
  if (customChatIndex !== -1) {
    customChats.value.splice(customChatIndex, 1);
  }
  
  permanentlyDeletedChatIds.value.add(chatId);
  deletedChatIds.value.delete(chatId);
  
  if (activeChat.value === chatId) {
    activeChat.value = null;
  }
};

onMounted(async () => {
  currentMissionContent.value = await gameStore.getCurrentMissionContent();
});

watch(() => gameStore.currentMission, async (newMissionId) => {
  if (newMissionId) {
    currentMissionContent.value = await gameStore.getCurrentMissionContent();
    activeChat.value = null;
    customChats.value = [];
    deletedChatIds.value.clear();
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/CipherChat';
</style>