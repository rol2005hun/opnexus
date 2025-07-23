import type { BaseEntity } from '../core/base';

export interface Chat extends BaseEntity {
    name: string;
    avatar: string;
    participants: string[];
    type: 'private' | 'group';
    status: 'online' | 'offline' | 'away' | 'busy';
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    messages: ChatMessage[];
    isOwnChat: boolean;
    canSendMessage: boolean;
    canView: boolean;
    isEvidence?: boolean;
    platform?: string;
    deleted?: boolean;
}

export interface ChatMessage extends BaseEntity {
    sender: string;
    content: string;
    timestamp: Date;
    sent: boolean;
    isPlayerMessage?: boolean;
}

export interface ChatFilter {
    showOwnChats: boolean;
    showAllAccessible: boolean;
    showEvidenceOnly: boolean;
}

export interface NewChatRequest {
    participantIds: string[];
    type: 'private' | 'group';
    name?: string;
}
