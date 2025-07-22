<template>
  <div class="app-cipher-chat">

    <div class="chat-list">
      <div class="chat-header">
        <h3>Cipher Messages</h3>
        <div class="chat-controls">
          <select v-model="chatFilter" class="filter-select">
            <option value="all">All Accessible</option>
            <option value="own">My Chats</option>
          </select>
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
            <div class="chat-participants" v-if="chat.type === 'group'">
              {{ getParticipantsDisplay(chat) }}
            </div>
            <div class="chat-last-message">{{ chat.lastMessage }}</div>
            <div class="chat-time">{{ formatTime(chat.lastMessageTime) }}</div>
          </div>
          <div v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</div>
        </div>
      </div>
    </div>

    <div class="message-area">
      <div v-if="activeChatData" class="chat-view">

        <div class="chat-header-bar">
          <div class="contact-info">
            <div class="contact-avatar">{{ activeChatData.avatar }}</div>
            <div class="contact-details">
              <div class="contact-name">
                {{ activeChatData.name }}
                <span v-if="activeChatData.type === 'group'" class="group-label">(Group)</span>
              </div>
              <div v-if="activeChatData.type === 'group'" class="contact-participants">
                {{ getParticipantsDisplay(activeChatData) }}
              </div>
              <div class="contact-status" :class="getStatusClass(activeChatData.status)">
                {{ activeChatData.status }}
                <span v-if="activeChatData.platform"> • {{ activeChatData.platform }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="messages" ref="messagesContainer">
          <div v-for="message in activeChatData.messages" :key="message.id" class="message"
            :class="{ sent: message.sent, received: !message.sent }">
            <div v-if="activeChatData.type === 'group' && !message.sent" class="message-sender">
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
            <button @click="createNewChat" :disabled="selectedCharacters.length === 0" class="create-btn">
              Create Chat
            </button>
            <button @click="showNewChatDialog = false" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import type { Chat, ChatMessage } from '@/types/chat';
import type { Character, StoryContent, EvidenceConversation } from '@/types/content';

const gameStore = useGameStore();

const activeChat = ref<string | null>(null);
const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();
const showNewChatDialog = ref(false);
const chatFilter = ref<'own' | 'all'>('all');
const currentStoryContent = ref<StoryContent | null>(null);
const customChats = ref<Chat[]>([]);
const newChatType = ref<'private' | 'group'>('private');
const newChatName = ref('');
const selectedCharacters = ref<string[]>([]);

const playerName = computed(() => {
  const playerChar = currentStoryContent.value?.characters.find((char: Character) => char.isPlayer);
  return playerChar?.name || 'Digital Investigator';
});

const availableCharacters = computed(() => {
  if (!currentStoryContent.value) return [];
  return currentStoryContent.value.characters.filter((char: Character) =>
    !char.isPlayer &&
    !char.name.includes('Unknown') &&
    !char.name.includes('External')
  );
});

const getCharacterAvatar = (name: string): string => {
  if (!currentStoryContent.value) return '👤';

  const character = currentStoryContent.value.characters.find((char: Character) => char.name === name);
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
  if (!currentStoryContent.value) return [];

  const storyChats = convertEvidenceToChats(currentStoryContent.value.chatMessages);

  return [...storyChats, ...customChats.value];
});

const filteredChats = computed(() => {
  switch (chatFilter.value) {
    case 'own':
      return allChats.value.filter(chat => chat.isOwnChat);
    case 'all':
    default:
      return allChats.value.filter(chat => chat.canView);
  }
});

const activeChatData = computed(() => {
  if (!activeChat.value) return null;
  return allChats.value.find(chat => chat.id === activeChat.value);
});

const selectChat = (chatId: string) => {
  activeChat.value = chatId;
  const chat = allChats.value.find(c => c.id === chatId);

  if (chat && chat.unreadCount > 0 && gameStore.currentStory) {
    chat.unreadCount = 0;
    gameStore.markMessageRead(gameStore.currentStory, chatId);

    if (chat.isEvidence) {
      gameStore.addEvidence(gameStore.currentStory, `chat_evidence_${chatId}`);
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
  if (chat.type === 'private') return '';

  return chat.participants
    .filter(p => p !== playerName.value)
    .join(', ');
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
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
    messages: []
  };

  customChats.value.push(newChat);
  activeChat.value = newChatId;

  showNewChatDialog.value = false;
  selectedCharacters.value = [];
  newChatName.value = '';
  newChatType.value = 'private';
};

onMounted(async () => {
  currentStoryContent.value = await gameStore.getCurrentStoryContent();
});

watch(() => gameStore.currentStory, async (newStoryId) => {
  if (newStoryId) {
    currentStoryContent.value = await gameStore.getCurrentStoryContent();
    activeChat.value = null;
    customChats.value = [];
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/CipherChat.scss';
</style>
