import type { Character } from '../../shared/types';

export const characters: Character[] = [
    {
        id: 'tech_director_001',
        name: 'Irene Walker',
        role: 'Chief Technology Officer',
        department: 'Technology Leadership',
        background: 'Visionary tech leader with 12 years at Nexus-Corp. Built the cybersecurity division from ground up. Known for her paranoia about data protection and her ability to spot security threats before anyone else. Made the decision to contact DIA when she discovered the security breach. Only person at Nexus-Corp who knows your true identity.',
        personality: 'Highly analytical, security-focused, tends to be suspicious of everyone. Has a reputation for being the "canary in the coal mine" for security issues. Extremely discreet and trustworthy.',
        avatar: '👩‍💼',
        accessLevel: 9,
        suspicious: false,
        isSuspect: false
    },
    {
        id: 'aaron_cole',
        name: 'Aaron Cole',
        role: 'Senior Software Developer',
        department: 'Sentinel-X Development Team',
        background: 'Brilliant coder who joined Nexus-Corp 3 years ago. Recently going through a messy divorce and facing significant financial pressures. Has been working late nights and weekends on Sentinel-X features.',
        personality: 'Introverted, methodical, but increasingly stressed and irritable. Shows signs of financial strain.',
        avatar: '👨‍💻',
        accessLevel: 7,
        suspicious: true,
        isSuspect: true,
        suspicionLevel: 9,
        alibi: 'Claims he was working late on project deadline',
        motive: 'Financial pressure from divorce settlement',
        connections: ['marcus_webb'],
        evidenceAgainst: ['file_004', 'chat_001', 'chat_002', 'file_003'],
        evidenceFor: []
    },
    {
        id: 'chloe_miller',
        name: 'Chloe Miller',
        role: 'Junior Software Developer',
        department: 'Sentinel-X Development Team',
        background: 'Ambitious recent computer science graduate, eager to prove herself. Started 8 months ago as an intern, now full-time junior developer. Has been asking lots of questions about system architecture and access controls.',
        personality: 'Enthusiastic, curious, sometimes overly eager. Can be naive about security protocols.',
        avatar: '👩‍💻',
        accessLevel: 4,
        suspicious: true,
        isSuspect: true
    },
    {
        id: 'security_expert_004',
        name: 'Liam Rivera',
        role: 'Cybersecurity Specialist',
        department: 'Information Security',
        background: 'Former NSA contractor with 8 years at Nexus-Corp. Discovered anomalous file access patterns that triggered the investigation. Known for his meticulous attention to detail and methodical approach.',
        personality: 'Disciplined, detail-oriented, logical. Takes security breaches personally.',
        avatar: '🛡️',
        accessLevel: 8,
        suspicious: false,
        isSuspect: false
    },
    {
        id: 'sophie_tanaka',
        name: 'Sophie Tanaka',
        role: 'Senior Project Manager',
        department: 'Sentinel-X Development Team',
        background: 'Results-driven project manager overseeing Sentinel-X development. Has access to all project documentation and timelines. Recently under pressure to accelerate the project timeline due to competitive threats.',
        personality: 'Organized, results-driven, sometimes cutting corners to meet deadlines. Frustrated by recent setbacks.',
        avatar: '📋',
        accessLevel: 6,
        suspicious: true,
        isSuspect: true
    },
    {
        id: 'sarah_chen',
        name: 'Sarah Chen',
        role: 'DevOps Engineer',
        department: 'Infrastructure Team',
        background: 'Skilled DevOps engineer responsible for deployment pipelines and system configurations. Recently passed over for a senior position. Has comprehensive access to build and deployment systems.',
        personality: 'Technical, detail-oriented, but harboring resentment about career progression.',
        avatar: '⚙️',
        accessLevel: 7,
        suspicious: true,
        isSuspect: true,
        suspicionLevel: 8,
        alibi: 'Modified system configurations for project requirements',
        motive: 'Passed over for promotion, potential insider threat',
        connections: ['david_kim'],
        evidenceAgainst: ['email_004', 'chat_013', 'chat_014'],
        evidenceFor: ['email_006']
    },
    {
        id: 'david_kim',
        name: 'David Kim',
        role: 'System Administrator',
        department: 'Infrastructure Team',
        background: 'Experienced system administrator with deep knowledge of internal systems. Quiet and methodical worker. Has administrative access to most internal systems and databases.',
        personality: 'Reserved, methodical, pays attention to details. Rarely speaks up in meetings.',
        avatar: '🔧',
        accessLevel: 8,
        suspicious: true,
        isSuspect: true,
        suspicionLevel: 7,
        alibi: 'Regular system maintenance and updates',
        motive: 'Unknown - possibly working with external actors',
        connections: ['sarah_chen'],
        evidenceAgainst: ['email_004', 'chat_009', 'chat_014'],
        evidenceFor: []
    },
    {
        id: 'elena_rodriguez',
        name: 'Elena Rodriguez',
        role: 'Business Analyst',
        department: 'Strategic Planning',
        background: 'Strategic business analyst working on competitive intelligence and market analysis. Has access to sensitive strategic documents and client communications.',
        personality: 'Ambitious, strategic thinker, focused on career advancement.',
        avatar: '📊',
        accessLevel: 5,
        suspicious: true,
        isSuspect: true,
        suspicionLevel: 6,
        alibi: 'Working to meet client deadlines',
        motive: 'Pressure from external client, career advancement',
        connections: ['external_client'],
        evidenceAgainst: ['email_003', 'email_007'],
        evidenceFor: ['chat_010']
    },
    {
        id: 'marcus_webb',
        name: 'Dr. Marcus Webb',
        role: 'CTO at CyberShield Industries',
        department: 'External - Competitor',
        background: 'Chief Technology Officer at CyberShield Industries, Nexus-Corp\'s main competitor. Former Nexus-Corp employee who left 2 years ago. Known to be developing a competing product to Sentinel-X.',
        personality: 'Charming, competitive, ambitious. Maintains friendly relationships despite business rivalry.',
        avatar: '🎯',
        accessLevel: 0,
        suspicious: true,
        isSuspect: true,
        suspicionLevel: 5,
        alibi: 'Investigating security breaches',
        motive: 'Possible cover-up of involvement',
        connections: ['aaron_cole'],
        evidenceAgainst: ['chat_007', 'email_002'],
        evidenceFor: []
    }
];
