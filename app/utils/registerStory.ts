import type { Story } from '#shared/types/game/story';

export type StoryId = 'the-internal-leak' | 'banking-fraud-investigation' | 'operation-blackout' | 'the-insider' | 'digital-ghost';

const storyRegistry: Record<StoryId, () => Promise<Story>> = {
    'the-internal-leak': async () => {
        const { storyMetadata, storyContent } = await import('../../stories/the-internal-leak');
        return { ...storyMetadata, content: storyContent };
    },
    'banking-fraud-investigation': async () => {
        const { storyMetadata, storyContent } = await import('../../stories/banking-fraud-investigation');
        return { ...storyMetadata, content: storyContent };
    },
    'operation-blackout': async () => {
        const { storyMetadata } = await import('../../stories/operation-blackout/metadata');
        return { ...storyMetadata, content: undefined };
    },
    'the-insider': async () => {
        const { storyMetadata } = await import('../../stories/the-insider/metadata');
        return { ...storyMetadata, content: undefined };
    },
    'digital-ghost': async () => {
        const { storyMetadata } = await import('../../stories/digital-ghost/metadata');
        return { ...storyMetadata, content: undefined };
    }
};

export default async function registerStory(storyId: string): Promise<Story | null> {
    const loader = storyRegistry[storyId as StoryId];
    if (!loader) {
        console.warn(`Story '${storyId}' not found in registry`);
        return null;
    }

    try {
        return await loader();
    } catch (error) {
        console.error(`Failed to load story '${storyId}':`, error);
        return null;
    }
}

export async function getAllStories(): Promise<Story[]> {
    const storyIds = Object.keys(storyRegistry) as StoryId[];
    const storyPromises = storyIds.map(async (id) => {
        return await registerStory(id);
    });

    try {
        const stories = await Promise.all(storyPromises);
        return stories.filter((story): story is Story => story !== null);
    } catch (error) {
        console.error('Failed to load stories:', error);
        return [];
    }
}