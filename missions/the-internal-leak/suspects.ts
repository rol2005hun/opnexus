import { characters } from './characters';

export const suspects: Suspect[] = [
    {
        ...characters.find(c => c.id === 'aaron_cole')!,
        suspicionLevel: 9,
        alibi: 'Claims he was working late on project deadline',
        motive: 'Financial pressure from divorce settlement',
        connections: ['marcus_webb'],
        evidenceAgainst: ['file_004', 'chat_001', 'chat_002', 'file_003'],
        evidenceFor: []
    },
    {
        ...characters.find(c => c.id === 'sarah_chen')!,
        suspicionLevel: 8,
        alibi: 'Modified system configurations for project requirements',
        motive: 'Passed over for promotion, potential insider threat',
        connections: ['david_kim'],
        evidenceAgainst: ['email_004', 'chat_013', 'chat_014'],
        evidenceFor: ['email_006']
    },
    {
        ...characters.find(c => c.id === 'david_kim')!,
        suspicionLevel: 7,
        alibi: 'Regular system maintenance and updates',
        motive: 'Unknown - possibly working with external actors',
        connections: ['sarah_chen'],
        evidenceAgainst: ['email_004', 'chat_009', 'chat_014'],
        evidenceFor: []
    },
    {
        ...characters.find(c => c.id === 'elena_rodriguez')!,
        suspicionLevel: 6,
        alibi: 'Working to meet client deadlines',
        motive: 'Pressure from external client, career advancement',
        connections: ['external_client'],
        evidenceAgainst: ['email_003', 'email_007'],
        evidenceFor: ['chat_010']
    },
    {
        ...characters.find(c => c.id === 'marcus_webb')!,
        suspicionLevel: 5,
        alibi: 'Investigating security breaches',
        motive: 'Possible cover-up of involvement',
        connections: ['aaron_cole'],
        evidenceAgainst: ['chat_007', 'email_002'],
        evidenceFor: []
    }
];