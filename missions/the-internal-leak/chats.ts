import type { Chat } from '../../shared/types';

export const chats: Chat[] = [
    {
        id: 'company_wide_chat',
        title: 'General Discussion',
        participants: ['Sarah Johnson', 'Mike Peters', 'Lisa Wang', 'Tom Anderson', 'Rachel Green'],
        platform: 'Slack',
        messages: [
            {
                id: 'general_001',
                sender: 'Sarah Johnson',
                content: 'Anyone else excited about the new coffee machine in the break room? ☕',
                timestamp: new Date('2025-07-01 09:15:00'),
                isClue: false
            },
            {
                id: 'general_002',
                sender: 'Mike Peters',
                content: 'Finally! The old one was making terrible coffee for months.',
                timestamp: new Date('2025-07-01 09:17:00'),
                isClue: false
            },
            {
                id: 'general_003',
                sender: 'Lisa Wang',
                content: 'Did anyone see the parking lot construction? They\'re adding 50 new spots.',
                timestamp: new Date('2025-07-01 10:30:00'),
                isClue: false
            },
            {
                id: 'general_004',
                sender: 'Tom Anderson',
                content: 'About time. I\'ve been parking three blocks away for weeks.',
                timestamp: new Date('2025-07-01 10:32:00'),
                isClue: false
            },
            {
                id: 'general_005',
                sender: 'Rachel Green',
                content: 'Has anyone heard about the company picnic plans? I heard it might be at Central Park this year.',
                timestamp: new Date('2025-07-01 14:45:00'),
                isClue: false
            },
            {
                id: 'general_006',
                sender: 'Sarah Johnson',
                content: 'That would be amazing! Last year\'s venue was too small.',
                timestamp: new Date('2025-07-01 14:47:00'),
                isClue: false
            },
            {
                id: 'general_007',
                sender: 'Mike Peters',
                content: 'Speaking of events, who\'s going to the quarterly meeting tomorrow?',
                timestamp: new Date('2025-07-02 16:20:00'),
                isClue: false
            },
            {
                id: 'general_008',
                sender: 'Lisa Wang',
                content: 'I\'ll be there. Hope they announce the promotion results.',
                timestamp: new Date('2025-07-02 16:22:00'),
                isClue: false
            },
            {
                id: 'general_009',
                sender: 'Tom Anderson',
                content: 'Speaking of promotions, has anyone heard about the new security protocols?',
                timestamp: new Date('2025-07-02 16:25:00'),
                isClue: false
            },
            {
                id: 'general_010',
                sender: 'Rachel Green',
                content: 'Yeah, they\'re being really strict about access logs now.',
                timestamp: new Date('2025-07-02 16:27:00'),
                isClue: false
            },
            {
                id: 'general_011',
                sender: 'Sarah Johnson',
                content: 'Good thing too. With all the cyber attacks lately, we need better security.',
                timestamp: new Date('2025-07-02 16:30:00'),
                isClue: false
            },
            {
                id: 'general_012',
                sender: 'Mike Peters',
                content: 'Did anyone see the memo about the new badge system?',
                timestamp: new Date('2025-07-03 08:15:00'),
                isClue: false
            },
            {
                id: 'general_013',
                sender: 'Lisa Wang',
                content: 'Yes! Finally, no more fumbling with old keycards.',
                timestamp: new Date('2025-07-03 08:18:00'),
                isClue: false
            },
            {
                id: 'general_014',
                sender: 'Tom Anderson',
                content: 'The facial recognition feature is pretty cool.',
                timestamp: new Date('2025-07-03 08:20:00'),
                isClue: false
            },
            {
                id: 'general_015',
                sender: 'Rachel Green',
                content: 'Lunch menu today looks great! They have sushi.',
                timestamp: new Date('2025-07-03 11:45:00'),
                isClue: false
            },
            {
                id: 'general_016',
                sender: 'Sarah Johnson',
                content: 'Finally! I\'ve been craving sushi all week.',
                timestamp: new Date('2025-07-03 11:47:00'),
                isClue: false
            },
            {
                id: 'general_017',
                sender: 'Mike Peters',
                content: 'Anyone know when the new vending machines will be installed?',
                timestamp: new Date('2025-07-04 14:00:00'),
                isClue: false
            },
            {
                id: 'general_018',
                sender: 'Lisa Wang',
                content: 'I heard next week. They\'ll have healthier options.',
                timestamp: new Date('2025-07-04 14:02:00'),
                isClue: false
            },
            {
                id: 'general_019',
                sender: 'Tom Anderson',
                content: 'Great! The old ones only had junk food.',
                timestamp: new Date('2025-07-04 14:05:00'),
                isClue: false
            },
            {
                id: 'general_020',
                sender: 'Rachel Green',
                content: 'Weather\'s been crazy lately. Storm warnings for tomorrow.',
                timestamp: new Date('2025-07-05 09:30:00'),
                isClue: false
            },
            {
                id: 'general_021',
                sender: 'Sarah Johnson',
                content: 'Hope it doesn\'t affect the company picnic planning.',
                timestamp: new Date('2025-07-05 09:32:00'),
                isClue: false
            },
            {
                id: 'general_022',
                sender: 'Mike Peters',
                content: 'They might move it to the indoor venue if needed.',
                timestamp: new Date('2025-07-05 09:35:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'it_support_chat',
        title: 'IT Support & Help',
        participants: ['David Kim', 'Elena Rodriguez', 'James Wilson', 'Anna Lee'],
        platform: 'Teams',
        messages: [
            {
                id: 'it_001',
                sender: 'David Kim',
                content: 'Reminder: Password changes are mandatory this month. Please update by July 15th.',
                timestamp: new Date('2025-07-03 08:00:00'),
                isClue: false
            },
            {
                id: 'it_002',
                sender: 'Elena Rodriguez',
                content: 'My laptop is running super slow lately. Any suggestions?',
                timestamp: new Date('2025-07-03 10:15:00'),
                isClue: false
            },
            {
                id: 'it_003',
                sender: 'James Wilson',
                content: 'Try clearing your cache and temporary files. If that doesn\'t help, I can take a look.',
                timestamp: new Date('2025-07-03 10:18:00'),
                isClue: false
            },
            {
                id: 'it_004',
                sender: 'Anna Lee',
                content: 'VPN connection keeps dropping. Is there a server issue?',
                timestamp: new Date('2025-07-05 13:45:00'),
                isClue: false
            },
            {
                id: 'it_005',
                sender: 'David Kim',
                content: 'We\'re aware of the VPN issues. Working with the provider to resolve it.',
                timestamp: new Date('2025-07-05 13:50:00'),
                isClue: false
            },
            {
                id: 'it_006',
                sender: 'Elena Rodriguez',
                content: 'The new security scanner flagged some files as suspicious. False positive?',
                timestamp: new Date('2025-07-08 09:30:00'),
                isClue: false
            },
            {
                id: 'it_007',
                sender: 'James Wilson',
                content: 'Most likely. The new scanner is very sensitive. Send me the details.',
                timestamp: new Date('2025-07-08 09:32:00'),
                isClue: false
            },
            {
                id: 'it_008',
                sender: 'Anna Lee',
                content: 'System backup completed successfully last night.',
                timestamp: new Date('2025-07-08 10:00:00'),
                isClue: false
            },
            {
                id: 'it_009',
                sender: 'David Kim',
                content: 'Good. How long did it take this time?',
                timestamp: new Date('2025-07-08 10:02:00'),
                isClue: false
            },
            {
                id: 'it_010',
                sender: 'Anna Lee',
                content: 'About 3 hours. Much faster than the old system.',
                timestamp: new Date('2025-07-08 10:05:00'),
                isClue: false
            },
            {
                id: 'it_011',
                sender: 'Elena Rodriguez',
                content: 'The new firewall rules are blocking some legitimate traffic.',
                timestamp: new Date('2025-07-09 11:15:00'),
                isClue: false
            },
            {
                id: 'it_012',
                sender: 'James Wilson',
                content: 'I\'ll review the logs and adjust the settings.',
                timestamp: new Date('2025-07-09 11:18:00'),
                isClue: false
            },
            {
                id: 'it_013',
                sender: 'David Kim',
                content: 'Server maintenance is scheduled for this weekend.',
                timestamp: new Date('2025-07-10 13:00:00'),
                isClue: false
            },
            {
                id: 'it_014',
                sender: 'Anna Lee',
                content: 'Will there be any downtime for users?',
                timestamp: new Date('2025-07-10 13:02:00'),
                isClue: false
            },
            {
                id: 'it_015',
                sender: 'David Kim',
                content: 'Minimal. Maybe 30 minutes on Saturday night.',
                timestamp: new Date('2025-07-10 13:05:00'),
                isClue: false
            },
            {
                id: 'it_016',
                sender: 'Elena Rodriguez',
                content: 'My laptop screen is flickering. Hardware issue?',
                timestamp: new Date('2025-07-11 14:20:00'),
                isClue: false
            },
            {
                id: 'it_017',
                sender: 'James Wilson',
                content: 'Could be the graphics driver. Try updating it first.',
                timestamp: new Date('2025-07-11 14:22:00'),
                isClue: false
            },
            {
                id: 'it_018',
                sender: 'Anna Lee',
                content: 'If that doesn\'t work, we can swap it for a replacement.',
                timestamp: new Date('2025-07-11 14:25:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'marketing_team',
        title: 'Marketing Team',
        participants: ['Christina Bell', 'Mark Thompson', 'Jessica Clark', 'Robert Davis'],
        platform: 'Slack',
        messages: [
            {
                id: 'marketing_001',
                sender: 'Christina Bell',
                content: 'The new product launch campaign is coming together nicely. Timeline looks good.',
                timestamp: new Date('2025-07-04 11:00:00'),
                isClue: false
            },
            {
                id: 'marketing_002',
                sender: 'Mark Thompson',
                content: 'Great! When can we see the preliminary designs?',
                timestamp: new Date('2025-07-04 11:05:00'),
                isClue: false
            },
            {
                id: 'marketing_003',
                sender: 'Jessica Clark',
                content: 'I\'ll have them ready by Friday. Working on the color schemes now.',
                timestamp: new Date('2025-07-04 11:08:00'),
                isClue: false
            },
            {
                id: 'marketing_004',
                sender: 'Robert Davis',
                content: 'Don\'t forget about the compliance review. Legal needs 48 hours minimum.',
                timestamp: new Date('2025-07-04 14:30:00'),
                isClue: false
            },
            {
                id: 'marketing_005',
                sender: 'Christina Bell',
                content: 'Good point. I\'ll schedule that for next week.',
                timestamp: new Date('2025-07-04 14:32:00'),
                isClue: false
            },
            {
                id: 'marketing_006',
                sender: 'Mark Thompson',
                content: 'The budget for Q3 advertising looks tight. We might need to prioritize.',
                timestamp: new Date('2025-07-06 09:15:00'),
                isClue: false
            },
            {
                id: 'marketing_007',
                sender: 'Jessica Clark',
                content: 'Social media campaigns are more cost-effective. Let\'s focus there.',
                timestamp: new Date('2025-07-06 09:18:00'),
                isClue: false
            },
            {
                id: 'marketing_008',
                sender: 'Robert Davis',
                content: 'The analytics from last quarter look promising.',
                timestamp: new Date('2025-07-06 10:30:00'),
                isClue: false
            },
            {
                id: 'marketing_009',
                sender: 'Christina Bell',
                content: 'Engagement rates are up 25% across all platforms.',
                timestamp: new Date('2025-07-06 10:32:00'),
                isClue: false
            },
            {
                id: 'marketing_010',
                sender: 'Mark Thompson',
                content: 'That\'s fantastic! What\'s driving the increase?',
                timestamp: new Date('2025-07-06 10:35:00'),
                isClue: false
            },
            {
                id: 'marketing_011',
                sender: 'Jessica Clark',
                content: 'The video content strategy is really working.',
                timestamp: new Date('2025-07-06 10:38:00'),
                isClue: false
            },
            {
                id: 'marketing_012',
                sender: 'Robert Davis',
                content: 'Client feedback on the new branding has been excellent.',
                timestamp: new Date('2025-07-07 08:45:00'),
                isClue: false
            },
            {
                id: 'marketing_013',
                sender: 'Christina Bell',
                content: 'The focus groups especially loved the color scheme.',
                timestamp: new Date('2025-07-07 08:48:00'),
                isClue: false
            },
            {
                id: 'marketing_014',
                sender: 'Mark Thompson',
                content: 'Should we expand the campaign to international markets?',
                timestamp: new Date('2025-07-07 09:00:00'),
                isClue: false
            },
            {
                id: 'marketing_015',
                sender: 'Jessica Clark',
                content: 'Let\'s start with English-speaking countries first.',
                timestamp: new Date('2025-07-07 09:02:00'),
                isClue: false
            },
            {
                id: 'marketing_016',
                sender: 'Robert Davis',
                content: 'Trade show season is coming up. We need booth designs.',
                timestamp: new Date('2025-07-08 11:15:00'),
                isClue: false
            },
            {
                id: 'marketing_017',
                sender: 'Christina Bell',
                content: 'I\'ll reach out to our design agency tomorrow.',
                timestamp: new Date('2025-07-08 11:18:00'),
                isClue: false
            },
            {
                id: 'marketing_018',
                sender: 'Mark Thompson',
                content: 'Remember to include interactive elements this year.',
                timestamp: new Date('2025-07-08 11:20:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'random_discussions',
        title: 'Random Chat',
        participants: ['Amy Foster', 'Steve Miller', 'Kelly Brown', 'Dan White'],
        platform: 'Discord',
        messages: [
            {
                id: 'random_001',
                sender: 'Amy Foster',
                content: 'Anyone watched that new Netflix series? It\'s amazing!',
                timestamp: new Date('2025-07-02 19:30:00'),
                isClue: false
            },
            {
                id: 'random_002',
                sender: 'Steve Miller',
                content: 'Which one? There are so many new shows lately.',
                timestamp: new Date('2025-07-02 19:32:00'),
                isClue: false
            },
            {
                id: 'random_003',
                sender: 'Kelly Brown',
                content: 'I\'ve been binge-watching cooking shows. So addictive!',
                timestamp: new Date('2025-07-02 19:45:00'),
                isClue: false
            },
            {
                id: 'random_004',
                sender: 'Dan White',
                content: 'Weekend plans anyone? Thinking of going hiking.',
                timestamp: new Date('2025-07-05 17:00:00'),
                isClue: false
            },
            {
                id: 'random_005',
                sender: 'Amy Foster',
                content: 'That sounds fun! Which trail?',
                timestamp: new Date('2025-07-05 17:03:00'),
                isClue: false
            },
            {
                id: 'random_006',
                sender: 'Steve Miller',
                content: 'I\'m planning a barbecue. You\'re all invited!',
                timestamp: new Date('2025-07-05 17:15:00'),
                isClue: false
            },
            {
                id: 'random_007',
                sender: 'Kelly Brown',
                content: 'Count me in! Should I bring dessert?',
                timestamp: new Date('2025-07-05 17:17:00'),
                isClue: false
            },
            {
                id: 'random_008',
                sender: 'Dan White',
                content: 'That would be perfect! How about your famous brownies?',
                timestamp: new Date('2025-07-05 17:20:00'),
                isClue: false
            },
            {
                id: 'random_009',
                sender: 'Amy Foster',
                content: 'Ooh yes! Those are legendary.',
                timestamp: new Date('2025-07-05 17:22:00'),
                isClue: false
            },
            {
                id: 'random_010',
                sender: 'Steve Miller',
                content: 'I\'ll handle the drinks and main course.',
                timestamp: new Date('2025-07-05 17:25:00'),
                isClue: false
            },
            {
                id: 'random_011',
                sender: 'Kelly Brown',
                content: 'Has anyone seen the new Marvel movie yet?',
                timestamp: new Date('2025-07-06 12:30:00'),
                isClue: false
            },
            {
                id: 'random_012',
                sender: 'Dan White',
                content: 'Watching it tonight! No spoilers please.',
                timestamp: new Date('2025-07-06 12:32:00'),
                isClue: false
            },
            {
                id: 'random_013',
                sender: 'Amy Foster',
                content: 'My lips are sealed! But it\'s amazing.',
                timestamp: new Date('2025-07-06 12:35:00'),
                isClue: false
            },
            {
                id: 'random_014',
                sender: 'Steve Miller',
                content: 'The weather this weekend should be perfect for outdoor activities.',
                timestamp: new Date('2025-07-07 18:00:00'),
                isClue: false
            },
            {
                id: 'random_015',
                sender: 'Kelly Brown',
                content: 'Beach day anyone? The forecast looks sunny.',
                timestamp: new Date('2025-07-07 18:02:00'),
                isClue: false
            },
            {
                id: 'random_016',
                sender: 'Dan White',
                content: 'I\'m down! Which beach are you thinking?',
                timestamp: new Date('2025-07-07 18:05:00'),
                isClue: false
            },
            {
                id: 'random_017',
                sender: 'Amy Foster',
                content: 'Santa Monica is always nice this time of year.',
                timestamp: new Date('2025-07-07 18:08:00'),
                isClue: false
            },
            {
                id: 'random_018',
                sender: 'Steve Miller',
                content: 'Perfect! Let\'s meet at 10 AM near the pier.',
                timestamp: new Date('2025-07-07 18:10:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'project_alpha',
        title: 'Project Alpha Team',
        participants: ['Michael Chang', 'Laura Smith', 'Gary Johnson', 'Nina Patel'],
        platform: 'Teams',
        messages: [
            {
                id: 'alpha_001',
                sender: 'Michael Chang',
                content: 'Project Alpha milestone review is scheduled for Thursday. Everyone ready?',
                timestamp: new Date('2025-07-07 10:00:00'),
                isClue: false
            },
            {
                id: 'alpha_002',
                sender: 'Laura Smith',
                content: 'Almost done with the documentation. Just need to review the technical specs.',
                timestamp: new Date('2025-07-07 10:05:00'),
                isClue: false
            },
            {
                id: 'alpha_003',
                sender: 'Gary Johnson',
                content: 'Testing is complete. Found a few minor bugs but nothing critical.',
                timestamp: new Date('2025-07-07 10:08:00'),
                isClue: false,
                attachments: ['file_007']
            },
            {
                id: 'alpha_004',
                sender: 'Nina Patel',
                content: 'UI design is finalized. Client feedback was very positive.',
                timestamp: new Date('2025-07-07 10:12:00'),
                isClue: false
            },
            {
                id: 'alpha_005',
                sender: 'Michael Chang',
                content: 'Excellent work everyone. We\'re ahead of schedule.',
                timestamp: new Date('2025-07-07 10:15:00'),
                isClue: false
            },
            {
                id: 'alpha_006',
                sender: 'Laura Smith',
                content: 'Should we start preparing for the next phase?',
                timestamp: new Date('2025-07-07 10:18:00'),
                isClue: false
            },
            {
                id: 'alpha_007',
                sender: 'Gary Johnson',
                content: 'Good idea. The requirements document is almost ready.',
                timestamp: new Date('2025-07-07 10:20:00'),
                isClue: false
            },
            {
                id: 'alpha_008',
                sender: 'Nina Patel',
                content: 'I\'ll start working on the wireframes for the next iteration.',
                timestamp: new Date('2025-07-07 10:25:00'),
                isClue: false
            },
            {
                id: 'alpha_009',
                sender: 'Michael Chang',
                content: 'Great initiative. Let\'s schedule a planning session for next week.',
                timestamp: new Date('2025-07-07 10:30:00'),
                isClue: false
            },
            {
                id: 'alpha_010',
                sender: 'Laura Smith',
                content: 'The client wants to add a new feature to the roadmap.',
                timestamp: new Date('2025-07-08 09:00:00'),
                isClue: false
            },
            {
                id: 'alpha_011',
                sender: 'Gary Johnson',
                content: 'At this stage? That could impact our timeline.',
                timestamp: new Date('2025-07-08 09:02:00'),
                isClue: false
            },
            {
                id: 'alpha_012',
                sender: 'Nina Patel',
                content: 'What kind of feature are they requesting?',
                timestamp: new Date('2025-07-08 09:05:00'),
                isClue: false
            },
            {
                id: 'alpha_013',
                sender: 'Michael Chang',
                content: 'Advanced analytics dashboard. Quite complex.',
                timestamp: new Date('2025-07-08 09:08:00'),
                isClue: false
            },
            {
                id: 'alpha_014',
                sender: 'Laura Smith',
                content: 'We\'ll need at least 2-3 additional weeks for that.',
                timestamp: new Date('2025-07-08 09:10:00'),
                isClue: false
            },
            {
                id: 'alpha_015',
                sender: 'Gary Johnson',
                content: 'I\'ll prepare a revised timeline and cost estimate.',
                timestamp: new Date('2025-07-08 09:12:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'suspicious_deal',
        title: 'Personal Chat - Alex',
        participants: ['Aaron Cole', 'Alex Thompson'],
        platform: 'Signal',
        messages: [
            {
                id: 'chat_intro_001',
                sender: 'Alex Thompson',
                content: 'Hey man, how have you been? Heard about the divorce situation.',
                timestamp: new Date('2025-06-28 19:15:00'),
                isClue: false
            },
            {
                id: 'chat_intro_002',
                sender: 'Aaron Cole',
                content: 'Not great, to be honest. The payments are killing me.',
                timestamp: new Date('2025-06-28 19:18:00'),
                isClue: false
            },
            {
                id: 'chat_intro_003',
                sender: 'Alex Thompson',
                content: 'I might have something that could help with your situation.',
                timestamp: new Date('2025-06-30 20:45:00'),
                isClue: false
            },
            {
                id: 'chat_008',
                sender: 'Alex Thompson',
                content: 'We need this data before they finalize their defense contract proposal. Time is critical.',
                timestamp: new Date('2025-07-05 22:30:00'),
                isClue: true
            },
            {
                id: 'chat_009',
                sender: 'Aaron Cole',
                content: 'I understand. But I need the financial pressure to make this worth the risk.',
                timestamp: new Date('2025-07-05 22:45:00'),
                isClue: true
            },
            {
                id: 'chat_010',
                sender: 'Alex Thompson',
                content: '$75,000 final offer. This will solve your divorce settlement problem.',
                timestamp: new Date('2025-07-05 23:00:00'),
                isClue: true
            },
            {
                id: 'chat_mid_001',
                sender: 'Aaron Cole',
                content: 'I need some time to think about this.',
                timestamp: new Date('2025-07-06 08:30:00'),
                isClue: false
            },
            {
                id: 'chat_mid_002',
                sender: 'Alex Thompson',
                content: 'Of course. But don\'t wait too long. The opportunity won\'t last.',
                timestamp: new Date('2025-07-06 08:45:00'),
                isClue: false
            },
            {
                id: 'chat_001',
                sender: 'Aaron Cole',
                content: 'The files you wanted are ready. Sentinel-X complete package.',
                timestamp: new Date('2025-07-10 03:52:00'),
                isClue: true,
                attachments: ['file_001', 'file_004']
            },
            {
                id: 'chat_002',
                sender: 'Alex Thompson',
                content: 'Perfect timing. Payment transferred to your offshore account. $75K as agreed.',
                timestamp: new Date('2025-07-10 04:15:00'),
                isClue: true,
                attachments: ['file_002']
            },
            {
                id: 'chat_003',
                sender: 'Aaron Cole',
                content: 'Thanks. This should cover my legal fees. Hope we never have to do this again.',
                timestamp: new Date('2025-07-10 04:17:00'),
                isClue: true
            },
            {
                id: 'chat_011',
                sender: 'Alex Thompson',
                content: 'Delete all traces of our communication after this.',
                timestamp: new Date('2025-07-10 04:20:00'),
                isClue: true
            },
            {
                id: 'chat_012',
                sender: 'Aaron Cole',
                content: 'Already on it. Using the secure wipe protocols.',
                timestamp: new Date('2025-07-10 04:22:00'),
                isClue: true
            },
            {
                id: 'chat_013',
                sender: 'Alex Thompson',
                content: 'Good. Make sure the audit logs are clean too.',
                timestamp: new Date('2025-07-10 04:25:00'),
                isClue: true
            },
            {
                id: 'chat_014',
                sender: 'Aaron Cole',
                content: 'That bypass command Chloe doesn\'t know about will help.',
                timestamp: new Date('2025-07-10 04:27:00'),
                isClue: true
            }
        ],
        isEvidence: true
    },
    {
        id: 'lunch_discussions',
        title: 'Lunch Break Chat',
        participants: ['Jennifer Liu', 'Carlos Rodriguez', 'Amanda Taylor', 'Kevin Murphy'],
        platform: 'WhatsApp',
        messages: [
            {
                id: 'lunch_001',
                sender: 'Jennifer Liu',
                content: 'Anyone wants to grab lunch at that new Italian place?',
                timestamp: new Date('2025-07-08 12:00:00'),
                isClue: false
            },
            {
                id: 'lunch_002',
                sender: 'Carlos Rodriguez',
                content: 'Sure! I heard their pasta is amazing.',
                timestamp: new Date('2025-07-08 12:02:00'),
                isClue: false
            },
            {
                id: 'lunch_003',
                sender: 'Amanda Taylor',
                content: 'Count me in. What time?',
                timestamp: new Date('2025-07-08 12:05:00'),
                isClue: false
            },
            {
                id: 'lunch_004',
                sender: 'Kevin Murphy',
                content: 'How about 12:30? I need to finish this report first.',
                timestamp: new Date('2025-07-08 12:08:00'),
                isClue: false
            },
            {
                id: 'lunch_005',
                sender: 'Jennifer Liu',
                content: 'Perfect! See you all in the lobby at 12:30.',
                timestamp: new Date('2025-07-08 12:10:00'),
                isClue: false
            },
            {
                id: 'lunch_006',
                sender: 'Carlos Rodriguez',
                content: 'By the way, has anyone tried the new sushi place?',
                timestamp: new Date('2025-07-08 15:30:00'),
                isClue: false
            },
            {
                id: 'lunch_007',
                sender: 'Amanda Taylor',
                content: 'Yes! Their salmon rolls are incredible.',
                timestamp: new Date('2025-07-08 15:32:00'),
                isClue: false
            },
            {
                id: 'lunch_008',
                sender: 'Kevin Murphy',
                content: 'We should go there tomorrow instead.',
                timestamp: new Date('2025-07-08 15:35:00'),
                isClue: false
            },
            {
                id: 'lunch_009',
                sender: 'Jennifer Liu',
                content: 'Good idea! I\'ll make a reservation.',
                timestamp: new Date('2025-07-08 15:38:00'),
                isClue: false
            },
            {
                id: 'lunch_010',
                sender: 'Carlos Rodriguez',
                content: 'The Italian place was great today. Definitely going back.',
                timestamp: new Date('2025-07-08 14:45:00'),
                isClue: false
            },
            {
                id: 'lunch_011',
                sender: 'Amanda Taylor',
                content: 'Their tiramisu was to die for!',
                timestamp: new Date('2025-07-08 14:47:00'),
                isClue: false
            },
            {
                id: 'lunch_012',
                sender: 'Kevin Murphy',
                content: 'I\'m still full from that enormous serving.',
                timestamp: new Date('2025-07-08 14:50:00'),
                isClue: false
            },
            {
                id: 'lunch_013',
                sender: 'Jennifer Liu',
                content: 'Tomorrow\'s weather looks perfect for outdoor seating.',
                timestamp: new Date('2025-07-09 11:00:00'),
                isClue: false
            },
            {
                id: 'lunch_014',
                sender: 'Carlos Rodriguez',
                content: 'The patio at the sushi place has a great view.',
                timestamp: new Date('2025-07-09 11:02:00'),
                isClue: false
            },
            {
                id: 'lunch_015',
                sender: 'Amanda Taylor',
                content: 'Perfect! Outdoor sushi lunch it is.',
                timestamp: new Date('2025-07-09 11:05:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'finance_chat',
        title: 'Finance Department',
        participants: ['Patricia Wong', 'Harold Stevens', 'Monica Fisher', 'Tyler Brooks'],
        platform: 'Teams',
        messages: [
            {
                id: 'finance_001',
                sender: 'Patricia Wong',
                content: 'Q2 budget review is due next week. Everyone have their reports ready?',
                timestamp: new Date('2025-07-09 09:00:00'),
                isClue: false
            },
            {
                id: 'finance_002',
                sender: 'Harold Stevens',
                content: 'Almost done. Just need to verify some contractor payments.',
                timestamp: new Date('2025-07-09 09:05:00'),
                isClue: false
            },
            {
                id: 'finance_003',
                sender: 'Monica Fisher',
                content: 'The new expense tracking system is working great. Much easier than before.',
                timestamp: new Date('2025-07-09 09:15:00'),
                isClue: false
            },
            {
                id: 'finance_004',
                sender: 'Tyler Brooks',
                content: 'Anyone notice unusual activity in the offshore accounts lately?',
                timestamp: new Date('2025-07-09 14:30:00'),
                isClue: false
            },
            {
                id: 'finance_005',
                sender: 'Patricia Wong',
                content: 'What kind of activity? Can you be more specific?',
                timestamp: new Date('2025-07-09 14:32:00'),
                isClue: false
            },
            {
                id: 'finance_006',
                sender: 'Tyler Brooks',
                content: 'Large withdrawals from the Caribbean accounts. Probably legitimate but worth checking.',
                timestamp: new Date('2025-07-09 14:35:00'),
                isClue: false
            },
            {
                id: 'finance_007',
                sender: 'Harold Stevens',
                content: 'I\'ll look into it. Could be related to the new tax optimization strategy.',
                timestamp: new Date('2025-07-09 14:38:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'weekend_plans',
        title: 'Weekend Warriors',
        participants: ['Sophie Chen', 'Brandon Lee', 'Michelle Adams', 'Ryan Garcia'],
        platform: 'Discord',
        messages: [
            {
                id: 'weekend_001',
                sender: 'Sophie Chen',
                content: 'Board game night at my place Saturday. Who\'s in?',
                timestamp: new Date('2025-07-11 18:00:00'),
                isClue: false
            },
            {
                id: 'weekend_002',
                sender: 'Brandon Lee',
                content: 'Sounds fun! What games are we playing?',
                timestamp: new Date('2025-07-11 18:05:00'),
                isClue: false
            },
            {
                id: 'weekend_003',
                sender: 'Michelle Adams',
                content: 'I have that new strategy game we talked about.',
                timestamp: new Date('2025-07-11 18:10:00'),
                isClue: false
            },
            {
                id: 'weekend_004',
                sender: 'Ryan Garcia',
                content: 'I might be late. Family dinner until 8.',
                timestamp: new Date('2025-07-11 18:15:00'),
                isClue: false
            },
            {
                id: 'weekend_005',
                sender: 'Sophie Chen',
                content: 'No problem! We\'ll start without you and catch you up.',
                timestamp: new Date('2025-07-11 18:18:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'conv_002',
        platform: 'Slack',
        participants: ['Aaron Cole', 'Chloe Miller'],
        messages: [
            {
                id: 'normal_001',
                sender: 'Chloe Miller',
                content: 'Aaron, can you help me with the encryption module? The docs are a bit confusing.',
                timestamp: new Date('2025-07-08 15:30:00'),
                isClue: false
            },
            {
                id: 'normal_002',
                sender: 'Aaron Cole',
                content: 'Sure! Which part are you stuck on?',
                timestamp: new Date('2025-07-08 15:32:00'),
                isClue: false
            },
            {
                id: 'normal_003',
                sender: 'Chloe Miller',
                content: 'The key rotation process. I want to make sure I\'m doing it right.',
                timestamp: new Date('2025-07-08 15:35:00'),
                isClue: false
            },
            {
                id: 'normal_004',
                sender: 'Aaron Cole',
                content: 'I\'ll show you a few tricks tomorrow. There are some undocumented shortcuts.',
                timestamp: new Date('2025-07-08 15:38:00'),
                isClue: false
            },
            {
                id: 'chat_004',
                sender: 'Chloe Miller',
                content: 'Hey, did you really show me that bypass command? I mentioned it in my email to the team.',
                timestamp: new Date('2025-07-08 16:45:00'),
                isClue: true
            },
            {
                id: 'chat_005',
                sender: 'Aaron Cole',
                content: 'Yeah, it helps with the audit logs. Just be careful when you use it.',
                timestamp: new Date('2025-07-08 16:47:00'),
                isClue: true
            },
            {
                id: 'chat_015',
                sender: 'Chloe Miller',
                content: 'I won\'t mention it to anyone else. Thanks for the tip.',
                timestamp: new Date('2025-07-08 16:50:00'),
                isClue: true
            },
            {
                id: 'chat_016',
                sender: 'Aaron Cole',
                content: 'Smart. The less people know about these shortcuts, the better.',
                timestamp: new Date('2025-07-08 16:52:00'),
                isClue: true
            }
        ],
        isEvidence: true,
        title: 'Development Assistance'
    },
    {
        id: 'hr_discussions',
        title: 'HR General Chat',
        participants: ['Rebecca Martinez', 'Frank Wilson', 'Grace Kim', 'Paul Anderson'],
        platform: 'Teams',
        messages: [
            {
                id: 'hr_001',
                sender: 'Rebecca Martinez',
                content: 'Reminder: Annual performance reviews start next month.',
                timestamp: new Date('2025-07-10 08:30:00'),
                isClue: false
            },
            {
                id: 'hr_002',
                sender: 'Frank Wilson',
                content: 'Do we have the new evaluation forms ready?',
                timestamp: new Date('2025-07-10 08:35:00'),
                isClue: false
            },
            {
                id: 'hr_003',
                sender: 'Grace Kim',
                content: 'Yes, they\'re uploaded to the portal. Much more comprehensive this year.',
                timestamp: new Date('2025-07-10 08:40:00'),
                isClue: false
            },
            {
                id: 'hr_004',
                sender: 'Paul Anderson',
                content: 'The employee satisfaction survey results are in. Overall very positive.',
                timestamp: new Date('2025-07-10 10:15:00'),
                isClue: false
            },
            {
                id: 'hr_005',
                sender: 'Rebecca Martinez',
                content: 'Great! Any areas we should focus on for improvement?',
                timestamp: new Date('2025-07-10 10:18:00'),
                isClue: false
            },
            {
                id: 'hr_006',
                sender: 'Grace Kim',
                content: 'Work-life balance and professional development opportunities.',
                timestamp: new Date('2025-07-10 10:22:00'),
                isClue: false
            }
        ],
        isEvidence: false
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
                timestamp: new Date('2025-07-07 15:30:00'),
                isClue: false
            },
            {
                id: 'chat_007',
                sender: 'Aaron Cole',
                content: 'Understood. I\'ll make sure we hit the August 15th deadline no matter what.',
                timestamp: new Date('2025-07-07 15:32:00'),
                isClue: false
            }
        ],
        isEvidence: false,
        title: 'Project Deadline Pressure'
    },
    {
        id: 'sports_talk',
        title: 'Sports Chat',
        participants: ['Derek Johnson', 'Samantha Clark', 'Tony Ricci', 'Melissa Grant'],
        platform: 'WhatsApp',
        messages: [
            {
                id: 'sports_001',
                sender: 'Derek Johnson',
                content: 'Did anyone watch the game last night? What a comeback!',
                timestamp: new Date('2025-07-12 08:00:00'),
                isClue: false
            },
            {
                id: 'sports_002',
                sender: 'Samantha Clark',
                content: 'Amazing! I can\'t believe they pulled it off in the last 2 minutes.',
                timestamp: new Date('2025-07-12 08:05:00'),
                isClue: false
            },
            {
                id: 'sports_003',
                sender: 'Tony Ricci',
                content: 'My fantasy team is finally doing well this season.',
                timestamp: new Date('2025-07-12 08:15:00'),
                isClue: false
            },
            {
                id: 'sports_004',
                sender: 'Melissa Grant',
                content: 'Lucky you! Mine is in last place. 😭',
                timestamp: new Date('2025-07-12 08:18:00'),
                isClue: false
            },
            {
                id: 'sports_005',
                sender: 'Derek Johnson',
                content: 'There\'s still half a season left. Anything can happen!',
                timestamp: new Date('2025-07-12 08:20:00'),
                isClue: false
            }
        ],
        isEvidence: false
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
                timestamp: new Date('2025-07-09 10:00:00'),
                isClue: false
            },
            {
                id: 'group_002',
                sender: 'Aaron Cole',
                content: 'Will do. I have everything ready for review.',
                timestamp: new Date('2025-07-09 10:15:00'),
                isClue: false
            },
            {
                id: 'group_003',
                sender: 'Irene Walker',
                content: 'Make sure all documents are properly secured. We can\'t afford any leaks.',
                timestamp: new Date('2025-07-09 10:20:00'),
                isClue: false
            },
            {
                id: 'group_004',
                sender: 'Chloe Miller',
                content: 'Agreed. The DoD audit is coming up and we need everything perfect.',
                timestamp: new Date('2025-07-09 10:25:00'),
                isClue: false
            },
            {
                id: 'group_005',
                sender: 'Aaron Cole',
                content: 'Don\'t worry, I\'ve got this under control. 😅',
                timestamp: new Date('2025-07-09 10:30:00'),
                isClue: true
            }
        ],
        isEvidence: true,
        title: 'Sentinel-X Development Team'
    },
    {
        id: 'hobby_chat',
        title: 'Photography Club',
        participants: ['Linda Parker', 'James Foster', 'Emma Wilson', 'Alex Turner'],
        platform: 'Discord',
        messages: [
            {
                id: 'hobby_001',
                sender: 'Linda Parker',
                content: 'Who\'s joining the sunset shoot this weekend?',
                timestamp: new Date('2025-07-13 16:00:00'),
                isClue: false
            },
            {
                id: 'hobby_002',
                sender: 'James Foster',
                content: 'I\'m in! New lens arrived this week, perfect timing.',
                timestamp: new Date('2025-07-13 16:05:00'),
                isClue: false
            },
            {
                id: 'hobby_003',
                sender: 'Emma Wilson',
                content: 'Weather forecast looks great. Should be perfect conditions.',
                timestamp: new Date('2025-07-13 16:10:00'),
                isClue: false
            },
            {
                id: 'hobby_004',
                sender: 'Alex Turner',
                content: 'Can\'t make it this time. Family obligations.',
                timestamp: new Date('2025-07-13 16:15:00'),
                isClue: false
            },
            {
                id: 'hobby_005',
                sender: 'Linda Parker',
                content: 'No worries! We\'ll share the best shots with you.',
                timestamp: new Date('2025-07-13 16:18:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'tech_talk',
        title: 'Tech Enthusiasts',
        participants: ['Alex Kim', 'Maya Patel', 'Chris Johnson', 'Zoe Martinez', 'Ryan Foster'],
        platform: 'Discord',
        messages: [
            {
                id: 'tech_001',
                sender: 'Alex Kim',
                content: 'Did anyone see the new AI announcement from OpenAI?',
                timestamp: new Date('2025-07-09 18:00:00'),
                isClue: false
            },
            {
                id: 'tech_002',
                sender: 'Maya Patel',
                content: 'Yes! The capabilities are mind-blowing.',
                timestamp: new Date('2025-07-09 18:02:00'),
                isClue: false
            },
            {
                id: 'tech_003',
                sender: 'Chris Johnson',
                content: 'I\'m more excited about the new quantum computing breakthrough.',
                timestamp: new Date('2025-07-09 18:05:00'),
                isClue: false
            },
            {
                id: 'tech_004',
                sender: 'Zoe Martinez',
                content: 'The encryption implications are fascinating.',
                timestamp: new Date('2025-07-09 18:08:00'),
                isClue: false
            },
            {
                id: 'tech_005',
                sender: 'Ryan Foster',
                content: 'Speaking of encryption, our security protocols at work seem outdated.',
                timestamp: new Date('2025-07-09 18:10:00'),
                isClue: false
            },
            {
                id: 'tech_006',
                sender: 'Alex Kim',
                content: 'Really? What makes you say that?',
                timestamp: new Date('2025-07-09 18:12:00'),
                isClue: false
            },
            {
                id: 'tech_007',
                sender: 'Ryan Foster',
                content: 'The audit logging system has some... interesting bypasses.',
                timestamp: new Date('2025-07-09 18:15:00'),
                isClue: false
            },
            {
                id: 'tech_008',
                sender: 'Maya Patel',
                content: 'That sounds concerning. Have you reported it?',
                timestamp: new Date('2025-07-09 18:18:00'),
                isClue: false
            },
            {
                id: 'tech_009',
                sender: 'Ryan Foster',
                content: 'Not yet. Still evaluating if it\'s intentional or a bug.',
                timestamp: new Date('2025-07-09 18:20:00'),
                isClue: false
            },
            {
                id: 'tech_010',
                sender: 'Chris Johnson',
                content: 'Better safe than sorry. Security vulnerabilities are no joke.',
                timestamp: new Date('2025-07-09 18:22:00'),
                isClue: false
            },
            {
                id: 'tech_011',
                sender: 'Zoe Martinez',
                content: 'Especially with all the corporate espionage cases lately.',
                timestamp: new Date('2025-07-09 18:25:00'),
                isClue: false
            },
            {
                id: 'tech_012',
                sender: 'Alex Kim',
                content: 'True. The defense industry is a prime target.',
                timestamp: new Date('2025-07-09 18:28:00'),
                isClue: false
            }
        ],
        isEvidence: false
    },
    {
        id: 'book_club',
        title: 'Office Book Club',
        participants: ['Helen Chang', 'Marcus Wright', 'Diana Lopez', 'Seth Cooper'],
        platform: 'WhatsApp',
        messages: [
            {
                id: 'book_001',
                sender: 'Helen Chang',
                content: 'This month\'s book selection: "The Spy Who Came In from the Cold"',
                timestamp: new Date('2025-07-06 19:00:00'),
                isClue: false
            },
            {
                id: 'book_002',
                sender: 'Marcus Wright',
                content: 'Perfect timing! I love espionage thrillers.',
                timestamp: new Date('2025-07-06 19:02:00'),
                isClue: false
            },
            {
                id: 'book_003',
                sender: 'Diana Lopez',
                content: 'Le Carré is such a master of the genre.',
                timestamp: new Date('2025-07-06 19:05:00'),
                isClue: false
            },
            {
                id: 'book_004',
                sender: 'Seth Cooper',
                content: 'The psychological aspects of betrayal are fascinating.',
                timestamp: new Date('2025-07-06 19:08:00'),
                isClue: false
            },
            {
                id: 'book_005',
                sender: 'Helen Chang',
                content: 'Meeting is scheduled for July 20th. Coffee shop as usual?',
                timestamp: new Date('2025-07-06 19:10:00'),
                isClue: false
            },
            {
                id: 'book_006',
                sender: 'Marcus Wright',
                content: 'Works for me! I\'ll have finished it by then.',
                timestamp: new Date('2025-07-06 19:12:00'),
                isClue: false
            },
            {
                id: 'book_007',
                sender: 'Diana Lopez',
                content: 'The themes about loyalty and betrayal hit close to home.',
                timestamp: new Date('2025-07-10 20:00:00'),
                isClue: false
            },
            {
                id: 'book_008',
                sender: 'Seth Cooper',
                content: 'How so?',
                timestamp: new Date('2025-07-10 20:02:00'),
                isClue: false
            },
            {
                id: 'book_009',
                sender: 'Diana Lopez',
                content: 'Just thinking about workplace dynamics. Sometimes people aren\'t who they seem.',
                timestamp: new Date('2025-07-10 20:05:00'),
                isClue: false
            },
            {
                id: 'book_010',
                sender: 'Helen Chang',
                content: 'That\'s what makes these novels so compelling.',
                timestamp: new Date('2025-07-10 20:08:00'),
                isClue: false
            }
        ],
        isEvidence: false
    }
];