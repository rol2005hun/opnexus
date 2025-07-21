// Banking Fraud Investigation - Characters
import type { Character } from '@/types/content';

export const characters: Character[] = [
    {
        id: 'lisa_martinez',
        name: 'Lisa Martinez',
        role: 'Senior Bank Manager',
        department: 'Operations',
        background: 'Experienced bank manager with 15 years in the industry',
        personality: 'Professional, detail-oriented, strict about compliance',
        accessLevel: 8,
        suspicious: false,
        isSuspect: false,
        avatar: '👩‍💼'
    },
    {
        id: 'david_chen',
        name: 'David Chen',
        role: 'IT Security Specialist',
        department: 'Technology',
        background: 'IT security expert responsible for maintaining bank systems',
        personality: 'Tech-savvy, introverted, has deep system knowledge',
        accessLevel: 9,
        suspicious: true,
        isSuspect: true,
        avatar: '👨‍💻'
    },
    {
        id: 'sarah_williams',
        name: 'Sarah Williams',
        role: 'Financial Analyst',
        department: 'Risk Management',
        background: 'Risk analyst specializing in fraud detection',
        personality: 'Analytical, observant, recently noticed unusual patterns',
        accessLevel: 6,
        suspicious: false,
        isSuspect: false,
        avatar: '👩‍📊'
    },
    {
        id: 'michael_torres',
        name: 'Michael Torres',
        role: 'Branch Manager',
        department: 'Retail Banking',
        background: 'Branch manager with access to customer accounts',
        personality: 'Under financial pressure, desperate, has gambling debts',
        accessLevel: 7,
        suspicious: true,
        isSuspect: true,
        avatar: '👨‍💼'
    },
    {
        id: 'jennifer_kim',
        name: 'Jennifer Kim',
        role: 'Compliance Officer',
        department: 'Legal & Compliance',
        background: 'Compliance officer responsible for regulatory oversight',
        personality: 'Rule-following, diligent, recently flagged suspicious activities',
        accessLevel: 8,
        suspicious: false,
        isSuspect: false,
        avatar: '👩‍⚖️'
    },
    {
        id: 'alex_volkov',
        name: 'Alex Volkov',
        role: 'External Contact',
        department: 'Unknown',
        background: 'Mysterious contact with connections to cybercriminal networks',
        personality: 'Secretive, manipulative, identity unknown',
        accessLevel: 0,
        suspicious: true,
        isSuspect: true,
        avatar: '🕴️'
    }
];
