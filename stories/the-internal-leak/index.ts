import { setting } from './settings';
import { suspects } from './suspects';
import { characters } from './characters';
import { emails } from './emails';
import { chats } from './chats';
import { files } from './files';
import { storyMetadata } from './metadata';
import { records } from './records';
import { customApps } from './apps';
import { timeline } from './timeline';
import { objectives } from './objectives';

export const storyContent: StoryContent = {
    id: 'the-internal-leak',
    storyId: 'the-internal-leak',
    setting,
    characters,
    suspects,
    emails,
    chatMessages: chats,
    files,
    records,
    customApps,
    objectives,
    timeline
};

export { storyMetadata };