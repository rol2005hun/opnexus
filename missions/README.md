# Creating New Missions - Complete Guide

## 🎯 Mission System Overview

In the NEXUS game, each mission represents independent investigation cases. Players use various digital tools (email, chat, files) to collect evidence and solve mysteries.

## 📁 Mission Structure

```
missions/
  new-mission-name/
    ├── index.ts          # Main mission file (assembles everything)
    ├── characters.ts     # Characters and people
    ├── emails.ts         # Email messages
    ├── chats.ts          # Chat conversations
    ├── files.ts          # Documents and files
    └── README.md         # Mission documentation
```

## 🚀 Step by Step - Creating New Missions

### Step 1: Mission Concept
Start with a good mission idea:
- **Theme**: What is the investigation based on? (cybercrime, internal sabotage, financial fraud)
- **Main Characters**: Who are the suspects and witnesses?
- **Evidence**: What digital traces will there be?
- **Solution**: Who is the culprit and why?

### Step 2: Create Folder
```
missions/new-mission-name/
```

### Step 3: Define Characters (`characters.ts`)

```typescript
import type { Character } from '@/types/content';

export const characters: Character[] = [
    {
        id: 'unique_character_id',
        name: 'Full Name',
        role: 'Job Position',
        department: 'Department',
        background: 'Background information',
        personality: 'Personality description',
        accessLevel: 1-10, // Access level
        suspicious: true/false,
        isSuspect: true/false,
        avatar: '👤' // Emoji or image
    }
];
```

**Tips:**
- Create 4-8 characters (suspects, witnesses, victims)
- Give each character unique motivations
- Think through relationships between them

### Step 4: Email Messages (`emails.ts`)

```typescript
import type { EmailMessage } from '@/types/email';

export const emails: EmailMessage[] = [
    {
        id: 'email_unique_id',
        from: 'sender@email.com',
        to: ['recipient@email.com'],
        cc: [],
        subject: 'Email Subject',
        body: `Email content...`,
        timestamp: '2025-07-XX XX:XX:XX',
        encrypted: false,
        importance: 'normal', // 'low', 'normal', 'high'
        isEvidence: true, // Is it evidence
        attachments: [
            {
                name: 'attachment.pdf',
                size: '1.2 MB',
                type: 'application/pdf'
            }
        ]
    }
];
```

**Tips:**
- Create 5-10 emails
- Build the mission chronologically
- Include both suspicious and normal emails

### Step 5: Chat Messages (`chats.ts`)

```typescript
import type { ChatConversation } from '@/types/content';

export const chats: ChatConversation[] = [
    {
        id: 'chat_unique_id',
        participants: ['Name1', 'Name2'],
        platform: 'WhatsApp', // WhatsApp, Signal, Teams, etc.
        messages: [
            {
                id: 'msg_id',
                sender: 'Name1',
                content: 'Message content',
                timestamp: '2025-07-XX XX:XX:XX',
                isClue: true // Is it a clue
            }
        ],
        encrypted: false,
        isEvidence: true,
        title: 'Conversation Title'
    }
];
```

### Step 6: Files and Documents (`files.ts`)

```typescript
import type { FileDocument } from '@/types/content';

export const files: FileDocument[] = [
    {
        id: 'file_unique_id',
        name: 'document.xlsx',
        type: 'spreadsheet', // 'document', 'spreadsheet', 'image', etc.
        size: '2.3 MB',
        content: `File content...`,
        lastModified: '2025-07-XX XX:XX:XX',
        author: 'Creator name',
        encrypted: false,
        accessLevel: 5,
        isEvidence: true,
        relatedTo: ['character_id'] // Related characters
    }
];
```

### Step 7: Main Mission File (`index.ts`)

```typescript
import type { MissionContent, MissionSetting, Suspect, Objective } from '@/types/content';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';

const setting: MissionSetting = {
    location: 'Location',
    organization: 'Organization',
    department: 'Department',
    timeframe: 'Timeframe',
    context: 'Context',
    backgroundInfo: 'Background information'
};

const suspects: Suspect[] = [
    {
        ...characters.find(c => c.id === 'character_id')!,
        suspicionLevel: 1-10,
        alibi: 'Alibi',
        motive: 'Motive',
        connections: ['connected_character_id'],
        evidenceAgainst: ['evidence_id'],
        evidenceFor: []
    }
];

const objectives: Objective[] = [
    {
        id: 'obj_001',
        title: 'Objective title',
        description: 'Objective description',
        type: 'identify', // 'identify', 'analyze', 'connect'
        completed: false,
        requiredEvidence: ['required_evidence_id'],
        hints: ['Hint 1', 'Hint 2']
    }
];

export const newMissionName: MissionContent = {
    id: 'new-mission-id',
    missionId: 'new-mission-id',
    setting,
    characters,
    suspects,
    emails,
    chatMessages: chats,
    files,
    records: [],
    customApps: [],
    objectives,
    timeline: []
};
```

### Step 8: Game Store Registration

In the `stores/game.ts` file, add the new mission:

```typescript
{
    id: 'new-mission-id',
    title: 'Mission Title',
    description: 'Short description...',
    briefing: 'Detailed briefing...',
    thumbnail: '/missions/image.jpg',
    difficulty: 'Agent', // 'Rookie', 'Agent', 'Senior Agent', 'Special Agent'
    estimatedTime: '60-90 mins',
    completed: false,
    available: true,
    securityClearance: 2,
    icon: '🎯',
    price: 0,
    isPaid: false
}
```

### Step 9: Mission Registry Registration

In the `utils/missionRegistry.ts` file, add the new mission:

```typescript
export type MissionId = 'the-internal-leak' | 'banking-fraud-investigation' | 'new-mission-id';

export const missionRegistry: Record<MissionId, () => Promise<MissionContent>> = {
    'the-internal-leak': async () => {
        const { nexusCorpLeakMission } = await import('@/missions/the-internal-leak');
        return nexusCorpLeakMission;
    },
    'banking-fraud-investigation': async () => {
        const { bankingFraudMission } = await import('@/missions/banking-fraud-investigation');
        return bankingFraudMission;
    },
    'new-mission-id': async () => {
        const { newMissionName } = await import('@/missions/new-mission-name');
        return newMissionName;
    }
};
```

## 💡 Design Tips

### Good Mission Elements:
- **Multiple suspects**: Choose from 3-5 people
- **Connected evidence**: Emails, chats, files support each other
- **Chronological structure**: Evidence builds up in logical order
- **Plot twist**: The obvious one is not the culprit

### Avoid:
- Too simple (1 suspect, 1 evidence)
- Too complex (10+ characters, confusing relationships)
- Contradictory evidence
- Missing motivation

## 📝 Example Mission Ideas

1. **Startup Sabotage**: Employee steals source code for competitor company
2. **Hospital Data Breach**: Doctor sells patient data to insurance companies
3. **School Hack**: Student hacks system to change grades
4. **E-sports Fraud**: Player bribes opponents in important matches
5. **Crypto Pump & Dump**: Group manipulates cryptocurrency prices

## 🔧 Developer Notes

- Every ID must be unique across the entire game
- Use TypeScript interfaces for type safety
- Test mission logic during gameplay
- Give appropriate access levels to characters

## 📚 Current Missions

### Available Missions:
- **the-internal-leak**: Corporate espionage at defense contractor
- **banking-fraud-investigation**: Sophisticated fraud scheme at City National Bank

---

**Complete example**: Study `banking-fraud-investigation` and `the-internal-leak` for full implementation examples!
