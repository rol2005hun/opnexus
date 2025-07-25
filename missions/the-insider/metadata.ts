import { Mission } from "../../shared/types";

export const missionMetadata: Mission = {
    id: 'the-insider',
    title: 'The Insider',
    description: 'Someone with high-level access is selling classified information. Multiple agencies are involved.',
    briefing: 'Intelligence suggests a mole within our organization has been providing classified information to foreign adversaries for the past 18 months. The suspect has access to multiple systems and has been careful to cover their tracks. Recent financial transactions and communication patterns indicate an acceleration in their activities.',
    thumbnail: '/missions/insider.jpg',
    difficulty: 'Special Agent',
    estimatedTime: '120-180 mins',
    available: false,
    securityClearance: 5,
    icon: '🎭',
    price: 1
};