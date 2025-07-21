# Új Sztori Létrehozása - Teljes Útmutató

## 🎯 Sztori Rendszer Áttekintése

A NEXUS játékban minden sztori önálló nyomozási eseteket képvisel. A játékosok különböző digitális eszközöket használnak (email, chat, fájlok) a bizonyítékok összegyűjtésére és a rejtélyek megoldására.

## 📁 Sztori Struktúra

```
stories/
  uj-sztori-neve/
    ├── index.ts          # Fő sztori fájl (összerakja mindent)
    ├── characters.ts     # Karakterek és személyek
    ├── emails.ts         # Email üzenetek
    ├── chats.ts          # Chat beszélgetések
    ├── files.ts          # Dokumentumok és fájlok
    └── README.md         # Sztori dokumentáció
```

## 🚀 Lépésről Lépésre - Új Sztori Létrehozása

### 1. Lépés: Sztori Koncepció
Kezdd egy jó sztori ötlettel:
- **Téma**: Mire épül a nyomozás? (kiberbűnözés, belső szabotázs, pénzügyi csalás)
- **Főszereplők**: Kik a gyanúsítottak és tanúk?
- **Bizonyítékok**: Milyen digitális nyomok lesznek?
- **Megoldás**: Ki a bűnös és miért?

### 2. Lépés: Mappa Létrehozása
```
stories/uj-sztori-neve/
```

### 3. Lépés: Karakterek Definiálása (`characters.ts`)

```typescript
import type { Character } from '@/types/content';

export const characters: Character[] = [
    {
        id: 'unique_character_id',
        name: 'Teljes Név',
        role: 'Munkakör',
        department: 'Részleg',
        background: 'Háttér információ',
        personality: 'Személyiség leírás',
        accessLevel: 1-10, // Hozzáférési szint
        suspicious: true/false,
        isSuspect: true/false,
        avatar: '👤' // Emoji vagy kép
    }
];
```

**Tippek:**
- Készíts 4-8 karaktert (gyanúsítottak, tanúk, áldozatok)
- Adj minden karakternek egyedi motivációt
- Gondold végig a kapcsolatokat közöttük

### 4. Lépés: Email Üzenetek (`emails.ts`)

```typescript
import type { EmailMessage } from '@/types/email';

export const emails: EmailMessage[] = [
    {
        id: 'email_unique_id',
        from: 'kuldo@email.com',
        to: ['fogado@email.com'],
        cc: [],
        subject: 'Email Tárgy',
        body: `Email tartalma...`,
        timestamp: '2025-07-XX XX:XX:XX',
        encrypted: false,
        importance: 'normal', // 'low', 'normal', 'high'
        isEvidence: true, // Bizonyíték-e
        attachments: [
            {
                name: 'melleklet.pdf',
                size: '1.2 MB',
                type: 'application/pdf'
            }
        ]
    }
];
```

**Tippek:**
- Hozz létre 5-10 emailt
- Építsd fel a sztorit időrendben
- Adj gyanús és normál emaileket is

### 5. Lépés: Chat Üzenetek (`chats.ts`)

```typescript
import type { ChatConversation } from '@/types/content';

export const chats: ChatConversation[] = [
    {
        id: 'chat_unique_id',
        participants: ['Név1', 'Név2'],
        platform: 'WhatsApp', // WhatsApp, Signal, Teams, stb.
        messages: [
            {
                id: 'msg_id',
                sender: 'Név1',
                content: 'Üzenet tartalma',
                timestamp: '2025-07-XX XX:XX:XX',
                isClue: true // Nyom-e
            }
        ],
        encrypted: false,
        isEvidence: true,
        title: 'Beszélgetés Címe'
    }
];
```

### 6. Lépés: Fájlok és Dokumentumok (`files.ts`)

```typescript
import type { FileDocument } from '@/types/content';

export const files: FileDocument[] = [
    {
        id: 'file_unique_id',
        name: 'dokumentum.xlsx',
        type: 'spreadsheet', // 'document', 'spreadsheet', 'image', stb.
        size: '2.3 MB',
        content: `Fájl tartalma...`,
        lastModified: '2025-07-XX XX:XX:XX',
        author: 'Létrehozó neve',
        encrypted: false,
        accessLevel: 5,
        isEvidence: true,
        relatedTo: ['character_id'] // Kapcsolódó karakterek
    }
];
```

### 7. Lépés: Fő Sztori Fájl (`index.ts`)

```typescript
import type { StoryContent, StorySetting, Suspect, Objective } from '@/types/content';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';

const setting: StorySetting = {
    location: 'Helyszín',
    organization: 'Szervezet',
    department: 'Részleg',
    timeframe: 'Időkeret',
    context: 'Kontextus',
    backgroundInfo: 'Háttér információ'
};

const suspects: Suspect[] = [
    {
        ...characters.find(c => c.id === 'character_id')!,
        suspicionLevel: 1-10,
        alibi: 'Alibi',
        motive: 'Motívum',
        connections: ['kapcsolt_karakter_id'],
        evidenceAgainst: ['bizonyitek_id'],
        evidenceFor: []
    }
];

const objectives: Objective[] = [
    {
        id: 'obj_001',
        title: 'Cél címe',
        description: 'Cél leírása',
        type: 'identify', // 'identify', 'analyze', 'connect'
        completed: false,
        requiredEvidence: ['szukseges_bizonyitek_id'],
        hints: ['Tipp 1', 'Tipp 2']
    }
];

export const ujStoryNeve: StoryContent = {
    id: 'uj-sztori-id',
    storyId: 'uj-sztori-id',
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

### 8. Lépés: Game Store Regisztráció

A `stores/game.ts` fájlban add hozzá az új sztorit:

```typescript
{
    id: 'uj-sztori-id',
    title: 'Sztori Címe',
    description: 'Rövid leírás...',
    briefing: 'Részletes briefing...',
    thumbnail: '/stories/kep.jpg',
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

## 💡 Tervezési Tippek

### Jó Sztori Elemek:
- **Több gyanúsított**: 3-5 ember közül kell kiválasztani
- **Kapcsolódó bizonyítékok**: Emailek, chatok, fájlok támaszják alá egymást
- **Időrendi felépítés**: A bizonyítékok logikus sorrendben épülnek fel
- **Meglepetés fordulat**: Nem az egyértelmű a bűnös

### Kerülendő:
- Túl egyszerű (1 gyanúsított, 1 bizonyíték)
- Túl bonyolult (10+ karakter, zavaros kapcsolatok)
- Ellentmondásos bizonyítékok
- Hiányzó motiváció

## 📝 Példa Sztori Ötletek

1. **Startup Szabotázs**: Alkalmazott ellopja a forráskódot versenytárs cégnek
2. **Kórházi Adatszivárgás**: Orvos eladja beteg adatokat biztosító cégeknek
3. **Iskolai Hack**: Diák feltöri a rendszert hogy megváltoztassa a jegyeket
4. **E-sport Csalás**: Játékos megvesztegeti ellenfeleket fontos meccseken
5. **Crypto Pump & Dump**: Csoport manipulálja kriptovaluta árakat

## 🔧 Fejlesztői Jegyzetek

- Minden ID legyen egyedi az egész játékban
- Használd TypeScript interface-eket a típusbiztonságért
- Teszteld a sztori logikáját játék közben
- Adj megfelelő hozzáférési szinteket a karaktereknek

---

**Elkészült példa**: `banking-fraud` - Tanulmányozd ezt a teljes implementációért!
