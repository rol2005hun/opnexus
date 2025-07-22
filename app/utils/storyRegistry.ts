import type { StoryContent } from '@/types/content';
import type { Story } from '@/types/game';

export type StoryId = 'the-internal-leak' | 'banking-fraud-investigation' | 'operation-blackout' | 'the-insider' | 'digital-ghost';

export interface StoryModule {
    storyMetadata: Story;
    storyContent?: StoryContent;
}

export const storyRegistry: Record<StoryId, () => Promise<StoryModule>> = {
    'the-internal-leak': async () => {
        const { storyMetadata, storyContent } = await import('@@/stories/the-internal-leak');
        return { storyMetadata, storyContent };
    },
    'banking-fraud-investigation': async () => {
        const { storyMetadata, storyContent } = await import('@@/stories/banking-fraud-investigation');
        return { storyMetadata, storyContent };
    },
    'operation-blackout': async () => {
        const { storyMetadata } = await import('@@/stories/operation-blackout/metadata');
        return { storyMetadata };
    },
    'the-insider': async () => {
        const { storyMetadata } = await import('@@/stories/the-insider/metadata');
        return { storyMetadata };
    },
    'digital-ghost': async () => {
        const { storyMetadata } = await import('@@/stories/digital-ghost/metadata');
        return { storyMetadata };
    }
};

export async function getStoryModule(storyId: string): Promise<StoryModule | null> {
    const loader = storyRegistry[storyId as StoryId];
    if (!loader) return null;

    try {
        return await loader();
    } catch (error) {
        console.error(`Failed to load story ${storyId}:`, error);
        return null;
    }
}

export async function getStoryContent(storyId: string): Promise<StoryContent | null> {
    const module = await getStoryModule(storyId);
    return module?.storyContent || null;
}

export async function getStoryMetadata(storyId: string): Promise<Story | null> {
    const module = await getStoryModule(storyId);
    return module?.storyMetadata || null;
}

export async function getAllStoryMetadata(): Promise<Story[]> {
    const storyIds = Object.keys(storyRegistry) as StoryId[];
    const storyPromises = storyIds.map(async (id) => {
        const module = await getStoryModule(id);
        return module?.storyMetadata || null;
    });

    try {
        const stories = await Promise.all(storyPromises);
        return stories.filter((story): story is Story => story !== null);
    } catch (error) {
        console.error('Failed to load story metadata:', error);
        return [];
    }
}