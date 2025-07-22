export const customApps: StoryApp[] = [
    {
        id: 'security_monitor',
        name: 'Security Monitor',
        icon: 'shield',
        type: 'monitoring',
        description: 'Real-time security monitoring dashboard',
        data: {
            networkLogs: ['file_004'],
            alerts: ['USB transfer detected', 'After-hours access'],
            systems: ['Badge Access', 'Network Monitor', 'File Tracker']
        },
        accessRequirements: ['security_clearance', 'admin_role']
    }
];