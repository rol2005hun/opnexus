<template>
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
                <button class="refresh-btn" @click="$emit('refresh')" title="Refresh Chats">↻</button>
                <button class="new-chat-btn" @click="$emit('new-chat')">+</button>
            </div>
        </div>

        <div class="chats">
            <div v-for="chat in chats" :key="chat.id" class="chat-item" :class="{ active: activeChat === chat.id }"
                @click="$emit('select-chat', chat.id)">
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
                    <button v-if="chatFilter !== 'trash'" class="action-btn trash"
                        @click.stop="$emit('move-to-trash', chat.id)" title="Move to Trash">🗑️</button>
                    <button v-if="chatFilter === 'trash'" class="action-btn restore"
                        @click.stop="$emit('restore-from-trash', chat.id)" title="Restore">↶</button>
                    <button v-if="chatFilter === 'trash'" class="action-btn delete"
                        @click.stop="$emit('permanent-delete', chat.id)" title="Delete Forever">❌</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Chat } from '#shared/types';

interface Props {
    chats: Chat[];
    activeChat: string | null;
    chatFilter: 'chats' | 'own' | 'all' | 'observed' | 'trash';
    playerName: string;
}

interface Emits {
    (event: 'select-chat', chatId: string): void;
    (event: 'refresh'): void;
    (event: 'new-chat'): void;
    (event: 'move-to-trash', chatId: string): void;
    (event: 'restore-from-trash', chatId: string): void;
    (event: 'permanent-delete', chatId: string): void;
    (event: 'update:chatFilter', value: 'chats' | 'own' | 'all' | 'observed' | 'trash'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const chatFilter = computed({
    get: () => props.chatFilter,
    set: (value) => emit('update:chatFilter', value)
});

const getParticipantsDisplay = (chat: Chat): string => {
    const otherParticipants = chat.participants.filter(p => p !== props.playerName);
    const isPlayer = chat.participants.includes(props.playerName);

    if (isPlayer) {
        return `You + ${otherParticipants.join(', ')}`;
    }
    return otherParticipants.join(', ');
};

const getChatTypeLabel = (chat: Chat): string => {
    const participantsLabel = getParticipantsDisplay(chat);

    if (chat.type === 'private') {
        return `Private chat: ${participantsLabel}`;
    } else {
        return `Group chat: ${participantsLabel}`;
    }
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/CipherChat/ChatList.scss';
</style>
