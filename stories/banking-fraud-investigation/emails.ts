import type { EmailMessage } from '#shared/types';

export const emails: EmailMessage[] = [
    {
        id: 'email_bank_001',
        from: 'j.kim@citybank.com',
        to: ['l.martinez@citybank.com'],
        cc: [],
        subject: 'URGENT: Suspicious Transaction Pattern Detected',
        body: `Lisa,

I've been reviewing the transaction logs from the past month and found several concerning patterns:

1. Multiple large transfers ($50K+) from dormant accounts
2. Transfers occur during off-hours (2-4 AM)
3. All transactions bypass standard approval workflow
4. IP addresses trace to VPN services

I'm flagging this for immediate investigation. The total amount involved is approximately $2.3M.

Best regards,
Jennifer Kim
Compliance Officer`,
        timestamp: '2025-07-15 09:30:00',
        encrypted: false,
        importance: 'high',
        isEvidence: true,
        attachments: [
            {
                name: 'suspicious_transactions.xlsx',
                size: '2.1 MB',
                type: 'application/excel'
            }
        ]
    }
];
