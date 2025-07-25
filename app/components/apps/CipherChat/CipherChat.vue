<template>
  <div class="app-cipher-chat">
    <ChatList :chats="filteredChats" :active-chat="activeChat" :chat-filter="chatFilter" :player-name="playerName"
      @select-chat="selectChat" @refresh="refreshChats" @new-chat="showNewChatDialog = true"
      @move-to-trash="moveToTrash" @restore-from-trash="restoreFromTrash" @permanent-delete="permanentDelete"
      @update:chat-filter="chatFilter = $event" />

    <MessageArea :chat="activeChatData || null" :player-name="playerName"
      :is-marked-as-evidence="activeChatData ? isMarkedAsEvidence(activeChatData.id) : false"
      @send-message="handleSendMessage" @toggle-evidence="toggleEvidence" />

    <NewChatDialog :show="showNewChatDialog" :available-characters="availableCharacters"
      @close="showNewChatDialog = false" @create="handleCreateChat" />
  </div>
</template>

<script setup lang="ts">
import ChatList from '@/components/apps/CipherChat/ChatList.vue';
import MessageArea from '@/components/apps/CipherChat/MessageArea.vue';
import NewChatDialog from '@/components/apps/CipherChat/NewChatDialog.vue';

const gameStore = useGameStore();
const authStore = useAuthStore();

const activeChat = ref<string | null>(null);
const showNewChatDialog = ref(false);
const chatFilter = ref<'chats' | 'own' | 'all' | 'observed' | 'trash'>('chats');
const currentMissionContent = ref<MissionContent | null>(null);
const customChats = ref<Chat[]>([]);
const deletedChatIds = ref<Set<string>>(new Set());
const permanentlyDeletedChatIds = ref<Set<string>>(new Set());

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

const enrichChatData = (chat: Chat): Chat => {
  const lastMessage = chat.messages[chat.messages.length - 1];

  return {
    ...chat,
    name: chat.name || chat.title || chat.groupName || chat.participants.join(', '),
    avatar: chat.avatar || getCharacterAvatar(chat.participants[0] || ''),
    type: chat.type || (chat.participants.length > 2 ? 'group' : 'private'),
    status: chat.status || 'offline',
    lastMessage: chat.lastMessage || lastMessage?.content || '',
    lastMessageTime: chat.lastMessageTime || new Date(lastMessage?.timestamp || Date.now()),
    unreadCount: chat.unreadCount || 0,
    isOwnChat: chat.isOwnChat !== undefined ? chat.isOwnChat : chat.participants.includes(playerName.value),
    canSendMessage: chat.canSendMessage !== undefined ? chat.canSendMessage : false,
    canView: chat.canView !== undefined ? chat.canView : true,
    isEvidence: chat.isEvidence,
    platform: chat.platform
  };
};

const allChats = computed((): Chat[] => {
  if (!currentMissionContent.value) return [];

  const missionChats = currentMissionContent.value.chatMessages.map(enrichChatData);
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
    const timeA = new Date(a.lastMessageTime || 0).getTime();
    const timeB = new Date(b.lastMessageTime || 0).getTime();
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

  if (chat && (chat.unreadCount || 0) > 0 && gameStore.currentMission) {
    chat.unreadCount = 0;
    gameStore.markMessageRead(gameStore.currentMission, chatId);

    if (chat.isEvidence) {
      gameStore.toggleEvidence(gameStore.currentMission, `chat_evidence_${chatId}`);
    }
  }
};

const handleSendMessage = (message: string) => {
  if (!activeChatData.value || !activeChatData.value.canSendMessage) return;

  const chatMessage: ChatMessage = {
    id: 'msg_' + Date.now(),
    content: message,
    timestamp: new Date(),
    sent: true,
    sender: playerName.value
  };

  activeChatData.value.messages.push(chatMessage);
  activeChatData.value.lastMessage = chatMessage.content;
  activeChatData.value.lastMessageTime = chatMessage.timestamp;
};

const handleCreateChat = (data: { type: 'private' | 'group'; name: string; selectedCharacters: string[] }) => {
  if (data.selectedCharacters.length === 0) return;

  const participants = [playerName.value];
  const characterNames = data.selectedCharacters.map(id => {
    const char = availableCharacters.value.find(c => c.id === id);
    return char?.name || 'Unknown';
  });
  participants.push(...characterNames);

  const newChatId = 'custom_chat_' + Date.now();
  const chatName = data.type === 'group'
    ? (data.name || 'New Group Chat')
    : (characterNames[0] || 'Unknown');

  const newChat: Chat = {
    id: newChatId,
    name: chatName,
    avatar: data.type === 'group' ? '👥' : getCharacterAvatar(characterNames[0] || 'Unknown'),
    participants,
    type: data.type,
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
@use '@/assets/scss/components/apps/CipherChat/CipherChat.scss';
</style>