import type { FileDocument } from '#shared/types';

export const files: FileDocument[] = [
  {
    id: 'file_bank_001',
    name: 'transaction_log_july_2025.csv',
    type: 'spreadsheet',
    size: '15.2 MB',
    content: `Date,Time,Amount,From Account,To Account,Authorization,IP Address
2025-07-13,02:30:15,$150000,ACC-4471238,EXT-9982347,OVERRIDE-MT,192.168.1.105
2025-07-13,02:45:22,$200000,ACC-5512094,EXT-9982347,OVERRIDE-MT,192.168.1.105
2025-07-13,03:00:18,$175000,ACC-6623481,EXT-9982347,OVERRIDE-MT,192.168.1.105
2025-07-14,03:15:45,$225000,ACC-7734562,EXT-9982347,OVERRIDE-MT,192.168.1.105
2025-07-15,02:50:33,$275000,ACC-8845673,EXT-9982347,OVERRIDE-MT,192.168.1.105`,
    lastModified: '2025-07-15 08:00:00',
    author: 'system_audit',
    encrypted: false,
    accessLevel: 8,
    isEvidence: true,
    relatedTo: ['michael_torres']
  },
  {
    id: 'file_bank_002',
    name: 'security_access_log.txt',
    type: 'document',
    size: '842 KB',
    content: `[2025-07-12 23:45:12] BADGE_ACCESS: Employee MT-4471 (Michael Torres) - Main Building Entry
[2025-07-13 01:55:33] SYSTEM_LOGIN: User 'mtorres' - Workstation WS-2847
[2025-07-13 02:25:15] PRIVILEGE_ESCALATION: User 'mtorres' accessed ADMIN functions
[2025-07-13 02:30:15] TRANSACTION_OVERRIDE: Manager code MT-OVERRIDE used
[2025-07-13 02:45:22] TRANSACTION_OVERRIDE: Manager code MT-OVERRIDE used
[2025-07-13 03:00:18] TRANSACTION_OVERRIDE: Manager code MT-OVERRIDE used
[2025-07-13 04:35:44] SYSTEM_LOGOUT: User 'mtorres' - Session ended
[2025-07-13 04:40:12] BADGE_ACCESS: Employee MT-4471 (Michael Torres) - Main Building Exit`,
    lastModified: '2025-07-13 08:00:00',
    author: 'security_system',
    encrypted: false,
    accessLevel: 9,
    isEvidence: true,
    relatedTo: ['michael_torres']
  },
  {
    id: 'file_bank_003',
    name: 'cryptocurrency_transfers.json',
    type: 'document',
    size: '125 KB',
    content: `{
  "transfers": [
    {
      "transaction_id": "bc1q7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
      "amount_usd": 150000,
      "amount_btc": 3.2847,
      "timestamp": "2025-07-13T02:35:00Z",
      "from_wallet": "external_bank_account",
      "to_wallet": "bc1qmixedwallet7x8y9z0a1b2c3d4e5f6g7h8i9j0k",
      "status": "confirmed"
    }
  ]
}`,
    lastModified: '2025-07-13 05:00:00',
    author: 'crypto_monitor',
    encrypted: false,
    accessLevel: 7,
    isEvidence: true,
    relatedTo: ['michael_torres', 'alex_volkov']
  }
];
