export const characters: Character[] = [
    {
        id: 'tech_director_001',
        name: 'Irene Walker',
        role: 'Chief Technology Officer',
        department: 'Technology Leadership',
        background: 'Visionary tech leader with 12 years at Nexus-Corp. Built the cybersecurity division from ground up. Known for her paranoia about data protection and her ability to spot security threats before anyone else. Recently discovered suspicious network activity.',
        personality: 'Highly analytical, security-focused, tends to be suspicious of everyone. Has a reputation for being the "canary in the coal mine" for security issues.',
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
        isSuspect: true
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
        id: 'competitor_contact_006',
        name: 'Dr. Marcus Webb',
        role: 'CTO at CyberShield Industries',
        department: 'External - Competitor',
        background: 'Chief Technology Officer at CyberShield Industries, Nexus-Corp\'s main competitor. Former Nexus-Corp employee who left 2 years ago. Known to be developing a competing product to Sentinel-X.',
        personality: 'Charming, competitive, ambitious. Maintains friendly relationships despite business rivalry.',
        avatar: '🎯',
        accessLevel: 0,
        suspicious: false,
        isSuspect: false
    }
];
