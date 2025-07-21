<template>
  <div class="app-messages">
    <!-- Chat List -->
    <div class="chat-list">
      <div class="chat-header">
        <h3>Messages</h3>
        <button class="new-chat-btn">+</button>
      </div>

      <div class="chats">
        <div v-for="chat in chats" :key="chat.id" class="chat-item" :class="{ active: activeChat === chat.id }"
          @click="activeChat = chat.id">
          <div class="chat-avatar">{{ chat.avatar }}</div>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-last-message">{{ chat.lastMessage }}</div>
            <div class="chat-time">{{ formatTime(chat.lastMessageTime) }}</div>
          </div>
          <div v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</div>
        </div>
      </div>
    </div>

    <!-- Message Area -->
    <div class="message-area">
      <div v-if="activeChatData" class="chat-view">
        <!-- Chat Header -->
        <div class="chat-header-bar">
          <div class="contact-info">
            <div class="contact-avatar">{{ activeChatData.avatar }}</div>
            <div class="contact-details">
              <div class="contact-name">{{ activeChatData.name }}</div>
              <div class="contact-status" :class="getStatusClass(activeChatData.status)">{{ activeChatData.status }}
              </div>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="messages" ref="messagesContainer">
          <div v-for="message in activeChatData.messages" :key="message.id" class="message"
            :class="{ sent: message.sent, received: !message.sent }">
            <div class="message-content">
              {{ message.content }}
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="message-input">
          <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage">
          <button @click="sendMessage" :disabled="!newMessage.trim()">📤</button>
        </div>
      </div>

      <div v-else class="no-chat-selected">
        <p>Select a conversation</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

interface Message {
  id: string
  content: string
  timestamp: Date
  sent: boolean
}

interface Chat {
  id: string
  name: string
  avatar: string
  status: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
}

const activeChat = ref<string | null>('chat1');
const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();

const chats: Chat[] = [
  {
    id: 'chat1',
    name: 'John Smith',
    avatar: '👤',
    status: 'Online',
    lastMessage: 'Thanks for the files',
    lastMessageTime: new Date('2025-01-15T16:50:00'),
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        content: 'Hi Peter, we agreed you\'d send me something today',
        timestamp: new Date('2025-01-15T14:20:00'),
        sent: false
      },
      {
        id: 'm2',
        content: 'Yes, I\'ll send the documents by email',
        timestamp: new Date('2025-01-15T14:25:00'),
        sent: true
      },
      {
        id: 'm3',
        content: 'Are you sure it\'s safe?',
        timestamp: new Date('2025-01-15T14:26:00'),
        sent: false
      },
      {
        id: 'm4',
        content: 'Yes, no one will find out. I\'ll send it to the usual email address',
        timestamp: new Date('2025-01-15T14:30:00'),
        sent: true
      },
      {
        id: 'm5',
        content: 'Alright, and the money?',
        timestamp: new Date('2025-01-15T16:45:00'),
        sent: false
      },
      {
        id: 'm6',
        content: 'Thanks for the files',
        timestamp: new Date('2025-01-15T16:50:00'),
        sent: false
      }
    ]
  },
  {
    id: 'chat2',
    name: 'Anna Williams',
    avatar: '👩',
    status: 'Away',
    lastMessage: 'Shall we meet tomorrow?',
    lastMessageTime: new Date('2025-01-14T18:30:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'm7',
        content: 'Hi Peter, is everything okay?',
        timestamp: new Date('2025-01-14T17:00:00'),
        sent: false
      },
      {
        id: 'm8',
        content: 'Yes, just a lot of work lately',
        timestamp: new Date('2025-01-14T17:15:00'),
        sent: true
      },
      {
        id: 'm9',
        content: 'Shall we meet tomorrow?',
        timestamp: new Date('2025-01-14T18:30:00'),
        sent: false
      }
    ]
  },
  {
    id: 'chat3',
    name: 'IT Support',
    avatar: '🔧',
    status: 'Online',
    lastMessage: 'Password changed',
    lastMessageTime: new Date('2025-01-13T11:15:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'm10',
        content: 'I have an issue with my access',
        timestamp: new Date('2025-01-13T10:30:00'),
        sent: true
      },
      {
        id: 'm11',
        content: 'What kind of issue? Can\'t log in?',
        timestamp: new Date('2025-01-13T10:45:00'),
        sent: false
      },
      {
        id: 'm12',
        content: 'Yes, I forgot my password',
        timestamp: new Date('2025-01-13T11:00:00'),
        sent: true
      },
      {
        id: 'm13',
        content: 'Password changed',
        timestamp: new Date('2025-01-13T11:15:00'),
        sent: false
      }
    ]
  }
]

const activeChatData = computed(() => {
  if (!activeChat.value) return null;
  const chat = chats.find(chat => chat.id === activeChat.value);

  if (chat && chat.unreadCount > 0 && gameStore.currentStory) {
    chat.unreadCount = 0;
    gameStore.markMessageRead(gameStore.currentStory, activeChat.value);

    if (activeChat.value === 'chat1') {
      gameStore.addEvidence(gameStore.currentStory, 'john_smith_conspiracy_chat');
    }
  }

  return chat;
});

const sendMessage = () => {
  if (!newMessage.value.trim() || !activeChatData.value) return;

  const message: Message = {
    id: 'msg_' + Date.now(),
    content: newMessage.value.trim(),
    timestamp: new Date(),
    sent: true
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
</script>

<style lang="scss" scoped>
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
    border-bottom: 1px solid #333;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &.active {
      background: $accent-blue;
      color: white;
    }

    .chat-avatar {
      font-size: 2rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $bg-tertiary;
      border-radius: 50%;
    }

    .chat-info {
      flex: 1;
      min-width: 0;

      .chat-name {
        font-weight: 600;
        margin-bottom: 4px;
        color: $text-primary;
      }

      .chat-last-message {
        font-size: 0.8rem;
        color: $text-secondary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 2px;
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
      min-width: 18px;
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
