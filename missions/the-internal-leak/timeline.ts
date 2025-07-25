import type { MissionEvent } from '../../shared/types';

export const timeline: MissionEvent[] = [
    {
        id: 'event_001',
        timestamp: new Date('2025-07-05T22:30:00'),
        title: 'Initial Contact',
        description: 'Unknown contact reaches out to Aaron Cole',
        participants: ['Aaron Cole', 'Unknown Contact'],
        location: 'SecureChat Platform',
        isPublic: false,
        revealedBy: ['chat_008']
    },
    {
        id: 'event_002',
        timestamp: new Date('2025-07-10T03:35:00'),
        title: 'After-hours Building Access',
        description: 'Aaron Cole enters building at 3:35 AM using badge NC-2847',
        participants: ['Aaron Cole'],
        location: 'Nexus-Corp Main Building',
        isPublic: false,
        revealedBy: ['file_003']
    },
    {
        id: 'event_003',
        timestamp: new Date('2025-07-10T04:00:00'),
        title: 'Payment Confirmation',
        description: 'Payment of $75,000 confirmed via offshore transfer',
        participants: ['Aaron Cole', 'Unknown Contact'],
        location: 'SecureChat Platform',
        isPublic: false,
        revealedBy: ['chat_002', 'file_002']
    }
];