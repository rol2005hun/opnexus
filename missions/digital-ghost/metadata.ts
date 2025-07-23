import type { Mission } from '@/stores/game';

export const missionMetadata: Mission = {
    id: 'digital-ghost',
    title: 'Digital Ghost', 
    description: 'Track down an elite hacker who has been manipulating financial markets and stealing corporate secrets.',
    briefing: 'An unidentified threat actor, codenamed "Digital Ghost," has been conducting sophisticated attacks on financial institutions and tech companies. They leave minimal traces and use advanced evasion techniques. Recent intelligence suggests they may be planning a major operation.',
    thumbnail: '/missions/ghost.jpg',
    difficulty: 'Special Agent',
    estimatedTime: '150-200 mins',
    completed: false,
    available: false,
    securityClearance: 7,
    icon: '👻',
    price: 1,
    isPaid: true
};
