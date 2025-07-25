import { setting } from './settings';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';
import { missionMetadata } from './metadata';
import { records } from './records';
import { availableApps, customApps } from './apps';
import { timeline } from './timeline';
import { objectives } from './objectives';
import type { MissionContent } from '../../shared/types';

export const missionContent: MissionContent = {
    id: 'the-internal-leak',
    setting,
    characters,
    emails,
    chatMessages: chats,
    files,
    records,
    availableApps,
    customApps,
    objectives,
    timeline
};

export { missionMetadata };