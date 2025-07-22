export const chats: EvidenceConversation[] = [
    {
        id: 'suspicious_deal',
        title: 'Unknown Chat',
        participants: ['Aaron Cole', 'Unknown Contact'],
        platform: 'Signal',
        messages: [
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
            },
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
            }
        ],
        isEvidence: true
    },
    {
        id: 'conv_002',
        platform: 'Slack',
        participants: ['Aaron Cole', 'Chloe Miller'],
        messages: [
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
            }
        ],
        isEvidence: true,
        title: 'Security Bypass Discussion'
    },
    {
        id: 'conv_003',
        platform: 'Slack',
        participants: ['Aaron Cole', 'Sophie Tanaka'],
        messages: [
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
            }
        ],
        isEvidence: false,
        title: 'Project Deadline Pressure'
    },
    {
        id: 'conv_004',
        platform: 'Teams',
        participants: ['Sophie Tanaka', 'Irene Walker', 'Aaron Cole', 'Chloe Miller'],
        messages: [
            {
                id: 'group_001',
                sender: 'Sophie Tanaka',
                content: 'Team meeting at 2 PM today to discuss Sentinel-X progress. Aaron, please bring the latest security docs.',
                timestamp: '2025-07-09 10:00:00',
                isClue: false
            },
            {
                id: 'group_002',
                sender: 'Aaron Cole',
                content: 'Will do. I have everything ready for review.',
                timestamp: '2025-07-09 10:15:00',
                isClue: false
            },
            {
                id: 'group_003',
                sender: 'Irene Walker',
                content: 'Make sure all documents are properly secured. We can\'t afford any leaks.',
                timestamp: '2025-07-09 10:20:00',
                isClue: false
            },
            {
                id: 'group_004',
                sender: 'Chloe Miller',
                content: 'Agreed. The DoD audit is coming up and we need everything perfect.',
                timestamp: '2025-07-09 10:25:00',
                isClue: false
            },
            {
                id: 'group_005',
                sender: 'Aaron Cole',
                content: 'Don\'t worry, I\'ve got this under control. 😅',
                timestamp: '2025-07-09 10:30:00',
                isClue: true
            }
        ],
        isEvidence: true,
        title: 'Sentinel-X Development Team'
    }
];