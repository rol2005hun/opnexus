export const timeline: StoryEvent[] = [
    {
        id: 'event_001',
        timestamp: '2025-07-05 22:30:00',
        title: 'Initial Contact',
        description: 'Unknown contact reaches out to Aaron Cole',
        participants: ['Aaron Cole', 'Unknown Contact'],
        location: 'SecureChat Platform',
        isPublic: false,
        revealedBy: ['chat_008']
    },
    {
        id: 'event_002',
        timestamp: '2025-07-10 03:35:00',
        title: 'After-hours Building Access',
        description: 'Aaron Cole enters building at 3:35 AM using badge NC-2847',
        participants: ['Aaron Cole'],
        location: 'Nexus-Corp Main Building',
        isPublic: false,
        revealedBy: ['file_004']
    },
    {
        id: 'event_003',
        timestamp: '2025-07-10 04:15:00',
        title: 'Payment Confirmation',
        description: 'Payment of $75,000 confirmed via offshore transfer',
        participants: ['Aaron Cole', 'Unknown Contact'],
        location: 'SecureChat Platform',
        isPublic: false,
        revealedBy: ['chat_002', 'file_003']
    }
];