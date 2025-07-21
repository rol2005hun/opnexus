<template>
  <div class="app-chat">
    
    <div class="chat-list">
      <div class="chat-header">
        <h3>Messages</h3>
        <div class="chat-controls">
          <select v-model="chatFilter" class="filter-select">
            <option value="own">My Chats</option>
            <option value="all">All Accessible</option>
            <option value="evidence">Evidence Only</option>
          </select>
          <button class="new-chat-btn" @click="showNewChatDialog = true">+</button>
        </div>
      </div>

      <div class="chats">
        <div v-for="chat in filteredChats" :key="chat.id" class="chat-item" 
          :class="{ active: activeChat === chat.id }"
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
            {{ activeChatData.isOwnChat ? 'Read-only conversation' : 'You cannot send messages to this private conversation' }}
          </div>
        </div>
      </div>

      <div v-else class="no-chat-selected">
        <p>Select a conversation</p>
      </div>
    </div>

    <!-- New Chat Dialog -->
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
import { ref, computed, nextTick } from 'vue';
import { useGameStore } from '@/stores/game';
import type { Chat, ChatMessage, ChatFilter, NewChatRequest } from '@/types/chat';
import type { Character, StoryContent } from '@/types/content';
import { nexusCorpLeakStory } from '@/stories/nexus-corp-leak';

const gameStore = useGameStore();

// Reactive state
const activeChat = ref<string | null>(null);
const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();
const showNewChatDialog = ref(false);
const chatFilter = ref<'own' | 'all' | 'evidence'>('own');

// New chat dialog state
const newChatType = ref<'private' | 'group'>('private');
const newChatName = ref('');
const selectedCharacters = ref<string[]>([]);

// Get current story data
const currentStory = computed((): StoryContent | null => {
  if (!gameStore.currentStory) return null;
  return nexusCorpLeakStory;
});

// Get player name dynamically
const playerName = computed(() => {
  const playerChar = currentStory.value?.characters.find((char: Character) => char.isPlayer);
  return playerChar?.name || 'Digital Investigator';
});

// Available characters for new chats (excluding player)
const availableCharacters = computed(() => {
  if (!currentStory.value) return [];
  return currentStory.value.characters.filter((char: Character) => 
    !char.isPlayer && 
    !char.name.includes('Unknown') && 
    !char.name.includes('External')
  );
});

// Helper function to get character avatar
const getCharacterAvatar = (name: string): string => {
  if (!currentStory.value) return '👤';
  
  const character = currentStory.value.characters.find((char: Character) => char.name === name);
  if (character?.avatar) return character.avatar;
  
  // Generate avatar based on name
  if (name.includes('Unknown') || name.includes('External')) return '🕵️';
  if (name.toLowerCase().includes('group') || name.toLowerCase().includes('team')) return '👥';
  
  const femaleNames = ['irene', 'sophie', 'chloe', 'sarah', 'lisa', 'anna', 'maria'];
  const firstName = name.split(' ')[0]?.toLowerCase() || '';
  return femaleNames.includes(firstName) ? '👩‍💼' : '👨‍💼';
};

// Convert story chat data to Chat format
const allChats = computed((): Chat[] => {
  // Demo data for now - ezt később a story adatokból fogjuk betölteni
  return [
    {
      id: 'chat1',
      name: 'John Smith',
      avatar: '👨‍💼',
      participants: ['Digital Investigator', 'John Smith'],
      type: 'private',
      status: 'online',
      lastMessage: 'Thanks for the files',
      lastMessageTime: new Date('2025-01-15T16:50:00'),
      unreadCount: 2,
      isOwnChat: true,
      canSendMessage: true,
      canView: true,
      isEvidence: true,
      platform: 'Internal Chat',
      messages: [
        {
          id: 'm1',
          content: 'Hi, we agreed you\'d send me something today',
          timestamp: new Date('2025-01-15T14:20:00'),
          sender: 'John Smith',
          sent: false
        },
        {
          id: 'm2',
          content: 'Yes, I\'ll send the documents by email',
          timestamp: new Date('2025-01-15T14:25:00'),
          sender: 'Digital Investigator',
          sent: true
        },
        {
          id: 'm3',
          content: 'Are you sure it\'s safe?',
          timestamp: new Date('2025-01-15T14:26:00'),
          sender: 'John Smith',
          sent: false
        },
        {
          id: 'm4',
          content: 'Yes, no one will find out. I\'ll send it to the usual email address',
          timestamp: new Date('2025-01-15T14:30:00'),
          sender: 'Digital Investigator',
          sent: true
        },
        {
          id: 'm5',
          content: 'Alright, and the money?',
          timestamp: new Date('2025-01-15T16:45:00'),
          sender: 'John Smith',
          sent: false
        },
        {
          id: 'm6',
          content: 'Thanks for the files',
          timestamp: new Date('2025-01-15T16:50:00'),
          sender: 'John Smith',
          sent: false
        }
      ]
    },
    {
      id: 'chat2',
      name: 'Marketing Team',
      avatar: '👥',
      participants: ['Digital Investigator', 'Anna Williams', 'Mike Johnson'],
      type: 'group',
      status: 'online',
      lastMessage: 'Meeting at 3 PM',
      lastMessageTime: new Date('2025-01-14T18:30:00'),
      unreadCount: 0,
      isOwnChat: true,
      canSendMessage: true,
      canView: true,
      platform: 'Teams',
      messages: [
        {
          id: 'm7',
          content: 'Hi everyone, quarterly review meeting tomorrow',
          timestamp: new Date('2025-01-14T17:00:00'),
          sender: 'Anna Williams',
          sent: false
        },
        {
          id: 'm8',
          content: 'What time?',
          timestamp: new Date('2025-01-14T17:15:00'),
          sender: 'Digital Investigator',
          sent: true
        },
        {
          id: 'm9',
          content: 'Meeting at 3 PM',
          timestamp: new Date('2025-01-14T18:30:00'),
          sender: 'Mike Johnson',
          sent: false
        }
      ]
    },
    {
      id: 'chat3',
      name: 'Suspicious Private Chat',
      avatar: '🕵️',
      participants: ['John Smith', 'Unknown Contact'],
      type: 'private',
      status: 'offline',
      lastMessage: 'Payment confirmed',
      lastMessageTime: new Date('2025-01-13T11:15:00'),
      unreadCount: 0,
      isOwnChat: false,
      canSendMessage: false,
      canView: true,
      isEvidence: true,
      platform: 'Encrypted Chat',
      messages: [
        {
          id: 'm10',
          content: 'The files are ready',
          timestamp: new Date('2025-01-13T10:30:00'),
          sender: 'John Smith',
          sent: false
        },
        {
          id: 'm11',
          content: 'Good, how much?',
          timestamp: new Date('2025-01-13T10:45:00'),
          sender: 'Unknown Contact',
          sent: false
        },
        {
          id: 'm12',
          content: '$5000 as agreed',
          timestamp: new Date('2025-01-13T11:00:00'),
          sender: 'John Smith',
          sent: false
        },
        {
          id: 'm13',
          content: 'Payment confirmed',
          timestamp: new Date('2025-01-13T11:15:00'),
          sender: 'Unknown Contact',
          sent: false
        }
      ]
    }
  ];
});

// Filtered chats based on current filter
const filteredChats = computed(() => {
  switch (chatFilter.value) {
    case 'own':
      return allChats.value.filter(chat => chat.isOwnChat);
    case 'evidence':
      return allChats.value.filter(chat => chat.isEvidence);
    case 'all':
    default:
      return allChats.value.filter(chat => chat.canView);
  }
});

// Active chat data
const activeChatData = computed(() => {
  if (!activeChat.value) return null;
  return allChats.value.find(chat => chat.id === activeChat.value);
});

// Functions
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

  const message: ChatMessage = {
    id: 'msg_' + Date.now(),
    content: newMessage.value.trim(),
    timestamp: new Date(),
    sent: true,
    sender: playerName.value
  };

  activeChatData.value.messages.push(message);
  activeChatData.value.lastMessage = message.content;
  activeChatData.value.lastMessageTime = message.timestamp;

  newMessage.value = '';

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const getParticipantsDisplay = (chat: Chat): string => {
  if (chat.type === 'private') return '';
  
  // Group chat esetén mutassa a résztvevőket, kivéve a player-t
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

// New chat functionality
const toggleCharacterSelection = (characterId: string) => {
  const index = selectedCharacters.value.indexOf(characterId);
  if (index > -1) {
    selectedCharacters.value.splice(index, 1);
  } else {
    // Private chat csak 1 másik személlyel
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
  
  const newChatId = 'chat_' + Date.now();
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
  
  // Itt majd a store-ba fogjuk menteni
  allChats.value.push(newChat);
  activeChat.value = newChatId;
  
  // Reset dialog
  showNewChatDialog.value = false;
  selectedCharacters.value = [];
  newChatName.value = '';
  newChatType.value = 'private';
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;
@use "sass:color";

.app-chat {
    position: relative;
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100%;
  background: $window-bg;
  overflow: hidden;
}

.chat-list {
  background: $bg-secondary;
  border-right: 1px solid #444;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .chat-header {
    padding: 1rem;
    border-bottom: 1px solid #444;
    flex-shrink: 0;

    h3 {
      margin: 0 0 0.5rem 0;
      color: $text-primary;
    }

    .chat-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      .filter-select {
        flex: 1;
        padding: 4px 8px;
        border: 1px solid #444;
        border-radius: 4px;
        background: $window-bg;
        color: $text-primary;
        font-size: 0.8rem;

        &:focus {
          border-color: $accent-blue;
          outline: none;
        }
      }

      .new-chat-btn {
        background: $accent-blue;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: color.adjust($accent-blue, $lightness: 10%);
        }
      }
    }
  }

  .chats {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .chat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    border-bottom: 1px solid #333;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &.active {
      background: $accent-blue;
      color: white;

      .chat-info {
        .chat-last-message,
        .chat-time,
        .chat-participants {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    .chat-avatar {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $bg-tertiary;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .chat-info {
      flex: 1;
      min-width: 0;

      .chat-name {
        font-weight: 600;
        margin-bottom: 2px;
        color: $text-primary;
        display: flex;
        align-items: center;
        gap: 4px;

        .group-indicator,
        .evidence-indicator {
          font-size: 0.8rem;
        }
      }

      .chat-participants {
        font-size: 0.75rem;
        color: $text-secondary;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-style: italic;
      }

      .chat-last-message {
        font-size: 0.8rem;
        color: $text-secondary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 2px;
        max-width: 200px;
      }

      .chat-time {
        font-size: 0.7rem;
        color: $text-muted;
      }
    }

    .unread-badge {
      background: $accent-red;
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 0.7rem;
      font-weight: bold;
      min-width: 16px;
      text-align: center;
    }
  }
}

.message-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .chat-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat-header-bar {
    padding: 1rem;
    border-bottom: 1px solid #444;
    background: $bg-secondary;
    flex-shrink: 0;

    .contact-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .contact-avatar {
        font-size: 2rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $bg-tertiary;
        border-radius: 50%;
      }

      .contact-details {
        .contact-name {
          font-weight: 600;
          color: $text-primary;
          margin-bottom: 2px;

          .group-label {
            font-size: 0.8rem;
            color: $text-secondary;
            font-weight: normal;
          }
        }

        .contact-participants {
          font-size: 0.8rem;
          color: $text-secondary;
          margin-bottom: 2px;
          font-style: italic;
        }

        .contact-status {
          font-size: 0.8rem;
          color: $text-primary;

          &.status-away {
            color: $accent-orange;
          }

          &.status-online {
            color: $accent-green;
          }

          &.status-offline {
            color: $text-muted;
          }

          &.status-busy {
            color: $accent-red;
          }
        }
      }
    }
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .message {
    display: flex;
    flex-direction: column;
    max-width: 70%;

    &.sent {
      align-self: flex-end;

      .message-content {
        background: $accent-blue;
        color: white;
        border-radius: 18px 18px 4px 18px;
      }

      .message-time {
        text-align: right;
      }
    }

    &.received {
      align-self: flex-start;

      .message-content {
        background: $bg-secondary;
        color: $text-primary;
        border-radius: 18px 18px 18px 4px;
      }

      .message-time {
        text-align: left;
      }
    }

    .message-sender {
      font-size: 0.75rem;
      color: $accent-blue;
      font-weight: 600;
      margin-bottom: 2px;
      padding: 0 4px;
    }

    .message-content {
      padding: 8px 16px;
      margin-bottom: 4px;
      word-wrap: break-word;
      line-height: 1.4;
    }

    .message-time {
      font-size: 0.7rem;
      color: $text-muted;
      padding: 0 4px;
    }
  }

  .message-input {
    padding: 1rem;
    border-top: 1px solid #444;
    display: flex;
    gap: 8px;
    background: $bg-secondary;
    flex-shrink: 0;

    input {
      flex: 1;
      padding: 10px 16px;
      border: 1px solid #444;
      border-radius: 20px;
      background: $window-bg;
      color: $text-primary;
      outline: none;

      &:focus {
        border-color: $accent-blue;
      }

      &::placeholder {
        color: $text-muted;
      }
    }

    button {
      padding: 10px 16px;
      border: none;
      border-radius: 20px;
      background: $accent-blue;
      color: white;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover:not(:disabled) {
        background: color.adjust($accent-blue, $lightness: 10%);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .message-input-disabled {
    padding: 1rem;
    border-top: 1px solid #444;
    background: $bg-secondary;
    flex-shrink: 0;
    text-align: center;

    .disabled-text {
      color: $text-muted;
      font-style: italic;
      font-size: 0.9rem;
    }
  }

  .no-chat-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $text-secondary;
    font-style: italic;
  }
}

// New Chat Dialog
.new-chat-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog-content {
    background: $bg-primary;
    border: 1px solid #444;
    border-radius: 8px;
    width: 600px;
    max-width: 90vw;
    max-height: 80vh;
    overflow: hidden;

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #444;
      background: $bg-secondary;

      h3 {
        margin: 0;
        color: $text-primary;
      }

      .close-btn {
        background: none;
        border: none;
        color: $text-secondary;
        font-size: 1.2rem;
        cursor: pointer;
        
        &:hover {
          color: $text-primary;
        }
      }
    }

    .dialog-body {
      padding: 20px;

      .chat-type-selector {
        margin-bottom: 16px;
        display: flex;
        gap: 1rem;

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: $text-primary;
          cursor: pointer;
          font-weight: 600;

          input[type="radio"] {
            accent-color: $accent-blue;
          }
        }
      }

      .group-name-input {
        margin-bottom: 16px;

        input {
          width: 100%;
          padding: 8px 12px;
          background: $bg-secondary;
          border: 1px solid #444;
          border-radius: 4px;
          color: $text-primary;
          font-family: inherit;

          &:focus {
            outline: none;
            border-color: $accent-blue;
          }

          &::placeholder {
            color: $text-muted;
          }
        }
      }

      .character-list {
        margin-bottom: 16px;

        h4 {
          margin: 0 0 8px 0;
          color: $text-primary;
          font-weight: 600;
        }

        .character-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s ease;
          position: relative;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .character-avatar {
            font-size: 1.2rem;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: $bg-tertiary;
            border-radius: 50%;
          }

          .character-info {
            flex: 1;

            .character-name {
              font-weight: 600;
              color: $text-primary;
              font-size: 0.9rem;
            }

            .character-role {
              font-size: 0.8rem;
              color: $text-secondary;
            }
          }

          .selected-indicator {
            color: $accent-green;
            font-weight: bold;
          }
        }
      }

      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;

        .create-btn {
          background: $accent-blue;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;

          &:hover:not(:disabled) {
            background: color.adjust($accent-blue, $lightness: 10%);
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }

        .cancel-btn {
          background: $bg-secondary;
          color: $text-primary;
          border: 1px solid #444;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: color.adjust($bg-secondary, $lightness: 5%);
          }
        }
      }
    }
  }
}
</style>
