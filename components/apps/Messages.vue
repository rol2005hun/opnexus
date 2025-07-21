<template>
  <div class="app-messages">

    <div class="chat-list">
      <div class="chat-header">
        <h3>Messages</h3>
        <button class="new-chat-btn" @click="showNewChatDialog = true">+</button>
      </div>

      <div class="chats">
        <div v-for="chat in chats" :key="chat.id" class="chat-item" :class="{ active: activeChat === chat.id }"
          @click="viewChat(chat.id)">
          <div class="chat-avatar">{{ chat.avatar }}</div>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-last-message">{{ chat.lastMessage }}</div>
            <div class="chat-time">{{ formatTime(chat.lastMessageTime) }}</div>
          </div>
          <div v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</div>
        </div>
      </div>

      <!-- New Chat Dialog -->
      <div v-if="showNewChatDialog" class="new-chat-dialog">
        <div class="dialog-content">
          <h4>Start New Chat</h4>
          <div class="character-list">
            <div v-for="character in availableCharacters" :key="character.id" class="character-item"
              @click="createNewChat(character.id)">
              <div class="character-avatar">{{ getCharacterAvatar(character.name) }}</div>
              <div class="character-info">
                <div class="character-name">{{ character.name }}</div>
                <div class="character-role">{{ character.role }}</div>
              </div>
            </div>
          </div>
          <button class="cancel-btn" @click="showNewChatDialog = false">Cancel</button>
        </div>
      </div>
    </div>

    <div class="message-area">
      <div v-if="activeChatData" class="chat-view">

        <div class="chat-header-bar">
          <div class="contact-info">
            <div class="contact-avatar">{{ activeChatData.avatar }}</div>
            <div class="contact-details">
              <div class="contact-name">{{ activeChatData.name }}</div>
              <div class="contact-participants" v-if="activeChatData.isGroupChat">
                {{ activeChatData.participants.join(', ') }}
              </div>
              <div class="contact-status" :class="getStatusClass(activeChatData.status)">
                {{ activeChatData.platform }} • {{ activeChatData.status }}
              </div>
            </div>
          </div>
        </div>

        <div class="messages" ref="messagesContainer">
          <div v-for="message in activeChatData.messages" :key="message.id" class="message"
            :class="{ sent: message.sent, received: !message.sent }">
            <div v-if="activeChatData.isGroupChat && !message.sent" class="message-sender">
              {{ message.sender }}
            </div>
            <div class="message-content">
              {{ message.content }}
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>

        <div class="message-input" v-if="activeChatData?.canSendMessage">
          <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage">
          <button @click="sendMessage" :disabled="!newMessage.trim()">📤</button>
        </div>
        <div v-else-if="activeChatData && !activeChatData.canSendMessage" class="message-input-disabled">
          <div class="disabled-text">This is a read-only conversation</div>
        </div>
      </div>

      <div v-else class="no-chat-selected">
        <p>Select a conversation</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useGameStore } from '@/stores/game';
import type { ChatConversation, Character, StoryContent } from '@/utils/storyContent';
import { nexusCorpLeakStory } from '@/stories/nexus-corp-leak';

const gameStore = useGameStore();

interface Message {
  id: string
  content: string
  timestamp: Date
  sent: boolean
  sender: string
}

interface Chat {
  id: string
  name: string
  participants: string[]
  platform: string
  avatar: string
  status: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
  isGroupChat: boolean
  canSendMessage: boolean
}

const activeChat = ref<string | null>(null);
const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();
const showNewChatDialog = ref(false);

// Get current story data - for now using nexusCorpLeakStory directly
// TODO: Make this dynamic based on gameStore.currentStory
const currentStory = computed((): StoryContent | null => {
  if (!gameStore.currentStory) return null;
  // For now, we only have one story
  return nexusCorpLeakStory;
});

const playerCharacter = computed(() => {
  if (!currentStory.value) return null;
  return currentStory.value.characters.find((char: Character) => char.isPlayer) || currentStory.value.characters[0];
});

// Helper function to get character avatar
const getCharacterAvatar = (name: string): string => {
  if (!currentStory.value) return '👤';

  const character = currentStory.value.characters.find((char: Character) => char.name === name);
  if (character?.avatar) return character.avatar;

  // Generate avatar based on name
  if (name.includes('Unknown') || name.includes('External')) return '🕵️';
  if (name.toLowerCase().includes('group') || name.toLowerCase().includes('team')) return '👥';

  // Gender-based avatars (simple heuristic)
  const femaleNames = ['irene', 'sophie', 'chloe', 'sarah', 'lisa', 'anna', 'maria'];
  const firstName = name.split(' ')[0]?.toLowerCase() || '';
  return femaleNames.includes(firstName) ? '👩‍💼' : '👨‍💼';
};

// Convert story chat conversations to Chat interface format
const chats = computed((): Chat[] => {
  if (!currentStory.value?.chatMessages) return [];

  return currentStory.value.chatMessages.map((conversation: ChatConversation) => {
    const messages: Message[] = conversation.messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      sent: msg.sender === playerCharacter.value?.name,
      sender: msg.sender
    }));

    const lastMessage = messages[messages.length - 1];
    const isGroupChat = conversation.participants.length > 2;

    // Generate chat name based on participants
    let chatName = '';
    if (isGroupChat) {
      chatName = conversation.title || 'Group Chat';
    } else {
      // For 1-on-1 chats, show the other person's name
      const otherParticipant = conversation.participants.find((p: string) => p !== playerCharacter.value?.name);
      chatName = otherParticipant || conversation.participants[0] || 'Unknown';
    }

    // Determine if user can send messages (only group chats or conversations with story characters)
    const canSendMessage = isGroupChat || conversation.participants.some((p: string) =>
      currentStory.value?.characters.find((char: Character) => char.name === p && !char.isPlayer)
    );

    return {
      id: conversation.id,
      name: chatName,
      participants: conversation.participants,
      platform: conversation.platform,
      avatar: isGroupChat ? '�' : getCharacterAvatar(chatName),
      status: conversation.platform === 'SecureChat' ? 'Encrypted' :
        conversation.platform === 'Teams' ? 'Group Chat' : 'Online',
      lastMessage: lastMessage?.content || 'No messages',
      lastMessageTime: lastMessage?.timestamp || new Date(),
      unreadCount: conversation.isEvidence ? 2 : 0,
      messages,
      isGroupChat,
      canSendMessage
    };
  });
});

const activeChatData = computed(() => {
  if (!activeChat.value) return null;
  return chats.value.find((chat: Chat) => chat.id === activeChat.value);
});

const sendMessage = () => {
  if (!newMessage.value.trim() || !activeChatData.value || !activeChatData.value.canSendMessage) return;

  const message: Message = {
    id: 'msg_' + Date.now(),
    content: newMessage.value.trim(),
    timestamp: new Date(),
    sent: true,
    sender: playerCharacter.value?.name || 'Player'
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

// Mark chat as evidence and read when viewed
const viewChat = (chatId: string) => {
  activeChat.value = chatId;
  const chat = chats.value.find((c: Chat) => c.id === chatId);

  if (chat && chat.unreadCount > 0 && gameStore.currentStory) {
    chat.unreadCount = 0;
    gameStore.markMessageRead(gameStore.currentStory, chatId);

    // Mark as evidence for investigation
    gameStore.addEvidence(gameStore.currentStory, `chat_evidence_${chatId}`);
  }

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
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
    case 'encrypted':
      return 'status-encrypted';
    default:
      return 'status-default';
  }
};

// Available story characters for new chats
const availableCharacters = computed(() => {
  if (!currentStory.value) return [];
  return currentStory.value.characters.filter((char: Character) => !char.isPlayer);
});

const createNewChat = (characterId: string) => {
  const character = availableCharacters.value.find((char: Character) => char.id === characterId);
  if (!character || !currentStory.value) return;

  // Check if chat already exists
  const existingChat = chats.value.find((chat: Chat) =>
    chat.participants.length === 2 &&
    chat.participants.includes(character.name) &&
    chat.participants.includes(playerCharacter.value?.name || '')
  );

  if (existingChat) {
    activeChat.value = existingChat.id;
    showNewChatDialog.value = false;
    return;
  }

  // Create new chat conversation
  const newConversation: ChatConversation = {
    id: 'new_chat_' + Date.now(),
    platform: 'Internal Chat',
    participants: [playerCharacter.value?.name || 'Player', character.name],
    messages: [],
    isEvidence: false,
    title: `Chat with ${character.name}`
  };

  // Add to current story
  currentStory.value.chatMessages.push(newConversation);

  activeChat.value = newConversation.id;
  showNewChatDialog.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;
@use "sass:color";

.app-messages {
  display: grid;
  grid-template-columns: 300px 1fr;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    h3 {
      margin: 0;
      color: $text-primary;
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
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &.active {
      background: $accent-blue;
      color: white;

      .chat-info {

        .chat-last-message,
        .chat-time {
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
        color: $text-primary;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .chat-last-message {
        font-size: 0.85rem;
        color: $text-secondary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 2px;
      }

      .chat-time {
        font-size: 0.75rem;
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
    z-index: 100;

    .dialog-content {
      background: $bg-secondary;
      border-radius: 8px;
      padding: 1.5rem;
      width: 280px;
      max-height: 400px;
      display: flex;
      flex-direction: column;

      h4 {
        margin: 0 0 1rem 0;
        color: $text-primary;
        text-align: center;
      }

      .character-list {
        max-height: 250px;
        overflow-y: auto;
        margin-bottom: 1rem;

        .character-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s ease;

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
        }
      }

      .cancel-btn {
        background: $bg-tertiary;
        color: $text-primary;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}

.message-area {
  font-size: 2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-tertiary;
  border-radius: 50%;
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

          &.status-encrypted {
            color: $accent-blue;
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

  .no-chat-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $text-secondary;
    font-style: italic;
  }
}
</style>
