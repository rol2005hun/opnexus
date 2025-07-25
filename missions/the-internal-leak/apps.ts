import type { MissionApp } from '../../shared/types';

export const availableApps: string[] = [
    'secureMail',
    'cipherChat', 
    'fileExplorer',
    'jobDescription',
    'evidenceLocker',
    'documentReader',
    'securityMonitor'
];

export const customApps: MissionApp[] = [
    {
        id: 'securityMonitor',
        name: 'Security Monitor',
        icon: '🛡️',
        type: 'monitoring',
        description: 'Real-time security monitoring dashboard for tracking access logs and network activity',
        data: {
            networkLogs: ['file_004'],
            alerts: ['USB transfer detected', 'After-hours access'],
            systems: ['Badge Access', 'Network Monitor', 'File Tracker']
        },
        accessRequirements: ['security_clearance', 'admin_role']
    }
];