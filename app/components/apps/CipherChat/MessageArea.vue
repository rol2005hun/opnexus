<template>
    <div class="message-area">
        <div v-if="chat" class="chat-view">
            <div class="chat-header-bar">
                <div class="chat-header-content">
                    <div class="contact-info">
                        <div class="contact-avatar">{{ chat.avatar }}</div>
                        <div class="contact-details">
                            <div class="contact-name">
                                {{ chat.name }}
                                <span v-if="chat.type === 'group'" class="group-label">(Group)</span>
                            </div>
                            <div class="chat-type-label chat-type-label-header">{{ getChatTypeLabel(chat) }}</div>
                            <div class="contact-status" :class="getStatusClass(chat.status)">
                                {{ chat.status }}
                                <span v-if="chat.platform"> • {{ chat.platform }}</span>
                            </div>
                        </div>
                    </div>
                    <button class="mark-evidence-btn" :class="{ 'marked': isMarkedAsEvidence }"
                        @click="$emit('toggle-evidence', chat.id)">
                        {{ isMarkedAsEvidence ? '🔍 Evidence' : '🔍 Mark as Evidence' }}
                    </button>
                </div>
            </div>

            <div class="messages" ref="messagesContainer">
                <div v-for="message in processedMessages" :key="message.id" class="message"
                    :class="{ sent: message.sent, received: !message.sent }">
                    <div v-if="(!chat.isOwnChat || chat.type === 'group') && !message.sent" class="message-sender">
                        {{ message.sender }}
                    </div>
                    <div class="message-content">
                        {{ message.content }}
                    </div>

                    <div v-if="useAttachment().getAttachments(message.attachments).length" class="message-attachments">
                        <div v-for="file in useAttachment().getAttachments(message.attachments)" :key="file.id"
                            class="message-attachment" @click="openFileAttachment(file)"
                            :class="{ 'clickable': true }">
                            <span class="attachment-icon">📎</span>
                            <span class="attachment-name">{{ file.name }}</span>
                            <span class="open-hint">📄</span>
                        </div>
                    </div>

                    <div class="message-time">{{ formatTime(message.timestamp) }}</div>
                </div>
            </div>

            <div v-if="chat.canSendMessage" class="message-input">
                <input v-model="newMessage" type="text" placeholder="Type a message..." @keyup.enter="sendMessage">
                <button @click="sendMessage" :disabled="!newMessage.trim()">📤</button>
            </div>
            <div v-else class="message-input-disabled">
                <div class="disabled-text">
                    {{ chat.isOwnChat ? 'Read-only conversation' : `You cannot send messages to this private
                    conversation` }}
                </div>
            </div>
        </div>

        <div v-else class="no-chat-selected">
            <p>Select a conversation</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    chat: Chat | null;
    playerName: string;
    isMarkedAsEvidence: boolean;
}

interface Emits {
    (event: 'send-message', message: string): void;
    (event: 'toggle-evidence', chatId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();

const gameStore = useGameStore();

const processedMessages = computed(() => {
    if (!props.chat?.messages) return [];
    return props.chat.messages;
});

const sendMessage = () => {
    if (!newMessage.value.trim() || !props.chat?.canSendMessage) return;

    emit('send-message', newMessage.value.trim());
    newMessage.value = '';

    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

const getParticipantsDisplay = (chat: Chat): string => {
    const otherParticipants = chat.participants.filter(p => p !== props.playerName);
    const isPlayer = chat.participants.includes(props.playerName);

    if (isPlayer) {
        return `You + ${otherParticipants.join(', ')}`;
    }
    return otherParticipants.join(', ');
};

const getChatTypeLabel = (chat: Chat): string => {
    if (!chat) return '';
    const participantsLabel = getParticipantsDisplay(chat);

    if (chat.type === 'private') {
        return `Private chat: ${participantsLabel}`;
    } else {
        return `Group chat: ${participantsLabel}`;
    }
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

const openFileAttachment = async (file: FileDocument) => {
    const laptopStore = useLaptopStore();
    laptopStore.openDocumentInReader(file.id);
};

watch(() => props.chat, () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/CipherChat/MessageArea.scss';
</style>
