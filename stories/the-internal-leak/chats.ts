import type { EvidenceMessage } from '@/types/content';

export const chats: EvidenceMessage[] = [
    {
        id: 'chat_001',
        sender: 'Aaron Cole',
        content: 'The files you wanted are ready. Sentinel-X complete package.',
        timestamp: '2025-07-10 03:52:00',
        isClue: true
    },
    {
        id: 'chat_002',
        sender: 'Unknown Contact',
        content: 'Perfect timing. Payment transferred to your offshore account. $75K as agreed.',
        timestamp: '2025-07-10 04:15:00',
        isClue: true
    },
    {
        id: 'chat_003',
        sender: 'Aaron Cole',
        content: 'Thanks. This should cover my legal fees. Hope we never have to do this again.',
        timestamp: '2025-07-10 04:17:00',
        isClue: true
    },
    {
        id: 'chat_004',
        sender: 'Chloe Miller',
        content: 'Hey, did you really show me that bypass command? I mentioned it in my email to the team.',
        timestamp: '2025-07-08 16:45:00',
        isClue: true
    },
    {
        id: 'chat_005',
        sender: 'Aaron Cole',
        content: 'Yeah, it helps with the audit logs. Just be careful when you use it.',
        timestamp: '2025-07-08 16:47:00',
        isClue: true
    },
    {
        id: 'chat_006',
        sender: 'Sophie Tanaka',
        content: 'Aaron, I know the pressure is intense but we all have to do whatever it takes for this deadline.',
        timestamp: '2025-07-07 15:30:00',
        isClue: false
    },
    {
        id: 'chat_007',
        sender: 'Aaron Cole',
        content: 'Understood. I\'ll make sure we hit the August 15th deadline no matter what.',
        timestamp: '2025-07-07 15:32:00',
        isClue: false
    },
    {
        id: 'chat_008',
        sender: 'Unknown Contact',
        content: 'We need this data before they finalize their defense contract proposal. Time is critical.',
        timestamp: '2025-07-05 22:30:00',
        isClue: true
    },
    {
        id: 'chat_009',
        sender: 'Aaron Cole',
        content: 'I understand. But I need the financial pressure to make this worth the risk.',
        timestamp: '2025-07-05 22:45:00',
        isClue: true
    },
    {
        id: 'chat_010',
        sender: 'Unknown Contact',
        content: '$75,000 final offer. This will solve your divorce settlement problem.',
        timestamp: '2025-07-05 23:00:00',
        isClue: true
    }
];
