import type { Story } from '@/stores/game';

export const storyMetadata: Story = {
    id: 'banking-fraud-investigation',
    title: 'Banking Fraud Investigation',
    description: 'Sophisticated fraud scheme detected at City National Bank involving unauthorized transfers totaling $2.3M with cryptocurrency laundering.',
    briefing: 'At 09:30 this morning, our compliance officer Jennifer Kim flagged suspicious transaction patterns involving multiple large transfers during system maintenance windows. The transactions bypass standard approval workflows and appear to involve cryptocurrency conversion. Evidence suggests insider involvement with potential external coordination. Your mission: identify the perpetrator, trace the money flow, and uncover all accomplices in this fraud scheme.',
    thumbnail: '/stories/banking.jpg',
    difficulty: 'Director',
    estimatedTime: '75-105 mins',
    completed: false,
    available: false,
    securityClearance: 2,
    icon: '🏦',
    price: 1,
    isPaid: true
};