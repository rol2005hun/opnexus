# Creating New Stories - Complete Guide

## 🎯 Story System Overview

In the NEXUS game, each story represents independent investigation cases. Players use various digital tools (email, chat, files) to collect evidence and solve mysteries.

## 📁 Story Structure

```
stories/
  new-story-name/
    ├── index.ts          # Main story file (assembles everything)
    ├── characters.ts     # Characters and people
    ├── emails.ts         # Email messages
    ├── chats.ts          # Chat conversations
    ├── files.ts          # Documents and files
    └── README.md         # Story documentation
```

## 🚀 Step by Step - Creating New Stories

### Step 1: Story Concept
Start with a good story idea:
- **Theme**: What is the investigation based on? (cybercrime, internal sabotage, financial fraud)
- **Main Characters**: Who are the suspects and witnesses?
- **Evidence**: What digital traces will there be?
- **Solution**: Who is the culprit and why?

### Step 2: Create Folder
```
stories/new-story-name/
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
- Build the story chronologically
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

### Step 7: Main Story File (`index.ts`)

```typescript
import type { StoryContent, StorySetting, Suspect, Objective } from '@/types/content';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';

const setting: StorySetting = {
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

export const newStoryName: StoryContent = {
    id: 'new-story-id',
    storyId: 'new-story-id',
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

In the `stores/game.ts` file, add the new story:

```typescript
{
    id: 'new-story-id',
    title: 'Story Title',
    description: 'Short description...',
    briefing: 'Detailed briefing...',
    thumbnail: '/stories/image.jpg',
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

### Step 9: Story Registry Registration

In the `utils/storyRegistry.ts` file, add the new story:

```typescript
export type StoryId = 'the-internal-leak' | 'banking-fraud-investigation' | 'new-story-id';

export const storyRegistry: Record<StoryId, () => Promise<StoryContent>> = {
    'the-internal-leak': async () => {
        const { nexusCorpLeakStory } = await import('@/stories/the-internal-leak');
        return nexusCorpLeakStory;
    },
    'banking-fraud-investigation': async () => {
        const { bankingFraudStory } = await import('@/stories/banking-fraud-investigation');
        return bankingFraudStory;
    },
    'new-story-id': async () => {
        const { newStoryName } = await import('@/stories/new-story-name');
        return newStoryName;
    }
};
```

## 💡 Design Tips

### Good Story Elements:
- **Multiple suspects**: Choose from 3-5 people
- **Connected evidence**: Emails, chats, files support each other
- **Chronological structure**: Evidence builds up in logical order
- **Plot twist**: The obvious one is not the culprit

### Avoid:
- Too simple (1 suspect, 1 evidence)
- Too complex (10+ characters, confusing relationships)
- Contradictory evidence
- Missing motivation

## 📝 Example Story Ideas

1. **Startup Sabotage**: Employee steals source code for competitor company
2. **Hospital Data Breach**: Doctor sells patient data to insurance companies
3. **School Hack**: Student hacks system to change grades
4. **E-sports Fraud**: Player bribes opponents in important matches
5. **Crypto Pump & Dump**: Group manipulates cryptocurrency prices

## 🔧 Developer Notes

- Every ID must be unique across the entire game
- Use TypeScript interfaces for type safety
- Test story logic during gameplay
- Give appropriate access levels to characters

## 📚 Current Stories

### Available Stories:
- **the-internal-leak**: Corporate espionage at defense contractor
- **banking-fraud-investigation**: Sophisticated fraud scheme at City National Bank

---

**Complete example**: Study `banking-fraud-investigation` and `the-internal-leak` for full implementation examples!
