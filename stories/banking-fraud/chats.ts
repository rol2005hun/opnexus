// Banking Fraud Investigation - Chat Messages
import type { EvidenceConversation } from '@/types/content';

export const chats: EvidenceConversation[] = [
    {
        id: 'chat_bank_001',
        participants: ['David Chen', 'Michael Torres'],
        platform: 'Signal',
        messages: [
            {
                id: 'msg_001',
                sender: 'David Chen',
                content: 'Tomorrow night is perfect. Audit logs will be down.',
                timestamp: '2025-07-12 21:30:00',
                isClue: true
            },
            {
                id: 'msg_002',
                sender: 'Michael Torres',
                content: 'Got it. The accounts are ready. $525K total.',
                timestamp: '2025-07-12 21:32:00',
                isClue: true
            },
            {
                id: 'msg_003',
                sender: 'David Chen',
                content: 'Remember - 3 separate transfers, 15 minutes apart.',
                timestamp: '2025-07-12 21:35:00',
                isClue: true
            }
        ],
        encrypted: true,
        isEvidence: true,
        title: 'Coordination Chat'
    },
    {
        id: 'chat_bank_002',
        participants: ['Michael Torres', 'Alex Volkov'],
        platform: 'Telegram',
        messages: [
            {
                id: 'msg_004',
                sender: 'Alex Volkov',
                content: 'Payment confirmed. $75K bonus as agreed.',
                timestamp: '2025-07-13 04:20:00',
                isClue: true
            },
            {
                id: 'msg_005',
                sender: 'Michael Torres',
                content: 'Thank you. More coming next week.',
                timestamp: '2025-07-13 04:25:00',
                isClue: true
            },
            {
                id: 'msg_006',
                sender: 'Alex Volkov',
                content: 'Excellent. My clients are very satisfied.',
                timestamp: '2025-07-13 04:30:00',
                isClue: true
            }
        ],
        encrypted: true,
        isEvidence: true,
        title: 'Payment Confirmation'
    },
    {
        id: 'chat_bank_003',
        participants: ['Sarah Williams', 'Jennifer Kim', 'Lisa Martinez'],
        platform: 'Teams',
        messages: [
            {
                id: 'msg_007',
                sender: 'Sarah Williams',
                content: 'I found something disturbing in the transaction logs.',
                timestamp: '2025-07-14 10:15:00',
                isClue: false
            },
            {
                id: 'msg_008',
                sender: 'Jennifer Kim',
                content: 'What kind of pattern?',
                timestamp: '2025-07-14 10:16:00',
                isClue: false
            },
            {
                id: 'msg_009',
                sender: 'Sarah Williams',
                content: 'Multiple large transfers during system maintenance windows.',
                timestamp: '2025-07-14 10:18:00',
                isClue: true
            },
            {
                id: 'msg_010',
                sender: 'Lisa Martinez',
                content: 'We need to investigate this immediately.',
                timestamp: '2025-07-14 10:20:00',
                isClue: false
            }
        ],
        encrypted: false,
        isEvidence: true,
        title: 'Investigation Team'
    }
];
