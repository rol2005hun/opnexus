// Dynamic App Manager - Handles story-specific apps and their data

import type { CustomApp } from '@/types/story';

interface AppData {
    id: string;
    name: string;
    icon: string;
    type: string;
    isCustom: boolean;
    storyId?: string;
    data: any;
    permissions: string[];
}

interface DatabaseApp extends AppData {
    type: 'database';
    data: {
        tables: DatabaseTable[];
        queries: string[];
        accessLog: AccessEntry[];
    };
}

interface MonitoringApp extends AppData {
    type: 'monitoring';
    data: {
        alerts: Alert[];
        networkTraffic: NetworkEvent[];
        systemStatus: SystemStatus;
    };
}

interface FinancialApp extends AppData {
    type: 'financial';
    data: {
        accounts: BankAccount[];
        transactions: Transaction[];
        suspiciousActivity: SuspiciousTransaction[];
    };
}

interface ForensicApp extends AppData {
    type: 'forensic';
    data: {
        reports: ForensicReport[];
        evidence: DigitalEvidence[];
        timeline: ForensicEvent[];
    };
}

// Data structures for different app types
interface DatabaseTable {
    name: string;
    columns: string[];
    rows: Record<string, any>[];
    encrypted: boolean;
    accessLevel: number;
}

interface AccessEntry {
    timestamp: string;
    user: string;
    action: string;
    table: string;
    success: boolean;
}

interface Alert {
    id: string;
    timestamp: string;
    level: 'info' | 'warning' | 'critical';
    message: string;
    source: string;
    acknowledged: boolean;
}

interface NetworkEvent {
    timestamp: string;
    sourceIP: string;
    targetIP: string;
    port: number;
    protocol: string;
    dataSize: number;
    suspicious: boolean;
}

interface SystemStatus {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
    threats: number;
}

interface BankAccount {
    accountNumber: string;
    accountName: string;
    balance: number;
    accountType: string;
    suspicious: boolean;
}

interface Transaction {
    id: string;
    timestamp: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    description: string;
    flagged: boolean;
}

interface SuspiciousTransaction {
    transactionId: string;
    reason: string;
    riskLevel: number;
    investigationStatus: string;
}

interface ForensicReport {
    id: string;
    title: string;
    analyst: string;
    timestamp: string;
    findings: string[];
    conclusion: string;
}

interface DigitalEvidence {
    id: string;
    type: string;
    description: string;
    hash: string;
    recovered: boolean;
}

interface ForensicEvent {
    timestamp: string;
    event: string;
    source: string;
    importance: number;
}

export class AppManager {
    private apps: Map<string, AppData> = new Map();
    private storyApps: Map<string, string[]> = new Map(); // storyId -> appIds
    
    // Register a standard app
    registerApp(app: AppData): void {
        this.apps.set(app.id, app);
    }
    
    // Register a custom app for a specific story
    registerCustomApp(storyId: string, customApp: CustomApp): void {
        const appData: AppData = {
            id: customApp.id,
            name: customApp.name,
            icon: customApp.icon,
            type: customApp.type,
            isCustom: true,
            storyId,
            data: customApp.data,
            permissions: this.getPermissionsForType(customApp.type)
        };
        
        this.apps.set(appData.id, appData);
        
        // Track story-specific apps
        if (!this.storyApps.has(storyId)) {
            this.storyApps.set(storyId, []);
        }
        this.storyApps.get(storyId)!.push(appData.id);
    }
    
    // Get apps available for a story
    getStoryApps(storyId: string, availableApps: string[]): AppData[] {
        const apps: AppData[] = [];
        
        // Add standard apps
        for (const appId of availableApps) {
            const app = this.apps.get(appId);
            if (app && !app.isCustom) {
                apps.push(app);
            }
        }
        
        // Add custom apps for this story
        const customAppIds = this.storyApps.get(storyId) || [];
        for (const appId of customAppIds) {
            const app = this.apps.get(appId);
            if (app) {
                apps.push(app);
            }
        }
        
        return apps;
    }
    
    // Generate app data based on story configuration
    generateAppData(storyId: string, appType: string, config: any): any {
        switch (appType) {
            case 'database':
                return this.generateDatabaseData(config);
            case 'monitoring':
                return this.generateMonitoringData(config);
            case 'financial':
                return this.generateFinancialData(config);
            case 'forensic':
                return this.generateForensicData(config);
            default:
                return {};
        }
    }
    
    private generateDatabaseData(config: any): DatabaseApp['data'] {
        return {
            tables: [
                {
                    name: 'employees',
                    columns: ['id', 'name', 'department', 'access_level', 'last_login'],
                    rows: [
                        { id: '001', name: 'John Doe', department: 'IT', access_level: 5, last_login: '2025-07-20 14:30' },
                        { id: '002', name: 'Jane Smith', department: 'Finance', access_level: 7, last_login: '2025-07-20 16:45' }
                    ],
                    encrypted: false,
                    accessLevel: 3
                },
                {
                    name: 'classified_projects',
                    columns: ['project_id', 'name', 'classification', 'lead_agent'],
                    rows: [
                        { project_id: 'NX-001', name: 'Project Neptune', classification: 'TOP SECRET', lead_agent: 'Agent Williams' }
                    ],
                    encrypted: true,
                    accessLevel: 8
                }
            ],
            queries: [
                'SELECT * FROM employees WHERE last_login > "2025-07-20"',
                'SELECT * FROM access_logs WHERE suspicious = true'
            ],
            accessLog: [
                { timestamp: '2025-07-20 14:30', user: 'admin', action: 'SELECT', table: 'employees', success: true },
                { timestamp: '2025-07-20 15:15', user: 'unknown', action: 'SELECT', table: 'classified_projects', success: false }
            ]
        };
    }
    
    private generateMonitoringData(config: any): MonitoringApp['data'] {
        return {
            alerts: [
                {
                    id: 'ALT-001',
                    timestamp: '2025-07-20 15:30',
                    level: 'critical',
                    message: 'Unauthorized access attempt detected',
                    source: 'Firewall',
                    acknowledged: false
                },
                {
                    id: 'ALT-002',
                    timestamp: '2025-07-20 16:00',
                    level: 'warning',
                    message: 'Unusual data transfer volume',
                    source: 'Network Monitor',
                    acknowledged: true
                }
            ],
            networkTraffic: [
                {
                    timestamp: '2025-07-20 15:30:15',
                    sourceIP: '192.168.1.105',
                    targetIP: '203.0.113.45',
                    port: 443,
                    protocol: 'HTTPS',
                    dataSize: 2048576,
                    suspicious: true
                }
            ],
            systemStatus: {
                cpu: 85,
                memory: 72,
                disk: 65,
                network: 90,
                threats: 3
            }
        };
    }
    
    private generateFinancialData(config: any): FinancialApp['data'] {
        return {
            accounts: [
                {
                    accountNumber: '****-1234',
                    accountName: 'John Doe',
                    balance: 25000.50,
                    accountType: 'Checking',
                    suspicious: false
                },
                {
                    accountNumber: '****-5678',
                    accountName: 'Offshore Holdings LLC',
                    balance: 1250000.00,
                    accountType: 'Business',
                    suspicious: true
                }
            ],
            transactions: [
                {
                    id: 'TXN-001',
                    timestamp: '2025-07-20 14:30',
                    fromAccount: '****-1234',
                    toAccount: '****-5678',
                    amount: 50000.00,
                    description: 'Consulting fee',
                    flagged: true
                }
            ],
            suspiciousActivity: [
                {
                    transactionId: 'TXN-001',
                    reason: 'Large unusual transfer to offshore account',
                    riskLevel: 8,
                    investigationStatus: 'Open'
                }
            ]
        };
    }
    
    private generateForensicData(config: any): ForensicApp['data'] {
        return {
            reports: [
                {
                    id: 'FOR-001',
                    title: 'Network Intrusion Analysis',
                    analyst: 'Digital Forensics Team',
                    timestamp: '2025-07-20 16:00',
                    findings: [
                        'Malware detected in system memory',
                        'Unauthorized network connections established',
                        'Evidence of data exfiltration'
                    ],
                    conclusion: 'System compromised by advanced persistent threat'
                }
            ],
            evidence: [
                {
                    id: 'EVD-001',
                    type: 'Malware Sample',
                    description: 'Trojan detected on workstation',
                    hash: 'a1b2c3d4e5f6...',
                    recovered: true
                }
            ],
            timeline: [
                {
                    timestamp: '2025-07-20 14:00',
                    event: 'Initial compromise detected',
                    source: 'IDS',
                    importance: 9
                },
                {
                    timestamp: '2025-07-20 14:30',
                    event: 'Data exfiltration begins',
                    source: 'Network Monitor',
                    importance: 10
                }
            ]
        };
    }
    
    private getPermissionsForType(type: string): string[] {
        switch (type) {
            case 'database':
                return ['read_data', 'execute_query'];
            case 'monitoring':
                return ['view_alerts', 'view_traffic'];
            case 'financial':
                return ['view_accounts', 'view_transactions'];
            case 'forensic':
                return ['view_reports', 'view_evidence'];
            case 'social':
                return ['view_profiles', 'view_connections'];
            case 'communication':
                return ['view_messages', 'view_calls'];
            default:
                return ['basic_access'];
        }
    }
    
    // Clean up story-specific apps when story ends
    cleanupStoryApps(storyId: string): void {
        const appIds = this.storyApps.get(storyId) || [];
        for (const appId of appIds) {
            this.apps.delete(appId);
        }
        this.storyApps.delete(storyId);
    }
}

// Global app manager instance
export const appManager = new AppManager();

// Initialize standard apps
appManager.registerApp({
    id: 'email',
    name: 'Mail',
    icon: '📧',
    type: 'communication',
    isCustom: false,
    data: {},
    permissions: ['view_messages']
});

appManager.registerApp({
    id: 'messages',
    name: 'Cipher Chat',
    icon: '💬',
    type: 'communication',
    isCustom: false,
    data: {},
    permissions: ['view_messages']
});

appManager.registerApp({
    id: 'files',
    name: 'File Explorer',
    icon: '📁',
    type: 'filesystem',
    isCustom: false,
    data: {},
    permissions: ['view_files']
});

appManager.registerApp({
    id: 'evidence',
    name: 'Evidence Locker',
    icon: '🔍',
    type: 'investigation',
    isCustom: false,
    data: {},
    permissions: ['view_evidence']
});

appManager.registerApp({
    id: 'notes',
    name: 'Nexuspad',
    icon: '📝',
    type: 'productivity',
    isCustom: false,
    data: {},
    permissions: ['edit_notes']
});
