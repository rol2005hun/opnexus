<template>
    <div v-if="show" class="new-chat-dialog">
        <div class="dialog-content">
            <div class="dialog-header">
                <h3>Start New Chat</h3>
                <button class="close-btn" @click="$emit('close')">✕</button>
            </div>

            <div class="dialog-body">
                <div class="chat-type-selector">
                    <label>
                        <input type="radio" v-model="chatType" value="private"> Private Chat
                    </label>
                    <label>
                        <input type="radio" v-model="chatType" value="group"> Group Chat
                    </label>
                </div>

                <div v-if="chatType === 'group'" class="group-name-input">
                    <input v-model="chatName" type="text" placeholder="Group name...">
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
                    <button @click="$emit('close')" class="cancel-btn">Cancel</button>
                    <button @click="createChat" :disabled="selectedCharacters.length === 0" class="create-btn">
                        Create Chat
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Character } from '#shared/types';

interface Props {
    show: boolean;
    availableCharacters: Character[];
}

interface ChatData {
    type: 'private' | 'group';
    name: string;
    selectedCharacters: string[];
}

interface Emits {
    (event: 'close'): void;
    (event: 'create', data: ChatData): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const chatType = ref<'private' | 'group'>('private');
const chatName = ref('');
const selectedCharacters = ref<string[]>([]);

const getCharacterAvatar = (name: string): string => {
    if (name.includes('Unknown') || name.includes('External')) return '🕵️';
    if (name.toLowerCase().includes('group') || name.toLowerCase().includes('team')) return '👥';

    const femaleNames = ['irene', 'sophie', 'chloe', 'sarah', 'lisa', 'anna', 'maria'];
    const firstName = name.split(' ')[0]?.toLowerCase() || '';
    return femaleNames.includes(firstName) ? '👩‍💼' : '👨‍💼';
};

const toggleCharacterSelection = (characterId: string) => {
    const index = selectedCharacters.value.indexOf(characterId);
    if (index > -1) {
        selectedCharacters.value.splice(index, 1);
    } else {
        if (chatType.value === 'private') {
            selectedCharacters.value = [characterId];
        } else {
            selectedCharacters.value.push(characterId);
        }
    }
};

const createChat = () => {
    if (selectedCharacters.value.length === 0) return;

    emit('create', {
        type: chatType.value,
        name: chatName.value,
        selectedCharacters: selectedCharacters.value
    });

    chatType.value = 'private';
    chatName.value = '';
    selectedCharacters.value = [];
};

watch(() => props.show, (newShow) => {
    if (!newShow) {
        chatType.value = 'private';
        chatName.value = '';
        selectedCharacters.value = [];
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/apps/CipherChat/NewChatDialog.scss';
</style>