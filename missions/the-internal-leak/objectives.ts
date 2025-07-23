export const objectives: Objective[] = [
    {
        id: 'obj_001',
        title: 'Establish Cover Identity',
        description: 'Successfully integrate into Nexus-Corp as a junior analyst while gathering intelligence',
        type: 'primary',
        requiredEvidence: ['dia_briefing'],
        hints: ['Review your mission briefing', 'Understand your cover mission']
    },
    {
        id: 'obj_002',
        title: 'Analyze Corporate Communications',
        description: 'Monitor and analyze all intercepted communications for suspicious activity',
        type: 'analyze',
        requiredEvidence: ['email_003', 'chat_004', 'chat_005'],
        hints: ['Look for technical discussions about bypassing security', 'Watch for unusual working hours']
    },
    {
        id: 'obj_003',
        title: 'Identify Financial Motives',
        description: 'Use DIA surveillance data to identify employees under financial pressure',
        type: 'identify',
        requiredEvidence: ['DIA-MONITORED@classified.gov'],
        hints: ['Check monitored personal communications', 'Look for legal and financial pressures']
    },
    {
        id: 'obj_004',
        title: 'Trace External Contacts',
        description: 'Analyze intercepted communications to identify competitor connections',
        type: 'connect',
        requiredEvidence: ['DIA-INTERCEPTED@classified.gov'],
        hints: ['Review intercepted external communications', 'Follow the payment trail']
    },
    {
        id: 'obj_005',
        title: 'Build Prosecution Case',
        description: 'Gather sufficient evidence to identify the insider and their methods',
        type: 'prove',
        requiredEvidence: ['chat_001', 'chat_002', 'chat_003'],
        hints: ['Connect all communications to one suspect', 'Establish timeline of the data theft']
    },
    {
        id: 'obj_006',
        title: 'Maintain Operational Security',
        description: 'Complete investigation without revealing your true identity to anyone except CTO',
        type: 'hidden',
        requiredEvidence: ['email_001'],
        hints: ['Only Irene Walker knows your real identity', 'Maintain cover as new employee']
    }
];