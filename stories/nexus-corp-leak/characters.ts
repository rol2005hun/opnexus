// Nexus-Corp Leak Investigation - Characters
import type { Character } from '@/utils/storyContent';

export const characters: Character[] = [
    {
        id: 'player_investigator',
        name: 'Digital Investigator',
        role: 'NEXUS Investigation Specialist',
        department: 'Digital Investigation Agency',
        background: 'Expert digital forensics investigator assigned to investigate the internal data leak at Nexus-Corp. Specialized in corporate espionage cases and cybersecurity incidents.',
        personality: 'Methodical, detail-oriented, skilled at uncovering digital evidence and connecting patterns.',
        avatar: '🕵️',
        isSuspect: false,
        isPlayer: true
    },
    {
        id: 'tech_director_001',
        name: 'Irene Walker',
        role: 'Chief Technology Officer',
        department: 'Technology Leadership',
        background: 'Visionary tech leader with 12 years at Nexus-Corp. Built the cybersecurity division from ground up. Known for her paranoia about data protection and her ability to spot security threats before anyone else. Recently discovered suspicious network activity.',
        personality: 'Highly analytical, security-focused, tends to be suspicious of everyone. Has a reputation for being the "canary in the coal mine" for security issues.',
        avatar: '👩‍💼',
        isSuspect: false // She reported the breach
    },
    {
        id: 'senior_dev_002', 
        name: 'Aaron Cole',
        role: 'Senior Software Developer',
        department: 'Sentinel-X Development Team',
        background: 'Brilliant coder with questionable ethics. 8 years at Nexus-Corp, known for cutting corners and bending rules to meet deadlines. Recently divorced, paying hefty alimony. Has admin access to development systems and knows how to cover digital tracks.',
        personality: 'Pragmatic rule-bender, under financial pressure, excellent at technical workarounds. Often helps others bypass security protocols "for efficiency".',
        avatar: '👨‍💻',
        isSuspect: true
    },
    {
        id: 'junior_dev_003',
        name: 'Chloe Miller',
        role: 'Junior Software Developer',
        department: 'Sentinel-X Development Team',
        background: 'Ambitious recent graduate, eager to prove herself. Only 18 months at Nexus-Corp but already showing exceptional talent. Feels undervalued and underpaid. Has been bypassing file tracking systems, possibly at Aaron\'s direction.',
        personality: 'Eager to please, technically curious, sometimes naive about corporate policies. Wants to advance quickly and impress senior colleagues.',
        avatar: '👩‍💻',
        isSuspect: true
    },
    {
        id: 'security_expert_004',
        name: 'Liam Rivera',
        role: 'Cybersecurity Specialist',
        department: 'Information Security',
        background: 'Former NSA contractor with deep knowledge of surveillance and data forensics. 3 years at Nexus-Corp. Discovered the Thursday morning USB data transfer through his monitoring systems. Cynical about corporate security practices.',
        personality: 'Methodical investigator, cynical about company security, excellent at digital forensics. Sometimes makes sarcastic comments about security failures.',
        avatar: '👨‍🔒',
        isSuspect: false // He discovered evidence
    },
    {
        id: 'project_manager_005',
        name: 'Sophie Tanaka',
        role: 'Senior Project Manager',
        department: 'Sentinel-X Development Team',
        background: 'Results-driven PM with 6 years at Nexus-Corp. Under intense pressure to deliver Sentinel-X on time for the Q4 defense contract deadline. Worth $47M to the company. Has been pushing team to work faster, sometimes overlooking security protocols.',
        personality: 'Deadline-focused, high-pressure leadership style, prioritizes delivery over process. Sometimes encourages shortcuts to meet impossible timelines.',
        avatar: '👩‍💼',
        isSuspect: true
    },
    {
        id: 'competitor_contact_006',
        name: 'Dr. Marcus Webb',
        role: 'CTO at CyberShield Industries',
        department: 'External - Competitor',
        background: 'Chief Technology Officer at Nexus-Corp\'s main competitor. CyberShield is bidding against Nexus-Corp for the same defense contract. Recently received detailed Sentinel-X specifications through unknown channels.',
        personality: 'Ruthless competitor, willing to use any advantage to win contracts. Known in the industry for aggressive corporate intelligence gathering.',
        avatar: '🕴️',
        isSuspect: false // Recipient of leaked data
    }
];
