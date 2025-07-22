export const objectives: Objective[] = [
    {
        id: 'obj_001',
        title: 'Identify the perpetrator',
        description: 'Determine which employee leaked the classified documents',
        type: 'identify',
        completed: false,
        requiredEvidence: ['chat_001', 'file_004', 'file_003'],
        hints: ['Check network access logs for after-hours activity', 'Look for financial motivations']
    },
    {
        id: 'obj_002',
        title: 'Determine the method',
        description: 'Find out how the files were stolen and transferred',
        type: 'analyze',
        completed: false,
        requiredEvidence: ['file_004', 'email_003', 'chat_005'],
        hints: ['Look for USB transfer logs', 'Check for security bypass methods']
    },
    {
        id: 'obj_003',
        title: 'Uncover external connections',
        description: 'Identify who received the stolen information',
        type: 'connect',
        completed: false,
        requiredEvidence: ['chat_002', 'file_003', 'file_006'],
        hints: ['Follow the money trail', 'Look for competitor involvement']
    },
    {
        id: 'obj_004',
        title: 'Establish motivation',
        description: 'Understand why the employee committed this crime',
        type: 'prove',
        completed: false,
        requiredEvidence: ['file_005', 'email_004', 'chat_003'],
        hints: ['Check personal financial situation', 'Look for legal pressures']
    },
    {
        id: 'obj_005',
        title: 'Timeline reconstruction',
        description: 'Piece together the sequence of events',
        type: 'timeline',
        completed: false,
        requiredEvidence: ['file_004', 'chat_008', 'chat_009', 'chat_010'],
        hints: ['Start from the competitor contact', 'Follow chronological order of communications']
    }
];